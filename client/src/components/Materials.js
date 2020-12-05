import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { v4 } from 'uuid'
import { useParams } from 'react-router-dom';
import CourseMaterial from './courseMaterials'
import CourseLesson from './CourseLesson'
import CourseFaq from './CourseFaq'
import CourseLearn from './CourseLearn'

const Materials = () => {

    const { id } = useParams()


    return (
        <div>

        <h3 className="text-center text-dark text-uppercase"><strong>What Students will learn from this course</strong></h3>
        <CourseLearn id={id}/>
        <br/>
        <h3 className="text-center text-dark text-uppercase"><strong>Course Materials</strong></h3>
        <CourseMaterial id={id}/>
        <br/>
        <h3 className="text-center text-dark text-uppercase"><strong>Course lessons</strong></h3>
        <CourseLesson id={id}/>
        <br/>
        <h3 className="text-center text-dark text-uppercase"><strong>Course Faqs</strong></h3>
        <CourseFaq id={id}/>

        {/* <Button
        className="mb-5"
        variant="contained"
        color="primary"
        // className={classes.button}
        startIcon={<AddCircleIcon />}
        >
        Add a Course material Section
        </Button> */}
        </div>
    )
}

export default Materials
