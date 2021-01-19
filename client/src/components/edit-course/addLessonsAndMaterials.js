import React, { Fragment, useEffect } from 'react'

import Addlessons from './edc-compos/Addlessons';
import Addmaterials from './edc-compos/Addmaterials';
import { getCourse, deleteCourseFile, deleteLessonFile } from '../../Actions/actions';

import { connect } from 'react-redux'
import { Link, useParams } from "react-router-dom"


const AddLessonsAndMaterials = ({ getCourse, course, deleteCourseFile, deleteLessonFile }) => {
    
    const { id } = useParams()

    useEffect(() => {
        getCourse(id)
    }, [getCourse])


    //! >>>>>>>>>>>>>>>>>>>>>>> Functions
    //! >>>>>>>>>>>>>>>>>>>>>>> Functions
    //! >>>>>>>>>>>>>>>>>>>>>>> Functions
    function onCourseFileCross(file, id) {

        deleteCourseFile(file, id)
    }

    function onLessonFileCross(file, id) {

        // console.log(file, id)
        deleteLessonFile(file, id)
    }

    function onFolderDelete(material_files, course_id) {

        let i = 0;
        console.log(material_files, course_id)
        
        function myLoop() {
                    console.log("material_files => ", material_files)
                
                    setTimeout( async () => {
                console.log("THE FILE IT_SELF => ", material_files.courseFile[i]);
                
                const res = await deleteCourseFile(material_files.courseFile[i], course_id, material_files.courseFile[i])
                
                i++;
                //* keep deleting files one after another
                if (i < material_files.courseFile.length && res) { //  && res.status === 200 || res.status === 304
                    myLoop();
                }
            }, 1000)

        }
        
        myLoop();
    }
    function onFolderDelete2(lesson_files, course_id) {
        
        let i = 0;
        console.log(lesson_files, course_id)
            
        function myLoop() {
                console.log("lesson_files => ", lesson_files)
                
                setTimeout( async () => {
                console.log("THE FILE IT_SELF => ", lesson_files.lessonFile[i]);
                
                const res = await deleteLessonFile(lesson_files.lessonFile[i], course_id, lesson_files.lessonFile[i])
                
                i++;
                //* keep deleting files one after another
                if (i < lesson_files.lessonFile.length && res) { //  && res.status === 200 || res.status === 304
                    myLoop();
                }
            }, 1000)

        }
        
        myLoop();
    }




    const { _id, lessons, courseMaterials, duration } = course;


    //! ============================== Component return Statement =====================================
    //! ============================== Component return Statement =====================================
    //! ============================== Component return Statement =====================================
    return (
        <Fragment>
            <Addmaterials id={id} />
            <Addlessons id={id} />
            <hr/>

            <Fragment>
                <div className="intro_title">
                    <h2>Course Materials</h2>
                    <ul>
                        <li>{courseMaterials && courseMaterials.length} Course Materials</li>
                    </ul>
                </div>
                <div id="accordion_lessons" role="tablist" className="add_bottom_45">

                    {courseMaterials && (<div className="card">
                            <div className="card-header" role="tab" id="headingOne">
                            <h4 className="mb-0">
                                <a
                                data-toggle="collapse"
                                href={`#collapseOne`}
                                aria-expanded="false"
                                aria-controls={`collapseOne`}
                                >
                                <i className="indicator ti-plus text-secondary" /> COURSE MATERIALS
                                </a>
                            </h4>
                            </div>
                            <div
                            id={`collapseOne`}
                            className="collapse show"
                            role="tabpanel"
                            aria-labelledby="headingOne"
                            data-parent="#accordion_lessons"
                            > 
                            <div className="card-body">
                                <div className="list_lessons">
                                <ul>
                                    {courseMaterials.map((mat, i) => (
                                        <li key={i}>
                                            <div style={{marginBottom: '10px'}}>
                                                <p className="mb-1 col-11 d-inline-block"><strong><u>{mat.courseFileTitle ? mat.courseFileTitle : "No material title found"}</u></strong></p>
                                                <button type="button" className="col-1 close">
                                                    <span onClick={() => onFolderDelete(mat, _id)} style={{width: '30px', color: 'darkred', fontSize: '30px'}}>&times;</span>
                                                </button>
                                            </div>

                                            {mat.courseFile && mat.courseFile.map((file, i) => (
                                                <Fragment key={i}>
                                                    <a target="blank" href={file.Location} className="col-9 txt_doc d-inline-block mb-2">
                                                        {`${i+1}. ${file.originalName}`}
                                                    </a>
                                                    <button key={i+file.originalName} type="button" className="col-1 close">
                                                        <span onClick={() => onCourseFileCross(file, _id)} style={{width: '30px'}}>&times;</span>
                                                    </button>
                                                </Fragment>
                                            ))}
                                        </li>
                                    ))}
                                </ul>
                                </div>
                            </div>
                            </div>
                        </div>)}
                        <hr/>
                        <br/>

                        <div className="intro_title">
                            <h2>Lessons</h2>
                            <ul>
                            <li>{lessons && lessons.length} lessons</li>
                            <li>{duration}</li>
                            </ul>
                        </div>

                    {lessons && <Fragment>
                        {lessons.map((lesson, i) => (


                            <div className="card" key={i}>
                            <div className="card-header" role="tab" id="headingOne">
                            <h5 className="mb-0 col-10 d-inline-block">
                                <a
                                data-toggle="collapse"
                                href={`#collapseOne${i}`}
                                aria-expanded="false"
                                aria-controls={`collapseOne${i}`}
                                >
                                <i className="indicator ti-plus" /> {lesson?.lessonTitle}
                                </a>
                            </h5>
                            <button type="button" className="col-1 close">
                                <span onClick={() => onFolderDelete2(lesson, _id)} style={{width: '30px', color: 'darkred', fontSize: '30px'}}>&times;</span>
                            </button>
                            </div>
                            <div
                            id={`collapseOne${i}`}
                            className="collapse show"
                            role="tabpanel"
                            aria-labelledby="headingOne"
                            data-parent="#accordion_lessons"
                            > 
                            <div className="card-body">
                                <div className="list_lessons">
                                <ul>
                                    { lesson.lessonFile && !lesson.lessonFile.length > 0 ? "No Lessons Created Yet" : lesson.lessonFile.map((file, i) => (
                                        <li key={i}>
                                            <Link to={`/view-lesson/${_id}/${file.originalName}`} className="col-11 video" >
                                                { file.originalName }
                                            </Link>
                                            <button type="button" className="col-1 close">
                                                <span onClick={() => onLessonFileCross(file, _id)} style={{width: '30px'}}>&times;</span>
                                            </button>
                                        </li>
                                        
                                    ))}
                                    
                                </ul>
                                </div>
                            </div>
                            </div>
                        </div>
                        ))}
                        </Fragment>}
                        
                    {/* /card */}
                </div>
                {/* /accordion */}
                </Fragment>
                
        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    course: state.datas.course
})

export default connect(mapStateToProps, { getCourse, deleteCourseFile, deleteLessonFile })(AddLessonsAndMaterials)
