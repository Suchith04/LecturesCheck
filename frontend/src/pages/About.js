import React from 'react';

const About = () => {
  return (
    <div style={styles.container}>
      <div style={styles.textContainer}>
        <h2>Welcome to Our University</h2>
        <p>
          Our university is dedicated to providing high-quality education and fostering innovation. We offer a diverse range of programs to help students achieve their academic and career goals.
        </p>
        <button style={styles.button}>Find Out More</button>
      </div>
      <div style={styles.imageContainer}>
        <img
          src="universityPhoto.jpg"
          alt="University"
          style={styles.image}
        />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  textContainer: {
    flex: 1,
    marginRight: '20px',
  },
  imageContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#6c63ff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default About;
