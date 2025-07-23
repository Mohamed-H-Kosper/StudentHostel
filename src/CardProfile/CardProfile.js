import photoProfile from "../images/photo-kosper.jpg";
import "./CardProfile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
function CardProfile() {
  return (

   <div className="container pb-5">
      <div className="row d-flex justify-content-center align-items-center">

    <div className="card mb-5" >
  <div className="row g-0 ">
    <div className="col-md-4 ">
      <img src={photoProfile} className="img-fluid rounded-start" alt="PhotoProfile loading..." data-aos="zoom-in" />
    </div>
    <div className="col-md-6">
      <div className="card-body" data-aos="zoom-in">
        <h5 className="card-title text-primary">Mohamed Hassan Kosper</h5>
        <p className="card-text text-secondary">Front-End [ React.js & Next js & javaScript & Bootstrap]</p>
        <p className="card-text2 text-dark">  
         I'm a passionate Front-End developer with hands-on experience
                building responsive and dynamic web interfaces using React.js,
                Next.js, and modern JavaScript. I focus on writing clean,
                maintainable code and crafting seamless user experiences with
                tools like Bootstrap for fast, responsive design.
                </p>
        <div className="linkesProfile d-flex">
                <a
                  href="https://www.facebook.com/share/18oiS3cwDM/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faFacebook} size="2x" data-aos="zoom-in"/>
                </a>
                <a
                  href="https://www.instagram.com/_mohamed_kosper?igsh=dGw5OTNzZDNhNm9x"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faInstagram} size="2x" data-aos="zoom-in"/>
                </a>
                <a
                  href="https://www.linkedin.com/in/mohamed-hassan-kosper-22b617319?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faLinkedin} size="2x" data-aos="zoom-in"/>
                </a>
                <a
                  href="https://github.com/Mohamed-H-Kosper"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faGithub} size="2x" data-aos="zoom-in" />
                </a>
              </div>
      </div>
    </div>
  </div>
</div>
  </div>
</div>
  );
}
export default CardProfile;
