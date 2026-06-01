// Quiz Data
const QUIZ_DATA = [
    { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyper Transfer Markup"], correct: 0, explanation: "HTML is the standard markup language for creating web pages.", category: "HTML" },
    { question: "What does CSS property 'margin' do?", options: ["Inner spacing", "Outer spacing", "Border color", "Text style"], correct: 1, explanation: "Margin creates space outside an element's border.", category: "CSS" },
    { question: "Which company maintains React.js?", options: ["Google", "Meta (Facebook)", "Microsoft", "Amazon"], correct: 1, explanation: "React was created and is maintained by Meta.", category: "JavaScript" },
    { question: "Correct syntax for JavaScript array?", options: ["{1,2,3}", "(1,2,3)", "[1,2,3]", "<1,2,3>"], correct: 2, explanation: "JavaScript arrays use square brackets [ ].", category: "JavaScript" },
    { question: "What does 'padding' do in CSS?", options: ["Space outside border", "Space between content and border", "Background color", "Text shadow"], correct: 1, explanation: "Padding creates inner space between content and border.", category: "CSS" },
    { question: "What does API stand for?", options: ["Application Programming Interface", "Advanced Program Integration", "Application Process Interface", "Automated Protocol Interface"], correct: 0, explanation: "API allows different applications to communicate.", category: "General" }
];

let currentIndex = 0;
let userAnswers = new Array(QUIZ_DATA.length).fill(null);
let quizCompleted = false;
let timeLeft = 22;
let timerInterval = null;
let timerActive = false;

const root = document.getElementById('quizRoot');

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    let iconHtml = '';
    if (type === 'success') iconHtml = '<i class="fas fa-check-circle" style="color: #10b981;"></i>';
    else if (type === 'error') iconHtml = '<i class="fas fa-times-circle" style="color: #ef4444;"></i>';
    else iconHtml = '<i class="fas fa-info-circle" style="color: #8b5cf6;"></i>';
    toast.innerHTML = `${iconHtml} <span>${message}</span>`;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.animation = 'toastGlide 0.25s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 2600);
}

function celebrate() {
    canvasConfetti({ particleCount: 100, spread: 65, origin: { y: 0.6 }, colors: ['#8B5CF6', '#06B6D4', '#10B981'] });
}

function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    if (userAnswers[currentIndex] !== null) return;
    timerActive = true;
    timerInterval = setInterval(() => {
        if (!timerActive || quizCompleted) return;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            if (userAnswers[currentIndex] === null) {
                userAnswers[currentIndex] = -1;
                showToast("Time's up! Moving to next question...", "error");
                setTimeout(() => moveToNext(), 1300);
            }
        } else {
            timeLeft--;
            updateTimerDisplay();
        }
    }, 1000);
}

function stopTimer() {
    if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
    timerActive = false;
}

function updateTimerDisplay() {
    const el = document.getElementById('timerDisplay');
    if (el) {
        el.innerHTML = `<i class="fas fa-hourglass-half me-1"></i>${timeLeft}s`;
        el.classList.remove('timer-warning', 'timer-danger');
        if (timeLeft <= 5) el.classList.add('timer-danger');
        else if (timeLeft <= 10) el.classList.add('timer-warning');
    }
}

function moveToNext() {
    stopTimer();
    if (currentIndex + 1 < QUIZ_DATA.length) {
        currentIndex++;
        timeLeft = 22;
        render();
    } else {
        quizCompleted = true;
        render();
    }
}

function moveToPrevious() {
    if (currentIndex > 0) {
        stopTimer();
        currentIndex--;
        timeLeft = 22;
        render();
    }
}

function getAnsweredCount() {
    return userAnswers.filter(a => a !== null && a !== -1).length;
}

function getProgressPercent() {
    return (getAnsweredCount() / QUIZ_DATA.length) * 100;
}

function calculateScore() {
    let score = 0;
    for (let i = 0; i < QUIZ_DATA.length; i++) {
        if (userAnswers[i] !== null && userAnswers[i] !== -1 && userAnswers[i] === QUIZ_DATA[i].correct) score++;
    }
    return score;
}

function shareResults() {
    let score = calculateScore();
    let total = QUIZ_DATA.length;
    let percent = Math.round((score / total) * 100);
    let text = `My Quiz Score: ${score}/${total} (${percent}%) on QuizAura Pro! Can you beat it?`;
    if (navigator.share) navigator.share({ title: 'QuizAura Score', text }).catch(() => copyText(text));
    else copyText(text);
}

function copyText(text) {
    navigator.clipboard.writeText(text);
    showToast("Score copied to clipboard!", "success");
}

