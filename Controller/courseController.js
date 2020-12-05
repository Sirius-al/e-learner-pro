const Course = require('../CourseModel');


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

      req.body.map(coursematerial => course.courseMaterials.push(coursematerial))

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

exports.addCourselessonsbyCourseId = async (req, res, next) => {
    try {
      const course = await Course.findById(req.params.id)
        
      req.body.map(courselessons => course.lessons.push(courselessons))

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