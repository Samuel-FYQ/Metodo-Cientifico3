// =========================
//   NORMALIZAR
// =========================
function normalizar(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}


// =========================
//   INSIGNIAS
// =========================
const insigniasDisponibles = {
    casoCompletado: "🏅 Caso completado",
    perfecto: "🌟 Perfecto (sin fallos)",
    tresCasos: "🔥 Persistente (3 casos completados)",
    maestro: "🏆 Maestro del método científico (10 casos)"
};


// =========================
//   VARIABLES
// =========================
let puntuacion = 0;
let casoActual = null;
let etiquetaActual = null;
let alumno = "";
let curso = "";


// =========================
//   DESORDENAR ARRAY
// =========================
function mezclar(array) {
    return array
        .map(x => ({ x, r: Math.random() }))
        .sort((a, b) => a.r - b.r)
        .map(a => a.x);
}


// =========================
//   CARGAR INSIGNIAS
// =========================
function cargarInsignias() {
    const panel = document.getElementById("insigniasPanel");
    panel.innerHTML = "";

    const todas = JSON.parse(localStorage.getItem("insignias3ESO")) || {};
    const delAlumno = todas[alumno] || [];

    delAlumno.forEach(id => {
        const div = document.createElement("div");
        div.classList.add("insignia");
        div.innerText = insigniasDisponibles[id];
        panel.appendChild(div);
    });
}


// =========================
//   DESBLOQUEAR INSIGNIA
// =========================
function desbloquearInsignia(id) {
    let todas = JSON.parse(localStorage.getItem("insignias3ESO")) || {};

    if (!todas[alumno]) todas[alumno] = [];

    if (!todas[alumno].includes(id)) {
        todas[alumno].push(id);
        localStorage.setItem("insignias3ESO", JSON.stringify(todas));
        cargarInsignias();
    }
}


