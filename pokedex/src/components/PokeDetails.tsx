import { useParams } from "react-router";
import { useEffect, useState } from "react";
import React from "react";
import {motion} from "motion/react"
import { Link } from "react-router";
import { Volume2 } from "lucide-react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import usePokemonDetails from "../hook/usePokemonDetails";
import usePokemonEvoChain from "../hook/usePokemonEvoChain";

const typeColors: Record<string, string> = {
    fire: "#D8223B",
    water: "#05A8D9",
    grass: "#19A648",
    electric: "#FCD021",
    psychic: "#957DAB",
    ice: "#74D1F1",
    dragon: "#948F31",
    dark: "#605D20",
    fairy: "#D6457E",
    normal: "#898787",
    fighting: "#B16232",
    poison: "#A43E9E",
    ground: "#D3B357",
    flying: "#A891EC",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    steel: "#9B9E8C"
};


/*https://pokeapi.co/api/v2/pokemon/1/*/

export default function PokeDetails(){
    const { id } = useParams();
    const [shiny, setShiny] = useState(false);

    const numId = Number(id) | 0;

    const {dets, loading, error} = usePokemonDetails(id);
    const { evoChain, loadingEvo } = usePokemonEvoChain(dets?.species?.url);



    if (loading || !dets) return <div>Loading details...</div>;
    const height = (dets.height / 10);
    const primaryType = dets.types[0].type.name;
    const themeColor = typeColors[primaryType] || "#ffffff";
    const weight = (dets.weight / 10);
    const cry = dets.cries.latest;
    const playCry = () => {
        const cryUrl = dets?.cries?.latest;

        if (cryUrl) {

            const audio = new Audio(cry);
            
            audio.volume = 0.5;

            audio.play().catch(err => console.error("Audio play failed:", err));
        }
    };
    if (error) return <div className="text-red-500">{error}</div>;

    return(
        <div className="mainContainer bg-red-600 flex flex-col h-screen pt-4">
            {/* --- Upper Menu Section --- */}
            <div className="menuSection flex absolute gap-5 items-center">
                <Link
                    to={"/list"}
                    
                >
                    <motion.button
                        className="bg-zinc-500 p-3 w-30 border-2 border-black text-zinc-200"
                        whileHover={{scale : 1.1}}
                        whileTap={{scale : 0.95}}
                    > Menu </motion.button>
                </Link>
                <div className="w-5 bg-blue-600 h-5 rounded-full border border-black shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
                <div className="w-5 bg-yellow-600 h-5 rounded-full border border-black shadow-[0_0_8px_rgba(255, 255, 0,0.8)]"></div>
                <div className="w-5 bg-green-600 h-5 rounded-full border border-black shadow-[0_0_8px_rgba(0, 128, 0,0.8)]"></div>
            </div>
            {/* --- SCREEN SECTION --- */}
            <div 
                className="flex flex-col flex-1 mx-6 mt-6 mb-2 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] border-4 border-zinc-800 transition-colors duration-500 rounded-xl overflow-y-auto"
                style={{ 
                    background: `linear-gradient(to bottom right, #ffffff, ${themeColor}22)` 
                }}
            >
                {/* INFOGRAPHICS SECTION */}
                <div className="flex flex-row w-full">
                    {/* LEFT SIDE: IMAGE */}
                    <motion.div 
                        className="flex-1 p-10 flex justify-center items-start"
                        onClick={() => setShiny(!shiny)}
                    >
                        <motion.img 
                            src={!shiny ? dets.sprites.other["official-artwork"].front_default : dets.sprites.other["official-artwork"].front_shiny} 
                            alt={dets.name} 
                            className="w-64 h-64 bg-zinc-200 rounded-full object-contain border-2 border-black cursor-pointer shadow-lg"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ rotate: 360 * 2 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        />
                    </motion.div>

                    {/* RIGHT SIDE: NAME, PHYSICALS, TYPES, STATS */}
                    <div className="flex-[1.5] p-5">
                        <div className="flex items-center justify-between mb-4">
                            <div className="Name capitalize">
                                <span className="text-black font-mono text-xl opacity-40 block">#{id?.padStart(3, '0')}</span> 
                                <h1 className="text-4xl font-black tracking-tight">{dets.name}</h1>
                            </div>
                            <motion.button 
                                onClick={playCry}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-3 bg-white border-2 border-zinc-200 rounded-full shadow-sm hover:bg-zinc-100 transition-colors"
                            >
                                <Volume2 size={24} className="text-zinc-600" />
                            </motion.button>
                        </div>

                        {/* Height/Weight & Types Row */}
                        <div className="flex gap-4 mb-6">
                            <div 
                                className="flex-1 p-4 rounded-xl shadow-md text-white grid grid-cols-2"
                                style={{ background: `linear-gradient(90deg, ${themeColor} 0%, ${themeColor}bb 100%)` }}
                            >
                                <div><p className="text-[10px] uppercase font-bold opacity-70">Height</p><p className="font-bold">{height.toFixed(2)}m</p></div>
                                <div><p className="text-[10px] uppercase font-bold opacity-70">Weight</p><p className="font-bold">{weight.toFixed(2)}kg</p></div>
                            </div>
                            <div className="flex flex-col gap-2 justify-center">
                                {dets.types.map((t: any) => (
                                    <span key={t.type.name} style={{ backgroundColor: typeColors[t.type.name] }} className="px-4 py-0.5 rounded-full text-white text-[10px] font-black uppercase shadow-sm">
                                        {t.type.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Stats Block */}
                        <div className="bg-white/50 p-4 rounded-xl border border-zinc-200 backdrop-blur-sm">
                            <h3 className="font-bold mb-3 text-zinc-400 uppercase text-[10px] tracking-widest text-center">Base Statistics</h3>
                            {dets.stats.map((st: any) => (
                                <div key={st.stat.name} className="grid grid-cols-[80px_1fr_30px] items-center mb-1.5 ">
                                    <p className="text-[10px] font-bold text-zinc-500 uppercase">{st.stat.name.replace('special-', 'sp. ')}</p>
                                    <div className="bg-zinc-200 h-1.5 w-full rounded-full overflow-hidden mx-2">
                                        <motion.div 
                                            className="h-full rounded-full" 
                                            style={{ background: themeColor }}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(st.base_stat / 255) * 100}%` }}
                                            transition={{ duration: 1, ease: "easeOut" }}
                                        />
                                    </div>
                                    <p className="text-right text-[10px] font-bold text-zinc-400">{st.base_stat}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 2. BOTTOM SECTION: Evolution Chain */}
                <div className="mx-10 mb-10 mt-4 p-6 bg-white/40 rounded-2xl border-2 border-white/60 shadow-inner backdrop-blur-sm">
                    <p className="text-[10px] font-black uppercase text-zinc-400 tracking-[0.3em] mb-6 text-center">
                        Genetic Evolution Sequence
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-8">
                        {loadingEvo ? (
                            <div className="animate-pulse text-zinc-400 text-xs font-mono">CALIBRATING DNA...</div>
                        ) : (
                            evoChain.map((stage, index) => (
                                <React.Fragment key={stage.id}>
                                    <Link to={`/pokemon/${stage.id}`}>
                                        <motion.div 
                                            whileHover={{ scale: 1.1, y: -5 }}
                                            className={`flex flex-col items-center p-3 rounded-2xl transition-all ${
                                                stage.id === id 
                                                ? "bg-white ring-4 ring-blue-500 shadow-2xl scale-110 z-10" 
                                                : "opacity-40 grayscale hover:grayscale-0 hover:opacity-100 hover:bg-white/50"
                                            }`}
                                        >
                                            <img src={stage.image} alt={stage.name} className="w-20 h-20 object-contain" />
                                            <span className="text-[10px] font-black uppercase mt-2 text-zinc-600">{stage.name}</span>
                                        </motion.div>
                                    </Link>
                                    {index < evoChain.length - 1 && (
                                        <div className="text-zinc-300 font-black text-2xl animate-pulse">→</div>
                                    )}
                                </React.Fragment>
                            ))
                        )}
                    </div>
                </div>
            </div>
            <div className="relative bottom-0 left-0 right-0 flex h-24 border-t-4 border-zinc-900 bg-red-700 overflow-hidden">
                
                {/* LEFT SHOULDER (PREV) */}
                <Link 
                    to={Number(id) > 1 ? `/pokemon/${Number(id) - 1}` : "/list"}
                    className="flex-1 group relative overflow-hidden flex items-center justify-start px-8 hover:bg-red-700 transition-colors border-r-2 border-zinc-900"
                >
                    <motion.div 
                        className="flex items-center gap-4 text-white group-hover:text-black"
                        whileTap={{ y: 4 }} // Sinks the button when clicked
                    >
                        <ChevronLeft size={32} />
                        <div className="flex flex-col">
                            <span className="text-xs font-bold uppercase tracking-tighter opacity-50">L - Trigger</span>
                            <span className="text-lg font-black italic uppercase">Previous</span>
                            <span className="text-xs italic uppercase text-right tracking-tighter"> {String(numId - 1).padStart(3, '0')} </span>
                        </div>
                    </motion.div>
                    
                    {/* Grip Lines Decoration */}
                    <div className="absolute left-2 flex flex-col gap-1 opacity-50">
                        <div className="h-10 w-1 bg-black rounded-full"></div>
                        <div className="h-10 w-1 bg-black rounded-full"></div>
                    </div>
                </Link>

                {/* RIGHT SHOULDER (NEXT) */}
                <Link 
                    to={Number(id) < 386 ? `/pokemon/${Number(id) + 1}` : "/list"}
                    className="flex-1 group relative overflow-hidden flex items-center justify-end px-8 hover:bg-red-700 transition-colors"
                >
                    <motion.div 
                        className="flex items-center gap-4 text-white group-hover:text-black text-right"
                        whileTap={{ y: 4 }}
                    >
                        <div className="flex flex-col">
                            <span className="text-xs font-bold uppercase tracking-tighter opacity-50">R - Trigger</span>
                            <span className="text-lg font-black italic uppercase">Next</span>
                            <span className="text-xs italic uppercase text-left tracking-tighter"> {String(numId + 1).padStart(3, '0')} </span>
                        </div>
                        <ChevronRight size={32} />
                    </motion.div>

                    {/* Grip Lines Decoration */}
                    <div className="absolute right-2 flex flex-col gap-1 opacity-50">
                        <div className="h-10 w-1 bg-black rounded-full"></div>
                        <div className="h-10 w-1 bg-black rounded-full"></div>
                    </div>
                </Link>
            </div>
    </div>
    )
}
