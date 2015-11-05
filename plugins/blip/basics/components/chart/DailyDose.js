/** @jsx React.DOM */
/* 
 * == BSD2 LICENSE ==
 * Copyright (c) 2015 Tidepool Project
 * 
 * This program is free software; you can redistribute it and/or modify it under
 * the terms of the associated License, which is identical to the BSD 2-Clause
 * License as published by the Open Source Initiative at opensource.org.
 * 
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the License for more details.
 * 
 * You should have received a copy of the License along with this program; if
 * not, you can obtain one from Tidepool Project at tidepool.org.
 * == BSD2 LICENSE ==
 */

var _ = require('lodash');
var d3 = require('d3');
var React = require('react');
var cx = require('classnames');

var inputRef = 'weightInput';

var DailyDose = React.createClass({
  propTypes: {
    data: React.PropTypes.object.isRequired,
    addToBasicsData: React.PropTypes.func.isRequired
  },
  /**
   * Get the initial state of the component
   * 
   * @return {Object}
   */
  getInitialState: function() {
    return {
      valid: (!!this.props.data.weight)
    }
  },
  /**
   * The main render function of the DailyDose component
   * @return {Element}
   */
  render: function() {
    var buttonClass = (this.state.valid) ? 'active' : '';

    return (
      <div className='DailyDose'>
        <div className="DailyDose-weightInputContainer">
          <div className="DailyDose-weightInputForm">
            <label>Weight</label>
            {this.renderWeightSelector()}
          </div>
          <button onClick={this.onClickCalculate} className={buttonClass} >Calculate</button>
        </div>
      </div>
    );
  },
  /**
   * Render function for the weight selector. We render a SELECT element
   * with options from 30 to 150. If weight is set in this session then
   * this option is auto-selected.
   * 
   * @return {Element}
   */
  renderWeightSelector: function() {
    var currentWeight = this.props.data.weight;
    var classes = cx({
      'DailyDose-weightInputForm-selector' : true,
      'valid': this.state.valid === true
    })
    var options = _.range(30,150).map(function(weight) {
      return (<option key={weight} value={weight}>{weight} kg</option>);
    });

    return (
      <div className={classes}>
        <select ref={inputRef} name={inputRef} defaultValue={currentWeight} onChange={this.onWeightChange}>
          <option value="0">Set kg</option>
          {options}
        </select>
        <i className="icon-down"/>
      </div>
    );
  },
  /**
   * When the weight value is changed this handler is used
   * to reassess whether the syaye of the form is valid or not
   *
   */
  onWeightChange: function() {
    var weight = parseInt(this.refs[inputRef].getDOMNode().value);
    this.setState({valid: !!weight});
  },
  /**
   * When the calculate button is clicked this handler is used
   * to store the weight in the session storage
   */
  onClickCalculate: function() {
    var weight = parseInt(this.refs[inputRef].getDOMNode().value);
    if (weight) {
      this.props.addToBasicsData('weight', weight);
    }
  }
});

module.exports = DailyDose;