import React, {useContext, useEffect} from 'react';
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

export const HomeScreen = ({navigation}) => {
  const {listaJogos, token, error, loadAllGames} = useContext(AuthContext);
  useEffect(() => {
    if (token) {
      loadAllGames();
    }
  }, [loadAllGames, token]);
  return (
    <Container style={styles.container}>
      <Content>
        <Header navigation={navigation} title="TeaComplex" />
        {error && <Text style={styles.error}>{error}</Text>}
        <List lista={listaJogos} />
      </Content>
    </Container>
  );
};

export default HomeScreen;
