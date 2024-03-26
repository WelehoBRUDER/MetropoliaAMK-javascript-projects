"use strict";
const target = document.querySelector("#target");

const students = [
	{
		name: "John",
		id: "2345768",
	},
	{
		name: "Paul",
		id: "2134657",
	},
	{
		name: "Jones",
		id: "5423679",
	},
];

for (let item of students) {
	const option = document.createElement("option");
	option.textContent = item.name;
	option.value = item.id;
	// Append is a new method that allows appending multiple elements unlike appendChild.
	target.append(option);
}
