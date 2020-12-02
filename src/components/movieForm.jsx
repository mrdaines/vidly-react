import React from 'react';
import { getMovie, getMovies, saveMovie } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import Joi from 'joi-browser';
import Form from './common/form';
import { Redirect } from "react-router-dom";

class MovieForm extends Form {
	state = {
		data: {
			title: "",
			genreId: "",
			numberInStock: "",
			dailyRentalRate: ""
		},
		genres: [],
		errors: {}
	};

	schema = {
		_id: Joi.string(),
		title: Joi.string().required().label("Title"),
		genreId: Joi.string().required().label("Genre"),
		numberInStock: Joi.number().integer().required().min(0).max(100).label("Number in Stock"),
		dailyRentalRate: Joi.number().required().min(0).max(10).label("Daily Rental Rate")
	};

	componentDidMount() {
		const genres = getGenres();
		this.setState({ genres });

		const movieId = this.props.match.params.id;
		if( movieId === 'new') return;
		
		const movie = getMovie(movieId);
		if( !movie ) return this.props.history.replace('/not-found');

		this.setState({ data: this.mapToViewModel(movie) });
	};

	mapToViewModel(movie) {
		return {
			_id: movie._id,
			title: movie.title,
			genreId: movie.genre._id,
			numberInStock: movie.numberInStock,
			dailyRentalRate: movie.dailyRentalRate
		};
	};

	doSubmit = (movie) => {
		saveMovie(this.state.data);

		return this.props.history.replace('/not-found');
		console.log('Submitted');
	};

	handleLike = (movie) => {
		let movies = [...this.state.movies];
		const index = movies.indexOf(movie);

		movies[index].liked = !movies[index].liked;
		this.setState({ movies: movies });
	};

	render() {
		if( !this.state.data ) {
			return <Redirect to="/not-found" />
		}

		return <div>
			<h1>Movie Form</h1>
			<form onSubmit={this.handleSubmit}>
				{this.renderInput('title', 'Title', false)}
				{this.renderSelect('genreId', 'Genre', this.state.genres)}
                {this.renderInput('numberInStock', 'Number in Stock', false)}
                {this.renderInput('dailyRentalRate', 'Daily Rental Rate', false)}
				{this.renderButton('Save')}
			</form>
		</div>;
	};
}

export default MovieForm;
