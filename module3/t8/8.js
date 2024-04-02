const operation = document.querySelector("#operation");
const start = document.querySelector("#start");
const result = document.querySelector("#result");

function getNumbers() {
	const num1 = +document.querySelector("#num1").value;
	const num2 = +document.querySelector("#num2").value;
	return [num1, num2];
}

start.addEventListener("click", calculate);

function calculate() {
	const calcOp = operation.value;
	const [num1, num2] = getNumbers();
	eval(`${calcOp}(${num1}, ${num2})`);
}

function add(a, b) {
	result.textContent = a + b;
}

function sub(a, b) {
	result.textContent = a - b;
}

function multi(a, b) {
	result.textContent = a * b;
}

function div(a, b) {
	result.textContent = a / b;
}
