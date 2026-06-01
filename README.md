# 🎯 QuizAura Pro

A modern and interactive quiz application built with **HTML5, CSS3, and JavaScript**. QuizAura Pro features a premium glassmorphism UI, animated backgrounds, timer-based questions, keyboard shortcuts, instant feedback, score tracking, and a fully responsive design.

---

## 📋 Overview

QuizAura Pro is designed to provide an engaging learning experience with a beautiful user interface and smooth interactions. Users can answer multiple-choice questions, track their progress, receive instant feedback, and view detailed results at the end of the quiz.

---

## ✨ Features

### 🎮 Interactive Quiz Experience

* Multiple-choice questions
* Instant answer validation
* Detailed explanations for each question
* Smooth transitions and animations

### ⏱️ Smart Timer System

* 22-second countdown for each question
* Visual warning at 10 seconds
* Critical warning at 5 seconds
* Automatic timeout handling

### 📊 Progress Tracking

* Live progress bar
* Question counter
* Completion percentage
* Answer status tracking

### 🔢 Question Navigation Palette

* Jump directly to any question
* Current question highlighting
* Answered question indicators

### ⌨️ Keyboard Shortcuts

| Key | Action            |
| --- | ----------------- |
| 1   | Select Option A   |
| 2   | Select Option B   |
| 3   | Select Option C   |
| 4   | Select Option D   |
| ←   | Previous Question |
| →   | Next Question     |

### 🎉 Premium Visual Effects

* Glassmorphism design
* Floating animated particles
* Confetti celebration effects
* Toast notifications
* Smooth hover animations
* Gradient UI elements

### 🏆 Results & Scoring

* Final score calculation
* Accuracy percentage
* Performance feedback message
* Share score functionality
* Restart and reset options

### 📱 Responsive Design

Optimized for:

* Desktop
* Tablet
* Mobile Devices

---

## 🛠️ Technologies Used

* HTML5
* CSS3
* JavaScript (ES6)
* Bootstrap 5
* Font Awesome 6
* Google Fonts (Poppins & Inter)
* Canvas Confetti

---

## 📂 Project Structure

```text
quizaura-pro/
│
├── index.html          # Main HTML file
├── style.css           # All styles (CSS)
├── script.js           # All JavaScript code
└── README.md           # Documentation file
```

### Project Files

* **index.html** → Application structure and layout
* **style.css** → Styling, animations, responsive design, and glassmorphism effects
* **script.js** → Quiz functionality, timer system, navigation, scoring, and interactions
* **README.md** → Project documentation

---

## 🚀 Installation

### Clone the Repository

```bash
git clone https://github.com/yourusername/quizaura-pro.git
cd quizaura-pro
```

### Run the Project

Simply open:

```text
index.html
```

in any modern web browser.

No additional installation or configuration is required.

---

## 🎮 How to Play

### 1. Start the Quiz

The quiz loads automatically when the page opens.

### 2. Answer Questions

Choose an answer by:

* Clicking an option
* Pressing keyboard keys 1–4

### 3. Navigate Questions

Use:

* Previous button
* Next button
* Question palette
* Arrow keys

### 4. Complete the Quiz

After answering all questions, view:

* Final score
* Accuracy percentage
* Performance summary

### 5. Share Your Results

Use the Share Score button or click the score ring to share your achievement.

---

## ⚙️ Customization

### Add More Questions

Edit the `QUIZ_DATA` array in `script.js`:

```javascript
{
    question: "Your Question Here?",
    options: [
        "Option A",
        "Option B",
        "Option C",
        "Option D"
    ],
    correct: 0,
    explanation: "Explanation goes here.",
    category: "Category Name"
}
```

### Change Timer Duration

Locate:

```javascript
let timeLeft = 22;
```

and update the value:

```javascript
let timeLeft = 30;
```

for a 30-second timer.

### Customize Theme Colors

Primary Colors:

```css
#8B5CF6
#06B6D4
```

Background Gradient:

```css
background: linear-gradient(
145deg,
#0f0c29,
#302b63,
#24243e
);
```

---

## 📊 Scoring System

| Action           | Score |
| ---------------- | ----- |
| Correct Answer   | +1    |
| Incorrect Answer | 0     |
| Timeout          | 0     |

### Accuracy Formula

```text
(Score ÷ Total Questions) × 100
```

---

## 📱 Responsive Breakpoints

| Device  | Screen Width  |
| ------- | ------------- |
| Desktop | > 620px       |
| Tablet  | 551px – 620px |
| Mobile  | ≤ 550px       |

---

## 🌐 Browser Compatibility

| Browser         | Support |
| --------------- | ------- |
| Google Chrome   | ✅       |
| Mozilla Firefox | ✅       |
| Microsoft Edge  | ✅       |
| Safari          | ✅       |
| Opera           | ✅       |
| Mobile Browsers | ✅       |

---

## 🔒 Privacy

QuizAura Pro:

* Does not collect personal data
* Does not use cookies
* Does not require login
* Does not send data to servers
* Stores all quiz activity locally in the browser

---

## 🎯 Included Categories

The default quiz includes questions related to:

* HTML
* CSS
* JavaScript
* Web Development
* General Programming Concepts

---

## 🚀 Future Enhancements

* Multiple quiz categories
* Difficulty levels
* Dark/Light theme switch
* Question randomization
* Local storage support
* Sound effects
* User profiles
* Leaderboard system
* Quiz history
* Custom quiz creation

---

## 🤝 Contributing

Contributions are welcome.

### Steps

```bash
# Fork the repository

git checkout -b feature/AmazingFeature

git commit -m "Add AmazingFeature"

git push origin feature/AmazingFeature
```

Then create a Pull Request.

---

## 🙏 Acknowledgments

* Bootstrap Team
* Font Awesome
* Google Fonts
* Canvas Confetti

---

## ⭐ Support

If you found this project helpful:

* ⭐ Star the repository
* 🍴 Fork the project
* 🚀 Share it with others

---



**Enjoy learning and testing your knowledge with QuizAura Pro!**
