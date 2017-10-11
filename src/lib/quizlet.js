import VocabSet from './VocabSet.js';

const CLIENT_ID = process.env.REACT_APP_QUIZLET_CLIENT_ID;

function getSetIdFromURL(setUrl) {
  const setIdRegex = /^https?:\/\/quizlet.com\/([0-9]+)\/?/i;
  const matches = setUrl.match(setIdRegex);
  const setId = matches[1];
  if (setId.length < 3) {
    throw new Error('Set ID too short');
  }
  return setId;
}

export async function getSetFromUrl(setUrl) {
  const setId = getSetIdFromURL(setUrl);

  const apiUrl = `https://api.quizlet.com/2.0/sets/${encodeURIComponent(
    setId
  )}?client_id=${CLIENT_ID}`;

  // Don't want to stand up servers for this, so I'm using some random
  // sketchy CORS proxy instead. Everything's public anyhow so there's no
  // real security risk.
  const corsUrl = `https://jsonp.herokuapp.com/?url=${encodeURIComponent(apiUrl)}`;

  try {
    const response = await fetch(corsUrl, {mode: 'cors'});
    const json = await response.json();

    // Make the JSON into a VocabSet
    const words = json.terms.map(e => [e.term, e.definition]);
    const set = new VocabSet({name: json.title, words});
    return set;
  } catch (e) {
    console.error(e);
    throw new Error('Error fetching set from Quizlet');
  }
}
