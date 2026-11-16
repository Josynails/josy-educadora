// Servidor estático local para pré-visualização (node server.js)
const http = require('http'), fs = require('fs'), path = require('path');
const types = {'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.mp4':'video/mp4','.svg':'image/svg+xml','.json':'application/json','.txt':'text/plain'};
http.createServer((req,res)=>{
  let p = decodeURIComponent(req.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html';
  const f = path.join(__dirname, p);
  if (!f.startsWith(__dirname) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end('404'); }
  const ext = path.extname(f), size = fs.statSync(f).size, range = req.headers.range;
  const headers = {'Content-Type': types[ext]||'application/octet-stream','Accept-Ranges':'bytes'};
  if (range) { const [s,e] = range.replace('bytes=','').split('-'); const start=+s, end=e?+e:size-1;
    res.writeHead(206,{...headers,'Content-Range':`bytes ${start}-${end}/${size}`,'Content-Length':end-start+1}); fs.createReadStream(f,{start,end}).pipe(res);
  } else { res.writeHead(200,{...headers,'Content-Length':size}); fs.createReadStream(f).pipe(res); }
}).listen(process.env.PORT||5194, ()=>console.log('http://localhost:'+(process.env.PORT||5194)));
