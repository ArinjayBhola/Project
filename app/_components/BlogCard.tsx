import Link from "next/link";

interface Blog {
  id: string;
  title: string;
  excerpt?: string;
  content: string;
}

const BlogCard = ({ blog }: { blog: Blog }) => {
  return (
    <div className="bg-gray-100 shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 min-h-[300px] flex flex-col">
      <div className="p-6 flex-grow">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">{blog.title}</h2>
        <p className="text-gray-700 text-base mb-4">{blog.excerpt || blog.content.substring(0, 200)}...</p>
      </div>
      <div className="p-6">
        <Link href={`/blog/${blog.id}`}>
          <span className="text-lg text-blue-500 hover:underline font-medium">Read More →</span>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
