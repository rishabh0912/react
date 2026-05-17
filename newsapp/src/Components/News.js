import React, { useCallback, useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  // articles = [
  //   {
  //     "source": { "id": "bbc-news", "name": "BBC News" },
  //     "author": "BBC News",
  //     "title": "Amsterdam bans public adverts for meat and fossil fuels",
  //     "description": "Local politicians say the move is in line with the Dutch capital's environmental targets.",
  //     "url": "https://www.bbc.co.uk/news/articles/c9wejdekpwyo",
  //     "urlToImage": "https://ichef.bbci.co.uk/ace/branded_news/1200/cpsprodpb/4140/live/d2daa120-4472-11f1-b545-b533bcf4cad2.jpg",
  //     "publishedAt": "2026-05-04T06:22:21.2571361Z",
  //     "content": "The Dutch capital is not starting from scratch.\r\nHaarlem, 18km (11 miles) to its west, was in 2022 the first city in the world to announce, external a broad ban on most meat advertising in public spa… [+1114 chars]"
  //   },
  //   {
  //     "source": { "id": "bbc-news", "name": "BBC News" },
  //     "author": "BBC News",
  //     "title": "Hantavirus: What we know about the Atlantic cruise ship outbreak",
  //     "description": "While rare, the disease can be transmitted to humans through inhalation of airborne particles from dried rodent droppings.",
  //     "url": "https://www.bbc.co.uk/news/articles/c8r8j1l6j0go",
  //     "urlToImage": "https://ichef.bbci.co.uk/ace/branded_news/1200/cpsprodpb/f9b6/live/e5da45c0-477c-11f1-b55d-0f258dce1735.jpg",
  //     "publishedAt": "2026-05-04T06:22:19.5231947Z",
  //     "content": "Hantavirus refers to a strain of viruses carried by rodents, primarily transmitted to humans through inhalation of airborne particles from dried rodent droppings.\r\nInfections typically occur when the… [+718 chars]"
  //   },
  //   {
  //     "source": { "id": "bbc-news", "name": "BBC News" },
  //     "author": "BBC News",
  //     "title": "What an empty car park says about one of the UK's poorest areas",
  //     "description": "The BBC has been speaking to people living in one of England's poorest communities.",
  //     "url": "https://www.bbc.co.uk/news/articles/cy816xdp226o",
  //     "urlToImage": "https://ichef.bbci.co.uk/ace/branded_news/1200/cpsprodpb/c629/live/ae0d1610-447d-11f1-88ff-575186ed76aa.jpg",
  //     "publishedAt": "2026-05-04T05:22:26.929708Z",
  //     "content": "Poor educational outcomes have also contributed to Sheppey's problems for many years. In 2023, teachers at the island's secondary school went on strike over concerns about their safety, because of po… [+1627 chars]"
  //   },
  //   {
  //     "source": { "id": "bbc-news", "name": "BBC News" },
  //     "author": "BBC News",
  //     "title": "Deepening fear for some in Iran as regime shows no sign of compromise",
  //     "description": "Ordinary Iranians tell of worry about increased repression by authorities after the war is over.",
  //     "url": "https://www.bbc.co.uk/news/articles/clyp6xxyvzyo",
  //     "urlToImage": "https://ichef.bbci.co.uk/ace/branded_news/1200/cpsprodpb/5347/live/29dfb330-472e-11f1-b55d-0f258dce1735.jpg",
  //     "publishedAt": "2026-05-04T01:22:21.3419392Z",
  //     "content": "It is impossible to tell the scale of support for the regime across Iranian society. There are regular public displays of solidarity organised by its supporters. By contrast opposition rallies are ba… [+1827 chars]"
  //   },
  //   {
  //     "source": { "id": "bbc-news", "name": "BBC News" },
  //     "author": "BBC News",
  //     "title": "GameStop offers to buy eBay for $56bn",
  //     "description": "GameStop's chief executive Ryan Cohen told the Wall Street Journal that he sees potential to make eBay a much bigger rival to Amazon.",
  //     "url": "https://www.bbc.co.uk/news/articles/cn0p8yled1do",
  //     "urlToImage": "https://ichef.bbci.co.uk/ace/branded_news/1200/cpsprodpb/0759/live/6f3aea00-474a-11f1-b55d-0f258dce1735.jpg",
  //     "publishedAt": "2026-05-04T01:22:19.8266932Z",
  //     "content": "Cohen also said that GameStop has a commitment letter from TD Bank to provide around $20bn in debt to help finance the deal.\r\n\"There is nobody who is more qualified, based on my experience, to run th… [+569 chars]"
  //   },
  //   {
  //     "source": { "id": "bbc-news", "name": "BBC News" },
  //     "author": "BBC News",
  //     "title": "Newspaper headlines: 'No money for new weapons' and 'Cost of pint hits £10'",
  //     "description": "A lack of defence funding and surging costs of a pint of beer are prominent stories on Monday's papers.",
  //     "url": "https://www.bbc.co.uk/news/articles/c302njdend1o",
  //     "urlToImage": "https://ichef.bbci.co.uk/ace/branded_news/1200/cpsprodpb/af93/live/fbd06bf0-4742-11f1-b55d-0f258dce1735.jpg",
  //     "publishedAt": "2026-05-04T00:37:14.7288794Z",
  //     "content": "Image caption, In another potential rise in costs, parking fines could \"double\" under new proposals being considered by Labour, according to the Daily Mail. Ministers are reportedly looking into find… [+147 chars]"
  //   },
  //   {
  //     "source": { "id": "bbc-news", "name": "BBC News" },
  //     "author": "BBC News",
  //     "title": "Rudy Giuliani in critical condition in hospital",
  //     "description": "The long-time champion of Trump and former New York mayor is in hospital, according to his spokesman.",
  //     "url": "https://www.bbc.co.uk/news/articles/c7941rgy4lyo",
  //     "urlToImage": "https://ichef.bbci.co.uk/ace/branded_news/1200/cpsprodpb/a218/live/6e95d060-474a-11f1-b44b-c1f4e9f91820.jpg",
  //     "publishedAt": "2026-05-04T00:22:21.3706153Z",
  //     "content": "After the 2020 presidential election, Giuliani and other advisers traveled across the country accusing Trump's opponent - former President Joe Biden - of attempting to steal the election and making f… [+756 chars]"
  //   },
  //   {
  //     "source": { "id": "bbc-news", "name": "BBC News" },
  //     "author": "BBC News",
  //     "title": "NHS cancer injection could mean patients spend hours less in hospital",
  //     "description": "Thousands of patients will be offered a new injectable form of an immunotherapy drug that takes minutes.",
  //     "url": "https://www.bbc.co.uk/news/articles/cx214vld41ko",
  //     "urlToImage": "https://ichef.bbci.co.uk/ace/branded_news/1200/cpsprodpb/afd2/live/a296b0b0-44b5-11f1-b55d-0f258dce1735.jpg",
  //     "publishedAt": "2026-05-03T23:37:22.5254482Z",
  //     "content": "Cancer can hide from the body's own immune system by producing proteins that send a \"stop signal\" telling our immune cells not to attack.\r\nSome scientists describe this as the disease hiding behind a… [+1126 chars]"
  //   },
  //   {
  //     "source": { "id": "bbc-news", "name": "BBC News" },
  //     "author": "BBC News",
  //     "title": "The threat to summer holidays looming with jet fuel shortages",
  //     "description": "What impact might shortages have on our summer holidays - and what could be done about it?",
  //     "url": "https://www.bbc.co.uk/news/articles/c86d9v28qxxo",
  //     "urlToImage": "https://ichef.bbci.co.uk/ace/branded_news/1200/cpsprodpb/4ee8/live/64014b70-4551-11f1-ac78-2112837ce2aa.jpg",
  //     "publishedAt": "2026-05-03T23:22:24.729612Z",
  //     "content": "Addressing the structural reasons why the UK is so dependent on imports, meanwhile, is likely to be trickier. Back in the 1970s, the country had 18 refineries - but that's now down to four.\r\n\"I think… [+2449 chars]"
  //   },
  //   {
  //     "source": { "id": "bbc-news", "name": "BBC News" },
  //     "author": "BBC News",
  //     "title": "'I was trying to a save life,' man who intervened in Golders Green attack tells BBC",
  //     "description": "Ashkan Asadian said he acted on the spur of the moment without thinking about the danger of the situation.",
  //     "url": "https://www.bbc.co.uk/news/articles/c1529vgdvlgo",
  //     "urlToImage": "https://ichef.bbci.co.uk/ace/branded_news/1200/cpsprodpb/76db/live/591039d0-46d5-11f1-a1bb-13ca62b3ded8.jpg",
  //     "publishedAt": "2026-05-03T21:37:22.5733557Z",
  //     "content": "He said that as he intervened the two men fell on to the main road - lying side by side on the ground, the knife still in the attacker's hand.\r\n\"I just tried to keep him busy, get the knife,\" he said… [+1254 chars]"
  //   }
  // ]

  //   constructor(props) {
  //   console.log("constructor");
  //   super(props);
  //   this.state = {
  //     articles: [],
  //     // articles: this.articles,
  //     loading: true,
  //     page: 1,
  //     totalResults: 0,
  //     hasMore: true,
  //   };
  //   document.title = `DailyNews - ${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)}`;
  // }

  const [articles, setarticles] = useState([]);
  const [loading, setloading] = useState(true);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  const update = useCallback(async () => {
    props.setprogress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;
    setloading(true);
    let data = await fetch(url);
    props.setprogress(20);
    let parsedData = await data.json();
    props.setprogress(50);
    setarticles(parsedData.articles);
    setpage(1);
    sethasMore(parsedData.articles.length < parsedData.totalResults);
    setloading(false);
    props.setprogress(100);
  }, [props.apiKey, props.category, props.pageSize, props.setprogress]);

  useEffect(() => {
    update();
  }, [update]);

  // async componentDidMount() {
  //   console.log("cdm");
  //   this.update();
  // }

  // handleNextClick = async () => {
  //   this.update();
  //   this.setState({
  //     page: this.state.page + 1,
  //   });
  // };

  // handlePreviousClick = async () => {
  //   this.update();
  //   this.setState({
  //     page: this.state.page - 1,
  //   });
  // };
  const fetchMoreData = async () => {
    console.log("fetchMoreData");

    const nextPage = page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${props.apiKey}&page=${nextPage}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();

    const incomingArticles = parsedData.articles || [];
    if (incomingArticles.length === 0) {
      sethasMore(false);
      return;
    }

    const existingKeys = new Set(
      articles.map(
        (article) => `${article.url || ""}-${article.publishedAt || ""}`,
      ),
    );
    const uniqueNewArticles = incomingArticles.filter(
      (article) =>
        !existingKeys.has(`${article.url || ""}-${article.publishedAt || ""}`),
    );

    if (uniqueNewArticles.length === 0) {
      sethasMore(false);
      return;
    }

    const updatedArticles = articles.concat(uniqueNewArticles);

    setarticles(updatedArticles);
    setpage(nextPage);
    sethasMore(updatedArticles.length < parsedData.totalResults);
  };

  console.log("render");
  return (
    // <div className="container my-3">
    <>
      <h2 className="text-center" style={{ margin: "35px 0px", marginTop: "90px" }}>
        {`DailyNews - Top Headlines - ${props.category.charAt(0).toUpperCase() + props.category.slice(1)}`}
      </h2>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {/* {!this.state.loading && */}
            {articles.map((element, index) => {
              return (
                <div
                  className="col-md-4"
                  key={`${element.url || "no-url"}-${index}`}
                >
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    imageUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "data:image/jpeg;base64,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"
                    }
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
      {/*< div className="d-flex justify-content-between" >*/}
      {/* <button
            type="button"
            disabled={this.state.page <= 1}
            className="btn btn-dark"
            onClick={this.handlePreviousClick}
          >
            &larr; Previous
          </button> */}
      {/* <button
            type="button"
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button> */}
      {/* </div> */}
    </>
  );
};

News.defaultProps = {
  pageSize: 10,
  category: "general",
};

News.propTypes = {
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
