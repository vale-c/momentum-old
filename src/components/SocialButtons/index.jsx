import React from "react";
import {
  FacebookBtn,
  RedditBtn,
  SocialWrapper,
  TumblrBtn,
  TwitterBtn
} from "./styled";

const momentumAppLink = "https://www.momentumdash.netlify.com/";

const SocialButtons = ({ quote, author }) => {
  const handleFacebookClick = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=valentinacalabrese.com&quote=${quote}${author}`
    );
  };

  const handleRedditClick = () => {
    window.open(
      `https://reddit.com/submit?url=${momentumAppLink}&title=${quote}${author}`
    );
  };

  const handleTumblrClick = () => {
    window.open(
      `https://www.tumblr.com/widgets/share/tool?canonicalUrl=${momentumAppLink}&title=${quote}&caption=${quote}${author}&tags=motivational,quotes,inspiration,quoteoftheday`
    );
  };

  const handleTweetClick = () => {
    window.open(`https://twitter.com/intent/tweet?text="${quote} ${author}"`);
  };

  return (
    <SocialWrapper>
      <FacebookBtn
        onClick={handleFacebookClick}
        target="_blank"
        href="#"
        rel="noopener noreferrer"
      >
        <i className="fab fa-facebook-square fa-2x" />
      </FacebookBtn>
      <RedditBtn
        onClick={handleRedditClick}
        target="_blank"
        href="#"
        rel="noopener noreferrer"
      >
        <i className="fab fa-reddit fa-2x" />
      </RedditBtn>
      <TwitterBtn
        onClick={handleTweetClick}
        target="_blank"
        href="#"
        rel="noopener noreferrer"
      >
        <i className="fab fa-twitter fa-2x" />
      </TwitterBtn>
      <TumblrBtn
        onClick={handleTumblrClick}
        target="_blank"
        href="#"
        rel="noopener noreferrer"
      >
        <i className="fab fa-tumblr fa-2x" />
      </TumblrBtn>
    </SocialWrapper>
  );
};

export default SocialButtons;
