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
      num: ''
    };
  }

  onChange(e) {
    console.log(`${e.target.name} -> ${e.target.value}`);
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e) {
    // Clean up empty fields
    const params = {
      url: this.state.url,
      type: this.state.type,
      num: this.state.num || null
    };
    this.props.onSubmit(params);
  }

  render() {
    const {url, type, num} = this.state;
    return (
      <div className="DetailsForm">
        <Label label="Quizlet URL">
          <input type="url" onChange={this.onChange.bind(this)} name="url" value={url} />
        </Label>

        <Row>
          <Label label="Activity Type">
            <select onChange={this.onChange.bind(this)} name="type" value={type}>
              <option name="matching">Matching</option>
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

DetailsForm.PropTypes = {
  onSubmit: PropTypes.func
};

export default DetailsForm;
