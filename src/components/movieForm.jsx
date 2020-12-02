import React from 'react';
import { getMovie, getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import Joi from 'joi-browser';
import Form from './common/form';

class MovieForm extends Form {
	state = {
		data: {},
		genres: {},
		movies: {},
		errors: {}
	};

	componentDidMount() {
		const { match: { params } } = this.props;
		const defaultGenre = { _id: '', name: 'All Genres' };
		const genres = [defaultGenre, ...getGenres()];
		this.setState({ data: getMovie(params.id), genres, movies: getMovies() });

		console.log( params );
	}

	schema = {
		title: Joi.string().required().label("Title"),
		genre: Joi.string().required().min(8).label("Genre"),
		numInStock: Joi.number().integer().required().label("Number in Stock"),
		rate: Joi.number().required().label("Rate")
	};

	doSubmit = (movie) => {
		console.log('Submitted');
	};

	handleLike = (movie) => {
		let movies = [...this.state.movies];
		const index = movies.indexOf(movie);

		movies[index].liked = !movies[index].liked;
		this.setState({ movies: movies });
	};

	render() {
		return <div>
			<h1>Movie Form</h1>
			<form onSubmit={this.handleSubmit}>
				{this.renderInput('title', 'Title', false)}
				{this.renderInput('genre', 'Genre', false)}
                {this.renderInput('numberInStock', 'Number in Stock', false)}
                {this.renderInput('dailyRentalRate', 'Rate', false)}
				{this.renderButton('Save')}
			</form>
		</div>;
	};
}

export default MovieForm;
