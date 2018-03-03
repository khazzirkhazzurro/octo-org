const octokit = require('@octokit/rest')()
const login = require('./login')
const fs = require('fs')
const {join} = require('path')
const ora = require('ora')

let { AUTHENTICATION_TYPE, TOKEN, OGANIZATION, REPO_TYPE } = process.env
const spinner = ora(`Loading Github ${OGANIZATION} Oganization Data`).start()

if (!TOKEN) {
  TOKEN = login()
}

octokit.authenticate({
  type: AUTHENTICATION_TYPE,
  token: TOKEN
})

// FIXME: need to two-factor otp
const file = join(__dirname, 'repositories.json')

if (!fs.existsSync(file)) {
  Promise.all([
    octokit.repos.getForOrg({
      org: OGANIZATION,
      type: REPO_TYPE,
      page: 1,
      per_page: 100
    }),
    octokit.repos.getForOrg({
      org: OGANIZATION,
      type: REPO_TYPE,
      page: 2,
      per_page: 100
    })
  ]).then(res => {
    let data = []
    res.map(item => {
      // console.log(item.data.length)
      data.push(...item.data)
    })
    // console.log(data)
    fs.writeFileSync(file, JSON.stringify(data, null, 2))
    spinner.succeed('Completed')
  })
}

// fetch language details of one repo
// octokit.repos.getLanguages({ owner: OGANIZATION, repo: 'titicaca-android' }).then(({data}) => {
//   console.log(data)
// })
