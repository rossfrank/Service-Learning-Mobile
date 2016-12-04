'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  ListView,
  Alert,
} from 'react-native';
import MapView from 'react-native-maps';

import { Title, Icon, Header, Thumbnail, Content, Container, Card, CardItem, Button } from 'native-base';
import AutoTracking from '../Tracking/auto';

var style = require('../../styles/styles');
var img = require('../../assets/img/Logo.png')

var projects = [
  { "id": 99999,
    "name": "Service-Learning Time Tracker",
    "community partner": 99999,
    "description": "Creating a new system for tracking the hours worked by students doing service learning.",
    "start date": "2016-09-01 00:00:00",
    "end date": "2016-12-31 23:59:59.999999",
    "location": { "latitude": 42.339803, "longitude": -1.089274 }
  },
  { "id": 8888,
    "name": "Wediko",
    "community partner": 5555,
    "description": "Child care",
    "start date": "2016-09-01 00:00:00",
    "end date": "2016-12-31 23:59:59.999999",
    "location": { "latitude": 42.339170, "longitude": -71.069139 }
  },
]

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    var dsProj = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
       projects: dsProj.cloneWithRows([
                    'Time Tracker', 'Project 1', 'Project 2',
              ]),
    }
  }
  navigate() {
    this.props.navigator.push({title: 'ManualTracking'});
  }
  startAlert() {
    Alert.alert(
      'Clock In',
      'You will be logging hours for the project "Service Learning Mobile"',
      [
        {text: 'Cancel', onPress: () => console.log('Dismissed')},
        {text: 'OK', onPress: this.startAuto.bind(this)},
      ]
    )
  }
  startAuto() {
    this.setState({auto: true});
  }
  stopAlert(startTime, endTime) {
    this.setState({startTime: startTime, endTime: endTime});
    var timer = (endTime - startTime) / 60000;
    Alert.alert(
      'Clock Out',
      'Worked ' + timer.toFixed(2) + ' minutes for "Service Learning Mobile". Please input category'
      + ' and any relevant notes',
      [
        {text: 'OK', onPress: this.stopAuto.bind(this)},
      ]
    )
  }
  stopAuto(startTime, endTime) {
    this.props.navigator.push({
      title: 'ManualTracking',
      extras: {
        start: this.state.startTime,
        end: this.state.endTime,
      }});
    this.setState({auto: false});
  }
  render() {

    return(
      <ScrollView>
          <View style={{margin: 16}}>
             {this.state.auto ? <AutoTracking onStop={this.stopAlert.bind(this)}/> : null}
              <Card style={styles.card}>
                  <CardItem header>
                      <Text style={StyleSheet.flatten([style.subheader])}>Project Tracking</Text>
                  </CardItem>
                  <CardItem>
                      <MapView
                        style={styles.map}
                        initialRegion={{
                          latitude: 42.340951,
                          longitude: -71.087566,
                          latitudeDelta: 0.0922,
                          longitudeDelta: 0.0421,
                        }}
                      />
                      <MapView.Marker
                        coordinate={{'latitude': 42.341855, 'longitude': -71.086745}}
                        title={"Sdfdsf"}
                        description={"sdfdsf"}
                      />
                    {projects.map(marker => (
                          <MapView.Marker
                            coordinate={marker.location}
                            title={marker.name}
                            description={marker.description}
                          />
                        ))}
                  </CardItem>
                  <CardItem style={{flexDirection:'row'}}>
                    <Text style={{flex: 2}}>You are near a Service-Learning partner</Text>

                    <TouchableHighlight style={StyleSheet.flatten([style.button, style.height40])}
                      onPress={this.startAlert.bind(this)}>
                      <Text style={style.buttonText}> Clock In</Text>
                    </TouchableHighlight>
                     </CardItem>
             </Card>
             <Card style={styles.card}>
                 <CardItem header>
                     <Text style={StyleSheet.flatten([style.subheader])}>Log Hours</Text>
                 </CardItem>

                 <CardItem>
                   <Text>You last clocked 2 hours on 11/30 for Service-Learning</Text>
                 </CardItem>
                 <CardItem style={{flexDirection:'row', justifyContent: 'flex-end'}}>
                 <TouchableHighlight style={StyleSheet.flatten([style.button, style.height40])} onPress={this.navigate.bind(this)}>
                   <Text style={style.buttonText}> Log Hours</Text>
                   </TouchableHighlight>
                  </CardItem>
            </Card>
            <Card style={styles.card}>
                <CardItem header>
                    <Text style={StyleSheet.flatten([style.subheader])}>Project Details</Text>
                </CardItem>
                {projects.map(project => (
                     <CardItem button onPress={() => this.navigate()}>
                         <Thumbnail source={img}/>
                         <Text>{project.name}</Text>
                     </CardItem>
                   ))}

           </Card>
          </View>
      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    height: 200
  },
  card: {
    marginTop: 8
  },
  container: {
    margin: 16
  }
});

module.exports = Dashboard;
