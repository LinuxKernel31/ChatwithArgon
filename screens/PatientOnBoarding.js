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



class PatientOnBoarding extends React.Component {

  
  constructor(props)
  {
    super(props);
    this.state = {
      username: 'robertjohn',
      password: 'Pogi',
      userNames: [],
      passWords: [],
      firstNames: [],

    };
  }

                                            
  render() {

    return (
      
      <Block flex style={styles.container}>
        <Block flex center>
        <ImageBackground
            source={Images.Onboarding}
            style={{ height, width, zIndex: 1 }}
          />
        </Block>
        <Block center>
          <Image source={Images.LogoOnboarding} style={styles.logo} />
        </Block>
        <Block flex space="between" style={styles.padded}>
            <Block flex space="around" style={{ zIndex: 2 }}>
              <Block style={styles.title}>
                <Block style={styles.subTitle}>
                  <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Input right placeholder="Username" iconContent={<Block />}
                    onChangeText={(uname) => this.setState({username:uname})}  />
                  </Block>
                  <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Input right placeholder="Password" iconContent={<Block />} 
                    onChangeText={(pword) => this.setState({password:pword})} 
                    secureTextEntry />
                  </Block>
                  
                </Block>
                <Block center>
                <TouchableHighlight onPress={this.go_to_doctors}><Text style={styles.padtop}>Are you a Doctor? Login Here...</Text></TouchableHighlight>
                <TouchableHighlight onPress={this.go_to_register}><Text style={styles.padtop}>Register Here...</Text></TouchableHighlight>
                </Block>
              </Block>
              <Block center>
                
                <Button
                  style={styles.button}
                  color={argonTheme.COLORS.SECONDARY}
                  onPress={this.auth_login}
                  textStyle={{ color: argonTheme.COLORS.BLACK }}
                >
                  LOGIN
                </Button>
              </Block>
          </Block>
        </Block>
      </Block>
    );
  }

  auth_login = () => {
    const { navigation } = this.props;
    firebase.firestore().collection('User').doc(this.state.username).get()
        .then(doc => {
            if (!doc.exists) {
                alert("Incorrect password or username")
            } else {
                if(this.state.username == doc.data().emails && this.state.password == doc.data().password){
                    console.log('navigating to Home')
                    navigation.navigate('Home', {firstname: doc.data().first_name, image: doc.data().image, lastname: doc.data().last_name, age: doc.data().age, address: doc.data().address, email: doc.data().emails});
                }
            }
        }).catch(err => {
            alert('Error getting document', err);
        });

  }
  go_to_doctors = () =>
  {
    const { navigation } = this.props;
    
    navigation.navigate('DoctorOnboarding');

  }
  go_to_register = () =>
  {
    const {navigation} = this.props;

    navigation.navigate('Registration')
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: "relative",
    bottom: theme.SIZES.BASE,
    zIndex: 2,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0
  },
  logo: {
    width: 200,
    height: 60,
    zIndex: 2,
    position: 'relative',
    marginTop: '-50%'
  },
  title: {
    marginTop:'-5%'
  },
  subTitle: {
    marginTop: 20
  },
  padtop: 
  {
    color: '#ffffff',
    fontSize: 14,
 

  }
});

export default PatientOnBoarding;
