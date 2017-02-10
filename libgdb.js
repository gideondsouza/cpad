"use strict";

var child = require('child_process');


class Gdb 
{
        constructor(prg_name)
        {
                var me = this;
                this.gdbp = child.spawn("gdb", [prg_name, '-q', '--interpreter=mi2']);
                this.gdbp.stdin.write("start\n");
                /*
                this.gdbp.stdout.on('data', function(data) 
                {
                    //result += data.toString();
                    //console.log(`=${data.toString().substring(1,100)}`);
                    me._parse(data.toString());                
                });
                */
                
                // this.gdbp.stdout.on('readable', function()
                // {
                //         console.log("RDB");
                //         var ch;
                //         var str = "";
                //         var start = 0;
                //         while (null !== (ch = me.gdbp.stdout.read(1))) 
                //         {
                //                 if(ch == "{")
                //                 {
                //                         start = 1;
                //                 }
                //                 if (start == 1) 
                //                 {
                //                         str += ch;
                //                         str = str.replace("=", ":");
                //                 } 
                //                 if(ch == "}")
                //                 {       
                //                         start = 0;
                //                         
                //                         console.log(JSON.parse(str));      
                //                 }
                //                 //console.log(`Received ${chunk.length} bytes of data.`);
                //         }        
                // });
        }
        setBreakpoint(line)
        {
                this.gdbp.stdin.write("b " + line + "\n");
        }
        put(str)
        {
                this.gdbp.stdin.write(str);
        }
        getBreakpoints()
        {
                this.gdbp.stdin.write("i b\n");//$ info b
        }
        showStack()
        {

        }
        next()
        {

        }
        _parse(str)
        {       //console.log(`Parsing =__${str}__`);
                if(str.search(`breakpoint-created`) != -1)
                {
                        
                        var s = "{" + str.substring(str.search("bkpt")) + "}}";
                        
                        
                        console.log("== " + s.replace("=", ":"));
                        // var o = JSON.parse(s);
                        // console.log(o);
                        
                        /* Maybe hook this up into my-electron -> log IO
                                just a very basic shell with textbox to input to gdb
                                and soemthing to view output.
                        */
                        
                }
        }
        
}

module.exports = Gdb;
