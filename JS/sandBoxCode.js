async function runCode() {
    return new Promise(function (resolve, reject) {
        // ... el resto de tu código aquí ...
        let code = document.getElementById('code').value;



        let xhr = new XMLHttpRequest();
        let url = "http://localhost:3000/api/run-code";

        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                console.log(xhr.responseText);

                let respuesta = (xhr.responseText);
                console.log(respuesta);
                console.log(xhr.responseText);
                resolve(respuesta);
            } else {
                alert("Mal sintaxis del codigo ");
                console.log('Error en la solicitud. Código de estado: ' + xhr.status);
                reject(new Error('Error en la solicitud. Código de estado: ' + xhr.status));
            }
        };

        xhr.onerror = () => {
            console.log('Error de red al hacer la solicitud.');
            reject(new Error('Error de red al hacer la solicitud.'));
        };

        xhr.send(JSON.stringify({ codigo: code }));

        
    });
}

async function otraFuncion() {
    try {
        let respuesta = await runCode();
        console.log('Respuesta de runCode:', respuesta);
        // Aquí puedes realizar acciones adicionales después de que runCode haya terminado

        let iframe = document.getElementById('result');
        let iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

        // Crear un documento en blanco dentro del iframe
        iframeDocument.open();
        iframeDocument.write(' ');
        iframeDocument.write(respuesta);
        iframeDocument.close();
    } catch (error) {
        console.error('Error al ejecutar runCode:', error);
    }
}

// Llamar a otraFuncion
// otraFuncion();