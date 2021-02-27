const express = require('express');
const app = express();

const port = 3000;
app.use("/public", express.static(__dirname + "/public"));

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html')
});

app.listen(port, () => console.log(`ROR listening on port ${port}.`));