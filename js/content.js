function fetchJSONData() {
    fetch("./js/content.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            //console.log(data);
            const headDiv = document.getElementById("headDiv");
            for (let i = 0; i < data.content.length; i++) {
                let cardD = data.content[i];
                //console.log(cardD);

                let cardH = document.createElement("div");
                cardH.innerHTML = `<h3>${cardD.title}</h3> <p>${cardD.subtitle}</p>`;
                cardH.classList.add("card");
                cardH.id = cardD.id;
                cardH.addEventListener("click", (ev) => {
                    window.location.href = `./pages/contentS.html?id=${ev.currentTarget.id}`;
                });

                headDiv.appendChild(cardH);
            }
        })
        .catch((error) => console.error("Failed to fetch data:", error));
}

function fetchJSONDataGen(s) {
    const urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('id');
    console.log(id);
    if (id == null) {
        window.location.href = "../index.html";
        throw new Error("How'd you get here?");
    }

    fetch("../js/content.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            const headDiv = document.getElementById("headDiv");

            const siteD = data.content[id - 1];
            console.log(siteD);

            headDiv.innerHTML = `<h1>${siteD.title}</h1><h3>${siteD.subtitle}</h3><p>${siteD.text}</p>`;
        })
        .catch((error) => console.error("Failed to fetch data:", error));
}
