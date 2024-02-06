const ints = [];
for (let i = 1; i <= 3; i++) {
	ints.push(parseInt(prompt(`Give me ${i > 1 ? "another" : "a"} whole number!`)));
}

document.body.innerHTML += `
  <h1>Results</h1>
  <p>Sum: ${ints.reduce((a, b) => a + b)}</p>
  <p>Product: ${ints.reduce((a, b) => a * b)}</p>
  <p>Average: ${ints.reduce((a, b) => a + b) / ints.length}</p>

`;
