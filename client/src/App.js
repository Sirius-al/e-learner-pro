import React, { Fragment, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from "prop-types";

import { getAllCourses } from './Actions/actions'

import Dropzone from './components/mainformPart/DropZone'
import MainFormPart from './components/MainFormPart'
import AddLearns from './components/edit-course/addLearns'
import AddFaq from './components/edit-course/AddFaq'
import AddLessonsAndMaterials from './components/edit-course/addLessonsAndMaterials'
import CourseCard from './components/courseCard'
import Course from './components/course/Course'
import Main from './components/Dumb Folder/main'
import EditCourse from './components/edit-course/EditCourse'
import Video_main from './components/Video_play/Video_main';
import CourseDetailsEdit from './components/edit-course/CourseDetailsEdit';
import Alert from './utils/alert';


  


const App = ({ getAllCourses, courses }) => {
  
  useEffect(() => {
    getAllCourses()
  }, [getAllCourses])


  return (
    <BrowserRouter>
      <Fragment>
      <Route exact path='/dumb' component={Main}/>
        <div className="container mt-4">
          <Alert />
          <Route exact path="/">
            <MainFormPart />
            <div className="row">
              {courses && courses.map((course, i) => <CourseCard key={i} course={course}/>)}
            </div>
          </Route>

          <Switch>
            <Route path='/experimental' component={Dropzone}/>

            <Route path='/add-learns/:id' component={AddLearns}/>
            <Route path='/add-lessons/:id' component={AddLessonsAndMaterials}/>
            <Route path='/add-faq/:id' component={AddFaq}/>
            <Route path='/view-course/:id' component={Course}/>
            <Route path='/edit-course/:id' component={EditCourse}/>
            <Route path='/edit-course-details/:id' component={CourseDetailsEdit}/>
          </Switch>
        </div>
            <Route path='/view-lesson/:courseId/:videoId?' component={Video_main}/>

            
      </Fragment>
    </BrowserRouter>
  )
}

App.propTypes = {
  courses: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  courses: state.datas.courses
})

export default connect(mapStateToProps, { getAllCourses })(App);
