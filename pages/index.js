import { useState } from "react";
import Layout from "../components/Layout";
import Pokemon from "../components/Pokemon";

const Home = ({ pokemons }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const filteredPokemon = pokemons.filter((monster) =>
    monster.name.toLowerCase().includes(query.toLocaleLowerCase())
  );

  return (
    <Layout title={"Pokemon App"} favorite={"Favorites"}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        className="bg-slate-800 w-full mb-5 px-3 py-2 placeholder-gray-500 text-amber-400 rounded-t-md focus:outline-none "
        placeholder="Enter Pokemon Name ..."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10">
        {filteredPokemon.map((monster) => (
          <Pokemon key={monster.name} pokemon={monster} />
        ))}
      </div>
    </Layout>
  );
};

export default Home;

export const getStaticProps = async (context) => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=2000");
  const { results } = await response.json();

  return {
    props: {
      pokemons: results,
    },
  };
};
