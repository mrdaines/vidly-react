import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import _ from 'lodash';
import { Link } from "react-router-dom";
import SearchBox from './common/searchBox';

class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		currentPage: 1,
		pageSize: 4,
		sortColumn: { path: 'title', order: 'asc' },
		searchQuery: '',
		selectedGenre: null
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
		this.setState({ selectedGenre: genre, searchQuery: '', currentPage: 1 });
	};

	handleSort = sortColumn => {
		this.setState({ sortColumn });
	}

	handleSearch = searchQuery => {
		this.setState({ searchQuery: searchQuery, selectedGenre: null, currentPage: 1 });
	}

	getPageData = () => {
		const {
			pageSize,
			currentPage,
			selectedGenre,
			sortColumn,
			searchQuery,
			movies: allMovies
		} = this.state;

		let filtered = allMovies;

		if( searchQuery ) {
			filtered = allMovies.filter( m =>
				m.title.toLowerCase().startsWith( searchQuery.toLowerCase() )
			);
		}
		else if( selectedGenre && selectedGenre._id )
			filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);

		const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

		const movies = paginate(sorted, currentPage, pageSize);

		return { totalCount: filtered.length, data: movies };
	}

	render() {
		const { length: count } = this.state.movies;
		const {
			pageSize,
			currentPage,
			sortColumn
		} = this.state;

		if (count === 0) return <p>There are no movies in the database.</p>

		const { totalCount, data: movies } = this.getPageData();
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
					<Link
						to="/movies/new"
						className="btn btn-primary"
						style={{ marginBottom: 20 }}
					>
						New Movie
					</Link>
					<p>Showing {totalCount} movies in the database.</p>
					<SearchBox value={this.state.searchQuery} onChange={this.handleSearch} />
					<MoviesTable
						movies={movies}
						sortColumn={sortColumn}
						onLike={this.handleLike}
						onDelete={this.handleDelete}
						onSort={this.handleSort}
					/>
					<Pagination
						itemsCount={totalCount}
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