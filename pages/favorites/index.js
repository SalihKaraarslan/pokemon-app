import React, { useContext } from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import { PokemonContext } from "../../context/PokemonProvider";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { pink } from "@mui/material/colors";
import Image from "next/image";
import dynamic from "next/dynamic";

const Favorites = () => {
  const { myList, removeMylist } = useContext(PokemonContext);

  return (
    <Layout title="Favorite Pokemons">
      {myList?.length < 1 ? (
        <div className="font-semibold tracking-wider text-amber-400">
          Your list is empty. Please add some pokemon...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10">
          {myList?.map((pokemon) => (
            <div key={pokemon.name} className="flex flex-col items-center">
              <Link href={`/pokemon/${pokemon.name}`}>
                <a>
                  <div className="bg-slate-900 hover:scale-105 hover:shadow rounded p-5 flex flex-col justify-center items-center relative">
                    <Image
                      alt={pokemon.name}
                      width={150}
                      height={150}
                      src={pokemon.url}
                    />
                    <span className="uppercase font-semibold tracking-wider text-amber-400">
                      {pokemon.name}
                    </span>
                  </div>
                </a>
              </Link>
              <FavoriteIcon
                className="mt-3 hover:scale-125"
                fontSize="large"
                onClick={() => removeMylist(pokemon.name)}
                sx={{ color: pink[500] }}
              />
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(Favorites), { ssr: false });
