export const scriptLibrary = {
  traffic: {
    en: {
      silence: {
        title: "Exercising Right to Remain Silent",
        text: "I am exercising my right to remain silent. I do not wish to answer any questions without my attorney present.",
        context: "When police ask questions beyond basic identification during a traffic stop.",
        tip: "Be polite but firm. Don't feel pressured to explain this right."
      },
      search: {
        title: "Refusing Consent to Search",
        text: "I do not consent to any searches of my vehicle, myself, or my belongings. I am not resisting, but I do not consent.",
        context: "When officers ask to search your car or belongings.",
        tip: "Make this statement clearly and repeat if necessary. Physical resistance is not needed."
      },
      detention: {
        title: "Asking About Detention Status",
        text: "Am I being detained, or am I free to leave?",
        context: "When it's unclear if you're required to stay or can leave.",
        tip: "This helps clarify the nature of the interaction and your legal obligations."
      },
      compliance: {
        title: "Complying Under Protest",
        text: "I am complying with your orders, but I want to make it clear that I do not consent to this search.",
        context: "When forced to comply with a search you believe is unlawful.",
        tip: "This preserves your legal rights while avoiding physical confrontation."
      }
    },
    es: {
      silence: {
        title: "Ejerciendo el Derecho a Permanecer en Silencio",
        text: "Estoy ejerciendo mi derecho a permanecer en silencio. No deseo responder ninguna pregunta sin mi abogado presente.",
        context: "Cuando la policía hace preguntas más allá de la identificación básica durante una parada de tráfico.",
        tip: "Sea cortés pero firme. No se sienta presionado a explicar este derecho."
      },
      search: {
        title: "Rechazando el Consentimiento para Registrar",
        text: "No consiento ningún registro de mi vehículo, mi persona, o mis pertenencias. No estoy resistiendo, pero no consiento.",
        context: "Cuando los oficiales piden registrar su auto o pertenencias.",
        tip: "Haga esta declaración claramente y repítala si es necesario. No se necesita resistencia física."
      },
      detention: {
        title: "Preguntando Sobre el Estado de Detención",
        text: "¿Estoy siendo detenido, o soy libre de irme?",
        context: "Cuando no está claro si debe quedarse o puede irse.",
        tip: "Esto ayuda a aclarar la naturaleza de la interacción y sus obligaciones legales."
      },
      compliance: {
        title: "Cumpliendo Bajo Protesta",
        text: "Estoy cumpliendo con sus órdenes, pero quiero dejar claro que no consiento a este registro.",
        context: "Cuando se ve obligado a cumplir con un registro que cree que es ilegal.",
        tip: "Esto preserva sus derechos legales mientras evita la confrontación física."
      }
    }
  },
  general: {
    en: {
      identify: {
        title: "Providing Identification",
        text: "Here is my identification. I am exercising my right to remain silent beyond this.",
        context: "When required to provide ID during any police encounter.",
        tip: "Provide required identification but assert your right to silence for other questions."
      },
      recording: {
        title: "Announcing Recording",
        text: "I am recording this interaction for my safety and yours. This is my legal right.",
        context: "When you begin recording a police interaction.",
        tip: "Be calm and matter-of-fact. Don't be confrontational about recording."
      },
      attorney: {
        title: "Requesting an Attorney",
        text: "I want to speak with an attorney before answering any questions. I am invoking my right to legal counsel.",
        context: "When police want to question you about potential criminal activity.",
        tip: "Be clear and unambiguous. Don't qualify this request."
      }
    },
    es: {
      identify: {
        title: "Proporcionando Identificación",
        text: "Aquí está mi identificación. Estoy ejerciendo mi derecho a permanecer en silencio más allá de esto.",
        context: "Cuando se requiere proporcionar identificación durante cualquier encuentro policial.",
        tip: "Proporcione la identificación requerida pero afirme su derecho al silencio para otras preguntas."
      },
      recording: {
        title: "Anunciando Grabación",
        text: "Estoy grabando esta interacción por mi seguridad y la suya. Este es mi derecho legal.",
        context: "Cuando comienza a grabar una interacción policial.",
        tip: "Manténgase calmado y objetivo. No sea confrontativo sobre la grabación."
      },
      attorney: {
        title: "Solicitando un Abogado",
        text: "Quiero hablar con un abogado antes de responder cualquier pregunta. Estoy invocando mi derecho al consejo legal.",
        context: "Cuando la policía quiere interrogarlo sobre actividad criminal potencial.",
        tip: "Sea claro e inequívoco. No califique esta solicitud."
      }
    }
  },
  search: {
    en: {
      warrant: {
        title: "Requesting to See Warrant",
        text: "Do you have a warrant? I would like to see the warrant before you proceed.",
        context: "When police want to search your home or property.",
        tip: "You have the right to examine any warrant before a search begins."
      },
      scope: {
        title: "Questioning Search Scope",
        text: "What specifically are you looking for? I want to understand the scope of this search.",
        context: "During a search to understand what police are seeking.",
        tip: "This can help ensure police don't exceed the scope of their authority."
      },
      revoke: {
        title: "Revoking Previous Consent",
        text: "I am revoking my consent to this search. I want you to stop searching now.",
        context: "When you change your mind about consenting to a search.",
        tip: "You can revoke consent at any time, even if you initially agreed."
      }
    },
    es: {
      warrant: {
        title: "Solicitando Ver la Orden",
        text: "¿Tienen una orden? Me gustaría ver la orden antes de que procedan.",
        context: "Cuando la policía quiere registrar su hogar o propiedad.",
        tip: "Tiene derecho a examinar cualquier orden antes de que comience un registro."
      },
      scope: {
        title: "Cuestionando el Alcance del Registro",
        text: "¿Qué específicamente están buscando? Quiero entender el alcance de este registro.",
        context: "Durante un registro para entender qué están buscando los policías.",
        tip: "Esto puede ayudar a asegurar que la policía no exceda el alcance de su autoridad."
      },
      revoke: {
        title: "Revocando Consentimiento Previo",
        text: "Estoy revocando mi consentimiento a este registro. Quiero que dejen de registrar ahora.",
        context: "Cuando cambia de opinión sobre consentir a un registro.",
        tip: "Puede revocar el consentimiento en cualquier momento, incluso si inicialmente estuvo de acuerdo."
      }
    }
  },
  arrest: {
    en: {
      understand: {
        title: "Confirming Arrest Status",
        text: "Am I under arrest? If so, I am invoking my right to remain silent and my right to an attorney.",
        context: "When it's unclear if you're being arrested or just detained.",
        tip: "Clarify your status immediately and invoke your rights if arrested."
      },
      miranda: {
        title: "Acknowledging Miranda Rights",
        text: "I understand my rights. I choose to remain silent and want an attorney present before any questioning.",
        context: "After being read your Miranda rights.",
        tip: "Even if you understand your rights, clearly state your intention to use them."
      },
      peaceful: {
        title: "Stating Non-Resistance",
        text: "I am not resisting arrest. I am complying with your instructions, but I maintain my right to remain silent.",
        context: "During an arrest to prevent any misunderstanding about your cooperation.",
        tip: "Make it clear you're not resisting while preserving your constitutional rights."
      }
    },
    es: {
      understand: {
        title: "Confirmando Estado de Arresto",
        text: "¿Estoy bajo arresto? Si es así, estoy invocando mi derecho a permanecer en silencio y mi derecho a un abogado.",
        context: "Cuando no está claro si está siendo arrestado o solo detenido.",
        tip: "Aclare su estado inmediatamente e invoque sus derechos si es arrestado."
      },
      miranda: {
        title: "Reconociendo Derechos Miranda",
        text: "Entiendo mis derechos. Elijo permanecer en silencio y quiero un abogado presente antes de cualquier interrogatorio.",
        context: "Después de que le lean sus derechos Miranda.",
        tip: "Incluso si entiende sus derechos, declare claramente su intención de usarlos."
      },
      peaceful: {
        title: "Declarando No Resistencia",
        text: "No estoy resistiendo el arresto. Estoy cumpliendo con sus instrucciones, pero mantengo mi derecho a permanecer en silencio.",
        context: "Durante un arresto para prevenir cualquier malentendido sobre su cooperación.",
        tip: "Deje claro que no está resistiendo mientras preserva sus derechos constitucionales."
      }
    }
  }
};