import React, { Component } from 'react';

class Pagination extends Component {

	render() {
		return (
			<nav aria-label="Page navigation">
				<ul className="pagination">
					{this.buildPages()}
				</ul>
			</nav>

		);
	}

	buildPages = () => {
		let pages = [];

		for (let i = 1; i <= this.props.totalPages; i++) {
			let classes = "page-item";
			if (i === this.props.activePage) classes += ' active';

			pages.push(<li key={i} className={classes} onClick={() => this.props.onPageSelect(i)}>
				<a className="page-link" href="#">{i}</a>
			</li>);
		}
		return pages;
	}
}

export default Pagination;