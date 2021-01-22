import React, { Fragment, useEffect } from 'react'
// import "./css/bootstrap.min.css";
import "./css/style.css";
import "./css/vendors.css";
import "./css/icon_fonts/css/all_icons.min.css";
import "./css/custom.css";

import { connect } from 'react-redux'
import { useParams } from "react-router-dom";

import { getCourse } from '../../Actions/actions'
import Lessons from './Lessons'
import Faq from './Faq';


const Course = ({ getCourse, course }) => {

  const { id } = useParams()

  useEffect(() => {
    getCourse(id)
  }, [])

  const { _id, title, teacher, description, discountPerc, requirements, duration, coverImage, level, price, learns, courseMaterials, lessons, faq, catagory} = course

    return (
      <main>
        <section id="hero_in" className="courses">
          <div className="wrapper">
            <div className="container">
              <h1 className="fadeInUp">
                <span />
                {title}
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
          <div className="container margin_60_35">
            <div className="row">
              <div className="col-lg-8">
                <section id="description">
                  <h2>Description</h2>
                  <p>
                    {description}
                  </p>

                  {learns && <Fragment>
                    <h5>What will you learn</h5>
                    <ul className="list_ok">
                      {learns.map((learn, i) => {
                        return (<li key={i}>
                          <h6><strong>{learn.learnTitle}</strong></h6>
                          <p>
                          {learn.learnDescription}
                          </p>
                        </li>)
                      })}
                    </ul>
                  </Fragment>}

                  <hr />
                  {requirements && <Fragment>
                    <p>Requirements</p>
                    <div className="row">
                      <div className="col-lg-12">
                        <ul className="bullets">
                          {requirements.map((req, i) => {
                            return <li key={i}>{req}</li>
                          })}
                        </ul>
                      </div>
                    </div>
                    </Fragment>}

                  {/* /row */}
                </section>
                {/* /section */}
                <section id="lessons">
                  <Lessons _id={_id} duration={duration} courseMaterials={courseMaterials} lessons={lessons}/>
                </section>
                <h4><strong>Teacher</strong></h4>
                    <div className="row">
                      <div className="col-lg-12">
                        <ul className="bullets">
                          <li><h5>{teacher}</h5></li>
                        </ul>
                      </div>
                    </div>
              </div>
              
              {/* box details */}
              <aside className="col-lg-4" id="sidebar">
                <div className="box_detail">
                  <figure>
                    <a
                      target="blank"
                      href="#!"
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
                    ${price}
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
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-lg-12 text-center">
                <h4 className='mb-4'><strong>Tags</strong></h4>
                    {catagory && catagory.tags ? catagory.tags.map((item, i) => <h5 className="d-inline ml-2">
                      <span class="badge badge-dark">{item}</span></h5>) : "No Tags Yet"}
                </div>
            </div>
            {/* /row */}
          </div>
          {/* /container */}
        </div>
        {/* /bg_color_1 */}
      </main>
    );
}

const mapStateToProps = (state) => ({
  course: state.datas.course
})

export default connect(mapStateToProps, { getCourse })(Course)
