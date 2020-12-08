import React, { useState } from "react";
import './css/bootstrap.min.css'

const Faq = ({ i, faq }) => {


  return (
    <div className="accordion accordion-flush">
      <div className="card" >
                <div className="card-header" role="tab" id="headingOne">
                  <h4 className="mb-0">
                    <a
                      data-toggle="collapse"
                      href={`#collapseTwo${i}`}
                      aria-expanded="false"
                      aria-controls={`collapseTwo${i}`}
                    >
                      <i class="far fa-question-circle"></i> {faq.question}
                    </a>
                  </h4>
                </div>
                <div
                  id={`collapseTwo${i}`}
                  className="collapse show"
                  role="tabpanel"
                  aria-labelledby="headingOne"
                  data-parent="#accordion_lessons"
                > 
                  <div className="card-body">
                    <div className="list_lessons">
                      <ul>
                        <li>
                            {faq.answer}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
    </div>
  );
};

export default Faq;
