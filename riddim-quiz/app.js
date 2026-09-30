"use strict";

const riddims = [
  { id: "answer", name: "Answer (Never Let Go)" },
  { id: "cuss-cuss", name: "Cuss Cuss" },
  { id: "full-up", name: "Full Up (Pass The Kouchie)" },
  { id: "hi-fashion", name: "Hi Fashion (Bobby Babylon)" },
  { id: "hot-milk", name: "Hot Milk" },
  { id: "love-bump", name: "Love Bump (Rougher Yet)" },
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
const hardQuiz = document.querySelector("#mode-2-quiz");
const easyQuiz = document.querySelector("#mode-3-quiz");
const easyChoiceList = document.querySelector("#easy-choice-list");
const easySongTitle = document.querySelector("#easy-song-title");
const easyListenStatus = document.querySelector("#easy-listen-status");
const easyFeedback = document.querySelector("#easy-feedback");
const modeOneQuiz = document.querySelector("#mode-1-quiz");
const modeOneTitle = document.querySelector("#mode-1-title");
const modeOneStatus = document.querySelector("#mode-1-status");
const modeOnePlayButton = document.querySelector("#mode-1-play-button");
const modeOneRevealButton = document.querySelector("#mode-1-reveal-button");
const modeTwoButton = document.querySelector("#mode-2-button");
const modeThreeButton = document.querySelector("#mode-3-button");
const modeOneButton = document.querySelector("#mode-1-button");
const audio = new Audio();
audio.preload = "none";
audio.loop = true;

let progress = readProgress();
let currentRiddim = null;
let answered = false;
let activeMode = "mode1";
let easyTarget = null;
let previousEasyTargetId = null;
let activeEasyChoice = null;
let modeOneRiddim = null;
let previousModeOneRiddimId = null;
let playbackGeneration = 0;

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
  renderChoices();
}

