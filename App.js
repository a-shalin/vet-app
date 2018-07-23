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
      return <MainView onLogged={this.onLogged} user={this.state.user} />
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
        <Button title="Log in" onPress={this.login} disabled={this.state.isLogging}/>
      </View>
    );
  }

  login = () => {
    console.log('Logging in');
    this.setState({isLogging: true});
    const userPass = 'user=' + encodeURIComponent(this.state.user) + 
        '&pass=' + encodeURIComponent(this.state.pass);

    fetch("https://app.cloudinfosys.ru/vet/rs/login", {
      method: 'post',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: userPass
    }).then(resp => {
      if (resp.status == 200) {
        console.log("Successfully login");
        this.props.onLogged(this.state.user);
      } else 
      if (resp.status == 409) {
        resp.json().then(userError => {
          alert(userError.message);
          this.setState({isLogging: false});
        });
      } else {
        alert(resp.statusText);
        this.setState({isLogging: false});
      }
    }); 
  }
}

class MainView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogouting : false
    }
  }

  render() {
    return (
      <View>
        
        <Button 
          title={'Log out ' + this.props.user} onPress={this.logout} 
          disabled={this.state.isLogouting}
        />
      </View>
    );
  };

  logout = () => {
    console.log('Logging out');
    this.setState({isLogouting: true});
    
    fetch("https://app.cloudinfosys.ru/vet/rs/logout", {
      method: 'post'
    }).then(resp => {
      if (resp.status == 200) {
        console.log("Successfully log out");
        this.props.onLogged(null);
      } else 
      if (resp.status == 409) {
        resp.json().then(userError => {
          alert(userError.message);
          this.setState({isLogouting: false});
       });
      } else {
        alert('Error ' + resp.status);
        this.setState({isLogouting: false});
      }
    }); 
  }
}

