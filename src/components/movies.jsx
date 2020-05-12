import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { remove } from 'lodash';

class Movies extends Component {
	state = {
		movies: getMovies()
	}

	handleDelete = movie => {
		remove(this.state.movies, (thisMovie) => { return thisMovie._id === movie._id; });
		this.setState({ movies: this.state.movies });
	};

	render() {
		return (
			<div className="container">
				{ this.renderTable() }
			</div>
		);
	}

	renderTable() {
		if( this.state.movies.length === 0 ) return <p>There are no movies in the database.</p>

		return <div>
			<p>Showing {this.state.movies.length} movies in the database.</p>
			<table className="table">
				<thead>
					<tr>
						<th>Title</th>
						<th>Genre</th>
						<th>Stock</th>
						<th>Rate</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
				{ this.state.movies.map(movie => this.renderTableRow(movie) ) }
				</tbody>
			</table>
		</div>

	}

	renderTableRow(movie) {
		return <tr key={movie._id}>
			<td>{movie.title}</td>
			<td>{movie.genre.name }</td>
			<td>{movie.numberInStock }</td>
			<td>{movie.dailyRentalRate }</td>
			<td>
				<button onClick={ () => this.handleDelete(movie) } className="btn btn-danger btn-sm">Delete</button>
			</td>
		</tr>
	}
}

export default Movies;