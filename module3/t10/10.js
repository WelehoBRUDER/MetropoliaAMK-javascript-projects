const mainForm = document.querySelector("#source");
const target = document.querySelector("#target");

mainForm.addEventListener("submit", (e) => {
	e.preventDefault();
	// Get form data without selecting the inputs.
	// Then extract firstname and lastname from the object.
	const { firstname, lastname } = Object.fromEntries(new FormData(mainForm));

	target.textContent = `Your name is ${firstname} ${lastname}`;
});
