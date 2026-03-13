import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.header`
  background-color: #000;
  padding: 1rem 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid #333;

  .logo {
    color: red;
    font-size: 1.5rem;
    font-weight: bold;
    text-decoration: none;
    letter-spacing: 2px;
  }

  nav {
    display: flex;
    gap: 25px;
  }

  nav a {
    color: #fff;
    text-decoration: none;
    font-size: 1.1rem;
    transition: 0.4s ease-in-out;
  }

  nav a:hover {
    color: red;
  }
`;

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <HeaderContainer open={menuOpen}>
      {/*LOGO*/}
      <Link to="/" className="logo">
        Senaiflix
      </Link>
      {/*=== Botao Hambuguer*/}
      <div className="hamburger-menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span>&#9776;</span>
      </div>
      <nav>
        <Link to='/'>Inicio</Link>
        <Link  to='/tipo=movie'>Filme</Link>
        <Link  to='/tipo=tv'>Series</Link>
        <Link  to='/tipo=favorite'>Favoritos</Link>
      </nav>
      <div className="menu-mobile">
        <Link to='/' onClick={() => setMenuOpen(false)}>
          Inicio
        </Link>
        <Link to='/tipo=movie' onClick={() => setMenuOpen(false)}>
          Filme
        </Link>
        <Link to='/tipo=tv' onClick={() => setMenuOpen(false)}>
          Series
        </Link>
        <Link to='/tipo=favorite' onClick={() => setMenuOpen(false)}>
          Favoritos
        </Link>
      </div>
    </HeaderContainer>
  );
}

export default Header;
