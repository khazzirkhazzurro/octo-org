const octokit = require('@octokit/rest')()
const ora = require('ora')
const login = require('./login')

let { AUTHENTICATION_TYPE, TOKEN, OGANIZATION, REPO_TYPE } = process.env
const spinner = ora(`Loading language details of each repository`).start()

if (!TOKEN) {
  TOKEN = login()
}

octokit.authenticate({
  type: AUTHENTICATION_TYPE,
  token: TOKEN
})

spinner.text = 'Login Completed'

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

_raw = raw.slice(0,3)

const fetch = (repo) => {
  spinner.text = `Fetching... ${repo.full_name}`

  octokit.repos.getLanguages({
    owner: OGANIZATION,
    repo: repo.name
  })
  .then(result => {
    const _repo = _raw.shift()
    repo.languages = result.data
    _repo && fetch(_repo)

    if (!_repo) {
      spinner.succeed(`Total ${raw.length} repositories fetched 🤗`)
    }
  })
}

if (_raw.length > 0) {
  fetch(_raw.shift())
} else {
  console.log('Nothing There 🤔')
}