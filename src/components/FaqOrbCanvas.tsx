"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import type { Group } from "three";

type OrbProps = {
  scrollP: number;
  mouse: { x: number; y: number };
};

/**
 * Procedural interwoven tori (Gentlerain-style wire orb). Not their GLB — same class
 * of effect: slow idle spin, scroll-tumble, cursor tilt.
 */
function Orb({ scrollP, mouse }: OrbProps) {
  const groupRef = useRef<Group>(null);
  const smoothRef = useRef({ x: 0, y: 0 });
  const reduceRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      reduceRef.current = mq.matches;
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const rings = useMemo(
    () =>
      [
        [0, 0, 0],
        [Math.PI / 2, 0, 0],
        [0, Math.PI / 2, 0],
        [Math.PI / 3, Math.PI / 5, 0],
        [0, Math.PI / 3, Math.PI / 4],
      ] as [number, number, number][],
    []
  );

  useFrame((state) => {
    const g = groupRef.current;
    if (!g) return;

    if (reduceRef.current) {
      g.rotation.set(0.28, 0.42, 0.08);
      return;
    }

    const s = smoothRef.current;
    s.x += (mouse.x - s.x) * 0.065;
    s.y += (mouse.y - s.y) * 0.065;

    const t = state.clock.elapsedTime;
    const sp = scrollP;

    g.rotation.x = sp * Math.PI * 2.8 + t * 0.13 + s.y * 0.55;
    g.rotation.y = sp * Math.PI * 2.35 + t * 0.17 + s.x * 0.55;
    g.rotation.z = sp * Math.PI * 0.5 + t * 0.08;
  });

  return (
    <group ref={groupRef} scale={1.02}>
      {rings.map((rot, i) => (
        <mesh key={i} rotation={rot}>
          <torusGeometry args={[1, 0.072 + (i % 2) * 0.014, 40, 128]} />
          <meshStandardMaterial
            color="#f2e6c4"
            roughness={0.38}
            metalness={0.14}
            emissive="#3d3318"
            emissiveIntensity={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function FaqOrbCanvas({
  scrollP,
  mouse,
}: {
  scrollP: number;
  mouse: { x: number; y: number };
}) {
  return (
    <Canvas
      camera={{ position: [0, 0.12, 3.6], fov: 40 }}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.52} />
      <directionalLight position={[5, 8, 6]} intensity={1.25} />
      <directionalLight position={[-6, -4, -2]} intensity={0.42} color="#a8b4d4" />
      <pointLight position={[0, 0, 4]} intensity={0.32} color="#fff4d0" />
      <Orb scrollP={scrollP} mouse={mouse} />
    </Canvas>
  );
}
