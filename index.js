const express = require('express');
const app = express();

const port = 3000;
app.use(express.static(__dirname + "/dist"));

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html')
});

app.listen(port, () => console.log(`ROR listening on port ${port}.`));