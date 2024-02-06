function isLeapYear(yr) {
	if (yr % 4 === 0) {
		if (yr % 100 === 0) {
			if (yr % 400 === 0) {
				return true;
			}
		} else return true;
	}
	return false;
}

const leapYears = [];
const startYear = parseInt(prompt("Give start year"));
const endYear = parseInt(prompt("Give end year"));

for (let i = startYear; i <= endYear; i++) {
	if (isLeapYear(i)) {
		leapYears.push(i);
	}
}

document.body.innerHTML += `
  <ul>
    ${leapYears.map((y) => `<li>${y}</li>`).join("")}
  </ul>
`;
