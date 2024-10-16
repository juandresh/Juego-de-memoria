function mostrar(lista) {
    const originales = {
        1: "rgba(0, 0, 255, 0.2)",
        2: "rgba(255, 0, 0, 0.2)",
        3: "rgba(255, 255, 0, 0.2)",
        4: "rgba(0, 128, 0, 0.2)"
    };

    const cambios = {
        1: "blue",
        2: "red",
        3: "yellow",
        4: "green"
    }

    function cambiarTemporal(boton, nuevo, original, delay) {
        boton.style.backgroundColor = nuevo;
        boton.style.borderColor = nuevo;
        setTimeout(() => {
            boton.style.backgroundColor = original;
            boton.style.borderColor = original;
        }, delay);
    }

    setTimeout(() => {
        for (let i = 0; i < lista.length; i++) {
            let id = lista[i].toString();
            let boton = document.getElementById(id);
            if (boton) {
                setTimeout(() => {
                    cambiarTemporal(boton, cambios[lista[i]], originales[lista[i]], 500);
                }, i * 1000);
            }
        }
    }, 500); 
}

function esperarTurno(index, lista) {
    return new Promise((resolve) => {
        const botones = {
            1: document.getElementById("1"),
            2: document.getElementById("2"),
            3: document.getElementById("3"),
            4: document.getElementById("4"),
        };

        Object.keys(botones).forEach((key) => {
            botones[key].onclick = () => {
                resolve(parseInt(key));
            };
        });
    });
}

async function juego() {
    let lista = [];
    let continua = true;

    while (continua) {
        let num = Math.floor(Math.random() * 4) + 1;
        lista.push(num);
        mostrar(lista);

        for (let i = 0; i < lista.length; i++) {
            
            let botonPresionado = await esperarTurno(i);
            verificarTurno(botonPresionado, lista[i]);

            
            if (botonPresionado !== lista[i]) {
                alert("¡GAME OVER!");
                return; 
            }
        }

        if (lista.length >= 10) {
            continua = false;
        }
    }
}

function verificarTurno(botonPresionado, correcto) {
}

const iniciar = document.querySelector(".ini");
iniciar.addEventListener("click", juego);
