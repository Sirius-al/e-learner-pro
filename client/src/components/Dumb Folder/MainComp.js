import React, { Fragment } from "react";
import moment from 'moment'
import './certificatestyle.css';

const Docs = ({ name, course, image }) => {


  return (
    <div className="certificate-container" style={{ background: "#f9f9f9" }}>
      <table
        id="certificate"
        style={{
          width: "11in",
          margin: "0 auto",
          textAlign: "center",
          padding: 10,
          borderStyle: "groove",
          borderWidth: 20,
          outline: "5px dotted #000",
          height: "8.5in",
          outlineOffset: "-26px",
          outlineStyle: "double",
          borderColor: "#9d8b00",
        }}
      >
        <tbody>
          <tr>
            <td>
              <h1 style={{ fontSize: "0.6in", margin: 0, color: "#000", marginBottom: "10px" }}>
                Course Completion Certificate
              </h1>
              <h3
                style={{
                  margin: 0,
                  fontSize: "0.25in",
                  color: "black",
                  textTransform: "uppercase",
                  fontFamily: "sans-serif",
                }}
              >
                Is hereby granted to :
              </h3>
            </td>
          </tr>
          <tr>
            <td>
              <h2
                style={{
                  color: "#fff",
                  fontSize: "30px",
                  margin: "10px 0 30px 0",
                  fontFamily: "sans-serif",
                  textTransform: "uppercase",
                }}
              >
                { name ? name : '[ Name ]' }
              </h2>
              <h2
                style={{
                  color: "#fff",
                  fontSize: "20px",
                  margin: "10px 0 20px 0",
                  fontFamily: "sans-serif",
                  textTransform: "capitalize",
                  color:'#494000',
                  padding: "0px 79px",
                  lineHeight: '1.5'
                }}
              >
                This certificate is awarded to { <strong> <u> { name ? name : '[ Name ]' } </u> </strong> } for having successfully completing { <strong> <u> { course ? course : '[ course ]' } </u> </strong> } at Sirius_al's Institute
              </h2>
              <h2
                style={{
                  color: "#fff",
                  fontSize: "20px",
                  margin: "10px 0 0 0",
                  fontFamily: "sans-serif",
                  textTransform: "capitalize",
                  color:'#000'
                }}
              >
                CONGRATULATIONS! KEEP IT UP! 
              </h2>
            </td>
          </tr>
          <tr>
            <td>
              <img
                src={image ? `/${image}` : '/FILES/demoImage.png'}
                alt="demoImage"
                style={{
                  maxWidth: "130px",
                  margin: "0 auto",
                  display: "block",
                  borderWidth: 5,
                  borderStyle: "double",
                  borderColor: "#333",
                  boxShadow: "0 5px 10px rgba(0,0,0,0.3)",
                }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <h4
                style={{
                  margin: 0,
                  fontSize: "0.16in",
                  fontFamily: "sans-serif",
                  color: "#000",
                }}
              >
                
              </h4>
              <h5
                style={{
                  margin: "5px 0 40px",
                  fontSize: "0.16in",
                  fontFamily: "sans-serif",
                  color: "#000",
                }}
              >
                
              </h5>
            </td>
          </tr>
          <tr>
            <td>
              <img
                src="/FILES/demoLogo.png"
                alt="demoLogo"
                style={{ maxWidth: "100px" }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <h6
                style={{
                  margin: "10px 0 20px",
                  fontFamily: "sans-serif",
                  fontSize: "0.12in",
                }}
              >
                Reg. by Sirius_al
              </h6>
              <em>Awarded at : {moment().format('MMMM Do YYYY, h:mm:ss a')}</em>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Docs;