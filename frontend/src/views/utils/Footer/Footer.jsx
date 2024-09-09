import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import "./Footer.css";
export function Footer() {
  const socialMedia = {
    facebook: {
      href: "https://www.facebook.com/UNIMINUTOCOLOMBIA",
      icon: FaFacebook,
    },
    twitter: {
      href: "https://twitter.com/uniminutocol",
      icon: FaTwitter,
    },
    instagram: {
      href: "https://www.instagram.com/uniminutocol",
      icon: FaInstagram,
    },
    likedln: {
      href: "https://es.linkedin.com/school/uniminutocol",
      icon: FaLinkedin,
    },
    youtube: {
      href: "https://www.youtube.com/channel/UCYripsaQMUFIufEMKisPTsw",
      icon: FaYoutube,
    },
  };

  return (
    <footer>
      <div className="container container--custom">
        <div className="main-footer">
          <div className="logo">
            <a href="">
              <img
                src="src\assets\Logo uniminuto.png"
                alt="Logo Uniminuto Footer"
                className="logo-img"
              />
            </a>
          </div>
          <div className="textcenter">
            <p>
              <span>Todos los derechos Reservados. UNIMINUTO &copy;2024</span>
              <span>
                Institución de Educación Superior sujeta a inspección y
                vigilancia por el Ministerio de Educación Nacional
              </span>
              <span>
                Personería jurídica: Resolución 10345 del 1 de agosto de 1990
                MEN
              </span>
              <strong>CORPORACIÓN UNIVERSITARIA MINUTO DE DIOS</strong>
            </p>
          </div>
          <div className="social-network">
            {Object.entries(socialMedia).map(([key, { href, icon: Icon }]) => (
              <a
                href={href}
                key={key}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={key}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
