##smb = Simple message block

A binary message format for communication.    
Used for instance, as a job scheduling protocol for dpweb/swarm.    

Consists of two raw memory blocks, a *meta* block and a *data* block, and a header containing a command, and the lengths of the meta and data blocks.

###Spec
Little-endian binary message

#####Byte 1: Magic number = 0xCB  
  A single byte identifier for the smb type
#####Byte 2:  Command
  A command to be interpreted for the recipient
#####Bytes 3-6: Length of Meta block
  The length of the meta block
#####Bytes 7-10: Length of Meta block
  The length of the Data block
  
###Implementation (Node JS)
````
var smb = require('smb.js');
var buf = smb.message(0x01, 'this meta', 'this data');

console.log(buf, smb.parse(buf));

var base64message = smb.b64message(0x01, 'this meta', 'this data');
console.log(base64message, smb.parse(base64message));
````

###Shell
````
$ node smb 1 hi yo
$ node smb 1 hi yo > msg.bin && cat msg.bin
$ node test 1 hi "$(<test1.txt)"  # bring in file
````