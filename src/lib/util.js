export function shuffle(arr) {
  let i = arr.length;
  while (i > 0) {
    let j = Math.floor(Math.random() * i);
    i--;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

export function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
