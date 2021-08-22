import React, { useCallback, useEffect, useState } from "react";
import { getRandom } from "../../_utils";
// import SocialButtons from "../SocialButtons";
import Tooltip from "../Tooltip";
import { QuoteWrapper, Quote, Author } from "./styled";

const QUOTES = "https://type.fit/api/quotes/";

const Quotes = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  const getQuote = useCallback(async () => {
    fetch(QUOTES)
      .then(res => res.json())
      .then(data => {
        const randomQuote = getRandom(data);
        setQuote(randomQuote.text);
        setAuthor(randomQuote.author);
      })
      .catch(err => console.log("Error is:", err));
  }, []);

  useEffect(() => {
    getQuote();
  }, [getQuote]);

  return (
    <QuoteWrapper onClick={getQuote}>
      <Tooltip content="Click to get a new quote!" direction="top">
        <Quote>{quote}</Quote>
        <Author>{author}</Author>
      </Tooltip>
      {/*<SocialButtons author={author} quote={quote} />*/}
    </QuoteWrapper>
  );
};

export default Quotes;
