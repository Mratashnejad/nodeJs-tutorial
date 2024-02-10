// const path = require('node:path')
// const data = path.parse(__filename)
// console.log(data)

// const os = require('node:os');
// const total = os.totalmem()
// const free = os.freemem();

// console.log(total , free)


// const fs = require('node:fs');
// const files = fs.readdirSync('./')
// console.log(files);

// fs.readdir('./' , (err , files)=>{

//     if(err) console.log(`error : ${err}`)
//     else console.log(files)
// })



// const EventEmitter = require('node:events');
// const emitter = new EventEmitter();

// emitter.on('messageLogged',(data)=>{
//     console.log('listner called' , data)
// });


// emitter.emit('messageLogged' , {id:1 , name:"alireza" , lastname:"atashnejad"});


const http= require('http');

const server = http.createServer((req , res)=>{
if (req.url === "/"){
    res.write("hello from home page");
    res.end()
}
if(req.url ==='/api/course'){
    res.write(JSON.stringify(['html' ,'css']))
    res.end();
}
});

// server.on("connection" , (socket)=>{
//     console.log('new connections is connected');
// })

server.listen(3000);
console.log("server is listinign on port 3000");