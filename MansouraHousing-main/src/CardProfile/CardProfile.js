
import photo2 from "../images/photokosper.jpg";
import "./CardProfile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
function CardProfile() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="cards pb-5">
          <div className="card  card-profile">
            <img loading="lazy" src={photo2} className="photos" alt="NoPhoto" />
            <div className="card-body">
              <h4 className="card-title">Mohamed Kosper</h4>
              <h5 className="title">Front-End [ React.js & Bootstrap]</h5>
              <div className="linkesProfile d-flex ">
                <a
                  href="https://www.facebook.com/share/18oiS3cwDM/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faFacebook} size="2x" />
                </a>
                <a
                  href="https://www.instagram.com/_mohamed_kosper?igsh=dGw5OTNzZDNhNm9x"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faInstagram} size="2x" />
                </a>
                <a
                  href="https://www.linkedin.com/in/mohamed-hassan-kosper-22b617319?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faLinkedin} size="2x" />
                </a>
                <a
                  href="https://github.com/Mohamed-H-Kosper"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faGithub} size="2x" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CardProfile;
