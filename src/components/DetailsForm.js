import React from 'react';
import PropTypes from 'prop-types';
import './DetailsForm.css';

const Label = ({children, label}) => (
  <label className="DetailsForm_label DetailsForm_group">
    <div>{label}</div>
    {children}
  </label>
);

const Row = ({children}) => <div className="DetailsForm_row">{children}</div>;

class DetailsForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      type: 'matching',
      num: '',
      reverse: false
    };
  }

  onChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({[name]: value});
  }

  onSubmit(e) {
    // Clean up empty fields
    const params = {
      url: this.state.url,
      type: this.state.type,
      reverse: this.state.reverse,
      num: this.state.num || null
    };
    this.props.onSubmit(params);
  }

  render() {
    const {url, type, num, reverse} = this.state;
    return (
      <div className="DetailsForm">
        <Label label="Quizlet URL">
          <input type="url" onChange={this.onChange.bind(this)} name="url" value={url} />
        </Label>

        <Row>
          <Label label="Activity Type">
            <select onChange={this.onChange.bind(this)} name="type" value={type}>
              <option value="matching">Matching</option>
              <option value="multiple">Multiple Choice</option>
            </select>
          </Label>
          <Label label="Number of Questions">
            <input
              type="number"
              onChange={this.onChange.bind(this)}
              name="num"
              placeholder="All"
              value={num}
            />
          </Label>
        </Row>

        <label className="DetailsForm_group">
          <input
            type="checkbox"
            className="DetailsForm_checkbox"
            label="Reverse terms/definitions"
            onChange={this.onChange.bind(this)}
            checked={reverse}
            name="reverse"
          />
          Reverse terms/definitions
        </label>

        <p className="DetailsForm_description">
          Just pop in a quizlet URL, pick an activity type and number of questions, and hit go. More
          activity types to come in future updates :)
        </p>

        <button className="DetailsForm_button" onClick={this.onSubmit.bind(this)}>
          Go!
        </button>
      </div>
    );
  }
}

DetailsForm.propTypes = {
  onSubmit: PropTypes.func
};

export default DetailsForm;
