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
  const inputMontoHonorario = document.getElementById("inputMontoHonorario");
  const inputConceptoHonorario = document.getElementById("inputConceptoHonorario");
  const btnAgregarHonorario = document.getElementById("btnAgregarHonorario");
  const listaHonorarios = document.getElementById("listaHonorarios");

  let honorarios = [];


//Escribano

const radioEscribanoSi = document.getElementById("radioEscribanoSi");
const radioEscribanoNo = document.getElementById("radioEscribanoNo");

const bloqueNombreEscribano = document.getElementById("bloqueNombreEscribano");
const bloqueBuscaEscribano = document.getElementById("bloqueBuscaEscribano");


const inputNombreEscribano = document.getElementById("inputNombreEscribano");
const btnGuardarEscribano = document.getElementById("btnGuardarEscribano");
const escribanoGuardado = document.getElementById("escribanoGuardado");


 // Apartado Bienes

  const tipoBien = document.getElementById("tipoBien");
  const btnAgregar = document.getElementById("agregarBien");
  const listaBienes = document.getElementById("listaBienes");

  //Apartado guardar e imprimir

  const btnImprimir = document.getElementById("btnImprimir");
  const btnPDF = document.getElementById("btnPDF");
  const resultadoFinal = document.getElementById("resultadoFinal");

  //Eventos

  btnAgregarHonorario.addEventListener("click", () => {
  const monto = parseFloat(inputMontoHonorario.value);
  const concepto = inputConceptoHonorario.value.trim();

  if (!monto || monto <= 0) {
    alert("Ingrese un monto válido");
    return;
  }

  if (!concepto) {
    alert("Ingrese un concepto");
    return;
  }

  honorarios.push({ monto, concepto });

  renderHonorarios();

  // 🔥 limpiar inputs
  inputMontoHonorario.value = "";
  inputConceptoHonorario.value = "";
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


  btnGuardarEscribano.addEventListener("click", () => {
  const nombre = inputNombreEscribano.value.trim();

  if (!nombre) {
    alert("Ingrese el nombre del escribano");
    return;
  }

  escribanoGuardado.innerHTML = `
    <p><strong>Escribano:</strong> ${nombre}
    <button id="editarEscribano">Editar</button></p>
  `;

  inputNombreEscribano.style.display = "none";
  btnGuardarEscribano.style.display = "none";

  document.getElementById("editarEscribano").addEventListener("click", () => {
    inputNombreEscribano.style.display = "inline";
    btnGuardarEscribano.style.display = "inline";
  });
});



  //Logica escribano



radioEscribanoSi.addEventListener("change", () => {
  if (radioEscribanoSi.checked) {
    bloqueNombreEscribano.style.display = "block";
    bloqueBuscaEscribano.style.display = "none";

    // limpiar busca
    document.querySelectorAll('input[name="buscaEscribano"]').forEach(r => r.checked = false);
  }
});

radioEscribanoNo.addEventListener("change", () => {
  if (radioEscribanoNo.checked) {
    bloqueNombreEscribano.style.display = "none";
    bloqueBuscaEscribano.style.display = "block";

    // limpiar nombre
    document.getElementById("inputNombreEscribano").value = "";
  }
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
        const btnOk = div.querySelector(".btnOkNombre");
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
</fieldset>

<div class="bloqueAdjudicatario" style="display:none; margin-top:5px;">
  <input type="text" placeholder="Nombre del adjudicatario">
  <button type="button" class="btnConfirmarParticion">Confirmar</button>
  <div class="adjudicatarioGuardado"></div>
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
    const btnConfirmarParticion = contenedor.querySelector(
      ".btnConfirmarParticion",
    );
    const radiosDestino = contenedor.querySelectorAll(
      `input[name="destino_${idUnico}"]`,
    );
    const bloqueAdjudicatario = contenedor.querySelector(
      ".bloqueAdjudicatario",
    );
    const inputAdjudicatario = bloqueAdjudicatario.querySelector("input");
    const adjudicatarioGuardado = contenedor.querySelector(".adjudicatarioGuardado");
    


    radiosDestino.forEach((radio) => {
      radio.addEventListener("change", () => {
        if (radio.value === "adjudicacion" && radio.checked) {
          bloqueAdjudicatario.style.display = "block";
          btnConfirmarParticion.style.display = "inline-block";
        }

        if (radio.value === "venta" && radio.checked) {
          bloqueAdjudicatario.style.display = "none";
          inputAdjudicatario.value = "";
          btnConfirmarParticion.style.display = "none";
        }
      });
    });

    btnConfirmarParticion.addEventListener("click", () => {
  const nombre = inputAdjudicatario.value.trim();

  if (!nombre) {
    alert("Ingrese el nombre del adjudicatario");
    return;
  }

  // Mostrar en pantalla
  adjudicatarioGuardado.innerHTML = `
    <p><strong>Adjudicado a:</strong> ${nombre}</p>
  `;

  // Ocultar input y botón
  inputAdjudicatario.style.display = "none";
  btnConfirmarParticion.style.display = "none";
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

      const radioDestino = contenedor.querySelector(
        `input[name="destino_${idUnico}"]:checked`,
      );
      const destino = radioDestino ? radioDestino.value : "sin especificar";

      const adjudicatario = inputAdjudicatario.value.trim();

      bienes.push({
        tipoBien: texto,
        tipoOperacion: tipo,
        destino: destino,
        adjudicatario: adjudicatario,
        detalle: detalle,
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

function renderHonorarios() {
  let total = 30; // declaratoria fija

  let html = `<p><strong>Declaratoria:</strong> 30 JUS</p>`;

  honorarios.forEach((h, index) => {
    total += h.monto;

    html += `
      <p>
        ${h.concepto}: ${h.monto} JUS
        <button onclick="eliminarHonorario(${index})">❌</button>
      </p>
    `;
  });

  html += `<p><strong>Total:</strong> ${total} JUS</p>`;

  listaHonorarios.innerHTML = html;
}



function generarInforme() {
  let html = `<h2 style="text-align:center;">Informe de Sucesión</h2><hr>`;

  // Datos
  const nombre = inputNombre.value || "Sin nombre";
  const estado = document.querySelector('input[name="estado"]:checked');
  const estadoTexto = estado
    ? (estado.id === "radioCasado" ? "Casado" : "Soltero")
    : "No especificado";

  const escribanoSeleccion = document.querySelector('input[name="escribano"]:checked');
let escribanoTexto = "No especificado";

if (escribanoSeleccion) {

  if (escribanoSeleccion.value === "si") {

    let nombreEscribano = "";
    const bloque = document.querySelector("#escribanoGuardado p");

    if (bloque) {
      nombreEscribano = bloque.textContent
        .replace("Editar", "")
        .replace("Escribano:", "")
        .trim();
    }

    escribanoTexto = nombreEscribano ? `Sí (${nombreEscribano})` : "Sí";

  } else {

    const busca = document.querySelector('input[name="buscaEscribano"]:checked');

    if (busca) {
      escribanoTexto = `No (Busca: ${busca.value})`;
    } else {
      escribanoTexto = "No";
    }

  }
}
  const conyuge = document.querySelector('input[name="conyugeVive"]:checked');

  html += `
    <h3>Datos generales</h3>
    <p>
      <strong>Causante:</strong> ${nombre} &nbsp;&nbsp;&nbsp;
      <strong>Estado civil:</strong> ${estadoTexto}
    </p>
    <p>
      <strong>Escribano:</strong> ${escribanoTexto}
      <strong>Cónyuge vive:</strong> ${conyuge ? conyuge.value : "-"}
    </p>
  `;

  // Hijos
  const cantidad = inputCantidadHijos.value || 0;
  const nombresHijos = document.querySelectorAll("#contenedorNombresHijos .nombreGuardado p");

  let listaNombres = [];
  nombresHijos.forEach(h => listaNombres.push(h.textContent));

  html += `
    <h3>Hijos</h3>
    <p><strong>Cantidad:</strong> ${cantidad}</p>
    <p><strong>Nombres:</strong> ${listaNombres.join(", ") || "-"}</p>
  `;

  // Situaciones
  const cesion = document.querySelector('input[name="cesion"]:checked');
  const usufructo = document.querySelector('input[name="usufructo"]:checked');

  html += `
    <h3>Situaciones</h3>
    <p><strong>Cesión:</strong> ${cesion ? cesion.value : "No especificado"}</p>
    <p><strong>Usufructo:</strong> ${usufructo ? usufructo.value : "No especificado"}</p>
  `;

  // Bienes
  // Bienes
html += `<h3>Bienes</h3>`;
html += `<div class="grid-bienes">`;

bienes.forEach((bien, index) => {
  html += `
    <div class="bien-item">
      <strong>${index + 1}. ${bien.tipoBien}</strong><br>
      Tipo: ${bien.tipoOperacion}<br>
      Destino: ${bien.destino}
      ${bien.adjudicatario ? `<br>A: ${bien.adjudicatario}` : ""}
      <br>Detalle: ${bien.detalle}
    </div>
  `;
});

html += `</div>`;

  // Honorarios

 html += `<h3>Honorarios</h3>`;

let total = 30;

html += `<p><strong>Declaratoria:</strong> 30 JUS</p>`;

honorarios.forEach(h => {
  total += h.monto;
  html += `<p>${h.concepto}: ${h.monto} JUS</p>`;
});

html += `<p><strong>Total:</strong> ${total} JUS</p>`;

  resultadoFinal.innerHTML = html;
}

btnImprimir.addEventListener("click", () => {
  generarInforme();

  const contenido = resultadoFinal.innerHTML;

  const ventana = window.open("", "", "width=800,height=600");

  ventana.document.write(`
    <html>
      <head>
        <title>Informe</title>
        <style>
  body { 
    font-family: Arial, sans-serif; 
    padding: 25px;
    line-height: 1.5;
    color: #000;
  }

  h2 {
    text-align: center;
    margin-bottom: 10px;
  }

  h3 {
    margin-top: 20px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 3px;
  }

  p {
    margin: 5px 0;
  }

  hr {
    margin: 10px 0 20px 0;
  }

  .grid-bienes {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 30px;
  margin-top: 10px;
}

.bien-item {
  break-inside: avoid;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
}

  /* 👇 ESTO ES LO NUEVO */
  @media print {
    body {
      padding: 10px;
      font-size: 12px;
    }

    h2 {
      font-size: 16px;
    }

    h3 {
      font-size: 13px;
    }

    p {
      font-size: 12px;
    }

    #listaBienes {
     display: grid;
     grid-template-columns: repeat(2, minmax(0, 1fr));
     gap: 15px;
     width: 100%;
   }
  }
</style>
      </head>
      <body>
        ${contenido}
      </body>
    </html>
  `);

  ventana.document.close();
  ventana.print();
});


window.eliminarHonorario = function (index) {
  honorarios.splice(index, 1);
  renderHonorarios();
}
});