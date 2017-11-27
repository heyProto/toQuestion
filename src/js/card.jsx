import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class toQuestion extends React.Component {

  constructor(props) {
    super(props)
    let stateVar = {
      fetchingData: true,
      dataJSON: {},
      schemaJSON: undefined,
      optionalConfigJSON: {},
      optionalConfigSchemaJSON: undefined,
      languageTexts: undefined,
      readMore: false
    };
    if (this.props.dataJSON) {
      stateVar.fetchingData = false;
      stateVar.dataJSON = this.props.dataJSON;
      // stateVar.languageTexts = this.getLanguageTexts(this.props.dataJSON.card_data.data.language);
    }

    if (this.props.optionalConfigJSON) {
      stateVar.optionalConfigJSON = this.props.optionalConfigJSON;
    }

    if (this.props.optionalConfigSchemaJSON) {
      stateVar.optionalConfigSchemaJSON = this.props.optionalConfigSchemaJSON;
    }

    this.state = stateVar;
  }

  exportData() {
    return document.getElementById('protograph_div').getBoundingClientRect();
  }

  componentDidMount() {
    if (this.state.fetchingData){
      axios.all([axios.get(this.props.dataURL), axios.get(this.props.optionalConfigURL), axios.get(this.props.optionalConfigSchemaURL)])
        .then(axios.spread((card, opt_config, opt_config_schema) => {
          this.setState({
            fetchingData: false,
            dataJSON: card.data,
            optionalConfigJSON: opt_config.data,
            optionalConfigSchemaJSON: opt_config_schema.data
          });
        }));
    } else {
      this.componentDidUpdate();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      readMore: false
    });
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    this.multiLineTruncate(document.querySelector('.protograph-toQuestion-description'));
  }

  multiLineTruncate(el) {
    let data = this.state.dataJSON.data,
      wordArray = data.description.split(' '),
      props = this.props;

    while (el.scrollHeight > el.offsetHeight) {
      wordArray.pop();
      el.innerHTML = `${wordArray.join(' ')}... <br><button id="read-more-button" class="protograph-read-more">Keep reading</button>`;
    }
    if (document.getElementById('read-more-button') !== null) {
      document.getElementById('read-more-button').addEventListener('click', (e) => {
        document.getElementById('read-more-button').style.display = 'none';
        document.querySelector('.protograph-toQuestion-description').style.maxHeight = 'none';
        document.querySelector('.protograph-toQuestion-description').style.marginBottom = '10px';
        document.querySelector('.protograph-toQuestion-description').innerHTML = data.description;
        this.setState({
          readMore: true
        });
        if (typeof props.clickCallback === 'function') {
          props.clickCallback();
        }
      })
    }
  }

  renderLaptop() {
    if (this.state.fetchingData ){
      return(<div>Loading</div>)
    } else {
      let data = this.state.dataJSON.data;
      let max_height = !this.state.readMore ? { maxHeight: "100px" } : { maxHeight: "none" }
      return (
        <div id="protograph_div" className="protograph-laptop-mode">
          <div className="protograph-card">
            <div className="protograph-toQuestion-question-container">
              <h3 className="ui header protograph-toQuestion-question">{data.question}</h3>
              <div>
                <span className="protograph-toQuestion-score">{data.score}</span>
                <span className="protograph-toQuestion-slash">/</span>
                <span className="protograph-toQuestion-total">{data.total}</span>
              </div>
            </div>
            <div className="protograph-toQuestion-description-container">
              <p className="protograph-toQuestion-description" style={max_height}>{data.description}</p>
            </div>
          </div>
        </div>
      )
    }
  }


  renderMobile() {
    if ( this.state.fetchingData ){
      return(<div>Loading</div>)
    } else {
      let data = this.state.dataJSON.data;
      let max_height = !this.state.readMore ? { maxHeight: "100px" } : { maxHeight: "none" }

      return (
        <div id="protograph_div" className="protograph-mobile-mode">
          <div className="protograph-card">
            <div className="protograph-toQuestion-question-container">
              <h3 className="ui header protograph-toQuestion-question">{data.question}</h3>
              <div>
                <span className="protograph-toQuestion-score">{data.score}</span>
                <span className="protograph-toQuestion-slash">/</span>
                <span className="protograph-toQuestion-total">{data.total}</span>
              </div>
            </div>
            <div className="protograph-toQuestion-description-container">
              <p className="protograph-toQuestion-description" style={max_height}>{data.description}</p>
            </div>
          </div>
        </div>
      )
    }
  }

  renderScreenshot() {
    if ( this.state.fetchingData ){
      return(<div>Loading</div>)
    } else {
    }
  }

  render() {
    switch(this.props.mode) {
      case 'laptop' :
        return this.renderLaptop();
        break;
      case 'mobile' :
        return this.renderMobile();
        break;
      case 'screenshot' :
        return this.renderScreenshot();
        break;
    }
  }
}
