import { GET_ALL_VIDEOGAMES, GET_VIDEOGAME_DETAIL, GET_VIDEOGAME_DETAIL_NAME } from './../actions/index';

const initialState = {
  videogames: [],
  videogameDetail: {},
  videogameDetailName: {},
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ALL_VIDEOGAMES:
      return {...state, videogames: action.payload };
      case GET_VIDEOGAME_DETAIL:
        return { ...state, videogameDetail: action.payload };
      case GET_VIDEOGAME_DETAIL_NAME:
        return { ...state, videogameDetailName: action.payload };
      default:
        return state;
    }
  };

  export default rootReducer;