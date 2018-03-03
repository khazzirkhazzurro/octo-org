const octokit = require('@octokit/rest')()
const prompts = require('prompts')

module.exports = async () => {
  const input = await prompts([
    {
      type: 'select',
      name: 'value',
      message: 'Authentication',
      choices: [
          { title: 'Basic', value: 'basic' },
          { title: 'OAuth', value: 'oauth' },
          { title: 'Token', value: 'token' }
      ],
      initial: 1
    },
    {
      type: 'text',
      name: 'username',
      message: 'Github Account?'
    },
    {
      type: 'password',
      name: 'password',
      message: 'Password'
    },
    {
      type: 'text',
      name: 'twofc',
      message: 'Two Factor Authentication Code'
    }
  ])

  octokit.authenticate({
    type: 'basic',
    username: input.username,
    password: input.password,

  })

  return await octokit.authorization.create({
    note: 'octo-org',
    scope: ['admin:org', 'repo'],
    headers: {
      'x-github-otp': input.twofc
    }
  })
}