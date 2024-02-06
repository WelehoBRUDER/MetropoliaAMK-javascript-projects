if (confirm("Should I calculate the square root of a number?")) {
	const num = +prompt("Give me the number, please");
	document.body.innerHTML += `
    <h2>The square root of ${num} is ${Math.sqrt(num)}.</h2>
  `;
} else {
	document.body.innerHTML += `
    <h2>No square root calculations this time.</h2>
  `;
}
