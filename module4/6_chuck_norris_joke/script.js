const query = document.querySelector("#query");
const form = document.querySelector("form");
const results = document.querySelector("#results");

async function getChuckNorrisJokes(search) {
	results.innerHTML = "";
	const response = await fetch(`https://api.chucknorris.io/jokes/search?query=${search}`);
	if (response.status === 200) {
		const jokes = await response.json();
		jokes.result.forEach((joke) => {
			chuckJoke(joke);
		});
	}
}

function chuckJoke(joke) {
	const wrapper = document.createElement("article");
	const text = document.createElement("p");
	text.textContent = joke.value;
	wrapper.append(text);
	results.append(wrapper);
}

form.addEventListener("submit", (e) => {
	e.preventDefault();
	getChuckNorrisJokes(query.value);
});
