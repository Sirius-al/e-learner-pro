import { FILE_UPLOADER, COURSE_BASIC_UPLOADED, GET_ALL_COURSES, GET_COURSE, LESSON_VIDEO_UPLOADER, PROGRESS, PROGRESS2, MATERIAL_FILE_UPLOADER, SET_ALERT, REMOVE_ALERT, CERIFICATE_IMAGE_UPLOADED, COURSE_LESSONS_UPLOADED, COURSE_MATERIAL_UPLOADED, COURSEFILE_DELETED, GET_COURSE_LESSONS, LESSONFILE_DELETED, COURSE_UPDATED } from '../Actions/types'

const INITIAL_STATE = {
    alert: [],
    data: {},
    certificateImg: {},
    specific_lessons: [],
    material_files: [],
    videoUploadingProgress: 0,
    materialsUploadingProgress: 0,
    lessonFiles: [],
    course: {},
    courses: []
}


export default function (state = INITIAL_STATE, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_ALERT:
            return {...state, alert: [...state.alert, payload]};
        case REMOVE_ALERT:
            return {...state, alert: state.alert.filter(alert => alert.id !== payload)};
        case FILE_UPLOADER:
            return {...state, data: payload};
        case CERIFICATE_IMAGE_UPLOADED:
            return {...state, certificateImg: payload};
        case MATERIAL_FILE_UPLOADER:
            return {...state, material_files: [...state.material_files, payload]};
        case COURSE_MATERIAL_UPLOADED:
            return {...state, material_files: []};
        case PROGRESS:
            return {...state, videoUploadingProgress: payload};
        case PROGRESS2:
            return {...state, materialsUploadingProgress: payload};
        case LESSON_VIDEO_UPLOADER:
            return {...state, lessonFiles: [...state.lessonFiles, payload]};
        case COURSE_LESSONS_UPLOADED:
            return {...state, lessonFiles: []};
        case COURSE_BASIC_UPLOADED:
            return {...state, course: payload.course};
        case GET_COURSE:
            return {...state, course: payload.course};
        case GET_ALL_COURSES:
            return {...state, courses: payload.course};
        case COURSEFILE_DELETED:
            return {...state, course: payload};
        case LESSONFILE_DELETED:
            return {...state, course: payload};
        case GET_COURSE_LESSONS:
            return {...state, specific_lessons: [...payload]};
        case COURSE_UPDATED:
            return {...state, course: payload};
        default:
            return state;
    }
}