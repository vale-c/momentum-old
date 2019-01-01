import React from 'react';
import './Quotes.css';
import axios from 'axios';


class Quotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: "",
      author: "",
      isHovering: false
    };
    this.handleTweetClick = this.handleTweetClick.bind(this);
    this.handleFacebookClick = this.handleFacebookClick.bind(this);
    this.handleMouseHover = this.handleMouseHover.bind(this);
  }


  handleMouseHover() {
    this.setState(this.toggleHoverState);
  }

  toggleHoverState(state) {
    return {
      isHovering: !state.isHovering
    };
  }

  componentDidMount() {
    this.getQuote();
  }

  getQuote = () => {
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en"
      )
      .then(response => {
        this.setState({
          quote: response.data.quoteText,
          author: response.data.quoteAuthor
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleTweetClick() {
    window.open(
      `https://twitter.com/intent/tweet?text="${this.state.quote} ${
        this.state.author
      }"`
    );
  }

  handleFacebookClick() {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=valentinacalabrese.com&quote=${
        this.state.quote
      }${this.state.author}`
    );
  }

  render() {
    const { quote, author } = this.state;

    const QuoteText = ({ quote, author }) => (
      <div>
        <p className="text-quote">{quote}</p>
        <p className="text-author-name">{author}</p>
      </div>
    );

    const Button = ({ onClick }) => <button className="refresh-btn animated rubberBand delay-2s" onClick={onClick}>
        <i className="fas fa-sync-alt" />
      </button>;

    const Social = () => (
      <div className="social">
        <a
          onClick={this.handleTweetClick}
          target="_blank"
          href="#"
          rel="noopener noreferrer"
        >
          <i className="fab fa-twitter" />
        </a>
        <a
          onClick={this.handleFacebookClick}
          target="_blank"
          href="#"
          rel="noopener noreferrer"
        >
          <i className="fab fa-facebook-square" />
        </a>
      </div>
    );

    return <div className="container">
        <div className="quoteWrapper" onMouseEnter={this.handleMouseHover} onMouseLeave={this.handleMouseHover}>
          <QuoteText quote={quote} author={author} />
          <Button onClick={this.getQuote} />
          {
            this.state.isHovering && 
            <Social />
          }
        </div>
      </div>;
  }
}

export default Quotes;