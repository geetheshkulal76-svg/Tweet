import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Tweets() {
  const [tweets, setTweets] = useState([]);
  const navigate = useNavigate();

  // Fetch Tweets
  const fetchTweets = async () => {
    try {
      const res = await axios.get(
        "http://localhost:7000/tweet/get"
      );

      console.log("TWEETS RESPONSE:", res.data);

      if (res.data.success) {
        setTweets(res.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Update Tweet
  const handleupdate = async (tweetId, oldTweetData) => {
    const newTweetData = prompt("Enter tweet:", oldTweetData);
    if (!newTweetData) return;

    // token is stored under "myToken" on login (see Login.jsx)
    const token = localStorage.getItem("myToken");

    try {
      const res = await axios.put(
  `http://localhost:7000/tweet/update/${tweetId}`,
  { tweetData: newTweetData },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
      if (res.data.success) {
        alert(res.data.message);
        fetchTweets();
      }
    } catch (error) {
      console.log(error);
      alert("Failed to update tweet");
    }
  };

  // Delete Tweet
   const handleDelete = async (tweetId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this tweet?"
    );
    if (!confirmDelete) return;

    // use same key as login
    const token = localStorage.getItem("myToken");

    try {
      const res = await axios.delete(
        `http://localhost:7000/tweet/delete/${tweetId}`,
        {
          headers: {
            "auth-token": token,
          },
        }
      );

      if (res.data.success) {
        alert(res.data.message);
        fetchTweets();
      }
    } catch (error) {
      console.log(error);
      alert("Failed to delete tweet");
    }
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Tweets</h2>

      {/* ✅ Create Tweet Button */}
      <div style={{ marginBottom: "15px" }}>
        <button
          style={{
            padding: "8px 15px",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
          onClick={() => navigate("/create-tweet")}
        >
          Create Tweet
        </button>
      </div>

      {tweets.map((tweet) => (
        <div
          key={tweet._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            margin: "10px 0",
          }}
        >
          <h4 style={{ margin: "0 0 5px 0" }}>
            By: {tweet.user?.name || "Anonymous"}
          </h4>

          <p>{tweet.tweetData}</p>

          {tweet.image && (
            <>
              <img
                src={`http://localhost:7000/uploads/${tweet.image}`}
                alt="tweet"
                width="200"
              />

              <button
                style={{ marginLeft: "10px" }}
                onClick={() =>
                  window.open(
                    `http://localhost:7000/uploads/${tweet.image}`
                  )
                }
              >
                View Image
              </button>
            </>
          )}

          <div style={{ marginTop: "10px" }}>
            <button
              onClick={() =>
                handleupdate(tweet._id, tweet.tweetData)
              }
            >
              Update
            </button>

            <button
              style={{
                marginLeft: "10px",
                backgroundColor: "red",
                color: "white",
              }}
              onClick={() => handleDelete(tweet._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
