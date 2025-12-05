import React, { useReducer, useState } from "react";
import { movieReducer, initialState } from "../reducer/movieReducer";
import { searchMovies } from "../api/movieApi";
import { type Movie } from "../types/movie";

export default function MovieSearch() {
    const [state, dispatch] = useReducer(movieReducer, initialState);
    const [query, setQuery] = useState("");

    async function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        if (!query.trim()) return;

        dispatch({ type: "FETCH_START" });

        try {
            const results = await searchMovies(query);

            if (results.length > 0) {
                dispatch({ type: "FETCH_SUCCESS", payload: results });
            } else {
                dispatch({ type: "FETCH_ERROR", payload: "Nenhum resultado encontrado" });
            }
        } catch {
            dispatch({ type: "FETCH_ERROR", payload: "Erro ao buscar filmes" });
        }
    }

    return (
        <></>
    );
}
