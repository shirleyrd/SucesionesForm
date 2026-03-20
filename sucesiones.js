document.addEventListener("DOMContentLoaded", function () {
  // Variables

  const bienes = [];
  const bloqueNombre = document.getElementById("bloqueNombre");
  const inputNombre = document.getElementById("inputNombre");
  const btnNombreOk = document.getElementById("btnNombreOk");
  const nombreGuardado = document.getElementById("nombreGuardado");

  //Apartado Datos
  const radioCasado = document.getElementById("radioCasado");
  const radiosEstadoCivil = document.getElementsByName("estado");
  const bloqueConyuge = document.getElementById("bloqueConyuge");

  //Datos hijos
  const inputCantidadHijos = document.getElementById("inputCantidadHijos");
  const btnConfirmarHijos = document.getElementById("btnConfirmarHijos");
  const cantidadHijosGuardada = document.getElementById(
    "cantidadHijosGuardada",
  );

  const bloqueAgregarNombres = document.getElementById("bloqueAgregarNombres");
  const chkAgregarNombres = document.getElementById("chkAgregarNombres");
  const contenedorNombresHijos = document.getElementById(
    "contenedorNombresHijos",
  );


  //Honorarios

  const btnSumar = document.getElementById("btnSumarHonorarios");
  const inputJus = document.getElementById("jusParticion");
  const resultado = document.getElementById("resultadoHonorarios");

  // Apartado Bienes

  const tipoBien = document.getElementById("tipoBien");
  const btnAgregar = document.getElementById("agregarBien");
  const listaBienes = document.getElementById("listaBienes");


//Eventos

btnSumar.addEventListener("click", () => {

  const jusParticion = parseFloat(inputJus.value) || 0;
  const declaratoria = 30;

  const total = declaratoria + jusParticion;

  resultado.innerHTML = `
    <p><strong>Declaratoria:</strong> ${declaratoria} JUS</p>
    <p><strong>Partición:</strong> ${jusParticion} JUS</p>
    <p><strong>Total:</strong> ${total} JUS</p>
  `;
});
  

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

  radiosEstadoCivil.forEach((radio) => {
    radio.addEventListener("change", () => {
      if (radioCasado.checked) {
        bloqueConyuge.style.display = "block";
      } else {
        bloqueConyuge.style.display = "none";

        //Limpia
        document.querySelectorAll('input[name="conyugeVive"]').forEach((r) => {
          r.checked = false;
        });
      }
    });
  });

  //Logica Hijos

  btnConfirmarHijos.addEventListener("click", () => {
    const cantidad = inputCantidadHijos.value.trim();

    if (!cantidad || cantidad < 0) {
      alert("Ingrese una cantidad válida");
      return;
    }

    cantidadHijosGuardada.innerHTML = `
        <p>
            <strong>Cantidad de Hijos:</strong> ${cantidad}
            <button id="editarCantidadHijos">Editar</button>
        </p>    
        `;

    //para ocultar input
    document.getElementById("bloqueHijos").style.display = "none";

    //mostrar nombre
    bloqueAgregarNombres.style.display = "block";

    //para editar nombres
    document
      .getElementById("editarCantidadHijos")
      .addEventListener("click", () => {
        document.getElementById("bloqueHijos").style.display = "block";
        cantidadHijosGuardada.innerHTML = "";
        bloqueAgregarNombres.style.display = "none";
        contenedorNombresHijos.innerHTML = "";
        chkAgregarNombres.checked = false;
      });
  });

  //Mostrar nombres hijos

  chkAgregarNombres.addEventListener("change", () => {
    contenedorNombresHijos.innerHTML = "";

    if (chkAgregarNombres.checked) {
      const cantidad = inputCantidadHijos.value;

      for (let i = 1; i <= cantidad; i++) {
        const div = document.createElement("div");

        div.innerHTML = `
                <label>Hijo ${i}</label>
                <input type="text" placeholder ="Nombre del Hijo ${i}">
                <button type="button" class="btnOkNombre">Confirmar</button>
                <div class="nombreGuardado"></div>
                `;

        contenedorNombresHijos.appendChild(div);

        const input = div.querySelector("input");
        const btnOk = contenedor.querySelector(".btnGuardarBien");
        const nombreGuardado = div.querySelector(".nombreGuardado");

        btnOk.addEventListener("click", () => {
          const nombre = input.value.trim();

          if (!nombre) {
            alert("Ingrese un nombre");
            return;
          }

          nombreGuardado.innerHTML = `<p> ${nombre}</p>`;
          input.style.display = "none";
          btnOk.style.display = "none";
        });
      }
    } else {
      contenedorNombresHijos.innerHTML = "";
    }
  });

  //Logica Bienes

  btnAgregar.addEventListener("click", () => {
    const valor = tipoBien.value;
    const texto = tipoBien.options[tipoBien.selectedIndex].text;

    if (!valor) {
      alert("Seleccione un tipo de bien");
      return;
    }

    //  Crear contenedor del bien
    const contenedor = document.createElement("div");
    contenedor.style.border = "1px solid #ccc";
    contenedor.style.padding = "8px";
    contenedor.style.marginTop = "5px";
    const idUnico = Date.now();

    contenedor.innerHTML = `
            <p>
                <strong>${texto}</strong>
                <button type="button" class="btnEliminar">❌</button>
            </p>

            <div>
              <label>
              <input type="radio" name="tipoOperacion_${idUnico}" value="propio">
              Propio
              </label>
              <label>
                <input type="radio" name="tipoOperacion_${idUnico}" value="ganancial">
                Ganancial
              </label>
           </div>

           <div class="bloqueDetalle">
                <input type="text" placeholder="Ingrese detalle...">                
            </div>

            <div class="detalleGuardado"></div>

           <fieldset style="margin-top:5px;">
  <legend>Partición</legend>

  <label>
    <input type="radio" name="destino_${idUnico}" value="venta">
    Venta
  </label>

  <label>
    <input type="radio" name="destino_${idUnico}" value="adjudicacion">
    Adjudicación
  </label>

  <button type="button" class="btnConfirmarParticion">Confirmar</button>
</fieldset>

<div class="bloqueAdjudicatario" style="display:none; margin-top:5px;">
  <input type="text" placeholder="Nombre del adjudicatario">
</div>

<button type="button" class="btnGuardarBien">Guardar</button>

            
            
        `;

    listaBienes.appendChild(contenedor);

    //  lógica del botón OK
    const input = contenedor.querySelector(".bloqueDetalle input");
    const btnOk = contenedor.querySelector(".btnGuardarBien");
    const detalleGuardado = contenedor.querySelector(".detalleGuardado");
    const bloqueDetalle = contenedor.querySelector(".bloqueDetalle");
    const btnEliminar = contenedor.querySelector(".btnEliminar");
    const btnConfirmarParticion = contenedor.querySelector(".btnConfirmarParticion");
    const radiosDestino = contenedor.querySelectorAll(`input[name="destino_${idUnico}"]`);
    const bloqueAdjudicatario = contenedor.querySelector(".bloqueAdjudicatario");
    const inputAdjudicatario = bloqueAdjudicatario.querySelector("input");



    radiosDestino.forEach(radio => {
  radio.addEventListener("change", () => {
    if (radio.value === "adjudicacion" && radio.checked) {
      bloqueAdjudicatario.style.display = "block";
    } else if (radio.value === "venta" && radio.checked) {
      bloqueAdjudicatario.style.display = "none";
      inputAdjudicatario.value = "";
    }
  });
});

btnConfirmarParticion.addEventListener("click", () => {

  const radioDestino = contenedor.querySelector(`input[name="destino_${idUnico}"]:checked`);

  if (!radioDestino) {
    alert("Seleccione Venta o Adjudicación");
    return;
  }

  // Solo feedback visual (NO tocamos nada más)
  btnConfirmarParticion.textContent = "✔ Confirmado";
});

    btnEliminar.addEventListener("click", () => {
      contenedor.remove();
    });

    btnOk.addEventListener("click", () => {
      const detalle = input.value.trim();

      if (!detalle) {
        alert("Ingrese un detalle");
        return;
      }
      const radioSeleccionado = contenedor.querySelector(
        `input[name="tipoOperacion_${idUnico}"]:checked`,
      );
      const tipo = radioSeleccionado
        ? radioSeleccionado.value
        : "sin especificar";

      const radioDestino = contenedor.querySelector(`input[name="destino_${idUnico}"]:checked`);
const destino = radioDestino ? radioDestino.value : "sin especificar";

const adjudicatario = inputAdjudicatario.value.trim();

bienes.push({
  tipoBien: texto,
  tipoOperacion: tipo,
  destino: destino,
  adjudicatario: adjudicatario,
  detalle: detalle
});

      detalleGuardado.innerHTML = `
<p><strong>Tipo:</strong> ${tipo}</p>
<p><strong>Destino:</strong> ${destino}</p>
${destino === "adjudicacion" && adjudicatario ? `<p><strong>Adjudicado a:</strong> ${adjudicatario}</p>` : ""}
<p><strong>Detalle:</strong> ${detalle}</p>
`;

      // ocultar input después de guardar
      bloqueDetalle.style.display = "none";
    });
  });
});
