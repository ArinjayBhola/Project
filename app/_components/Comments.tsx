import axios from "axios";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

interface Comment {
  id: string;
  content: string;
}

interface CommentsProps {
  comment: Comment[];
  blogId: string;
  getComment: () => void;
}

interface ExtendedSession {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

const Comments: React.FC<CommentsProps> = ({ comment, blogId, getComment }) => {
  const { data } = useSession() as { data: ExtendedSession | null };
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const authorId: string | undefined = data?.user?.id;

  const postComment = async () => {
    if (!content.trim()) {
      toast.error("Please fill all the fields");
      return;
    }
    setLoading(true);
    try {
      await axios.post("/api/comments", {
        content: content,
        blogId: blogId,
        authorId: authorId,
      });
      getComment();
      setContent("");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex flex-col space-y-3 mb-6 bg-gray-50 p-4 rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Write a comment..."
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-all disabled:bg-gray-400 flex items-center justify-center"
          onClick={postComment}
          disabled={loading}>
          {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Post Comment"}
        </button>
      </div>

      <div className="space-y-4">
        {comment?.length === 0 ? (
          <p className="text-gray-500 text-center">No comments yet. Be the first to comment!</p>
        ) : (
          comment?.map((comment) => (
            <div
              key={comment.id}
              className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <p className="text-gray-800">{comment.content}</p>
            </div>
          ))
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Comments;
