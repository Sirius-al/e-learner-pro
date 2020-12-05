import { FILE_UPLOADER, COURSE_BASIC_UPLOADED, GET_ALL_COURSES, COURSE_MATERIAL_UPLOADED, COURSE_LESSONS_UPLOADED, COURSE_FAQ_UPLOADED, GET_COURSE, COURSE_LEARN_UPLOADED, } from './types'
import backendCall from '../utils/backendCall'

export const uploadfile = (file) => async dispatch => {
    try {
        const res = await backendCall.post('/upload', file, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        dispatch({ type: FILE_UPLOADER, payload: res.data })
        console.log(res.data)
    } catch (err) {
        const error = err.response
        console.error(error)
        // dispatch({
        //   type: PROFILE_ERROR,
        //   payload: { msg: error.data.message, status: error.status }
        // })
        
    }
  }

export const submitCourseBasics = (data) => async dispatch => {
    try {
        const res = await backendCall.post('/course', data, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch({ type: COURSE_BASIC_UPLOADED, payload: res.data })
        dispatch(getAllCourses())
        // console.log(res.data)
  
    } catch (err) {
        const error = err.response
        console.error(error)
        // dispatch({
        //   type: PROFILE_ERROR,
        //   payload: { msg: error.data.message, status: error.status }
        // })
        
    }
  }

export const submitCourseMaterial = (id, data) => async dispatch => {
    try {
        const res = await backendCall.patch(`/course/course-materials/${id}`, data, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch({ type: COURSE_MATERIAL_UPLOADED, payload: res.data })
        // console.log(res.data)
        
    } catch (err) {
        const error = err.response
        console.error(error)
        // dispatch({
        //   type: PROFILE_ERROR,
        //   payload: { msg: error.data.message, status: error.status }
        // })
        
    }
  }


export const submitCourseLessons = (id, data) => async dispatch => {
    try {
        const res = await backendCall.patch(`/course/course-lessons/${id}`, data, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch({ type: COURSE_LESSONS_UPLOADED, payload: res.data })
        // console.log(res.data)
  
    } catch (err) {
        const error = err.response
        console.error(error)
        // dispatch({
        //   type: PROFILE_ERROR,
        //   payload: { msg: error.data.message, status: error.status }
        // })
        
    }
  }

export const submitCoursefaq = (id, data) => async dispatch => {
    try {
        const res = await backendCall.patch(`course/course-faq/${id}`, data, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch({ type: COURSE_FAQ_UPLOADED, payload: res.data })
        // console.log(res.data)
  
    } catch (err) {
        const error = err.response
        console.error(error)
        // dispatch({
        //   type: PROFILE_ERROR,
        //   payload: { msg: error.data.message, status: error.status }
        // })
        
    }
  }

export const submitCourseLearn = (id, data) => async dispatch => {
    try {
        const res = await backendCall.patch(`course/course-learn/${id}`, data, {
            headers: {
                "Content-Type": "application/json"
            }
        }) 
        dispatch({ type: COURSE_LEARN_UPLOADED, payload: res.data })
        // console.log(res.data)
  
    } catch (err) {
        const error = err.response
        console.error(error)
        // dispatch({
        //   type: PROFILE_ERROR,
        //   payload: { msg: error.data.message, status: error.status }
        // })
        
    }
  }


export const getCourse = (id) => async dispatch => {
    try {
        const res = await backendCall.get(`course/${id}`)
        dispatch({ type: GET_COURSE, payload: res.data })
        // console.log(res.data)
  
    } catch (err) {
        const error = err.response
        console.error(error)
        // dispatch({
        //   type: PROFILE_ERROR,
        //   payload: { msg: error.data.message, status: error.status }
        // })
        
    }
  }


export const getAllCourses = () => async dispatch => {
    try {
        const res = await backendCall.get('/courses')
        dispatch({ type: GET_ALL_COURSES, payload: res.data})
        // console.log(res.data)
  
    } catch (err) {
        const error = err.response
        console.error(error)
        // dispatch({
        //   type: PROFILE_ERROR,
        //   payload: { msg: error.data.message, status: error.status }
        // })
        
    }
  }