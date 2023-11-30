let url = 'http://localhost:3000/api/run-code';

async function loadData() {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                // console.log();
                let data = JSON.parse(xhr.responseText);
                console.log(data);
                let cuerpo = document.getElementById("cuerpo");
                let cuerpo1 = document.getElementById("cuerpo1");
                cuerpo.innerHTML = "";
                cuerpo1.innerHTML = "";

                // let inicio = 0;/
                for (let i = 14; i < 15; i++) {
                    cuerpo1.innerHTML += `<h2>${data[i].title}</h2>
                        <p>${data[i].description}</p>`;
                }
                cuerpo.appendChild(cuerpo1);

                for (let i = 15; i < 18; i++) {
                    cuerpo1.innerHTML += `<h3>${data[i].title}</h3>
                    <p>${data[i].description}</p>
                    <textarea name="text1" id="text1 cols="30" rows="10">
${data[i].textArea}
                    </textarea>
                    <br>
                    <a class="btn btn-secondary" href="${data[i].btnURL}" role="button"  target="_blank">Try</a>
                    <br><br><br>`;
                }
                cuerpo.appendChild(cuerpo1);

                resolve(xhr.responseText);
            } else {
                reject(new Error('Error en la solicitud. Código de estado: ' + xhr.status));
            }
        };

        xhr.onerror = function () {
            reject(new Error('Error de red al hacer la solicitud.'));
        };

        xhr.send();
    });
}

async function fetchData() {
    try {
        const response = await loadData();
        //   console.log('Respuesta:', response);

    } catch (error) {
        console.error(error.message);
    }
}

fetchData();