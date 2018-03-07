const { table } = require('table')
const chalk = require('chalk')
const bytes = require('pretty-bytes')

const precisionRound = (number, precision) => {
  const factor = Math.pow(10, precision)
  return Math.round(number * factor) / factor
}

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
const data2 = []
const config = {}
const langs = {}

raw.map(repo => {
  // langs.push(repo.language)
  const { name, language, languages, size } = repo
  if (langs.hasOwnProperty(language)) {
    langs[language] += 1
  } else {
    langs[language] = 1
  }

  const languageTypes = Object.keys(languages)
  let languageEntries = Object.entries(languages)
  languageEntries = languageEntries.map(item => {
    const rate = precisionRound(item[1] / size * 100, 2)
    return `${item[0]} ${rate}%`
  })
  data.push([
    name, language, bytes(size), languageTypes.length, languageTypes.join(',')
  ])

  const initCell = [name, languageTypes.length].concat(languageEntries)
  initCell.length = 12
  initCell[11] = bytes(size)
  data2.push(initCell)
})

data.sort((a, b) => {
  return b[3] - a[3]
})

data2.sort((a, b) => {
  return b[1] - a[1]
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
console.log(table(data2, config))
console.log(table(langTable, config))