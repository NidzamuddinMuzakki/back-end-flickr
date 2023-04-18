const express =  require('express')
const  morgan=  require('morgan')

const Flickr =  require('flickrapi');
const cors =  require( 'cors')

var flickrOptions = {
  api_key: '3cd77812b7226ee0fb606261a944073d',
  secret: '22ebc5c2e1c4b492'
};

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
    
    
    if(page<1  || typeof page!="number"){
        res.status(400).json({"error":"page harus lebih besar dari 0"})
        return 
    }else if (page ==undefined || isNaN(page)){
      res.status(400).json({"error":"page harus berupa angka lebih besar dari 0"})
      return 
    }

    if(perpage<1 ||  typeof perpage!="number"){
        res.status(400).json({"error":"per_page harus lebih besar dari 0"})
        return 
    }else if(perpage ==undefined || isNaN(perpage)){
      res.status(400).json({"error":"per_page harus berupa angka lebih besar dari 0"})
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

module.exports =app;