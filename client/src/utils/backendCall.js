const axios = require('axios');

export default axios.create({
    baseURL: 'https://course-upload.herokuapp.com/'
})