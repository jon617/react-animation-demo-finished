import React, { Component } from 'react';
import './App.css';
import * as Animated from 'animated/lib/targets/react-dom';
import Easing from 'animated/lib/Easing';

class App extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      doAnimation: false,
    }
    this.spinValue = new Animated.Value( 0 );
  }

  startOrEndSpin = () => {
    if ( this.state.doAnimation ) {
      this.setState({ doAnimation: false });
    } else {
      this.setState({ doAnimation: true });
      this.doSpin();
    }
  }

  doSpin = () => {
    this.spinValue.setValue( 0 );
    Animated.timing(
      this.spinValue,
      {
        toValue: 1,  // go from 0 to 1
        duration: 1000,  // milliseconds, so 1000 = 1second
        easing: Easing.inOut( Easing.quad ),
        useNativeDriver: true,
      }
    ).start( this.onSpinCompletion )
  }
  onSpinCompletion = () => {
    if ( this.state.doAnimation ) {
      this.doSpin();
    }
  }

  render() {

    const spin = this.spinValue.interpolate({
      inputRange: [ 0, 1 ],
      outputRange: [ '0deg', '360deg' ]
    });

    return (
      <div className="App">
        <div style={{ marginTop: 35 }}>
          <Animated.img
            src="a-logo.jpg"
            alt=""
            width={ 200 }
            height={ 200 }
            style={{
              transform: [{
                rotate: spin
              }]
            }}
          />
        </div>

        <br /><br /><br /><br />
        <button
          type="button"
          onClick={ this.startOrEndSpin }
        >
          click me to animate
        </button>
      </div>
    );
  }
}

export default App;
