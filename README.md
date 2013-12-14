smb = Simple message block
===

A binary message format for communication, in binary little-endian format.    
Used for instance, as a job scheduling protocol for dpweb/swarm.    

Consists of two raw memory blocks, a *meta* block and a *data* block, and a header containing a command, and the lengths of 
the meta and data blocks.

####Spec
Little-endian binary message

Byte 1: Magic number = 0xCB    
  A single byte identifier for the smb type
Byte 2:  Command
  A command to be interpreted for the recipient
Bytes 3-6: Length of Meta block
  The length of the meta block
Bytes 7-10: Length of Meta block
  The length of the Data block
  
####Implementation (Node JS)
````
function message(cmd, meta, data){
	var b = new Buffer(2 + 4 + 4 + meta.length + data.length);

	b[0] = 0xCB, 
	b[1] = cmd, 
	b.writeUInt32LE(meta.length, 2),
	b.writeUInt32LE(data.length, 6);	

	new Buffer(meta).copy(b, 10, 0);
	new Buffer(data).copy(b, 10 + meta.length, 0);
	return b;
}

function parse(b){
	var o = {};
	o.magic = b[0],
	o.command = b[1],
	o.meta_length = b.readUInt32LE(2);
	o.data_length = b.readUInt32LE(6);
	o.meta = b.slice(10, 10 + o.meta_length).toString(),
	o.data = b.slice(10 + o.meta_length).toString();
	return o;
}

var buf = message(0x01, 'this meta', 'this data');
console.log(buf);
console.log(parse(buf));
````
