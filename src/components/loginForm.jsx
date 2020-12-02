import React, { Component } from 'react';
import Input from './common/input';
import Joi from 'joi-browser';
import Form from './common/form';

class LoginForm extends Form {
	state = {
		data: { username: '', password: '' },
		errors: {}
	};

	schema = {
		username: Joi.string().required().label("Username"),
		password: Joi.string().required().min(8).label("Password")
	}

	doSubmit = () => {
		console.log('Submitted');
	}

	render() {
		const { data, errors } = this.state;
		return <div>
			<h1>Login</h1>
			<form onSubmit={this.handleSubmit}>
				<Input
					autoFocus={true}
					type="text"
					name="username"
					value={data.username}
					label="Username"
					onChange={this.handleChange}
					error={errors.username}
				/>
				<Input
					autoFocus={false}
					type="password"
					name="password"
					value={data.password}
					label="Password"
					onChange={this.handleChange}
					error={errors.password}
				/>
				<button
					disabled={this.validate()}
					className="btn btn-primary">Login</button>
			</form>
		</div>;
	}
}

export default LoginForm;