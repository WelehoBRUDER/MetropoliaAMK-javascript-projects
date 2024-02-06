const classes = ["Gryffindor", "Slytherin", "Hufflepuff", "Ravenclaw"];
const username = prompt("What is your name?");
const userclass = classes[Math.floor(Math.random() * classes.length)];

document.body.innerHTML += `
  <h1>${username}, you are ${userclass}!</h1>
`;
