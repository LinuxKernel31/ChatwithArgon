import React from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  KeyboardAvoidingView
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";
import { Select, Icon, Input, Header, Switch } from "../components/";
import firebase from "../firebase"
const { height, width } = Dimensions.get("screen");

import argonTheme from "../constants/Theme";
import Images from "../constants/Images";



class DoctorOnboarding extends React.Component {

  constructor(props)
  {
    super(props);

    this.state = {
      username: '',
      password: '',
      userNames: [],
      passWords: [],
    };
  }

  async componentDidMount(){
    const users = [];
    const pass = [];
    await firebase.firestore().collection('Doctors').get()
        .then(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
                pass.push(doc.data().password);
                users.push(doc.id);
       
            });
            this.setState({passWords: pass,
                           userNames : users });
        });
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
          <Image source={Images.doctorLogo} style={styles.logo} />
        </Block>
        <Block flex space="between" style={styles.padded}>
            <Block flex space="around" style={{ zIndex: 2 }}>
              <Block style={styles.title}>
                <Block style={styles.subTitle}>
                  <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Input right placeholder="Username" iconContent={<Block />}
                    onChangeText={(uname) => this.setState({username:uname})} />
                  </Block>
                  <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Input right placeholder="Password" iconContent={<Block />} 
                    onChangeText={(pword) => this.setState({password:pword})}
                    secureTextEntry />
                  </Block>
                  
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

  auth_login = () =>
  {
    const { navigation } = this.props;
    if(this.state.password == '' || this.state.username == '')
    {
        alert("Incorrect username or password");
    }
    else if(this.state.passWords.indexOf(this.state.password) == this.state.userNames.indexOf(this.state.username) )
    {
        navigation.navigate('Home')
    }
   
    else{
      alert("Incorrect username or password");
    }
    
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
    width: 120,
    height: 120,
    zIndex: 2,
    position: 'relative',
    marginTop: '-50%'
  },
  title: {
    marginTop:'-5%'
  },
  subTitle: {
    marginTop: 20
  }
});

export default DoctorOnboarding;
