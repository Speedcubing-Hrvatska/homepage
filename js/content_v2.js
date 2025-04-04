function fetchData() {
	fetch(
		"https://server.speedcubinghrvatska.hr/api/articles?fields[0]=title&fields[1]=description"
	).then((response) =>
		response.json().then((parsed) => {
			articles = parsed.data;
			const headDiv = document.getElementById("headDiv");
			for (let i = 0; i < articles.length; i++) {
				let cardD = articles[i];
				console.log(cardD);

				let cardH = document.createElement("div");
				cardH.innerHTML = `<h3>${cardD.title}</h3> <p>${cardD.description}</p>`;
				cardH.classList.add("card");
				cardH.id = cardD.documentId;
				cardH.addEventListener("click", (ev) => {
					window.location.href = `./pages/contentS.html?id=${ev.currentTarget.id}`;
				});

				headDiv.appendChild(cardH);
			}
		})
	);
}

function createData() {
	const urlParams = new URLSearchParams(window.location.search);
	let id = urlParams.get("id");
	console.log("hi");
	fetch(
		`https://server.speedcubinghrvatska.hr/api/articles?filters[documentId][$eq]=${id}&populate[blocks][populate]=*`
	).then((response) => {
		response.json().then((parsed) => {
			const article = parsed.data[0];

			const headDiv = document.getElementById("headDiv");
			headDiv.innerHTML = "";

			const title = document.createElement("h1");
			title.textContent = article.title;
			headDiv.appendChild(title);

			const desc = document.createElement("h3");
			desc.textContent = article.description;
			headDiv.appendChild(desc);
			//console.log(article);
			article.blocks.forEach((block) => {
				if (block.__component === "shared.media") {
					const imgElement = document.createElement("img");
					imgElement.src = `https://server.speedcubinghrvatska.hr${block.media.url}`;
					imgElement.style.width = "300px"; // Fixed width
					imgElement.style.display = "block"; // Ensure images are stacked
					imgElement.alt = "Article Image";
					headDiv.appendChild(imgElement);
				} else if (block.__component === "shared.rich-text") {
					const textElement = document.createElement("div");
					textElement.innerHTML = marked.parse(block.body);
					headDiv.appendChild(textElement);
				}
			});
		});
	});
}
