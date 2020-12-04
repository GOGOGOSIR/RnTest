import React, {PureComponent} from 'react';
import {Text, ScrollView, SafeAreaView} from 'react-native';
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
      <SafeAreaView style={commonStyles.safeAreaView}>
        <ScrollView>
          <Text> laboratoryPage11 </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
