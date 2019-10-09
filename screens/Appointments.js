import React, { Component } from 'react';
import {StyleSheet, Dimensions, View, Text, FlatList, ScrollView, Card, TouchableOpacity, TextInput} from 'react-native';
import { Block, theme, Button } from 'galio-framework';
import firebase from "../firebase"
import articles from '../constants/articles';
import { Select, Icon, Input, Header, Switch } from "../components/";
import DatePicker from "react-native-datepicker";
import { Time } from 'react-native-gifted-chat';



const { width } = Dimensions.get('screen');

export default class Appointments extends React.Component{



    state ={
        date: new Date(),
        time: new Date(),
        issue: '',
        client_firstname: this.props.navigation.state.params.firstname,
        client_lastname: this.props.navigation.state.params.lastname,
        client_image: this.props.navigation.state.params.image,
        client_age: this.props.navigation.state.params.age,
        client_address: this.props.navigation.state.params.address,
        client_email: this.props.navigation.state.params.email,

    };


    _setAppointment = () =>
    {
      
     
        this._setToUser();

        const setToFireStoreDoctor = firebase.firestore()
        .collection('Doctors')
        .doc(this.props.navigation.state.params.doctoremail)
        .collection('Appointments').doc(this.state.client_lastname);
      
        setToFireStoreDoctor.set({
            first_name : this.state.client_firstname,
            last_name: this.state.client_lastname,
            age: this.state.client_age,
            image: this.state.client_image,
            address: this.state.client_address,
            email: this.state.client_email,
            Date: this.state.date,
            Time: this.state.time,
            issue: this.state.issue,
            doctor: this.props.navigation.state.params.name,
          }).then((docRef) => {
            alert("Your appointment has been set.")
            this.props.navigation.navigate('Home');
            })
            .catch((error) => {
                alert("Failed to set your appointment, please try again later.", error);
            
              });
    }

    _setToUser = () =>
    {
        console.log(this.state.client_lastname);
        const setToFireStoreUser = firebase.firestore().collection('User').doc(this.state.client_email).collection('Appointments').doc(this.state.client_lastname);

        setToFireStoreUser.set({
            first_name : this.state.client_firstname,
            last_name: this.state.client_lastname,
            age: this.state.client_age,
            image: this.state.client_image,
            address: this.state.client_address,
            email: this.state.client_email,
            Date: this.state.date,
            Time: this.state.time,
            issue: this.state.issue,
            doctor: this.props.navigation.state.params.name,
          }).then((docRef) => {
            this.props.navigation.navigate('Home');
            })
            .catch((error) => {
                alert("Failed to set your appointment, please try again later.", error);
            
              });
    }

    render() {
        return (

            <View style={styles.container} >
                <Block center>
            <Text style={styles.doctorName}> Dr.{ this.props.navigation.state.params.name }</Text>
            <Block center>
                <Text>Choose a date:</Text>
            <DatePicker
                style={{width: 200}}
                date={this.state.date}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate= {new Date()}
                maxDate="2030-12-31"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                },
                dateInput: {
                    marginLeft: 36
                }
            
                }}
                onDateChange={(dates) => {this.setState({date: dates})}}
            />
            </Block>

            <Block center>
                <Text>Choose a time:</Text>
            <DatePicker
                style={{width: 200}}
                date={this.state.time}
                mode="time"
                placeholder="select time"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                is24Hour
                customStyles={{
                dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                },
                dateInput: {
                    marginLeft: 36
                }
                }}
                onDateChange={(times) => {this.setState({time: times})}}
            />
            </Block>

            <Block style={styles.textAreaContainer} center>
            <TextInput
                style={styles.textArea}
                underlineColorAndroid="transparent"
                placeholder="Please state your condition(issue)..."
                placeholderTextColor="grey"
                numberOfLines={10}
                multiline={true}
                onChangeText={(text) => this.setState({issue: text})}
                />
            </Block>

            <Block center>
                <Button onPress={this._setAppointment }>SAVE</Button>
            </Block>
            </Block>
            </View>
            

            
            // </ScrollView>
        );
    }


}
const styles = StyleSheet.create({
    home: {
      width: width,    
    },
    doctorName:
    {
        fontSize: 16,
        fontWeight: "700",

    },
    articles: {
      width: width - theme.SIZES.BASE * 2,
      paddingVertical: theme.SIZES.BASE,
    },
    container:
    {
        paddingTop: 100,
        padding:20,
        backgroundColor: '#ffffff'
    },
    input:
    {
        height:40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 15,
        color: '#FFF',
        paddingHorizontal: 20
    },
    buttonContainer:
    {
        width:200,
        marginTop: 20,
        backgroundColor: '#2980b9',
        paddingVertical: 15
    },
    buttonText:
    {
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: '700'
    },
    textAreaContainer: {
        borderColor: '#ffffff',
        borderWidth: 1,
        padding: 5
      },
      textArea: {
        height: 150,
        justifyContent: "flex-start"
      }

  });