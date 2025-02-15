"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Session } from "next-auth";
import { Loader } from "lucide-react";

interface CustomSession extends Session {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

const DraftPage = () => {
  const { data } = useSession() as { data: CustomSession | null };
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");

  const postBlog = async () => {
    const authorId = data?.user?.id;
    if (!title || !description) {
      toast.error("Please fill all the fields");
      return;
    }
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const response = await axios.post(`/api/create-blog`, {
        title,
        content: description,
        authorId: authorId,
      });
      router.push(`/blog/${response.data.id}`);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };
  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto p-4 flex flex-col justify-between m-7">
        <div className="p-6 rounded-lg shadow-md flex-grow">
          <input
            type="text"
            placeholder="Title"
            className="w-full text-4xl focus:outline-none mb-4 border-b-4 pb-3"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <textarea
            placeholder="Tell your story..."
            className="w-full text-xl focus:outline-none h-64"
            onChange={(e) => {
              setdescription(e.target.value);
            }}></textarea>
        </div>
        <div className="mt-3 ">
          <button
            type="submit"
            className="text-white shadow-md bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            onClick={postBlog}
            disabled={isSubmitting}>
            {isSubmitting ? <Loader className="animate-spin" /> : "Publish"}
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DraftPage;
