import { useState, useEffect } from "react";

function QuoteBox() {
  const [quoteData, setQuoteData] = useState({
    quote: "Loading...",
    author: "Loading...",
  });

  const apiUrl = "https://api.quotable.io/random?tags=philosophy"; // Philosopher Quotes API endpoint

  useEffect(() => {
    async function fetchQuote() {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }
        const data = await response.json();
        setQuoteData({
          quote: data.content, // Access quote content
          author: data.author,
        });
      } catch (error) {
        console.error("Error fetching quote:", error);
        setQuoteData({ quote: "Error fetching quote", author: "" });
      }
    }

    fetchQuote();
  }, []);

  const handleTweetClick = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${quoteData.content} ---- by ${quoteData.author}`,
      "Tweet Window",
      "width=600, height=300"
    );
  };

  const handleRefreshClick = () => {
    window.location.reload();
  };

  return (
    <div className="quote-box">
      <h2>Quote of the day</h2>
      <blockquote>{quoteData.quote}</blockquote>
      <span>{quoteData.author}</span>
      <div>
        <button onClick={handleRefreshClick}>New Quote</button>
        <button onClick={handleTweetClick}>
          <img src="twitter-.png" style={{ width: "20px" }} alt="twitter" />
          Tweet
        </button>
      </div>
    </div>
  );
}

export default QuoteBox;
