/**
 * .../api/people
 */

'use strict';

const router = require('express').Router();

const camelCaseKey = require('../../middlewares/camelCaseKey');
const tmdbPosters  = require('../../middlewares/tmdbPosters');
const tmdbCredits  = require('../../middlewares/tmdbCredits');
const tmdbProfiles = require('../../middlewares/tmdbProfiles');

router.get('/popular', (req, res) => {
  const tmdb = req.app.locals.tmdb;
  tmdb
    .personPopular({
        page: req.query.page ? req.query.page : 1
      }, (err, tmdbRes) => {
        if (err)
          return res.status(err.status).send(err.response);
        
        tmdbRes = Object.assign({}, tmdbRes, {
          results: tmdbProfiles({
            root: camelCaseKey(tmdbRes.results),
            profileUrlPrefix: req.app.locals.tmdbProfileUrl
          })
        });
        
        const results = tmdbRes.results.map(
          rs => Object.assign({}, rs, { 
            knownFor: tmdbPosters({
              root: rs.knownFor,
              posterUrlPrefix: req.app.locals.tmdbPosterUrl,
              backdropUrlPrefix: req.app.locals.tmdbBackdropUrl
            })
          }));
        
      res.json(Object.assign({}, tmdbRes, {
        results: results
      }));
    });
});

router.get('/:id(\\d+)/', (req, res) => {
  const tmdb = req.app.locals.tmdb;
  
  // get overview of people
  const getPeopleInfo = new Promise((resolve, reject) => {
    tmdb
      .personInfo({ id: req.params.id }, (err, tmdbRes) => {
        if (err) reject(err);
        else resolve(camelCaseKey(tmdbRes));
      });
  });
  
  // get people's works, including movies and tv shows
  const getPeopleCredits = new Promise((resolve, reject) => {
    tmdb
      .personCombinedCredits({ id: req.params.id }, (err, tmdbRes) => {
        if (err) reject(err);
        else resolve(camelCaseKey(tmdbRes));
      });
  });
  
  Promise.all(
    [
      getPeopleInfo,
      getPeopleCredits
    ].map(promise => promise.catch(err => err))
  )
  .then(tmdbRes => {
    
    // basic profile
    const profile = tmdbProfiles({
      root: [tmdbRes[0]],
      profileUrlPrefix: req.app.locals.tmdbProfileUrl
    })[0];
    
    // role as an actor
    const cast = tmdbPosters({
      root: tmdbRes[1].cast,
      posterUrlPrefix: req.app.locals.tmdbPosterUrl,
      backdropUrlPrefix: req.app.locals.tmdbBackdropUrl
    });
    
    // as a crew member
    const crew = tmdbPosters({
      root: tmdbRes[1].crew,
      posterUrlPrefix: req.app.locals.tmdbPosterUrl,
      backdropUrlPrefix: req.app.locals.tmdbBackdropUrl
    });
    
    res.json(Object.assign(profile,
      {
        knownFor: tmdbCredits({
          cast: cast,
          crew: crew
        })
      }));
  })
  .catch(err => res.status(err.status).send(err.response));
});

router.use('/search', require('../../middlewares/encodeQuery'));

router.get('/search', (req, res) => {
  const tmdb = req.app.locals.tmdb;
  
  tmdb
    .searchPerson({
        query: req.query.query,
        page: req.query.page ? req.query.page : 1
      }, (err, tmdbRes) => {
        if (err)
          return res.status(err.status).send(err.response);
        
        tmdbRes = camelCaseKey(tmdbRes);
        tmdbRes = Object.assign({}, tmdbRes, {
          results: tmdbProfiles({
            root: tmdbRes.results,
            profileUrlPrefix: req.app.locals.tmdbProfileUrl
          })
        });
      
      res.json(tmdbRes);
    });
});

module.exports = router;