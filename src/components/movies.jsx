import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate'

class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		currentPage: 1,
		pageSize: 4
	}

	componentDidMount() {
		const defaultGenre = { _id: '', name: 'All Genres' };
		const genres = [defaultGenre, ...getGenres()];
		this.setState({ genres, movies: getMovies(), selectedGenre: defaultGenre });
	}

	handleDelete = movie => {
		const movies = this.state.movies.filter(m => m._id !== movie._id);
		this.setState({ movies: movies });
		if (this.state.currentPage > Math.ceil(movies.length / this.state.pageSize)) {
			this.setState({ currentPage: this.state.currentPage - 1 });
		}
	};

	handleLike = (movie) => {
		let movies = [...this.state.movies];
		const index = movies.indexOf(movie);

		movies[index].liked = !movies[index].liked;
		this.setState({ movies: movies });
	};

	handlePageChange = page => {
		this.setState({ currentPage: page });
	};

	handleGenreSelect = genre => {
		this.setState({ selectedGenre: genre, currentPage: 1 });
	};

	handleSort = path => {
		console.log(path);
	}

	render() {
		const { length: count } = this.state.movies;
		const { pageSize, currentPage, selectedGenre, movies: allMovies } = this.state;

		if (count === 0) return <p>There are no movies in the database.</p>

		const filtered = selectedGenre && selectedGenre._id
			? allMovies.filter(m => m.genre._id === selectedGenre._id)
			: allMovies;

		const movies = paginate(filtered, currentPage, pageSize);

		return (
			<div className="row">
				<div className="col-3 m-2">
					<ListGroup
						items={this.state.genres}
						selectedItem={this.state.selectedGenre}
						onItemSelect={this.handleGenreSelect}
					/>
				</div>
				<div className="col">
					<p>Showing {filtered.length} movies in the database.</p>
					<MoviesTable
						movies={movies}
						onLike={this.handleLike}
						onDelete={this.handleDelete}
						onSort={this.handleSort}
					/>
					<Pagination
						itemsCount={filtered.length}
						pageSize={pageSize}
						currentPage={currentPage}
						onPageChange={this.handlePageChange}
					/>
				</div>
			</div>
		);
	}
}

export default Movies;