'use strict';

var React = require('react-native');
var {
  StyleSheet,
  TabBarIOS,
  Text,
  View,
} = React;


var EmailTabBar = React.createClass({
  statics: {
    title: '<TabBarIOS>',
    description: 'Tab-based navigation.',
  },

  displayName: 'TabBarExample',

  getInitialState: function() {
    return {
      selectedTab: 'bluesTab',
      notifCount: 0,
      presses: 0,
    };
  },

  _renderContent: function(color: string, pageText: string, num?: number) {
    return (
      <View style={[styles.tabContent, {backgroundColor: color}]}>
        <Text style={styles.tabText}>{pageText}</Text>
        <Text style={styles.tabText}>{num} re-renders of the {pageText}</Text>
      </View>
    );
  },

  render: function() {
    return (
      <TabBarIOS
        tintColor="white"
        barTintColor="#2196F3">
        <TabBarIOS.Item
          title=""
          systemIcon=""
          selected={this.state.selectedTab === 'blueTab'}
          onPress={() => {
            console.log('puzzle piece')
            // this.setState({
            //   selectedTab: 'blueTab',
            // });
          }}>
          // {this._renderContent('#2196F3', 'Blue Tab')}
        </TabBarIOS.Item>
      
      </TabBarIOS>
    );
  },

});

var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
  }
});


module.exports = EmailTabBar;
// module.exports = EventTabBar;
