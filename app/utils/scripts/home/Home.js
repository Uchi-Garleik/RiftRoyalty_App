import Environment from '../../constants/Environment';

export const getTop5Players = async (region) => {
    const URL = `${Environment.RR_API}/summoner/top-players-world?region=${region}`;
    const response = await fetch(URL, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    }).then(response => { return response.json() })
    .then(json => { return json;})

}