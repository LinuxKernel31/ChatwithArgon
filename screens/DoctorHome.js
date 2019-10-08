import React from 'react';
import { StyleSheet, Dimensions, ScrollView, TouchableOpacity, ImageBackground,  Platform, Image } from 'react-native';
import { Block, Button, Text, theme } from "galio-framework";
import { Images, argonTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";
import {  Icon } from "../components/";
import firebase from "../firebase";
import "firebase/storage";

const thumbMeasure = (width - 48 - 32) / 3;
const { width, height } = Dimensions.get("screen");

class DoctorHome extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      ImageUri : null
    }

    storageRef = firebase.storage().ref();

  }

  customSetState = (state) => {
    this.setState(state);
  }

  renderImage = (url) =>{
    console.log('retrieving image from: ' + url)
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function(event) {
      var blob = xhr.response;
    };
    xhr.open('GET', url);
    xhr.send();
    this.setState({ImageUri: url})
  }

  retrieveImage = async() => {
    console.log('called image retriever function');
    storageRef = firebase.storage().ref();

    storageRef.child('Profile/' + this.props.navigation.state.params.image).getDownloadURL().then((url) => {
      this.renderImage(url)
    }).catch(function(error) {
      // Handle any errors
      console.log(error);
    });
  }




  render() {
    if(this.state.ImageUri == null){ // if image is not retrieved, retrieve it
      this.retrieveImage();
    }else{
      console.log('successfully retrieved image');
    }

    const {navigation} = this.props;

    let gmail = this.props.navigation.state.params.email;
    return (
      <ScrollView>
        <Block flex style={styles.profile}>
          <Block flex>
            <ImageBackground
              source={Images.ProfileBackground}
              style={styles.profileContainer}
              imageStyle={styles.profileBackground}
            >
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ width, marginTop: '25%' }}
              >
                <Block flex style={styles.profileCard}>
                  <Block middle style={styles.avatarContainer}>
                    
                    <Image
                      source={{uri : this.state.ImageUri }}
                      style={styles.avatar}
                    />
                  </Block>
                  <Block style={styles.info}>
                    <Block middle>
                      <Button
                        small
                        style={{ backgroundColor: argonTheme.COLORS.INFO }}
                        onPress={() => navigation.navigate('Chat') }
                      >
                        CHATBOT
                      </Button>
                      <Button
                        small
                        style={{ backgroundColor: argonTheme.COLORS.DEFAULT }}
                      >
                        MESSAGE
                      </Button>
                    </Block>
                    <Block row space="between">
                      <Block middle>
                        <Text
                          bold
                          size={12}
                          color="#525F7F"
                          style={{ marginBottom: 4 }}
                        >
                          2K
                        </Text>
                        <Text size={12}>Appointments</Text>
                      </Block>
                      <Block middle>
                        <Text
                          bold
                          color="#525F7F"
                          size={12}
                          style={{ marginBottom: 4 }}
                        >
                          0
                        </Text>
                        <Text size={12}>Photos</Text>
                      </Block>
                    
                    </Block>
                  </Block>
                  <Block flex>
                    <Block middle style={styles.nameInfo}>
                      <Text bold size={28} color="#32325D">
                      {this.props.navigation.state.params.firstname} {this.props.navigation.state.params.lastname}, {this.props.navigation.state.params.age}
                      </Text>
                      <Text size={16} color="#32325D" style={{ marginTop: 10 }}>
                        {this.props.navigation.state.params.address}
                      </Text>
                    </Block>
                    <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                      <Block style={styles.divider} />
                    </Block>
                    <Block middle>
                      <Text
                        size={16}
                        color="#525F7F"
                        style={{ textAlign: "center" }}
                      >
                        An artist of considerable range, Jessica name taken by
                        Melbourne …
                      </Text>
                      <Button
                        color="transparent"
                        textStyle={{
                          color: "#233DD2",
                          fontWeight: "500",
                          fontSize: 16
                        }}
                      >
                        Show more
                      </Button>

                    </Block>
                    <Block flex style={styles.group}>
                    <Text bold size={16} style={styles.title}>
                      View Your Appointments
                    </Text>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        
                      <Block style={styles.rows}>
                        <TouchableOpacity onPress={() => navigation.navigate("DoctorAppointments", {email : this.props.navigation.state.params.email})}>
                          <Block row middle space="between" style={{ paddingTop: 7 }}>
                            <Text size={14}>View your appointments here</Text>
                            <Icon
                              name="chevron-right"
                              family="entypo"
                              style={{ paddingRight: 5 }}
                            />
                          </Block>
                        </TouchableOpacity>
                      </Block>
                    </Block>
                  </Block>
                  </Block>
                </Block>
              </ScrollView>
            </ImageBackground>
          </Block>
          </Block>
          </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,    
  },
  profile: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    // marginBottom: -HeaderHeight * 2,
    flex: 1
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  profileBackground: {
    width: width,
    height: height / 2
  },
  profileCard: {
    // position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 65,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2
  },
  info: {
    paddingHorizontal: 40
  },
  avatarContainer: {
    position: "relative",
    marginTop: -80
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 0
  },
  nameInfo: {
    marginTop: 35
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF"
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure
  }
});

export default DoctorHome;
