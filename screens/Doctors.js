import React, { Component } from 'react';
import {StyleSheet, Dimensions, View, Text, FlatList, ScrollView, Card, TouchableOpacity} from 'react-native';
import { Block, theme } from 'galio-framework';
import firebase from "../firebase"
import articles from '../constants/articles';
import { Button, Select, Icon, Input, Header, Switch } from "../components/";


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
                  
                    <Block key={value.Name} style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Block center>
                            <TouchableOpacity style={styles.buttonContainer} onPress={() => {
                                navigation.navigate('Appointments', { name : value.Name });
                            }}>
                                <Text style={styles.buttonText}>{value.Name} -- {value.Time}</Text>
                            </TouchableOpacity>
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