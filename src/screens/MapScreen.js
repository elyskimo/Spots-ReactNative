import React from 'react';
import {View, Text, StyleSheet, Animated, TouchableWithoutFeedback} from 'react-native';
import {AntDesign, Entypo} from "@expo/vector-icons";
import MapView, { Marker, Callout } from 'react-native-maps';
// import {createStackNavigator} from 'react-navigation-stack';
// import { render } from 'react-dom';

export default class MapScreen extends React.Component{
    static navigationOptions = {
        headerShown: false
    };

    state = {
        coordinates: [
            { name : '1', latitude: 44.837789 , longitude: -0.57918 },
            { name : '2', latitude: 44.858889, longitude: -0.59918 },
            { name : '3', latitude: 44.827789, longitude: -0.52918},
            { name : '4', latitude: 44.847789, longitude: -0.53918},
            { name : '5', latitude: 44.817789, longitude: -0.54918},
            { name : '6', latitude: 44.825789, longitude: -0.56918},
            { name : '7', latitude: 44.820789, longitude: -0.59918},
            { name : '8', latitude: 44.840789, longitude: -0.60999},
            { name : '9', latitude: 44.857789, longitude: -0.52918 },
            { name : '10', latitude: 44.867789, longitude: -0.54918},
        ]
    }

    animation = new Animated.Value(0);

    toggleMenu = () => {
        const toValue = this.open ? 0 : 1;

        Animated.spring(this.animation, {
            toValue,
            friction: 5
        }).start();

        this.open = !this.open
    };

    render(){
        const data = {
            transform:[
                { scale: this.animation },
                {
                    translateY: this.animation.interpolate({
                        inputRange: [0,1],
                        outputRange: [0, -80]
                    })
                }
            ]
        };

        const info = {
            transform:[
                { scale: this.animation },
                {
                    translateY: this.animation.interpolate({
                        inputRange: [0,1],
                        outputRange: [0, -140]
                    })
                }
            ]
        };

        const rotation = {
            transform: [
                {
                    rotate: this.animation.interpolate({
                        inputRange: [0,1],
                        outputRange: ["0deg","45deg"]
                    })
                }
            ]
        };

        const opacity = this.animation.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0,0,1]
        })

        return (
            <View style={[styles.container, this.props.style]}>
                <MapView style={styles.map}
                         region={{
                             latitude:44.837789,
                             longitude:-0.57918,
                             latitudeDelta:0.1,
                             longitudeDelta:0.1
                         }}
                >
                    {
                        this.state.coordinates.map(marker =>(
                            <Marker key= {marker.name} coordinate={{ latitude: marker.latitude, longitude: marker.longitude}}>
                            </Marker>
                        ))
                    }
                </MapView>

                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Info')}>
                    <Animated.View style={[styles.button,styles.secondary, info,opacity]}>
                        <Entypo name="info" size={20} color="#F02A4B"/>
                    </Animated.View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Data')}>
                    <Animated.View style={[styles.button,styles.secondary, data,opacity]}>
                        <Entypo name="line-graph" size={20} color="#F02A4B"/>
                    </Animated.View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={this.toggleMenu}>
                    <Animated.View style={[styles.button, styles.menu, rotation, opacity]}>
                        <AntDesign name="plus" size={24} color="#FFF"/>
                    </Animated.View>
                </TouchableWithoutFeedback>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map:{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    button: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        alignItems: "center",
        justifyContent: "center",
        shadowRadius: 10,
        shadowColor: "#F02A4B",
        shadowOpacity: 0.3,
        shadowOffset: {height: 10},
        bottom: 50
    },
    menu:{
        backgroundColor: '#F02A4B'
    },
    secondary:{
        width: 48,
        height: 48,
        borderRadius: 48 / 2,
        backgroundColor: "#FFF"
    }
});
