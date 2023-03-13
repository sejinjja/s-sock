const vm = require('vm')
const fs = require('fs')
const path = require('path')
const curPath = process.cwd()

module.exports = function (file, defaultFunction, paramKey) {
  let module
  const modulePath = path.join(curPath, file)
  try {
    module = paramKey ? getInterpreter(modulePath, paramKey) : getModule(modulePath)
  } catch (e) {
    module = defaultFunction
  }

  return module
}

function getModule (modulePath) {
  const module = require(modulePath)
  if (isEmpty(module)) {
    throw new Error('not undefined module')
  }
  return module
}

function getInterpreter (modulePath, paramKey) {
  const code = fs.readFileSync(modulePath, 'utf8')
  const script = new vm.Script(code)
  const module = (sandbox) => {
    // eslint-disable-next-line new-cap
    const context = new vm.createContext({ [paramKey]: sandbox, console: console })
    script.runInContext(context)
  }
  return module
}

function isEmpty (param) {
  return Object.keys(param).length === 0
}
