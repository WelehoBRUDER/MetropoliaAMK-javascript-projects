const rollDice = () => {
	return Math.floor(Math.random() * 6) + 1;
};

const diceRolls = parseInt(prompt("How many dice should we roll?"));
const eyeSum = parseInt(prompt("What sum do you want from your dice?"));

let matches = 0;
// Simulate dice throws 10000 times
for (let i = 1; i <= 15000; i++) {
	let sum = 0;
	for (let i = 1; i <= diceRolls; i++) {
		sum += rollDice();
	}
	if (sum === eyeSum) matches++;
}

const probability = (matches / 15000) * 100;

document.body.innerHTML += `
  <h2>The probability of ${diceRolls}d6 getting ${eyeSum} is about ${probability.toFixed(3)}%</h2>
`;
