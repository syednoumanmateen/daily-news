import News from './News';
import { useEffect, useState, type FC } from 'react';
import axiosInstance from './axiosConfig';
import type { country } from './data';

export interface Article {
    source: {
        id: string | null;
        name: string;
    };
    author: string | null;
    title: string;
    description: string;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string;
}

interface HomeProps {
    open: string;
    search: string;
    searchSelectCountry: country;
    searchSelectCategory: string;
}

const Home: FC<HomeProps> = ({ open, search, searchSelectCountry, searchSelectCategory }) => {
    const [news, setNews] = useState<Article[]>([]);
    const [page, setPage] = useState<number>(1)

    useEffect(() => {
        const fetchNews = async () => {
            try {
                let url = open === "Search" ? '/everything' : '/top-headlines'
                let params = open === "Search" ? { q: search } : open === "Country" ? { country: searchSelectCountry.code } : { category: searchSelectCategory }
                const response = await axiosInstance.get(url, { params: { ...params, page, pageSize: 10, sortBy: "popularity" } });
                setNews(response.data.articles);
            } catch (error) {
                console.error('Failed to fetch news:', error);
            }
        };

        fetchNews();
    }, [searchSelectCountry, searchSelectCategory, search, page, open]);

    return (
        <>
            <div className="container-fluid">
                {/* Here you can map and render news articles */}
                <News news={news} />
            </div>
            <div className="d-grid gap-2 d-flex align-items-end justify-content-end m-3">
                <button className="btn btn-primary" type="button" onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1}>Prev</button>
                <button className="btn btn-primary" type="button" onClick={() => setPage(1)} disabled={page === 1}>Reset</button>
                <button className="btn btn-primary" type="button" onClick={() => setPage(prev => prev + 1)}>Next</button>
            </div>
        </>
    );
}

export default Home;
