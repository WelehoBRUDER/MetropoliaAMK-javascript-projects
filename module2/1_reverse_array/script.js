const nums = [];
for (let i = 0; i < 5; i++) {
	nums.push(parseInt(prompt(`Pick any number (${5 - i} remaining)`)));
}
console.log(nums);
const reversed_nums = [];
for (let i = nums.length - 1; i >= 0; i--) {
	reversed_nums.push(nums[i]);
}

console.log(reversed_nums);
