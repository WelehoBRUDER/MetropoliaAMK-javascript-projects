const query = document.querySelector("#query");
const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
	e.preventDefault();
	const addressQuery = `address(name: ${query.value}) {
    id,
    gid
    layer,
    name
  }`;
	const address = fetch(`http://api.digitransit.fi/geocoding/v1/search`);
});
