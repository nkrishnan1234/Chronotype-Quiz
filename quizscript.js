const scores = { Lion: 0, Bear: 0, Dolphin: 0, Wolf: 0 };
let questionsAnswered = 0;
const TOTAL_QUESTIONS = 6;

document.addEventListener("DOMContentLoaded", () => {

    // Question 1
    setupButton("Lion1", "Lion");
    setupButton("Bear1", "Bear");
    setupButton("Dolphin1", "Dolphin");
    setupButton("Wolf1", "Wolf");
    
    // Question 2
    setupButton("Lion2", "Lion");
    setupButton("Bear2", "Bear");
    setupButton("Dolphin2", "Dolphin");
    setupButton("Wolf2", "Wolf");
    
    // Question 3
    setupButton("LionWolfBear3", ""); 
    setupButton("Dolphin3", "Dolphin");
    
    // Question 4
    setupButton("Lion4", "Lion");
    setupButton("Bear4", "Bear");
    setupButton("Dolphin4", "Dolphin");
    setupButton("Wolf4", "Wolf");
    
    // Question 5
    setupButton("Lion5", "Lion");
    setupButton("Bear5", "Bear");
    setupButton("Dolphin5", "Dolphin");
    setupButton("Wolf5", "Wolf");
    
    // Question 6
    setupButton("Lion6", "Lion");
    setupButton("Bear6", "Bear");
    setupButton("Dolphin6", "Dolphin");
    setupButton("Wolf6", "Wolf");

    // Question 7-

    setupSubmitButton();
});

function setupButton(buttonId, animalType) {
    const button = document.getElementById(buttonId);
    if (button) {
        button.addEventListener("click", () => {
            if (animalType) {
                scores[animalType]++;
            }
            questionsAnswered++;
            console.log(`Added point to ${animalType}. Current scores:`, scores);
            
            // Disable all buttons for this specific question row
            button.parentElement.querySelectorAll(`[id$="${buttonId.slice(-1)}"]`).forEach(btn => btn.disabled = true);
            
            // Show the submit button once all questions are answered
            if (questionsAnswered === TOTAL_QUESTIONS) {
                const submitBtn = document.getElementById("submit");
                if (submitBtn) {
                    submitBtn.style.display = "block";
                }
            }
        });
    }
}

function setupSubmitButton() {
    const submitBtn = document.getElementById("submit");
    if (submitBtn) {
        submitBtn.addEventListener("click", () => {
            calculateResult();
            submitBtn.style.display = "none"; // Hide submit button after click
        });
    }
}

function calculateResult() {
    let highestScore = -1;
    let winner = "";

    for (const animal in scores) {
        if (scores[animal] > highestScore) {
            highestScore = scores[animal];
            winner = animal;
        }
    }

    // Hide all outcome/info page buttons first
    document.querySelectorAll('.result-btn').forEach(btn => {
        btn.style.display = 'none';
    });

    // Reveal the winning animal's info button
    const winningButton = document.getElementById(`btn-${winner}`);
    if (winningButton) {
        winningButton.style.display = 'block';
    }
}