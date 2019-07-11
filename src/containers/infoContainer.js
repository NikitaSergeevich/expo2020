import React, { Component } from 'react';
import { FlatList, View, StyleSheet, ActivityIndicator } from 'react-native';
import * as strings from '../strings';
import * as colors from '../colors.js';
//import { Filter, Burger, FloatingButton } from '../components';
//import { setUserReaction, getNews } from '../redux-state/news/actions';
import { connect } from 'react-redux';
//import Tabs from '../components/Tabs';

class InfoContainer extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            //title: strings.newsTitle,
            // headerLeft: <Burger onPress={navigation.toggleDrawer} />,
            // headerRight: (
            //     <Filter
            //         onPress={() => {
            //             navigation.navigate(NEWS_FILTER);
            //         }}
            //     />
            // )
        };
    };

    constructor(props) {
        super(props);
        // this.renderNewsItemСomponent = this.renderNewsItemСomponent.bind(this);
        // this.onUpdateContent = this.onUpdateContent.bind(this);
        // this.renderFooter = this.renderFooter.bind(this);
    }

    state = {
        userCurrentRegion: {
            latitude: 55.79355059320785,
            longitude: 37.53029314801097
        },
        updateCounter: 1,
        myOnly: false
    };

    render() {
        return (
            <View style={styles.container}>
            </View>
        )
    }
}

export default connect(
    state => ({}),
    null
)(InfoContainer);

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flex: 1
    },
});