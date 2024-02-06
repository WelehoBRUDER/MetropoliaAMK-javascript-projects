function isPrimeNumber(number) {
	isPrime = true;
	for (i = 2; i <= Math.floor(Math.sqrt(number)); i++) {
		if (number % i == 0) isPrime = false;
	}
	return isPrime;
}

const num = parseInt(prompt("Give a number"));

document.body.innerHTML += `
  <h2>${num} ${isPrimeNumber(num) ? "is a" : "is not a"} prime number</h2>
`;
