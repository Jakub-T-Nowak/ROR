const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require ('mongoose');

mongoose.connect('mongodb+srv://Jakub:HEfhF9fXHOUQnCSn@cluster0-poncq.gcp.mongodb.net/ROR', {useNewUrlParser: true})
const port = process.env.PORT || 3000;
app.use("/public", express.static(__dirname + "/public"));
app.use(bodyParser.json());


var playerSchema = new mongoose.Schema({
	name: String,
	score: Number,
	date: Date
});
var Player = mongoose.model("players", playerSchema);

// var p1 = new Player ({
// 	name: "HaHaHa",
// 	score: 3840,
// 	date: '2020-05-20'
// })

// p1.save(function(err, name){
// if(err){
// 	console.log("ERROR!")
// } else {
// 	console.log(name)
// }
// });


 

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html')
});

//--------------------------------------------------------------------
app.get('/api', function (req, res) {
	
	
	Player.find ({},  function (err, name) {
		if (err) return handleError(err);
		res.json(name);
	}).sort({score: -1}).limit(10);
});


// app.post('/api', function (req, res) {
// 	console.log(req.body);
// 	res.send(req.body);
// });
//--------------------------------------------------------------------

app.listen(port, () => console.log(`ROR listening on port ${port}.`));