const Course = require('../CourseModel');
const Aws = require('aws-sdk');


exports.createCourse = async (req, res, next) => {
    try {
        
      const initialCourse = {
        title: req.body.title,
        teacher: req.body.teacher,
        catagory: req.body.catagory.split(','),
        description: req.body.description,
        duration: req.body.duration,
        coverImage: req.body.coverImage,
        level: req.body.level,
        requirements: req.body.requirements.split(', ' || ','),
        teacher: req.body.teacher,
        price: req.body.discountPerc && req.body.discountPerc > 0 ? Math.round(( req.body.discountPerc / 100 ) * req.body.price) : req.body.price,
        discountPerc: req.body.discountPerc,
        courseMaterials: req.body.courseMaterials,
        lessons: req.body.lessons,
        faq: req.body.faq
      }

      const course = await Course.create(initialCourse)

      res.status(200).json({
        success: true,
        course
      })
    } catch (err) {
        res.status(400).json({
            success: false,
            err
          })
    }
}

exports.editCourseDetails = async (req, res, next) => {
    try {

      const id = req.params.id;

      if (!id) {
        return res.send("No course Id Found");
      }
      
      const { title, learns, catagory, description, duration, level, requirements, teacher, price, discountPerc, courseMaterials,
        lessons, faq} = req.body

      const course = await Course.findById(id)

      if (!course) {
        return res.send("No course Found !");
      }

      const initialCourse = {}
      
      if (title) initialCourse.title = title;
      if (catagory) initialCourse.catagory = catagory;
      if (description) initialCourse.description = description;
      if (duration) initialCourse.duration = duration;
      if (level) initialCourse.level = level;
      if (requirements) initialCourse.requirements = requirements;
      if (teacher) initialCourse.teacher = teacher;
      if (price) initialCourse.price = price;
      if (discountPerc) initialCourse.discountPerc = discountPerc;
      if (courseMaterials) initialCourse.courseMaterials = courseMaterials;
      if (lessons) initialCourse.lessons = lessons;
      if (faq) initialCourse.faq = faq;
      if (learns) initialCourse.learns = learns;



      const newCourse = await Course.findOneAndUpdate( { _id: id }, { $set: initialCourse }, { new: true } )
      
     

      res.status(200).json({
        success: true,
        course: newCourse
      })
    } catch (err) {
        res.status(400).json({
            success: false,
            err
          })
    }
}

exports.getallCourses = async (req, res, next) => {
    try {
      const course = await Course.find()

      res.status(200).json({
        success: true,
        course
      })
    } catch (err) {
      res.status(400).json({
            success: false,
            err
          })
    }
}

exports.getCourse = async (req, res, next) => {
    try {
      const course = await Course.findById(req.params.id)

      res.status(200).json({
        success: true,
        course
      })
    } catch (err) {
      res.status(400).json({
            success: false,
            err
          })
    }
}

exports.addCourseMaterialbyCourseId = async (req, res, next) => {
    try {
      const course = await Course.findById(req.params.id)

      if (!course) {
        return res.status(401).json({
          success: false,
          msg: 'No course found !'
        })
        
      }

      // console.log(req.body)

      if (!req.body) {
        console.log(`courseFile Array not found !`)
      }

      course.courseMaterials.push(req.body)


      await course.save()

      res.status(200).json({
        success: true,
        course
      })
    } catch (err) {
      console.log(err)
      res.status(400).json({
            success: false,
            err
          })
    }
}

