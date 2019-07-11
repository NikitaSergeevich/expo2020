import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { IS_IOS, createStyle } from '../../utils/normalize';
import * as colors from '../../colors';

const BACK_ICON = IS_IOS ? require('../../assets/header/back_ios.png') : require('../../assets/header/back.png')

const BackButton = ({ onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.container}>
        <Image source={BACK_ICON} style={styles.image} />
    </TouchableOpacity>
);

const styles = createStyle({
    container: {
        width: 35,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 2
    },
    image: {
        tintColor: colors.blackSandColor
    }
});

export default BackButton;
