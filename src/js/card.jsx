import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { VictoryChart, VictoryLine, VictoryVoronoiContainer, VictoryTooltip} from 'victory';

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
      //this.componentDidUpdate();
    }
  }

  /* componentWillReceiveProps(nextProps) {
   *   this.setState({
   *     readMore: true
   *   });
   *   this.componentDidUpdate();
   * }
   */
  /* componentDidUpdate() {
   *   this.multiLineTruncate(document.querySelector('.protograph-toQuestion-description'));
   * }

   * multiLineTruncate(el) {
   *   let data = this.state.dataJSON.data,
   *       wordArray = data.description.split(' '),
   *       props = this.props;

   *   while (el.scrollHeight > el.offsetHeight) {
   *     wordArray.pop();
   *     el.innerHTML = `${wordArray.join(' ')}... <br><button id="read-more-button" class="protograph-read-more">Keep reading</button>`;
   *   }
   *   if (document.getElementById('read-more-button') !== null) {
   *     document.getElementById('read-more-button').addEventListener('click', (e) => {
   *       document.getElementById('read-more-button').style.display = 'none';
   *       document.querySelector('.protograph-toQuestion-description').style.maxHeight = 'none';
   *       document.querySelector('.protograph-toQuestion-description').style.marginBottom = '10px';
   *       document.querySelector('.protograph-toQuestion-description').innerHTML = data.description;
   *       this.setState({
   *         readMore: true
   *       });
   *       if (typeof props.clickCallback === 'function') {
   *         props.clickCallback();
   *       }
   *     })
   *   }
   * }
   */
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
                <div className="nine wide column">
                  <div className="protograph-toQuestion-sub-questions">

                    <div className="protograph-toQuestion-sub-question">
                      <div className="protograph-toQuestion-sub-question-question">{data.element}</div>
                      <div className="protograph-toQuestion-sub-question-answer">{data.score}</div>
                      <div className="protograph-toQuestion-sub-question-chart">
                        <VictoryChart height={200} width={320}
                          domainPadding={{ y: 0 }}
                          containerComponent={
                            <VictoryVoronoiContainer
                              voronoiDimension="x"
                              labels={(d) => `y: ${d.y}`}
                              labelComponent={
                                <VictoryTooltip
                                  cornerRadius={0}
                                  flyoutStyle={{ fill: "white" }}
                                />}
                            />}
                        >
                          {/* Score Line */}
                          <VictoryLine
                            data={[
                              { x: 2015, y: 1 },
                              { x: 2016, y: 1.5 },
                              { x: 2017, y: 2}
                            ]}
                            style={{
                              data: {
                                stroke: "tomato",
                                strokeWidth: (d, active) => { return active ? 4 : 2; }
                              },
                              labels: { fill: "tomato" }
                            }}
                          />
                          {/* Average Line */}
                          <VictoryLine
                            data={[
                              { x: 2015, y: 3 },
                              { x: 2016, y: 1.4 },
                              { x: 2017, y: 3 }
                            ]}
                            style={{
                              data: {
                                stroke: "blue",
                                strokeWidth: (d, active) => { return active ? 4 : 2; }
                              },
                              labels: { fill: "blue" }
                            }}
                          />
                        </VictoryChart>
                      </div>
                      <div className="protograph-toQuestion-sub-question-toggle-container">
                        <div className="protograph-toQuestion-sub-question-toggle prev">
                          Read More
                        </div>
                      </div>
                    </div>

                    {/* {this.subQuestion(data.subQuestions[0].question, data.subQuestions[0].answer)} */}
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
      <div className="protograph-toQuestion-sub-question">
        <div className="protograph-toQuestion-sub-question-question">{question}</div>
        <div className="protograph-toQuestion-sub-question-answer">{answer}</div>
        <div className="protograph-toQuestion-sub-question-toggle-container">
          <div className="protograph-toQuestion-sub-question-toggle prev">
            &lt; Prev
          </div>
          <div className="protograph-toQuestion-sub-question-toggle next">
            Next &gt;
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
