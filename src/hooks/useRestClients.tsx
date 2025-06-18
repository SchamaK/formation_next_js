"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useRestClients<T = any>(url: string) {
    const { data, isLoading, error } = useQuery({
        queryKey: [url],
        queryFn: () => axios.get(url).then(res => res.data),
        enabled: !!url, // Évite le fetch si l'URL est vide
    });

    return { datas: data as T[], loading: isLoading, error };
}
