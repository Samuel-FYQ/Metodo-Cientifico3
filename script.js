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
//   INSIGNIAS DISPONIBLES
// =========================

const insigniasDisponibles = {
    casoCompletado: "\uD83E\uDD47 Caso completado",
    perfecto: "\uD83C\uDF1F Perfecto (sin fallos)",
    tresCasos: "\uD83C\uDFC5 Persistente (3 casos completados)",
    maestro: "\uD83D\uDC51 Maestro del método científico (10 casos)"
};


// =========================
//   VARIABLES
// =========================

let puntuacion = 0;
let casoActual = null;
let etiquetaActual = null;
let alumno = "";
let curso = "";

let casoCompletado = false;


// =========================
//   DESORDENAR ARRAY
// =========================

function mezclar(array) {

    return array
        .map(x => ({
            x,
            r: Math.random()
        }))
        .sort((a, b) => a.r - b.r)
        .map(a => a.x);
}


// =========================
//   CARGAR INSIGNIAS
// =========================

function cargarInsignias() {

    const panel =
        document.getElementById(
            "insigniasPanel"
        );

    if (!panel) return;

    panel.innerHTML = "";

    const todas =
        JSON.parse(
            localStorage.getItem(
                "insignias3ESO"
            )
        ) || {};

    const delAlumno =
        todas[alumno] || [];


    delAlumno.forEach(id => {

        const div =
            document.createElement(
                "div"
            );

        div.classList.add(
            "insignia"
        );

        div.innerText =
            insigniasDisponibles[id] ||
            id;

        panel.appendChild(div);
    });
}


// =========================
//   DESBLOQUEAR INSIGNIA
// =========================

