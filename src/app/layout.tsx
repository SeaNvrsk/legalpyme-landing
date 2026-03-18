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
  title: "DerechoLaboral.mx | Defiende tus derechos laborales en México",
  description:
    "Despidos injustificados, falta de pago, liquidaciones incorrectas. Especialistas en derecho laboral. Primera evaluación gratis. Te ayudamos a recibir lo que te corresponde por ley.",
  keywords: [
    "derecho laboral",
    "despido injustificado",
    "liquidación",
    "abogado laboral México",
    "demanda laboral",
    "conciliación laboral",
  ],
  openGraph: {
    title: "DerechoLaboral.mx | Defiende tus derechos laborales",
    description:
      "Orientación y acompañamiento legal en despidos, liquidaciones y conflictos laborales. Evaluación de caso gratis.",
    locale: "es_MX",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://derecholaboral.mx"),
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
