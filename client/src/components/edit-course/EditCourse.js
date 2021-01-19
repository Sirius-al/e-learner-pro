import React, { Fragment, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { getCourse } from '../../Actions/actions'
import { connect } from 'react-redux'
import Lessons from '../course/Lessons';
import Faq from '../course/Faq';

const EditCourse = ({ getCourse, course }) => {
    const { id } = useParams()
    
    useEffect(() => {
        getCourse(id)
    }, [])

    const { title, teacher, description, discountPerc, requirements, duration, coverImage, level, price, learns, courseMaterials, lessons, faq } = course
    
    return (
        <main>
        <section id="hero_in" className="courses">
          <div className="wrapper">
            <div className="container">
              <h1 className="fadeInUp">
                <span />
                {title ? title : "No title"}
              </h1>
            </div>
          </div>
        </section>
        {/*/hero_in*/}
        <div className="bg_color_1">
          <nav className="secondary_nav sticky_horizontal">
            <div className="container">
              <ul className="clearfix">
                <li>
                  <a href="#description" className="active">
                    Description
                  </a>
                </li>
                <li>
                  <a href="#lessons">Lessons</a>
                </li>
              </ul>
            </div>
          </nav>
          <Link to={`/edit-course-details/${id}`} className="btn btn-info mt-2">Edit course Details</Link>
          <div className="container margin_60_35">
            <div className="row">
              <div className="col-lg-8">
                <section id="description">
                  <h2>Description</h2>
                  <p>
                    {!description ? "No description found for this course" : description}
                  </p>

                <h5>What will students learn from this course !</h5>
                  {learns && <Fragment>
                    <ul className="list_ok">
                      {learns.length > 0 ? learns.map((learn, i) => {
                        return (<li key={i}>
                          <h6 style={{fontWeight: 'bold'}}>{learn.learnTitle}</h6>
                          <p>
                          {learn.learnDescription}
                          </p>
                        </li>)
                      }) : "Nothing to Learn"}
                    </ul>

                  </Fragment>}
                  <Link to={`/add-learns/${id}`} className="btn btn-info">Add what students will learn</Link>

                  <hr />
                    <p>Requirements</p>
                    <div className="row">
                      <div className="col-lg-12">
                        <ul className="bullets">
                          {requirements && requirements.length > 0 ? requirements.map((req, i) => {
                            return <li key={i}>{req}</li>}) : <li> No Requirements </li>}
                        </ul>
                      </div>
                    </div>
                    
                    
                  {/* /row */}
                </section>
                {/* /section */}
                <section id="lessons">
                    <Lessons _id={id} duration={duration} courseMaterials={courseMaterials} lessons={lessons}/>
                    <Link to={`/add-lessons/${id}`} className="btn btn-info mb-3" style={{width: '40%'}}>Add Lessons and Course materials</Link>
                </section>
                <h4><strong>Teacher</strong></h4>
                    <div className="row">
                      <div className="col-lg-12">
                        <ul className="bullets">
                          <li><h5>{teacher ? teacher : "No teacher"}</h5></li>
                        </ul>
                      </div>
                    </div>
              </div>
              
              {/* box details */}
              <aside className="col-lg-4" id="sidebar">
                <div className="box_detail">
                  <figure>
                    <a
                      href="https://www.youtube.com/watch?v=LDgd_gUcqCw"
                      className="video"
                    >
                      <i className="arrow_triangle-right" />
                      <img
                        src="http://via.placeholder.com/800x533/ccc/fff/course_1.jpg"
                        className="img-fluid"
                      />
                      <span>View course preview</span>
                    </a>
                  </figure>
                  <div className="price">
                    ${price ? price : 0}
                    <span className="original_price">
                      <em> </em>{discountPerc && discountPerc > 0 ? `${discountPerc}% discount price` : ''}
                    </span>
                  </div>
                  <a href="#0" className="btn_1 full-width">
                    Enroll Now
                  </a>
                  <a href="#0" className="btn_1 full-width outline">
                    <i className="icon_heart" /> Add to wishlist
                  </a>
                  <div id="list_feat">
                    <h3>What's includes</h3>
                    <ul>
                      <li>
                        <i className="icon_mobile" />
                        Mobile support
                      </li>
                      <li>
                        <i className="icon_archive_alt" />
                        Lesson archive
                      </li>
                      <li>
                        <i className="icon_mobile" />
                        Mobile support
                      </li>
                      <li>
                        <i className="icon_chat_alt" />
                        Tutor chat
                      </li>
                      <li>
                        <i className="icon_document_alt" />
                        Course certificate
                      </li>
                    </ul>
                  </div>
                </div>
              </aside>
              
            
            </div>
            <div className="row mt-4">
                <div className="col-lg-8">
                <h4 className='mb-4'><strong>F.A.Q</strong></h4>
                    {faq && faq.length > 0 ? faq.map((item, i) => <Faq faq={item} key={i} i={i} />) : "No Faq"}
                    <Link to={`/add-faq/${id}`} className="btn btn-info" style={{width: '40%', display: 'block'}}>Add Faq</Link>
                </div>
            </div>
            {/* /row */}
          </div>
          {/* /container */}
        </div>
        {/* /bg_color_1 */}
      </main>
    )
}

const mapStateToProps = (state) => ({
    course: state.datas.course
})

export default connect(mapStateToProps, { getCourse })(EditCourse)
