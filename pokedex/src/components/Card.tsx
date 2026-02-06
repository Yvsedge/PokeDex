import {motion} from "motion/react"
import { usePokemonStore } from "../store/usePokemonStore";
import PokeBall from "../assets/ball.jpg"

interface CardProps{
    id : number,
    name : string,
    imgAddess : string,
}


export default function Card({id, name, imgAddess} : CardProps){
    const caughtPokemon = usePokemonStore((state) => state.caughtPokemon);
    const isCaught = caughtPokemon.includes(id);
    return(
        
        <motion.div 
            className="w-full bg-white border border-zinc-100 rounded-2xl p-4 flex flex-col items-center shadow-sm hover:shadow-md transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <span className="self-start text-zinc-400 font-mono text-sm">#{String(id - 1).padStart(3, '0')}</span>
                {isCaught && (
                <motion.img 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    src={PokeBall} 
                    alt="caught"
                    className="absolute top-3 right-3 w-6 h-6 object-contain drop-shadow-sm" 
                />
            )}
            
            <div className="bg-zinc-50 rounded-full p-4 my-2">
                <img src={imgAddess} alt={name} className="w-28 h-28 object-contain"loading="lazy" />
            </div>

            <h3 className="text-xl capitalize font-bold text-zinc-800 tracking-tight">
                {name}
            </h3>
        </motion.div>
    )
}
