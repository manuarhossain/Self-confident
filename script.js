// script.js
function submitForm() {
    const radios = document.querySelectorAll('input[type="radio"]');
    let totalScore = 0;
    let group1Score = 0; // For questions 1, 2, 4, 5, 6, 7, 11, 12, 13
    let group2Score = 0; // For questions 9, 10, 14
    let group3Score = 0; // For questions 3, 8

    const group1Questions = [1, 2, 4, 5, 6, 7, 11, 12, 13];
    const group2Questions = [9, 10, 14];
    const group3Questions = [3, 8];

    const numQuestions = radios.length / 5;

    for (let i = 0; i < numQuestions; i++) {
        let questionScore = 0;
        const radioName = `question${i + 1}`;
        const selectedRadio = document.querySelector(`input[name="${radioName}"]:checked`);
        if (selectedRadio) {
            questionScore = parseInt(selectedRadio.value);
            totalScore += questionScore;
            if (group1Questions.includes(i + 1)) {
                group1Score += questionScore;
            } else if (group2Questions.includes(i + 1)) {
                group2Score += questionScore;
            } else if (group3Questions.includes(i + 1)) {
                group3Score += questionScore;
            }
        }
    }

    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = `Your total score is: ${totalScore} <br>`;

    let comment = "";
    if (totalScore <= 32) {
        comment = "You probably wish you had more self-confidence! Take a closer look at all the things you've achieved in your life. You may tend to focus more on what you don't have, and this takes time and attention away from recognizing and using your skills and talents. Read this article for everyday tips on building your self-confidence.";
    } else if (totalScore <= 51) {
        comment = "You're doing an OK job of recognizing your skills, and believing in your abilities. But perhaps you're a little too hard on yourself, and this may stop you from getting the full benefit of your mastery experiences.";
    } else if (totalScore <= 70) {
        comment = "Excellent! You're doing a fabulous job of learning from every experience, and not allowing obstacles to affect the way you see yourself. But you need to nurture your self-confidence, so use the tips below to ensure that your life remains full of validation and success.";
    } else {
        comment = "Thank you! We are thrilled that you loved our product.";
    }

    resultsDiv.innerHTML += `<strong>${comment}</strong> <br><br>`;

    resultsDiv.innerHTML += "If you are not confident then fake it.<br><br>";

    resultsDiv.innerHTML += `Developing Mastery Experiences: ${group1Score} <br>`;
    resultsDiv.innerHTML += `Observe Others: ${group2Score} <br>`;
    resultsDiv.innerHTML += `Manage Stress: ${group3Score} <br>`;
    resultsDiv.innerHTML += `Total Group Score: ${group1Score + group2Score + group3Score} <br><br>`;

    const scores = [group1Score, group2Score, group3Score];
    const minScore = Math.min(...scores);
    const sortedScores = [...scores].sort((a, b) => a - b);
    const colors = scores.map(score => {
        if (score === minScore) return "red";
        if (score === sortedScores[1]) return "blue";
        return "grey";
    });

    let barChartHTML = "<div style='display: flex;'>";
    for (let i = 0; i < scores.length; i++) {
        barChartHTML += `<div class="bar ${colors[i]}" style="height: ${scores[i] * 10}px;">${scores[i]}</div>`;
    }
    barChartHTML += "</div>";

    resultsDiv.innerHTML += barChartHTML;

    resultsDiv.innerHTML += "<button onclick='window.print()'>Print</button>";
}