exports.deleteCourseFileS3 = async (req, res, next) => {
        const { fileDoc, id, mat_id } = req.body
        
  try {
      console.log(fileDoc)
      if (!fileDoc && !id) {
        console.log(" FileDoc and id Both are required ")
        next()
      }
      const course = await Course.findById(id)

      if (!course) {
        console.log("No Course Found !")
        next()
      }


          if (fileDoc) {
              // console.log(fileDoc)
              let s3 = new Aws.S3({
                  useAccelerateEndpoint: true,
                  accessKeyId: 'AKIAVA7RIL2ZJ4OJ4FOH',
                  secretAccessKey: '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',
                  Bucket: "the-dev-rapport"
              })

              const param = {
                  Bucket: 'the-dev-rapport',
                  Key: fileDoc.key
              }

              await s3.deleteObject(param, (err, data) => {
                  if (err) {
                      console.log(err)
                      return res.status(400).json({
                          success: true,
                          msg: "Error Removing Data from s3!",
                          Error: err
                      })
                  } else {
                      console.log('Done Deleting')
                      deleteFromDb()
                  }
              })
          } else {
            deleteFromDb()
          }

        async function deleteFromDb () {

            if (fileDoc) {
              course.courseMaterials.map((mat, i) => {
                let files = mat.courseFile;
                // console.log(files)

                const wannaDeleteFile = files.find((file, j) => file.key !== fileDoc.key)
                
                files.splice(wannaDeleteFile, 1)

              })
            }

            const mat = course.courseMaterials.filter(el => el.courseFile.length > 0)
            course.courseMaterials = mat


            console.log(course)
            await course.save()

            res.status(200).json({
              success: true,
              msg: "File Deleted Successfully !",
              course
          })
        }

  } catch (err) {
      res.status(400).json({
          success: false,
          err
      })
  }
  
}

exports.deleteLessonFileS3 = async (req, res, next) => {
        const { fileDoc, id, les_id } = req.body
        
  try {
      console.log(fileDoc)
      if (!fileDoc && !id) {
        console.log(" FileDoc and id Both are required ")
        next()
      }
      const course = await Course.findById(id)

      if (!course) {
        console.log("No Course Found !")
        next()
      }


          if (fileDoc) {
              // console.log(fileDoc)
              let s3 = new Aws.S3({
                  useAccelerateEndpoint: true,
                  accessKeyId: 'AKIAVA7RIL2ZJ4OJ4FOH',
                  secretAccessKey: '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',
                  Bucket: "the-dev-rapport"
              })

              const param = {
                  Bucket: 'the-dev-rapport',
                  Key: fileDoc.Key
              }

              await s3.deleteObject(param, (err, data) => {
                  if (err) {
                      console.log(err)
                      return res.status(400).json({
                          success: true,
                          msg: "Error Removing Data from s3!",
                          Error: err
                      })
                  } else {
                      console.log('Done Deleting')
                      deleteFromDb()
                  }
              })
          } else {
            deleteFromDb()
          }

        async function deleteFromDb () {

            if (fileDoc) {
              course.lessons.map((lesson, i) => {
                let files = lesson.lessonFile;
                // console.log(files)

                const wannaDeleteFile = files.find((file, j) => file.key !== fileDoc.key)
                
                files.splice(wannaDeleteFile, 1)

              })
            }

            const les = course.lessons.filter(el => el.lessonFile.length > 0)
            console.log(les)
            course.lessons = les


            console.log(course)
            await course.save()

            res.status(200).json({
              success: true,
              msg: "File Deleted Successfully !",
              course
          })
        }

  } catch (err) {
      res.status(400).json({
          success: false,
          err
      })
  }
  
}

exports.getCourselessonsbyCourseId = async (req, res, next) => {
    try {
      const course = await Course.findById(req.params.id)
      // console.log(course)
        
      // console.log(req.body)
      const lessons = course.lessons

      res.status(200).json({
        success: true,
        lessons
      })
    } catch (err) {
      res.status(400).json({
            success: false,
            err
          })
    }
}

exports.addCourselessonsbyCourseId = async (req, res, next) => {
    try {
      const course = await Course.findById(req.params.id)
      // console.log(course)
        
      // console.log(req.body)
      course.lessons.push(req.body)

      await course.save()

      res.status(200).json({
        success: true,
        course
      })
    } catch (err) {
      res.status(400).json({
            success: false,
            err
          })
    }
}

exports.addCoursefaqsbyCourseId = async (req, res, next) => {
    try {
      const course = await Course.findById(req.params.id)
        
      req.body.map(coursefaqs => course.faq.push(coursefaqs))

      await course.save()

      res.status(200).json({
        success: true,
        course
      })
    } catch (err) {
      res.status(400).json({
            success: false,
            err
          })
    }
}

exports.addCourseLearnbyCourseId = async (req, res, next) => {
    try {
      const course = await Course.findById(req.params.id)
        
      req.body.map(courselearn => course.learns.push(courselearn))

      await course.save()

      res.status(200).json({
        success: true,
        course
      })
    } catch (err) {
      res.status(400).json({
            success: false,
            err
          })
    }
}