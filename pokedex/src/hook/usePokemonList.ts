import { useState, useEffect } from "react";

// 1. Define the shape of what this hook gives back
interface PokemonHook {
    poke: any[];
    loading: boolean;
    error: string | null;
}

const usePokemonList = (): PokemonHook => {    
    const [loading, setLoading] = useState(false);
    const [poke, setPoke] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const getPoke = async () => {
            try {
                setLoading(true);
                const url = "https://pokeapi.co/api/v2/pokemon?limit=386";
                const response = await fetch(url);
                
                if (!response.ok) {
                    throw new Error("Failed to fetch Pokemon list.");
                }

                const json = await response.json();
                setPoke(json.results);
            } catch (err) {
                setError(err instanceof Error ? err.message : "An unknown error occurred");
            } finally {
                setLoading(false);
            }
        }
        getPoke();
    }, []);

    return { poke, loading, error };
}

export default usePokemonList;
