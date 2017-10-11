import React, {Component} from 'react';
import './App.css';

import DetailsForm from './DetailsForm.js';
import LoadingSpinner from './LoadingSpinner.js';
import OpenWithOverleaf from './OpenWithOverleaf.js';
import Error from './Error.js';

import {getSetFromUrl} from '../lib/quizlet.js';
import activitiesFromNames from '../activities/index.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.advance('reset');
  }

  async advance(m, ctx) {
    // Update status FSM
    // with a motion and a context
    //
    // Possibilities:
    // ready -> [working, error]
    // working -> [done, error, working]
    // done -> [ready]
    // error -> [ready]
    //
    // Motions:
    // error(ctx=error)
    // start(ctx=params)
    // work(ctx=message)
    // finish(ctx=document)
    // reset(ctx=whatever)

    return new Promise((resolve, reject) =>
      this.setState(
        (state, props) => {
          console.log('Advance:', m, ctx);
          const status = state.status;
          let newState = null;
          if (m === 'error') {
            newState = {status: 'error', err: ctx};
          } else if (m === 'reset') {
            newState = {status: 'ready', params: {}, err: null, result: null, workMsg: null};
          } else if (status === 'ready' && m === 'start') {
            newState = {status: 'working', params: ctx};
          } else if (status === 'working' && m === 'work') {
            newState = {status: 'working', workMsg: ctx};
          } else if (status === 'working' && m === 'finish') {
            newState = {status: 'done', result: ctx};
          } else {
            newState = {status: 'error', err: 'Something went wrong... help'};
          }

          return newState;
        },
        () => resolve()
      )
    );
  }

  async onSubmit(params) {
    try {
      this.advance('start', params);
      this.advance('work', 'Getting Quizlet set...');
      const set = await getSetFromUrl(params.url);
      this.advance('work', 'Generating activity...');
      const text = activitiesFromNames[params.type](set, params);
      this.advance('finish', text);
    } catch (err) {
      this.advance('error', err.message);
    }
  }

  render() {
    const {status, err, result, workMsg} = this.state;
    let block = null;

    if (status === 'ready') {
      block = <DetailsForm onSubmit={params => this.onSubmit(params)} />;
    } else if (status === 'working') {
      block = <LoadingSpinner label={workMsg} />;
    } else if (status === 'done') {
      block = <OpenWithOverleaf text={result} />;
    } else if (status === 'error') {
      block = <Error label={err} onReset={() => this.advance('reset')} />;
    }
    return (
      <div className="App">
        <div className="App_container">
          <h1 className="App_header">
            <button onClick={() => this.advance('reset')} className="App_link">
              Activity Generator
            </button>
          </h1>
          {block}
        </div>
      </div>
    );
  }
}

export default App;
