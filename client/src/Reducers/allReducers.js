import { FILE_UPLOADER, COURSE_BASIC_UPLOADED, GET_ALL_COURSES, GET_COURSE, LESSON_VIDEO_UPLOADER, PROGRESS } from '../Actions/types'
const INITIAL_STATE = {
    data: {},
    videoUploadingProgress: 0,
    lessonFiles: [],
    course: {},
    courses: []
}


export default function (state = INITIAL_STATE, action) {
    const { type, payload } = action;

    switch (type) {
        case FILE_UPLOADER:
            return {...state, data: payload};
        case PROGRESS:
            return {...state, videoUploadingProgress: payload};
        case LESSON_VIDEO_UPLOADER:
            return {...state, lessonFiles: [...state.lessonFiles, payload]};
        case COURSE_BASIC_UPLOADED:
            return {...state, course: payload.course};
        case GET_COURSE:
            return {...state, course: payload.course};
        case GET_ALL_COURSES:
            return {...state, courses: payload.course};
        default:
            return state;
    }
}