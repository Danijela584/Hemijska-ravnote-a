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

let currentReaction = 0;

document.getElementById('reaction').innerText = reactions[currentReaction].equation;

document.getElementById('left-button').addEventListener('click', () => checkAnswer('left'));
document.getElementById('right-button').addEventListener('click', () => checkAnswer('right'));

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
}
