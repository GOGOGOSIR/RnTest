import React, {PureComponent} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {validateType} from '../../../../utils/validate/tools';

class curstomTabBar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.handlePressCallback = this.handlePressCallback.bind(this);
  }

  handlePressCallback() {
    const pressCallBack = this.props.pressCallBack;
    pressCallBack && validateType(pressCallBack, 'Function') && pressCallBack();
  }

  render() {
    const {style, tabs, activeTab} = this.props;

    return (
      <View style={[styles.tabWrapper, style]}>
        {tabs.map((tab, i) => {
          const isActive = activeTab === i;
          return (
            <TouchableOpacity
              key={tab}
              onPress={this.handlePressCallback}
              style={styles.tabItem}>
              <Text style={styles.statusStyle(isActive)}> {tab} </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabWrapper: {
    height: 45,
    flexDirection: 'row',
    paddingTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusStyle: (isActive) => {
    return {
      color: isActive ? '#3eaf7c' : '#666666',
      fontWeight: isActive ? '700' : 'normal',
    };
  },
});

export default curstomTabBar;
