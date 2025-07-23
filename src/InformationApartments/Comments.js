import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import avatar from "../images/Owner.png";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { useAuth } from "../AuthCheck";
import { ClipLoader } from "react-spinners";
import { FaTrash } from "react-icons/fa";

const CommentsSec = () => {
  const { apartment_Id } = useParams();
  const { isAuthenticated, isStudent, StudentId } = useAuth();
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchingComments, setFetchingComments] = useState(true);

  const fetchStudentName = async (studentId) => {
    try {
      const response = await axios.get(`/api/Student/${studentId}`);
      if (response.data && response.data.normalizedUserName) {
        return response.data.normalizedUserName;
      } else {
        return "Unknown User";
      }
    } catch (error) {
      return "Unknown User";
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/api/Comment/${apartment_Id}`);
        const commentsWithUserNames = await Promise.all(
          response.data.map(async (comment) => {
            const studentName = await fetchStudentName(comment.studentId);
            return {
              ...comment,
              student_Name: studentName,
            };
          })
        );
        setComments(commentsWithUserNames);
      } catch (error) {
        setError("Failed to fetch comments.");
      } finally {
        setFetchingComments(false);
      }
    };

    fetchComments();
  }, [apartment_Id]);

  const handleAddComment = async () => {
    if (!isAuthenticated || isStudent === false) {
      setError("Only students can add comments.");
      return;
    }

    if (!commentText.trim()) {
      setError("Comment cannot be empty.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "/api/Comment",
        {
          apartment_Id: parseInt(apartment_Id),
          comment_Text: commentText,
          student_Id: StudentId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const studentName = await fetchStudentName(StudentId);

      setComments([
        ...comments,
        {
          ...response.data,
          student_Name: studentName,
        },
      ]);
      setCommentText("");
      setError("");
    } catch (error) {
      console.error("Error adding comment:", error);
      setError("Failed to add comment.");
    } finally {
      setLoading(false);
    }
  };

  // حذف تعليق
  const handleDeleteComment = async (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`/api/Comment/${commentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          data: {
            comment_Text: "",
          },
        });

        setComments(
          comments.filter((comment) => comment.comment_Id !== commentId)
        );

        const response = await axios.get(`/api/Comment/${apartment_Id}`);
        const commentsWithUserNames = await Promise.all(
          response.data.map(async (comment) => {
            const studentName = await fetchStudentName(comment.studentId);
            return {
              ...comment,
              student_Name: studentName,
            };
          })
        );
        setComments(commentsWithUserNames);
      } catch (error) {
        setError("Failed to delete comment.");
      }
    }
  };

  return (
    <div data-aos="fade-up" data-aos-duration="3000" className="w-full mt-5 px-3">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <div className="w-full py-3 flex flex-row max-md:block">
        <input
          type="text"
          placeholder="Add comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="w-[100%] py-2 px-4 rounded-md shadow-lg outline-0 border border-gray-300 focus:border-blue-500"
        />
        <button
          onClick={handleAddComment}
          disabled={loading}
          className="flex flex-row my-auto border-1 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors max-md:mx-auto max-md:mt-2"
        >
          {loading ? (
            <ClipLoader size={20} color="#ffffff" className="mb-6" />
          ) : (
            <>
              Add <IoIosArrowDroprightCircle className="my-auto ml-1" />
            </>
          )}
        </button>
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <div className="w-full mt-4">
        {fetchingComments ? (
          <div className="flex justify-center">
            <ClipLoader size={30} color="#3b82f6" />
          </div>
        ) : comments.length === 0 ? (
          <p className="text-gray-500 text-center">No comments yet.</p>
        ) : (
          comments.map(
            (comment) =>
              comment.student_Name !== "Unknown User" && (
                <div
                  key={comment.comment_Id}
                  className="w-full flex flex-row shadow-md py-4 px-4 bg-white rounded-lg mb-3 max-md:px-2 max-md:flex-col"
                >
                  <img
                    loading="lazy"
                    src={avatar}
                    alt="user"
                    className="w-[50px] h-[50px] rounded-full my-auto"
                  />
                  <div className="flex flex-col my-auto ml-4 w-full">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {comment.student_Name}
                    </h3>
                    <p className="text-gray-700 mt-1">{comment.comment_Text}</p>
                  </div>
                  {isAuthenticated && comment.studentId === StudentId && (
                    <button
                      onClick={() => handleDeleteComment(comment.comment_ID)}
                      className="text-red-500 hover:text-red-700 ml-auto"
                    >
                      <FaTrash className="w-5 h-5" />
                    </button>
                  )}
                </div>
              )
          )
        )}
      </div>
    </div>
  );
};

export default CommentsSec;
