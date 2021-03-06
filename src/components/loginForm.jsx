import React from 'react';
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
	};

	doSubmit = () => {
		console.log('Submitted');
	};

	render() {
		return <div>
			<h1>Login</h1>
			<form onSubmit={this.handleSubmit}>
				{this.renderInput('username', 'Username', true)}
				{this.renderInput('password', 'Password', false, 'password')}
				{this.renderButton('Login')}
			</form>
		</div>;
	};
}

export default LoginForm;