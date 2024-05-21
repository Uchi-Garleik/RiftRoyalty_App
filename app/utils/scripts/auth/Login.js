import Environment from '../../constants/Environment';

export const checkLogin = (params) => {
    const username = params.username;
    const password = params.password;
    const url = Environment.USERS_API + '/auth/?username=' + username + '&password=' + password;
    return fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then(response => { return response.json() })
        .then(json => { return json.msg; })
        .catch(error => console.log(error));
}