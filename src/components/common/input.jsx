import React from 'react';

const Input = ({ name, label, value, type, onChange, autoFocus }) => {
	return (
		<div className="form-group">
			<label htmlFor={name}>{label}</label>
			<input
				autoFocus={autoFocus}
				value={value}
				onChange={onChange}
				id={name}
				name={name}
				type={type}
				className="form-control"
			/>
		</div>
	);
}

export default Input;