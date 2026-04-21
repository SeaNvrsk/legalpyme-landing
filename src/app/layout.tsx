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
  title: "LegalPyme.mx | Asesoría legal y fiscal para empresas en México",
  description:
    "Cumplimiento laboral y fiscal, contratos, personal y prevención de demandas. Especialistas en derecho empresarial. Primera orientación gratuita.",
  keywords: [
    "asesoría legal PyME",
    "derecho empresarial México",
    "contratos empresas",
    "regularización fiscal",
    "LegalPyme",
  ],
  openGraph: {
    title: "LegalPyme.mx | Protege tu negocio con asesoría legal",
    description:
      "Estructura legal y fiscal, contratos, prevención de riesgos y resolución de conflictos para empresas en México.",
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
