import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, MovieList,  Movie } from "../style";
import Header from "../Header";
import Footer from "../Footer";

function Favorites() {
  const [favs, setFavs] = useState([]);
  const img_path = 'https://image.tmdb.org/t/p/w500/';

  useEffect(() => {
    const savedFavs = JSON.parse(localStorage.getItem('favorites')) || []; // Fallback para array vazio
    setFavs(savedFavs);
  }, []);

  // O ERRO ESTAVA AQUI: Adicione o (id) como parâmetro
  function removeFavorite(id) {
    const updateFavs = favs.filter(movie => movie.id !== id);
    setFavs(updateFavs);
    localStorage.setItem('favorites', JSON.stringify(updateFavs));
  }

  return (
    <>
      <Header />
      <Container>
        {favs.length === 0 ? (
          <p style={{ textAlign: 'center', marginTop: '15rem', color: '#aaa', fontSize: '32px' }}>
            Você ainda não salvou nenhum item como favorito!
          </p>
        ) : (
          <MovieList>
            {favs.map(movie => (
              <Movie key={movie.id}>
                <Link to={`/details/movie/${movie.id}`}>
                  <img src={`${img_path}${movie.poster}`} alt={movie.title} />
                </Link>
                <span>{movie.title}</span>

                <button 
                  className="favorite-btn active" 
                  onClick={() => removeFavorite(movie.id)} // Aqui você já chamava certo!
                >
                  Remover
                </button>
              </Movie>
            ))}
          </MovieList>
        )}
      </Container>
      <Footer />
    </>
  );
}

export default Favorites