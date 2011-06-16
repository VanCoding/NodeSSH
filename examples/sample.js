
var SSHClient = require("NodeSSH");

var ssh=new SSHClient(addresses,user,password);
var cmds=["uptime","logout"];
function close(addr) {
    console.log('('+addresses.length+') Disconnected from '+addr);
}

function data(buffer) {
    s=buffer.toString();
    if (/\$ /.test(s)) {
       if (cmd=cmds.shift())
          ssh.write(cmd+"\r\n");
       else ssh.close();
    }
}

function connect() {
    console.log('Connected to '+this.address);
    this.on('data',data);
}

ssh.on('close',close);


ssh.connect(connect);

