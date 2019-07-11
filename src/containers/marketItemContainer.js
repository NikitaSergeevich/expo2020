import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    Platform,
    Animated,
    Image,
    Text
} from 'react-native';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view'
import Touchable from '../components/touchable'
import Quantity from '../components/quantity'
import Button from '../components/button';
import * as strings from '../strings';
import * as colors from '../colors.js';
import * as icons from '../icons.js';
import { Header, navBarHeight, statusBarHeight, MIN_HEIGHT } from '../utils/navigations'
import { createStyle, scale, SCREEN_HEIGHT } from '../utils/normalize';
import { connect } from 'react-redux';
//export const MIN_HEIGHT = 45
export const MAX_HEIGHT = 345
const CONTENT_MIN_HEIGHT = SCREEN_HEIGHT - statusBarHeight - navBarHeight - 94

class MarketContainer extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            scrollY: new Animated.Value(0),
            quantity: '1',
        };
    }

    state = {
        //https://www.arabianbusiness.com/sites/default/files/styles/full_img/public/images/2018/05/20/Expo-2020-Dubai.jpg
    };

    render() {
        const { navigation } = this.props
        return (
            <View style={styles.container}>
                <HeaderImageScrollView
                    automaticallyAdjustContentInsets={false}
                    onScroll={Animated.event([
                        {
                            nativeEvent: { contentOffset: { y: this.state.scrollY } },
                        },
                    ])}
                    maxOverlayOpacity={1}
                    overlayColor={colors.sandColor}
                    maxHeight={MAX_HEIGHT}
                    minHeight={MIN_HEIGHT}
                    contentContainerStyle={{ backgroundColor: colors.transparentColor }}
                    renderHeader={() => {
                        return (
                            <View style={{
                                height: MAX_HEIGHT,
                                width: '100%',
                                backgroundColor: colors.sandColor,
                            }}>
                                <Image style={{ width: '100%', height: '100%' }} source={{ uri: 'https://www.arabianbusiness.com/sites/default/files/styles/full_img/public/images/2018/05/20/Expo-2020-Dubai.jpg' }} />
                                <Image
                                    resizeMode={"cover"}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        width: "100%",
                                        height: "100%",
                                    }}
                                    source={icons.ticketGradientIcon} //header_product_gradient
                                />
                            </View>
                        )
                    }}
                    renderFixedForeground={() => {
                        return (
                            [
                                <Animated.View
                                    style={[{
                                        height: MAX_HEIGHT,
                                        paddingHorizontal: 10,
                                        paddingBottom: 0,
                                        backgroundColor: 'transparent'
                                    }, {
                                        transform: [{
                                            translateY: this.state.scrollY.interpolate({
                                                inputRange: [0, MAX_HEIGHT - MIN_HEIGHT],
                                                outputRange: [MAX_HEIGHT - MIN_HEIGHT, Platform.OS == 'ios' ? statusBarHeight : scale(0, 'height')],
                                                extrapolate: 'clamp'
                                            })
                                        }, {
                                            translateX: this.state.scrollY.interpolate({
                                                inputRange: [0, MAX_HEIGHT - MIN_HEIGHT - 100, MAX_HEIGHT - MIN_HEIGHT],
                                                outputRange: [0, 0, Platform.OS == 'ios' ? scale(70, 'width') : scale(60, 'width')],
                                                extrapolate: 'clamp',
                                            }),
                                        }],
                                    }]}
                                    ref={(navTitleView) => {
                                        this.navTitleView = navTitleView;
                                    }}>
                                    <View style={{ backgroundColor: 'transparent', justifyContent: 'flex-end' }}/* style={{borderWidth: 1, borderColor: 'red'}} */>
                                        <View style={{
                                            justifyContent: 'flex-end',
                                            backgroundColor: 'transparent',
                                            height: navBarHeight,
                                        }}>
                                            <View style={{
                                                height: navBarHeight,
                                                justifyContent: 'center',
                                                backgroundColor: 'transparent'
                                            }}>
                                                <Animated.Text style={{
                                                    color: colors.whiteColor,
                                                    fontSize: 18,
                                                    fontWeight: '700',
                                                    backgroundColor: 'transparent',
                                                    marginBottom: 6,
                                                    width: this.state.scrollY.interpolate({
                                                        inputRange: [0, MAX_HEIGHT - MIN_HEIGHT - 100, MAX_HEIGHT - MIN_HEIGHT],
                                                        outputRange: [
                                                            Platform.OS == 'ios' ? scale(360, 'width') : scale(340, 'width'),
                                                            Platform.OS == 'ios' ? scale(360, 'width') : scale(340, 'width'),
                                                            Platform.OS == 'ios' ? scale(260, 'width') : scale(260, 'width')
                                                        ],
                                                        extrapolate: 'clamp'
                                                    })
                                                }}
                                                    numberOfLines={1}>
                                                    {"VIP BUISNESS TICKET TITLE"}
                                                </Animated.Text>
                                            </View>
                                        </View>
                                        <Animated.Text style={[{ color: '#fff', fontSize: 16, fontWeight: '600' }, {
                                            opacity: this.state.scrollY.interpolate({
                                                inputRange: [MAX_HEIGHT - MIN_HEIGHT - 100, MAX_HEIGHT - MIN_HEIGHT - 80],
                                                outputRange: [1, 0]
                                            })
                                        }]}>
                                            {"7000$"}
                                        </Animated.Text>
                                    </View>
                                </Animated.View>
                            ]
                            // <SafeAreaView style={{
                            //     height: MAX_HEIGHT,
                            //     width: '100%',
                            //     backgroundColor: colors.transparentColor,
                            // }}>
                            // </SafeAreaView>
                        )
                    }}>
                    <View style={{ flex: 1, backgroundColor: colors.whiteColor }}>
                        <TriggeringView
                            automaticallyAdjustContentInsets={false}
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: colors.transparentColor,
                                flex: 1
                            }}>
                            <View style={{
                                height: CONTENT_MIN_HEIGHT,
                                width: '100%',
                                backgroundColor: 'transparent'
                            }}>

                                <View style={styles.sectionHeader}>
                                    <Text style={{ fontSize: 20, color: Platform.OS == 'ios' ? colors.whiteColor : 'white' }}>
                                        {"Description:"}
                                    </Text>
                                </View>
                                <View style={{ backgroundColor: colors.sandColor, width: '100%', padding: 10 }}>
                                    <Text style={{ color: colors.blackColor, fontSize: 18, fontWeight: '500' }}>
                                        {"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
                                    </Text>
                                </View>

                                <View style={styles.sectionHeader}>
                                    <Text style={{ fontSize: 20, color: Platform.OS == 'ios' ? colors.whiteColor : 'white' }}>
                                        {"Number of persons:"}
                                    </Text>
                                </View>
                                <View style={{
                                    paddingVertical: 15,
                                    paddingHorizontal: 10,
                                }}>
                                    <Quantity
                                        value={this.state.quantity}
                                        onChange={(quantity) => {
                                            this.setState({ quantity })
                                        }}
                                    />
                                </View>
                                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                                    <Button
                                        text={strings.bookTicket}
                                        buttonStyle={styles.bookButton}
                                        buttonTextStyle={styles.bookText}
                                        onPress={this.onRegistrationPress} />
                                </View>
                            </View>
                        </TriggeringView>
                    </View>
                </HeaderImageScrollView>
                <Header
                    customRootContainer={{ borderBottomWidth: 0 }}
                    leftIcons={
                        Platform.OS != 'ios' ? [{
                            icon:
                                <Image
                                    tintColor={colors.semiTransparentBlackColor}
                                    resizeMode={'contain'}
                                    source={icons.backAndroidIcon} />,
                            handler: () => { navigation.pop() }
                        }] : [{
                            icon:
                                <View style={styles.backButtonContainer}>
                                    <Image resizeMode={'contain'}
                                        style={styles.backButtonIconStyle}
                                        source={icons.backWhiteIosIcon} />
                                    <Text style={styles.iosLeftHeaderText}>
                                        {"Back"}
                                    </Text>
                                </View>,
                            handler: () => { navigation.pop() }
                        }]
                    }
                    rightIcons={[]} />
            </View>
        )
    }
}

export default connect(
    state => ({}),
    null
)(MarketContainer);

const styles = createStyle({
    container: {
        flex: 1,
        backgroundColor: colors.sandColor
    },
    sectionHeader: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        backgroundColor: colors.semiTransparentSandColor
    },

    bookButton: {
        height: 50,
        width: 341,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
        backgroundColor: colors.blackSandColor,
        borderWidth: 1,
        borderColor: colors.blackSandColor
    },
    bookText: {
        color: colors.whiteColor,
        fontSize: 18,
        fontWeight: '700'
    },


    backButtonContainer: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iosLeftHeaderText: {
        color: colors.blackColor,
        marginLeft: 5,
    },
    backButtonIconStyle: {
        tintColor: colors.blackColor
    }
});