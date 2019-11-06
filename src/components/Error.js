import React from 'react';

class Error extends React.Component {


    render() {



        return (

            <div className="limiter">
        		<div className="container-login100">
        			<div className="wrap-login100 p-l-50 p-r-50 p-t-77 p-b-30">
        				<form className="login100-form validate-form" name="form" onSubmit={this.handleSubmit}>
        					<span className="login100-form-title p-b-55">
        						Error 404: Page not found
        					</span>
        				</form>
        			</div>
        		</div>
        	</div>
        );
    }
}

export default Error;
