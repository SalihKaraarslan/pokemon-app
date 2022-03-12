import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Layout from "../../components/Layout";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { pink } from "@mui/material/colors";
import { PokemonContext } from "../../context/PokemonProvider";

const Pokemon = ({ pokemon }) => {
  const { addMyList, myList, removeMylist } = useContext(PokemonContext);
  const [color, setColor] = useState();

  const pokeName = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

  const index = pokemon.species.url
    .split("https://pokeapi.co/api/v2/pokemon-species/")[1]
    .split("/")[0];

  const pokeIndex = ("000" + index).slice(-3);

  const imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokeIndex}.png`;

  let stored = myList?.find((m) => m.name === pokemon.name);

  const isMyList = stored ? true : false;

  const renderTypes = () =>
    pokemon.types.map((type) => (
      <li key={type.slot} className="px-2 py-1 bg-slate-700 rounded">
        {type.type.name}
      </li>
    ));

  const renderStats = () =>
    pokemon.stats.map((stat, index) => (
      <div key={index} className="bg-slate-700 my-2 rounded p-1">
        <div
          className="bg-slate-900 rounded px-2"
          style={{ width: `${stat.base_stat}%` }}
        >
          {stat.stat.name}: {stat.base_stat}
        </div>
      </div>
    ));

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

  useEffect(() => {
    if (isMyList) {
      setColor(pink[500]);
    } else {
      setColor();
    }
  }, [myList]);

  return (
    <Layout title={pokeName} favorite={"Favorites"}>
      <div className="flex flex-row justify-around items-center">
        <Image alt={pokemon.name} width={400} height={400} src={imageUrl} />
        <FavoriteIcon
          className=" hover:scale-125"
          onClick={handleAdd}
          sx={{ color: color, fontSize: 160 }}
        />
      </div>

      <div className="bg-slate-900 rounded p-5">
        <ul className="flex gap-5">{renderTypes()}</ul>

        <div>{renderStats()}</div>
      </div>
    </Layout>
  );
};

export default Pokemon;

export const getServerSideProps = async (context) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${context.query.name}`
  );
  const pokemon = await response.json();

  return {
    props: {
      pokemon,
    },
  };
};
