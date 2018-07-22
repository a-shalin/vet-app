import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user : null
    }
  }

  render() {
    if (this.state.user != null) {
      return ( 
        <Text>User {this.state.user} logged in application</Text>
      );
    } else {
      return <LoginView onLogged={this.onLogged} />;
    }
  }

  onLogged = (user) => {
    this.setState({user : user});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginField: {
    width: 100,
    height: 40,
  }
});

class LoginView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user : '',
      pass  : '',
      isLogging : false
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.loginField}
          placeholder="User"
          onChangeText={(text) => this.setState({user: text})}
        />
        <TextInput
          style={styles.loginField}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({pass: text})}
        />
        <Button title="Log in" onPress={this.login}/>
      </View>
    );
  }

  login = () => {
    console.log('Logging in');
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://app.cloudinfosys.ru/vet/rs/login", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = (x) => {
      console.log(x.target.status);
      console.log(x.target._response);
    };
    xhr.send('{user: "xxx", pass: "yyy"}');
  }
}
