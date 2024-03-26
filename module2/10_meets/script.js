const candidates = [];
const candidatesNumber = +prompt("How many candidates will be in this meeting?");
for (let i = 1; i <= candidatesNumber; i++) {
	candidates.push({
		name: prompt(`Name for candidate ${i}`),
		votes: 0,
	});
}
const votersNumber = +prompt("How many voters will take part?");
for (let i = 1; i <= votersNumber; i++) {
	const vote = prompt("Who are you voting for?");
	if (vote) {
		getCandidate(vote).votes++;
	}
}
candidates.sort((a, b) => {
	a.votes - b.votes;
});

const winner = candidates[0];
let endText = `The winner is ${winner.name} with ${winner.votes} votes.\nResults:\n`;
for (let candidate of candidates) {
	endText += `${candidate.name}: ${candidate.votes} votes\n`;
}
console.log(endText);

function getCandidate(name) {
	return candidates.find((cand) => cand.name == name);
}

// function getWinner() {
// 	let winner = { votes: -1000 };
// 	for (let candidate of candidates) {
// 		if (candidate.votes > winner.votes) {
// 			winner.votes = candidate.votes;
// 			winner.name = candidate.name;
// 		}
// 	}
// 	return winner;
// }
