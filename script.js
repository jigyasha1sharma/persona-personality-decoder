const welcomeScreen = document.getElementById("welcomeScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");

const startBtn = document.getElementById("startBtn");
const retakeBtn = document.getElementById("retakeBtn");
const shareBtn = document.getElementById("shareBtn");

const questionCounter = document.getElementById("questionCounter");
const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const progressBar = document.getElementById("progressBar");

const resultIcon = document.getElementById("resultIcon");
const resultTitle = document.getElementById("resultTitle");
const resultSubtitle = document.getElementById("resultSubtitle");
const resultDescription = document.getElementById("resultDescription");
const traitsContainer = document.getElementById("traitsContainer");

const questions = [
    {
        question: "It's a completely free Saturday. What sounds best?",
        options: [
            { text: "Getting lost in a creative project", type: "dreamer" },
            { text: "Working on a goal I've been planning", type: "achiever" },
            { text: "Spending quality time with my favourite people", type: "empath" },
            { text: "Going somewhere I've never been", type: "explorer" }
        ]
    },
    {
        question: "When you face a difficult problem, you usually...",
        options: [
            { text: "Think of an unusual, creative solution", type: "dreamer" },
            { text: "Make a plan and tackle it step by step", type: "achiever" },
            { text: "Talk it through with someone I trust", type: "empath" },
            { text: "Experiment until something works", type: "explorer" }
        ]
    },
    {
        question: "Which compliment would mean the most to you?",
        options: [
            { text: "You have such a beautiful imagination", type: "dreamer" },
            { text: "You can achieve anything you set your mind to", type: "achiever" },
            { text: "You make people feel understood", type: "empath" },
            { text: "You make life feel like an adventure", type: "explorer" }
        ]
    },
    {
        question: "You're entering a room full of strangers. You...",
        options: [
            { text: "Observe and imagine everyone's stories", type: "dreamer" },
            { text: "Introduce myself confidently", type: "achiever" },
            { text: "Look for someone who seems left out", type: "empath" },
            { text: "Start a random conversation and see what happens", type: "explorer" }
        ]
    },
    {
        question: "What motivates you the most?",
        options: [
            { text: "The freedom to express myself", type: "dreamer" },
            { text: "The feeling of making progress", type: "achiever" },
            { text: "Making a positive difference in someone's life", type: "empath" },
            { text: "The excitement of something new", type: "explorer" }
        ]
    },
    {
        question: "When plans suddenly change, you...",
        options: [
            { text: "Imagine a different way the day could go", type: "dreamer" },
            { text: "Quickly create a new plan", type: "achiever" },
            { text: "Check that everyone is okay with the change", type: "empath" },
            { text: "Feel excited about the unexpected", type: "explorer" }
        ]
    },
    {
        question: "Which place feels most like your kind of world?",
        options: [
            { text: "A cosy room filled with art, music and books", type: "dreamer" },
            { text: "A workspace where big ideas become reality", type: "achiever" },
            { text: "A warm home filled with people I love", type: "empath" },
            { text: "A new city with streets waiting to be explored", type: "explorer" }
        ]
    },
    {
        question: "Your biggest strength is probably...",
        options: [
            { text: "Seeing possibilities others might miss", type: "dreamer" },
            { text: "Staying focused when things get difficult", type: "achiever" },
            { text: "Understanding how other people feel", type: "empath" },
            { text: "Adapting quickly to new situations", type: "explorer" }
        ]
    },
    {
        question: "If you could learn something instantly, you'd choose...",
        options: [
            { text: "A creative skill like painting or music", type: "dreamer" },
            { text: "A skill that helps me reach my biggest goal", type: "achiever" },
            { text: "How to understand people even better", type: "empath" },
            { text: "A language that lets me travel anywhere", type: "explorer" }
        ]
    },
    {
        question: "What do you hope your future feels like?",
        options: [
            { text: "Full of imagination and meaningful creations", type: "dreamer" },
            { text: "Successful, independent and fulfilling", type: "achiever" },
            { text: "Filled with love and genuine connections", type: "empath" },
            { text: "Unpredictable, exciting and full of discovery", type: "explorer" }
        ]
    }
];

