import React, { Component } from 'react';
import Input from './common/input';

class LoginForm extends Component {
	state = {
		account: { username: '', password: '' },
		errors: {}
	};

	validate = () => {
		const errors = {};

		const { account } = this.state;
		if (account.username.trim() === '')
			errors.username = 'Username is required.';

		if (account.password.trim() === '')
			errors.password = 'Password is required.';
		else if (account.password.trim().length < 8)
			errors.password = 'Password must be 8 characters or longer.';

		return Object.keys(errors).length === 0 ? null : errors;
	}

	handleSubmit = e => {
		e.preventDefault();

		const errors = this.validate();
		this.setState({ errors });
		if (errors) return;

		console.log('Submitted');
	};

	handleChange = ({ currentTarget: input }) => {
		const account = { ...this.state.account };
		account[input.name] = input.value;
		this.setState({ account });
	}

	render() {
		const { account } = this.state;
		return <div>
			<h1>Login</h1>
			<form onSubmit={this.handleSubmit}>
				<Input
					autoFocus={true}
					type="text"
					name="username"
					value={account.username}
					label="Username"
					onChange={this.handleChange}
				/>
				<Input
					autoFocus={false}
					type="password"
					name="password"
					value={account.password}
					label="Password"
					onChange={this.handleChange}
				/>
				<button className="btn btn-primary">Login</button>
			</form>
		</div>;
	}
}

export default LoginForm;