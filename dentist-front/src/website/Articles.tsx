import React, { useState } from "react";
import ArticlesViewModel from "../Services/ArticlesApi";
import { Article } from "../models/Article";

interface ArticlesProps {
  viewModel: ArticlesViewModel;
}

const Articles: React.FC<ArticlesProps> = ({ viewModel }) => {
  const [articles] = useState<Article[]>(viewModel.getArticles());
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(
    viewModel.getSelectedArticle()
  );

  const handleArticleClick = (article: Article) => {
    viewModel.setSelectedArticle(article);
    setSelectedArticle(viewModel.getSelectedArticle());
  };

  const closeModal = () => {
    viewModel.setSelectedArticle(null);
    setSelectedArticle(viewModel.getSelectedArticle());
  };

  return (
    <div className="articles-container max-w-7xl mx-auto px-4 py-8" id="articles">
      <h2 className="text-3xl font-bold text-center mb-6">Latest News</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div
            key={article.id}
            className="article-card bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300 cursor-pointer"
            onClick={() => handleArticleClick(article)}
          >
            <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
            <p className="text-sm text-gray-500 mb-4">{article.date}</p>
            <p className="text-gray-700">{article.summary}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedArticle && (
        <div className="modal fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="modal-content bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-2xl font-bold mb-4">{selectedArticle.title}</h3>
            <p className="text-sm text-gray-500 mb-4">{selectedArticle.date}</p>
            <p className="text-gray-700 mb-4">{selectedArticle.content}</p>
            <div className="text-right">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Articles;
