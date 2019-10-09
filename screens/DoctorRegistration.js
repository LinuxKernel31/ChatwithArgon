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
import "firebase/storage";


const { height, width } = Dimensions.get("screen");

 
class DoctorRegistration extends React.Component {
    
    
    constructor(props)
    {
        super(props);
        this.state = {first_name: '',
                      last_name :'',
                      age : '',
                      contact_number : '',
                      emails: '',
                      passwords: '',
                      image: null,
                      imageurl: '',
                      specialization: '',
                      status: false,
                      time: '',
                      address: ''};
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

      uriToBlob = (uri) => {

        return new Promise((resolve, reject) => {
    
          const xhr = new XMLHttpRequest();
    
          xhr.onload = function() {
            // return the blob
            resolve(xhr.response);
          };
          
          xhr.onerror = function() {
            // something went wrong
            reject(new Error('uriToBlob failed'));
          };
    
          // this helps us get a blob
          xhr.responseType = 'blob';
    
          xhr.open('GET', uri, true);
          xhr.send(null);
    
        });
    
      }
      uploadImage = async (blob) => {
        
        return new Promise((resolve, reject)=>{

          var storageRef = firebase.storage().ref();
    
          storageRef.child("Profile/" + this.state.imageurl).put(blob, {
            contentType: 'image/jpeg'
          }).then((snapshot)=>{
    
            blob.close();
            
            resolve(snapshot);
    
          }).catch((error)=>{
    
            reject(error);
    
          });
    
        });
      };

      
    
      _pickImage = async () => {
        ImagePicker.launchCameraAsync({ 
          mediaTypes: "Images"
        }).then((result)=>{ 
    
          if (!result.cancelled) {
            // User picked an image

            var uniqueID = Math.floor(Math.random() * 100 ) + 1;
            this.setState({ imageurl: result.uri.split('/').pop() + uniqueID ,
            image: result.uri  });
            const {height, width, type, uri} = result;
            return this.uriToBlob(uri);
    
          }
    
        }).then((blob)=>{
    
          return this.uploadImage(blob);
    
        }).then((snapshot)=>{
    
          console.log("File uploaded");
       
        }).catch((error)=>{
    
          throw error;
    
        }); 
      };

      _toFireStore = () =>
      {
        this.uploadImage()
        this._addSpecialization()

        const setToFireStore = firebase.firestore().collection('Doctors').doc(this.state.emails);
        if(this.state.image != null)
        {
        setToFireStore.set({
            first_name : this.state.first_name,
            last_name: this.state.last_name,
            age: this.state.age,
            contact_number: this.state.contact_number,
            emails: this.state.emails,
            password: this.state.passwords,
            image: this.state.imageurl,
            specialization: this.state.specialization,
            status: this.state.status,
            address: this.state.address
          }).then((docRef) => {
            alert("Registration complete, please stay in touch while we review your registration");
            this.props.navigation.navigate('Onboarding');
            })
            .catch((error) => {
                alert("Registration failed, please try again", error);
            
              });
        }
        else{
            alert("Image is empty, please upload some image.")
        }
   
      }
      _addSpecialization = () => 
      {
       
  
          const setToFireStore = firebase.firestore().collection('Specialization').doc(this.state.specialization).collection('Doctor').doc(this.state.last_name);

          setToFireStore.set({
              Name: this.state.last_name,
              first_name : this.state.first_name,
              last_name: this.state.last_name,
              contact_number: this.state.contact_number,
              emails: this.state.emails,
              specialization: this.state.specialization,
              status: this.state.status,
              Time: this.state.time
            }).then((docRef) => {
              alert("Registration complete, please stay in touch while we review your registration");
              this.props.navigation.navigate('Onboarding');
              })
              .catch((error) => {
                  alert("Registration failed, please try again", error);
              
                });
          
         
     
        
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
                    <Input right placeholder="Address" iconContent={<Block />} 
                    onChangeText={(addressed) => this.setState({address:addressed})}
                     />
                  </Block>
                  <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Input right placeholder="Username" iconContent={<Block />} 
                    onChangeText={(email) => this.setState({emails:email})}
                     />
                     </Block>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Input right placeholder="Password" iconContent={<Block />} 
                 onChangeText={(password) => this.setState({passwords:password})}
                 secureTextEntry />
                  </Block>
                  <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Input right placeholder="Specialization" iconContent={<Block />} 
                 onChangeText={(specialized) => this.setState({specialization:specialized})}
                  />
                  </Block>
                  <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Input right placeholder="Time of Availability (6AM - 9PM)" iconContent={<Block />} 
                 onChangeText={(availability) => this.setState({time:availability})}
                  />
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

export default DoctorRegistration;
