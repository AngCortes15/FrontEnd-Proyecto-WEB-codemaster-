function runCode() {
    const code = document.getElementById('code').value;
    const iframe = document.getElementById('result');
    const consoleContainer = document.createElement('div');
    document.body.appendChild(consoleContainer);

    let iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

    // Sobrescribir console.log en el contexto del iframe
    iframe.contentWindow.console.log = (...args) => {
        const logMessage = args.map(arg => JSON.stringify(arg)).join(' ');
        consoleContainer.innerHTML += `<p>${logMessage}</p>`;
    };

    try {
        // Crear un documento en blanco dentro del iframe
        iframeDocument.open();
        iframeDocument.write('<script>' + code + '</script>');
        iframeDocument.close();
    } catch (error) {
        console.error('Error al ejecutar el código:', error);
    }
}

// Esperar un tiempo después de ejecutar el código antes de obtener la respuesta
function esperarRespuesta() {
    const iframe = document.getElementById('result');
    const consoleContainer = document.createElement('div');
    document.body.appendChild(consoleContainer);

    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

    return new Promise(resolve => {
        // Observar el contenido del iframe para detectar cambios
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.type === 'childList') {
                    // Contenido del iframe ha cambiado, resuelve la promesa
                    resolve();
                }
            });
        });

        // Configurar la observación para detectar cambios en el contenido del iframe
        observer.observe(iframeDocument.body, { childList: true });

        // Detener la observación después de un tiempo (puedes ajustar este tiempo según sea necesario)
        setTimeout(() => observer.disconnect(), 5000);
    });
}

// Llamar a la función esperarRespuesta después de ejecutar el código
// runCode();
esperarRespuesta().then(() => {
    console.log('Respuesta lista');
    // Aquí puedes realizar acciones adicionales después de que la respuesta esté lista
});
