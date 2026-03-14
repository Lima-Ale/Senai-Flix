import { APIKEY } from "./config/key";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Container, Movie, MovieList, SearchBar } from "./style.js";

function Home() {
  const img_path = "https://image.tmdb.org/t/p/w500/";

  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [search, setSearch] = useState("");
  const [genero, setGenero] = useState("");
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tipoSelecionado = queryParams.get("tipo");

  useEffect(() => {
    setLoading(true);

    const fetchMovies = fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&language=pt-BR`
    ).then((res) => res.json());

    const fetchSeries = fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${APIKEY}&language=pt-BR`
    ).then((res) => res.json());

    Promise.all([fetchMovies, fetchSeries])
      .then(([movieData, seriesData]) => {
        setMovies(movieData.results || []);
        setSeries(seriesData.results || []);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados no servidor do TMDB:", error);
      })
      .finally(() => setLoading(false)); // Garante que o loading será desativado no final, independentemente do sucesso ou falha.
  }, []); // Importante para não fazer loop infinito

  const filtrar = (lista) => {
    return lista.filter((item) => {
      const nomeDoItem = (item.title || item.name).toLowerCase();
      const matchesSearch = nomeDoItem.includes(search.toLowerCase());
      const matchesGenre = genero === "" || item.genre_ids.includes(Number(genero));
      return matchesSearch && matchesGenre;
    });
  };

  return (
    <Container>
      <SearchBar>
        <div className="field-group">
          <label>O QUE VOCÊ PROCURA</label>
          <input
            type="text"
            placeholder="Ex: Batman, Matrix, Avengers"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="field-group">
          <label>GÊNERO</label>
          <select value={genero} onChange={(e) => setGenero(e.target.value)}>
            <option value="">Todos os Gêneros</option>
            <option value="28">Ação</option>
            <option value="35">Comédia</option>
            <option value="18">Drama</option>
            <option value="27">Terror</option>
          </select>
        </div>
        <button 
          className="btn-limpar" 
          onClick={() => {
            setSearch('');
            setGenero('');
          }}
        >
          Limpar Filtros
        </button>
      </SearchBar>

      {loading ? ( // Feedback de carregamento
        <p>Carregando...</p>
      ) : (
        <>
          <h2>Filmes Populares</h2>
          <MovieList>
            {filtrar(movies).map(movie => (
              <Movie key={movie.id}>
                <Link to={`/details/movie/${movie.id}`}>
                  <img src={`${img_path}${movie.poster_path}`} alt={movie.title} />
                </Link>
                <span>{movie.title}</span>
              </Movie>
            ))}
          </MovieList>

          <h2>Séries Populares</h2>
          <MovieList>
            {filtrar(movies).map(series => (
              <Movie key={series.id}>
                <Link to={`/details/tv/${series.id}`}>
                  <img src={`${img_path}${series.poster_path}`} alt={series.title} />
                </Link>  
                <span>{series.title}</span>
              </Movie>
            ))}
          </MovieList>

        </>
      )}
    </Container>
  );
}

export default Home;
