'use strict'
const gitV = getGitVersion()
const pkgV = getPkgVersion()
// const xyzReg = /^\d+\.\d+\.\d+$/
const dailyXyzReg = /^daily\/\d+\.\d+\.\d+$/

if (dailyXyzReg.test(gitV)) {
  if (gitV.split('/')[1] !== pkgV) {
    showError(new Error([
      `package.json 中版本号与 git 分支版本号不一致 \n`,
      `pkgVersion: ${pkgV}, gitVersion: ${gitV}`
    ].join('\n')))
    process.exit(100)
  }
}

function getPkgVersion() {
  return require('../package.json').version
}

function getGitVersion() {
  const spawnSync = require('child_process').spawnSync
  const gitReg = /\*\s*(.*)/
  let gitVersion = ''
  try {
    gitVersion = spawnSync('git', ['branch']).stdout.toString().match(gitReg)[1].trim()
  } catch (e) {
    console.log(e.stack)
  }
  return gitVersion
}

function showError(e) {
  const len = e.message.split('\n')[0].length * 1.6
  console.log('\x1b[31m', '='.repeat(len))
  console.log()
  console.log('\x1b[31m', '‼️ ', e.message, '\x1b[0m')
  console.log('\x1b[31m', '='.repeat(len))
}
