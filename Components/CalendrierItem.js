import React, {Component} from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';


class CalendrierItem extends React.Component {

  render() {
    const {array} = this.props;
    return (
      <View>
        <FlatList
          data={array}
          renderItem={({item}) => <Text style={styles.bloc}>{item}</Text>}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bloc:{
    //borderWidth: 1,
    //borderColor: "green",
    width: 50,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  }
});
export default CalendrierItem;
