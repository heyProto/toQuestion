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
    this.state.card_no = parseInt(event.target.closest(".protograph-toQuestion-sub-question").getAttribute("data-card_no"));
    let prev_card = document.querySelector(`.protograph-toQuestion-sub-question[data-card_no="${this.state.card_no - 1}"]`);
    let container = event.target.closest(".sub-question-cards-container");
    container.scrollLeft -= prev_card.getBoundingClientRect().width + 10;
  }

  nextCard() {
    this.state.card_no = parseInt(event.target.closest(".protograph-toQuestion-sub-question").getAttribute("data-card_no"));
    let next_card = document.querySelector(`.protograph-toQuestion-sub-question[data-card_no="${this.state.card_no + 1}"]`);
    let container = event.target.closest(".sub-question-cards-container");
    container.scrollLeft += next_card.getBoundingClientRect().width + 10;
  }

  renderCol7() {
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
                                  <div className="protograph-toQuestion-sub-question-toggle prev" id="toQuestion_prev" onClick={() => {this.prevCard()}}>
                                    &lt;   Prev
                                  </div>
                                )
                              }
                              {
                                (index !== (data.subQuestions.length - 1)) && (
                                  <div className="protograph-toQuestion-sub-question-toggle next" id="toQuestion_next" onClick={() => {this.nextCard()}}>
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

  renderCol4() {
    return (
      <div id="protograph_div"></div>
    )
  }

  renderCol3() {
    return (
      <div id="protograph_div"></div>
    )
  }


  render() {
    switch(this.props.mode) {
      case 'col7' :
        return this.renderCol7();
        break;
      case 'col4' :
        return this.renderCol4();
        break;
      case 'col3' :
        return this.renderCol3();
        break;
    }
  }
}
