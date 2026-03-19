// js/chatbot.js

const responses = {
    // Respuestas base
    "hola": "¡Hola! ¿En qué puedo ayudarte hoy?",
    "gracias": "De nada! Estoy aquí para responder preguntas sobre mis habilidades.",
    "adios": "¡Hasta pronto! Espero haber sido útil.",
    
    // Respuestas basadas en habilidades y proyectos
    "nube": "Para la nube privada, utilicé **Nextcloud** alojado en un stack LAMP (Linux, Apache, MariaDB, PHP) en Ubuntu Server.",
    "minecraft": "El servidor de Minecraft fue configurado en un usuario dedicado con asignación forzada de 5 GB de RAM y ejecutado con el comando <strong>'screen'</strong> para persistencia.",
    "meren": "Meren of Clan Nel Toth es un proyecto de análisis estratégico para el formato Commander. El sitio detalla mis tres principales planes de juego: Sacrificio/Recursión, Toolbox y Combo.",
    "usaste": "Mis habilidades incluyen la gestión de sistemas (UFW, Virtual Hosts), diseño UX/UI (Wireframes, Prototipos) y modelado 3D (Blender/3ds Max).",
    "web": "Mi trabajo en frontent se centra en la arquitectura de información, la accesibilidad y el prototipado de alta fidelidad, tal como se detalla en la pestaña de Proyecto web.",
    "3d": "El modelo 3D del casco del Jefe Maestro fue creado usando Blender para el modelado y 3ds Max/Substance Painter para el texturizado PBR. Lo puedes ver en la pestaña 'Diseño 3D'.",
    "contacto": "La forma mas facil para contactar me es atraves de Whattsapp en el numero: 5551947091"
};

const display = document.getElementById('chat-display');
const input = document.getElementById('user-input');

// Función principal para enviar y procesar mensajes
function sendMessage() {
    const userText = input.value.trim().toLowerCase();
    
    if (userText === '') return;

    // 1. Mostrar mensaje del usuario
    appendMessage(userText, 'user-message');

    // 2. Obtener y mostrar respuesta del bot
    const botResponse = getBotResponse(userText);
    setTimeout(() => {
        appendMessage(botResponse, 'bot-message');
    }, 900); // Pequeño retraso para simular "pensamiento"
    
    // 3. Limpiar entrada
    input.value = '';
}

// Función para añadir mensajes al display
function appendMessage(text, className) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', className);
    messageElement.innerHTML = text; // Usamos innerHTML para aceptar etiquetas como <strong>
    display.appendChild(messageElement);
    
    // Scroll automático al final
    display.scrollTop = display.scrollHeight;
}

// Lógica de respuesta simple (busca palabras clave)
function getBotResponse(text) {
    for (const pattern in responses) {
        if (text.includes(pattern)) {
            return responses[pattern];
        }
    }
    return "Lo siento, no entendí tu pregunta. Intenta con una palabra clave (ej: 'nube', 'meren', 'minecraft').";
}

// Permite enviar mensaje al presionar Enter
input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});