const participantsElem = document.querySelector(".participants");

const numOfParticipants = parseInt(prompt("How many participants will there be?"));

const participants = [];
for (let i = 0; i < numOfParticipants; i++) {
	participants.push(prompt(`What is this participant called? (${numOfParticipants - i} remaining)`));
}
participants.sort();

participants.forEach((participant) => {
	const listObject = document.createElement("li");
	listObject.textContent = participant;
	participantsElem.append(listObject);
});
