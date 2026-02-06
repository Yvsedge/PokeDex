import { useState, useEffect } from "react";
import Card from "./Card"; 
import usePokemonList from "../hook/usePokemonList";

import {motion} from "motion/react"

import { Link } from "react-router";

export default function Pokelist(){
    const [search, setSearch] = useState("")
    const [region, setRegion] = useState(386);
    const [offset, setOffset] = useState(1);
    const { poke, loading, error } = usePokemonList(region , offset);
    

    const filteredPokemon = poke.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))

    if(loading) return(<div className="text-center mt-20">Loading Pokedex....</div>);
    if (error) return <div className="text-red-500">{error}</div>;

    return(
        <div className="flex flex-col justify-center items-center bg-red-500 min-h-full">
            <input type="text" 
                name="pokesearch" 
                id="pokesearch" 
                placeholder="Mew" 
                className="mt-10 w-10/12 text-xl bg-white rounded-full py-1 px-6 shadow-inner border-4 border-zinc-800 outline-none focus:border-purple-800 transition-all"
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className="m-2 w-10/12 flex justify-center gap-4">
                <motion.button 
                onClick={() => { setRegion(151); setOffset(0); }}   
                className="rounded-xl bg-white p-4 border-2 border-black"
                whileTap={{scale  : 0.86}}  
                >Kanto
                </motion.button>

                <motion.button 
                onClick={() => { setRegion(100); setOffset(151); }} 
                className="rounded-xl bg-white p-4 border-2 border-black"
                whileTap={{scale  : 0.86}}
                >Johto
                </motion.button>

                <motion.button 
                    onClick={() => { setRegion(135); setOffset(251); }} 
                    className="rounded-xl bg-white p-4 border-2 border-black"
                    whileTap={{scale  : 0.86}}
                    >Hoenn
                </motion.button>

                <motion.button 
                    onClick={() => { setRegion(386); setOffset(0); }} 
                    className="rounded-xl bg-white p-4 border-2 border-black"
                    whileTap={{scale  : 0.86}}
                    >Clear
                </motion.button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 bg-white m-5 p-5 w-10/12 shadow-xl rounded-lg">
                {filteredPokemon.length > 0 ? (
                    filteredPokemon.map((p) => {
                        const urlParts = p.url.split("/");
                        const id = urlParts[urlParts.length - 2];
                        const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
                        
                        return (
                            <Link key={id} to={`/pokemon/${id}`}>
                                {/* Convert id to number if your Card component expects a number */}
                                <Card id={Number(id)} name={p.name} imgAddess={imgUrl} />
                            </Link>
                        );
                    })
                ) : (
                    <div className="col-span-full text-center p-10 text-zinc-500 italic">
                        No Pokémon found matching "{search}"
                    </div>
                )}
            </div>
        </div>
    )
}
