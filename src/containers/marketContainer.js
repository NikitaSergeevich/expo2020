import React, { Component } from 'react';
import {
    FlatList,
    View,
    StyleSheet,
    ActivityIndicator,
    SafeAreaView,
    Animated,
    Image,
    Text
} from 'react-native';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view'
import Touchable from '../components/touchable'
import TicketCarousel from '../components/ticketCarousel/ticketCarousel'
import * as strings from '../strings';
import * as colors from '../colors.js';
import { createStyle, scale } from '../utils/normalize';
//import { Filter, Burger, FloatingButton } from '../components';
//import { setUserReaction, getNews } from '../redux-state/news/actions';
import { connect } from 'react-redux';
import { CAROUSELHEIGHT } from '../components/ticketCarousel/constants';
//import Tabs from '../components/Tabs';
export const MIN_HEIGHT = 100
export const MAX_HEIGHT = 195
const CONTENT_MIN_HEIGHT = 600

class MarketContainer extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            // title: strings.newsTitle,
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
        //this.renderNewsItemСomponent = this.renderNewsItemСomponent.bind(this);
        //this.onUpdateContent = this.onUpdateContent.bind(this);
        //this.renderFooter = this.renderFooter.bind(this);
    }

    state = {
        userCurrentRegion: {
            latitude: 55.79355059320785,
            longitude: 37.53029314801097
        },
        updateCounter: 1,
        myOnly: false,
        scrollY: new Animated.Value(0),
    };

    render() {
        return (
            <View style={styles.container}>
                <HeaderImageScrollView
                    automaticallyAdjustContentInsets={false}
                    onScroll={Animated.event([
                        {
                            nativeEvent: { contentOffset: { y: this.state.scrollY } },
                        },
                    ])}
                    maxOverlayOpacity={0.5}
                    maxHeight={MAX_HEIGHT}
                    minHeight={MIN_HEIGHT}
                    contentContainerStyle={{ backgroundColor: colors.transparentColor, marginTop: -10, height: 800 }}
                    renderHeader={() => {
                        return (
                            <SafeAreaView style={{
                                height: MAX_HEIGHT,
                                width: '100%',
                                backgroundColor: colors.sandColor,
                            }}>
                                <View style={{
                                    height: MAX_HEIGHT,
                                    width: '100%',
                                    paddingHorizontal: 10,
                                    justifyContent: 'flex-start'
                                }}>
                                    <Animated.Image
                                        style={[
                                            {
                                                backgroundColor: colors.transparentColor,
                                            },
                                            {
                                                transform: [{
                                                    scaleX: this.state.scrollY.interpolate({
                                                        inputRange: [0, MAX_HEIGHT - MIN_HEIGHT],
                                                        outputRange: [1, 0.55],
                                                        extrapolate: 'clamp'
                                                    })
                                                }, {
                                                    scaleY: this.state.scrollY.interpolate({
                                                        inputRange: [0, MAX_HEIGHT - MIN_HEIGHT],
                                                        outputRange: [1, 0.55],
                                                        extrapolate: 'clamp'
                                                    })
                                                }, {
                                                    translateY: this.state.scrollY.interpolate({
                                                        inputRange: [0, MAX_HEIGHT - MIN_HEIGHT],
                                                        outputRange: [0, -30],
                                                        extrapolate: 'clamp'
                                                    })
                                                }, {
                                                    translateX: this.state.scrollY.interpolate({
                                                        inputRange: [0, MAX_HEIGHT - MIN_HEIGHT],
                                                        outputRange: [0, -60],
                                                        extrapolate: 'clamp'
                                                    })
                                                }
                                                ]
                                            }
                                        ]}
                                        source={require('../assets/logoBig.png')} />
                                </View>
                            </SafeAreaView>
                        )
                    }}
                    renderFixedForeground={() => {
                        return (
                            <SafeAreaView style={{
                                height: MAX_HEIGHT,
                                width: '100%',
                                backgroundColor: colors.transparentColor,
                            }}>
                                <View style={{
                                    height: MAX_HEIGHT,
                                    width: '100%',
                                    paddingHorizontal: 10,
                                    justifyContent: 'flex-start'
                                }}>
                                    <Touchable style={styles.languageButton} onPress={() => { }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.languageButtonText}>{"En"}</Text>
                                        </View>
                                    </Touchable>
                                </View>
                            </SafeAreaView>
                        )
                    }}
                >
                    <View style={{ flex: 1 }}>
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
                            }}>
                                <View style={{ backgroundColor: colors.whiteColor, ...StyleSheet.absoluteFillObject, top: 55 }} />
                                <View style={{ backgroundColor: colors.transparentColor, ...StyleSheet.absoluteFillObject }}>
                                    <TicketCarousel data={[
                                        {
                                            title: 'First Package',
                                            description: 'Lorem ipsum astana asddas good film la-la lenda asd',
                                            image: 'https://www.arabianbusiness.com/sites/default/files/styles/full_img/public/images/2018/05/20/Expo-2020-Dubai.jpg',
                                            cost: 199.99,
                                        },
                                        {
                                            title: 'First Package',
                                            image: 'https://www.arabianbusiness.com/sites/default/files/styles/full_img/public/images/2018/05/20/Expo-2020-Dubai.jpg',
                                            description: 'Lorem ipsum astana asddas good film la-la lenda asd',
                                            cost: 199.99,
                                        },
                                        {
                                            title: 'First Package',
                                            image: 'https://www.arabianbusiness.com/sites/default/files/styles/full_img/public/images/2018/05/20/Expo-2020-Dubai.jpg',
                                            description: 'Text',
                                            cost: 199.99,
                                        },
                                        {
                                            title: 'First Package',
                                            image: 'https://www.arabianbusiness.com/sites/default/files/styles/full_img/public/images/2018/05/20/Expo-2020-Dubai.jpg',
                                            description: 'Text',
                                            cost: 199.99,
                                        },
                                        {
                                            title: 'First Package',
                                            image: 'https://www.arabianbusiness.com/sites/default/files/styles/full_img/public/images/2018/05/20/Expo-2020-Dubai.jpg',
                                            description: 'Text',
                                            cost: 199.99,
                                        },
                                        {
                                            title: 'First Package',
                                            image: 'https://www.arabianbusiness.com/sites/default/files/styles/full_img/public/images/2018/05/20/Expo-2020-Dubai.jpg',
                                            description: 'Text',
                                            cost: 199.99,
                                        },
                                    ]} navigation={this.props.navigation} />
                                </View>
                            </View>
                            <View style={{ ...StyleSheet.absoluteFillObject, top: MIN_HEIGHT + CAROUSELHEIGHT + 20, height: 900, padding: 12 }}>
                                <Text style={styles.aboutTitle}>
                                    {"About EXPO 2020"}
                                </Text>
                                <Text style={styles.aboutText}>
                                    {"Directly accessible from the Dubai Metro Route 2020 link, the Dubai Exhibition Centre combines a 17,000sqm conference complex, featuring multipurpose halls, an auditorium and other event spaces, with 28,000sqm of exhibition halls. "}
                                </Text>
                                <Text style={styles.aboutText}>
                                    {"Directly accessible from the Dubai Metro Route 2020 link, the Dubai Exhibition Centre combines a 17,000sqm conference complex, featuring multipurpose halls, an auditorium and other event spaces, with 28,000sqm of exhibition halls. "}
                                </Text>

                                <Text style={styles.aboutText}>
                                    {"Directly accessible from the Dubai Metro Route 2020 link, the Dubai Exhibition Centre combines a 17,000sqm conference complex, featuring multipurpose halls, an auditorium and other event spaces, with 28,000sqm of exhibition halls. "}
                                </Text>
                            </View>
                        </TriggeringView>
                    </View>
                </HeaderImageScrollView>
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
    languageButton: {
        position: 'absolute',
        top: 2,
        right: 14,
        width: 30,
        height: 30,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center'
    },
    languageButtonText: {
        fontWeight: "700"
    },
    aboutTitle: {
        color: 'black',
        fontSize: 24,
        fontWeight: '800'
    },
    aboutText: {
        marginTop: 10,
        color: colors.semiTransparentBlackColor
    }
});