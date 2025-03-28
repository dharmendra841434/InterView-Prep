import { articles } from "@/constant/dummy";

export default function ArticlesSection() {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Latest Articles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {articles.map((article, index) => (
          <div
            key={index}
            className=" bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-black">
                {article.title}
              </h3>
              <p className="text-black text-sm mt-2">{article.body}</p>
              <p className="text-black text-xs mt-2">
                {new Date(article.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
