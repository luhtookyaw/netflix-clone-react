import React, { useState, useEffect } from 'react';
import axios from '../axios';

function Banner({ fetchUrl }) {
    const [movie, setMovie] = useState([]);

    const fetchData = async() => {
        const request = await axios.get(fetchUrl);
        setMovie(request.data.results[
            Math.floor(Math.random() * request.data.results.length)
        ]);
    }

    useEffect(() => {
        fetchData();
    }, [fetchUrl]);

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (
        <header 
            className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
                backgroundPosition: "center center",
            }}
        >
            <div className="banner-fadeTop"/>
            <div className="banner-contents">
                <h1 className="banner-title">{movie?.title || movie?.name || movie?.original_name}</h1>
                <div className="banner-buttons">
                    <button className="banner-button"><i class="fa fa-play"></i> Play</button>
                    <button className="banner-button">My List</button>
                </div>
                <h1 className="banner-description">{truncate(movie?.overview, 150)}</h1>
            </div>
            <div className="banner-fadeBottom"/>
        </header>
    );
}

export default Banner
