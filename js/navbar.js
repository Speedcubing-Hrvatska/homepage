function toggleMenu() {
    const navLinks = document.getElementById("nav-links");
    navLinks.classList.toggle("show");
}

function gotoMain(s) {
    if (s == "s") window.location.href = "./index.html";
    else window.location.href = "../index.html";
}
