const axios = require('axios');

export default axios.create({
    baseURL: 'http://localhost:5000'// http://localhost:5000 // https://course-upload.herokuapp.com/
})