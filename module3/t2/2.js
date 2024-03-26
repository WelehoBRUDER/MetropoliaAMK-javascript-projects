const target = document.querySelector("#target");

const items = ["First item", "Second item", "Third item"];

for (let item of items) {
	const listItem = document.createElement("li");
	listItem.textContent = item;
	if (item == "Second item") {
		listItem.classList.add("my-item");
	}
	// Append is a new method that allows appending multiple elements unlike appendChild.
	target.append(listItem);
}
