/**
 * .../api/tv
 */

'use strict';

const router = require('express').Router();

const camelCaseKey    = require('../../middlewares/camelCaseKey');
const tmdbPosters     = require('../../middlewares/tmdbPosters');
const tmdbCredits     = require('../../middlewares/tmdbCredits');
const tmdbProfiles    = require('../../middlewares/tmdbProfiles');
const tmdbScreenshots = require('../../middlewares/tmdbScreenshots');

router.get('/discover', (req, res) => {
  const tmdb = req.app.locals.tmdb;

  tmdb
    .discoverTv({
        page: req.query.page ? req.query.page : 1
      }, (err, tmdbRes) => {
      if (err)
        return res.status(err.status).send(err.response);

      tmdbRes = camelCaseKey(tmdbRes);
      tmdbRes = Object.assign({}, tmdbRes, {
        results: tmdbPosters({
          root: tmdbRes.results,
          posterUrlPrefix: req.app.locals.tmdbPosterUrl,
          backdropUrlPrefix: req.app.locals.tmdbBackdropUrl
        })
      });

      res.json(tmdbRes);
    });
});

router.get('/popular', (req, res) => {
  const tmdb = req.app.locals.tmdb;
  tmdb
    .miscPopularTvs({
        page: req.query.page ? req.query.page : 1
      }, (err, tmdbRes) => {
      if (err)
        return res.status(err.status).send(err.response);

      tmdbRes = camelCaseKey(tmdbRes);
      tmdbRes = Object.assign({}, tmdbRes, {
        results: tmdbPosters({
          root: tmdbRes.results,
          posterUrlPrefix: req.app.locals.tmdbPosterUrl,
          backdropUrlPrefix: req.app.locals.tmdbBackdropUrl
        })
      });

      res.json(tmdbRes);
    });
});

router.get('/top_rated', (req, res) => {
  const tmdb = req.app.locals.tmdb;
  tmdb
    .miscTopRatedTvs({
        page: req.query.page ? req.query.page : 1
      }, (err, tmdbRes) => {
      if (err)
        return res.status(err.status).send(err.response);
      
      tmdbRes = camelCaseKey(tmdbRes);
      tmdbRes = Object.assign({}, tmdbRes, {
        results: tmdbPosters({
          root: tmdbRes.results,
          posterUrlPrefix: req.app.locals.tmdbPosterUrl,
          backdropUrlPrefix: req.app.locals.tmdbBackdropUrl
        })
      });

      res.json(tmdbRes);
    });
});

router.get('/on_air', (req, res) => {
  const tmdb = req.app.locals.tmdb;
  tmdb
    .tvOnTheAir((err, tmdbRes) => {
      if (err)
        return res.status(err.status).send(err.response);
      
      tmdbRes = camelCaseKey(tmdbRes);
      tmdbRes = Object.assign({}, tmdbRes, {
        results: tmdbPosters({
          root: tmdbRes.results,
          posterUrlPrefix: req.app.locals.tmdbPosterUrl,
          backdropUrlPrefix: req.app.locals.tmdbBackdropUrl
        })
      });

      res.json(tmdbRes);
    });
});

router.get('/:id(\\d+)/', (req, res) => {
  const tmdb = req.app.locals.tmdb;
  const tvId = req.params.id;

  /**
   * Get overview
   */
  const getTvInfo = new Promise((resolve, reject) => {
    tmdb
      .tvInfo({ id: tvId }, (err, tmdbRes) => {
        if (err) reject(err);
        else resolve(camelCaseKey(tmdbRes));
      });
  });

  /**
   * Get credits
   */
  const getTvCredits = new Promise((resolve, reject) => {
    tmdb
      .tvCredits({ id: tvId }, (err, tmdbRes) => {
        if (err) reject(err);
        else resolve(camelCaseKey(tmdbRes));
      });
  });

  /**
   * Get all images and screeshots
   */
  const getTvImages = new Promise((resolve, reject) => {
    tmdb
      .tvImages({ id: tvId }, (err, tmdbRes) => {
        if (err) reject(err);
        else resolve(camelCaseKey(tmdbRes));
      });
  });

  Promise.all(
    [
      getTvInfo, 
      getTvCredits,
      getTvImages
    ].map(promise => promise.catch(err => err))
  )
  .then(tmdbRes => {
    res.json(Object.assign(
      {},
      tmdbPosters({
        root: tmdbRes[0],
        posterUrlPrefix: req.app.locals.tmdbPosterUrl,
        backdropUrlPrefix: req.app.locals.tmdbBackdropUrl
      }),
      {
        credits: tmdbProfiles({
          root: tmdbCredits(tmdbRes[1]),
          profileUrlPrefix: req.app.locals.tmdbProfileUrl
        })
      },
      {
        screenshots: tmdbScreenshots({
          root: tmdbRes[2],
          screenshotUrlPrefix: req.app.locals.tmdbBackdropUrl
        })
      }
    ));
  })
  .catch(err => res.status(err.status).send(err.response));
});

router.use('/search', require('../../middlewares/encodeQuery'));

router.get('/search', (req, res) => {
  const tmdb = req.app.locals.tmdb;
  
  tmdb
    .searchTv({
      query: req.query.query,
      page: req.query.page ? req.query.page : 1
    }, (err, tmdbRes) => {
      if (err)
        return res.status(err.status).send(err.response);
      
      tmdbRes = camelCasekey(tmdbRes);
      tmdbRes = Object.assign({}, tmdbRes, {
        results: tmdbPosters({
          root: tmdbRes.results,
          posterUrlPrefix: req.app.locals.tmdbPosterUrl,
          backdropUrlPrefix: req.app.locals.tmdbBackdropUrl
        })
      });
      
      res.json(tmdbRes);
    });
});

module.exports = router;