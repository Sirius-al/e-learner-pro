import { FILE_UPLOADER, COURSE_BASIC_UPLOADED, GET_ALL_COURSES, COURSE_MATERIAL_UPLOADED, COURSE_LESSONS_UPLOADED, COURSE_FAQ_UPLOADED, GET_COURSE, COURSE_LEARN_UPLOADED, LESSON_VIDEO_UPLOADER, LESSON_ERROR, PROGRESS, PROGRESS2, MATERIAL_FILE_UPLOADER, SET_ALERT, REMOVE_ALERT, CERIFICATE_IMAGE_UPLOADED, COURSEFILE_DELETED, GET_COURSE_LESSONS, LESSONFILE_DELETED, COURSE_UPDATED, COURSE_UPDATED_ERROR } from './types'
import backendCall from '../utils/backendCall'
import { v4 } from 'uuid'
import axios from 'axios'

export const SetAlert = (type, message, timeout=3000) => async dispatch => {
    const id = v4();

    dispatch({ type: SET_ALERT, payload: {id, type, message} })

    setTimeout(() => {
        dispatch({ type: REMOVE_ALERT, payload: id})
    }, timeout)
  }


export const uploadfile = (file) => async dispatch => {
    try {
        const res = await backendCall.post('/upload', file, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        dispatch({ type: FILE_UPLOADER, payload: res.data })
        dispatch(SetAlert('success', "Image Uploaded !"))
        console.log(res.data)
    } catch (err) {
        dispatch(SetAlert('danger', "Image Uploading failed, PLease Try again !"))
        const error = err.response
        console.error(error)
        // dispatch({
        //   type: PROFILE_ERROR,
        //   payload: { msg: error.data.message, status: error.status }
        // })
        
    }
  }

export const uploadCoverImage = (file) => async dispatch => {
    try {
        const res = await backendCall.post('/upload/coverimage', file, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }) 
        dispatch({ type: FILE_UPLOADER, payload: res.data.file })
        dispatch(SetAlert('success', "Cover Image Uploaded !"))
        console.log(res.data)
    } catch (err) {
        dispatch(SetAlert('danger', "Image Uploading failed, PLease Try again !"))
        const error = err.response
        console.error(error)
        // dispatch({
        //   type: PROFILE_ERROR,
        //   payload: { msg: error.data.message, status: error.status }
        // })
        
    }
  }

export const uploadCertificateImage = (file) => async dispatch => {
    try {
        const res = await backendCall.post('/upload/certificate-image', file, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        dispatch({ type: CERIFICATE_IMAGE_UPLOADED, payload: res.data })
        dispatch(SetAlert('success', "Certificate Image Uploaded !"))
        console.log(res.data)
    } catch (err) {
        dispatch(SetAlert('danger', "Certificate Image Uploading failed, PLease Try again !"))
        const error = err.response
        console.error(error)
        // dispatch({
        //   type: PROFILE_ERROR,
        //   payload: { msg: error.data.message, status: error.status }
        // })
        
    }
  }
export const uploadMaterialfiles = (file, ) => async dispatch => {
    try {
        const res = await backendCall.post('/upload/materials', file, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            onUploadProgress: (progressEvent) => {
                let progress = parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total))
                
                if (progress === 100) {
                    setTimeout(() => {
                        dispatch(fileUploadProgress(0, PROGRESS2))
                    }, 2000)
                }

                dispatch(fileUploadProgress(progress, PROGRESS2))
            }
        })
        dispatch({ type: MATERIAL_FILE_UPLOADER, payload: res.data })
        dispatch(SetAlert('info', "Course Material File Uploaded"))
        console.log(res.data)
        return res.data
    } catch (err) {
        const error = err.response
        dispatch(SetAlert('Error', "Course Material File uploading Failed ! PLease try again"))
        console.error(error)
        
    }
  }
export let fileUploadProgress = (value, prog_type) => async dispatch => {
    const type = prog_type
    dispatch({ type, payload: value })
    // console.log(value)
};


