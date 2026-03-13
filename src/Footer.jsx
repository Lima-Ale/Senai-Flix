import styled from "styled-components";
import mdiTwwitter from "./assets/img/mdi_twitter.svg";
import riInstagram from "./assets/img/ri_instagram-fill.svg";
import mdiYoutube from "./assets/img/mdi_youtube.svg";
export default Footer;
export const FooterContainer = styled.footer`
  background: #000;
  color: #fff;
  padding: 40px 20px;
  text-align: center;
  padding: 20px;
  border-top: 1px solid #333;

  p {
    margin-top: 20px;
    font-size: 1rem;
    color: #fff;
  }

  .social-icons {
    display: flex;
    justify-content: center;
    gap: 20px;
  }

  .social-icons img {
    width: 30px;
    height: 30px;
    filter: brightness(0) invert(1);
    cursor: pointer;
    transition: transform 0.3s;
  }

  .social-icons img:hover {
    transform: scale(1.2);
  }
`;

function Footer() {



    return (

        <FooterContainer>
            <p>Nos siga nas redes sociais</p>
            <div className="social-icon">
                <img src={mdiTwwitter} alt="Twitter" />
                <img src={riInstagram} alt="Instagram" />
                <img src={mdiYoutube} alt="Youtube" />
            </div>
            <p style ={{marginTop:"20px", fontSize:"8px"}}>2026 SENAIFLIX - Todos direitos reservados</p>

        </FooterContainer>
    )
}

