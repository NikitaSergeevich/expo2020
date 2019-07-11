import React, { Component } from 'react';
import {
    View,
    ImageBackground,
    Text
} from 'react-native';
import * as strings from '../../strings';
import * as colors from '../../colors.js';
import * as icons from '../../icons.js';

export default class Order extends Component {
    render() {
        return (
            <View style={{
                backgroundColor: colors.sandColor,
                width: 340,
                height: 200,
                borderRadius: 10,
                marginVertical: 10
            }}>
                <ImageBackground
                    resizeMode="cover"
                    style={{
                        flex: 1,
                        overflow: 'hidden',
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10,
                        backgroundColor: 'red',
                        padding: 10
                    }} source={icons.ticketImage}>
                    <Text style={{ fontSize: 18, fontWeight: '700' }}>{"VIP BUISNESS TICKET TITLE"}</Text>
                    <Text style={{ fontSize: 12, fontWeight: '700' }}>{"For 4 persons"}</Text>

                    <Text style={{ fontSize: 16, fontWeight: '700', position: 'absolute', bottom: 10, right: 10, color: 'white' }}>
                        {"Go to details"}
                    </Text>
                </ImageBackground>
                <View style={{
                    alignItems: 'center',
                    height: '18%',
                    flexDirection: 'row',
                    width: '100%',
                    paddingLeft: 10
                }}>
                    <Text style={{ fontSize: 16, fontWeight: '900' }}>{"Status: "}</Text>
                    <Text style={{ fontSize: 14, fontWeight: '400' }}>{"waiting for confirmation"}</Text>
                </View>
            </View>
        )
    }
}