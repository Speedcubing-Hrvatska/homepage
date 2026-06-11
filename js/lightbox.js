(function () {
	let imageLinks = [];
	let currentIndex = 0;
	let previousFocus = null;
	let lightbox = null;

	function createLightbox() {
		const element = document.createElement("div");
		element.className = "image-lightbox";
		element.hidden = true;
		element.setAttribute("role", "dialog");
		element.setAttribute("aria-modal", "true");
		element.setAttribute("aria-label", "Pregled slike");
		element.innerHTML = [
			'<button class="image-lightbox-close" type="button" aria-label="Zatvori pregled" data-lightbox-close>&times;</button>',
			'<button class="image-lightbox-nav image-lightbox-prev" type="button" aria-label="Prethodna slika" data-lightbox-prev>&lsaquo;</button>',
			'<figure class="image-lightbox-figure">',
			'<img alt="" data-lightbox-image />',
			"<figcaption data-lightbox-caption></figcaption>",
			"</figure>",
			'<button class="image-lightbox-nav image-lightbox-next" type="button" aria-label="Sljedeća slika" data-lightbox-next>&rsaquo;</button>',
		].join("");

		document.body.appendChild(element);
		return element;
	}

	function getLightbox() {
		if (!lightbox) {
			lightbox = createLightbox();
		}

		return lightbox;
	}

	function collectImages(clickedLink) {
		const root = clickedLink.closest(".article-shell") || document;
		imageLinks = Array.from(root.querySelectorAll("a[data-lightbox-src]"));
		currentIndex = Math.max(0, imageLinks.indexOf(clickedLink));
	}

	function currentImage() {
		return imageLinks[currentIndex];
	}

	function updateLightbox() {
		const element = getLightbox();
		const link = currentImage();
		const image = element.querySelector("[data-lightbox-image]");
		const caption = element.querySelector("[data-lightbox-caption]");
		const previous = element.querySelector("[data-lightbox-prev]");
		const next = element.querySelector("[data-lightbox-next]");
		const alt = link?.dataset.lightboxAlt || "";

		image.src = link?.dataset.lightboxSrc || link?.href || "";
		image.alt = alt;
		caption.textContent = [
			alt,
			imageLinks.length > 1
				? `${currentIndex + 1} / ${imageLinks.length}`
				: "",
		]
			.filter(Boolean)
			.join(" · ");

		previous.hidden = imageLinks.length < 2;
		next.hidden = imageLinks.length < 2;
	}

	function openLightbox(clickedLink) {
		collectImages(clickedLink);
		previousFocus = document.activeElement;

		const element = getLightbox();
		updateLightbox();
		element.hidden = false;
		document.body.classList.add("lightbox-open");
		element.querySelector("[data-lightbox-close]").focus();
	}

	function closeLightbox() {
		if (!lightbox || lightbox.hidden) {
			return;
		}

		lightbox.hidden = true;
		document.body.classList.remove("lightbox-open");

		if (previousFocus && typeof previousFocus.focus === "function") {
			previousFocus.focus();
		}
	}

	function showPrevious() {
		currentIndex =
			(currentIndex - 1 + imageLinks.length) % imageLinks.length;
		updateLightbox();
	}

	function showNext() {
		currentIndex = (currentIndex + 1) % imageLinks.length;
		updateLightbox();
	}

	document.addEventListener("click", (event) => {
		const clickTarget =
			event.target && typeof event.target.closest === "function"
				? event.target
				: null;
		const imageLink = clickTarget?.closest("a[data-lightbox-src]");

		if (imageLink) {
			event.preventDefault();
			openLightbox(imageLink);
			return;
		}

		if (!lightbox || lightbox.hidden) {
			return;
		}

		if (clickTarget?.matches("[data-lightbox-close]")) {
			closeLightbox();
			return;
		}

		if (clickTarget?.matches("[data-lightbox-prev]")) {
			showPrevious();
			return;
		}

		if (clickTarget?.matches("[data-lightbox-next]")) {
			showNext();
			return;
		}

		if (event.target === lightbox) {
			closeLightbox();
		}
	});

	document.addEventListener("keydown", (event) => {
		if (!lightbox || lightbox.hidden) {
			return;
		}

		if (event.key === "Escape") {
			closeLightbox();
		}

		if (event.key === "ArrowLeft" && imageLinks.length > 1) {
			event.preventDefault();
			showPrevious();
		}

		if (event.key === "ArrowRight" && imageLinks.length > 1) {
			event.preventDefault();
			showNext();
		}
	});
})();
