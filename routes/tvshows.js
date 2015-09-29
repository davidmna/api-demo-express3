//File: routes/tvshows.js
module.exports = function(app) {
  var TVShow = require('../models/tvshow.js');

  //GET - return all tvshows in db
  findAllTVShows = function(req, res) {
    TVShow.find(function(err, tvshows) {
      if(!err) {
        res.send(tvshows);
      } else {
        console.log('ERROR: ' + err);
      }
    });
  };

  //GET - return tvshow by id
  findById = function(req, res) {
    TVShow.findById(req.params.id, function(err, tvshow) {
      if(!err) {
        res.send(tvshow);
      } else {
        console.log('ERROR: ' + err);
      }
    });
  };

  //POST - create new record
  addTVShow = function(req, res) {
    console.log('POST');
    console.log(req.body);

    var tvshow = new TVShow({
      title: req.body.title,
      year: req.body.year,
      country: req.body.country,
      poster: req.body.poster,
      seasons: req.body.seasons,
      genre: req.body.genre,
      summary: req.body.summary
    });

    tvshow.save(function(err) {
      if(!err) {
        console.log('Created');
      } else {
        console.log('ERROR: ' + err);
      }
    });

    res.send(tvshow);
  }

  //PUT - update a record
  updateTVShow = function(req, res) {
    TVShow.findById(req.params.id, function(err, tvshow) {
      tvshow.title = req.body.title;
      tvshow.year = req.body.year;
      tvshow.country = req.body.country;
      tvshow.poster = req.body.poster;
      tvshow.seasons = req.body.seasons;
      tvshow.genre = req.body.genre;
      tvshow.summary = req.body.summary;

      tvshow.save(function(err) {
        if(!err) {
          console.log('Updated');
        } else {
          console.log('ERROR: '+ err);
        }
        res.send(tvshow);
      });
    });
  }

  //DELETE - delete a record
  deleteTVShow = function(req, res) {
    TVShow.findById(req.params.id, function(err, tvshow) {
      tvshow.remove(function(err) {
        if(!err) {
          console.log('Removed');
          res.send('Removed');
        } else {
          console.log('ERROR: ' + err);
        }
      });
    });
  };

  app.get('/tvshows', findAllTVShows);
  app.get('/tvshow/:id', findById);
  app.post('/tvshow', addTVShow);
  app.put('/tvshow/:id', updateTVShow);
  app.delete('/tvshow/:id', deleteTVShow);

}