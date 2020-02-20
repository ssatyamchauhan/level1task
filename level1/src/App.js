import React from 'react';
import './App.css';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      listOfData: [],
      limit: 20,
      isload: false,
    }
  }

  componentDidMount() {
    console.log('getData')
    axios
      .get("http://localhost:2000/getData")
      .then(data => {
        this.setState({
          listOfData: data.data,
          isload: true
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  loadMore = () => {
    console.log('loadMore')
    axios
      .get("http://localhost:2000/getData", { params: { limit: this.state.limit } })
      .then((data) => {
        let newlimit = this.state.limit + 10;
        let newList = this.state.listOfData.concat(data.data)
        this.setState({
          listOfData: newList,
          limit: newlimit
        })
      })
      .catch(err => {
        console.log(err)
      })
  }




  render() {

    let JSX = (
      console.log(this.state.listOfData),
      this.state.listOfData.map((element, ind) => {
        return (
          <div>
            <div className="App">
              <div className="logo">
                <img src={element.logo || "https://comps.canstockphoto.com/demo-icon-vector-clip-art_csp23639316.jpg"} alt="Smiley face" />
                <div className="heading">
                  <p>{element.name}</p>
                </div>
              </div>
              <span>{element.description.slice(0, 33) || "description is not available sorry!"}</span>
              <span><a href={element.facebook}>Facebook</a></span>
              <span><a href={element.medium}>Medium</a></span>
              <span><a href={element.blog}>Blog</a></span>
              <span><a href={element.website}>Website</a></span>
            </div>
            <hr/>
          </div>
        )
      })
    )

    const overallNews = <InfiniteScroll
      loadMore={this.loadMore}
      hasMore={this.state.isload}
      loader={<div className="loader" key={0}> <div>Loading .....</div></div>}
    >
      {JSX}
    </InfiniteScroll>
    return (
      <div>
        {overallNews}
      </div>
    );
  }
}

export default App;