function desbloquearInsignia(id) {

    if (!alumno) {
        return;
    }

    let todas =
        JSON.parse(
            localStorage.getItem(
                "insignias3ESO"
            )
        ) || {};


    if (!todas[alumno]) {
        todas[alumno] = [];
    }


    if (
        !todas[alumno].includes(id)
    ) {

        todas[alumno].push(id);

        localStorage.setItem(
            "insignias3ESO",
            JSON.stringify(
                todas
            )
        );

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
//   CARGAR LISTA DE CASOS
// =========================

function cargarListaCasos() {

    const lista =
        document.getElementById(
            "lista-casos"
        );

    if (!lista) return;

    lista.innerHTML = "";


    casos.forEach((c, i) => {

        const btn =
            document.createElement(
                "button"
            );

        btn.type = "button";

        btn.innerText =
            c.titulo;


        btn.addEventListener(
            "click",
            function () {

                iniciarCaso(i);
            }
        );


        lista.appendChild(btn);
    });
}


// =========================
//   REINICIAR ETIQUETAS
// =========================

function reiniciarEtiquetas() {

    document
        .querySelectorAll(".etiqueta")
        .forEach(et => {

            et.classList.remove(
                "usada",
                "seleccionada"
            );

            et.draggable = true;
        });


    etiquetaActual = null;
}


// =========================
//   INICIAR CASO
// =========================

function iniciarCaso(indice) {

    alumno =
        document
            .getElementById(
                "nombreAlumno"
            )
            .value
            .trim();

    curso =
        document
            .getElementById(
                "cursoAlumno"
            )
            .value;


    if (
        alumno === "" ||
        curso === ""
    ) {

        alert(
            "Introduce tu nombre y curso antes de comenzar."
        );

        return;
    }


    casoActual =
        casos[indice];

    puntuacion = 0;

    casoCompletado = false;

    etiquetaActual = null;


    // Reiniciar completamente las etiquetas

    reiniciarEtiquetas();


    // Actualizar pantalla

    document
        .getElementById(
            "puntuacion"
        )
        .innerText =
        "Puntuación: 0";


    document
        .getElementById(
            "tituloCaso"
        )
        .innerText =
        casoActual.titulo;


    document
        .getElementById(
            "resultado"
        )
        .innerText = "";


    cargarTexto();

    activarEtiquetas();

    activarBloques();

    cargarInsignias();

    irA("actividad");
}


// =========================
//   CAMBIAR PANTALLA
// =========================

function irA(id) {

    document
        .querySelectorAll(
            ".pantalla"
        )
        .forEach(p =>
            p.classList.remove(
                "activa"
            )
        );


    document
        .getElementById(id)
        .classList.add(
            "activa"
        );
}


// =========================
//   CARGAR TEXTO DESORDENADO
// =========================

function cargarTexto() {

    const textoDiv =
        document.getElementById(
            "texto"
        );


    textoDiv.innerHTML = "";


    const bloquesDesordenados =
        mezclar(
            casoActual.bloques
        );


    bloquesDesordenados.forEach(b => {

        const bloque =
            document.createElement(
                "div"
            );


        bloque.classList.add(
            "bloque"
        );


        bloque.dataset.correcto =
            b.correcto;


        bloque.innerText =
            b.texto;


        textoDiv.appendChild(
            bloque
        );
    });
}


// =========================
//   ACTIVAR ETIQUETAS
// =========================

function activarEtiquetas() {

    const etiquetas =
        document.querySelectorAll(
            ".etiqueta"
        );


    etiquetas.forEach(et => {

        // Clonamos cada etiqueta para
        // eliminar cualquier evento anterior.

        const nueva =
            et.cloneNode(true);


        et.replaceWith(nueva);


        // -------------------------
        // PC: DRAG
        // -------------------------

        nueva.addEventListener(
            "dragstart",
            function (e) {

                if (
                    nueva.classList.contains(
                        "usada"
                    )
                ) {

                    e.preventDefault();

                    return;
                }


                etiquetaActual =
                    nueva.dataset.etiqueta;


                nueva.classList.add(
                    "seleccionada"
                );
            }
        );


        nueva.addEventListener(
            "dragend",
            function () {

                nueva.classList.remove(
                    "seleccionada"
                );
            }
        );


        // -------------------------
        // MÓVIL / TABLET: TOCAR
        // -------------------------

        nueva.addEventListener(
            "click",
            function () {

                if (
                    nueva.classList.contains(
                        "usada"
                    )
                ) {
                    return;
                }


                document
                    .querySelectorAll(
                        ".etiqueta"
                    )
                    .forEach(e =>
                        e.classList.remove(
                            "seleccionada"
                        )
                    );


                etiquetaActual =
                    nueva.dataset.etiqueta;


                nueva.classList.add(
                    "seleccionada"
                );
            }
        );
    });
}


// =========================
//   ACTIVAR BLOQUES
// =========================

function activarBloques() {

    const bloques =
        document.querySelectorAll(
            ".bloque"
        );


    bloques.forEach(bl => {

        // -------------------------
        // PC: DROP
        // -------------------------

        bl.addEventListener(
            "dragover",
            function (e) {

                e.preventDefault();
            }
        );


        bl.addEventListener(
            "drop",
            function (e) {

                e.preventDefault();

                comprobarDrop(bl);
            }
        );


        // -------------------------
        // MÓVIL / TABLET: TOCAR
        // -------------------------

        bl.addEventListener(
            "click",
            function () {

                if (
                    etiquetaActual
                ) {

                    comprobarDrop(bl);
                }
            }
        );
    });
}


// =========================
//   COMPROBAR DROP
// =========================

function comprobarDrop(bl) {

    if (!etiquetaActual) {
        return;
    }


    if (casoCompletado) {
        return;
    }


    // Si ya está correcto,
    // no se puede volver a puntuar.

    if (
        bl.classList.contains(
            "correcto"
        )
    ) {
        return;
    }


    const correcto =
        bl.dataset.correcto;


    // =========================
    // RESPUESTA CORRECTA
    // =========================

    if (
        normalizar(correcto) ===
        normalizar(etiquetaActual)
    ) {

        bl.classList.remove(
            "incorrecto"
        );

        bl.classList.add(
            "correcto"
        );


        const colocada =
            document.createElement(
                "div"
            );


        colocada.classList.add(
            "colocada"
        );


        colocada.innerText =
            obtenerNombreEtiqueta(
                etiquetaActual
            );


        bl.appendChild(
            colocada
        );


        puntuacion += 10;


        // Marcar etiqueta como utilizada

        document
            .querySelectorAll(
                ".etiqueta"
            )
            .forEach(et => {

                if (
                    et.dataset.etiqueta ===
                    etiquetaActual
                ) {

                    et.classList.add(
                        "usada"
                    );

                    et.classList.remove(
                        "seleccionada"
                    );

                    et.draggable = false;
                }
            });


        etiquetaActual = null;
    }


    // =========================
    // RESPUESTA INCORRECTA
    // =========================

    else {

        bl.classList.remove(
            "correcto"
        );

        bl.classList.add(
            "incorrecto"
        );


        puntuacion -= 5;


        setTimeout(() => {

            bl.classList.remove(
                "incorrecto"
            );

        }, 700);
    }


    document
        .getElementById(
            "puntuacion"
        )
        .innerText =
        "Puntuación: " +
        puntuacion;


    comprobarActividad();
}


// =========================
//   NOMBRE DE ETIQUETA
// =========================

function obtenerNombreEtiqueta(
    tipo
) {

    const nombres = {

        observacion:
            "Observación",

        hipotesis:
            "Hipótesis",

        experimentacion:
            "Experimentación",

        analisis:
            "Análisis",

        conclusion:
            "Conclusión"
    };


    return (
        nombres[tipo] ||
        tipo
    );
}


// =========================
//   COMPROBAR ACTIVIDAD
// =========================

function comprobarActividad() {

    if (!casoActual) {
        return;
    }


    if (casoCompletado) {
        return;
    }


    const bloques =
        document.querySelectorAll(
            "#texto .bloque"
        );


    // Deben existir exactamente
    // los 5 fragmentos.

    if (
        bloques.length !== 5
    ) {
        return;
    }


    const completos =
        document.querySelectorAll(
            "#texto .bloque.correcto"
        ).length;


    // Hasta que estén los 5,
    // no se desbloquea nada.

    if (
        completos !== 5
    ) {
        return;
    }


    // =========================
    // EL CASO ESTÁ COMPLETADO
    // =========================

    casoCompletado = true;


    document
        .getElementById(
            "resultado"
        )
        .innerText =
        "🎉 ¡Actividad completada! Puntuación final: "
        + puntuacion;


    // Guardar SOLO al terminar.

    guardarResultado();


    // =========================
    // CASO COMPLETADO
    // =========================

    desbloquearInsignia(
        "casoCompletado"
    );


    // =========================
    // PERFECTO
    // =========================

    if (
        puntuacion === 50
    ) {

        desbloquearInsignia(
            "perfecto"
        );
    }


    // =========================
    // CONTAR CASOS DIFERENTES
    // =========================

    const datos =
        JSON.parse(
            localStorage.getItem(
                "resultados3ESO"
            )
        ) || [];


    const casosUnicos =
        [
            ...new Set(
                datos
                    .filter(
                        r =>
                            r.alumno === alumno &&
                            r.curso === curso
                    )
                    .map(
                        r => r.caso
                    )
            )
        ];


    // =========================
    // 3 CASOS
    // =========================

    if (
        casosUnicos.length >= 3
    ) {

        desbloquearInsignia(
            "tresCasos"
        );
    }


    // =========================
    // 10 CASOS
    // =========================

    if (
        casosUnicos.length >= 10
    ) {

        desbloquearInsignia(
            "maestro"
        );
    }
}


// =========================
//   GUARDAR RESULTADO
// =========================

function guardarResultado() {

    if (
        !casoActual ||
        !alumno ||
        !curso
    ) {
        return;
    }


    let datos =
        JSON.parse(
            localStorage.getItem(
                "resultados3ESO"
            )
        ) || [];


    datos.push({

        alumno: alumno,

        curso: curso,

        caso: casoActual.titulo,

        puntuacion: puntuacion,

        fecha:
            new Date().toLocaleString(
                "es-ES"
            )
    });


    localStorage.setItem(
        "resultados3ESO",
        JSON.stringify(
            datos
        )
    );
}


// =========================
//   EXPORTAR INSIGNIAS
// =========================

function exportarInsignias() {

    if (
        !alumno ||
        !curso
    ) {

        alert(
            "Introduce tu nombre y curso antes de exportar."
        );

        return;
    }


    const todas =
        JSON.parse(
            localStorage.getItem(
                "insignias3ESO"
            )
        ) || {};


    const delAlumno =
        todas[alumno] || [];


    document
        .getElementById(
            "expNombre"
        )
        .innerText =
        alumno;


    document
        .getElementById(
            "expCurso"
        )
        .innerText =
        curso;


    const cont =
        document.getElementById(
            "expInsignias"
        );


    cont.innerHTML = "";


    if (
        delAlumno.length === 0
    ) {

        cont.innerHTML =
            "<p style='color:#777;'>No has conseguido ninguna insignia todavía.</p>";

    } else {

        delAlumno.forEach(
            id => {

                const div =
                    document.createElement(
                        "div"
                    );


                div.classList.add(
                    "insigniaExport"
                );


                div.innerText =
                    insigniasDisponibles[id] ||
                    id;


                cont.appendChild(
                    div
                );
            }
        );
    }


    const marco =
        document.querySelector(
            ".marco"
        );


    if (
        curso === "3º ESO B"
    ) {

        marco.style.borderColor =
            "#4a76fd";

    } else {

        marco.style.borderColor =
            "#4caf50";
    }


    const panel =
        document.getElementById(
            "exportarImagen"
        );


    panel.style.display =
        "block";


    html2canvas(
        panel,
        {
            scale: 2
        }
    ).then(canvas => {

        const enlace =
            document.createElement(
                "a"
            );


        enlace.download =
            `${alumno}_${curso}_insignias_3ESO.png`;


        enlace.href =
            canvas.toDataURL(
                "image/png"
            );


        enlace.click();


        panel.style.display =
            "none";
    });
}


// =========================
//   VOLVER AL INICIO
// =========================

function volverInicio() {

    document
        .getElementById(
            "resultado"
        )
        .innerText = "";


    // Limpiar completamente
    // el estado de la partida actual.

    etiquetaActual = null;

    casoActual = null;

    casoCompletado = false;

    puntuacion = 0;


    // Dejar todas las etiquetas
    // disponibles para el siguiente caso.

    reiniciarEtiquetas();


    cargarInsignias();

    irA("inicio");
}


// =========================
//   INICIO
// =========================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        cargarListaCasos();

        cargarInsignias();
    }
);