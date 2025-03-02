import React from "react";
import { Easing, Animated } from "react-native";
import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer
} from "react-navigation";

import { Block } from "galio-framework";

// screens
import Home from "../screens/Home";
import Onboarding from "../screens/Onboarding";
import Pro from "../screens/Pro";
import Profile from "../screens/Profile";
import Register from "../screens/Register";
import Elements from "../screens/Elements";
import Articles from "../screens/Articles";
import Appointments from "../screens/Appointments";
import Chat from "../screens/Chat";
import Doctors from "../screens/Doctors"
import DoctorOnboarding from "../screens/DoctorOnboarding"
import Registration from "../screens/Registration"
import PatientOnBoarding from "../screens/PatientOnBoarding"
import DoctorRegistration from "../screens/DoctorRegistration"
import DoctorHome from "../screens/DoctorHome"
import DoctorAppointments from "../screens/DoctorAppointments"
import ViewAppointments from "../screens/ViewAppointments"

// drawer

import Menu from "./Menu";
import DrawerItem from "../components/DrawerItem";

// header for screens
import Header from "../components/Header";

const transitionConfig = (transitionProps, prevTransitionProps) => ({
  transitionSpec: {
    duration: 400,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing
  },
  screenInterpolator: sceneProps => {
    const { layout, position, scene } = sceneProps;
    const thisSceneIndex = scene.index;
    const width = layout.initWidth;

    const scale = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [4, 1, 1]
    });
    const opacity = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [0, 1, 1]
    });
    const translateX = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex],
      outputRange: [width, 0]
    });

    const scaleWithOpacity = { opacity };
    const screenName = "Search";

    if (
      screenName === transitionProps.scene.route.routeName ||
      (prevTransitionProps &&
        screenName === prevTransitionProps.scene.route.routeName)
    ) {
      return scaleWithOpacity;
    }
    return { transform: [{ translateX }] };
  }
});


const ChatStack = createStackNavigator({
  Elements: {
    screen: Elements,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Elements" navigation={navigation} />
    })
  }
},{
  cardStyle: {
    backgroundColor: "#F8F9FE"
  },
  transitionConfig
});

const ElementsStack = createStackNavigator({
  Elements: {
    screen: Elements,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Elements" navigation={navigation} />
    })
  }
},{
  cardStyle: {
    backgroundColor: "#F8F9FE"
  },
  transitionConfig
});

const ArticlesStack = createStackNavigator({
  Articles: {
    screen: Articles,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Articles" navigation={navigation} />
    })
  }
},{
  cardStyle: {
    backgroundColor: "#F8F9FE"
  },
  transitionConfig
});

const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: ({ navigation }) => ({
        header: (
          <Header white transparent title="Profile" iconColor={'#FFF'} navigation={navigation} />
        ),
        headerTransparent: true
      })
    }
  },
  {
    cardStyle: { backgroundColor: "#FFFFFF" },
    transitionConfig
  }
);

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        header: <Header search options title="Home" navigation={navigation} />
      })
    },
  },
  {
    cardStyle: {
      backgroundColor: "#F8F9FE"
    },
    transitionConfig
  }
);

const AppointmentsStack = createStackNavigator(
  {
    Appointments: {
      screen: Appointments,
      navigationOptions: {
        drawerLabel: () => {}
      }
    },
  }
);

const AppStack = createDrawerNavigator(
  {
  
    PatientOnBoarding: {
      screen: PatientOnBoarding,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen= "PatientOnBoarding" title="PatientOnBoarding" />
        )
      })
    },
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        
        header: <Header search options title="Home" navigation={navigation}/>,
        drawerLabel: ({ focused }) => (
                <DrawerItem focused={focused} screen= "Home" title="Home" />
              )

      })
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Profile" title="Profile" />
        )
      })
    },
    Account: {
      screen: Register,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Register" title="Account" />
        )
      })
    },
    Elements: {
      screen: ElementsStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Elements" title="Elements" />
        )
      })
    },
    Chat:
    {
      screen: Chat,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Chat" title="Chat" />
        )
      })
    },
    DoctorOnboarding:
    {
      screen: DoctorOnboarding,
      navigationOptions: {
        drawerLabel: () => {}
      }
    },
    DoctorAppointments:
    {
      screen: DoctorAppointments,
      navigationOptions: {
        drawerLabel: () => {}
      }
    },
    DoctorHome:
    {
      screen: DoctorHome,
      navigationOptions: {
        drawerLabel: () => {}
      }
    },
    ViewAppointments:
    {
      screen: ViewAppointments,
      navigationOptions: {
        drawerLabel: () => {}
      }
    },
   
    
    Doctors:
    {
      screen: Doctors,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Doctors" title="Doctors" />
        )
      })
    },
    Registration:
    {
      screen: Registration,
      navigationOptions: {
        drawerLabel: () => {}
      }
    },
    Appointments:{
      screen: Appointments,
      navigationOptions: ({ navigation }) => ({
        
        header: <Header search options title="Appointments" navigation={navigation}/>,

      })
    },
    DoctorRegistration:{
      screen: DoctorRegistration,
      navigationOptions: ({ navigation }) => ({
        header: <Header search options title="DoctorRegistration" navigation={navigation}/>,

      })
    }
  },
  Menu
);

const AppContainer = createAppContainer(AppStack);
export default AppContainer;
