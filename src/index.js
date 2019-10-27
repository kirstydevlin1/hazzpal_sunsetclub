import express from 'express'
import chalk   from 'chalk'
import path    from 'path'

import config  from './config'
var clockwork = require('../node_modules/clockwork')({key:'API_KEY_GOES_HERE'})

const fs = require('fs');

const app = express()

app.use('/', express.static(path.resolve(__dirname, '/../public')))

app.get('/recordnumber', (req, res) => {
  fs.appendFileSync('numbers.txt', req.query.from + '\n');
  console.log(req.query.from)

  clockwork.sendSms({To: '447539968069', Content: 'Learn your phone number!'},
    function (error, resp) {
      if (error) {
        console.log('Something went wrong', error);
      } else {
        console.log('Message sent', resp.responses[0].id);
      }
    });
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

export default app
