const express = require('express');
const fileupload = require('express-fileupload');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const os = require('os');
const Aws = require('aws-sdk');
// const cookieParser = require('cookie-parser');



const courseController = require('./Controller/courseController');

const app = express();
const Port = process.env.PORT || 5000

app.use(express.json())
// app.use(cookieParser())

app.use(fileupload({
    useTempFiles: true,
    tempFileDir: "./tmp"
}))

dotenv.config({
    path: path.resolve(__dirname, '.env')
})


const ConnectToDatabase = async () => {
    try {
      await mongoose.connect(process.env.MONGOURI, {
          family: 4,
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
    origin: [`http://localhost:3000`, 'https://e-learner-pro.herokuapp.com'],
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))



app.post('/upload/certificate-image', (req, res) => {
    if (res.files === null) {
        return res.status(400).json({msg: "no file was uploaded"})
    }

    const file = req.files.file

    console.log(file)

    file.mv(path.join(__dirname, 'FILES', 'certificateImage', `${file.name}`), (err) => { // `${__dirname}/client/build/certificateImage/${file.name}`, 
        if (err) {
            console.error(err)
            return res.status(500).send(err)
        }

        res.status(200).json({
            filename: file.name,
            filepath: `certificateImage/${file.name}`
        })
    })
});

app.post('/upload/coverimage', async (req, res, next) => {
    try {
        if (req.files.coverImage) {
            const theFile = req.files.coverImage
            console.log(theFile)
            // console.log(fs.statSync(`${__dirname}\\${theFile.tempFilePath}`))
            
            // let response;

            if (theFile) {
                let s3 = new Aws.S3({
                    useAccelerateEndpoint: true,
                    accessKeyId: 'AKIAVA7RIL2ZJ4OJ4FOH',
                    secretAccessKey: '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',
                    Bucket: "the-dev-rapport"
                })
                
                const param = {
                    Bucket: 'the-dev-rapport',
                    Key: `images/${Date.now()}__${theFile.name}`,
                    Body: fs.readFileSync(`./\\${theFile.tempFilePath}`),
                    ContentType: theFile.mimetype,
                    ACL: 'public-read'
                }
                    
                    await s3.upload(param, (err, data) => {
                        if (err) {
                            console.log(err)
                            return res.status(400).json({
                                success: true,
                                Error: err
                            })
                        } else {
                            const newObj = {...data, type: theFile.mimetype, originalName: theFile.name, size: theFile.size}
                            fs.unlinkSync(`${__dirname}\\${theFile.tempFilePath}`)
                            console.log('data =:> ', newObj)
                            return res.status(200).json({
                                success: true,
                                file: newObj
                            })
                        }
                    })
                    
            }
        }
        
    } catch (err) {
        res.status(400).json({
            success: false,
            err
        })
    }
});


app.post('/upload/lessons', async (req, res, next) => {
    
    try {
        if (req.files.courseFile) {
            const theFile = req.files.courseFile
            console.log(theFile)
            // console.log(fs.statSync(`${__dirname}\\${theFile.tempFilePath}`))

            // let response;

            if (theFile) {
                let s3 = new Aws.S3({
                    useAccelerateEndpoint: true,
                    accessKeyId: 'AKIAVA7RIL2ZJ4OJ4FOH',
                    secretAccessKey: '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',
                    Bucket: "the-dev-rapport"
                })

                const param = {
                    Bucket: 'the-dev-rapport',
                    Key: `${Date.now()}__${theFile.name}`,
                    Body: fs.readFileSync(`${__dirname}\\${theFile.tempFilePath}`),
                    // Body: `./tmp/1. What You Will Learn in Level 1.mp4`,
                    ContentType: theFile.mimetype,
                    ACL: 'public-read'
                }


                
                // const reading = fs.statSync(`${__dirname}\\${theFile.tempFilePath}`)
                
                // if (theFile.size === reading.size) {

                    await s3.upload(param, (err, data) => {
                        if (err) {
                            console.log(err)
                            return res.status(400).json({
                                success: true,
                                Error: err
                            })
                        } else {
                            const newObj = {...data, type: theFile.mimetype, originalName: theFile.name, size: theFile.size}
                            fs.unlinkSync(`${__dirname}\\${theFile.tempFilePath}`)
                            console.log('data =:> ', newObj)
                            return res.status(200).json({
                                success: true,
                                file: newObj
                            })
                        }
                    })
                    
                // }
                // console.log(res)
            }
        }

    } catch (err) {
        res.status(400).json({
            success: false,
            err
        })
    }
    
});


app.post('/upload/materials', async (req, res, next) => {

    try {
        if (req.files.courseFile) {
            const theFile = req.files.courseFile
            console.log(theFile)
            // console.log(fs.statSync(`${__dirname}\\${theFile.tempFilePath}`))
            
            // let response;

            if (theFile) {
                let s3 = new Aws.S3({
                    useAccelerateEndpoint: true,
                    accessKeyId: 'AKIAVA7RIL2ZJ4OJ4FOH',
                    secretAccessKey: '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',
                    Bucket: "the-dev-rapport"
                })
                
                const param = {
                    Bucket: 'the-dev-rapport',
                    Key: `documents/${Date.now()}__${theFile.name}`,
                    Body: fs.readFileSync(`${__dirname}\\${theFile.tempFilePath}`),
                    // Body: `./tmp/1. What You Will Learn in Level 1.mp4`,
                    ContentType: theFile.mimetype,
                    ACL: 'public-read'
                }
                

                
                // const reading = fs.statSync(`${__dirname}\\${theFile.tempFilePath}`)
                
                // if (theFile.size === reading.size) {
                    
                    await s3.upload(param, (err, data) => {
                        if (err) {
                            console.log(err)
                            return res.status(400).json({
                                success: true,
                                Error: err
                            })
                        } else {
                            const newObj = {...data, type: theFile.mimetype, originalName: theFile.name, size: theFile.size}
                            fs.unlinkSync(`${__dirname}\\${theFile.tempFilePath}`)
                            console.log('data =:> ', newObj)
                            return res.status(200).json({
                                success: true,
                                file: newObj
                            })
                        }
                    })
                    
                // }
                // console.log(res)
            }
        }
        
    } catch (err) {
        res.status(400).json({
            success: false,
            err
        })
    }
});

app.post('/upload', (req, res) => {
    if (res.files === null) {
        return res.status(400).json({msg: "no file was uploaded"})
    }
    
    const file = req.files.file
    
    console.log(file)
    
    file.mv(path.join(__dirname, 'FILES', `${file.name}`), (err) => { // `${__dirname}/client/build/FILES/${file.name}`
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
app.get('/course/course-lesson/:id', courseController.getCourselessonsbyCourseId);
app.patch('/course/edit/:id', courseController.editCourseDetails);
app.patch('/course/course-materials/:id', courseController.addCourseMaterialbyCourseId);
app.patch('/course/course-lessons/:id', courseController.addCourselessonsbyCourseId);
app.patch('/course/course-faq/:id', courseController.addCoursefaqsbyCourseId);
app.patch('/course/course-learn/:id', courseController.addCourseLearnbyCourseId);
app.post('/delete/course-file', courseController.deleteCourseFileS3);
app.post('/delete/lesson-file', courseController.deleteLessonFileS3);

//! serve static assets in production

if (process.env.NODE_ENV === 'production') {
    //* set static folder
    app.use(express.static('client/build'))
  
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });

    var dir = './tmp';

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
}
if (process.env.NODE_ENV === 'development') {
    //* set static folder
    app.use(express.static('client/public'))

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