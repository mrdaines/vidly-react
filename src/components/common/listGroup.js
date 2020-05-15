import React from 'react';
import PropTypes from 'prop-types';

const ListGroup = props => {
	const { items, textProperty, valueProperty, selectedItem, onItemSelect } = props;

	return (
		<ul className="list-group">
			<li className="list-group-item">All Genres</li>
			{items.map(item => (
				<li
					key={item[valueProperty]}
					className={item === selectedItem ? 'list-group-item active' : 'list-group-item'}
					onClick={() => { onItemSelect(item) }}
				>
					{item[textProperty]}
				</li>
			))}
		</ul>
	);
};

ListGroup.defaultProps = {
	textProperty: "name",
	valueProperty: "_id"
};

ListGroup.propTypes = {
	items: PropTypes.array.isRequired,
	selectedItem: PropTypes.object.isRequired,
	textProperty: PropTypes.string.isRequired,
	valueProperty: PropTypes.string.isRequired,
	onItemSelect: PropTypes.func.isRequired
};

export default ListGroup;