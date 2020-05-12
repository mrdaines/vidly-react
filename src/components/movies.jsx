import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';

class Movies extends Component {
	state = {
		movies: getMovies()
	}

	handleDelete = movie => {
		console.log(movie);
	};

	render() {
		return (
			<main className="container">
				<p>Showing {this.state.movies.length} movies in the database.</p>
				<div>{ this.state.movies.map(movie => this.renderLineItem(movie) ) }</div>
			</main>
		);
	}

	renderLineItem(movie) {
		console.log(movie);
		return <div key={movie._id}>
			<div>{movie.title}</div>
			<div>{movie.genre.name }</div>
			<div>{movie.numberInStock }</div>
			<div>{movie.dailyRentalRate }</div>
			<div><button onClick={ this.handleDelete(movie) } className="btn btn-secondary btn-sm">Delete</button></div>
		</div>
		// return <div key={movie._id}><div>{ movie.title }</div><div>{ movie.genre }</div><div>{ movie.numberInStock }</div><div>{ movie.dailyRentalRate }</div></div>
	}
}

export default Movies;