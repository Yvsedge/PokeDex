import { useState } from 'react'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router';

export default function Entrance(){
    const [isOpened, setIsOpened] = useState(false);
    const navigate = useNavigate();

    return(
        <div className="relative flex items-center justify-center h-screen overflow-hidden">
            <motion.div
                animate = {isOpened ? {y : "-100%"} : { y : 0 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="absolute top-0 w-full h-1/2 bg-red-600 border-b-8 border-black"
            ></motion.div>

            <motion.button
                onClick={() => 
                    {
                        setIsOpened(!isOpened);
                        setTimeout(() => navigate("/list"), 800);
                    }
                }
                whileHover={{scale : 1.1}}
                animate = {isOpened ? {opacity : 0} : {}}
                className= 'absolute z-10 w-24 h-24 bg-white  border-8 border-black rounded-full'
            >
            </motion.button>

            <motion.div
                animate = {isOpened ? {y : "100%"} : { y : 0 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="absolute bottom-0 w-full h-1/2 bg-white border-t-8 border-black"
            ></motion.div>
        </div>
    )
}
