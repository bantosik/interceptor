var httpProxy = require('http-proxy'),
    http = require('http'),
    fs = require('fs');

var proxy = httpProxy.createProxyServer({});

var server = http.createServer(function(req, res) {
	if(req.url.includes('app/search/risk/mobile') && req.method === 'GET') {
		console.log('Intercepting ' + req.url + ' method: ' + req.method);
		fs.readFile('intercept.json', function(err, content) {		
			res.writeHead(200, {'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*', // Website you wish to allow to connect
				'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', // Request methods you wish to allow
                'Access-Control-Allow-Headers': 'X-Requested-With,content-type', // Request headers you wish to allow
                'Access-Control-Allow-Credentials': true // Set to true if you need the website to include cookies in the requests sen
			});
			res.end(content, 'utf-8');
		});
	} else {
		console.log('Proxying ' + req.url + ' method: ' + req.method);
		proxy.web(req, res, {target: 'http://localhost:8080'});
	}
});

console.log('listening on port 8085');
server.listen(8085);