function fullReset() {
    stopTimer();
    userAnswers = new Array(QUIZ_DATA.length).fill(null);
    currentIndex = 0;
    quizCompleted = false;
    timeLeft = 22;
    render();
    showToast("Quiz reset! Ready for a new challenge.", "success");
    celebrate();
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

let keyHandler = null;
function attachKeys() {
    if (keyHandler) document.removeEventListener('keydown', keyHandler);
    keyHandler = (e) => {
        if (quizCompleted) return;
        if (e.key >= '1' && e.key <= '4') {
            let idx = parseInt(e.key) - 1;
            let opts = document.querySelectorAll('.option-premium:not(.disabled-opt)');
            if (opts[idx] && userAnswers[currentIndex] === null) opts[idx].click();
        } else if (e.key === 'ArrowLeft') {
            moveToPrevious();
        } else if (e.key === 'ArrowRight') {
            if (userAnswers[currentIndex] !== null && userAnswers[currentIndex] !== -1) moveToNext();
        }
    };
    document.addEventListener('keydown', keyHandler);
}

function render() {
    if (quizCompleted) renderResult();
    else renderQuestion();
}

function renderQuestion() {
    const q = QUIZ_DATA[currentIndex];
    const selected = userAnswers[currentIndex];
    const isAnswered = (selected !== null && selected !== -1);
    const total = QUIZ_DATA.length;
    const progress = getProgressPercent();
    const letters = ['A', 'B', 'C', 'D'];

    let optsHtml = '';
    q.options.forEach((opt, idx) => {
        const isSelected = (selected === idx);
        const disabledClass = isAnswered ? 'disabled-opt' : '';
        const selectedClass = isSelected ? 'selected-premium' : '';
        optsHtml += `
            <div class="option-premium d-flex align-items-center justify-content-between ${disabledClass} ${selectedClass}" data-opt-index="${idx}">
                <div class="d-flex align-items-center">
                    <span class="option-letter fw-bold">${letters[idx]}</span>
                    <span class="option-text">${escapeHtml(opt)}</span>
                </div>
                ${isSelected ? '<i class="fas fa-check-circle" style="color:#A78BFA; font-size:1rem;"></i>' : ''}
            </div>
        `;
    });

    let feedbackHtml = '';
    if (selected === -1) {
        feedbackHtml = `<div class="feedback-premium feedback-wrong-premium"><i class="fas fa-hourglass-end me-2"></i> Time's up! Moving to next question.</div>`;
    } else if (isAnswered) {
        const isCorrect = (selected === q.correct);
        const correctAns = q.options[q.correct];
        if (isCorrect) {
            feedbackHtml = `<div class="feedback-premium feedback-correct-premium"><i class="fas fa-check-circle me-2"></i> Correct! ${escapeHtml(q.explanation)}</div>`;
            celebrate();
        } else {
            feedbackHtml = `<div class="feedback-premium feedback-wrong-premium"><i class="fas fa-times-circle me-2"></i> Incorrect! Correct: ${escapeHtml(correctAns)}. ${escapeHtml(q.explanation)}</div>`;
        }
    }

    let paletteHtml = '<div class="question-palette">';
    QUIZ_DATA.forEach((_, idx) => {
        const status = (userAnswers[idx] !== null && userAnswers[idx] !== -1) ? 'answered' : '';
        const isCurr = idx === currentIndex ? 'current' : '';
        paletteHtml += `<button class="palette-btn ${status} ${isCurr}" data-qidx="${idx}">${idx+1}</button>`;
    });
    paletteHtml += '</div>';

    const html = `
        <div class="quiz-header-premium">
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <h2><i class="fas fa-bolt me-2" style="color:#8B5CF6;"></i>QuizAura Pro</h2>
                    <div class="mt-1">
                        <span class="quiz-badge"><i class="fas fa-list me-1"></i>${currentIndex+1}/${total}</span>
                        <span class="quiz-badge ms-1"><i class="fas fa-tag me-1"></i>${q.category}</span>
                    </div>
                </div>
                <div class="d-flex gap-2">
                    <div class="timer-premium" id="timerDisplay"><i class="fas fa-hourglass-half me-1"></i>${timeLeft}s</div>
                </div>
            </div>
        </div>
        <div class="progress-wrapper">
            <div class="d-flex justify-content-between mb-1">
                <span class="progress-label-text"><i class="fas fa-chart-line me-1"></i>YOUR PROGRESS</span>
                <span class="progress-label-text">${Math.round(progress)}%</span>
            </div>
            <div class="progress-bar-track"><div class="progress-fill-glow" style="width: ${progress}%;"></div></div>
            ${paletteHtml}
        </div>
        <div class="question-premium">
            <div class="question-text-premium">${escapeHtml(q.question)}</div>
            <div id="optionsArea">${optsHtml}</div>
            ${feedbackHtml}
            <div class="d-flex flex-wrap justify-content-between gap-2 mt-3">
                <button class="btn-glass" id="prevBtnQuiz">${currentIndex === 0 ? 'Start' : 'Previous'} <i class="fas fa-arrow-left ms-1"></i></button>
                <button class="btn-glass" id="resetBtnQuiz"><i class="fas fa-redo-alt me-1"></i> Reset</button>
                <button class="btn-gradient" id="nextBtnQuiz">${currentIndex+1 === total ? 'Finish' : 'Next'} <i class="fas fa-arrow-right ms-1"></i></button>
            </div>
        </div>
        <footer><i class="fas fa-keyboard me-1"></i> Press 1-4 to answer | ← → arrows to navigate</footer>
    `;

    root.innerHTML = html;

    // Option click handlers
    document.querySelectorAll('.option-premium').forEach(div => {
        div.addEventListener('click', (e) => {
            e.stopPropagation();
            if (userAnswers[currentIndex] !== null && userAnswers[currentIndex] !== -1) return;
            const idx = parseInt(div.getAttribute('data-opt-index'));
            if (isNaN(idx)) return;
            userAnswers[currentIndex] = idx;
            if (idx === q.correct) {
                showToast("Excellent! That's the right answer!", "success");
            } else {
                showToast(`Oops! The correct answer is ${letters[q.correct]}. Keep learning!`, "error");
            }
            stopTimer();
            render();
        });
    });

    // Palette button handlers
    document.querySelectorAll('.palette-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const qidx = parseInt(btn.getAttribute('data-qidx'));
            if (!isNaN(qidx) && qidx !== currentIndex) {
                stopTimer();
                currentIndex = qidx;
                timeLeft = 22;
                render();
            }
        });
    });

    // Previous button handler
    const prevBtn = document.getElementById('prevBtnQuiz');
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            moveToPrevious();
        });
    }

    // Next button handler
    const nextBtn = document.getElementById('nextBtnQuiz');
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (userAnswers[currentIndex] !== null && userAnswers[currentIndex] !== -1) {
                moveToNext();
            } else {
                showToast("Please select an answer first!", "error");
            }
        });
    }

    // Reset button handler
    const resetBtn = document.getElementById('resetBtnQuiz');
    if (resetBtn) {
        resetBtn.addEventListener('click', (e) => {
            e.preventDefault();
            fullReset();
        });
    }

    attachKeys();
    if (!isAnswered && !quizCompleted) startTimer();
}

