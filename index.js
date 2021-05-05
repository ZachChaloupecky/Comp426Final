var request = require('request');
const express = require("express")
const app = express();
var cors = require('cors')
let port = process.env.PORT || 3000;
require('dotenv').config();


function ignoreFavicon(req, res, next) {
  if (req.originalUrl.includes('favicon.ico')) {
    res.status(204).end()
  }
  next();
}
app.use(cors())
app.use(ignoreFavicon)
const musicList = ['y0Fg9xtjFxk', 'OOmznKTv74M', 'krGXMh6qaxA',
    'Q0AwE8EjpDs', 'ENoJKeEsn2c', 'GHk6bNwL6Iw', 'YIAlVDLZJ_k', 
    'lAKZZYNb8YI', 'bkQiFPJUYTQ', 'AW2Dcg_DY-c', 'q1El90M5ucA',
    '3A8R-73f35s']
const musicList1 = 'y0Fg9xtjFxk,OOmznKTv74M,krGXMh6qaxA,Q0AwE8EjpDs,ENoJKeEsn2c,GHk6bNwL6Iw,YIAlVDLZJ_k,lAKZZYNb8YI,bkQiFPJUYTQ,-c,q1El90M5ucA,3A8R-73f35s'


app.get("/", (req, res) => {
  res.send(Math.random()*11)
})

app.get("/music", (req, res) => {
  random = musicList[Math.round(Math.random()*11)]
  const options = {
    method: 'GET',
    url: 'https://download-video-youtube1.p.rapidapi.com/mp3/'+random,
    headers: {
      'x-rapidapi-key': process.env.API_KEY,
      'x-rapidapi-host': 'download-video-youtube1.p.rapidapi.com'
    }
  };
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    res.send(body)
  });
})

app.listen(port, () => console.log('Listening'))
