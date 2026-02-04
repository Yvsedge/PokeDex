interface CardProps{
    id : number,
    name : string,
    imgAddess : string,
}
import {motion} from "motion/react"


export default function Card({id, name, imgAddess} : CardProps){
    return(
        <motion.div 
            className="w-full bg-white border border-zinc-100 rounded-2xl p-4 flex flex-col items-center shadow-sm hover:shadow-md transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <span className="self-start text-zinc-400 font-mono text-sm">#{String(id).padStart(3, '0')}</span>
            
            <div className="bg-zinc-50 rounded-full p-4 my-2">
                <img src={imgAddess} alt={name} className="w-28 h-28 object-contain"loading="lazy" />
            </div>

            <h3 className="text-xl capitalize font-bold text-zinc-800 tracking-tight">
                {name}
            </h3>
        </motion.div>
    )
}
