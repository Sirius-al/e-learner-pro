import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from "prop-types";

import { getAllCourses } from './Actions/actions'

import MainFormPart from './components/MainFormPart'
import AddLearns from './components/edit-course/addLearns'
// import Materials from './components/Materials'
// import Materials from './components/Materials'
import CourseCard from './components/courseCard'
import Course from './components/course/Course'
import Main from './components/Dumb Folder/main'
import EditCourse from './components/edit-course/EditCourse'


  


const App = ({ getAllCourses, courses }) => {
  
  useEffect(() => {
    getAllCourses()
  }, [getAllCourses])

  // const card = (courses) => {
  //   console.log(courses)
  //   if (courses) {
  //     courses.map(course => <CourseCard course={course}/>)
  //   }
  // }

  return (
    <BrowserRouter>
      <div className="container mt-4">
        <Route exact path="/">
        <MainFormPart />
        <div className="row">
          {courses && courses.map((course, i) => <CourseCard key={i} course={course}/>)}
        </div>
        </Route>

        <Switch>
          <Route path='/add-learns/:id' component={AddLearns}/>
          <Route path='/view-course/:id' component={Course}/>
          <Route path='/edit-course/:id' component={EditCourse}/>
          <Route path='/dumb' component={Main}/>
        </Switch>
        
      </div>
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
