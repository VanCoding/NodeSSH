var spawn = require('child_process').spawn;

function SSHClient(script,address,username,password,ondata,onclose){
	var ssh = spawn('expect', [script, address,username,password]);
	var line = 0;
	ssh.stdout.on('data', function (data) {
		line++;
		data = data+"";
		if(line == 9){
			var str = data.substr(0,17);
			if(str == "Permission denied"){
				ondata("Permission denied!\n");
				ssh.kill();
				return;
			}
		}
		if(line >=9){
			if(line == 9){
				ondata("Connected to "+username+"@"+address+"\n");
			}
			ondata(data);
		}
	});
		
	ssh.on("exit",function(){
		if(line <= 7){
			ondata("Could not connect to "+username+"@"+address+"\n");
		}else{
			ondata("\nConnection to "+username+"@"+address+" closed!");
			onclose();
		}
	});
	
	function Write(data){
		ssh.stdin.write(data);
	}
	function Close(){
		ssh.kill();
	}
	
	this.Write = Write;
	this.Close = Close;
}

exports.SSHClient = SSHClient;