var smb = require('./smb.js'),
	args = process.argv.slice(2);

if(!args.length){
	msg = smb.message(1, 'hi', 'yo');
	console.log(smb.parse(msg));
	console.log('From shell try: $ node test 1 hi yo');
	console.log('From shell try: $ node test 1 hi "$(<test1.txt)"');
} else {
	// shell
	console.log(smb.message(args[0], args[1], args[2]).toString())
}