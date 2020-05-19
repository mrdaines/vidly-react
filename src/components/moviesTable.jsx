import React from 'react';
import Like from './common/like';

const MoviesTable = props => {
	const { movies, onDelete, onLike, onSort } = props;

	return (
		<table className="table">
			<thead>
				<tr>
					<th onClick={() => onSort('title')}>Title</th>
					<th onClick={() => onSort('genre.name')}>Genre</th>
					<th onClick={() => onSort('numberInStock')}>Stock</th>
					<th onClick={() => onSort('dailyRentalRate')}>Rate</th>
					<th></th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{movies.map(movie => renderTableRow(movie, onDelete, onLike))}
			</tbody>
		</table>
	);
}

const renderTableRow = (movie, onDelete, onLike) => {
	return <tr key={movie._id}>
		<td>{movie.title}</td>
		<td>{movie.genre.name}</td>
		<td>{movie.numberInStock}</td>
		<td>{movie.dailyRentalRate}</td>
		<td><Like liked={movie.liked} onClick={() => onLike(movie)} /></td>
		<td>
			<button onClick={() => onDelete(movie)} className="btn btn-danger btn-sm">Delete</button>
		</td>
	</tr>
}

export default MoviesTable;
