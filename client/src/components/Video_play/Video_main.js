import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { useParams } from "react-router-dom"
import { getCourseLessonsByCourseId } from '../../Actions/actions';
import ReactPlayer from 'react-player/lazy'

const Video_main = ({ getCourseLessonsByCourseId, lessons }) => {

    const { courseId, videoId } = useParams()
    
    const [url, seturl] = useState('')
    
    // if (videoId && lessons) {
    //   lessons.map((lesson, i) => {
    //     const theTargated = lesson.lessonFile.filter(file => file.originalName === videoId)
    //     console.log(theTargated)
    //     if (theTargated.length !== 0) {
    //         seturl(theTargated[0].Location)
    //     }
    //   })
    // }
    

    useEffect(() => {
        getCourseLessonsByCourseId(courseId)
    }, []);

    //!======================================== static functions
    function changeUrl(e, file) {
        e.stopPropagation()

        seturl(file.Location)
        // console.log(`file.Location =>  ${file.Location}`)
    }


    //!======================================== Main component return Statement
    //!======================================== Main component return Statement
    //!======================================== Main component return Statement
    return (
        <div className="container-fluid" >
            <div className="row mx-5">
                <div className="col-md-8 text-center" style={{position: 'relative'}}>
                    <h1>Video Player</h1>
                    <hr/>
                    <br/>

                <ReactPlayer 
                    width='59vw' 
                    height='60vh' 
                    controls 
                    style={{position: 'absolute', backgroundColor: 'rgba(0, 0, 0, 0.6)'}} 
                    url={url}
                    playing={true} />
                </div>
                <div className="col-md-4 text-center">
                    
                    <h1>List Of course Videos</h1>
                    <hr/>
                    <br/>
                    
                <div className="list-group">
                    {lessons && lessons.map((lesson, i) => {
                        return (
                            // <a href="#!" className="list-group-item list-group-item-action flex-column align-items-start text-center">
                            //     <div className="d-flex w-100 justify-content-between">
                            //         <h5 className="mb-1">{lesson.lessonTitle}</h5>
                            //         {/* <small>3 days ago</small> */}
                            //     </div>
                            //     <p className="mb-1">Some Description about the lesson</p>
                            // </a>

                            <div id="accordion">
                            <div className="card">
                                <div className="card-header" id={`headingOne${i}`} style={{border: '2px solid rgb(184, 3, 133)', backgroundColor: 'rgba(165, 165, 165, 0.905)'}}>
                                    
                                <h5 className="mb-0">
                                    <button className="btn btn-link" data-toggle="collapse" data-target={`#collapse${i}`} aria-expanded="true" aria-controls={`collapse${i}`}>
                                    <h4>{lesson.lessonTitle}</h4>
                                    </button>
                                </h5>
                                </div>
                                <div id={`collapse${i}`} className="collapse show" aria-labelledby={`headingOne${i}`} data-parent="#accordion">

                                    {lesson && !lesson.lessonFile.length > 0 ? "No Lesson Videos Yet !" : lesson.lessonFile.map(file => (
                                        <div className="card-body">
                                        <a href="#!" className="list-group-item list-group-item-action flex-column align-items-start text-center" 
                                         onClick={(e)=> changeUrl(e, file)} >
                                            <div className="d-flex w-100 justify-content-between">
                                                <h5 className="mb-1">{file.originalName}</h5>
                                                {/* <small>3 days ago</small> */}
                                            </div>
                                            <p className="mb-1">Some Description about the lesson</p>
                                        </a>
                                    </div>
                                    ))}
                                </div>
                            </div>
                            </div>


                        )
                    })}
                </div>



                </div>

            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    lessons: state.datas.specific_lessons
})

export default connect(mapStateToProps, { getCourseLessonsByCourseId })(Video_main)
