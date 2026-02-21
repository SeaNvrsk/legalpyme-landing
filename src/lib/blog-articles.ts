export type ArticleBlock =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "intro"; text: string };

export const blogArticles: Record<string, ArticleBlock[]> = {
  "como-obtener-e-firma-en-sat": [
    {
      type: "intro",
      text: "En LegalPyme te acompañamos para que obtengas tu e.firma ante el SAT sin errores ni demoras. Nos encargamos de la orientación, la revisión de documentación y el seguimiento para que puedas facturar y cumplir tus obligaciones fiscales con tranquilidad.",
    },
    { type: "h2", text: "Qué hacemos por ti" },
    {
      type: "ul",
      items: [
        "Revisamos que reúnas todos los requisitos (identificación, comprobante de domicilio, CURP/RFC, y en su caso documentación del representante legal) antes de acudir al SAT.",
        "Te indicamos exactamente qué documentos llevar en original y copia y cómo preparar la cita para evitar rechazos en ventanilla.",
        "Te asesoramos sobre el alta o cambio de régimen fiscal que mejor convenga a tu actividad antes o junto con el trámite de la e.firma.",
        "Te guiamos en la descarga y el resguardo seguro del certificado (.cer) y la contraseña (.key) una vez que el SAT te los entregue.",
      ],
    },
    { type: "h2", text: "Por qué conviene contar con nosotros" },
    {
      type: "p",
      text: "El trámite de la e.firma es presencial y depende de citas y documentación correcta. Un error en los requisitos o en el régimen fiscal puede retrasar tu capacidad para facturar. Nosotros te ayudamos a llegar preparado y a evitar contratiempos, para que en una sola visita puedas obtener tu e.firma y, si aplica, dejar al día tu situación ante Hacienda.",
    },
    { type: "h2", text: "Cómo empezar" },
    {
      type: "p",
      text: "Escríbenos con tu situación (persona física o moral, si ya tienes RFC o no) y te decimos qué necesitamos de tu parte. Una vez que tengamos la información, te entregamos una guía personalizada y el acompañamiento hasta que tengas tu e.firma activa. Si además necesitas ayuda con facturación o declaraciones, podemos ofrecerte un paquete de asesoría fiscal continuada.",
    },
  ],

  "registro-de-marca-en-impi": [
    {
      type: "intro",
      text: "En LegalPyme nos encargamos de preparar y gestionar el registro de tu marca ante el IMPI para que obtengas la protección legal de tu nombre, logo o signo distintivo en México, sin que tengas que lidiar tú solo con la búsqueda, la redacción ni el seguimiento del trámite.",
    },
    { type: "h2", text: "Servicios que te ofrecemos" },
    {
      type: "ul",
      items: [
        "Búsqueda de antecedentes marcarios en la base del IMPI para valorar si tu signo es registrable y detectar posibles conflictos antes de presentar la solicitud.",
        "Asesoría en la elección de la clase (o clases) de la Clasificación de Niza según tus productos o servicios.",
        "Elaboración y presentación de la solicitud de registro ante el IMPI, con la documentación y la representación gráfica correctas.",
        "Seguimiento del expediente ante el IMPI y gestión de requerimientos o respuestas durante el trámite.",
        "Orientación sobre vigencia, renovaciones y defensa de tu marca una vez registrada.",
      ],
    },
    { type: "h2", text: "Qué necesitamos de ti" },
    {
      type: "p",
      text: "Nos compartes el nombre o logo que quieres registrar, los productos o servicios que ofreces (o planeas ofrecer) y los datos del titular (persona física o moral). Con eso preparamos la búsqueda y la solicitud. Si ya tienes un diseño o logotipo, lo integramos al expediente según los lineamientos del IMPI.",
    },
    { type: "h2", text: "Ventaja de delegar el trámite en nosotros" },
    {
      type: "p",
      text: "Un registro mal redactado o una clase equivocada puede retrasar o frustrar la protección de tu marca. Nosotros nos encargamos de la parte técnica y administrativa para que tú solo nos des la información y recibas la orientación sobre plazos, costos y siguientes pasos. Si lo deseas, podemos incluir la búsqueda y la solicitud en un paquete cerrado para tu PyME.",
    },
  ],

  "particularidades-del-empleo-en-mexico": [
    {
      type: "intro",
      text: "En LegalPyme te ayudamos a contratar y desvincular personal en regla con la Ley Federal del Trabajo y el IMSS. Redactamos o revisamos contratos, te orientamos sobre altas y prestaciones, y preparamos finiquitos para que tu PyME evite multas y conflictos laborales.",
    },
    { type: "h2", text: "Cómo te ayudamos" },
    {
      type: "ul",
      items: [
        "Elaboración o revisión de contratos individuales de trabajo con las cláusulas que exige la ley (datos de las partes, puesto, lugar, horario, salario, día de pago) y redacción clara de funciones para reducir riesgos legales.",
        "Asesoría para el alta de tus trabajadores en el IMSS y para el registro correcto del salario base de cotización desde el primer día.",
        "Orientación sobre prestaciones de ley (aguinaldo, vacaciones, prima vacacional, PTU, prima dominical, etc.) y cómo documentarlas.",
        "Elaboración de finiquitos y liquidaciones que incluyan salarios pendientes, proporcionales de aguinaldo y vacaciones y, en su caso, prima de antigüedad, para que el cierre de la relación quede documentado y en orden.",
        "Asesoría en caso de despidos o renuncias para minimizar el riesgo de reclamaciones laborales.",
      ],
    },
    { type: "h2", text: "Qué te entregamos" },
    {
      type: "p",
      text: "Contratos y finiquitos listos para firmar, adaptados a tu giro y al tipo de puesto. Te explicamos qué debe cumplir tu empresa y qué obligaciones tienes con el IMSS y con el trabajador, para que tomes decisiones informadas y mantengas tu negocio en cumplimiento.",
    },
    { type: "h2", text: "Por qué es importante delegar en un experto" },
    {
      type: "p",
      text: "Un contrato mal redactado o un finiquito incompleto puede derivar en multas del IMSS, demandas laborales o reclamos de prestaciones. Nosotros nos encargamos de la parte legal y documental para que tú te enfoques en operar tu negocio. Escríbenos con el número de empleados que tienes o planeas contratar y te proponemos un paquete de asesoría laboral a la medida.",
    },
  ],

  "impuestos-para-pequenas-empresas-resico": [
    {
      type: "intro",
      text: "En LegalPyme te ofrecemos asesoría fiscal para PyMEs en Resico: te ayudamos a saber si te conviene este régimen, a cumplir tus obligaciones mensuales ante el SAT y a mantener tu negocio al día con Hacienda, sin que tengas que resolver tú solo los detalles técnicos.",
    },
    { type: "h2", text: "Qué hacemos por tu PyME" },
    {
      type: "ul",
      items: [
        "Valoramos si tu actividad y nivel de ingresos encajan en Resico y te explicamos las ventajas (tasa fija de ISR, declaraciones simplificadas) y las obligaciones del régimen.",
        "Te guiamos en el alta o cambio de régimen ante el SAT cuando corresponda.",
        "Asesoría para la presentación de tus declaraciones mensuales en tiempo y forma, y para el cálculo del ISR y, en su caso, IVA que te corresponda.",
        "Orientación sobre expedición de comprobantes fiscales y conservación de documentación que el SAT puede solicitar.",
        "Acompañamiento continuo para que no pierdas plazos ni incurras en multas o en la pérdida del régimen por incumplimiento.",
      ],
    },
    { type: "h2", text: "Qué recibes al trabajar con nosotros" },
    {
      type: "p",
      text: "Respuestas claras sobre qué debes presentar cada mes, en qué plazos y con qué datos. Te ayudamos a organizar tu información para las declaraciones y a tomar decisiones informadas. Si lo prefieres, podemos ofrecerte un paquete de asesoría fiscal mensual para que tu PyME cumpla sin que tengas que dedicar horas a trámites.",
    },
    { type: "h2", text: "Cómo empezar" },
    {
      type: "p",
      text: "Cuéntanos si ya estás en Resico o si estás por darte de alta, tu tipo de actividad y, si lo tienes, tu nivel aproximado de ingresos. Con eso te decimos cómo podemos ayudarte: desde una consulta puntual hasta un esquema de asesoría recurrente para que tu cumplimiento fiscal quede en manos de expertos.",
    },
  ],

  "proteccion-de-datos-personales-clientes": [
    {
      type: "intro",
      text: "En LegalPyme te ayudamos a cumplir con la Ley Federal de Protección de Datos Personales: redactamos tu aviso de privacidad, te orientamos sobre consentimientos y buenas prácticas, para que tu PyME trate los datos de clientes, proveedores y candidatos de forma legal y transparente.",
    },
    { type: "h2", text: "Servicios que te ofrecemos" },
    {
      type: "ul",
      items: [
        "Redacción de avisos de privacidad integrales y simplificados adaptados a tu giro, que indiquen qué datos recabas, para qué los usas, con quién los compartes (si aplica) y cómo se ejercen los derechos ARCO (acceso, rectificación, cancelación y oposición).",
        "Asesoría sobre cuándo y cómo obtener el consentimiento de los titulares (expreso para datos sensibles, y buenas prácticas para el resto).",
        "Orientación para implementar medidas de seguridad y confidencialidad (acceso limitado, plazos de conservación, procedimientos de destrucción o anonimización).",
        "Revisión o elaboración de políticas internas de manejo de datos para que tu equipo sepa cómo tratar la información personal.",
      ],
    },
    { type: "h2", text: "Qué te entregamos" },
    {
      type: "p",
      text: "Documentos listos para publicar o firmar: aviso de privacidad para tu sitio web, contratos o formularios, y en su caso lineamientos internos. Te explicamos en qué momentos debes mostrar el aviso y qué respuestas dar si un titular ejerce sus derechos, para que tu PyME esté preparada ante el INAI y ante tus clientes.",
    },
    { type: "h2", text: "Por qué delegar en nosotros" },
    {
      type: "p",
      text: "Un aviso de privacidad incompleto o mal redactado puede generar sanciones del INAI y desconfianza. Nosotros nos encargamos de que tu aviso cumpla la ley y sea claro para los usuarios. Si ya recabas datos y aún no tienes aviso, o si quieres actualizar el que tienes, escríbenos y te decimos cómo podemos ayudarte con un paquete a la medida de tu negocio.",
    },
  ],
};

export function getArticleContent(slug: string): ArticleBlock[] | null {
  return blogArticles[slug] ?? null;
}
