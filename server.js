const express = require('express');
const fileupload = require('express-fileupload');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');


const courseController = require('./Controller/courseController');

const app = express();
const Port = process.env.PORT || 5000

app.use(express.json())
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}))

dotenv.config({
    path: path.resolve(__dirname, '.env')
})


const ConnectToDatabase = async () => {
    try {
      await mongoose.connect(process.env.MONGOURI, {
          useFindAndModify: false,
          useCreateIndex: true,
          useNewUrlParser: true,
          useUnifiedTopology: true
      })
      console.log(`Database connected successfully`)
    } catch (err) {
        console.warn(`Database error: ${err}`)
      
    }
}
ConnectToDatabase() 

var corsOptions = {
    // "Access-Control-Allow-Origin": '*',
    origin: [`http://localhost:3000`, 'https://course-upload.herokuapp.com/'],
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))



app.post('/upload', (req, res) => {
    if (res.files === null) {
        return res.status(400).json({msg: "no file was uploaded"})
    }

    const file = req.files.file

    console.log(file)

    file.mv(`${__dirname}/client/src/FILES/${file.name}`, (err) => {
        if (err) {
            console.error(err)
            return res.status(500).send(err)
        }

        res.status(200).json({
            filename: file.name,
            filepath: `FILES/${file.name}`
        })
    })
});

app.get('/courses', courseController.getallCourses);
app.get('/course/:id', courseController.getCourse);
app.post('/course', courseController.createCourse);
app.patch('/course/course-materials/:id', courseController.addCourseMaterialbyCourseId);
app.patch('/course/course-lessons/:id', courseController.addCourselessonsbyCourseId);
app.patch('/course/course-faq/:id', courseController.addCoursefaqsbyCourseId);
app.patch('/course/course-learn/:id', courseController.addCourseLearnbyCourseId);

//! serve static assets in production

if (process.env.NODE_ENV === 'production') {
    //* set static folder
    app.use(express.static('client/build'))
  
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
  }

app.use('*', (req, res) => {
    res.send('just demi')
});

app.listen(Port, () => {
    console.log(`Server Running on port ${Port}!`);
});

//! Unhandled Rejection ERROR
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err}`)
    console.log('ERROR_Stack:::', err.stack)
    console.log(`Unhandled Rejection, Shutting Down the Server... 😟😟😟😟😟`);
    server.close(() => {
        process.exit(1)
    })
})