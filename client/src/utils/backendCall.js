const axios = require('axios');

export default axios.create({
    baseURL: 'http://localhost:5000'
})

//* https://e-learner-pro.herokuapp.com