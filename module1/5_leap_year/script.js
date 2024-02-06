const year = parseInt(prompt("Enter a year"));

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

document.body.innerHTML += `
  <h2>The year ${year} ${isLeapYear(year) ? "is a" : "is not a"} leap year!</h2>
`;
