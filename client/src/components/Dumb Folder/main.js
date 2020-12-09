import React from 'react'
import Modal from '../Modal'

const Main = () => {
    return (
      <div>
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target=".bd-example-modal-lg"
        >
          Launch demo modal
        </button>

        <Modal />
      </div>
    );
}

export default Main