// =========================
//   CASOS
// =========================
const casos = [
    {
        titulo: "Caso 1: Aislantes térmicos",
        bloques: [
            {
                texto: "Dos vasos con agua caliente pierden temperatura a ritmos distintos.",
                correcto: "observacion"
            },
            {
                texto: "El alumno quiere averiguar por qué uno mantiene mejor el calor.",
                correcto: "analisis"
            },
            {
                texto: "Cree que el material que rodea el vaso influye en la pérdida de temperatura.",
                correcto: "hipotesis"
            },
            {
                texto: "Prepara dos vasos iguales con agua a la misma temperatura y los envuelve con materiales distintos.",
                correcto: "experimentacion"
            },
            {
                texto: "Tras medir varias veces, ve que uno conserva mejor el calor.",
                correcto: "conclusion"
            }
        ]
    },

    {
        titulo: "Caso 2: Concentración del ácido",
        bloques: [
            {
                texto: "El magnesio reacciona más rápido en un vaso que en otro.",
                correcto: "observacion"
            },
            {
                texto: "El alumno quiere saber por qué la reacción cambia.",
                correcto: "analisis"
            },
            {
                texto: "Piensa que la concentración del ácido puede influir.",
                correcto: "hipotesis"
            },
            {
                texto: "Usa trozos iguales de magnesio y ácidos con distintas concentraciones.",
                correcto: "experimentacion"
            },
            {
                texto: "Comprueba que la reacción es más rápida en uno de los vasos.",
                correcto: "conclusion"
            }
        ]
    },

    {
        titulo: "Caso 3: Luz y fotosíntesis",
        bloques: [
            {
                texto: "Una planta acuática produce más burbujas cuando está cerca de una lámpara.",
                correcto: "observacion"
            },
            {
                texto: "El alumno quiere entender por qué cambia la cantidad de burbujas.",
                correcto: "analisis"
            },
            {
                texto: "Cree que la luz puede afectar al proceso.",
                correcto: "hipotesis"
            },
            {
                texto: "Coloca la planta a distintas distancias de la lámpara y cuenta las burbujas.",
                correcto: "experimentacion"
            },
            {
                texto: "Nota que la planta genera más burbujas cuando recibe más luz.",
                correcto: "conclusion"
            }
        ]
    },

    {
        titulo: "Caso 4: Solubilidad y temperatura",
        bloques: [
            {
                texto: "Un sólido se disuelve más rápido en agua caliente que en agua fría.",
                correcto: "observacion"
            },
            {
                texto: "El alumno quiere saber por qué ocurre esta diferencia.",
                correcto: "analisis"
            },
            {
                texto: "Piensa que la temperatura del agua influye en la disolución.",
                correcto: "hipotesis"
            },
            {
                texto: "Añade la misma cantidad de sólido a vasos con agua a distintas temperaturas.",
                correcto: "experimentacion"
            },
            {
                texto: "Observa que el sólido desaparece antes en el agua caliente.",
                correcto: "conclusion"
            }
        ]
    },

    {
        titulo: "Caso 5: Enzimas y pH",
        bloques: [
            {
                texto: "La catalasa produce más espuma en un vaso que en otro.",
                correcto: "observacion"
            },
            {
                texto: "El alumno quiere averiguar por qué cambia la reacción.",
                correcto: "analisis"
            },
            {
                texto: "Cree que el pH del medio afecta a la actividad de la enzima.",
                correcto: "hipotesis"
            },
            {
                texto: "Usa la misma cantidad de catalasa en medios con distintos pH.",
                correcto: "experimentacion"
            },
            {
                texto: "Ve que la reacción es más intensa en uno de los medios.",
                correcto: "conclusion"
            }
        ]
    },

    {
        titulo: "Caso 6: Fricción y superficie",
        bloques: [
            {
                texto: "Un bloque se desliza con distinta facilidad según la superficie.",
                correcto: "observacion"
            },
            {
                texto: "El alumno quiere saber por qué cambia el movimiento.",
                correcto: "analisis"
            },
            {
                texto: "Piensa que la superficie puede influir en la fricción.",
                correcto: "hipotesis"
            },
            {
                texto: "Arrastra el bloque sobre superficies diferentes usando la misma fuerza.",
                correcto: "experimentacion"
            },
            {
                texto: "Nota que en una superficie cuesta más moverlo.",
                correcto: "conclusion"
            }
        ]
    },

    {
        titulo: "Caso 7: Combustión y oxígeno",
        bloques: [
            {
                texto: "Una vela arde con distinta intensidad según el recipiente donde está.",
                correcto: "observacion"
            },
            {
                texto: "El alumno quiere entender por qué la llama cambia.",
                correcto: "analisis"
            },
            {
                texto: "Cree que la cantidad de oxígeno puede influir.",
                correcto: "hipotesis"
            },
            {
                texto: "Coloca velas en recipientes con distintas condiciones de aire.",
                correcto: "experimentacion"
            },
            {
                texto: "Ve que la vela se consume más rápido en uno de los recipientes.",
                correcto: "conclusion"
            }
        ]
    },

    {
        titulo: "Caso 8: Ósmosis",
        bloques: [
            {
                texto: "Un trozo de tejido vegetal cambia de tamaño según el líquido donde se coloca.",
                correcto: "observacion"
            },
            {
                texto: "El alumno quiere saber por qué el tejido se hincha o se arruga.",
                correcto: "analisis"
            },
            {
                texto: "Piensa que la concentración del líquido influye en el movimiento del agua.",
                correcto: "hipotesis"
            },
            {
                texto: "Coloca el tejido en soluciones con distintas concentraciones.",
                correcto: "experimentacion"
            },
            {
                texto: "Nota que el tejido aumenta o disminuye de tamaño según el líquido.",
                correcto: "conclusion"
            }
        ]
    },

    {
        titulo: "Caso 9: Conductividad",
        bloques: [
            {
                texto: "Un circuito funciona mejor con un cable que con otro.",
                correcto: "observacion"
            },
            {
                texto: "El alumno quiere averiguar por qué cambia la intensidad de la corriente.",
                correcto: "analisis"
            },
            {
                texto: "Cree que el material del cable influye en la conductividad.",
                correcto: "hipotesis"
            },
            {
                texto: "Monta el mismo circuito usando cables de distintos materiales.",
                correcto: "experimentacion"
            },
            {
                texto: "Comprueba que uno de los cables deja pasar más corriente.",
                correcto: "conclusion"
            }
        ]
    },

    {
        titulo: "Caso 10: Fusión del hielo",
        bloques: [
            {
                texto: "Dos bloques de hielo tardan distinto tiempo en fundirse.",
                correcto: "observacion"
            },
            {
                texto: "El alumno quiere saber por qué uno dura más que el otro.",
                correcto: "analisis"
            },
            {
                texto: "Piensa que el tamaño del bloque influye en el tiempo de fusión.",
                correcto: "hipotesis"
            },
            {
                texto: "Coloca bloques de hielo de distintos tamaños en las mismas condiciones.",
                correcto: "experimentacion"
            },
            {
                texto: "Ve que el bloque más grande tarda más en fundirse.",
                correcto: "conclusion"
            }
        ]
    }
];


// =========================
//   LISTA DE CASOS
// =========================
const lista = document.getElementById("lista-casos");

casos.forEach((c, i) => {
    const btn = document.createElement("button");
    btn.innerText = c.titulo;
    btn.onclick = () => iniciarCaso(i);
    lista.appendChild(btn);
});


// =========================
//   INICIAR CASO
// =========================
function iniciarCaso(indice) {
    alumno = document.getElementById("nombreAlumno").value.trim();
    curso = document.getElementById("cursoAlumno").value;

    if (alumno === "" || curso === "") {
        alert("Introduce tu nombre y curso antes de comenzar.");
        return;
    }

    casoActual = casos[indice];
    puntuacion = 0;

    document.getElementById("puntuacion").innerText = "Puntuación: " + puntuacion;
    document.getElementById("tituloCaso").innerText = casoActual.titulo;

    cargarTexto();
    activarDragDrop();
    cargarInsignias();

    irA("actividad");
}


