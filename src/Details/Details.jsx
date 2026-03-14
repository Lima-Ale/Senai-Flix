import Header from '../Header'
import Footer from '../Footer'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { APIKEY } from '../config/key'
import { Container } from './style'

function Details() {
  
  const img_path = 'https://image.tmdb.org/t/p/w500'
  const { type, id } = useParams()

  const [content, setContent] = useState(null)
  const [trailerKey, setTrailerKey] = useState(null)
  const [cast, setCast] = useState([])
  const [genres, setGenres] = useState([])
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    async function fetchContent() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${type}/${id}?api_key=${APIKEY}&language=pt-BR`
        )
        const data = await response.json()
        
        setContent({
          id,
          title: data.title || data.name,
          overview: data.overview,
          releaseDate: data.release_date || data.first_air_date,
          poster: data.poster_path,
          rating: data.vote_average
        })

        setGenres(data.genres || [])

        const videosResponse = await fetch(
          `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${APIKEY}&language=pt-BR`
        )
        const videosData = await videosResponse.json()
        
        if (videosData.results) {
          const trailer = videosData.results.find(v => v.type === 'Trailer' && v.site === 'YouTube')
          if (trailer) setTrailerKey(trailer.key)
        }

        const creditsResponse = await fetch(
          `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${APIKEY}&language=pt-BR`
        )
        const creditsData = await creditsResponse.json()
        
        if (creditsData.cast) setCast(creditsData.cast.slice(0, 8))

      } catch (error) {
        console.error('Erro ao buscar detalhes:', error)
      }
    }

    fetchContent()

    const favorites = JSON.parse(localStorage.getItem('favorites')) || []
    setIsFavorite(favorites.some(fav => fav.id === id))

  }, [id, type])

  function toggleFavorite() {
    // 1. Pega a lista atual ou cria uma vazia
    let favorites = JSON.parse(localStorage.getItem('favorites')) || []
    
    // 2. Verifica se o item já existe (Garantindo que comparamos tipos iguais com String())
    const isAlreadyFavorite = favorites.some(fav => String(fav.id) === String(id))

    if (isAlreadyFavorite) {
      // REMOVER: Filtra a lista mantendo apenas o que for diferente do ID atual
      favorites = favorites.filter(fav => String(fav.id) !== String(id))
    } else {
      // ADICIONAR: Adiciona o objeto content atual
      favorites.push(content)
    }

    // 3. Salva de volta no LocalStorage e atualiza o estado visual
    localStorage.setItem('favorites', JSON.stringify(favorites))
    setIsFavorite(!isAlreadyFavorite)
  }

  return (
    <>
      <Header />
      <Container>
        {!content && <p>Carregando detalhes...</p>}

        {content && (
          <>
            <div className="details">
              <img
                src={content.poster ? `${img_path}${content.poster}` : 'https://placehold.co/300x450'}
                alt={content.title}
              />

              <div className="info">
                <h1>{content.title}</h1>
                
                <div className="genres">
                  {genres.map(g => <span className="genre" key={g.id}>{g.name}</span>)}
                </div>

                <p className="sinopse"><strong>Sinopse:</strong> {content.overview}</p>
                <p className="release"><strong>Lançamento:</strong> {content.releaseDate}</p>
                
                <p className="rating"><strong>Avaliação:</strong> <span>{content.rating?.toFixed(1)}/10</span></p>
                
                {/* O botão abaixo muda o texto e a classe conforme o estado isFavorite */}
                <button 
                  className={`favorite-btn ${isFavorite ? 'active' : ''}`} 
                  onClick={toggleFavorite}
                  style={{ backgroundColor: isFavorite ? '#ff4d4d' : '#2196f3', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '10px' }}
                >
                  {isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
                </button>
                
                <Link to='/'><button className="botaoInfo">Voltar</button></Link>
              </div>
            </div>

            {trailerKey && (
              <div className="trailer">
                <h2>Trailer</h2>
                <iframe 
                  src={`https://www.youtube.com/embed/${trailerKey}`} 
                  title='Trailer' 
                  allowFullScreen 
                />
              </div>
            )}

            {cast.length > 0 && (
              <div className="cast">
                <h2>Elenco</h2>
                <div className="cast-list">
                  {cast.map(actor => (
                    <div className="actor" key={actor.id}>
                      <img
                        src={actor.profile_path ? `${img_path}${actor.profile_path}` : 'https://placehold.co/150x200'}
                        alt={actor.name}
                      />
                      <p className="actor-name">{actor.name}</p>
                      <p className="actor-character">{actor.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </Container>
      <Footer />
    </>
  )
}

export default Details
