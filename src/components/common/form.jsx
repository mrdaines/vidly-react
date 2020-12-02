import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './input';

class Form extends Component {
    state = {
        date: {},
        errors: {}
    };

    validate = () => {
		const options = { abortEarly: false };
		const { error } = Joi.validate(this.state.data, this.schema, options);
		if (!error) return null;

		const errors = {};
		for (let item of error.details) {
			errors[item.path[0]] = errors[item.path[0]] ?
				errors[item.path[0]] + " AND " + item.message :
				item.message;
		}
		return errors;
	};

	validateProperty = ({ name, value }) => {
		const obj = { [name]: value };
		const options = { abortEarly: false };
		const schema = { [name]: this.schema[name] };

		const { error } = Joi.validate(obj, schema, options);

		return error ? error.details[0].message : null;
	};

    handleSubmit = e => {
		e.preventDefault();

		const errors = this.validate();
		this.setState({ errors: errors || {} });
		if (errors) return;

		this.doSubmit();
	};

    handleChange = ({ currentTarget: input }) => {
		const errors = { ...this.state.errors };
		const errorMessage = this.validateProperty(input);

		if (errorMessage)
			errors[input.name] = errorMessage;
		else
			delete errors[input.name];

		const data = { ...this.state.data };
		data[input.name] = input.value;

		this.setState({ data, errors });
	};

    renderButton(label) {
        return <button disabled={this.validate()} className="btn btn-primary">{label}</button>
    };

    renderInput(name, label, autoFocus, type = 'text'){
        const { data, errors } = this.state;

        return (
        <Input
            autoFocus={autoFocus}
            type={type}
            name={name}
            value={data[name]}
            label={label}
            onChange={this.handleChange}
            error={errors[name]}
        />
        );
    };
}

export default Form;
