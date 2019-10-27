import express from 'express'
import chalk   from 'chalk'
import path    from 'path'
import https from 'https'
import config  from './config'
<<<<<<< HEAD

=======
>>>>>>> parent of 7360bf4... added clocwork request, to send a reply back to the user

const fs = require('fs');

const app = express()
const router = express.Router();

app.use('/', express.static(path.resolve(__dirname, '/../public')))

router.get('/recordnumber', (req, res) => {
  fs.appendFileSync('numbers.txt', req.query.from + '\n');
  console.log(req.query.from)
  res.send({
    message: 'Join the Sunset Club today!'
  })
})

app.get('/hello', (req, res) => {
  return res.send('Can you hear me?')
})

app.listen(config.PORT, () => {
  const log = console.log
  log('\n')
  log(chalk.bgGreen.black(`Server listening on http://localhost:${config.PORT}/ ..`))
  log('\n')

  log(`${chalk.blue('Much fun! :)')}`)
  log('\n')
})

//Sends everyone (on the numbers.json file) the sunset and sunrise times
app.get('/sunset', (req, res) => {
  //Grabs sunrise and sunset data from an API
  https.get('https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&date=today',(resp)=>{
    let data = '';
    resp.on('data',(chunk)=>{
      data += chunk;
    });
    resp.on('end', () => {
      //Translate it to a javascript object
      endData = JSON.parse(data);
      console.log('endData:'+endData);
      var listofNos = numbers;
      //Clockwork function at the bottom of this script
      clockworkAPI(endData,listofNos);
      res.send({
        message: 'message sent'
      });
    });
  })
})

function clockworkAPI(endData, listofNos) {
  var fullListOfNos = [];
  for(var i=0;i<listofNos.length;i++){
    fullListOfNos[i] = { To: listofNos[i], Content: 'Sunset is at '+endData.results.sunset+' and Sunrise is at '+endData.results.sunrise }
  }
  console.log(fullListOfNos);
  clockwork.sendSms([fullListOfNos], 
  function(error, resp) {
    if (error) {
        console.log('Something went wrong', error);
    } else {
        console.log('Message sent',resp.responses[0].id,endData.results.sunset,endData.results.sunrise,listofNos);
    }
});
}

export default app;
