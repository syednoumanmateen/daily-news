import type { FC } from 'react'
import type { Article } from './Home'

interface NewsProps {
    news: Article[]
}

const News: FC<NewsProps> = ({ news }) => {
    if (!news.length) {
        return <p className="text-center mt-5">No news found.</p>
    }

    return (
        <div className="row g-3"> {/* Use Bootstrap's gutter spacing */}
            {news.map((article, idx) => (
                <div key={idx} className="col-12 col-sm-12 col-md-6">
                    <div className="card h-100 p-0">
                        {article.urlToImage && (
                            <img
                                src={article.urlToImage}
                                className="card-img-top"
                                alt={article.title}
                                style={{ height: '300px', objectFit: 'cover' }}
                            />
                        )}
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title fw-bold">{article.title}</h5>
                            <div className="card-text py-3">
                                <p className="mb-2 text-truncate" title={article.description}>
                                    {article.description || 'No description available.'}
                                </p>
                                <p className="mb-0">
                                    {article.content || 'No content available.'}
                                </p>
                            </div>
                            <div className="mt-auto d-flex justify-content-between align-items-end w-100">
                                <div className="text-muted">
                                    <strong>Source:</strong> {article.source?.name}
                                </div>
                                <a
                                    href={article.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary ms-3"
                                >
                                    Read More
                                </a>
                            </div>
                        </div>
                        <div className="card-footer">
                            <div
                                className="d-flex justify-content-between"
                                style={{ fontSize: '12px' }}
                            >
                                <div className="text-muted mb-1">
                                    <strong>Author:</strong> {article.author || 'Unknown'}
                                </div>
                                <div className="text-muted mb-2">
                                    <strong>Published At:</strong>{' '}
                                    {article.publishedAt
                                        ? new Date(article.publishedAt).toDateString()
                                        : 'Unknown'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default News;