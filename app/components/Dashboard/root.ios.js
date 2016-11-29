'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TabBarIOS
} from 'react-native';

import Dashboard from './dashboard';
import Summary from './summary';
import DatePicker from '../Tracking/manual';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Title, Button, Header, Container, Card, CardItem } from 'native-base';

var style = require('../../Styles/styles');

export default class Root extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'Dashboard'
    };
  }

  render() {
    return (
      <View style={{flex: 1}}>
      <Header>
      <Button transparent>
        <Icon name='ios-menu' />
      </Button>
      <Title>Dashboard</Title>
      </Header>
      <TabBarIOS selectedTab={this.state.selectedTab}>
      <Icon.TabBarItem
        title="Dashboard"
        iconName="tachometer"
        selectedIconName="tachometer"
        selected={this.state.selectedTab === 'Dashboard'}
        onPress={() => {
            this.setState({
              selectedTab: 'Dashboard'
      })}}>
      <Dashboard navigator={this.props.navigator} />
      </Icon.TabBarItem>
      <Icon.TabBarItem
        title='Summary'
        iconName="server"
        selectedIconName="server"
        selected={this.state.selectedTab === 'Summary'}
        onPress={() => {
            this.setState({
              selectedTab: 'Summary'
      })}}>
      <Summary navigator={this.props.navigator} />
      </Icon.TabBarItem>
      </TabBarIOS>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
