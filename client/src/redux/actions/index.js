export const GET_VIDEOGAME_DETAIL = "GET_VIDEOGAME_DETAIL";
export const GET_ALL_VIDEOGAMES = "GET_ALL_VIDEOGAMES";
export const GET_VIDEOGAME_DETAIL_NAME = "GET_VIDEOGAME_DETAIL_NAME";

export const getPokemonDetails = (id) => {  
    return (dispatch) => {
    return fetch(`http://localhost:3001/videogames/id=?${id}`)
      .then(response => response.json())
      .then(data => {
        dispatch({ type: GET_VIDEOGAME_DETAIL, payload: data });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const getPokemonDetailsName = (name) => {  
  return (dispatch) => {
  return fetch(`http://localhost:3001/videogames/name=?${name}`)
    .then(response => response.json())
    .then(data => {
      dispatch({ type: GET_VIDEOGAME_DETAIL_NAME, payload: data });
    })
    .catch(error => {
      console.log(error);
    });
};
};

export const getAllPokemons = () => {
    return dispatch => {
        return fetch('http://localhost:3001/videogames')
          .then(response => response.json())
          .then(data => {
            dispatch({ type: GET_ALL_VIDEOGAMES, payload: data });
          })
          .catch(error => {
            console.log(error);
          });
      };
    };


