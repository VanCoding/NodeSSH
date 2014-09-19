NodeSSH
------------------------------------------------------------------------

NodeSSH is a SSH client for node.js. I would call it lightweight, but
since it spawns subprocesses, this makes it heavyweight to me.
It uses OpenSSH and expect. Make sure you have installed this software.

Use your system's built-in package manager (apt-get,yum,rpm,dselect,etc..)
to install expect on you machine. Most systems (OSX included) should already
have this installed. This will not work with windows machines.


How to use
------------------------------------------------------------------------

Here's an example usage.
A better version with node-expect is in betterSample.js

```javascript

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

```
