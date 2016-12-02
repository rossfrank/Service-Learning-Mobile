import React, { Component } from 'react';
import {StyleSheet, View, Text, TextInput, Image, TouchableHighlight } from 'react-native';

import api from '../../api/index'

var style = require('../../../Styles/styles');

export default class LogInScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {loading: false, error: false, username: '', password: '', key: 'aasd'};
  }

  // Used to move to the next screen
  // Passes the list of projects from the classes to the next screen
  navigateLogIn() {
    this.props.navigator.push({
      title: 'Dashboard'
    })
  }

  tryLogIn = async function() {
    try {
      console.log('start');
      this.setState({loading: true});
      const key = await api.getAuthKey(this.state.username,this.state.password);
      console.log(key);
      this.setState({loading: false, key: key});
      this.navigateLogIn();
    } catch (e) {
      console.log(e + "error");
      this.setState({loading: false, error: true})
    }
  };

  // Used to move to the next screen
  // Passes the list of projects from the classes to the next screen
  navigateSignUp() {
    this.props.navigator.push({
      title: 'EnterInfo'
    })
  }

  render() {
    return (
      <View style={style.container}>
        <View style={style.inputContainer}>
          <Text style={style.textCenter}>Email</Text>
          <TextInput
          style={{textAlign : 'center', marginBottom: 30}}
          onChangeText={(username) => this.setState({username})}
          value={this.state.username}
          />
          <Text style={style.textCenter}>Password</Text>
          <TextInput
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
          />
        </View>
        <View style={StyleSheet.flatten([style.inputContainer, style.alignCenter])}>
          <TouchableHighlight style={style.button}  onPress={() => this.tryLogIn()}>
            <Text style={{fontSize: 30, fontWeight: 'bold'}}> Log In </Text>
          </TouchableHighlight>
          <TouchableHighlight style={style.button}  onPress={() => this.navigateSignUp()}>
            <Text style={{fontSize: 30, fontWeight: 'bold'}}> Sign Up </Text>
          </TouchableHighlight>
          <TouchableHighlight  onPress={() => this.navigateSignUp()}>
            <Text style={{color: 'blue', textDecorationLine: 'underline'}}> Forgot Password </Text>
          </TouchableHighlight>
        </View>
        <View style={style.container}>
        </View>
      </View>
    );
  }
}
