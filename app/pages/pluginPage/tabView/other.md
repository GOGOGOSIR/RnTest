```js
<View style={styles.tabWrapper}>
  <View style={styles.titleWrapper}>
    <Text>ScrollableTabBar TabRender</Text>
  </View>
  <ScrollableTabView
    locked={false}
    initialPage={0}
    prerenderingSiblingsNumber={3}
    renderTabBar={() => (
      <ScrollableTabBar
        renderTab={this.renderTab}
        style={{
          height: 40,
          borderBottomWidth: 0,
          backgroundColor: 'orange',
        }}
        underlineStyle={{
          height: 0,
        }}
      />
    )}>
    {tabList.map((tab, i) => {
      return (
        <TabList
          ref={(ref) => (this.children[i] = ref)}
          key={tab}
          tabLabel={tab}
        />
      );
    })}
  </ScrollableTabView>
</View>

<View style={styles.tabWrapper}>
  <View style={styles.titleWrapper}>
    <Text>CurstomTabBar</Text>
  </View>
  <ScrollableTabView
    locked={false}
    initialPage={0}
    prerenderingSiblingsNumber={3}
    renderTabBar={() => <CurstomTabBar />}>
    {this.curstomTabList.map((tab) => {
      return <TabList key={tab} tabLabel={tab} />;
    })}
  </ScrollableTabView>
</View>
```

```js
  renderTab(name, page, isTabActive, onPressHandler, onLayoutHandler) {
    return (
      <TouchableOpacity
        key={name}
        onPress={() => onPressHandler(page)}
        onLayout={onLayoutHandler}
        style={{
          paddingHorizontal: 20,
          justifyContent: 'center',
          flexShrink: 0,
        }}>
        <Text style={{color: isTabActive ? 'red' : '#333'}}>{name}</Text>
      </TouchableOpacity>
    );
  }
```
