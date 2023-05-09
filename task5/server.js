const http = require("http");

const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === "/") {
    res.writeHead(200, { "COntent-type": "text/html" });
    res.write("<h1>Home page</h1>");
  }
  else if (url === "/about") {
    res.writeHead(200, { "COntent-type": "text/html" });
    res.write("<h2>About page</h2>");
  }
  else if (url === "/contact") {
    res.writeHead(200, { "COntent-type": "text/html" });
    res.write("<h2>Contact page</h2>");
  }
  else{
    res.writeHead(404, { "COntent-type": "text/html" });
    res.write("<h1>page not found</h1></h1>");
  }
  res.end()
});
let port = 5000;

server.listen(port, () => {
    console.log(`nodejs isleyir by portda ${port}`)
})