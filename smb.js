var smb = {
	message: function(cmd, meta, data){
		meta = meta || new Buffer(0);
		data = data || new Buffer(0);
		var b = new Buffer(2 + 4 + 4 + meta.length + data.length);
		b.fill(0);
		b[0] = 0xCB, 
		b[1] = cmd,
		b.writeUInt32LE(meta.length, 2),
		b.writeUInt32LE(data.length, 6);	
		new Buffer(meta).copy(b, 10, 0);
		new Buffer(data).copy(b, 10 + meta.length, 0);
		return b;
	},

	b64message: function(cmd, meta, data){
		return message(cmd, meta, data).toString('base64');
	},

	parse: function(b, cb){
		var o = {};
		o.magic = b[0].toString(16),
		o.command = b[1],
		o.meta_length = b.readUInt32LE(2);
		o.data_length = b.readUInt32LE(6);
		o.meta = b.slice(10, 10 + o.meta_length).toString(),
		o.data = b.slice(10 + o.meta_length).toString();
		return o;
	}
}
// $ node smb 1
var script = function(args){
	 process.stdout.write(smb.message(args[0], args[1], args[2]));
}

__filename !== require.main.filename ?
        module.exports = smb : script(process.argv.slice(2));
