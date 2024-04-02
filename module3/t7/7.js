const trigger = document.querySelector("#trigger");
const target = document.querySelector("#target");

trigger.addEventListener("mouseover", () => {
	target.src = "img/picB.jpg";
});

trigger.addEventListener("mouseout", () => {
	target.src = "img/picA.jpg";
});
