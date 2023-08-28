import React, { useState } from 'react';
import SearchBar from '../../SearchBar/SearchBar'; // Importar el componente SearchBar
import SearchResult from '../../SearchResult/SearchResult'; // Importar el componente SearchResult
import { Link } from "react-router-dom";
import { getPokemonDetailsName } from '../../redux/actions/index';
import { useSelector } from 'react-redux';

const Nav = () => {
  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = (name) => {
    getPokemonDetailsName(name)
      .then((data) => {
        setSearchResult(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Obtener el estado pokemonDetailName del store
  const pokemonDetailName = useSelector((state) => state.pokemonDetailName);

  return (
    <div className="nav">
      <Link to="/Home">Home</Link>
      <Link to="/NewVideoGame">New Videogame</Link>
      <SearchBar onSearch={handleSearch} />
      <SearchResult searchResult={pokemonDetailName} />
    </div>
  );
};

export default Nav;