import { articles } from "@/constant/dummy";

export default function ArticlesSection() {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Latest Articles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
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
            <div className=" flex items-center justify-center">
              <button className=" flex flex-row items-center rounded-md cursor-pointer hover:bg-yellow-600 transition-all duration-300 ease-in-out self-center py-2 text-gray-900 justify-center bg-yellow-400 w-[90%] m-2">
                Read Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
