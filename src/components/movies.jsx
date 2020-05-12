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
			<div>
				<div className="row">
					<div className="col-md">Title</div>
					<div className="col-md">Genre</div>
					<div className="col-md">Stock</div>
					<div className="col-md">Rate</div>
					<div className="col-md">&nbsp;</div>
				</div>
				{ this.state.movies.map(movie => this.renderLineItem(movie) ) }
			</div>
		</div>

	}

	renderLineItem(movie) {
		return <div key={movie._id} className="row">
			<div className="col-sm">{movie.title}</div>
			<div className="col-sm">{movie.genre.name }</div>
			<div className="col-sm">{movie.numberInStock }</div>
			<div className="col-sm">{movie.dailyRentalRate }</div>
			<div className="col-sm"><button onClick={ () => this.handleDelete(movie) } className="btn btn-secondary btn-sm">Delete</button></div>
		</div>
	}
}

export default Movies;