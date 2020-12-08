import React from "react";

const ShowLearnsCards = ({ learn }) => {
  return (
    <section id="description">
      <ul className="list_ok">
        <li >
          <h6>
            <strong>{learn.learnTitle}</strong>
          </h6>
          <p>{learn.learnDescription}</p>
        </li>
      </ul>
    </section>
  );
};

export default ShowLearnsCards;
