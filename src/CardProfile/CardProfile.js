import photo1 from "../images/photoahmed.jpg";
import photo2 from "../images/photokosper.jpg";
import photo3 from "../images/photomazen.jpg";
import photo4 from "../images/photomorgan.jpg";
import photo5 from "../images/photobody.jpg";
import photo6 from "../images/photobadr.jpg";
import photo7 from "../images/mohamedAbelfattah.jpg";
import photo8 from "../images/nairaRady.jpg";
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
          <div data-aos="fade-right" data-aos-duration="3000" className="card card-profile">
            <img loading="lazy" src={photo3} className="photos" alt="NoPhoto" />
            <div className="card-body">
              <h4 className="card-title">Mazen Aymen</h4>
              <h5 className="title">Back-End Developer || .Net</h5>
              <div className="linkesProfile d-flex ">
                <a
                  href="https://www.facebook.com/share/1ffnBToXa6/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faFacebook} size="2x" />
                </a>
                <a
                  href="https://www.instagram.com/mazenayman03?igsh=M3lwNnB6YTBiaDA0"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faInstagram} size="2x" />
                </a>
                <a
                  href="https://www.linkedin.com/in/mazen-ayman-83b147222/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faLinkedin} size="2x" />
                </a>
              </div>
            </div>
          </div>

          <div data-aos="fade-up" data-aos-duration="3000" className="card  card-profile">
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
              </div>
            </div>
          </div>
          <div data-aos="fade-down" data-aos-duration="3000" className="card   card-profile">
            <img loading="lazy" src={photo1} className="photos" alt="NoPhoto" />
            <div className="card-body">
              <h4 className="card-title">Ahmed fathy</h4>
              <h5 className="title">Front-End [ React.js & Tailwind]</h5>
              <div className="linkesProfile d-flex ">
                <a
                  href="https://ahmedfathy112.github.io/Portofolio-react/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faGithub} size="2x" />
                </a>
                <a
                  href="https://www.instagram.com/ahmed_fathy_960?igsh=emd0ZWJibWkwc3Zj"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faInstagram} size="2x" />
                </a>
                <a
                  href="https://www.linkedin.com/in/ahmed-fathy-595965351/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faLinkedin} size="2x" />
                </a>
              </div>
            </div>
          </div>

          <div data-aos="fade-right" data-aos-duration="3000" className="card  card-profile">
            <img loading="lazy" src={photo4} className="photos" alt="NoPhoto" />
            <div className="card-body">
              <h4 className="card-title">Ahmed morgan</h4>
              <h5 className="title">Mobile Developer || Android native </h5>
              <div className="linkesProfile d-flex ">
                <a
                  href="https://www.facebook.com/share/12EjYi2GSTv/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faFacebook} size="2x" />
                </a>
                <a
                  href="https://www.instagram.com/ahmed._.morgan?igsh=MWFzY3puem5nZXZ2MA%3D%3D&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faInstagram} size="2x" />
                </a>
                <a
                  href="https://www.linkedin.com/in/ahmed-morgan-808241309?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faLinkedin} size="2x" />
                </a>
              </div>
            </div>
          </div>

          <div data-aos="fade-right" data-aos-duration="3000" className="card  card-profile">
            <img
              loading="lazy"
              src={photo5}
              className="photos photo-abdo"
              alt="NoPhoto"
            />
            <div className="card-body">
              <h4 className="card-title">Abdelrahman Ashraf</h4>
              <h5 className="title">Word</h5>
              <div className="linkesProfile d-flex ">
                <a
                  href="https://www.facebook.com/profile.php?id=100036281464113&locale=ar_AR"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faFacebook} size="2x" />
                </a>
                <a
                  href="https://www.linkedin.com/me?trk=p_mwlite_feed-secondary_nav"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faLinkedin} size="2x" />
                </a>
              </div>
            </div>
          </div>

          <div data-aos="fade-up" data-aos-duration="3000" className="card  card-profile">
            <img loading="lazy" src={photo6} className="photos" alt="NoPhoto" />
            <div className="card-body">
              <h4 className="card-title">Ahmed Badr</h4>
              <h5 className="title">Word</h5>
              <div className="linkesProfile d-flex ">
                <a
                  href="https://www.facebook.com/share/1Kr7efH7AJ/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faFacebook} size="2x" />
                </a>
                <a
                  href="https://www.instagram.com/ahmeddbaddr_?igsh=MTJ2d2JrZHJ5ZTRlaQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faInstagram} size="2x" />
                </a>
              </div>
            </div>
          </div>

          <div data-aos="fade-down" data-aos-duration="3000" className="card  card-profile">
            <img
              loading="lazy"
              src={photo8}
              className="photos photo-abdo"
              alt="NoPhoto"
            />
            <div className="card-body">
              <h4 className="card-title">Naira Rady</h4>
              <h5 className="title">Word</h5>
              <div className="linkesProfile d-flex ">
                <a
                  href="https://mail.yahoo.com/rady_naira@yahoo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faEnvelope} size="2x" />
                </a>
              </div>
            </div>
          </div>

          <div data-aos="fade-left" data-aos-duration="3000" className="card  card-profile">
            <img
              loading="lazy"
              src={photo7}
              className="photos photo-abdo"
              alt="NoPhoto"
            />
            <div className="card-body">
              <h4 className="card-title">Mohamed Abdelfattah</h4>
              <h5 className="title">Ui/Ux + Cyper security</h5>
              <div className="linkesProfile d-flex ">
                <a
                  href="https://www.linkedin.com/in/mohamed-abdel-fattah-b14715245?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faLinkedin} size="2x" />
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
