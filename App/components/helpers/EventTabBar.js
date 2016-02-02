'use strict';

var React = require('react-native');
var {
  StyleSheet,
  TabBarIOS,
  Text,
  View,
} = React;

var SearchTabBar = React.createClass({
  statics: {
    title: '<TabBarIOS>',
    description: 'Tab-based navigation.',
  },

  displayName: 'TabBarExample',

  getInitialState: function() {
    return {
      selectedTab: '',
      notifCount: 0,
      presses: 0,
    };
  },

  render: function() {
    return (
      <TabBarIOS
        tintColor="white"
        barTintColor="#2196F3">
        <TabBarIOS.Item
          title="Date"
          systemIcon="search"
          selected={this.state.selectedTab === 'eventTab'}
          onPress={() => {
            console.log('event tab', this.state.selectedTab)
            
          }}>
          
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

module.exports = SearchTabBar;
// module.exports = EventTabBar;
