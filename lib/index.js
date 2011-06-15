var spawn = require('child_process').spawn;

function sshClient(address,username,password){
    var self=this;
    this.address=address;
    this.user=username;
    this.line=0;
    this.buffer=null;
    this.exec=function(cmd) {
        if (this.connected) return;
        this.ssh = spawn('expect', [__dirname+'/login.exp',this.address,this.user,password,"-o ConnectTimeout=10",cmd]);
        setupEvents(this)
    }
    this.connect=function(connect) {
        //console.log('Connecting');
        if (this.connected) return;
        this.ssh = spawn('expect', [__dirname+'/login.exp',this.address,this.user,password,"-to ConnectTimeout=10"]);
        setupEvents(this)
        this.c=connect;
    }
    this.pipe=function(target) {
        this.ssh.stdout.pipe(target);
    }
    function setupEvents(self) {
        self.ssh.stdout.on('data', function (data) {
            //console.log(data);
            //console.log(data.toString());
            if (self.connected) return self.emit('data',data);
            if (data.toString().match(/^\x0d\x0d/)) { // this is the assumption of connected.
                self.connected=true;
                self.c(self.address);
                return self.emit('data',data);
            }
            var str = data.toString().substr(0,16);
            if(str == "Connection refuse"){
                self.emit('refused',self.address);
                self.ssh.kill();
                return;
            }
            if(str == "Permission denied"){
                self.emit('denied',self.address);
                self.ssh.kill();
                return;
            }
        });
            
        self.ssh.on("exit",function(){
            self.connected=false;
            self.removeAllListeners('data');
            self.ssh.stdout.removeAllListeners('data');
            self.ssh.removeAllListeners();
            self.emit('close',self.address);
        });
    }
    
    this.write=function(data){
        this.ssh.stdin.write(data);
    }
    this.close=function(){
        this.ssh.kill();
    }
}
require('util').inherits(sshClient,require('events').EventEmitter);
module.exports=sshClient;
