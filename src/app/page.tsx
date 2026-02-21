"use client";

import Image from "next/image";
import Link from "next/link";
import { Shield, Briefcase, Calculator, ChevronRight, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { blogPosts } from "@/lib/blog-posts";
import ContactSection from "@/components/ContactSection";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  const [scrollFade, setScrollFade] = useState(0);
  const [servicesVisible, setServicesVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const vh = typeof window !== "undefined" ? window.innerHeight : 800;
      const y = window.scrollY;
      setScrollFade(Math.min(y / vh, 1));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = document.getElementById("services");
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setServicesVisible(true),
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const services = [
{
  title: "Constitución de empresas",
  description: "Asesoría integral para la formación legal de tu PyME en México, incluyendo la creación de S.A. de C.V. y S.A.S.",
  icon: <Briefcase className="h-8 w-8 text-blue-500" />,
    },
{
  title: "Contratos",
  description: "Elaboración y revisión de contratos comerciales, laborales, de servicios, así como tratados de NDA (Confidencialidad) y acuerdos colectivos.",
  icon: <Shield className="h-8 w-8 text-blue-500" />,
    },
{
  title: "Asesoría fiscal",
  description: "Trabajo en conjunto con el portal del SAT para la presentación de declaraciones fiscales y cumplimiento de todas las obligaciones legales.",
  icon: <Calculator className="h-8 w-8 text-blue-500" />,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="text-xl font-bold tracking-tighter">
            LegalPyme<span className="text-blue-500">.mx</span>
          </div>
          <a
            href="#contacto"
            className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold transition hover:bg-blue-700"
          >
            Contactar
          </a>
        </div>
      </nav>

      {/* Hero Section — full viewport, next/image + overlay, затухает при скролле */}
      <section className="relative flex min-h-screen min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-20 text-center lg:pt-48 lg:pb-32">
        {/* Фон: небоскрёбы — next/image, object-cover */}
        <div
          className="absolute inset-0 z-0 transition-opacity duration-150"
          style={{ opacity: 1 - scrollFade }}
          aria-hidden
        >
          <Image
            src="/image_3d84fb.jpg"
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        {/* Overlay: затемнение для идеальной читаемости белого текста */}
        <div
          className="absolute inset-0 z-0 transition-opacity duration-150"
          style={{ backgroundColor: `rgba(0,0,0,${0.5 + 0.5 * scrollFade})` }}
          aria-hidden
        />
        <div
          className="absolute inset-0 z-0 transition-opacity duration-150"
          style={{
            background: `radial-gradient(ellipse 80% 80% at 50% 50%, transparent 0%, rgba(0,0,0,${0.6 + 0.4 * scrollFade}) 100%)`,
          }}
          aria-hidden
        />
        <div className="relative z-10">
        <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
          Servicios Legales Profesionales para <span className="text-blue-400">PyMEs</span> en México
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-center text-xl font-medium leading-relaxed text-white/95 sm:text-2xl">
          Asesoría legal y fiscal estratégica para emprendedores y empresas en expansión dentro del mercado mexicano.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="#contacto"
            className="flex items-center gap-2 rounded-full bg-white px-8 py-4 font-bold text-black transition hover:bg-zinc-200"
          >
            Empezar ahora <ChevronRight className="h-5 w-5" />
          </a>
          <a
            href="#services"
            className="rounded-full border border-white/20 px-8 py-4 font-bold transition hover:bg-white/5"
          >
            Ver servicios
          </a>
        </div>
        </div>
      </section>

      {/* Services Section — больше воздуха, fade-in при скролле */}
      <section id="services" className="mx-auto max-w-7xl px-6 py-24 lg:py-36 scroll-mt-20">
        <div className="mb-20 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Nuestros Servicios</h2>
          <p className="mt-4 text-zinc-400">Soluciones expertas para cada etapa de tu empresa.</p>
        </div>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative rounded-2xl border border-white/10 bg-zinc-900/50 p-8 transition-all duration-500 hover:border-blue-500/50 hover:bg-zinc-900"
              style={{
                opacity: servicesVisible ? 1 : 0,
                transform: servicesVisible ? "translateY(0)" : "translateY(1rem)",
                transitionDelay: servicesVisible ? `${index * 80}ms` : "0ms",
              }}
            >
              <div className="mb-6 inline-block rounded-xl bg-blue-500/10 p-3">
                {service.icon}
              </div>
              <h3 className="mb-3 text-xl font-bold">{service.title}</h3>
              <p className="text-zinc-400 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Últimas noticias del blog */}
      <section className="border-t border-white/10 bg-zinc-950/80 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Últimas noticias de nuestro blog
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-zinc-400">
              Artículos sobre derecho, fiscalidad y negocios en México para tu PyME.
            </p>
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            {blogPosts.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl border border-white/10 bg-zinc-900/50 p-6 transition-all hover:border-blue-500/40 hover:bg-zinc-900"
              >
                <h3 className="mb-3 text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-zinc-400 line-clamp-3">
                  {post.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-400">
                  Leer más <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/5 hover:border-blue-500/40"
            >
              Ver todo el blog <ArrowRight className="h-4 w-4" />
            </Link>
          </p>
        </div>
      </section>

      <ContactSection />

      <WhatsAppButton />

      {/* Footer */}
      <footer className="border-t border-white/10 py-16">
        <div className="mx-auto max-w-7xl px-6 text-center text-zinc-500">
          <p>© 2026 LegalPyme.mx. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
