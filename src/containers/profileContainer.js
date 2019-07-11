import React, { Component } from 'react';
import {
    FlatList,
    View,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    SafeAreaView,
    Platform,
    Image,
    ImageBackground,
    Text
} from 'react-native';
import Order from '../components/order';
import * as strings from '../strings';
import * as colors from '../colors.js';
import * as icons from '../icons.js';
import { Header, navBarHeight, statusBarHeight } from '../utils/navigations'
import { createStyle } from '../utils/normalize';

//import { Filter, Burger, FloatingButton } from '../components';
//import { setUserReaction, getNews } from '../redux-state/news/actions';
import { connect } from 'react-redux';
//import Tabs from '../components/Tabs';

class ProfileContainer extends Component {

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
        super(props)
    }

    state = {
    };

    render() {
        const { navigation } = this.props
        return (
            <React.Fragment>
                <SafeAreaView style={styles.container}>
                    <View style={styles.profileSection}>
                        <View style={styles.profileSectionContainer}>
                            <Text style={styles.profileName}>{"Vladimir Putin"}</Text>
                        </View>
                        <View style={styles.profileSectionContainer}>
                            <Text style={styles.profileMail}>{"vputin@mail.ru"}</Text>
                        </View>
                        <View style={styles.profileSectionContainer}>
                            <Text style={styles.profilePhone}>{"+7 930 777 77 77 "}</Text>
                        </View>
                        <View style={styles.profileSectionContainer}>
                            <Text style={styles.profilePointsTitle}>
                                <Text style={styles.profilePointsTitle}>{"Current points amount: "}</Text>
                                <Text style={styles.profilePoints}>{"777"}</Text>
                            </Text>
                        </View>
                    </View>
                    <View style={styles.orderSection}>
                        <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 26 }}>{"Orders"}</Text>
                        <ScrollView >
                            <Order />
                            <Order />
                            <Order />
                        </ScrollView>
                    </View>
                </SafeAreaView>
                <Header
                    customRootContainer={styles.customRootHeaderContainer}
                    title={
                        <Text style={styles.headerTitle}>{"Orders & Profile"}</Text>
                    }
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
            </React.Fragment>
        )
    }
}

export default connect(
    state => ({}),
    null
)(ProfileContainer);

const styles = createStyle({
    container: {
        _umarginTop: navBarHeight + statusBarHeight,
        width: '100%',
        height: '100%',
    },

    profileSection: {
        paddingVertical: 16,
        paddingHorizontal: 14,
        width: '100%',
        backgroundColor: colors.whiteColor
    },
    profileSectionContainer: {
        borderBottomWidth: 1,
        width: 300,
        borderColor: colors.semiTransparentBlackColor
    },
    profileName: {
        marginVertical: 6,
        fontSize: 28,
        fontWeight: '500',
        color: colors.blackColor,
    },
    profileMail: {
        marginVertical: 10,
        fontSize: 22,
        fontWeight: '400',
        color: colors.blackColor
    },
    profilePhone: {
        marginVertical: 10,
        fontSize: 18,
        fontWeight: '400',
        color: colors.blackColor
    },
    profilePointsTitle: {
        marginVertical: 10,
        fontSize: 18,
        fontWeight: '400',
        color: colors.blackColor
    },
    profilePoints: {
        marginVertical: 10,
        fontSize: 18,
        fontWeight: '700',
        color: colors.blackColor
    },

    orderSection: {
        flex: 1,
        paddingVertical: 16,
        paddingHorizontal: 14,
        width: '100%',
        backgroundColor: colors.whiteColor,
        alignItems: 'center'
    },

    customRootHeaderContainer: {
        backgroundColor: colors.blackSandColor
    },
    headerTitle: {
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