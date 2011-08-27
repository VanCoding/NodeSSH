var SSHClient = require("NodeSSH");
var Expect = require('node-expect');

var ssh=new SSHClient("ipOrHostname","user", "password");
function close(addr) {
    console.log('Disconnected from '+addr);
}

function connect(addr) {
    console.log('Connected to '+addr);
}

function doUptime(match) {
    console.log('Got uptime line: '+match[0]);
}

parser = new Expect();
parser.conversation("logged")
        .sync() // synchronous conversation.
        .expect(null,true) // the conversation trigger starts the expect. no need to expect anything more.
            .send("uptime\n")
        .expect(/\n([^\r]+)/)
            .handler(doUptime) // call the doUptime function with the match results.
        .expect("# ")
            .send("exit\n")
            .emit("close")
            .end()
      .monitor(ssh)

ssh.on('close',close);

ssh.connect(connect);

