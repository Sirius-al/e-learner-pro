import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Lessons = ({ id, duration, courseMaterials, lessons }) => {
  return (
    <Fragment>
      <div className="intro_title">
        <h2>Lessons</h2>
        <ul>
          <li>{lessons && lessons.length} lessons</li>
          <li>{duration}</li>
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
                                <p className="mb-1"><strong><u>{mat.courseFileTitle}</u></strong></p>
                                <a href="#!" className="txt_doc">
                                    {mat.courseFile.filename}
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
                      <i className="indicator ti-plus" /> {lesson.lessonTitle}
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
                        <li>
                          <a
                            href="https://www.youtube.com/watch?v=LDgd_gUcqCw"
                            className="video"
                          >
                            {lesson.lessonFile.filename}
                          </a>
                        </li>
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
  );
};

export default Lessons;
