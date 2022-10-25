/** Command-line tool to generate Markov text. */

const fs = require('fs')
const axios = require('axios')
const { stringify } = require('querystring')
const MarkovMachine = require('./markov')



function makeMarkov() {
    let markov = input(process.argv)
}

function input(args) {
    if (args[2] == "file") {
        fs.readFile(args[3], 'utf8', (err, data) => {
            if (err) {
                console.log("Error: ", err)
                process.kill(1)
            }
            else
                markov = new MarkovMachine(data)
            populate()
        })
    }
    else {
        readURL(args[3])
            .then((resp) => {
                markov = new MarkovMachine(resp.data)
                console.log(markov)
            })
            .catch((err) => {
                console.log(err)
            }
            )
    }
}

async function readURL(url) {
    return await axios.get(url)
}

function populate() {
    markov.makeText()
}

makeMarkov()
