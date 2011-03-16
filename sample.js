var SSHClient = require("/var/nodeprojects/NodeSSH/SSHClient").SSHClient;

var c = new SSHClient(
	"/login.exp",
	"domain.com",
	"root",
	"1234",
	function(output){
		console.log(output);
	},
	function(){
		console.log("closed!");
	}
);

setTimeout(function(){
	c.Write("ls\n");	
},5000);

setTimeout(function(){
	c.Close();
},10000);



