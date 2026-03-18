document.addEventListener("DOMContentLoaded", function () {

// Variables


const bloqueNombre = document.getElementById("bloqueNombre");
const inputNombre = document.getElementById("inputNombre");
const btnNombreOk = document.getElementById("btnNombreOk");
const nombreGuardado = document.getElementById("nombreGuardado");

//Apartado Datos
const radioCasado = document.getElementById("radioCasado");
const radiosEstadoCivil = document.getElementsByName("estado");
const bloqueConyuge = document.getElementById("bloqueConyuge");

const radiosHijos = document.getElementsByName("hijos");
const bloqueCantidadHijos = document.getElementById("bloqueCantidadHijos");



// Apartado Bienes

const tipoBien = document.getElementById("tipoBien");
const btnAgregar = document.getElementById("agregarBien");
const listaBienes = document.getElementById("listaBienes");





btnNombreOk.addEventListener("click", () => {
    const nombre = inputNombre.value.trim();

    if (!nombre) {
        alert("Ingrese un nombre");
        return;
    }

    // Mostrar valor fijo
    nombreGuardado.innerHTML = `<p><strong>Nombre:</strong> ${nombre}
                                <button id="editarNombre">Editar</button></p>`;

    //  OCULTAR TODO EL BLOQUE
    bloqueNombre.style.display = "none";

    document.getElementById("editarNombre").addEventListener("click", () => {
    bloqueNombre.style.display = "block";
});

});


//Logica Datos

radiosEstadoCivil.forEach(radio => {
    radio.addEventListener("change", () => {

        if (radioCasado.checked) {
            bloqueConyuge.style.display = "block";
        } else {
            bloqueConyuge.style.display = "none";

            //Limpia
            document.querySelectorAll('input[name="conyugeVive"]').forEach(r => {
                r.checked = false;
            });
        }

    });
});


//Logica Hijos
radiosHijos.forEach(radio => {
    radio.addEventListener("change", () => {
        if (radio.value === "si") {
            bloqueCantidadHijos.style.display = "block";
        } else {
            bloqueCantidadHijos.style.display = "none";
        }
    });
});



const cantidadHijosGuardada = document.getElementById("cantidadHijosGuardada");

btnAplicarHijos.addEventListener("click", () => {
    const cantidad = cantidadHijos.value;

    if (!cantidad) {
        alert("Seleccione cantidad de hijos");
        return;
    }

    // Mostrar valor fijo
    cantidadHijosGuardada.innerHTML = `
        <p>
            <strong>Cantidad de hijos:</strong> ${cantidad}
            <button id="editarCantidadHijos">Editar</button>
        </p>
    `;

    // Ocultar bloque de selección
    bloqueCantidadHijos.style.display = "none";

    // Mostrar botón cargar nombres
    bloqueCargarNombres.style.display = "block";

    // Evento editar
    document.getElementById("editarCantidadHijos").addEventListener("click", () => {
        bloqueCantidadHijos.style.display = "block";
        cantidadHijosGuardada.innerHTML = "";
        bloqueCargarNombres.style.display = "none";
        contenedorHijos.innerHTML = "";
    });
});

//Logica Bienes

btnAgregar.addEventListener("click", () => {

        const valor = tipoBien.value;
        const texto = tipoBien.options[tipoBien.selectedIndex].text;

        if (!valor) {
            alert("Seleccione un tipo de bien");
            return;
        }

        // 🔹 crear contenedor del bien
        const contenedor = document.createElement("div");
        contenedor.style.border = "1px solid #ccc";
        contenedor.style.padding = "8px";
        contenedor.style.marginTop = "5px";

        contenedor.innerHTML = `
            <p>
                <strong>${texto}</strong>
                <button type="button" class="btnEliminar">❌</button>
            </p>

            <div class="bloqueDetalle">
                <input type="text" placeholder="Ingrese detalle...">
                <button type="button" class="btnOkDetalle">OK</button>
            </div>

            <div class="detalleGuardado"></div>
            
        `;

        listaBienes.appendChild(contenedor);

        //  lógica del botón OK
        const input = contenedor.querySelector("input");
        const btnOk = contenedor.querySelector(".btnOkDetalle");
        const detalleGuardado = contenedor.querySelector(".detalleGuardado");
        const bloqueDetalle = contenedor.querySelector(".bloqueDetalle");
        const btnEliminar = contenedor.querySelector(".btnEliminar");

        btnEliminar.addEventListener("click", () => {
            contenedor.remove();
        });

        btnOk.addEventListener("click", () => {
            const detalle = input.value.trim();

            if (!detalle) {
                alert("Ingrese un detalle");
                return;
            }

            detalleGuardado.innerHTML = `<p>${detalle}</p>`;

            // ocultar input después de guardar
            bloqueDetalle.style.display = "none";
        });

    });


});