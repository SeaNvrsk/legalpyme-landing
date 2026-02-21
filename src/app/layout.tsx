import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LegalPyme.mx | Servicios Legales para PyMEs en México — Asesoría Fiscal y SAT",
  description:
    "Servicios legales profesionales para PyMEs en México: asesoría fiscal, trámites ante el SAT, constitución de empresas, contratos y cumplimiento normativo. Apoyo jurídico integral para tu negocio.",
  keywords: [
    "servicios legales",
    "PyMEs México",
    "asesoría fiscal",
    "SAT",
    "empresas México",
    "constitución de empresas",
    "contratos",
  ],
  openGraph: {
    title: "LegalPyme.mx | Servicios Legales para PyMEs en México",
    description:
      "Servicios legales profesionales para PyMEs: asesoría fiscal, SAT, constitución de empresas y contratos. Asesoría jurídica integral en México.",
    locale: "es_MX",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://legalpyme.mx"),
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-black`}
      >
        {children}
      </body>
    </html>
  );
}
