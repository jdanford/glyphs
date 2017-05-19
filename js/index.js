const gridElement = document.getElementById("grid");
const outputElement = document.getElementById("output");
const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const saveButton = document.getElementById("save-button");
const loadButton = document.getElementById("load-button");
const clearButton = document.getElementById("clear-button");

const grid = new GlyphGrid({gridElement, outputElement, dictionary: BASIC_DICTIONARY});

startButton.addEventListener("click", event => {
    grid.start();
});

stopButton.addEventListener("click", event => {
    grid.stop();
});

saveButton.addEventListener("click", event => {
    alert(grid.dataAsString());
});

loadButton.addEventListener("click", event => {
    const textData = prompt("Data:", "");
    grid.load(textData);
});

clearButton.addEventListener("click", event => {
    const message = "Clear grid?";
    if (confirm(message)) {
        grid.reset();
    }
});
