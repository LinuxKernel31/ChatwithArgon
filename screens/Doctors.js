import React, { Component } from 'react';
import {StyleSheet, Dimensions, View, Text, FlatList, ScrollView, TouchableOpacity} from 'react-native';
import firebase from "../firebase"
import articles from '../constants/articles';
import { Button, Select, Icon, Input, Header, Switch } from "../components/";

import argonTheme from "../constants/Theme";
import { Block, Card, theme } from "galio-framework";


const { width } = Dimensions.get('screen');


export default class Doctors extends React.Component{

    constructor(props) {
        super(props);
        
        this.state = {
            doctorsNames: []
        };
    }

    async componentDidMount(){
        const doctors = [];
        await firebase.firestore().collection('Doctors').get()
            .then(querySnapshot => {
                querySnapshot.docs.forEach(doc => {
                    doctors.push(doc.data());
                   
                });
                this.setState({doctorsNames: doctors});
            });
    }

    render() {
        const {navigation} = this.props;
        return (
            <ScrollView
            showsVerticalScrollIndicator={false} >
            { this.state.doctorsNames.map((value) => (
                <Block>
                        <Card
                        flex
                        borderless
                        style={styles.card}
                        title={value.Name}
                        caption={value.Time}
                        location="Quezon City"
                        avatar="http://i.pravatar.cc/100?id=skater"
                        imageStyle={styles.cardImageRadius}
                        imageBlockStyle={{ padding: theme.SIZES.BASE / 2 }}
                        image="https://images.unsplash.com/photo-1497802176320-541c8e8de98d?&w=1600&h=900&fit=crop&crop=entropy&q=300"
                        
                        />
                        <Block center>
                        <Button
                        color="success"
                        title="Set Appointment"
                        onPress={() => navigation.navigate('Appointments', {name: value.Name, time: value.Time})} center>
                        <Text>Set an appointment with Dr. {value.Name}</Text>
                        </Button>
                        </Block>
                            
                </Block>
  
                    
                
                )) }


            
            </ScrollView>
        );
    }
                                                                                                                
    tite = () => {
        const {navigation} = this.props;
        // console.warn(name);      
        navigation.navigate('Appointment')
    }


}
const styles1 = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 40,
      backgroundColor: '#ecf0f1',
    },
    cardImageRadius:
    {
        borderRadius: 15
    },
    paragraph: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#34495e',
    },
    cardContainer:
    {
        width: 200,
        height: 150
    }
  });
const styles = StyleSheet.create({
    home: {
      width: width,    
    },
    articles: {
      width: width - theme.SIZES.BASE * 2,
      paddingVertical: theme.SIZES.BASE,
    },
    container:
    {
        padding:20,
        backgroundColor: '#3498db'
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
    }

  });