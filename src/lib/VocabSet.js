export default class VocabSet {
  constructor({name, words}) {
    if (typeof name !== 'string') {
      throw new Error('Name must be a string');
    }
    if (!words instanceof Array) {
      throw new Error('Words must be an array of 2-arrays');
    }

    this.name = name;
    this.words = words;
  }
}