function renderResult() {
    if (keyHandler) document.removeEventListener('keydown', keyHandler);
    const score = calculateScore();
    const total = QUIZ_DATA.length;
    const accuracy = Math.round((score / total) * 100);
    let msg = "";
    if (accuracy === 100) msg = "Flawless Victory! You're a genius!";
    else if (accuracy >= 75) msg = "Outstanding! Keep up the great work!";
    else if (accuracy >= 50) msg = "Good effort! Practice makes perfect.";
    else msg = "Keep learning! Every expert was once a beginner.";

    const resultHtml = `
        <div class="quiz-header-premium text-center">
            <i class="fas fa-crown fa-2x mb-1" style="color:#FBBF24;"></i>
            <h2 class="fw-bold">Quiz Complete</h2>
            <p class="small">${msg}</p>
        </div>
        <div class="result-premium p-3 text-center">
            <div class="score-ring-premium" id="shareScoreRing">
                <div><span class="score-number-premium">${score}</span><span style="color:#cbd5e1; font-size:1.3rem;">/${total}</span></div>
            </div>
            <h4 class="mt-2 fw-bold" style="color:#E2E8F0;">${score} / ${total}</h4>
            <div class="progress-bar-track w-75 mx-auto my-2"><div class="progress-fill-glow" style="width: ${accuracy}%;"></div></div>
            <p class="mb-2"><i class="fas fa-percent me-1"></i> Accuracy: ${accuracy}%</p>
            <div class="d-flex flex-wrap justify-content-center gap-2 mt-3">
                <button class="btn-gradient" id="restartQuizBtn"><i class="fas fa-play me-1"></i> Play Again</button>
                <button class="btn-glass" id="shareResultBtn"><i class="fas fa-share-alt me-1"></i> Share Score</button>
                <button class="btn-glass" id="fullResetResultBtn"><i class="fas fa-sync me-1"></i> Full Reset</button>
            </div>
        </div>
        <footer>Click on the score ring to share your achievement</footer>
    `;
    root.innerHTML = resultHtml;
    
    document.getElementById('restartQuizBtn')?.addEventListener('click', () => fullReset());
    document.getElementById('shareResultBtn')?.addEventListener('click', () => shareResults());
    document.getElementById('fullResetResultBtn')?.addEventListener('click', () => fullReset());
    document.getElementById('shareScoreRing')?.addEventListener('click', () => shareResults());
}

// Generate floating particles
function generateParticles() {
    for (let i = 0; i < 40; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 5 + 2;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDelay = Math.random() * 15 + 's';
        p.style.animationDuration = 12 + Math.random() * 12 + 's';
        p.style.opacity = Math.random() * 0.4 + 0.2;
        document.body.appendChild(p);
    }
}

// Initialize the application
generateParticles();
render();