const personalities = {
    dreamer: {
        icon: "🌙",
        title: "The Dreamer",
        subtitle: "Creative & Imaginative",
        description:
            "You have a vivid inner world and a natural appreciation for ideas, beauty and possibilities. You often see things from a different angle and enjoy expressing yourself in your own way. Your imagination is one of your greatest strengths.",
        traits: ["Creative", "Thoughtful", "Imaginative", "Curious"]
    },

    achiever: {
        icon: "🔥",
        title: "The Achiever",
        subtitle: "Ambitious & Determined",
        description:
            "You feel energised when you have something meaningful to work toward. You value progress, enjoy overcoming challenges and often look for ways to improve. Your determination helps you turn ideas into action.",
        traits: ["Driven", "Focused", "Independent", "Resilient"]
    },

    empath: {
        icon: "🌿",
        title: "The Empath",
        subtitle: "Caring & Understanding",
        description:
            "You care about the people around you and value genuine connections. You may notice small changes in someone's mood and try to make others feel comfortable. Your kindness and understanding can make a real difference.",
        traits: ["Compassionate", "Supportive", "Patient", "Considerate"]
    },

    explorer: {
        icon: "⚡",
        title: "The Explorer",
        subtitle: "Curious & Adventurous",
        description:
            "You enjoy discovering new things and learning through experience. Routine can sometimes feel limiting because you're drawn to fresh ideas and unexpected opportunities. Your curiosity encourages you to keep growing.",
        traits: ["Adventurous", "Open-minded", "Flexible", "Curious"]
    }
};

let currentQuestion = 0;
let scores = {};

function resetScores() {
    scores = {
        dreamer: 0,
        achiever: 0,
        empath: 0,
        explorer: 0
    };
}

function startQuiz() {
    currentQuestion = 0;
    resetScores();

    welcomeScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestion];

    questionCounter.textContent =
        `QUESTION ${String(currentQuestion + 1).padStart(2, "0")} OF ${questions.length}`;

    questionText.textContent = question.question;

    progressBar.style.width =
        `${(currentQuestion / questions.length) * 100}%`;

    optionsContainer.innerHTML = "";

    question.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.className = "option-btn";

        const letter = document.createElement("span");
        letter.className = "option-letter";
        letter.textContent = String.fromCharCode(65 + index);

        const answerText = document.createElement("span");
        answerText.textContent = option.text;

        button.append(letter, answerText);

        button.addEventListener("click", () => {
            selectAnswer(option.type);
        });

        optionsContainer.appendChild(button);
    });
}

function selectAnswer(type) {
    scores[type]++;

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function getWinningPersonality() {
    const highestScore = Math.max(...Object.values(scores));

    const winners = Object.keys(scores).filter(
        type => scores[type] === highestScore
    );

    return winners[Math.floor(Math.random() * winners.length)];
}

function showResult() {
    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    progressBar.style.width = "100%";

    const winningType = getWinningPersonality();
    const personality = personalities[winningType];

    resultIcon.textContent = personality.icon;
    resultTitle.textContent = personality.title;
    resultSubtitle.textContent = personality.subtitle;
    resultDescription.textContent = personality.description;

    traitsContainer.innerHTML = "";

    personality.traits.forEach(trait => {
        const badge = document.createElement("span");
        badge.className = "trait";
        badge.textContent = trait;
        traitsContainer.appendChild(badge);
    });
}

function retakeQuiz() {
    resultScreen.classList.add("hidden");
    welcomeScreen.classList.remove("hidden");
}

async function shareResult() {
    const title = resultTitle.textContent;
    const subtitle = resultSubtitle.textContent;

    const shareText =
        `I discovered my personality on Persona! I'm ${title} — ${subtitle}. Discover yours too!`;

    if (navigator.share) {
        try {
            await navigator.share({
                title: "My Persona Result",
                text: shareText
            });
        } catch (error) {
            if (error.name !== "AbortError") {
                copyShareText(shareText);
            }
        }
    } else {
        copyShareText(shareText);
    }
}

async function copyShareText(text) {
    try {
        await navigator.clipboard.writeText(text);
        shareBtn.textContent = "Result Copied ✓";
    } catch {
        window.prompt("Copy your result:", text);
    }
}

startBtn.addEventListener("click", startQuiz);
retakeBtn.addEventListener("click", retakeQuiz);
shareBtn.addEventListener("click", shareResult);