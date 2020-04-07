const express = require('express')
const app = express()
const port = 3000
var path = require("path");

//app.get('/', (req, res) => res.send('Hello World!'))

app.get('/:app/:package', function (req, res, next) {
    var options = {
      root: path.join(__dirname, '..', 'apps', req.params.app),
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    }
    
    var fileName = req.params.package
    res.sendFile(fileName, options, function (err) {
      if (err) {
        next(err)
      } else {
        console.log('Sent:', fileName)
      }
    })
  })
  

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))