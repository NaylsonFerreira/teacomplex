import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {Container, Content, Text} from 'native-base';
import {Header, List} from '../../componets';
import {AuthContext} from '../../hooks/authContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
});

export const HomeScreen = ({navigation, route}) => {
  const {user} = useContext(AuthContext);
  return (
    <Container style={styles.container}>
      <Content>
        <Header navigation={navigation} title="TeaComplex" />
        <Text>{user.email || 'Faça login para continuar'}</Text>
        <List />
      </Content>
    </Container>
  );
};

export default HomeScreen;
