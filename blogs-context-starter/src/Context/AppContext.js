import { createContext, useState } from "react";
import {baseUrl} from '../baseUrl';

//step1
export const AppContext = createContext();

export default function AppContextProvider({children}) {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [page,setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);

    //data filling
    async function fetchBlogPosts(page = 1) {
        setLoading(true)
        let url = `${baseUrl}?page=${page}`;
        try {
            const result = await fetch(url);
            const data = await result.json();
            console.log(data)
            setPage(data?.page);
            setPosts(data?.posts);
            setTotalPages(data?.totalPages);
        }
        catch (e) {
            console.log("Error")
            setPage(1);
            setPosts([]);
            setTotalPages(null);
        }
        setLoading(false);
    }


    function handlePageChange(page) {   
        setPage(page);
        fetchBlogPosts(page);
    }

    const value = {
        posts,
        setPosts,
        loading,
        setLoading,
        page,
        setPage,
        totalPages,
        setTotalPages,
        fetchBlogPosts,
        handlePageChange
    };

    //step2
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}
