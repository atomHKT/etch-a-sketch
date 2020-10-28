function hexToRGB(hex) {
    const r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    return [r, g, b];
}

function getRGBA(str) {
    var match = str.match(/rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/);
    arr = [match[1], match[2], match[3]];
    if (match[4]) { // ***
        arr.push(match[4]); // ***
    } // ***
    return arr;
}

function startDraw() {
    const rgba = getRGBA(this.style.backgroundColor);
    const rgbControl = hexToRGB(colorControl.value);
    if ((rgbControl[0] !== Number(rgba[0])) && (rgbControl[0] !== Number(rgba[0])) ||
        (rgbControl[0] !== Number(rgba[0]))) {
        this.style.backgroundColor = `rgba(${rgbControl[0]}, ${rgbControl[1]}, ${rgbControl[2]}, 0.1)`;
    } else if ((rgba.length === 4) && (rgba[3] < 1)) {
        let alpha = (Number(rgba[3]) + 0.1)
        this.style.backgroundColor = `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${alpha})`;
    }
}

function initGrid() {
    resetGrid();
    const size = sizeControl.value;
    gridContainer.querySelectorAll('*').forEach(n => n.remove());
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for (let i = 1; i <= size * size; i++) {
        let div = document.createElement('div');
        div.className = `grid-item grid-item${i}`;
        div.style.backgroundColor = `rgba(0, 0, 0, 0.1)`;
        gridContainer.appendChild(div);
        div.addEventListener('mouseover', startDraw);
    }
}

function resetGrid() {
    gridContainer.querySelectorAll('*')
        .forEach(n => n.style.background = `rgba(0, 0, 0, 0.1)`);
}

const gridContainer = document.querySelector(".grid-container");
const sizeControl = document.querySelector("input[name='size']");
const resetControl = document.querySelector("input[name='reset']");
const colorControl = document.querySelector("input[name='color']");


initGrid();
sizeControl.addEventListener('input', initGrid);
resetControl.addEventListener('click', resetGrid);