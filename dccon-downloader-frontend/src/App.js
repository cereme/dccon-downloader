import React from 'react';
import './App.css';

import ReactGA from 'react-ga';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
       queryText: '',
       dcconNumber: 52640,
       searchResult: [],
       downloadButtonDisabled: false,
    }
  }

  _onPressSearch = () =>{
    ReactGA.event({
      'category': 'search',
      'action': 'press',
      'value': this.state.queryText,
    });
    fetch('https://7d2i8oa48i.execute-api.ap-northeast-2.amazonaws.com/prod/search',{
      method: 'POST',
      body: JSON.stringify({query_text: this.state.queryText})
    })
    .then(res => res.json())
    .then(res => {
      console.log(JSON.parse(res.body));
      this.setState({searchResult: JSON.parse(res.body)});
    });
  }

  SearchResultList(props) {
    return (
      <div className="SearchResult-container">
        {props.items.map((item, index) => (
          <div key={item.num} className="SearchResult-element">
            <img src={`data:image/jpg;base64,${item.thumbnail}`} alt={item.name}/>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    );
  }

  _onPressDownload = () => {
    const downloadFile = (data, filename) => {
      var element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;base64,' + data);
      element.setAttribute('download', filename);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
    ReactGA.event({
      'category': 'download',
      'action': 'press',
      'value': this.state.dcconNumber,
    });
    this.setState({downloadButtonDisabled: true});
    fetch('https://7d2i8oa48i.execute-api.ap-northeast-2.amazonaws.com/prod/download',{
      method: 'POST',
      body: JSON.stringify({dccon_num: this.state.dcconNumber})
    })
    .then(res => res.json())
    .then(res => {
      downloadFile(res.body, res.filename);
      this.setState({downloadButtonDisabled: false});
    });
  }
  
  render(){
    return(
      <div className="App">
        <div className="Search-conatiner">
          <span> 검색어 </span>
          <input id="searchInput" onChange={(e)=>{this.setState({queryText: e.target.value})}}></input>
          <button onClick={this._onPressSearch}> 검색! </button>
        </div>
        <this.SearchResultList items={this.state.searchResult}/>
        <div className="Download-conatiner">
          <span> 디씨콘 번호 </span>
          <input id="downloadInput" onChange={(e)=>{this.setState({dcconNumber: e.target.value})}} placeholder={52640}/>
          <button onClick={this._onPressDownload} disabled={this.state.downloadButtonDisabled}> 
            {this.state.downloadButtonDisabled? '다운로드중...' : '다운로드! (8~10초정도 걸림)'}
          </button>
        </div>
      </div>
    )
  }
}