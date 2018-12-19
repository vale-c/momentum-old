import React from 'react';
import './Quotes.css';
import axios from 'axios';


//http://quotes.rest/qod.json?category=inspire

class Quotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: '',
      author: '',
    };
    this.handleTweetClick = this.handleTweetClick.bind(this);
    this.handleFacebookClick = this.handleFacebookClick.bind(this);
  }

  componentDidMount() {
    this.getQuote();
  }

  getQuote = () => {
    axios
      .get('https://talaikis.com/api/quotes/random//')
      .then(response => {
        this.setState({
          quote: response.data.quote,
          author: response.data.author
        });
      })
      .catch(error => {
        console.log(error);
      });
      // console.log(this.state.author);
      // console.log(this.state.quote);
  }

  handleTweetClick() {
    window.open(`https://twitter.com/intent/tweet?text="${this.state.quote} ${this.state.author}"`)
  }

  handleFacebookClick() {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=valentinacalabrese.com&quote=${this.state.quote}${this.state.author}"`)
  }

  render() {
    const { quote, author } = this.state;

    const QuoteText = ({ quote, author }) => (
      <div>
        <p className="text-quote">{quote}</p>
        <p className="text-author-name">{author}</p>
      </div>
    );

    const Button = ({ onClick }) => (
      <button
        type="button"
        className="refresh-btn"
        onClick={onClick}
      >
      <i className="fas fa-sync-alt"></i>
      </button>
    );

    const Social = () => (
      <div className="social">
        <a
          onClick={this.handleTweetClick}
          target="_blank"
          href=""
          rel="noopener noreferrer">
          <i className="fab fa-twitter"></i>
        </a>
        <a
        onClick={this.handleFacebookClick}
          target="_blank"
          href=""
          rel="noopener noreferrer">
          <i className="fab fa-facebook-square"></i>
        </a>
    </div>
    );


    return (
      <div className="container">
        <div className="wrapper">
          <QuoteText
            quote={quote}
            author={author}
          />
          <Button onClick={this.getQuote} />
          <Social />
        </div>
      </div>
    );
  }
}

export default Quotes;