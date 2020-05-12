import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';

class Movies extends Component {
	state = {
		movies: getMovies()
	}

	// handleDelete = movie => {

	// };

	render() {
		return (
			<div>
				<p>Showing X movies in the database.</p>
				<ul>
					{ this.state.movies.map(movie => <li key={movie._id}>{ movie.title }</li>) }
				</ul>
			</div>
		);
	}
}

export default Movies;