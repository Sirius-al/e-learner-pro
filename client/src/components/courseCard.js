import { Link } from 'react-router-dom';
import React from 'react'
import { connect } from 'react-redux';
import './courseCard.css'



const courseCard = ({ course }) => {

    const { _id, title, description, teacher, coverImage, duration, level, price, discountPerc } = course

      // console.log(coverImage)


    return (
      <div className='courseCards col-sm-4'>
        <div className="card mb-3" style={{width: '30vw'}}>
          <img src={ coverImage === {} ? 'https://picsum.photos/200/300/?blur' : `${coverImage?.Location}` } style={{height: '20vh'}} className="card-img-top" alt={title} />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
                {description}
            </p>
            <p className="card-text">
              <small className="text-muted"><strong>Teacher:</strong> {teacher}</small>
              <small className="text-muted ml-4"><strong>Duration:</strong> {duration}</small>
            </p>
            <p className="card-text">
            </p>
            <blockquote className="blockquote">
                <footer className="blockquote-footer">Course Difficulty <cite title="Source Title"><strong>{`" ${level} "`}</strong></cite></footer>
            </blockquote>
          <Link to={`/view-course/${_id}`} className="btn btn-secondary mr-3">View Course</Link>
          <a href="#!" className="btn btn-success"> <strong>Enroll Now ${price}</strong></a>
          </div>
          <Link to={`/dumb`} className="btn btn-secondary mx-5 mb-3">Certification</Link>
          <Link to={`edit-course/${_id}`} className="btn btn-info">Edit Course</Link>
        </div>
      </div>
    );
}

export default connect(null, {  })(courseCard)
