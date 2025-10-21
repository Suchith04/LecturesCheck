// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import "./uploads.css";

// function Upload() {
//   const [pdfTitle, setPdfTitle] = useState("");
//   const [videoTitle, setVideoTitle] = useState("");
//   const [pdfFile, setPdfFile] = useState(null);
//   const [videoFile, setVideoFile] = useState(null);
//   const navigate = useNavigate();

//   const submitFiles = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();

//     // Add PDF file and title
//     formData.append('pdfTitle', pdfTitle);
//     formData.append('pdfFile', pdfFile);

//     // Add video file and title
//     formData.append('videoTitle', videoTitle);
//     formData.append('videoFile', videoFile);

//     // Redirect to /analysis page with loading state
//     navigate('/analysis', { state: { loading: true } });

//     try {
//       const res = await axios.post("http://localhost:5000/upload-files", formData);
//       console.log('Files uploaded successfully:', res.data);
//       navigate('/analysis', { state: { output: res.data.pythonOutput, loading: false } });
//     } catch (err) {
//       console.error('Error uploading files:', err);
//       navigate('/analysis', { state: { output: 'Error uploading files', loading: false } });
//     }
//   };

//   return (
//     <div className="upload-container">
//       <form className='formStyle' onSubmit={submitFiles}>
//         <h4>Upload Files</h4>
//         <br/>

//         {/* PDF Upload */}
//         <input
//           type='text'
//           className='form-control'
//           placeholder='PDF Title'
//           value={pdfTitle}
//           required
//           onChange={(e) => setPdfTitle(e.target.value)}
//         />
//         <br/>
//         <input
//           type='file'
//           className='form-control'
//           accept='application/pdf'
//           required
//           onChange={(e) => setPdfFile(e.target.files[0])}
//         />
//         <br/>

//         {/* Video Upload */}
//         <input
//           type='text'
//           className='form-control'
//           placeholder='Video Title'
//           value={videoTitle}
//           required
//           onChange={(e) => setVideoTitle(e.target.value)}
//         />
//         <br/>
//         <input
//           type='file'
//           className='form-control'
//           accept='video/*'
//           required
//           onChange={(e) => setVideoFile(e.target.files[0])}
//         />
//         <br/>

//         <button className="btn btn-primary" type="submit">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Upload;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./uploads.css";

function Upload() {
  const [pdfTitle, setPdfTitle] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const navigate = useNavigate();

  const submitFiles = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Add PDF file and title
    formData.append('pdfTitle', pdfTitle);
    formData.append('pdfFile', pdfFile);

    // Add video file and title
    formData.append('videoTitle', videoTitle);
    formData.append('videoFile', videoFile);

    // Redirect to /analysis page with loading state
    navigate('/analysis', { state: { loading: true } });

    try {
      const res = await axios.post("http://localhost:5000/upload-files", formData);
      console.log('Files uploaded successfully:', res.data);
      navigate('/analysis', { state: { output: res.data.pythonOutput, loading: false } });
    } catch (err) {
      console.error('Error uploading files:', err);
      navigate('/analysis', { state: { output: 'Error uploading files', loading: false } });
    }
  };

  return (
    <div className="upload-container">
      <form className='formStyle' onSubmit={submitFiles}>
        <h4>Upload Files</h4>
        <br/>

        {/* PDF Upload */}
        <input
          type='text'
          className='form-control title-input'
          placeholder='PDF Title'
          value={pdfTitle}
          required
          onChange={(e) => setPdfTitle(e.target.value)}
        />
        <br/>
        <input
          type='file'
          className='form-control file-input'
          accept='application/pdf'
          required
          onChange={(e) => setPdfFile(e.target.files[0])}
        />
        <br/>

        {/* Video Upload */}
        <input
          type='text'
          className='form-control title-input'
          placeholder='Video Title'
          value={videoTitle}
          required
          onChange={(e) => setVideoTitle(e.target.value)}
        />
        <br/>
        <input
          type='file'
          className='form-control file-input'
          accept='video/*'
          required
          onChange={(e) => setVideoFile(e.target.files[0])}
        />
        <br/>

        <button className="btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Upload;





