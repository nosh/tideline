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
var classnames = require('classnames');
var d3 = require('d3');
var React = require('react');

var SummaryGroup = React.createClass({
  propTypes: {
    data: React.PropTypes.object.isRequired,
    name: React.PropTypes.string.isRequired,
    options: React.PropTypes.array.isRequired,
    selectedSubtotal: React.PropTypes.string.isRequired,
    onSelectSubtotal: React.PropTypes.func.isRequired
  },
  render: function() {
    var self = this;

    var primaryOption = _.find(self.props.options, { primary: true });
    var primaryElem = null;
    if (primaryOption) {
      primaryElem = this.renderInfo(primaryOption);

      if (!self.props.selectedSubtotal) {
        self.props.selectedSubtotal = primaryOption.key;
      }
    }

    var otherOptions = _.filter(self.props.options, function(row) { return row.key !== primaryOption.key; });

    var others = otherOptions.map(self.renderInfo);

    return (
      <div className="SummaryGroup-container">
        {primaryElem}
        <div className="SummaryGroup-info-others">
          {others}
        </div>
      </div>
    );
  },
  renderInfo: function(option) {
    var self = this;
    var classes = classnames({
      'SummaryGroup-info--selected': (option.key === self.props.selectedSubtotal),
      'SummaryGroup-info-primary': option.primary,
      'SummaryGroup-info': !option.primary
    });

    var value = (
      <span className="SummaryGroup-option-count">
        {option.key === 'total'? this.props.data[option.key] :
          this.props.data[option.key].count}
      </span>
    );
    var percentage = option.key === 'total' ? null : (
      <span className="SummaryGroup-option-percentage">
        {d3.format('%')(this.props.data[option.key].percentage)}
      </span>
    );

    return (
      <div key={option.key} className={classes}
        onClick={this.handleClickSubtotal.bind(null, option)}>
        <span className="SummaryGroup-option-label">{option.label}</span>
        {percentage}
        {value}
      </div>
    );
  },
  handleClickSubtotal: function(option) {
    this.props.onSelectSubtotal(option.key);
  }
});

module.exports = SummaryGroup;