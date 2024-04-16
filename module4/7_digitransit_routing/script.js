const query = document.querySelector("#query");
const form = document.querySelector("#form");

const school = { lat: 60.2237516, lon: 24.7581159 };

form.addEventListener("submit", async (e) => {
	e.preventDefault();
	const searchItem = query.value;
	const address = await fetch(`https://api.digitransit.fi/geocoding/v1/search?text=${searchItem}&size=1`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"digitransit-subscription-key": "6007be3e429c49abacb31e2a20f99398",
		},
	}).then(async (response) => {
		const data = await response.json();
		return data.features[0].geometry.coordinates;
	});
	console.log(address);
	const routeToSchool = await getRoute(address[1], address[0]);
	console.log(routeToSchool);
});

async function getRoute(lat, lon) {
	const graphqlQuery = `{
    plan(
      from: {lat: ${lat}, lon: ${lon}}
      to: {lat: ${school.lat}, lon: ${school.lon}}
      numItineraries: 1
    ) {
      itineraries {
        legs {
          startTime
          endTime
          mode
          duration
          distance
          legGeometry {
            points
          }
        }
      }
    }
  }`;
	const route = await fetch(`https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"digitransit-subscription-key": "6007be3e429c49abacb31e2a20f99398",
		},
		body: JSON.stringify({
			query: graphqlQuery,
		}),
	}).then(async (response) => {
		const data = await response.json();
		console.log(data);
		const time = data.data.plan.itineraries[0].legs[0].startTime;
		console.log(time);
		console.log(new Date(time));
		console.log(data);
	});
}
