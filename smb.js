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

function parse(b, cb){
	var o = {};
	o.magic = b[0],
	o.command = b[1],
	o.meta_length = b.readUInt32LE(2);
	o.data_length = b.readUInt32LE(6);
	o.meta = b.slice(10, 10 + o.meta_length).toString(),
	o.data = b.slice(10 + o.meta_length).toString();
	return o;
}

module.exports = {
	message: message,
	parse: parse
}

/*
var smb = require('smb'),
	msg = smb.message(1, 'this meta', 'this data');

smb.parse(msg);
*/
