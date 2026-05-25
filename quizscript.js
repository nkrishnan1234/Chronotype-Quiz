document.addEventListener('DOMContentLoaded', () => {
    const questionGroups = document.querySelectorAll('.question-group');
    const submitBtn = document.getElementById('submit');
    const resultPanel = document.getElementById('results-display-panel');
    const calculatedTitle = document.getElementById('calculated-title');
    const calculatedLink = document.getElementById('calculated-link');

    // Allows users to select and toggle options multiple times seamlessly
    questionGroups.forEach(group => {
        const options = group.querySelectorAll('.quiz-option');
        options.forEach(option => {
            option.addEventListener('click', () => {
                options.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
            });
        });
    });

    // Score Calculation Evaluation Engine
    submitBtn.addEventListener('click', () => {
        let scores = { lion: 0, bear: 0, wolf: 0, dolphin: 0 };
        let totalSelected = 0;

        const selectedOptions = document.querySelectorAll('.quiz-option.selected');
        selectedOptions.forEach(selected => {
            totalSelected++;
            const type = selected.getAttribute('data-type');
            if (scores.hasOwnProperty(type)) {
                scores[type]++;
            }
        });

        // Validation rule ensuring all 6 answers are checked
        if (totalSelected < 6) {
            alert('Please select an option for all 6 questions before submitting!');
            return;
        }

        // Determine the highest scoring chronotype 
        let winner = 'bear'; // Fallback baseline default
        let maxScore = -1;

        for (const [chronotype, score] of Object.entries(scores)) {
            if (score > maxScore) {
                maxScore = score;
                winner = chronotype;
            }
        }

        // Capitalize the animal name for display purposes (e.g., "wolf" -> "Wolf")
        const finalName = winner.charAt(0).toUpperCase() + winner.slice(1);
        
        // Dynamically update and reveal the customized results box
        calculatedTitle.innerHTML = `Your Matched Chronotype Profile: <strong>${finalName}</strong>`;
        calculatedLink.setAttribute('href', `${winner}.html`);
        calculatedLink.textContent = `Open My ${finalName} Guide`;
        
        resultPanel.style.display = 'block';
        resultPanel.scrollIntoView({ behavior: 'smooth' });
    });
});
