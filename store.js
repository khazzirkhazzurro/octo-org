const fs = require('fs')
const { join } = require('path')

const file = join(__dirname, 'repositories.json')

const save = (data) => {
  fs.writeFileSync(file, data)
}

const hasFile = () => fs.existsSync(file)

module.exports = {
  save, hasFile
}