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

ProtoGraph.Card.toQuestion.prototype.renderCol7 = function (data) {
  this.mode = 'col7';
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

ProtoGraph.Card.toQuestion.prototype.renderCol4 = function (data) {
  this.mode = 'col4';
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

ProtoGraph.Card.toQuestion.prototype.renderCol3 = function (data) {
  this.mode = 'col3';
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
