const diceRolls = parseInt(prompt("How many d6 should I throw?"));

const rollDice = () => {
	return Math.floor(Math.random() * 6) + 1;
};

let sum = 0;
for (let i = 0; i < diceRolls; i++) {
	sum += rollDice();
}

document.body.innerHTML += `
  <h2>${diceRolls}d6 resulted in ${sum}</h2>
`;
