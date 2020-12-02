import React from 'react';

const Select = ({ name, label, error, ...rest }) => {
	return (
		<div className="form-group">
			<label htmlFor={name}>{label}</label>
			<select
				{...rest}
				id={name}
				name={name}
				className="form-control"
			>
                <option value="">temp</option>
            </select>
			{error && <div className="alert alert-danger">{error}</div>}
		</div>
	);
}

export default Select;