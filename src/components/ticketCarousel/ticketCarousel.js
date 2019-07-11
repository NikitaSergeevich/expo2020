import React, { Component, PureComponent } from 'react'
import {
    Text,
    View,
    Platform,
} from 'react-native';
import Carousel from 'react-native-snap-carousel'
import { createStyle, scale, TARGET_WIDTH } from '../../utils/normalize';
import {CAROUSELHEIGHT, CAROUSELITEMWIDTH, OFFSETLEFT} from './constants';
import * as colors from '../../colors.js';

import TicketItem from "./ticketItem"

class TicketCarousel extends Component {

    constructor(props) {
        super(props)

        this.state = {
            mounted: true
        }
    }

    static get defaultProps() {
        return {
            data: [],
            hideBar: true
        }
    }

    render() {
        let content = null
        if (this.props.data.length == 0) {
            content = (
                <Text>{""}</Text>
            )
        } else {
            content = (
                <Carousel
                    inactiveSlideScale={1}
                    containerCustomStyle={styles.carousel}
                    contentContainerCustomStyle={styles.contentContainerCustom}
                    vertical={false}
                    data={this.props.data}
                    firstItem={0}
                    layoutCardOffset={0}
                    renderItem={(o) => {
                        return (
                            <View style={styles.carouselItemContainer}>
                                <TicketItem
                                    navigation={this.props.navigation}
                                    hideBar={this.props.hideBar}
                                    item={o.item}
                                    componentId={this.props.componentId} />
                            </View>
                        )
                    }}
                    itemWidth={scale(CAROUSELITEMWIDTH + 10, 'width')}
                    sliderWidth={scale(TARGET_WIDTH - OFFSETLEFT, 'width')} />
            )
        }
        return (
            <View style={styles.carouselRootContainer}>
                {content}
            </View>
        )
    }
}

export default TicketCarousel

const styles = createStyle({
    carouselRootContainer: {
        height: CAROUSELHEIGHT,
        width: '100%',
        backgroundColor: 'transparent',
    },
    carousel: {
        width: '100%',
        backgroundColor: 'transparent',
        overflow: 'hidden',
        marginLeft: OFFSETLEFT 
    },
    contentContainerCustom: {
        alignItems: 'center',
        backgroundColor: 'transparent',
        overflow: 'hidden',
        alignItems: 'flex-start',
    },
    carouselItemContainer: {
        height: CAROUSELHEIGHT,
        width: CAROUSELITEMWIDTH,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: colors.sandColor,

        borderRadius: 14,
        borderWidth: 1,
        overflow: 'hidden',
        borderColor: '#FFFFFF00'
    }
});
