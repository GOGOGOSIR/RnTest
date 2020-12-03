import React, {PureComponent} from 'react';
import {Text, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import commonStyles from '../../styles/commonStyles';
export default class laboratoryPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    console.log();
  }
  render() {
    return (
      <SafeAreaView style={commonStyles.fullScreen}>
        <ScrollView style={commonStyles.container}>
          <Text> laboratoryPage </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
