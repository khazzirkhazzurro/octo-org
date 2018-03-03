const { table } = require('table')
const chalk = require('chalk')
const bytes = require('pretty-bytes')

let raw
try {
  raw = require('./repositories.json')
} catch (e) {
  throw new Error(chalk.yellow(`
    Octo Oganization Analysis\n

    Need to download your repositories of Oganization.
    Please follow step

      $ node .
  `))
}

const data = []
const config = {}
const langs = {}

raw.map(repo => {
  // langs.push(repo.language)
  const { name, language, size } = repo
  if (langs.hasOwnProperty(language)) {
    langs[language] += 1
  } else {
    langs[language] = 1
  }

  data.push([
    name, language, bytes(size)
  ])
})

delete langs.null

const langTable = Object.entries(langs)
langTable.sort((a, b) => {
  return b[1] - a[1]
})

langTable.map((lang, i) => {
  if (i < 5) {
    lang[1] = chalk.red(lang[1])
  } else if (i >= 5 && i < 10) {
    lang[1] = chalk.yellow(lang[1])
  }
})

// const uniqLangs = langs.reduce((a, b) => {
//   if (a.indexOf(b) < 0) {
//     a.push(b)
//   }
//   return a
// }, [])

// data.push(['', uniqLangs.length, ''])

console.log(table(data, config))
console.log(table(langTable, config))