import React from 'react';

let SnackBarContext;
const {Provider, Consumer} = SnackBarContext = React.createContext({
  isOpenSnackBar: false,
  snackMessage: '',
  snackType: 'success',
  openSnackBar: (snackMessage, snackType = 'success') => {},
  closeSnackBar: () => {},
});

class SnackBarProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenSnackBar: false,
      snackMessage: '',
      snackType: 'success',
    };

    this.openSnackBar = this.openSnackBar.bind(this);
    this.closeSnackBar = this.closeSnackBar.bind(this);
  }

  openSnackBar(snackMessage, snackType = 'success') {
    this.setState({isOpenSnackBar: true, snackMessage, snackType});
  }

  closeSnackBar() {
    this.setState({isOpenSnackBar: false});
  }

  render() {
    const {isOpenSnackBar = false, snackMessage = '', snackType = 'success'} = this.state;

    return (
      <Provider value={{
        openSnackBar: this.openSnackBar,
        closeSnackBar: this.closeSnackBar,
        isOpenSnackBar,
        snackMessage,
        snackType,
      }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export {SnackBarProvider, Consumer as SnackBarConsumer, SnackBarContext};

export const withSnackBarContext = (Component) => (
  props => (
    <Consumer>
      {context => <Component snackBarContext={context} {...props}/>}
    </Consumer>
  )
);
