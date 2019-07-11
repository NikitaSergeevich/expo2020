import React, { Component } from 'react';
import { StyleSheet, Animated, Image, TouchableOpacity } from 'react-native';
import { IS_IOS, scale } from '../utils/normalize';
import { tabBarLabelFontSize } from '../constants';
import { CHAT, ADD, tabBarRoutes } from '../navigators/routeNames';
import * as strings from '../strings';
import * as colors from '../colors';
import { connect } from 'react-redux';
//import { setWalkStatus } from '../redux-state/walk/actions';

class BottomBarButton extends Component {

    jumpTo = () => {
        const { name, jumpTo } = this.props;
        jumpTo(name);
    };

    render() {
        const { index } = this.props.navigation.state;
        const { name, icon } = this.props;

        return (
            <TouchableOpacity onPress={this.jumpTo} activeOpacity={1} style={styles.tab}>
                <Image
                    style={{
                        tintColor: tabBarRoutes[index] === name ? colors.blackColor : colors.sandColor
                    }}
                    source={icon} />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 60
    },
    label: {
        textAlign: 'center',
        backgroundColor: 'transparent',
        marginTop: 4
    },
    labelBeside: {
        fontSize: IS_IOS ? scale(tabBarLabelFontSize, 'width') : tabBarLabelFontSize
    },
    unreadsContainer: {
        position: 'absolute',
        top: -5,
        right: 18,
        backgroundColor: colors.sandColor,
        width: 15,
        height: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7
    },
    unreadsText: { color: colors.whiteColor, textAlign: 'center' }
});

export default connect(
    state => ({}),
    null
)(BottomBarButton);
