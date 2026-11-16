// Servidor local de dist/ que aplica os mesmos cabeçalhos de segurança do netlify.toml. Uso: node tools/serve.cjs [porta]
const http = require("http");
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..", process.argv[3] || "dist");
const port = Number(process.argv[2] || 8780);
const csp = "default-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'";
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".webp": "image/webp", ".png": "image/png", ".svg": "image/svg+xml", ".xml": "application/xml", ".txt": "text/plain", ".json": "application/json" };
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p.endsWith("/")) p += "index.html";
  let f = path.join(root, p);
  if (!f.startsWith(root)) { res.writeHead(403); return res.end(); }
  if (!fs.existsSync(f)) { f = path.join(root, "404.html"); res.statusCode = 404; }
  res.setHeader("Content-Type", types[path.extname(f)] || "application/octet-stream");
  res.setHeader("Content-Security-Policy", csp);
  res.setHeader("X-Content-Type-Options", "nosniff");
  fs.createReadStream(f).pipe(res);
}).listen(port, "127.0.0.1", () => console.log("http://127.0.0.1:" + port));
