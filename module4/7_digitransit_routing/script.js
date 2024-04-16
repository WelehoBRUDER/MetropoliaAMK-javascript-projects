const query = document.querySelector("#query");
const form = document.querySelector("#form");

form.addEventListener("submit", async (e) => {
	e.preventDefault();
	// const addressQuery = `address(name: ${query.value}) {
	//   id,
	//   gid
	//   layer,
	//   name
	// }`;
	//const address = fetch(`http://api.digitransit.fi/geocoding/v1/search`);
	const idk = `{
    plan(
      from: {lat: 60.168992, lon: 24.932366}
      to: {lat: 60.175294, lon: 24.684855}
      numItineraries: 3
    ) {
      itineraries {
        legs {
          startTime
          endTime
          mode
          duration
          realTime
          distance
          transitLeg
        }
      }
    }
  }`;
	const test = await fetch(`https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"digitransit-subscription-key": "6007be3e429c49abacb31e2a20f99398",
		},
		body: JSON.stringify({
			query: idk,
		}),
	}).then(async (response) => {
		const data = await response.json();
		console.log(data);
	});
	//console.log(addressQuery);
});
