import React, { Fragment, useEffect } from 'react'

import Addlessons from './edc-compos/Addlessons';
import Addmaterials from './edc-compos/Addmaterials';
import { getCourse } from '../../Actions/actions';

import { connect } from 'react-redux'
import { Link, useParams } from "react-router-dom"


const AddLessonsAndMaterials = ({ getCourse, course }) => {
    
    const { id } = useParams()

    useEffect(() => {
        getCourse(id)
    }, [])


    const { lessons, courseMaterials, duration } = course


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
                                            <p className="mb-1"><strong><u>{mat?.courseFileTitle}</u></strong></p>
                                            <a href="#!" className="txt_doc">
                                                {mat.courseFile && mat.courseFile.filename}
                                            </a>
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
                            <h5 className="mb-0">
                                <a
                                data-toggle="collapse"
                                href={`#collapseOne${i}`}
                                aria-expanded="false"
                                aria-controls={`collapseOne${i}`}
                                >
                                <i className="indicator ti-plus" /> {lesson?.lessonTitle}
                                </a>
                            </h5>
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
                                    { lesson.lessonFile && lesson.lessonFile.length > 0 && lesson.lessonFile.map((file, i) => (
                                        <li key={i}>
                                            <Link to={`/view-lesson/${file.filepath}`} data-toggle="modal" data-target=".bd-example-modal-lg" //? file.filepath
                                            className="video" >
                                                { file.filename }
                                            </Link>
                                            
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

export default connect(mapStateToProps, { getCourse })(AddLessonsAndMaterials)
