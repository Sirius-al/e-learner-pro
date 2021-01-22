import React, { useState } from 'react'
import {useDropzone} from 'react-dropzone';

const DropZone = ({innerText, getFiles, acceptableFiles,  Multi, dropzonePaddingY}) => {


    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
        multiple: Multi ? true : false , 
        accept: !acceptableFiles ? '' : acceptableFiles, 
        onDrop: files => getFiles(files)
    });
  
    const files = acceptedFiles.map(file => (
      <li key={file.name}>
        {file.path}
      </li>
    ));

    // if (acceptedFiles.length > 0) {
    //     setFiles(acceptedFiles)
    // }

    // console.log(Files)
  
    return (
      <section className="container">
        <div {...getRootProps({className: 'dropzone'})} style={{border: '2px dashed black', position: 'relative', padding: `${dropzonePaddingY ? dropzonePaddingY : '70px'} 0px`}}>
          <input {...getInputProps()} />
          <p style={{color: '#25252555', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}} >{innerText ? innerText : "Drag 'n' drop some files here, or click to select files"}</p>
        </div>
        <aside>
          <h4>Files</h4>
          <ul>{files}</ul>
        </aside>
      </section>
    );
}

export default DropZone
