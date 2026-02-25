import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Tweets() {
  const [tweets, setTweets] = useState([]);

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

  // ✅ CALL API ONLY ONCE
  useEffect(() => {
    fetchTweets();
  }, []);

  return (
    <div>
      <h2>All Tweets</h2>

  {tweets.map((tweet) => (
  <div key={tweet._id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
    {/* Display the author name from the populated user object */}
    <h4 style={{ margin: "0 0 5px 0" }}>
       By: {tweet.user?.name || "Anonymous"} 
    </h4>
    
    <p>{tweet.tweetData}</p>
    <img src={`http://localhost:7000/uploads/${tweet.image}`} alt="tweet" width="200" />

    <button style={{marginLeft:"10px"}} onClick={() => window.open(`http://localhost:7000/uploads/${tweet.image}`)}>View Image</button>
  </div>
))}
</div>
  );
}