"use strict";

const riddims = [
  { id: "answer", name: "Answer (Never Let Go)" },
  { id: "cuss-cuss", name: "Cuss Cuss" },
  { id: "full-up", name: "Full Up (Pass The Kouchie)" },
  { id: "hi-fashion", name: "Hi Fashion" },
  { id: "hot-milk", name: "Hot Milk" },
  { id: "love-bump", name: "Love Bump" },
  { id: "real-rock", name: "Real Rock" },
  { id: "shank-i-sheck", name: "Shank I Sheck" },
  { id: "stalag", name: "Stalag (Stalag 17)" },
  { id: "undying-love", name: "Undying Love" },
];

const STORAGE_KEY = "riddim-school-progress-v1";
const choiceList = document.querySelector("#choice-list");
const remainingCount = document.querySelector("#remaining-count");
const listenTitle = document.querySelector("#listen-title");
const listenStatus = document.querySelector("#listen-status");
const playButton = document.querySelector("#play-button");
const knownButton = document.querySelector("#known-button");
const feedback = document.querySelector("#feedback");
const nextButton = document.querySelector("#next-button");
const resetButton = document.querySelector("#reset-button");
const audio = new Audio();
audio.preload = "none";
audio.loop = true;

let progress = readProgress();
let currentRiddim = null;
let answered = false;

function emptyProgress() {
  return Object.fromEntries(
    riddims.map(({ id }) => [id, { streak: 0, mastered: false }]),
  );
}

function readProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return Object.fromEntries(
      riddims.map(({ id }) => [
        id,
        {
          streak: Number.isInteger(saved[id]?.streak)
            ? Math.min(saved[id].streak, 2)
            : 0,
          mastered: saved[id]?.mastered === true,
        },
      ]),
    );
  } catch {
    return emptyProgress();
  }
}

function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // The quiz remains playable when storage is unavailable.
  }
}

function availableRiddims() {
  return riddims.filter(({ id }) => !progress[id].mastered);
}

function renderChoices() {
  choiceList.replaceChildren();
  const available = availableRiddims();
  remainingCount.textContent = `${available.length} left`;
  resetButton.hidden = available.length === riddims.length;

  for (const riddim of riddims) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-button";
    button.textContent = riddim.name;
    button.dataset.id = riddim.id;
    button.disabled = answered || progress[riddim.id].mastered;
    if (progress[riddim.id].mastered) {
      button.classList.add("retired");
      button.textContent = `${riddim.name}  ✓`;
      button.setAttribute("aria-label", `${riddim.name}, mastered`);
    }
    button.addEventListener("click", () => submitGuess(riddim));
    choiceList.append(button);
  }
}

function chooseRiddim() {
  const available = availableRiddims();
  if (!available.length) {
    currentRiddim = null;
    listenTitle.textContent = "Beautifully done.";
    listenStatus.textContent = "You’ve mastered every riddim in the selection.";
    playButton.hidden = true;
    knownButton.hidden = true;
    nextButton.hidden = true;
    renderChoices();
    return;
  }

  currentRiddim = available[Math.floor(Math.random() * available.length)];
  answered = false;
  listenTitle.textContent = "A new loop awaits.";
  listenStatus.textContent = "A random loop is waiting. Press play to listen.";
  feedback.hidden = true;
  nextButton.hidden = true;
  playButton.hidden = false;
  knownButton.hidden = false;
  playButton.disabled = false;
  playButton.querySelector("span:last-child").textContent = "Play loop";
  audio.src = `mp3/${currentRiddim.id}.mp3`;
  renderChoices();
}

function stopPlayback() {
  audio.pause();
  audio.currentTime = 0;
}

function submitGuess(riddim) {
  if (!currentRiddim || answered || progress[riddim.id].mastered) return;
  stopPlayback();
  answered = true;
  const isCorrect = riddim.id === currentRiddim.id;
  const currentProgress = progress[currentRiddim.id];

  feedback.hidden = false;
  if (isCorrect) {
    currentProgress.streak += 1;
    if (currentProgress.streak >= 3) {
      currentProgress.mastered = true;
      feedback.dataset.kind = "retired";
      feedback.textContent = `Correct. ${currentRiddim.name} is mastered and leaves the selection.`;
    } else {
      feedback.dataset.kind = "correct";
      feedback.textContent = "Correct. Nicely recognized.";
    }
  } else {
    currentProgress.streak = 0;
    feedback.dataset.kind = "incorrect";
    feedback.textContent = `Not this time. The riddim was ${currentRiddim.name}.`;
  }

  saveProgress();
  renderChoices();
  choiceList
    .querySelector(`[data-id="${currentRiddim.id}"]`)
    ?.classList.add("correct");
  if (!isCorrect) {
    choiceList
      .querySelector(`[data-id="${riddim.id}"]`)
      ?.classList.add("incorrect");
  }
  playButton.hidden = true;
  knownButton.hidden = true;
  nextButton.hidden = false;
  listenStatus.textContent = "Answer revealed. Move on whenever you’re ready.";
}

async function playCurrentLoop() {
  if (!currentRiddim || answered) return;
  playButton.disabled = true;
  listenStatus.textContent = "Loading loop…";

  try {
    audio.currentTime = 0;
    await audio.play();
    listenStatus.textContent =
      "Playing. Listen for the pattern, then choose below.";
    playButton.querySelector("span:last-child").textContent = "Replay loop";
  } catch (error) {
    if (error.name === "NotAllowedError") {
      listenStatus.textContent =
        "Press play to listen. Your browser requires a tap before audio can start.";
    } else {
      listenStatus.textContent = `Add mp3/${currentRiddim.id}.mp3 to the mp3 folder to play this riddim.`;
    }
  } finally {
    playButton.disabled = false;
  }
}

playButton.addEventListener("click", playCurrentLoop);
knownButton.addEventListener("click", () => {
  if (!currentRiddim || answered) return;
  stopPlayback();
  answered = true;
  progress[currentRiddim.id].mastered = true;
  saveProgress();
  renderChoices();
  feedback.hidden = false;
  feedback.dataset.kind = "retired";
  feedback.textContent = `${currentRiddim.name} excluded from future questions.`;
  listenStatus.textContent = "This riddim has been removed from the selection.";
  playButton.hidden = true;
  knownButton.hidden = true;
  nextButton.hidden = false;
});
nextButton.addEventListener("click", () => {
  stopPlayback();
  chooseRiddim();
  playCurrentLoop();
});
resetButton.addEventListener("click", () => {
  stopPlayback();
  progress = emptyProgress();
  saveProgress();
  chooseRiddim();
});

audio.addEventListener("error", () => {
  if (currentRiddim && !answered) {
    listenStatus.textContent = `Add mp3/${currentRiddim.id}.mp3 to the mp3 folder to play this riddim.`;
  }
});

renderChoices();
chooseRiddim();
playCurrentLoop();
