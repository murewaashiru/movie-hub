const express = require('express');

const Movies = require('../controllers/movieController');
const MovieValidation = require('../validations/movieValidation');
const Auth = require('../middlewares/auth');

const router = express.Router();

router.route('/').get(Auth, Movies.getMovies);

router
  .route('/list')
  .post(Auth, MovieValidation.validateMovieListing, Movies.addToList);
router
  .route('/list')
  .get(Auth, MovieValidation.getMovieListing, Movies.viewList);
router
  .route('/list')
  .delete(Auth, MovieValidation.removeFromList, Movies.removeFromList);

router
  .route('/rate')
  .patch(Auth, MovieValidation.movieRating, Movies.rateMovie);

module.exports = router;
