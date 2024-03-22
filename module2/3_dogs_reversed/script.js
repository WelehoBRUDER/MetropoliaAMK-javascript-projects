const dogsElem = document.querySelector(".dogs");

const dogs = [];
const dogsAmount = 6;
for (let i = 0; i < dogsAmount; i++) {
	dogs.push(prompt(`What is this dog called? (${dogsAmount - i} remaining)`));
}
dogs.sort();
dogs.reverse();

dogs.forEach((dog) => {
	const listObject = document.createElement("li");
	listObject.textContent = dog;
	dogsElem.append(listObject);
});
