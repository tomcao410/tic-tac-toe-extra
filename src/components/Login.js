import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../actions/userActions';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }



    handleChange(e) {
      this.setState({ submitted: false });
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();


        this.setState({ submitted: true });
        const { userName, password } = this.state;
        if (userName && password) {
            this.props.login(userName, password);
        }
    }



    render() {
      if (localStorage.getItem('user') !== null) {
           window.location.replace('/game');
      }

        const { loginSuccess, loginFailed } = this.props;
        const { userName, password, submitted } = this.state
        return (


            <div className="limiter">
        		<div className="container-login100">
        			<div className="wrap-login100 p-l-50 p-r-50 p-t-77 p-b-30">
        				<form className="login100-form validate-form" name="form" onSubmit={this.handleSubmit}>
        					<span className="login100-form-title p-b-55">
        						Login
        					</span>

        					<div
                    className={`wrap-input100 validate-input m-b-16${  submitted && !userName ? ' has-error' : ''}`}
                    data-validate = "Valid userName is required: ex@abc.xyz">
        						<input className="input100" type="text" name="userName" placeholder="Username" value={userName} onChange={this.handleChange} />
                    <span className="focus-input100" />
        						<span className="symbol-input100">
        							<span className="lnr lnr-user" />
        						</span>
        					</div>
                  {submitted && !userName &&
                    <div className="help-block">
                      <font color="#c80000" >Username is required</font>
                      <div>&nbsp;</div>
                    </div>
                  }

        					<div className="wrap-input100 validate-input m-b-16" data-validate = "Password is required">
        						<input className="input100" type="password" name="password" placeholder="Password" value={password} onChange={this.handleChange} />
        						<span className="focus-input100" />
        						<span className="symbol-input100">
        							<span className="lnr lnr-lock" />
        						</span>
        					</div>
                  {submitted && !password &&
                    <div className="help-block">
                      <font color="#c80000" >Password is required</font>
                    </div>
                  }

                  {submitted && loginFailed && userName && password &&
                    <div className="help-block">
                      <font color="#c80000" >Your information is invalid. Please check again!</font>
                    </div>
                  }

                  {submitted && !loginSuccess && !loginFailed && userName && password &&
                    <div className="loader"/>
                  }
        					<div className="container-login100-form-btn p-t-25">
        						<button type="submit" className="login100-form-btn">
        							Login
        						</button>

        					</div>

        					<div className="text-center w-full p-t-42 p-b-22">
        						<span className="txt1">
        							Or login with
        						</span>
        					</div>

        					<a href="/auth/facebook" className="btn-face m-b-10">
        						<i className="fa fa-facebook-official" />
        						Facebook
        					</a>

        					<a href="/auth/google" className="btn-google m-b-10">
        						<img src="images/icons/icon-google.png" alt="GOOGLE" />
        						Google
        					</a>

        					<div className="text-center w-full p-t-115">
        						<span className="txt1">
        							Not a member?&nbsp;
        						</span>
                    <Link to="/user/register" className="txt1 bo1 hov1">Sign up now</Link>
        					</div>
        				</form>
        			</div>
        		</div>
        	</div>
        );
    }
}

function mapState(state) {
    const { loginSuccess, loginFailed } = state.authentication;
    return { loginSuccess, loginFailed };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(Login);
export { connectedLoginPage as Login };
