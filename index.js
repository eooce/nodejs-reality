const http = require('http');
const fs = require('fs');
const exec = require("child_process").exec;
const subtxt = './app/url.txt'
const HTTP_PORT = process.env.HTTP_PORT || 3000;

// Run start.sh
fs.chmod("start.sh", 0o777, (err) => {
  if (err) {
      console.error(`start.sh empowerment failed: ${err}`);
      return;
  }
  console.log(`start.sh empowerment successful`);
  const child = exec('bash start.sh');
  child.stdout.on('data', (data) => {
      console.log(data);
  });
  child.stderr.on('data', (data) => {
      console.error(data);
  });
  child.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      console.clear()
      console.log(`App is running`);
  });
});

// create HTTP server
const server = http.createServer((req, res) => {
    if (req.url === '/') {
      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Hello world!');
    }
    // get-sub
    if (req.url === '/sub') {
      fs.readFile(subtxt, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Error reading url.txt' }));
        } else {
          res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end(data);
        }
      });
    }
  });

server.listen(HTTP_PORT, () => {
  console.log(`Server is running on port ${HTTP_PORT}`);
});
