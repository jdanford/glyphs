const gridElement = document.getElementById("grid");
const outputElement = document.getElementById("output");
const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const clearButton = document.getElementById("clear-button");

const grid = new GlyphGrid({gridElement, outputElement, dictionary: BASIC_DICTIONARY});

startButton.addEventListener("click", event => {
    grid.start();
});

stopButton.addEventListener("click", event => {
    grid.stop();
});

clearButton.addEventListener("click", event => {
    const message = "Clear grid?";
    if (confirm(message)) {
        grid.reset();
    }
});
