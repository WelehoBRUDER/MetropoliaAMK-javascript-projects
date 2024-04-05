async function getChuckNorrisJoke() {
	const response = await fetch("https://api.chucknorris.io/jokes/random");
	if (response.status === 200) {
		const joke = await response.json();
		console.log(joke.value);
	}
}

getChuckNorrisJoke();
