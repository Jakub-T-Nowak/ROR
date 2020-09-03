const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.use("/public", express.static(__dirname + "/public"));

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/HTML/Start.html')
})


app.listen(port, () => console.log(`ROR listening on port ${port}.`))