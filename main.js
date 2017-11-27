import React from 'react';
import ReactDOM from 'react-dom';
import Card from './src/js/card.jsx';

window.ProtoGraph = window.ProtoGraph || {};
window.ProtoGraph.Card = window.ProtoGraph.Card || {};


ProtoGraph.Card.toQuestion = function () {
  this.cardType = 'toQuestion';
}

ProtoGraph.Card.toQuestion.prototype.init = function (options) {
  this.options = options;
}

ProtoGraph.Card.toQuestion.prototype.getData = function (data) {
  return this.containerInstance.exportData();
}

ProtoGraph.Card.toQuestion.prototype.renderLaptop = function (data) {
  this.mode = 'laptop';
  ReactDOM.render(
    <Card
      dataURL={this.options.data_url}
      schemaURL={this.options.schema_url}
      optionalConfigURL={this.options.configuration_url}
      optionalConfigSchemaURL={this.options.configuration_schema_url}
      mode={this.mode}
      clickCallback={this.options.onClickCallback}
      ref={(e) => {
        this.containerInstance = this.containerInstance || e;
      }}/>,
    this.options.selector);
}

ProtoGraph.Card.toQuestion.prototype.renderMobile = function (data) {
  this.mode = 'mobile';
  ReactDOM.render(
    <Card
      dataURL={this.options.data_url}
      schemaURL={this.options.schema_url}
      optionalConfigURL={this.options.configuration_url}
      optionalConfigSchemaURL={this.options.configuration_schema_url}
      mode={this.mode}
      clickCallback={this.options.onClickCallback}
      ref={(e) => {
        this.containerInstance = this.containerInstance || e;
      }}/>,
    this.options.selector);
}

ProtoGraph.Card.toQuestion.prototype.renderScreenshot = function (data) {
  this.mode = 'screenshot';
  ReactDOM.render(
    <Card
      dataURL={this.options.data_url}
      schemaURL={this.options.schema_url}
      optionalConfigURL={this.options.configuration_url}
      optionalConfigSchemaURL={this.options.configuration_schema_url}
      mode={this.mode}
      ref={(e) => {
        this.containerInstance = this.containerInstance || e;
      }}/>,
    this.options.selector);
}
