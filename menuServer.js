var fs = require("fs"); 
var nt = require("net");
var atm_id=Array(1500);
var atm_value=Array(1500);
var xxx=Array(1500);
var atm_id_count=1;
var srv=nt.createServer();
srv.on("connection",Connection);

srv.listen(8080,function(){
	console.log("menu simulates server")
});

function Connection(connection){
connection.on('data',onData);
connection.on('close',onClose);
connection.on('error',onError);
	function onData(data){
		var vv="";
		var n=0;
		var z=0;
		var t=0;
		var ref="";
		ref=connection.remoteAddress.toString();
		vv=data.toString();
		vv=vv.replace("\n","");
		vv=vv.replace("\r","");
		for (n=0;n<atm_id_count;n++){
			if(ref==atm_id[n]){
				z=1;
				t=atm_value[n];
				atm_value[n]=t;
				xxx[n]=0;
				if(t==0 && vv=="d"){
					atm_value[n]=0
					connection.end("exit connection...");
					xxx[n]=1;
				}else{
					if(xxx[n]==0 && t==0 && vv=="a"){
						atm_value[n]=1;
						connection.write("menu 1:\r\na)goto main menu\r\n");
						xxx[n]=1;
					}else{
						if(xxx[n]==0 && t==0 && vv=="b"){
							atm_value[n]=2;
							connection.write("menu 2:\r\na)goto main menu\r\n");
							xxx[n]=1;
						}else{
							if(xxx[n]==0 && t==0 && vv=="c"){
								atm_value[n]=3;
								connection.write("menu 3:\r\na)goto main menu\r\n");
								xxx[n]=1;
							}else{
								if((xxx[n]==0 && t==1 || t==2 || t==3) && vv=="a"){
									atm_value[n]=0;
									connection.write("main menu:\r\na)menu 1\r\nb)menu 2\r\nc)menu 3\r\nd)exit conection\r\n");
									xxx[n]=1;
								}
							}
						}
					}
				}
				
				console.log(ref+t.toString());
			}
		}
		if(z==0){
			atm_id[atm_id_count]=ref
			atm_value[atm_id_count]=0;
			atm_id_count++;
			connection.write("main menu:\r\na)menu 1\r\nb)menu 2\r\nc)menu 3\r\nd)exit conection\r\n");
			console.log(ref+t.toString());
		}
		
		
	}
	function onClose(){
		connection.destroy();
	}
	function onError(data){
		console.log(data);
		connection.destroy();
	}



}
