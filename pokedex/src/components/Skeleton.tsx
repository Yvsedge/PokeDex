import {motion} from "motion/react"
import { Link } from "react-router";
import { Volume2 } from "lucide-react";

export default function Skeleton(){
    return(
            <div className="mainContainer bg-red-600 flex flex-col h-screen pt-4 animate-pulse">
            {/* --- Upper Menu Section --- */}
            <div className="menuSection flex absolute gap-5 items-center animate-pulse">
                <Link
                    to={"/list"}
                    
                >
                    <motion.button
                        className="bg-zinc-500 p-3 w-30 border-2 border-black text-zinc-200 animate-pulse" 
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
                    background: `white` 
                }}
            >
                {/* INFOGRAPHICS SECTION */}
                <div className="flex flex-row w-full">
                    {/* LEFT SIDE: IMAGE */}
                    <motion.div 
                        className="flex-1 p-10 flex justify-center items-start border-2 border-black animate-pulse"
                    >
                    </motion.div>

                    {/* RIGHT SIDE: NAME, PHYSICALS, TYPES, STATS */}
                    <div className="flex-[1.5] p-5">
                        <div className="flex items-center justify-between mb-4">
                            <div className="Name capitalize">
                                <span className="text-black font-mono text-xl opacity-40 block">#000</span> 
                                <h1 className="text-4xl font-black tracking-tight">Pokemon</h1>
                            </div>
                            <motion.button 
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-3 bg-white border-2 border-zinc-200 rounded-full shadow-sm hover:bg-zinc-100 transition-colors"
                            >
                                <Volume2 size={24} className="text-zinc-600 animate-pulse" />
                            </motion.button>
                        </div>

                        {/* Height/Weight & Types Row */}
                        <div className="flex gap-4 mb-6 animate-pulse">
                            <div 
                                className="flex-1 p-4 rounded-xl shadow-md text-white grid grid-cols-2 animate-pulse"
                                style={{ background: `white`}}
                            >
                                <div><p className="text-[10px] uppercase font-bold opacity-70">Height</p><p className="font-bold">00 m</p></div>
                                <div><p className="text-[10px] uppercase font-bold opacity-70">Weight</p><p className="font-bold">00 kg</p></div>
                            </div>
                            <div className="flex flex-col gap-2 justify-center animate-pulse">
                            </div>
                        </div>

                        {/* Stats Block */}
                        <div className="bg-white/50 p-4 rounded-xl border border-zinc-200 backdrop-blur-sm animate-pulse">
                            <h3 className="font-bold mb-3 text-zinc-400 uppercase text-[10px] tracking-widest text-center animate-pulse">Base Statistics</h3>
                        </div>
                    </div>
                </div>

                {/* 2. BOTTOM SECTION: Evolution Chain */}
                <div className="mx-10 mb-10 mt-4 p-6 bg-white/40 rounded-2xl border-2 border-white/60 shadow-inner backdrop-blur-sm animate-pulse" >
                    <p className="text-[10px] font-black uppercase text-zinc-400 tracking-[0.3em] mb-6 text-center animate-pulse">
                        Genetic Evolution Sequence
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-8 animate-pulse">
                    </div>
                </div>
            </div>
            <div className="relative bottom-0 left-0 right-0 flex h-24 border-t-4 border-zinc-900 bg-red-700 overflow-hidden animate-pulse">
                
            </div>
        </div>
    )
}
