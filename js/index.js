const gridElement = document.getElementById("grid");
const outputElement = document.getElementById("output");
const startButton = document.getElementById("start-button");
const stepButton = document.getElementById("step-button");
const stopButton = document.getElementById("stop-button");
const clearButton = document.getElementById("clear-button");

const setButtonState = running => {
    const iconElement = startButton.getElementsByClassName(ICON_CLASS_BASE)[0];
    const iconClass = running ? ICON_CLASS_PAUSE : ICON_CLASS_PLAY;

    iconElement.className = ICON_CLASS_BASE;
    iconElement.classList.add(iconClass);
};

const grid = new GlyphGrid({gridElement, outputElement, dictionary: BASIC_DICTIONARY});

const updateButtonState = _ => setButtonState(grid.running);
grid.addListener("start", updateButtonState);
grid.addListener("pause", updateButtonState);
grid.addListener("reset", updateButtonState);

startButton.addEventListener("click", _ => {
    grid.toggle();
});

stepButton.addEventListener("click", _ => {
    grid.step();
});

stopButton.addEventListener("click", _ => {
    grid.reset();
});

clearButton.addEventListener("click", _ => {
    const message = "Clear grid?";
    if (confirm(message)) {
        grid.clear();
    }
});

setButtonState(false);