function stopPlayback() {
  playbackGeneration += 1;
  if (activeEasyChoice) {
    activeEasyChoice.querySelector("span:last-child").textContent = "Preview";
  }
  audio.pause();
  audio.currentTime = 0;
  activeEasyChoice = null;
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
  audio.loop = true;
  audio.src = `mp3/${currentRiddim.id}.mp3`;
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

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function loadModeOneTrack() {
  const possibleTracks = riddims.filter(
    ({ id }) => id !== previousModeOneRiddimId,
  );
  modeOneRiddim = randomItem(possibleTracks.length ? possibleTracks : riddims);
  previousModeOneRiddimId = modeOneRiddim.id;
  audio.src = `mp3/${modeOneRiddim.id}.mp3`;
  modeOnePlayButton.disabled = false;
  modeOnePlayButton.querySelector("span:last-child").textContent =
    "Play random bassline";
}

async function playModeOneTrack() {
  if (!modeOneRiddim) return;
  stopPlayback();
  audio.loop = false;
  audio.src = `mp3/${modeOneRiddim.id}.mp3`;
  modeOneTitle.textContent = "A new loop awaits.";
  modeOnePlayButton.disabled = true;
  modeOneStatus.textContent = "Loading track…";

  try {
    audio.currentTime = 0;
    await audio.play();
    modeOneStatus.textContent = "Playing. Reveal the riddim name when ready.";
    modeOnePlayButton.querySelector("span:last-child").textContent =
      "Replay track";
  } catch (error) {
    modeOneStatus.textContent =
      error.name === "NotAllowedError"
        ? "Press play to listen. Your browser requires a tap before audio can start."
        : `Could not play mp3/${modeOneRiddim.id}.mp3.`;
    modeOnePlayButton.querySelector("span:last-child").textContent =
      "Play random bassline";
  } finally {
    modeOnePlayButton.disabled = false;
  }
}

function revealModeOneRiddim() {
  if (!modeOneRiddim) return;
  const revealedRiddim = modeOneRiddim;
  stopPlayback();
  modeOneTitle.textContent = revealedRiddim.name;
  loadModeOneTrack();
  modeOneStatus.textContent =
    "Next track loaded. Press play when you’re ready.";
}

function shuffled(items) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

function renderEasyChoices(choices) {
  easyChoiceList.replaceChildren();

  choices.forEach((riddim, index) => {
    const number = String(index + 1).padStart(2, "0");
    const row = document.createElement("div");
    row.className = "easy-choice";

    const previewButton = document.createElement("button");
    previewButton.type = "button";
    previewButton.className = "easy-preview-button";
    previewButton.setAttribute("aria-label", `Preview sound ${index + 1}`);
    previewButton.innerHTML = `<span class="choice-number">${number}</span><span class="play-icon" aria-hidden="true">&#9654;</span><span>Preview</span>`;
    previewButton.addEventListener("click", () =>
      playEasyChoice(riddim, previewButton),
    );

    const selectButton = document.createElement("button");
    selectButton.type = "button";
    selectButton.className = "easy-select-button";
    selectButton.textContent = "Choose";
    selectButton.setAttribute("aria-label", `Choose sound ${index + 1}`);
    selectButton.addEventListener("click", () => selectEasyChoice(riddim, row));

    row.append(previewButton, selectButton);
    easyChoiceList.append(row);
  });
}

function startEasyRound(announceCorrect = false) {
  const possibleTargets = riddims.filter(
    ({ id }) => id !== previousEasyTargetId,
  );
  easyTarget = randomItem(possibleTargets.length ? possibleTargets : riddims);
  previousEasyTargetId = easyTarget.id;
  const distractors = shuffled(
    riddims.filter(({ id }) => id !== easyTarget.id),
  ).slice(0, 3);
  renderEasyChoices(shuffled([easyTarget, ...distractors]));
  easySongTitle.textContent = easyTarget.name;
  easyListenStatus.textContent = "Choose a sound to preview it.";
  easyFeedback.hidden = !announceCorrect;
  if (announceCorrect) {
    easyFeedback.dataset.kind = "correct";
    easyFeedback.textContent = "Correct. A new song is ready.";
  }
}

async function playEasyChoice(riddim, button) {
  stopPlayback();
  const playGeneration = playbackGeneration;
  activeEasyChoice = button;
  audio.loop = false;
  audio.src = `mp3/${riddim.id}.mp3`;
  button.disabled = true;
  button.querySelector("span:last-child").textContent = "Playing";
  easyListenStatus.textContent = `Previewing sound ${[...easyChoiceList.children].indexOf(button.parentElement) + 1}.`;

  try {
    audio.currentTime = 0;
    await audio.play();
  } catch {
    if (playGeneration === playbackGeneration) {
      button.querySelector("span:last-child").textContent = "Preview";
      easyListenStatus.textContent = `Could not play mp3/${riddim.id}.mp3.`;
      activeEasyChoice = null;
    }
  } finally {
    button.disabled = false;
  }
}

function selectEasyChoice(riddim, row) {
  stopPlayback();
  easyFeedback.hidden = false;
  if (riddim.id === easyTarget.id) {
    row.classList.add("correct");
    startEasyRound(true);
    return;
  }

  row.classList.add("incorrect");
  easyFeedback.dataset.kind = "incorrect";
  easyFeedback.textContent =
    "Not that one. Listen again and try another sound.";
}

function setMode(mode) {
  if (mode === activeMode) return;
  stopPlayback();
  activeMode = mode;
  const isModeOne = mode === "mode1";
  const isModeTwo = mode === "mode2";
  const isModeThree = mode === "mode3";
  modeOneQuiz.hidden = !isModeOne;
  hardQuiz.hidden = !isModeTwo;
  easyQuiz.hidden = !isModeThree;
  for (const [button, isActive] of [
    [modeOneButton, isModeOne],
    [modeTwoButton, isModeTwo],
    [modeThreeButton, isModeThree],
  ]) {
    button.setAttribute("aria-pressed", String(isActive));
    button.classList.toggle("is-active", isActive);
  }
  audio.loop = isModeTwo;

  if (isModeTwo) {
    if (currentRiddim && !answered) {
      listenStatus.textContent = "Playback paused. Press play to continue.";
    }
  } else if (isModeThree && !easyTarget) {
    startEasyRound();
  }
}

modeOneButton.addEventListener("click", () => setMode("mode1"));
modeTwoButton.addEventListener("click", () => setMode("mode2"));
modeThreeButton.addEventListener("click", () => setMode("mode3"));
modeOnePlayButton.addEventListener("click", playModeOneTrack);
modeOneRevealButton.addEventListener("click", revealModeOneRiddim);

audio.addEventListener("ended", () => {
  if (activeMode === "mode3" && activeEasyChoice) {
    activeEasyChoice.querySelector("span:last-child").textContent = "Preview";
    activeEasyChoice = null;
    easyListenStatus.textContent =
      "Preview finished. Choose an answer or listen again.";
  }
});

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
  if (activeMode === "mode1" && modeOneRiddim) {
    modeOneStatus.textContent = `Could not play mp3/${modeOneRiddim.id}.mp3.`;
  } else if (activeMode === "mode2" && currentRiddim && !answered) {
    listenStatus.textContent = `Add mp3/${currentRiddim.id}.mp3 to the mp3 folder to play this riddim.`;
  } else if (activeMode === "mode3" && easyTarget) {
    easyListenStatus.textContent = "This sound file could not be played.";
  }
});

chooseRiddim();
loadModeOneTrack();
