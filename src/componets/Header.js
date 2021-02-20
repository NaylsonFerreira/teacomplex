import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Button, Title, View, Header as NbHeader} from 'native-base';
import IconEnt from 'react-native-vector-icons/Entypo';

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#4285f4',
    flexDirection: 'row',
  },
  viewMenu: {
    padding: 5,
    // backgroundColor:'#f00',
  },
  viewTitle: {
    width: 300,
    alignSelf: 'center',
    margin: 10,
    padding: 5,
    alignItems: 'center',
  },
  viewRight: {
    padding: 5,
    // backgroundColor:'#0f0',
  },
  icon: {
    color: 'white',
  },
});

const Header = (props) => {
  return (
    <NbHeader androidStatusBarColor={'#4285f4'} style={styles.header}>
      <View style={styles.viewMenu}>
        {props.back ? (
          <Button
            transparent
            onPress={() => props.navigation.navigate(props.back)}>
            <IconEnt name="arrow-left" size={40} style={styles.icon} />
          </Button>
        ) : (
          <Button transparent onPress={() => props.navigation.toggleDrawer()}>
            <IconEnt name="menu" size={40} style={styles.icon} />
          </Button>
        )}
      </View>
      <View style={styles.viewTitle}>
        <Title>{props.title}</Title>
      </View>
      <View style={styles.viewRight}>
        <Button transparent>
          {/* <IconEnt size={30} name="star" style={styles.icon} /> */}
        </Button>
      </View>
    </NbHeader>
  );
};
export default Header;
