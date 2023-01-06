const http = require("http");

const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {
  if (req.url === "/api/webhook" && req.method === "POST") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify({ message: "Hello World" });
      res.end();
  } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});