export const uploadlessonsVideos = (file) => async dispatch => {
    try {
        const res = await backendCall.post('/upload/lessons', file, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            onUploadProgress: (progressEvent) => {
                let progress = parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total))
                
                if (progress === 100) {
                    setTimeout(() => {
                        dispatch(fileUploadProgress(0, PROGRESS))
                    }, 2000)
                }

                dispatch(fileUploadProgress(progress, PROGRESS))
            }
        })
        dispatch({ type: LESSON_VIDEO_UPLOADER, payload: res.data.file })
        dispatch(SetAlert('success', "Lesson's Video Uploaded !"))
        console.log(res.data)
        return res.data
    } catch (err) {
        dispatch({ type: LESSON_ERROR })
        dispatch(SetAlert('Error', "lesson's video uploading failed ! PLease try again"))
        // const error = err.response
        console.error(err)
        
        
    }
}


export const deleteCourseFile = (fileDoc, courseId, material_files_id) => async dispatch => {
    try {
        const res = await backendCall.post('/delete/course-file', { fileDoc, id: courseId, mat_id: material_files_id} )
        
        dispatch({ type: COURSEFILE_DELETED, payload: res.data.course })
        dispatch(SetAlert('success', "File SuccessFully deleted"))
        console.log(res.data)
        return res.data
    } catch (err) {
        dispatch({ type: LESSON_ERROR })
        dispatch(SetAlert('Error', "Course's File Deletion failed ! PLease try again"))
        // const error = err.response
        console.error(err)
            
    }
}


export const updateCourse = (docs, id) => async dispatch => {
    try {
        const res = await backendCall.patch(`/course/edit/${id}`, docs )
        
        dispatch({ type: COURSE_UPDATED, payload: res.data.course })
        dispatch(SetAlert('success', "Course SuccessFully Updated !"))
        console.log(res.data)
        return res.data
    } catch (err) {
        dispatch({ type: COURSE_UPDATED_ERROR, payload: err.response})
        dispatch(SetAlert('Error', "Course's Update failed ! PLease try again !"))
        // const error = err.response
        console.error(err)
    }
}


export const deleteLessonFile = (fileDoc, courseId, lesson_files_id) => async dispatch => {
    try {
        const res = await backendCall.post('/delete/lesson-file', { fileDoc, id: courseId, les_id: lesson_files_id} )
        
        dispatch({ type: LESSONFILE_DELETED, payload: res.data.course })
        dispatch(SetAlert('success', "File SuccessFully deleted"))
        console.log(res.data)
        return res.data
    } catch (err) {
        dispatch({ type: LESSON_ERROR })
        dispatch(SetAlert('Error', "lesson's File Deletion failed ! PLease try again"))
        // const error = err.response
        console.error(err)
            
    }
}


export const getCourseLessonsByCourseId = (id) => async dispatch => {
    try {
        const res = await backendCall.get(`/course/course-lesson/${id}`)
        
        dispatch({ type: GET_COURSE_LESSONS, payload: res.data.lessons })
        // console.log(res.data)
        return res.data
    } catch (err) {
        dispatch({ type: LESSON_ERROR })
        dispatch(SetAlert('Error', "something is going wrong. Please try refreshing the page !"))
        // const error = err.response
        console.error(err)
            
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
        dispatch(SetAlert('success', 'New Course Created !'))
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
        dispatch(SetAlert('success', "course materials submitted successfully"))
        dispatch(getCourse(id))
        // console.log(res.data)
        
    } catch (err) {
        const error = err.response
        dispatch(SetAlert('error', "course materials submisson failed Please refresh the page"))
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
        dispatch(SetAlert('success', "course lessons submitted successfully"))
        dispatch(getCourse(id))
        // console.log(res.data)
        
    } catch (err) {
        const error = err.response
        dispatch(SetAlert('error', "course lessons submisson failed Please refresh the page"))
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
        dispatch(getCourse(id))
        dispatch(SetAlert('success', "faqs submitted successfully"))
        // console.log(res.data)
        
    } catch (err) {
        const error = err.response
        dispatch(SetAlert('danger', "course faqs submisson failed Please refresh the page"))
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
        dispatch(SetAlert('success', "course learns submitted successfully !"))
        dispatch(getCourse(id))
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