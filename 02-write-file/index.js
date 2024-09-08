const fs=require("fs");
const path=require("path")
const {stdin,stdout}=process;


const filePath=path.join(__dirname, "text.txt");
const writebleStream=fs.createWriteStream(filePath,"utf-8");

stdout.write("Write,please,text! \n");

const exit=()=>{
    fs.unlinkSync(filePath);
    process.exit()
  }

stdin.on("data", (data) => {
    if(data.toString().trim()==="exit"){
       exit()  
    }
  writebleStream.write(data.toString());
  });

process.on("exit", () => stdout.write("Goodbye!"));
process.on('SIGINT', () =>(
    exit()
   )
 );


 
