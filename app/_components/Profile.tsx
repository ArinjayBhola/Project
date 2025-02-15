"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";

interface Blog {
  id: string;
  title: string;
  content: string;
}

interface ExtendedSession {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

const Profile = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const { data } = useSession() as { data: ExtendedSession | null };
  useEffect(() => {
    const authorId: string | undefined = data?.user?.id;
    axios.post("/api/author-blog", { id: authorId }).then((res) => setBlogs(res.data));
  }, []);
  return (
    <div className="flex flex-wrap mx-auto p-6">
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

export default Profile;
