/**
 * Equipo LegalPyme — perfiles basados en las tarjetas de referencia del despacho.
 * Fotos: /public/*.jpg
 */

export type TeamAccent = "blue" | "emerald" | "orange" | "violet" | "amber";

export type TeamStat = {
  value: string;
  label: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  stats: [TeamStat, TeamStat];
  bio: string;
  tags: string[];
  email: string;
  imageSrc: string;
  imagePosition?: string;
  accent: TeamAccent;
};

export const TEAM: TeamMember[] = [
  {
    id: "manuel-garcia",
    name: "Manuel García",
    role: "Socio fundador · Doctor en Derecho de la Empresa",
    stats: [
      { value: "25+", label: "años de experiencia" },
      { value: "ITAM", label: "formación" },
    ],
    bio: "Socio fundador del despacho, con doctorado en Derecho de la Empresa y especialización internacional por la Universidad Complutense de Madrid. Ha participado en negociaciones laborales con empresas de Norteamérica, Latinoamérica, Asia y Europa para la instalación de plantas industriales en México. Colaboró con el Grupo de Trabajo Empresarial del PNUD de la ONU y la OIT. Asesor de COPARMEX, CONCAMIN y CMIC a nivel nacional.",
    tags: [
      "Derecho laboral",
      "Derecho corporativo",
      "Negociación sindical",
      "Relaciones industriales",
    ],
    email: "msgarcia@iparkman.com.mx",
    imageSrc: "/manuel-garcia.jpg",
    imagePosition: "50% 50%",
    accent: "blue",
  },
  {
    id: "estefania-soberanes",
    name: "Estefanía Soberanes",
    role: "Asociada · Área laboral",
    stats: [
      { value: "8+", label: "años de experiencia" },
      { value: "UNAM", label: "formación" },
    ],
    bio: "Abogada laboral con amplia trayectoria en asesoría, consultoría y litigio. Especialista en industria farmacéutica, alimentos y autotransporte. Su enfoque preventivo ayuda a las empresas a anticipar riesgos laborales antes de que se conviertan en conflictos. Docente adjunta en la Universidad Panamericana y actualmente cursando Maestría en Derecho de las Empresas en la Anáhuac.",
    tags: [
      "Litigio laboral",
      "Derecho colectivo",
      "Reforma laboral",
      "Prevención de riesgos",
    ],
    email: "estefania.soberanes@iparkman.com.mx",
    imageSrc: "/estefania.jpg",
    imagePosition: "50% 24%",
    accent: "emerald",
  },
  {
    id: "salvador-corona",
    name: "Salvador Corona",
    role: "Asociado · Área laboral",
    stats: [
      { value: "7+", label: "años de experiencia" },
      { value: "UNAM", label: "formación" },
    ],
    bio: "Especialista en consultoría y litigio laboral con experiencia en sectores como farmacéutico, tecnología, transporte y medios. Ha representado a empresas como Sony, Axionlog y Forbes. Cuenta con especialidad en Derecho Laboral por la UNAM y formación en el Nuevo Modelo de Justicia Laboral. Profesor adjunto en la Escuela Judicial del Poder Judicial del Estado de Guanajuato.",
    tags: [
      "Litigio laboral",
      "Asesoría empresarial",
      "Justicia laboral",
      "Capacitación HR",
    ],
    email: "salvador.corona@iparkman.com.mx",
    imageSrc: "/salvador.jpg",
    imagePosition: "50% 30%",
    accent: "orange",
  },
  {
    id: "veronica-martinez",
    name: "Verónica Martínez",
    role: "Abogada · Derecho laboral y empresarial",
    stats: [
      { value: "Mtra.", label: "Relaciones laborales" },
      { value: "AMEDIRH", label: "miembro" },
    ],
    bio: "Maestra en Relaciones Laborales y Derecho Laboral. Asesora a clientes gubernamentales y corporativos en materia laboral y empresarial. Ha trabajado en administración y tercerización de Recursos Humanos, y es expositora en conferencias sobre Reforma Laboral, Hostigamiento Laboral y Ley Antilavado. Docente universitaria en Seguridad Social y Derecho del Trabajo.",
    tags: [
      "Derecho laboral",
      "Derecho civil",
      "Derecho migratorio",
      "Recursos humanos",
    ],
    email: "veronica.martinez@iparkman.com.mx",
    imageSrc: "/veronica-martinez.jpg",
    imagePosition: "50% 30%",
    accent: "violet",
  },
  {
    id: "beatriz-gastinel",
    name: "Beatriz Gastinel",
    role: "Abogada · Derecho corporativo y tecnológico",
    stats: [
      { value: "Mtra.", label: "Ciencias jurídicas" },
      { value: "ANADE", label: "miembro" },
    ],
    bio: "Especialista en Derecho Corporativo y Tecnología Financiera (FinTech). Asesora a empresas en protección de datos personales, propiedad intelectual, derechos de autor y políticas de privacidad. Tiene experiencia directa ante el IMPI, INDAUTOR, INAI y Secretaría de Economía. Certificada en Arbitraje por el CEMAC y miembro de la Academia Mexicana de Derecho Internacional Privado.",
    tags: ["Datos personales", "Propiedad intelectual", "FinTech", "Arbitraje"],
    email: "beatriz.gastinel@iparkman.com.mx",
    imageSrc: "/beatriz.jpg",
    imagePosition: "50% 22%",
    accent: "amber",
  },
];
