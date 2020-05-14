import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from './common/like';
import Pagination from './common/pagination';

class Movies extends Component {
	state = {
		movies: getMovies(),
		pageNum: 1,
		numPerPage: 3
	}

	componentWillMount() {
		this.setState({ totalPages: Math.ceil(this.state.movies.length / this.state.numPerPage) });
	}

	handleDelete = movie => {
		const movies = this.state.movies.filter(m => m._id !== movie._id);
		this.setState({ movies: movies });
		const newTotalPages = Math.ceil(movies.length / this.state.numPerPage);

		if (this.state.totalPages > newTotalPages) {
			this.setState({ totalPages: newTotalPages });
		}
		if (this.state.pageNum > newTotalPages) {
			this.setState({ pageNum: newTotalPages });
		}
	};

	handleLike = (movie) => {
		let movies = [...this.state.movies];
		const index = movies.indexOf(movie);

		movies[index].liked = !movies[index].liked;
		this.setState({ movies: movies });
	};

	handlePageSelect = (pageNum) => {
		this.setState({ pageNum: pageNum });
	};

	render() {
		return (
			<div className="container">
				{this.renderTable()}
				<Pagination
					totalPages={this.state.totalPages}
					activePage={this.state.pageNum}
					onPageSelect={this.handlePageSelect}
				/>
			</div>
		);
	}

	renderTable() {
		const { length: count } = this.state.movies;

		if (count === 0)
			return <p>There are no movies in the database.</p>

		let movies = [...this.state.movies];

		movies = movies.slice((this.state.pageNum - 1) * this.state.numPerPage, this.state.pageNum * this.state.numPerPage);

		return (<React.Fragment>
			<p>Showing {count} movies in the database.</p>
			<table className="table">
				<thead>
					<tr>
						<th>Title</th>
						<th>Genre</th>
						<th>Stock</th>
						<th>Rate</th>
						<th></th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{movies.map(movie => this.renderTableRow(movie))}
				</tbody>
			</table>
		</React.Fragment>)

	}

	renderTableRow(movie) {
		return <tr key={movie._id}>
			<td>{movie.title}</td>
			<td>{movie.genre.name}</td>
			<td>{movie.numberInStock}</td>
			<td>{movie.dailyRentalRate}</td>
			<td><Like liked={movie.liked} onClick={() => this.handleLike(movie)} /></td>
			<td>
				<button onClick={() => this.handleDelete(movie)} className="btn btn-danger btn-sm">Delete</button>
			</td>
		</tr>
	}
}

export default Movies;