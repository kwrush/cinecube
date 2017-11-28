/**
 * .../api/movie
 */

'use strict';

const router = require('express').Router();
const camelCaseKey = require('../../middlewares/camelCaseKey');
const tmdbImageUrl = require('../../middlewares/tmdbImageUrl');

/**
 * Discover movies
 */
router.get('/discover', (req, res) => {
  const tmdb = req.app.locals.tmdb;

  tmdb
    .discoverMovie((err, tmdbRes) => {
      if (err) res.send(err);

      tmdbRes = camelCaseKey(tmdbRes);
      tmdbRes = Object.assign({}, tmdbRes, {
        results: tmdbImageUrl({
          root: tmdbRes.results,
          posterUrlPrefix: req.app.locals.tmdbPosterUrl,
          backdropUrlPrefix: req.app.locals.tmdbBackdropUrl
        })
      });

      res.json(tmdbRes);
    });
});

/**
 * API to fetch popular movies
 */
router.get('/popular', (req, res) => {
  const tmdb = req.app.locals.tmdb;
  tmdb
    .miscPopularMovies((err, tmdbRes) => {
      if (err) res.send(err);

      tmdbRes = camelCaseKey(tmdbRes);
      tmdbRes = Object.assign({}, tmdbRes, {
        results: tmdbImageUrl({
          root: tmdbRes.results,
          posterUrlPrefix: req.app.locals.tmdbPosterUrl,
          backdropUrlPrefix: req.app.locals.tmdbBackdropUrl
        })
      });

      res.json(tmdbRes);
    });
});

/**
 * Get movies playing in the theatres
 */
router.get('/in_theatre', (req, res) => {
  const tmdb = req.app.locals.tmdb;
  tmdb
    .miscNowPlayingMovies((err, tmdbRes) => {
      if (err) res.send(err);
      
      tmdbRes = camelCaseKey(tmdbRes);
      tmdbRes = Object.assign({}, tmdbRes, {
        results: tmdbImageUrl({
          root: tmdbRes.results,
          posterUrlPrefix: req.app.locals.tmdbPosterUrl,
          backdropUrlPrefix: req.app.locals.tmdbBackdropUrl
        })
      });
      
      res.json(tmdbRes);
    });
});

/**
 * Get top rated movies
 */
router.get('/top_rated', (req, res) => {
  const tmdb = req.app.locals.tmdb;
  tmdb
    .miscTopRatedMovies((err, tmdbRes) => {
      if (err) res.send(err);
      
      tmdbRes = camelCaseKey(tmdbRes);
      tmdbRes = Object.assign({}, tmdbRes, {
        results: tmdbImageUrl({
          root: tmdbRes.results,
          posterUrlPrefix: req.app.locals.tmdbPosterUrl,
          backdropUrlPrefix: req.app.locals.tmdbBackdropUrl
        })
      });

      res.json(tmdbRes);
    });
});

/**
 * Get upcoming movies
 */
router.get('/upcoming', (req, res) => {
  const tmdb = req.app.locals.tmdb;
  tmdb
    .miscUpcomingMovies((err, tmdbRes) => {
      if (err) res.send(err);
      
      tmdbRes = camelCaseKey(tmdbRes);
      tmdbRes = Object.assign({}, tmdbRes, {
        results: tmdbImageUrl({
          root: tmdbRes.results,
          posterUrlPrefix: req.app.locals.tmdbPosterUrl,
          backdropUrlPrefix: req.app.locals.tmdbBackdropUrl
        })
      });

      res.json(tmdbRes);
    });
});

/**
 * Get the information of the movie by its id
 * TODO: middlewares to format screenshots and credits
 */
router.get('/:id(\\d+)/', (req, res) => {
  const tmdb = req.app.locals.tmdb;
  const movieId = req.params.id;

  /**
   * Get movie overview
   */
  const getMovieInfo = new Promise((resolve, reject) => {
    tmdb
      .movieInfo({ id: movieId }, (err, tmdbRes) => {
        if (err) reject(err);
        else resolve(camelCaseKey(tmdbRes));
      });
  });

  /**
   * Get detailed credits
   */
  const getMovieCredits = new Promise((resolve, reject) => {
    tmdb
      .movieCredits({ id: movieId }, (err, tmdbRes) => {
        if (err) reject(err);
        else resolve(camelCaseKey(tmdbRes));
      });
  });

  /**
   * Get all images and screeshots
   */
  const getMovieImages = new Promise((resolve, reject) => {
    tmdb
      .movieImages({ id: movieId }, (err, tmdbRes) => {
        if (err) reject(err);
        else resolve(camelCaseKey(tmdbRes));
      });
  });

  Promise.all(
    [
      getMovieInfo, 
      getMovieCredits,
      getMovieImages
    ].map(promise => promise.catch(err => err))
  )
  .then(tmdbRes => {
    res.send(Object.assign(
      {},
      tmdbRes[0],
      {
        credits: tmdbRes[1]
      },
      {
        screenshots: tmdbRes[2]
      }
    ));
  })
  .catch(err => res.send(res));
});

router.use('/search', require('../../middlewares/encodeQuery'));

router.get('/search', (req, res) => {
  const tmdb = req.app.locals.tmdb;
  
  tmdb
    .searchMovie({
      query: req.query.query
    }, (err, tmdbRes) => {
      if (err) res.send(err);
      
      tmdbRes = camelCaseKey(tmdbRes);
      tmdbRes = Object.assign({}, tmdbRes, {
        results: tmdbImageUrl({
          root: tmdbRes.results,
          posterUrlPrefix: req.app.locals.tmdbPosterUrl,
          backdropUrlPrefix: req.app.locals.tmdbBackdropUrl
        })
      });
      
      res.json(tmdbRes);
    });
});

module.exports = router;