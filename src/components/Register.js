import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../actions/userActions';

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                email: '',
                password: '',
                confirmPassword: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;

        if (user.email && user.password && user.confirmPassword) {
            if (user.password === user.confirmPassword) {
                this.props.register(user.email, user.password);
                window.location.replace('/user/login');
            }
        }
    }

    render() {
        const { registering  } = this.props;
        const { user, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Register</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={`form-group${  submitted && !user.email ? ' has-error' : ''}`}>
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control" name="email" value={user.email} onChange={this.handleChange} />
                        {submitted && !user.email &&
                          <div className="help-block">
                            <font color="red">Email is required</font>
                          </div>
                        }
                    </div>
                    <div className={`form-group${  submitted && !user.password ? ' has-error' : ''}`}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                        {submitted && !user.password &&
                          <div className="help-block">
                            <font color="red">Password is required</font>
                          </div>
                        }
                    </div>
                    <div className={`form-group${  submitted && !user.confirmPassword ? ' has-error' : ''}`}>
                        <label htmlFor="confirmPassword">Confirm password</label>
                        <input type="password" className="form-control" name="confirmPassword" value={user.confirmPassword} onChange={this.handleChange} />
                        {submitted && !user.confirmPassword &&
                            <div className="help-block">
                              <font color="red">Confirm password is required</font>
                            </div>
                        }
                        {submitted && (user.password !== user.confirmPassword) &&
                            <div className="help-block">
                              <font color="red">Confirm password does not match!</font>
                            </div>
                        }
                    </div>
                    <div className="form-group">
                        <button
                          type="submit"
                          className="btn btn-primary">Register</button>
                        {registering}
                        <Link to="/" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
}

function mapState(state) {
    const { registering } = state.registration;
    return { registering };
}

const actionCreators = {
    register: userActions.register
}

const connectedRegisterPage = connect(mapState, actionCreators)(Register);
export { connectedRegisterPage as Register };
