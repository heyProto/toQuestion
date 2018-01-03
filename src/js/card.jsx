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
    }
  }

  prevCard() {

  }

  renderLaptop() {
    if (this.state.fetchingData ){
      return(<div>Loading</div>)
    } else {
      let data = this.state.dataJSON.data;
      return (
        <div id="protograph_div" className="protograph-laptop-mode">
          <div className="protograph-card">
            <div className="protograph-toQuestion-question-container">
              <div className="ui grid">
                <div className="seven wide column">
                  <h1 className="ui header protograph-toQuestion-question">How is {data.company} performing on {data.element}?</h1>
                  <div>
                    <p className="protograph-toQuestion-description">{data.description}</p>
                  </div>
                </div>
                <div className="nine wide column sub-question-cards-container">
                  <div className="protograph-toQuestion-sub-questions" style={{ width: (320 * data.subQuestions.length) + (10 * data.subQuestions.length) }}>
                    {
                      data.subQuestions.map((i, index) => {
                        return (
                          <div className="protograph-toQuestion-sub-question" data-card_no={index + 1}>
                            <div className="protograph-toQuestion-sub-question-question">{i.question}</div>
                            <div className="protograph-toQuestion-sub-question-answer">{i.answer}</div>
                            <div className="protograph-toQuestion-sub-question-toggle-container">
                              {
                                (index !== 0)  &&  (
                                  <div className="protograph-toQuestion-sub-question-toggle prev" id="toQuestion_prev">
                                    &lt;   Prev
                                  </div>
                                )
                              }
                              {
                                (index !== (data.subQuestions.length - 1)) && (
                                  <div className="protograph-toQuestion-sub-question-toggle next" id="toQuestion_next">
                                    Next   &gt;
                                  </div>
                                )
                              }
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  subQuestion(question, answer, id) {
    return(
      <div className="protograph-toQuestion-sub-question" data-card_no={id}>
        <div className="protograph-toQuestion-sub-question-question">{question}</div>
        <div className="protograph-toQuestion-sub-question-answer">{answer}</div>
        <div className="protograph-toQuestion-sub-question-toggle-container">
          <div className="protograph-toQuestion-sub-question-toggle prev">
      &lt;   Prev
          </div>
          <div className="protograph-toQuestion-sub-question-toggle next">
            Next   &gt;
          </div>
        </div>
      </div>
    )
  }

  renderMobile() {
    if ( this.state.fetchingData ){
      return(<div>Loading</div>)
    } else {
      let data = this.state.dataJSON.data;

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
