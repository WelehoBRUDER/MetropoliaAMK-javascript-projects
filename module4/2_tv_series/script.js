const query = document.querySelector("#query");
const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
	e.preventDefault();
	const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query.value}`);
	if (response.status === 200) {
		const shows = await response.json();
		console.log(shows);
	}
});
