import React from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  KeyboardAvoidingView,
  Linking,
  TouchableHighlight
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";
import { Select, Icon, Input, Header, Switch } from "../components/";
import firebase from "../firebase"
const { height, width } = Dimensions.get("screen");

import argonTheme from "../constants/Theme";
import Images from "../constants/Images";



class Onboarding extends React.Component {

  
  constructor(props)
  {
    super(props);
    console.log(this.props)
    this.state = {
      username: '',
      password: '',
      userNames: [],
      passWords: [],
      firstNames: [],


    };
    const { navigation } = this.props;

   navigation.navigate('PatientOnBoarding');
  }

                                            
  render() {
    
    return (
      
      
        <Block flex center>
        <ImageBackground
            source={Images.Onboarding}
            style={{ height, width, zIndex: 1 }}
          />
        </Block>
     
       

    );
  }


    
}


export default Onboarding;
