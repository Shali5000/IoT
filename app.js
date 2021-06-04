var express = require("express");
var app = express();
const mqtt = require("mqtt");
const mqttclient = mqtt.connect('mqtt://192.168.8.110:1883/', {username: "", password: ""});

const proTopic = '+/pa08/pa08production/0808';
const rejTopic = '+/pa08/pa08rejections/0808';
const stopTopic = '+/pa08/pa08stoppages/0808';
const oeeTopic = '+/pa08/pa08oee/0808';

var production;
var rejection;
var stoppages;
var oee;

var server = require('http').Server(app);
var io = require('socket.io')(server);
var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));

try {
  mqttclient.on('connect', function () { // When connected
    console.log('Client connected');
    //subscribe to a topic
    mqttclient.subscribe([proTopic, rejTopic, stopTopic, oeeTopic], function () {
      mqttclient.on('message', function (topic, message, packet) {
        // console.log(message.toString());
        // console.log(topic.toString());

        if (topic == 'data/pa08/pa08production/0808'){
            production = message;
        }
        if (topic == 'data/pa08/pa08rejections/0808'){
            rejection = message;
        }
        if (topic == 'data/pa08/pa08stoppages/0808'){
            stoppages = message;
        }
        if (topic == 'data/pa08/pa08oee/0808'){
            oee = message;
        }


        if (production && rejection && stoppages && oee){
          // console.log(production.toString());
          var jsonPro = JSON.parse(production.toString());
          // console.log(jsonPro);

          // console.log(rejection.toString());
          var jsonRej = JSON.parse(rejection.toString());
          // console.log(jsonRej);

          var jsonStop = JSON.parse(stoppages.toString());
          // console.log(jsonStop);

          var jsonOee = JSON.parse(oee.toString());
          // console.log(jsonOee);

          io.sockets.emit('json', {
            time: new Date().toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'}),

            hourlyProduction : jsonPro.hourlyProduction,
            OMRON_CP1H_1_DW0 : jsonPro.OMRON_CP1H_1_DW0,
            shiftProduction : jsonPro.Script_shiftProduction,

            hourlyCap : jsonRej.Cap_Rejections,
            hourlyPlug : jsonRej.Plug_Rejections,
            hourlyRefil : jsonRej.Refill_Rejections,

            oeeHourly : jsonOee.oeeHourly,
            perHourly : jsonOee.perHourly,
            availHourly : jsonOee.availHourly,
            qualHourly : jsonOee.qualHourly,

            hourlyAirStop : jsonStop.hourlyAirStop,
            hourlyCapStop : jsonStop.hourlyCapStop,
            hourlyStopperStop : jsonStop.hourlyPlugStop,
            hourlyRefilStop : jsonStop.hourlyRefilStop,
            hourlyLabelStop : jsonStop.hourlyNozzleStop,
            hourlyCountStop : jsonStop.hourlyGripStop
          })
        }

      });
    });
  });
} catch (err) {
  console.log(err);
}

server.listen(PORT, function() {
	console.log("Listening ON: " + PORT);
});