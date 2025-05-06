// Install uBlock Origin core via npm

const { StaticNetFilteringEngine } = require('@gorhill/ubo-core');
const fetch = require('node-fetch'); // Make sure to install this if you're using Node.js <18

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

// Example usage
(async () => {
    const snfe = await setupFilteringEngine();

    const url = 'https://ads.example.com/banner.js';
    const type = 'script'; // can be 'image', 'media', 'xmlhttprequest', etc.
    const context = {
        url: 'https://www.example.com',
        type
    };

    const result = snfe.match(url, context);
    console.log(result.matched ? 'Blocked!' : 'Allowed');
})();


// Apply the filter list as needed in your application

// ESC Key emualtion for back button
document.addEventListener('back', (event) => {
  if (event.key === 'Escape') {
    window.history.back();
  }
});

//BetterTTV emotes
import BetterTTV from "betterttv";

BetterTTV.getGlobalEmotes()
    .then(console.log);
// Returns Emote[],
