var SSHClient = require("NodeSSH");
var Expect = require('node-expect');

var ssh=new SSHClient(addresses,user,password);
function close(addr) {
    console.log('('+addresses.length+') Disconnected from '+addr);
}

function connect() {
    console.log('Connected to '+this.address);
}

function doUptime(match) {
    console.log('Got uptime line: '+match[0]);
}

parser = new Expect();
prompt=/\$ /;
parser.conversation(prompt)
        .sync() // synchronous conversation.
        .expect() // the conversation trigger starts the expect. no need to expect anything more.
            .send("uptime")
        .expect(/uptime/) // expect the command to be echo'd back to us.
        .expect(/\n([^\r]+)/)
            .handler(doUptime) // call the doUptime function with the match results.
        .expect(prompt)
            .send("exit")
            .emit("close")
            .end()
      .monitor(ssh)

ssh.on('close',close);

ssh.connect(connect);
