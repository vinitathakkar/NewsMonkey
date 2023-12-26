import React, { Component } from 'react'
import NewsItem from './Newsitem'
import propTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize : 8,
    category : 'general',
  }
  
  static propTypes = {
    country : propTypes.string,
    pageSize : propTypes.number,
    category : propTypes.string,
  }
    
  capitalizeFirstLetter = (string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }

    constructor(props){
        super(props);
        console.log("Hello");
        this.state={
            articles:[],
            loading:false,
            page:1,
            totalResults:0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
    }

    async updateNews(){
      this.props.setProgress(10);
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data = await fetch(url);
      this.props.setProgress(30);
      let parseData = await data.json()
      this.props.setProgress(70);
      this.setState({articles:parseData.articles, 
      totalResults:parseData.totalResults,
      loading:false
    })
    this.props.setProgress(100);
}
    

async componentDidMount(){
  this.updateNews();
}

fetchMoreData = async () => {
      this.setState({page:this.state.page+1})
       const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data = await fetch(url);
      let parseData = await data.json()
      this.setState({
      articles:this.state.articles.concat(parseData.articles), 
      totalResults:parseData.totalResults,
      loading:false
    })
      
  };

  render() {
    return (
      <>
        <h1 className="text-center" style={{margin:'35px'}}>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
         {this.state.loading && <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        }
        <InfiniteScroll style={{overflow : 'hidden'}}
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={this.state.loading && <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            </div>
          }
        >
            <div className="container" >
                <div className="row" >
                {this.state.articles.map((Element) => {
                    return <div className="col-md-4" key={Element.url}>
                        <NewsItem title={Element.title?Element.title:""} description={Element.description?Element.description:""} imgurl={Element.urlToImage}
                        newsUrl={Element.url} author={Element.author} date={Element.publishedAt} source={Element.source.name}/>
                </div>
       })}
        </div>
        </div>
        </InfiniteScroll>
    </>
    )
  }
}

export default News

