const reactions = [
    {
        equation: "PCl5 (g) ⇄ PCl3 (g) + Cl2 (g)",
        compounds: ["PCl5", "PCl3", "Cl2"],
        states: ["g", "g", "g"],
        deltaH: 92.5 // Example value in kJ/mol
    },
    {
        equation: "2NO2 (g) ⇄ N2O4 (g)",
        compounds: ["NO2", "N2O4"],
        states: ["g", "g"],
        deltaH: -57.2 // Example value in kJ/mol
    },
    {
        equation: "CO2 (g) + CaO (s) ⇄ CaCO3 (s)",
        compounds: ["CO2", "CaO", "CaCO3"],
        states: ["g", "s", "s"],
        deltaH: -178.3 // Example value in kJ/mol
    },
    {
        equation: "2H2O2 (aq) ⇄ 2H2O (l) + O2 (g)",
        compounds: ["H2O2", "H2O", "O2"],
        states: ["aq", "l", "g"],
        deltaH: -196 // Example value in kJ/mol
    },
    {
        equation: "H2 (g) + I2 (g) ⇄ 2HI (g)",
        compounds: ["H2", "I2", "HI"],
        states: ["g", "g", "g"],
        deltaH: -10.4 // Example value in kJ/mol
    },
    {
        equation: "2SO2 (g) + O2 (g) ⇄ 2SO3 (g)",
        compounds: ["SO2", "O2", "SO3"],
        states: ["g", "g", "g"],
        deltaH: -198.4 // Example value in kJ/mol
    },
    {
        equation: "COCl2 (g) ⇄ CO (g) + Cl2 (g)",
        compounds: ["COCl2", "CO", "Cl2"],
        states: ["g", "g", "g"],
        deltaH: 87.9 // Example value in kJ/mol
    },
    {
        equation: "H2 (g) + CO2 (g) ⇄ H2O (g) + CO (g)",
        compounds: ["H2", "CO2", "H2O", "CO"],
        states: ["g", "g", "g", "g"],
        deltaH: -41.2 // Example value in kJ/mol
    },
    {
        equation: "C (s) + CO2 (g) ⇄ 2CO (g)",
        compounds: ["C", "CO2", "CO"],
        states: ["s", "g", "g"],
        deltaH: 172.5 // Example value in kJ/mol
    }
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
document.getElementById('question').innerText = questions[currentQuestion] + reactions[currentReaction].compounds[0] + "?";

document.getElementById('left-button').addEventListener('click', () => checkAnswer('left'));
document.getElementById('right-button').addEventListener('click', () => checkAnswer('right'));
document.getElementById('no-effect-button').addEventListener('click', () => checkAnswer('no-effect'));

function checkAnswer(side) {
    const resultElement = document.getElementById('result');
    const reaction = reactions[currentReaction];
    const question = questions[currentQuestion];
    let correct = false;

    if (question.includes("povećanjem koncentracije")) {
        const compound = question.split(" ")[4];
        const index = reaction.compounds.indexOf(compound);
        if (reaction.states[index] === "g" || reaction.states[index] === "aq") {
            correct = (side === 'right' && reaction.compounds.indexOf(compound) < reaction.compounds.length / 2) || 
                      (side === 'left' && reaction.compounds.indexOf(compound) >= reaction.compounds.length / 2);
        } else {
            correct = (side === 'no-effect');
        }
    } else if (question.includes("smanjenjem koncentracije")) {
        const compound = question.split(" ")[4];
        const index = reaction.compounds.indexOf(compound);
        if (reaction.states[index] === "g" || reaction.states[index] === "aq") {
            correct = (side === 'left' && reaction.compounds.indexOf(compound) < reaction.compounds.length / 2) || 
                      (side === 'right' && reaction.compounds.indexOf(compound) >= reaction.compounds.length / 2);
        } else {
            correct = (side === 'no-effect');
        }
    } else if (question.includes("povećanjem pritiska")) {
        const gasMoleculesLeft = reaction.states.filter((state, i) => state === "g" && i < reaction.compounds.length / 2).length;
        const gasMoleculesRight = reaction.states.filter((state, i) => state === "g" && i >= reaction.compounds.length / 2).length;
        correct = (side === 'right' && gasMoleculesLeft > gasMoleculesRight) || (side === 'left' && gasMoleculesLeft <= gasMoleculesRight);
    } else if (question.includes("smanjenjem zapremine")) {
        const gasMoleculesLeft = reaction.states.filter((state, i) => state === "g" && i < reaction.compounds.length / 2).length;
        const gasMoleculesRight = reaction.states.filter((state, i) => state === "g" && i >= reaction.compounds.length / 2).length;
        correct = (side === 'right' && gasMoleculesLeft > gasMoleculesRight) || (side === 'left' && gasMoleculesLeft <= gasMoleculesRight);
    } else if (question.includes("povećanjem zapremine")) {
        const gasMoleculesLeft = reaction.states.filter((state, i) => state === "g" && i < reaction.compounds.length / 2).length;
        const gasMoleculesRight = reaction.states.filter((state, i) => state === "g" && i >= reaction.compounds.length / 2).length;
        correct = (side === 'left' && gasMoleculesLeft > gasMoleculesRight) || (side === 'right' && gasMoleculesLeft <= gasMoleculesRight);
    } else if (question.includes("povećanjem temperature")) {
        correct = (side === 'right' && reaction.deltaH > 0) || (side === 'left' && reaction.deltaH <= 0);
    } else if (question.includes("smanjenjem temperature")) {
        correct = (side === 'left' && reaction.deltaH < 0) || (side === 'right' && reaction.deltaH >= 0);
    }

    if (correct) {
        resultElement.innerText = "Correct!";
        resultElement.className = "correct";
    } else {
        resultElement.innerText = "Incorrect!";
        resultElement.className = "incorrect";
    }

    currentReaction = (currentReaction + 1) % reactions.length;
    currentQuestion = (currentQuestion + 1) % questions.length;
    document.getElementById('reaction').innerText = reactions[currentReaction].equation;
    document.getElementById('question').innerText = questions[currentQuestion] + reactions[currentReaction].compounds[0] + "?";
}
