function getNavigationElements() {
	return {
		button: document.querySelector("[data-nav-toggle]"),
		links:
			document.querySelector("[data-nav-links]") ||
			document.getElementById("nav-links"),
	};
}

function setMenuState(isOpen) {
	const { button, links } = getNavigationElements();

	if (!links) {
		return;
	}

	links.classList.toggle("is-open", isOpen);
	links.classList.toggle("show", isOpen);
	document.body.classList.toggle("menu-open", isOpen);

	if (button) {
		button.setAttribute("aria-expanded", String(isOpen));
	}
}

function toggleMenu() {
	const { links } = getNavigationElements();
	const isOpen = links ? !links.classList.contains("is-open") : false;
	setMenuState(isOpen);
}

function gotoMain(section) {
	window.location.href = section === "s" ? "./index.html" : "../index.html";
}

document.addEventListener("DOMContentLoaded", () => {
	const { button, links } = getNavigationElements();

	if (button) {
		button.addEventListener("click", toggleMenu);
	}

	if (links) {
		links.addEventListener("click", (event) => {
			if (event.target.closest("a")) {
				setMenuState(false);
			}
		});
	}

	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape") {
			setMenuState(false);
		}
	});

	const desktopQuery = window.matchMedia("(min-width: 761px)");
	const closeOnDesktop = () => {
		if (desktopQuery.matches) {
			setMenuState(false);
		}
	};

	if (desktopQuery.addEventListener) {
		desktopQuery.addEventListener("change", closeOnDesktop);
	} else {
		desktopQuery.addListener(closeOnDesktop);
	}
});
