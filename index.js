var express = require('express');
var morgan = require('morgan');

var Flickr = require('flickrapi');

var flickrOptions = {
  api_key: '3cd77812b7226ee0fb606261a944073d',
  secret: '22ebc5c2e1c4b492'
};

var cors = require('cors')
var app = express();
app.use(cors())
app.use(morgan());


app.get('/', function(req, res) {
  res.send("flickr originals!");
});

app.get('/photos', function(req, res) {
  Flickr.tokenOnly(flickrOptions, function(error, flickr) {
    let page=req.query.page?parseInt(req.query.page):req.query.page
    let perpage= req.query.per_page?parseInt(req.query.per_page):req.query.per_page
    
    console.log(typeof search, req.query.search, error)
    if(page<1 || page ==undefined || typeof page!="number"){
        res.status(400).json({"error":"page harus lebih besar dari 0 dan berupa angka"})
        return 
    }

    if(perpage<1 || perpage ==undefined || typeof perpage!="number"){
        res.status(400).json({"error":"perpage harus lebih besar dari 0 dan berupa angka"})
        return 
    }
    if(req.query.search){
        flickr.photos.search({
            text:req.query.search,
            page: page,
            per_page: perpage
          }, function(err, result) {
            if(err){
                res.status(400).json(err)
                return
            }
            res.status(200).json(result)
            return
            // console.log(result, err)
            // do something with result
          })
    }else{
        flickr.photos.getRecent({
            
            page: page,
            per_page: perpage
          }, function(err, result) {
            if(err){
                res.status(400).json(err)
                return
            }
            res.status(200).json(result)
            return
            // console.log(result, err)
            // do something with result
          })
    }
    
    
  });
});



var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});