// =========================
//   CAMBIAR PANTALLA
// =========================
function irA(id) {
    document.querySelectorAll(".pantalla").forEach(p => p.classList.remove("activa"));
    document.getElementById(id).classList.add("activa");
}


// =========================
//   CARGAR TEXTO
// =========================
function cargarTexto() {
    const textoDiv = document.getElementById("texto");
    textoDiv.innerHTML = "";

    const bloquesDesordenados = mezclar(casoActual.bloques);

    bloquesDesordenados.forEach(b => {
        const bloque = document.createElement("div");
        bloque.classList.add("bloque");
        bloque.dataset.correcto = b.correcto;
        bloque.innerText = b.texto;

        textoDiv.appendChild(bloque);
    });
}


// =========================
//   DRAG & DROP
// =========================
function activarDragDrop() {

    document.querySelectorAll(".etiqueta").forEach(et => {
        et.addEventListener("dragstart", e => {
            etiquetaActual = e.target.dataset.etiqueta;
        });
    });

    document.querySelectorAll(".bloque").forEach(bl => {
        bl.addEventListener("dragover", e => e.preventDefault());

        bl.addEventListener("drop", e => {
            let correcto = bl.dataset.correcto;

            if (normalizar(correcto) === normalizar(etiquetaActual)) {
                bl.classList.remove("incorrecto");
                bl.classList.add("correcto");
                bl.innerHTML += `<div class="colocada">${etiquetaActual}</div>`;
                puntuacion += 10;
            } else {
                bl.classList.remove("correcto");
                bl.classList.add("incorrecto");
                puntuacion -= 5;
            }

            document.getElementById("puntuacion").innerText =
                "Puntuación: " + puntuacion;

            comprobarActividad();
        });
    });
}


// =========================
//   COMPROBAR ACTIVIDAD
// =========================
function comprobarActividad() {
    let bloques = document.querySelectorAll(".bloque");
    let completos = 0;

    bloques.forEach(b => {
        if (b.classList.contains("correcto")) completos++;
    });

    if (completos === bloques.length) {
        document.getElementById("resultado").innerText =
            "🏆 Actividad completada. Puntuación final: " + puntuacion;

        guardarResultado();
        desbloquearInsignia("casoCompletado");

        if (puntuacion === 50) {
            desbloquearInsignia("perfecto");
        }

        let datos = JSON.parse(localStorage.getItem("resultados3ESO")) || [];
        let completados = datos.filter(r => r.alumno === alumno).length;

        if (completados >= 3) {
            desbloquearInsignia("tresCasos");
        }

        if (completados >= 10) {
            desbloquearInsignia("maestro");
        }
    }
}


// =========================
//   GUARDAR RESULTADO
// =========================
function guardarResultado() {
    let datos = JSON.parse(localStorage.getItem("resultados3ESO")) || [];

    datos.push({
        alumno: alumno,
        curso: curso,
        caso: casoActual.titulo,
        puntuacion: puntuacion,
        fecha: new Date().toLocaleString()
    });

    localStorage.setItem("resultados3ESO", JSON.stringify(datos));
}


// =========================
//   EXPORTAR INSIGNIAS
// =========================
function exportarInsignias() {
    alumno = document.getElementById("nombreAlumno").value.trim();
    curso = document.getElementById("cursoAlumno").value;

    if (!alumno || !curso) {
        alert("Introduce tu nombre y curso antes de exportar.");
        return;
    }

    const todas = JSON.parse(localStorage.getItem("insignias3ESO")) || {};
    const delAlumno = todas[alumno] || [];

    document.getElementById("expNombre").innerText = alumno;
    document.getElementById("expCurso").innerText = curso;

    const cont = document.getElementById("expInsignias");
    cont.innerHTML = "";

    if (delAlumno.length === 0) {
        cont.innerHTML =
            "<p style='color:#777;'>No has conseguido ninguna insignia todavía.</p>";
    } else {
        delAlumno.forEach(id => {
            const div = document.createElement("div");
            div.classList.add("insigniaExport");
            div.innerText = insigniasDisponibles[id];
            cont.appendChild(div);
        });
    }

    const marco = document.querySelector(".marco");

    if (curso === "3º ESO B") {
        marco.style.borderColor = "#4a76fd";
    } else {
        marco.style.borderColor = "#4caf50";
    }

    const panel = document.getElementById("exportarImagen");
    panel.style.display = "block";

    html2canvas(panel, { scale: 2 }).then(canvas => {
        const enlace = document.createElement("a");
        enlace.download = `${alumno}_${curso}_insignias_3ESO.png`;
        enlace.href = canvas.toDataURL("image/png");
        enlace.click();
        panel.style.display = "none";
    });
}


// =========================
//   VOLVER AL INICIO
// =========================
function volverInicio() {
    document.getElementById("resultado").innerText = "";
    cargarInsignias();
    irA("inicio");
}