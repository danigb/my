var Results = require('./results.js')

module.exports = Mus

function Mus (root, config, readline) {
  this.root = root
  this.config = config
  this.results = new Results()
  this.readline = readline
  console.log('MUS', this.config)
}

Mus.prototype.exit = function () {
  console.log('Bye!')
  this.readline.close()
}
Mus.prototype.exec = function (string) {
  var cmd
  var args = string ? string.split(/\s+/) : []
  if (args.length === 0) {
    cmd = this.prompt
  } else if (args[0] === 'exit' || args[0] === 'bye') {
    cmd = this.exit
  } else {
    var name = args.shift()
    cmd = Mus.cmd[name] || this.prompt
  }
  cmd.call(this, args, this, this.exec.bind(this))
}
Mus.prototype.prompt = function () {
  this.readline.question('So? ', this.exec.bind(this))
}

Mus.cmd = {}
Mus.cmd.info = Mus.cmd.i = require('./info.js')
Mus.cmd.list = Mus.cmd.l = require('./list.js')
Mus.cmd.open = Mus.cmd.o = require('./open.js')
Mus.cmd.search = Mus.cmd.s = require('./search.js')