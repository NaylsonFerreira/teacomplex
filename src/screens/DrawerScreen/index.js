import React, {View} from 'react';
import {connect} from 'react-redux';
import {Container, Button, Text} from 'native-base';

export const DrawerScreen = ({navigation}) => {
  return (
    <Container
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button full danger onPress={() => navigation.navigate('HomeScreen')}>
        <Text>Go to HomeScreen</Text>
      </Button>
    </Container>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerScreen);
