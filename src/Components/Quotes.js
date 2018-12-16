import React from 'react';
import './Quotes.css';

const APIURL = "https://talaikis.com/api/quotes";
const tweetUrl = "https://twitter.com/intent/tweet?text=";
let randomNumber = () => Math.floor(Math.random() * 5 + 1);
const quotes = [];

//End importing *********************************************

class Quotes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      colorCount: randomNumber(),
      quoteCount: "",
      data: [],
      quote: '"Your quote is loading"',
      author: "Random Quote Machine",
      btnDisabled: true
    };
    this.handleClick = this.handleClick.bind(this);
    this.APIFetch = this.APIFetch.bind(this);
    this.reset = this.reset.bind(this);
  }

  APIFetch() {
    fetch(APIURL)
      .then(response => response.json())
      .then(data =>
        this.setState({
          colorCount: randomNumber(),
          quoteCount: 0,
          cache: data,
          quote: data[0].quote,
          author: data[0].author,
          btnDisabled: false
        })
      );
  }

  reset() {
    this.setState({
      btnDisabled: true
    });
    this.APIFetch();
  }

  handleClick() {
    this.state.quoteCount === 100
      ? this.reset()
      : this.setState({
          colorCount: Math.floor(Math.random() * 5 + 1),
          quoteCount: this.state.quoteCount + 1,
          quote: this.state.cache[this.state.quoteCount + 1].quote,
          author: this.state.cache[this.state.quoteCount + 1].author
        });
  }

  //Start API call****************************************

  componentDidMount() {
    this.APIFetch();
  }
  //End API call*******************************************

  render() {

    return (
      <div className="page">
        <div
          className={"grid-container color-" + this.state.colorCount}
          id="quote-box"
        >
          <div className={"text-container"}>
            <div
              className={"quote-text color-" + this.state.colorCount}
              id="text"
            >
              {this.state.quote}
            </div>
          </div>
          <div className="author-container">
            <div
              className={"auto-text color-" + this.state.colorCount}
              id="author"
            >
              {this.state.author}
            </div>
          </div>
          <div className="twitter-link-container">
            <div className="twitter-icon">
              <a
                className="twitter-share-button"
                id="tweet-quote"
                href={tweetUrl + this.state.quote + " -" + this.state.author}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class={"fab fa-twitter color-" + this.state.colorCount} />
              </a>
            </div>
          </div>
          <button
            disabled={this.state.btnDisabled}
            className={"new-quote-btn color-" + this.state.colorCount}
            id="new-quote"
            onClick={this.handleClick}
          >
            <i class="fas fa-sync-alt"></i>
          </button>
        </div>
      </div>

    );
  }
}

export default Quotes;
