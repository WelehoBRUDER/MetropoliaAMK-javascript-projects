const linksElem = document.querySelector("#links");

function createLink(src, name) {
	const link = document.createElement("a");
	link.href = `https://users.metropolia.fi/~juhanaha/javascript-modules/${src}`;
	link.target = "_blank";
	link.classList.add("nav-link");
	link.textContent = name;
	return link;
}

const linksToTasks = {
	module1: [
		"1_console",
		"2_user_prompt",
		"3_three_ints",
		"4_hp",
		"5_leap_year",
		"6_square_root",
		"7_roll_dice",
		"8_leap_year_interval",
		"9_is_prime_number",
		"10_dice_probability",
	],
	module2: [
		"1_reverse_array",
		"2_participants",
		"3_dogs_reversed",
		"4_ask_for_numbers",
		"5_unique_numbers",
		"6_dice_roll",
		"7_dice_rolls_with_params",
		"8_concat",
		"9_even",
		"10_meets",
	],
	module3: [
		"t1/1.html",
		"t2/2.html",
		"t3/3.html",
		"t4/4.html",
		"t5/5.html",
		"t6/6.html",
		"t7/7.html",
		"t8/8.html",
		"t9/9.html",
		"t10/10.html",
		"t11/11.html",
	],
	module4: [
		"1_tv_series",
		"2_tv_series",
		"3_tv_series",
		"4_tv_series_final",
		"5_chuck_norris_joke",
		"6_chuck_norris_joke",
		"7_digitransit_routing",
	],
};

const colors = [
	{ normal: "red", lighter: "pink" },
	{ normal: "green", lighter: "lime" },
	{ normal: "grey", lighter: "silver" },
	{ normal: "blue", lighter: "cyan" },
];

Object.entries(linksToTasks).forEach(([key, links], _) => {
	const module = document.createElement("div");
	const title = document.createElement("h2");
	const linksContainer = document.createElement("div");

	module.classList.add("module");
	title.classList.add("module-title");
	linksContainer.classList.add("module-links");

	const { normal, lighter } = colors[_];
	module.style.setProperty("--color", normal);
	module.style.setProperty("--lighter", lighter);

	title.textContent = `Module ${_ + 1}`;
	links.forEach((link, index) => {
		linksContainer.append(createLink(`${key}/${link}`, `Task ${index + 1}`));
	});
	module.append(title, linksContainer);
	linksElem.append(module);
});
