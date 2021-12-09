import React, { useState, useEffect} from 'react'; //rfce
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import Popup from 'reactjs-popup';
import { IoCloseCircleSharp } from 'react-icons/io5';
import axios from '../axios';

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [menu, setMenu] = useState(false);
    const [desc, setDesc] = useState({overview: "", release: "", lang: "", popularity: "", title: ""});
    const [trailerUrl, setTrailerUrl] = useState("");

    const fetchData = async() => {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);
    }
    useEffect(() => {
        fetchData();
    }, [fetchUrl]);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };

    const handlePlay = (movie) => {
        if (trailerUrl) {
            setTrailerUrl("");
        } else {
            movieTrailer(movie?.title || "")
                .then((url) => {
                    //https://www.youtube.com/watch?v=XtMThy8QKqU&t=9641s
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get("v"));
                    setMenu(true);
                    setDesc({
                        overview: movie?.overview, 
                        release: movie?.release_date, 
                        lang: movie?.original_language,
                        popularity: movie?.popularity,
                        title: movie?.title,
                    });
                })
                .catch((error) => console.log(error));
        }
    }

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (
        <div className="row">
            <h2 className={`row-title ${isLargeRow && "large"}`}>{title}</h2>
            <div className="row-posters">
                {movies.map((movie) => (
                    <img 
                        key={movie.id}
                        onClick={() => handlePlay(movie)}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.title}
                        className={`row-poster ${isLargeRow && "row-posterLarge"}`}/>
                ))}
            </div>
            <Popup open={menu} closeOnDocumentClick onClose={() => setMenu(false)}>
                <div className="popup-card">
                    <a className="close-button" onClick={() => setMenu(false)}>
                        <IoCloseCircleSharp size={35}/>
                    </a>
                    { trailerUrl && <YouTube videoId={trailerUrl} opts={opts} className="trailer"/> }
                    <div className="movie-overview">
                        <div>
                            <h5><span className="label">Release: </span>{desc.release}</h5>
                            <h3 className="movie-desc">{truncate(desc.overview, 100)}</h3>
                        </div>
                        <div>
                            <h4><span className="label">Title: </span>{desc.title}</h4>
                            <h4><span className="label">Language: </span>{desc.lang}</h4>
                            <h4><span className="label">Popularity: </span>{desc.popularity}</h4>
                        </div>
                    </div>
                </div>
            </Popup>
        </div>
    );
}

export default Row;