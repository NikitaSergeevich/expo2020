import React, { Component } from 'react'

import {
    Text,
    View,
    Image,
} from 'react-native'

import Touchable from '../touchable'
import { createStyle, scale } from '../../utils/normalize';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { CAROUSELITEMWIDTH, CAROUSELHEIGHT } from './constants';
import * as colors from '../../colors.js';
import * as icons from '../../icons.js';
import * as routeNames from '../../navigators/routeNames';

class TicketItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            index: 0,
            stack: [0],
            routes: [
                { key: 'MainTab', },
                { key: 'MenuRoute', },
                { key: 'RestaurantRoute' },
                { key: 'MoreRoute' },
                { key: 'BasketRoute' },
            ],
        }
    }

    static get defaultProps() {
        return {
            item: {
                id: 1,
                image: icons.ticketImage,
                cost: "100",
                title: "Title",
                description: "Лучшее на свете блюдо!",
            },
            onBackPressed: () => { },
            hideBar: true
        }
    }

    goToMarketItem = () => {
        this.props.navigation.navigate(routeNames.MARKET_ITEM);
    }

    render() {
        const { image, title, description, cost } = this.props.item
        return (
            <Touchable onPress={this.goToMarketItem}>
                <View style={[styles.itemContainer, this.props.customItemContainer]}>
                    <Image source={{ uri: image }} style={styles.itemImage} />
                    <View style={styles.itemInfoContainer}>
                        <Text style={styles.itemTitle}>{title}</Text>
                        <Text style={styles.itemDescription}>{description}</Text>
                        <View style={styles.itemBottomInfoContainer}>
                            <Text style={styles.itemCost}>{'$ ' + cost}</Text>
                            <Touchable onPress={() => { }}>
                                <Text style={styles.itemMoreInfo}>{"More Info"}</Text>
                            </Touchable>
                        </View>
                    </View>
                </View>
            </Touchable>
        )
    }
}

function mapStateToProps(store) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, null), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketItem)

const styles = createStyle({
    itemContainer: {
        height: CAROUSELHEIGHT, //66
        width: 260,
        marginRight: 0,
        backgroundColor: colors.sandColor,
        borderRadius: 14,
        borderWidth: 1,
        overflow: 'hidden',
        borderColor: '#FFFFFF00'
    },


    itemImage: {
        height: 180,
        width: '100%',
        backgroundColor: 'black'
    },
    itemInfoContainer: {
        height: CAROUSELHEIGHT - 180,
        padding: 14
    },
    itemBottomInfoContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 66,
        padding: 14
    },
    itemTitle: {
        fontSize: 20,
        fontWeight: '800'
    },
    itemCost: {
        color: colors.blackSandColor,
        fontSize: 22,
        fontWeight: '800'
    },
    itemDescription: {
        color: colors.semiTransparentSandColor,
        paddingTop: 7,
        width: '100%',
        fontSize: 16,
        fontWeight: "700",
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: 'transparent'
    },
    itemMoreInfo: {
        color: colors.semiTransparentSandColor
    }
})
