// export default function Home() {
//   return <h1>Dune State University Welcomes You!!</h1>
// }
import { Link } from "react-router-dom";
import "./Home.css"; // Assuming you'll be adding some custom styles in a CSS file

export default function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to Dune State University's Learning Management System!</h1>
      </header>
      <section className="home-content">
        <p>
          Our platform provides an integrated environment for managing, delivering, and tracking your educational resources.
        </p>
        <p>
          Feel free to explore our extensive lecture repository, upload new content, and engage with our learning community.
        </p>
      </section>
      <section className="upload-section">
        <h2>Upload Lectures</h2>
        <Link to="/upload" className="upload-link">
          <button className="upload-button">Upload Now</button>
        </Link>
      </section>
    </div>
  );
}
