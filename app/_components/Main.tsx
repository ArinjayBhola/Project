"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";

interface Blog {
  id: string;
  title: string;
  content: string;
}

const Main = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const getBlog = async () => {
    try {
      const res = await axios.get("/api/get-blog");
      setBlogs(res.data.blogs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlog();
  }, []);

  return (
    <div className="flex flex-wrap mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Latest Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.length > 0 ? (
          blogs
            .slice()
            .reverse()
            .map((blog) => (
              <BlogCard
                key={blog.id}
                blog={blog}
              />
            ))
        ) : (
          <p className="text-gray-500">No blogs available.</p>
        )}
      </div>
    </div>
  );
};

export default Main;
