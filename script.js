// CREATE A QUIZ CLASS
class Quiz {
    constructor(questions) {
        this.score = 0;
        this.questions = questions;
        this.questionIndex = 0;
    }

    getQuestionIndex() {
        return this.questions[this.questionIndex];
    }

    guess(answer) {
        if (this.getQuestionIndex().isCorrectAnswer(answer)) {
            this.score++;
        }
        this.questionIndex++;
    }

    isEnded() {
        return this.questionIndex === this.questions.length;
    }
}

//CREATE A QUESTION CLASS
class Question {
    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }

    isCorrectAnswer(choice) {
        return this.answer === choice;
    }
}

//DISPLAY QUESTION
function displayQuestion() {
    if (quiz.isEnded()) {
        showScores();
    } else {
        //SHOW NEXT QUESTION
        let questionElement = document.getElementById("question");
        questionElement.innerHTML = quiz.getQuestionIndex().text;

        //SHOW OPTIONS
        let choices = quiz.getQuestionIndex().choices;
        for (let i = 0; i < choices.length; i++) {
            let choiceElement = document.getElementById("choice" + i);
            choiceElement.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
}

//GUESS FUNCTION
function guess(id, guess) {
    let button = document.getElementById(id);
    button.onclick = function () {
        quiz.guess(guess);
        displayQuestion();
    };
}

//SHOW QUIZ PROGRESS
function showProgress() {
    let currentQuestionNumber = quiz.questionIndex + 1;
    let progressElement = document.getElementById("progress");
    progressElement.innerHTML = `Question ${currentQuestionNumber} of ${quiz.questions.length}`;
}

//SHOW SCORE
function showScores() {
    let quizEndHTML = `
        <h1> Quiz Completed </h1>
        <h2 id="score"> You Scored: ${quiz.score} of ${quiz.questions.length} </h2>
        <div class="quiz-repeat">
        <a href="index.html"> Take Quiz Again </a>
        </div>
        `;
    let quizElement = document.getElementById("quiz");
    quizElement.innerHTML = quizEndHTML;
}

//CREATE QUIZ QUESTIONS
let questions = [
    new Question(
        "Who blew up the first Death Star, and with what weapon?",
        [
            "Luke Skywalker with his Lightsaber",
            "Princess Leia with an X-wing",
            "Luke Skywalker with an X-wing",
            "Princess Leia with a thermal detonator",
        ],
        "Luke Skywalker with an X-wing"
    ),
    new Question(
        "What was the job that Finn told Han Solo he had at Starkiller base?",
        ["Pilot", "Sanitation", "Guard", "Chef"],
        "Sanitation"
    ),
    new Question(
        "What happened to Anakin Skywalker during the battle with Count Dooku?",
        [
            "He lost his left leg",
            "He lost his right arm",
            "He lost his right leg",
            "He lost",
        ],
        "He lost his right arm"
    ),
    new Question(
        "What did Luke Skywalker lose in his fight with Darth Vader?",
        ["His left hand", "His left foot", "His right hand", "His left leg"],
        "His right hand"
    ),
    new Question(
        "According to the Emperor, what was Luke Skywalker's weakness?",
        [
            "His faith in the Light Side of the Force",
            "His faith in his friends",
            "His lack of vision",
            "His resistance to the Dark Side of the Force"
        ],"His faith in his friends"
    ),
    new Question(
        "Where did the Clone Wars Begin?",
        ["Tatooine","Geonosis","Naboo","Coruscant"],"Geonosis"
    ),
    new Question(
        "What did Owen Lars tell Luke Skywalker about his father?",
        [
            "He was a Jedi Knight",
            "He had been a Sith Lord",
            "He was a navigator on a spice freighter",
            "He was a fighter pilot"
        ],"He was a navigator on a spice freighter"
    ),
    new Question(
        "What was Chewbacca's weapon of choice?",
        [
            "Blaster rifle",
            "Lightsaber",
            "Metal club",
            "Bowcaster"
        ],"Bowcaster"
    ),
    new Question(
        "What's the name of the spiky-headed Sith Lord holding a cool double-blade lightsaber?",
        [
            "Darth Vader",
            "Darth Maul",
            "Darth Paul",
            "Darth Garth"
        ],"Darth Maul"

    ),
    new Question(
        "What was the original title for the Star Wars movie?",
        [
            "Star Battles",
            "Adventures of Luke Starkiller",
            "The Adventures of the Jedi",
            "Battles in Space"
        ],"Adventures of Luke Starkiller"
    )
];

let quiz = new Quiz(questions);

//DISPLAY QUESTION
displayQuestion();

//ADD A COUNTDOWN
let time = 10;
let quizTimeInMinutes = time * 60 * 60;
let quizTime = quizTimeInMinutes / 60;

let counting = document.getElementById("count-down");

function startCountdown() {
    let quizTimer = setInterval(function(){
        if (quizTime <= 0) {
            clearInterval(quizTimer);
            showScores();
        } else {
            quizTime--;
            let sec = Math.floor(quizTime % 60);
            let min = Math.floor(quizTime / 60) % 60;
            counting.innerHTML = `TIME: ${min} : ${sec}`;
        }
    }, 1000)
}

startCountdown();