import { useState, useEffect } from 'react';

//import MovieCard file
import MovieCard from './MovieCard.jsx';

//import css styles and search icon
import './App.css';
import searchIcon from './search.svg';

//API Key: 765fa36a
const API_URL = 'http://www.omdbapi.com?apikey=765fa36a';


const App = () => {
    //create new states to access movies and search
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    //function to get movies from API
    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(() => {
        // searchMovies();
    }, [searchTerm]);

    //function to press Enter key to search
    const searchEnterKey = (e) => {
        if (e.key === 'Enter') {
            searchMovies(searchTerm)
        }
    }

    return(
        <div className = "app">
            <h1>Flick Finder🍿</h1>

            <div className = "search">
                <input
                    placeholder =  "Search for movies"
                    value = {searchTerm}
                    onChange = {(e) => setSearchTerm(e.target.value)}
                    onKeyDown={searchEnterKey}
                />
                <img
                    src = {searchIcon}
                    alt = "search"
                    onClick = {() => searchMovies(searchTerm)}
                />
            </div>

            {movies?.length > 0
                ? (
                    <div className = "container">
                        {movies.map((movie) => (
                            <MovieCard movie ={movie} />
                        ))} 
                    </div>
                ) : (
                    <div className = "empty">
                        <h2>Where tf the movies at?!🥺</h2>
                    </div> 
                )}
        </div>
    );
}

export default App;