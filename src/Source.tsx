import { useEffect, useState } from "react";
import axiosInstance from "./axiosConfig";

interface SourceType {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

const Source = () => {
    const [sources, setSources] = useState<SourceType[]>([]);

    useEffect(() => {
        const fetchSources = async () => {
            try {
                const response = await axiosInstance.get("/top-headlines/sources");
                setSources(response.data.sources);
            } catch (error) {
                console.error("Failed to fetch sources:", error);
            }
        };

        fetchSources();
    }, []);

    if (!sources.length) {
        return <p className="text-center mt-5">No sources found.</p>
    }

    return (
        <div className="row g-3 p-3">
            {sources.map((source) => (
                <div className="col-sm-12 col-md-4" key={source.id}>
                    <div className="card h-100 shadow-sm">
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title">{source.name}</h5>
                            <p className="card-text text-muted" style={{ fontSize: "0.9rem" }}>
                                {source.description || "No description available."}
                            </p>

                            <ul className="list-unstyled mb-3 mt-auto" style={{ fontSize: "0.85rem" }}>
                                <li><strong>Category:</strong> {source.category}</li>
                                <li><strong>Language:</strong> {source.language.toUpperCase()}</li>
                                <li><strong>Country:</strong> {source.country.toUpperCase()}</li>
                            </ul>

                            <a
                                href={source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline-primary btn-sm mt-auto"
                            >
                                Visit Website
                            </a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Source;
