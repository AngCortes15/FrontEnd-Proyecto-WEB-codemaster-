let url = 'http://localhost:3000/api/run-code';

async function loadData() {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                // console.log();
                let data = JSON.parse(xhr.responseText);
                let cuerpo = document.getElementById("cuerpo");
                let cuerpo1 = document.getElementById("cuerpo1");
                cuerpo.innerHTML = "";
                cuerpo1.innerHTML = "";

                // let inicio = 0;/
                for (let i = 0; i < 4; i++) {
                    if(i%2==0){
                        cuerpo1.innerHTML += `<div class="row">
                    <div class="col-md-6 how-img">
                        <img src="${data[i].imageURL}"
                            class="rounded-circle img-fluid" alt="" />
                    </div>
                    <div class="col-md-6">
                        <h4 class="subheading">${data[i].title}</h4>
                        <p class="text-muted">
                            ${data[i].description}.
                        </p>
                    </div>
                </div>`;
                    }else{
                        cuerpo1.innerHTML += `<div class="row">
                        <div class="col-md-6">
                            <h4>${data[i].title}</h4>
                            <!-- <h4 class="subheading">aaaa</h4> -->
                            <p class="text-muted">
                            ${data[i].description}
                            </p>
                        </div>
                        <div class="col-md-6 how-img">
                            <img src="${data[i].imageURL}"
                                class="rounded-circle img-fluid" alt="" />
                        </div>
                    </div>`;
                    }
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
