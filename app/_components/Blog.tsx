"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaRegComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import Comments from "./Comments";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

interface BlogData {
  title: string;
  content: string;
  dayPosted: string;
  authorId: string;
}
interface AuthorData {
  name: string;
}

interface ExtendedSession {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

const Blog = () => {
  const [blogData, setBlogData] = useState<BlogData | null>(null);
  const router = useRouter();
  const [author, setAuthor] = useState<{ author: AuthorData } | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState<[]>([]);
  const { data } = useSession() as { data: ExtendedSession | null };

  const { blogId } = useParams();

  useEffect(() => {
    axios
      .post("/api/get-blog", {
        id: blogId,
      })
      .then((res) => setBlogData(res.data));
  }, [blogId]);

  useEffect(() => {
    axios
      .post("/api/get-author", {
        id: blogId,
      })
      .then((res) => setAuthor(res.data));
  }, [blogId]);
  useEffect(() => {
    getComment();
  }, [blogId]);

  const getComment = () => {
    axios.get("/api/comments?blogId=" + blogId).then((res) => setComment(res.data));
  };

  const dateString = (date: string = "") => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const deleteBlog = async () => {
    try {
      const res = await axios.post("/api/delete-blog", {
        id: blogId,
      });
      if (res.data.error) {
        throw new Error();
      }
      toast.success("Blog deleted successfully");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (error) {
      console.error(error);
      toast.error("Error deleting blog");
    }
  };

  const readingTime = Math.ceil((blogData?.content?.length ?? 0) / 100);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg mt-10">
      <div className="text-3xl font-bold text-gray-900 my-4">{blogData?.title}</div>
      <div className="flex items-center gap-4 my-4">
        <p className="text-gray-600">
          Author:<span className="font-bold">{author?.author?.name}</span>
        </p>
        <p className="text-gray-500 text-sm">{readingTime} min read</p>
        <p className="text-gray-600 text-sm">{dateString(blogData?.dayPosted)}</p>
      </div>
      <div className="border-b-2 border-gray-200 my-5"></div>
      <div className="flex gap-10 justify-between">
        <div className="flex gap-10">
          <div className="flex gap-2">
            <FaRegComment className="cursor-pointer" />
            <p className="text-gray-600 text-sm">{comment?.length}</p>
          </div>
          <FaRegHeart
            className={"cursor-pointer" + (isLiked ? " bg-red-500" : "")}
            onClick={() => setIsLiked(!isLiked)}
          />
        </div>
        <div>
          {blogData?.authorId === data?.user?.id && (
            <MdDeleteOutline
              className="cursor-pointer"
              onClick={deleteBlog}
              size={20}
            />
          )}
        </div>
      </div>
      <div className="border-b-2 border-gray-200 my-5"></div>
      <p className="text-lg text-gray-800 leading-relaxed my-10">{blogData?.content}</p>
      <div className="border-b-2 border-gray-200 my-5"></div>
      <div className="bg-gray-100 p-4 rounded-md">
        <div className="text-2xl font-bold text-gray-900 my-4">Comments</div>
        <div className="my-5">
          <Comments
            blogId={typeof blogId === "string" ? blogId : ""}
            comment={comment}
            getComment={getComment}
          />
        </div>
      </div>
    </div>
  );
};

export default Blog;
