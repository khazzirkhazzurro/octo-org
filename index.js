const octokit = require('@octokit/rest')()
const ora = require('ora')
const login = require('./login')
const { save, hasFile } = require('./store')

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
// const file = join(__dirname, 'repositories.json')

if (!hasFile()) {

  const getForOrg = async (page) => {
    return octokit.repos.getForOrg({
      org: OGANIZATION,
      type: REPO_TYPE,
      page: page,
      per_page: 100
    })
  }

  (async () => {
    let page = 1
    const data = []

    const page1 = await getForOrg(page)
    const page2 = await getForOrg(++page)
    data.push(...page1.data)
    data.push(...page2.data)

    // fs.writeFileSync(file, JSON.stringify(data, null, 2))
    save(JSON.stringify(data, null, 2))
    spinner.succeed('Completed')
  })()
} else {
  console.log('You have a repositories.json file')
  spinner.stop()
}

// fetch language details of one repo
// octokit.repos.getLanguages({ owner: OGANIZATION, repo: 'titicaca-android' }).then(({data}) => {
//   console.log(data)
// })
