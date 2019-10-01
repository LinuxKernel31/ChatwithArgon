import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Text, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { Block, theme, Button } from 'galio-framework';
import { Card, Input } from '../components';
import articles from '../constants/articles';
import Images from "../constants/Images";
import argonTheme from "../constants/Theme";
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import firebase from "../firebase";

const { height, width } = Dimensions.get("screen");

 
class Registration extends React.Component {
    
    states = {
        image: null,
      };
    
    constructor(props)
    {
        super(props);
        this.state = {first_name: '',
                      last_name :'',
                      age : '',
                      contact_number : '',
                      emails: '',
                      passwords: '' };
    }
    async componentDidMount() {
        this.getPermissionAsync();
     
      }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      }
    
      _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
        });

    
        console.log(result);
    
        if (!result.cancelled) {
          this.setState({ image: result.uri });
        }
      };

      _toFireStore = () =>
      {
        const setToFireStore = firebase.firestore().collection('User').doc(this.state.emails);
        if(this.state.image != null)
        {
        setToFireStore.set({
            first_name : this.state.first_name,
            last_name: this.state.last_name,
            age: this.state.age,
            contact_number: this.state.contact_number,
            emails: this.state.emails,
            password: this.state.passwords,
            image: this.states.image
          }).then((docRef) => {
            alert("Registration Successful")
            this.props.navigation.navigate('Onboarding');
            })
            .catch((error) => {
                alert("Registration failed, please try again", error);
            
              });
        }
        else{
            alert("Image is null, please upload some image.")
        }
            
            
      }




  render() {
    let { image } = this.state;
    return (
      <Block flex  style={styles.home}>
          <Block flex center>
        <ImageBackground
            source={Images.Onboarding}
            style={{ height, width, zIndex: 1 }}
          />
        </Block>
        <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ width, marginTop: '25%' }}
            >
        <Block flex style={styles.profileCard}>
       
        <Block middle style={styles.avatarContainer}>
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
           <Button
         color="success"
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        ><Text>OPEN GALLERY</Text></Button>
                </Block>
        
      </Block>
        
        <Block flex space="between" style={styles.padded}>
            <Block flex space="around" style={{ zIndex: 2 }}>
              <Block style={styles.title}>
                <Block style={styles.subTitle}>
                  <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Input right placeholder="First Name" iconContent={<Block />}
                    onChangeText={(firstname) => this.setState({first_name : firstname})} />
                  </Block>
                  <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Input right placeholder="Last Name" iconContent={<Block />} 
                    onChangeText={(lastname) => this.setState({last_name:lastname})}
                     />
                  </Block>
                  <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Input right placeholder="Age" iconContent={<Block />} 
                    onChangeText={(ages) => this.setState({age:ages})}
                     />
                  </Block>
                  <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Input right placeholder="Contact Number" iconContent={<Block />} 
                    onChangeText={(contact) => this.setState({contact_number:contact})}
                     />
                  </Block>
                  <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Input right placeholder="Email" iconContent={<Block />} 
                    onChangeText={(email) => this.setState({emails:email})}
                     />
                     </Block>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Input right placeholder="Password" iconContent={<Block />} 
                 onChangeText={(password) => this.setState({passwords:password})}
                 secureTextEntry />
                  </Block>
                  
                  
                </Block>
               
              </Block>
              <Block center>
                
                <Button
                  style={styles.button}
                  color={argonTheme.COLORS.SECONDARY}
                  onPress={this._toFireStore}
                  textStyle={{ color: argonTheme.COLORS.BLACK }}
                >
                  Register
                </Button>
              </Block>
          </Block>
        </Block>
        </ScrollView>
      </Block>
    );
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
  
});

export default Registration;
