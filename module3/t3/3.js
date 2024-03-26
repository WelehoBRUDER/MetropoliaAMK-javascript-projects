"use strict";
const target = document.querySelector("#target");

const names = ["John", "Paul", "Jones"];

for (let item of names) {
	const listItem = document.createElement("li");
	listItem.textContent = item;
	// Append is a new method that allows appending multiple elements unlike appendChild.
	target.append(listItem);
}
