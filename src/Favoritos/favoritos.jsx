import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import { Container, MovieList,  Movie } from "../style";

function Favorites(){
    //Variável/Gaveta para guardar os item que estão no Local Storage
     const [favs, setFavs] = useState([])


     const img_path = 'https://image.tmdb.org/t/p/w500/'


     useEffect(()=>{
        const savedFavs = JSON.parse(localStorage.getItem('favorites'))
        setFavs(savedFavs)
     },[])

     
return(<>
<Header/>
<Container>
    <MovieList>
        {favs.map(movie => 
            (<Movie key={movie.id}>
                <Link to={`/details/movie/${movie.id}`}>
                <img src={`${img_path}${movie.poster}`}
                alt={movie.title}/>
                </Link>
              <span>{movie.title}</span>  
            </Movie>))}
    </MovieList>
</Container>
<Footer/>
</>)
    
}

export default Favorites

