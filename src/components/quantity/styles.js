import {StyleSheet, Dimensions} from "react-native";

export const btnSpace = (Dimensions.get('window').width - 32 - 6 * 44) / 6;
import * as colors from '../../colors.js';

export default styles = StyleSheet.create({
  header: {
    width: '100%',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    // flex: 1,
    width: (44 + btnSpace) * 4,

    height: 46,
    fontSize: 24,
    lineHeight: 26
  },

  btn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F6F6F6",
    flex: -1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  btnActive: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.blackSandColor,
    flex: -1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  activeText: {
    color: "#fff"
  },

  addBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#DF2828",
    justifyContent: 'center',
    alignItems: 'center',
  },

  hiddenBtn: {
    width: 44,
    height: 44,
    flex: -1
  },

  doneBtn: {
    position: 'absolute',
    backgroundColor: 'transparent',
    right: 0
  }
});