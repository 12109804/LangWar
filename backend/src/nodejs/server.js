const http = require("http");
const PORT = 8000;
const html = require("fs").readFileSync()

// webサーバー
const server = http.createServer((req,res) => {
    res.writeHead(200, {"Content-type": "text/html"});
    res.write("<h1>Hello World</h1>");
    res.end();
});  

server.listen(PORT, () => {
    console.log("server running!"); 
});