const query = document.querySelector("#query");
const form = document.querySelector("form");
const results = document.querySelector("#results");

form.addEventListener("submit", async (e) => {
	e.preventDefault();
	const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query.value}`);
	if (response.status === 200) {
		const shows = await response.json();
		// Clear the section
		results.innerHTML = "";
		shows.forEach((show) => {
			results.append(createShowCard(show));
		});
	}
});

function createShowCard(show) {
	const { name, url, summary } = show.show;
	const image = show.show.image?.medium;
	const card = document.createElement("article");
	const title = document.createElement("h2");
	const link = document.createElement("a");
	const img = document.createElement("img");
	const summaryElem = document.createElement("div");
	const replacement = document.createElement("div");
	summaryElem.innerHTML = summary;
	img.src = image;
	title.textContent = name;
	link.href = url;
	link.target = "_blank";
	link.textContent = url;
	// If image isn't found, then replace with an empty div.
	card.append(title, image ? img : replacement, link, summaryElem);
	return card;
}
