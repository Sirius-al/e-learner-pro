const mongoose = require('mongoose');

// const Lessons = require('./lessonsModel');

const CourseSchema = new mongoose.Schema({
    title: {
        type: String
    },
    teacher: String,
    catagory: {
        type: [String]
    },
    description: String,
    duration: {
        type: String
    },
    coverImage: Object,
    level: {
        type: String
    },
    requirements: [String],
    teacher: {
        type: String
    },
    price: {
        type: Number
    },
    discountPerc: {
        type: Number,
        default: 0
    },
    learns: [
        {
            learnTitle: String,
            learnDescription: String
        }
    ],
    courseMaterials: [
        {
            courseFile: [Object],
            courseFileTitle: String
        }
    ],
    lessons: [
        {
            lessonTitle: String,
            lessonFile: [Object]
        }
    ],
    faq: [
        {
            question: String,
            answer: String
        }
    ],
    // announcement: String,
    CreatedAt: {
        type: Date,
        Default: Date.now(),
        select: false
    }
})




const course = mongoose.model('course', CourseSchema);

module.exports = course;