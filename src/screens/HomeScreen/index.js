import React from 'react';
import {StyleSheet} from 'react-native';
import {Container, Content} from 'native-base';
import {Header, List, Protect} from '../../componets';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
});

export const HomeScreen = ({navigation}) => {
  return (
    <Container style={styles.container}>
      <Protect navigation={navigation} />
      <Content>
        <Header navigation={navigation} title="TeaComplex" />
        <List />
      </Content>
    </Container>
  );
};

export default HomeScreen;
