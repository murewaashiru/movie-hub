const axios = require('axios');
const { MovieLists, Users } = require('../database/models');

const { successResponse, errorResponse } = require('../utils/response');

/**
 * Fetch movies from the moviedb.org
 *  @returns {Array} list of movies
 */
const fetchMovies = async () => {
  try {
    let result;
    await axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.MOVIE_DB_API_kEY}&language=en-US&page=5`
      )
      .then((response) => {
        result = response.data.results;
      })
      .catch((error) => {
        console.log(error);
      });
    return result;
  } catch (error) {
    console.error(error);
  }
};
const getMovies = async (req, res, next) => {
  try {
    const data = await fetchMovies();

    return successResponse(res, 200, `${data.length} movies found`, data);
  } catch (err) {
    return next(err);
  }
};

const addToList = async (req, res, next) => {
  try {
    const data = req.body;
    const allMovies = await fetchMovies();

    const userExists = await Users.findOne({
      where: { id: data.userId },
    });
    if (!userExists) {
      return errorResponse(res, 404, 'User does not exist');
    }
    const userMovieList = await MovieLists.findAll({
      where: { userId: data.userId },
    });

    // Check if the movie is already in user's list
    const movieInList = userMovieList.some((e) => e.movieId === data.movieId);
    if (movieInList) {
      return errorResponse(res, 400, 'Movie is already in your list');
    }

    // Check if movie exists
    const movieExists = allMovies.some((e) => e.id === data.movieId);
    if (!movieExists) {
      return errorResponse(res, 404, 'Movie does not exist');
    }

    // return res.status(200).json({ data, movieInList, movieExists });
    // Get the movie details
    const movie = allMovies.filter((item) => item.id === data.movieId);
    data.title = movie[0].original_title;

    const result = await MovieLists.create(data);

    return successResponse(res, 201, 'Movie added to list', result);
  } catch (err) {
    return next(err);
  }
};

const viewList = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const data = await MovieLists.findAll({ where: { userId } });

    return successResponse(res, 200, 'Movies in your list:', data);
  } catch (err) {
    return next(err);
  }
};

const removeFromList = async (req, res, next) => {
  try {
    const { id, userId } = req.body;
    const data = await MovieLists.findAll({ where: { userId, id } });
    if (data.length === 0) {
      return errorResponse(res, 404, 'Movie not found');
    }
    await MovieLists.destroy({ where: { userId, id } });

    return successResponse(res, 200, 'Movies successfully removed from list');
  } catch (err) {
    return next(err);
  }
};

const rateMovie = async (req, res, next) => {
  try {
    const data = req.body;
    const { id, userId } = data;

    const record = await MovieLists.findAll({ where: { userId, id } });
    if (record.length === 0) {
      return errorResponse(res, 404, 'Movie not found');
    }

    const result = await MovieLists.update(data, {
      where: { userId, id },
      returning: true,
    });

    return successResponse(res, 200, 'Movies successfully rated', result[1]);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getMovies,
  addToList,
  viewList,
  removeFromList,
  rateMovie,
};
