const axios = require('axios');

export default axios.create({
    baseURL: 'https://course-upload3.herokuapp.com'// http://localhost:5000 // https://course-uploader2.herokuapp.com/
})