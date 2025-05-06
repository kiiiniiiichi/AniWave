// Install uBlock Origin core via npm

const { StaticNetFilteringEngine } = require('@gorhill/ubo-core');

// Load some common public filter lists
const easyListURL = 'https://easylist.to/easylist/easylist.txt';
const uboAdsURL = 'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/filters.txt';

async function fetchList(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${url}`);
    return await response.text();
}

async function setupFilteringEngine() {
    const snfe = await StaticNetFilteringEngine.create();

    const [easyListText, uboAdsText] = await Promise.all([
        fetchList(easyListURL),
        fetchList(uboAdsURL)
    ]);

    await snfe.useLists([
        { raw: easyListText },
        { raw: uboAdsText }
    ]);

    return snfe;
}




// Apply the filter list as needed in your application

// ESC Key emualtion for back button
document.addEventListener('back', (event) => {
  if (event.key === 'Escape') {
    window.history.back();
  }
});




// ===== Remote Control Navigation Support =====

document.addEventListener('DOMContentLoaded', function () {
    const items = document.querySelectorAll('.item'); // Update selector as needed
    let focusedIndex = 0;

    function updateFocus() {
        items.forEach(item => item.classList.remove('focused'));
        if (items[focusedIndex]) {
            items[focusedIndex].classList.add('focused');
            items[focusedIndex].focus();
        }
    }

    function moveFocus(direction) {
        const columns = 3; // Adjust this number to match your grid layout
        switch (direction) {
            case 'left':
                if (focusedIndex % columns !== 0) focusedIndex--;
                break;
            case 'right':
                if ((focusedIndex + 1) % columns !== 0 && focusedIndex + 1 < items.length) focusedIndex++;
                break;
            case 'up':
                if (focusedIndex - columns >= 0) focusedIndex -= columns;
                break;
            case 'down':
                if (focusedIndex + columns < items.length) focusedIndex += columns;
                break;
        }
        updateFocus();
    }

    function activateFocusedItem() {
        if (items[focusedIndex]) {
            items[focusedIndex].click();
        }
    }

    document.addEventListener('keydown', function (e) {
        switch (e.keyCode) {
            case 37: moveFocus('left'); break;   // LEFT arrow
            case 38: moveFocus('up'); break;     // UP arrow
            case 39: moveFocus('right'); break;  // RIGHT arrow
            case 40: moveFocus('down'); break;   // DOWN arrow
            case 13: activateFocusedItem(); break; // ENTER
            case 10009: // BACK key on Tizen
                tizen.application.getCurrentApplication().exit();
                break;
        }
    });

    updateFocus(); // Set initial focus
});
