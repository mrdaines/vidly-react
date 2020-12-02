import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';

class RegisterForm extends Form {
	state = {
		data: { username: '', password: '', name: '' },
		errors: {}
	};

	schema = {
		username: Joi.string().email().required().label("Username"),
		password: Joi.string().required().min(8).label("Password"),
		name: Joi.string().required().label("Name"),
	};

	doSubmit = () => {
		console.log('Submitted');
	};

	render() {
		return <div>
			<h1>Register</h1>
			<form onSubmit={this.handleSubmit}>
				{this.renderInput('username', 'Username', true)}
				{this.renderInput('password', 'Password', false, 'password')}
                {this.renderInput('name', 'Name', false)}
				{this.renderButton('Register')}
			</form>
		</div>;
	};
}

export default RegisterForm;