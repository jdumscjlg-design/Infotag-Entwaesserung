// Fragen für den Tag der offenen Tür (Entwässerung & Planung)
const questions = [
    {
        question: "Wofür sind Entwässerungsunterlagen bei Bauanträgen so wichtig?",
        answers: [
            { text: "Damit das Bauamt weiß, welche Fliesen im Bad verlegt werden.", correct: false },
            { text: "Um nachzuweisen, dass Regen- und Abwasser fachgerecht und ohne Überflutungsrisiko abgeleitet werden.", correct: true },
            { text: "Sie dienen lediglich als statistischer Nachweis für den Denkmalschutz.", correct: false },
            { text: "Damit wird die Farbe der Dachrinnen offiziell festgelegt.", correct: false }
        ],
        explanation: "Ohne Entwässerungsgesuch gibt es keine Baugenehmigung! Es muss genau nachgewiesen werden, dass das anfallende Abwasser das öffentliche Netz nicht überlastet und wild abfließendes Regenwasser keine Nachbargrundstücke überschwemmt."
    },
    {
        question: "Was ist das Hauptziel einer Generalentwässerungsplanung (GEP)?",
        answers: [
            { text: "Die grafische Gestaltung von städtischen Springbrunnen.", correct: false },
            { text: "Die langfristige und zukunftssichere Auslegung des gesamten Kanalnetzes einer Kommune.", correct: true },
            { text: "Die Festlegung von Tarifen für das Trinkwasser.", correct: false },
            { text: "Ein reiner Notfallplan für die Feuerwehr bei Hochwasser.", correct: false }
        ],
        explanation: "Der GEP ist der Masterplan für die unterirdische Infrastruktur. Er berechnet anhand von Computermodellen, wie das Kanalnetz bei Starkregen reagiert und wo das System für die Zukunft (z.B. durch Klimawandel oder neue Baugebiete) erweitert werden muss."
    },
    {
        question: "Wie kann ein privater Anwohner sein Haus effektiv gegen Rückstau aus dem Kanal sichern?",
        answers: [
            { text: "Indem er bei Starkregen die Toilettendeckel fest zudrückt.", correct: false },
            { text: "Durch den Einbau von funktionierenden Rückstauverschlüssen oder einer Abwasserhebeanlage.", correct: true },
            { text: "Durch das Pflanzen von tiefwurzelnden Bäumen im Vorgarten.", correct: false },
            { text: "Gar nicht, der Schutz liegt rechtlich allein bei der Stadt.", correct: false }
        ],
        explanation: "Wenn die öffentliche Kanalisation bei Starkregen vollsteht, drückt das Wasser rückwärts in die Hausanschlüsse. Liegen Räume (wie Keller) unterhalb der Straßenebene, schützt nur eine funktionierende Rückstausicherung vor einer Schlammlawine im Haus!"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById('question-text');
const answerButtonsElement = document.getElementById('answer-buttons');
const explanationContainer = document.getElementById('explanation-container');
const explanationText = document.getElementById('explanation-text');
const nextButton = document.getElementById('next-btn');
const quizBox = document.getElementById('quiz-box');
const resultBox = document.getElementById('result-box');
const scoreText = document.getElementById('score-text');

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    answerButtonsElement.innerHTML = '';
    explanationContainer.classList.add('hide');
    
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    
    if (isCorrect) {
        selectedButton.classList.add('correct');
        score++;
    } else {
        selectedButton.classList.add('wrong');
        Array.from(answerButtonsElement.children).forEach(button => {
            if (button.dataset.correct === "true") {
                button.classList.add('correct');
            }
        });
    }
    
    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;
    });
    
    explanationText.innerText = questions[currentQuestionIndex].explanation;
    explanationContainer.classList.remove('hide');
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
    } else {
        showResult();
    }
});

function showResult() {
    quizBox.classList.add('hide');
    resultBox.classList.remove('hide');
    scoreText.innerText = `Sie haben ${score} von ${questions.length} Punkten erreicht. Vielen Dank für Ihren Besuch an unserem Tag der offenen Tür! 💧`;
}

startQuiz();