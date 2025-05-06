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


