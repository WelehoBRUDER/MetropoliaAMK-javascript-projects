const query = document.querySelector("#query");
const form = document.querySelector("#form");

const school = { lat: 60.2237516, lon: 24.7581159 };

const map = L.map("map").setView([60.1785553, 24.8786212], 13);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

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
	const origin = { lat: address[1], lon: address[0] };
	const routeToSchool = await getRoute(origin.lat, origin.lon);
	console.log(routeToSchool);
	const googleEncodedRoute = routeToSchool.data.plan.itineraries[0].legs;
	for (let i = 0; i < googleEncodedRoute.length; i++) {
		let color = "";
		switch (googleEncodedRoute[i].mode) {
			case "WALK":
				color = "green";
				break;
			case "BUS":
				color = "red";
				break;
			case "RAIL":
				color = "cyan";
				break;
			case "TRAM":
				color = "magenta";
				break;
			default:
				color = "blue";
				break;
		}
		const route = googleEncodedRoute[i].legGeometry.points;
		const pointObjects = L.Polyline.fromEncoded(route).getLatLngs(); // fromEncoded: convert Google encoding to Leaflet polylines
		L.polyline(pointObjects)
			.setStyle({
				color,
			})
			.addTo(map);
	}
	map.fitBounds([
		[origin.lat, origin.lon],
		[school.lat, school.lon],
	]);
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
	return await fetch(`https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql`, {
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
		return data;
	});
}
