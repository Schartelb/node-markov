/** Textual markov chain generator */


module.exports = class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    let markovchain = this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let wordlist = this.words.filter((w, index) => {
      return this.words.indexOf(w) == index
    })
    let markovchain = {}
    wordlist.forEach((w) => {
      markovchain[w] = []
      for (let i = 0; i < this.words.length; i++) {
        if (w == this.words[i] && !(markovchain[w].includes(this.words[i + 1]))) {
          markovchain[w].push(this.words[i + 1])
        }
      }
    })
    return markovchain
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    let output;
    let w = 0;
    output += markovchain[w]
    for (let i = 0; i < numWords; i++) {
      w = markovchain[w][(Math.ceil(Math.random() * markovchain[w].length))]
      output += ` ${w}`
    }
    console.log(output)
  }
}
