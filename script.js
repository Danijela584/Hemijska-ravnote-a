const reactions = [
    { equation: "H2 (g) + N2 (g) ⇄ 2NH3 (g)", correctSide: "right" },
    { equation: "PCl5 (g) ⇄ PCl3 (g) + Cl2 (g)", correctSide: "right" },
    { equation: "2NO2 (g) ⇄ N2O4 (g)", correctSide: "right" },
    { equation: "CO2 (g) + CaO (s) ⇄ CaCO3 (s)", correctSide: "right" },
    { equation: "2H2O2 (aq) ⇄ 2H2O (l) + O2 (g)", correctSide: "right" },
    { equation: "H2 (g) + I2 (g) ⇄ 2HI (g)", correctSide: "right" },
    { equation: "2SO2 (g) + O2 (g) ⇄ 2SO3 (g)", correctSide: "right" },
    { equation: "COCl2 (g) ⇄ CO (g) + Cl2 (g)", correctSide: "right" },
    { equation: "H2 (g) + CO2 (g) ⇄ H2O (g) + CO (g)", correctSide: "right" },
    { equation: "C (s) + CO2 (g) ⇄ CO (g)", correctSide: "right" }
];

const questions = [
    "Kako se menja ravnoteža povećanjem koncentracije ",
    "Kako se menja ravnoteža smanjenjem koncentracije ",
    "Kako se menja ravnoteža povećanjem pritiska?",
    "Kako se menja ravnoteža smanjenjem zapremine?",
    "Kako se menja ravnoteža povećanjem zapremine?",
    "Kako se menja ravnoteža povećanjem temperature?",
    "Kako se menja ravnoteža smanjenjem temperature?"
];

let currentReaction = 0;
let currentQuestion = 0;

document.getElementById('reaction').innerText = reactions[currentReaction].equation;
document.getElementById('question').innerText = questions[currentQuestion] + reactions[currentReaction].equation;

document.getElementById('left-button').addEventListener('click', () => checkAnswer('left'));
document.getElementById('right-button').addEventListener('click', () => checkAnswer('right'));
document.getElementById('yes-button').addEventListener('click', () => checkQuestion('yes'));
document.getElementById('no-button').addEventListener('click', () => checkQuestion('no'));

function checkAnswer(side) {
    const resultElement = document.getElementById('result');
    if (side === reactions[currentReaction].correctSide) {
        resultElement.innerText = "Correct!";
        resultElement.className = "correct";
    } else {
        resultElement.innerText = "Incorrect!";
        resultElement.className = "incorrect";
    }
    currentReaction = (currentReaction + 1) % reactions.length;
    document.getElementById('reaction').innerText = reactions[currentReaction].equation;
    document.getElementById('question').innerText = questions[currentQuestion] + reactions[currentReaction].equation;
}

function checkQuestion(answer) {
    const answerElement = document.getElementById('answer');
    // Logic to determine the correct answer based on Le Chatelier's principle
    // This is a simplified example and should be expanded based on specific rules
    if (answer === 'yes') {
        answerElement.innerText = "Correct!";
        answerElement.className = "correct";
    } else {
        answerElement.innerText = "Incorrect!";
        answerElement.className = "incorrect";
    }
    currentQuestion = (currentQuestion + 1) % questions.length;
    document.getElementById('question').innerText = questions[currentQuestion] + reactions[currentReaction].equation;
}
