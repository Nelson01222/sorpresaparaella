const boton = document.querySelector("#inicio");
const titulo = document.querySelector("h1");

boton.addEventListener("click", () => {
	titulo.style.display = "none";
	boton.style.display = "none";

	const corazon = document.createElement("div");
	corazon.classList.add("corazon");
	corazon.textContent = "❤️";
	document.body.appendChild(corazon);

	for (let i = 0; i < 25; i++) {
		crearCorazon();
	}

	corazon.addEventListener("click", () => {
		corazon.classList.add("latido");
		setTimeout(mostrarSegundaSorpresa, 700);
	});
});

function crearCorazon() {
	const corazon = document.createElement("div");
	corazon.className = "corazon-flotante";
	corazon.textContent = "❤️";
	corazon.style.left = Math.random() * 100 + "vw";
	corazon.style.animationDuration = 3 + Math.random() * 4 + "s";
	corazon.style.animationDelay = Math.random() * 2 + "s";
	document.body.appendChild(corazon);
	setTimeout(() => corazon.remove(), 8000);
}

function mostrarSegundaSorpresa() {
	limpiarPantalla();
	const pantalla = crearPantalla("pantalla segunda-pantalla", `
		<div class="caja caja-sorpresa">
			<div class="emoji-grande">❤️</div>
			<h2>Y esto apenas comienza...</h2>
			<p>Hay algo más que quiero enseñarte.</p>
			<button id="continuar">Continuar ❤️</button>
		</div>
	`);
	pantalla.querySelector("#continuar").addEventListener("click", mostrarTerceraSorpresa);
}

function mostrarTerceraSorpresa() {
	limpiarPantalla();
	const pantalla = crearPantalla("pantalla tercera-pantalla", `
		<div class="caja contenido-tercero">
			<div class="emoji-grande">💕</div>
			<h2>Para la persona más especial que existe</h2>
			<p>Preparé esto especialmente para ti.</p>
			<p class="espera">Y todavía falta una sorpresa...</p>
			<button id="siguiente">Ver sorpresa ❤️</button>
		</div>
	`);
	pantalla.querySelector("#siguiente").addEventListener("click", mostrarCuartaSorpresa);
}

function mostrarCuartaSorpresa() {
	limpiarPantalla();
	const pantalla = crearPantalla("pantalla cuarta-pantalla", `
		<div class="caja contenido-cuarto">
			<div class="emoji-grande">💌</div>
			<h2>Una pequeña sorpresa para ti</h2>
			<p>Te amo mucho, mi reina. ❤️</p>
			<button id="abrir-recuerdo">Abrir ❤️</button>
		</div>
	`);
	pantalla.querySelector("#abrir-recuerdo").addEventListener("click", mostrarFotos);
}

function mostrarFotos() {
	limpiarPantalla();
	const pantalla = crearPantalla("pantalla quinta-pantalla fotos-pantalla", `
		<div class="contenido-fotos">
			<h2>Nuestros recuerdos ❤️</h2>
			<p>Cada momento contigo merece ser guardado.</p>
			<div class="galeria">
				<div class="foto"><img src="fotos/foto1.jpg" alt="Nuestro recuerdo 1"></div>
				<div class="foto foto-central" id="foto-carta">
					<img src="fotos/foto2.jpg" alt="Abrir carta">
					<span>💌</span>
				</div>
				<div class="foto"><img src="fotos/foto3.jpg" alt="Nuestro recuerdo 3"></div>
			</div>
		</div>
	`);
	pantalla.querySelector("#foto-carta").addEventListener("click", mostrarCarta);
}

function mostrarCarta() {
	const foto = document.querySelector("#foto-carta");
	if (!foto) return;
	foto.classList.add("abrir");

	setTimeout(() => {
		const carta = document.createElement("div");
		carta.className = "carta";
		carta.innerHTML = `
			<div class="carta-contenido">
				<div class="corazon-carta">❤️</div>
				<h2>Para mi reina ❤️</h2>
				<p id="texto"></p>
				<div class="fecha">
					<span>❤️ Nuestra fecha ❤️</span>
					<strong>23 de mayo de 2024</strong>
				</div>
				<button id="cerrar">Cerrar ❤️</button>
			</div>
			<audio id="musica" loop>
				<source src="musica/romantica.mp3" type="audio/mpeg">
			</audio>
		`;
		document.body.appendChild(carta);

		const musica = carta.querySelector("#musica");
		musica.volume = 0.35;
		musica.play().catch(() => console.log("El navegador bloqueó la reproducción automática."));

		const textoCarta = `
Desde que llegaste a mi vida,
hay momentos que simplemente
quiero guardar para siempre.

Gracias por cada sonrisa,
cada momento y cada recuerdo
que hemos creado juntos.

Quiero seguir creando muchos
más recuerdos contigo.

Te amo muchísimo, mi reina. ❤️`;

		escribir(carta.querySelector("#texto"), textoCarta, 45);
		crearCorazonesCarta();

		carta.querySelector("#cerrar").addEventListener("click", () => {
			musica.pause();
			carta.remove();
			foto.classList.remove("abrir");
			document.querySelectorAll(".corazon-carta-flotante").forEach(corazon => corazon.remove());
			setTimeout(mostrarRamo, 500);
		});
	}, 700);
}

function escribir(elemento, texto, velocidad) {
	let indice = 0;
	elemento.innerHTML = "";

	function escribirCaracter() {
		if (indice >= texto.length) return;
		elemento.innerHTML += texto[indice] === "\n" ? "<br>" : texto[indice];
		indice++;
		setTimeout(escribirCaracter, velocidad);
	}

	escribirCaracter();
}

function crearCorazonesCarta() {
	for (let i = 0; i < 18; i++) {
		const corazon = document.createElement("div");
		corazon.className = "corazon-carta-flotante";
		corazon.textContent = Math.random() > 0.5 ? "❤️" : "💕";
		corazon.style.left = Math.random() * 100 + "vw";
		corazon.style.animationDuration = 4 + Math.random() * 4 + "s";
		document.body.appendChild(corazon);
		setTimeout(() => corazon.remove(), 9000);
	}
}

function mostrarRamo() {
	limpiarPantalla();
	const pantalla = crearPantalla("ramo-pantalla", `
		<div class="ramo-contenido">
			<h2>Un pequeño detalle para ti 🌷</h2>
			<p>Porque te mereces todas las flores del mundo. ❤️</p>
			<div class="ramo">
				${'<div class="tallo"></div>'.repeat(12)}
				${'<div class="tulipan"></div>'.repeat(12)}
			</div>
			<button id="final">❤️</button>
		</div>
	`);

	pantalla.querySelector("#final").addEventListener("click", () => {
		pantalla.remove();
		mostrarFinal();
	});
}

function mostrarFinal() {
	limpiarPantalla();
	crearPantalla("mensaje-final", `
		<div>
			<div class="corazon-final">❤️</div>
			<h2>Te amo, mi reina ❤️</h2>
			<p>Quiero seguir creando recuerdos contigo.</p>
		</div>
	`);
}

function crearPantalla(clases, contenido) {
	const pantalla = document.createElement("div");
	pantalla.className = clases;
	pantalla.innerHTML = contenido;
	document.body.appendChild(pantalla);
	return pantalla;
}

function limpiarPantalla() {
	document.querySelectorAll(
		".pantalla, .segunda-pantalla, .tercera-pantalla, " +
		".cuarta-pantalla, .quinta-pantalla, .ramo-pantalla, " +
		".mensaje-final, .corazon, .corazon-flotante"
	).forEach(elemento => elemento.remove());
}
