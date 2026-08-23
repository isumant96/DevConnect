import { useState } from "react";
import axios from "axios";

function CreatePost() {
  const [content, setContent] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("User from localStorage:", user);
  console.log("USER:", user);
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/posts/create",
      {
  content,
  user: user._id,
}
      );

      alert(res.data);
      setContent("");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center">
      <div className="bg-gray-900 p-8 rounded-xl w-full max-w-md">

        <h1 className="text-3xl font-bold mb-6">
          Create Post
        </h1>

        <form onSubmit={handleSubmit}>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full p-3 rounded-lg bg-black border border-gray-700"
            rows="5"
          />

          <button
            type="submit"
            className="mt-4 w-full bg-white text-black py-3 rounded-lg"
          >
            Post
          </button>

        </form>

      </div>
    </div>
  );
}

export default CreatePost;