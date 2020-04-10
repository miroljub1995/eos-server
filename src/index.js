const express = require('express');
const multer = require("multer");
const app = express();
const port = 8080;
var fs = require('fs');
var path = require("path");

//app.get('/', (req, res) => res.send('Hello World!'))

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, "..", "apps", req.params.app);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir); //here we specify the destination. in this case i specified the current directory
  },
  filename: function (req, file, cb) {
    //console.log(file); //log the file object info in console
    cb(null, file.originalname);//here we specify the file saving name. in this case. 
    //i specified the original file name .you can modify this name to anything you want
  }
});

var uploadDisk = multer({ storage: storage });

app.post("/upload/:app", uploadDisk.single('app'), (req, res) => {
  //console.log(req.params.app);
  console.log(" file disk uploaded");
  res.send("file disk upload success");
});

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
