const query = document.querySelector("#query");
const form = document.querySelector("#form");
const stats = document.querySelector(".stats");
const time = stats.querySelector(".time");

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
		return data.features[0];
	});
	const name = `${address.properties.label} ${address.properties.postalcode}`;
	query.value = name;
	const origin = { lat: address.geometry.coordinates[1], lon: address.geometry.coordinates[0] };
	const routeToSchool = await getRoute(origin.lat, origin.lon);
	clearMap();
	displayStats(routeToSchool.data.plan.itineraries[0]);
	const googleEncodedRoute = routeToSchool.data.plan.itineraries[0].legs;
	for (let i = 0; i < googleEncodedRoute.length; i++) {
		let color = "";
		switch (googleEncodedRoute[i].mode) {
			case "WALK":
				color = "cyan";
				break;
			case "BUS":
				color = "blue";
				break;
			case "RAIL":
				color = "orange";
				break;
			case "TRAM":
				color = "green";
				break;
			default:
				color = "red";
				break;
		}
		const route = googleEncodedRoute[i].legGeometry.points;
		const pointObjects = L.Polyline.fromEncoded(route).getLatLngs(); // fromEncoded: convert Google encoding to Leaflet polylines
		L.polyline(pointObjects)
			.setStyle({
				color,
				weight: 4,
				smoothFactor: 1,
			})
			.addTo(map);
	}
	map.fitBounds([
		[origin.lat, origin.lon],
		[school.lat, school.lon],
	]);
});

// Clears all polyline paths from the map.
function clearMap() {
	Object.values(map._layers).forEach((layer) => {
		if (layer._path !== undefined) {
			map.removeLayer(layer);
		}
	});
}
// This function is a hot mess :D
function displayStats(route) {
	// First get the legs from route (each transfer)
	const legs = route.legs;

	// Separate start and end time based on paths (legs)
	const startTime = new Date(legs[0].startTime);
	const endTime = new Date(legs[legs.length - 1].endTime);

	// Duration approximation quickly
	const duration = endTime - startTime;

	// Convert ms to minutes
	const minutes = duration / 60000;

	// Define start and end time dates (eg. 9.56 --> 11.02)
	const start = { hours: startTime.getHours(), minutes: startTime.getMinutes() };
	const end = { hours: endTime.getHours(), minutes: endTime.getMinutes() };
	// This section is so long because I wanted padding (0) :P
	const startTimeDate = `${start.hours}.${start.minutes > 9 ? "" : "0"}${start.minutes}`;
	const endTimeDate = `${end.hours}.${end.minutes > 9 ? "" : "0"}${end.minutes}`;

	// Split minutes into hours and minutes for duration display (kesto)
	const hours = Math.floor(minutes / 60);
	const mins = Math.floor(minutes - hours * 60);

	// Finally dump all the time info to the user
	time.textContent = `Alkuaika: ${startTimeDate}, Loppuaika: ${endTimeDate}, Kesto: ${
		hours > 0 ? hours + "tuntia " : ""
	}${mins} minuuttia.`;
}

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
