

const apiUrl = 'https://tic-tac-toe-extra.herokuapp.com'

export const userService = {
    login,
    logout,
    register,
    facebookLogin
};

function login(userName, password) {
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ userName, password })
    };

    return fetch(`${apiUrl}/user/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));


            return user;
        });
}

function facebookLogin() {
    const requestOptions = {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json'}
    };

    return fetch(`${apiUrl}/auth/facebook`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));


            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    window.location.replace('/');
}


function register(userName, password) {
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userName, password})
    };

    return fetch(`${apiUrl}/user/register`, requestOptions).then(handleResponse);
}


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                localStorage.removeItem('user');
            }


            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
