import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import FavoriteIcon from "@mui/icons-material/Favorite";
import { pink } from "@mui/material/colors";
import { PokemonContext } from "../context/PokemonProvider";

const Pokemon = ({ pokemon }) => {
  const { addMyList, myList, removeMylist } = useContext(PokemonContext);
  const [color, setColor] = useState();

  let stored = myList.find((m) => m.name === pokemon.name);

  const isMyList = stored ? true : false;

  useEffect(() => {
    if (isMyList) {
      setColor(pink[500]);
    } else {
      setColor();
    }
  }, [myList]);

  const index = pokemon?.url
    .split("https://pokeapi.co/api/v2/pokemon/")[1]
    .split("/")[0];

  const pokeIndex = ("000" + index).slice(-3);

  const imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokeIndex}.png`;

  const handleAdd = () => {
    const newPokemon = {
      name: pokemon.name,
      url: imageUrl,
    };

    if (isMyList) {
      return removeMylist(pokemon.name);
    } else {
      addMyList(newPokemon);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Link href={`/pokemon/${pokemon.name}`}>
        <a>
          <div className="bg-slate-900 hover:scale-105 hover:shadow rounded p-5 flex flex-col justify-center items-center relative">
            <Image alt={pokemon.name} width={150} height={150} src={imageUrl} />
            <span className="uppercase font-semibold tracking-wider text-amber-400">
              {pokemon.name}
            </span>
          </div>
        </a>
      </Link>

      <FavoriteIcon
        className="mt-3 hover:scale-125"
        fontSize="large"
        onClick={handleAdd}
        sx={{ color: color }}
      />
    </div>
  );
};

export default Pokemon;
