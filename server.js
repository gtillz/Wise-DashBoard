"use strict";

let express = require('express')
let app = express();
let request = require('request')
let bodyParser = require('body-parser')
let moment = require('moment')
const PORT = process.env.PORT || 8080;

app.use(express.static("./client/build"))

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

let key = require('./key.js');
let YOUR_API_KEY = key.GOOGLE_KEY;

//initial API calls when alarm is set
app.post('/setAlarm', (req, res) => {
    const {currentLocation} = req.body;
    let callStr = req.body.currentLocation.lat + ',' + req.body.currentLocation.lng + '&destinations=' + req.body.destination.lat + ',' + req.body.destination.lng + '&key=';
    let arvTime = req.body.ETA;
    let url = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=' + callStr + YOUR_API_KEY;
    // //request to get BallPark duration time
    request(url, (err, resp, body) => {
        let durBP = (JSON.parse(body).rows[0].elements[0].duration.value);
        let DTc = (moment.unix((arvTime / 1000) - durBP).valueOf())+ (600000 * 6 * 4); //<--adds 4 hours(in milliseconds)to convert from EDT to UTC
    // //request for duration with traffic     
        if (!err) {
            function traffic() {
                let callStr = req.body.currentLocation.lat + ',' + req.body.currentLocation.lng + '&destinations=' + req.body.destination.lat + ',' + req.body.destination.lng + '&departure_time=' + DTc + '&key=';
                let url = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=' + callStr + YOUR_API_KEY;
                request(url, (error, response, body) => {
                    if (!error) {
                        let durNext = (JSON.parse(body).rows[0].elements[0].duration_in_traffic.value);
                        if (Math.abs(durBP - durNext) > 60) {
                            DTc = (moment.unix((arvTime / 1000) - durNext)).valueOf()+ (600000 * 6 * 4);
                            durBP = durNext;
                            traffic();
                        } else res.send(body);
                    } else res.status(500).json({error:'Please enter a valid address.'});
                });
                return;
            };
            traffic();
        } else res.status(500).json({err:'Please enter a valid address.'});
    })
});

//monitor traffic while alarm is set
app.post('/checktraffic', (req,res)=>{
    let callStr = req.body.currentLocation.lat + ',' + req.body.currentLocation.lng + '&destinations=' + req.body.destination.lat + ',' + req.body.destination.lng + '&departure_time=now&key=';
    let url = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=' + callStr + YOUR_API_KEY;
    console.log('checking traffic for now');
    request(url, (err, respon, body)=> {
        if(!err){
            res.send(body)
        } else {
            res.status(500).json({err:'Please enter a valid address.'});
        }
    })
});

app.listen(PORT, () => {
    console.log('Is there anybody out there?!')
    console.log('Cache Rules Everything Around Me!')
})