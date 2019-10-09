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

       
        await firebase.firestore().collection('Doctors').doc(this.props.navigation.state.params.email).collection('Appointments').get()
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
                        title={value.first_name}
                        caption={value.Time}
                        location="Quezon City"
                        avatar="http://i.pravatar.cc/100?id=skater"
                        imageStyle={styles.cardImageRadius}
                        imageBlockStyle={{ padding: theme.SIZES.BASE / 2 }}
                        image="https://firebasestorage.googleapis.com/v0/b/chatbot-escuyos.appspot.com/o/Profile%2Fdoctor-logo-logo1.png?alt=media&token=d0214394-f90b-4358-ab0e-3993d35a1269"
                        
                        />
                        <Block center>
                        <Button
                        color="success"
                        title="Set Appointment" center>
                        <Text>You have an appointment with {value.Name}</Text>
                        </Button>
                        </Block>
                            
                </Block>
  
                    
                
                )) }


            
            </ScrollView>
        );
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