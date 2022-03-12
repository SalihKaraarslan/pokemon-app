import jsCookie from "js-cookie";
import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

export const PokemonContext = createContext();

const PokemonProvider = ({ children }) => {
  const initialState = {
    myList: jsCookie.get("myList") ? JSON.parse(jsCookie.get("myList")) : [],
  };

  const [state, dispatch] = useReducer(Reducer, initialState);

  const { myList } = state;

  useEffect(() => {
    jsCookie.set("myList", JSON.stringify(myList));
  }, [state]);

  const addMyList = (monster) => {
    dispatch({
      type: "ADD_MY_LIST",
      payload: monster,
    });
  };

  const removeMylist = (id) => {
    dispatch({
      type: "REMOVE_MYLIST",
      payload: id,
    });
  };

  return (
    <PokemonContext.Provider
      value={{ myList, dispatch, addMyList, removeMylist }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonProvider;
