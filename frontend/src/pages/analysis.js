

import React from 'react';
import { useLocation } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function Analysis() {
  const location = useLocation();
  const { output, loading } = location.state || { output: "No output available", loading: true };

  // Parse the output to an integer value
  const matchPercentage = parseInt(output, 10);

  return (
    <div className="analysis-container">
      <h4>Match Percentage of the Video and PDF</h4>
      {loading ? (
        <div className="loader">
          <TailSpin color="#ff6060" height={100} width={100} />
        </div>
      ) : (
        <div className="progress-container">
          <CircularProgressbar
            value={matchPercentage}
            text={`${matchPercentage}%`}
            styles={buildStyles({
              pathColor: `#ff6060`,
              textColor: '#ff6060',
              trailColor: '#d6d6d6',
            })}
          />
        </div>
      )}
    </div>
  );
}

export default Analysis;










