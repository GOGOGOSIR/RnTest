import React, {PureComponent} from 'react';
import {View, Text} from 'react-native';
import CustomSafeAreaView from '../../../components/CustomSafeAreaView/CustomSafeAreaView';
class IconPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text> IconPage </Text>
      </View>
    );
  }
}

export default CustomSafeAreaView(
  {},
  {
    barStyle: 'light-content',
    backgroundColor: 'rgba(0,0,0,0.5)',
    translucent: true,
  },
)(IconPage);
