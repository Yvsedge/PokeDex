import { useState , useEffect } from "react";

interface PokemonDetailsHook {
    dets: any | null,
    loading : boolean,
    error : string | null,
}

const usePokemonDetails = (id : string | undefined): PokemonDetailsHook => {    
    const [loading, setLoading] = useState(false);
    const [dets, setDets] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);
    
    useEffect( () => {

            if (!id) return;

            const getPoke = async () => {
               try {
                   setLoading(true);
                   setError(null);
                   const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
                   const response = await fetch(url);
                   
                   if (response.status === 429) {
                       throw new Error("Rate limit hit.");
                   }
   
                   const json = await response.json();
                   setDets(json);
               } catch (err) {
                   setError(err instanceof Error ? err.message : "An unknown error occurred");
               } finally {
                   setLoading(false);
               }    
           }
           getPoke();
       }, [id]);

    return { dets, loading, error };
}

export default usePokemonDetails;
