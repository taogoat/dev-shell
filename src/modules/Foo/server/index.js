'use strict'

module.exports=function(app, db) {

  app.get('/Foo', function(req, res) {

    db.collection('Foo').find().toArray(function(err, results) {
      res.send(results)
      res.end()
      console.log(results);

      // send HTML file populated with quotes here
    })

  })

  app.put('/Foo', function(req, res) {
    console.log('Buzz is '+req.body.buzz)
    db.collection('Foo')
    .findOneAndUpdate({'date': req.body.date}, {
      $push: {
        buzz: req.body.buzz
      }
    }, {
      sort: {_id: -1},
      upsert: true
    }, function(err, result) {
      if (err) return res.send(err)
      res.send(result)
    })
  })

}
