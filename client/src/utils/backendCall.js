const axios = require('axios');

export default axios.create({
    baseURL: 'https://course-upload.herokuapp.com'// http://localhost:5000 // https://course-upload.herokuapp.com/
})