const input = document.querySelector("#calculation");
const start = document.querySelector("#start");
const results = document.querySelector("#result");

start.addEventListener("click", doCalc);

// DOES NOT SUPPORT PARENTHESES!
// Also does not care about math rules
// 3+7*3 will be calculated as 10*3;

// This might be needlessly complex, but oh well :P
function doCalc() {
	const rawInput = input.value;
	let result = 0;
	// Splits all operations and numbers
	// I won't pretend that I figured this out completely by myself
	const operations = rawInput.match(/[^\d()]+|[\d.]+/g);
	for (let i = 1; i <= operations.length; i += 2) {
		let prevNumber = +operations[i - 1];
		const nextNumber = +operations[i + 1];
		const operation = operations[i];
		if (i !== 1) {
			prevNumber = result;
		}
		if (prevNumber && nextNumber) {
			result = +doOperation(prevNumber, nextNumber, operation);
		}
	}

	results.textContent = result.toFixed(1);
}

// It ain't pretty, but it works.
function doOperation(num1, num2, op) {
	const ops = {
		"/": (num1, num2) => num1 / num2,
		"*": (num1, num2) => num1 * num2,
		"+": (num1, num2) => num1 + num2,
		"-": (num1, num2) => num1 - num2,
	};
	return ops[op](+num1, +num2);
}
