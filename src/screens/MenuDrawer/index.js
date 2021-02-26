import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Container, Content, Text, Button, Thumbnail} from 'native-base';
import IconMi from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  imagen: {
    resizeMode: 'stretch',
    height: 200,
    minWidth: 280,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    width: 300,
  },
  button: {
    marginTop: 10,
    width: 350,
    backgroundColor: '#4285f4',
  },
});

export const MenuDrawer = ({navigation}) => {
  return (
    <Container style={styles.container}>
      <Thumbnail
        style={styles.imagen}
        square
        source={{
          uri: 'https://overloadlab.com.br/pcomplex/static/teacomplex.png',
        }}
      />
      <Content style={styles.content}>
        <Button
          style={styles.button}
          full
          onPress={() => navigation.navigate('LoadingScreen')}>
          <IconMi name="home" color="white" size={30} style={styles.icon} />
          <Text style={styles.name}>Início</Text>
        </Button>
        <Button
          style={styles.button}
          full
          onPress={() => navigation.navigate('HomeScreen')}>
          <IconMi name="face" color="white" size={30} style={styles.icon} />
          <Text style={styles.name}>Meu Perfil</Text>
        </Button>
        <Button
          style={styles.button}
          full
          onPress={() => navigation.navigate('HomeScreen')}>
          <IconMi name="list" color="white" size={30} style={styles.icon} />
          <Text style={styles.name}>Lista de embriões</Text>
        </Button>
        <Button
          style={styles.button}
          full
          onPress={() => navigation.navigate('HomeScreen')}>
          <IconMi
            name="notifications"
            color="white"
            size={30}
            style={styles.icon}
          />
          <Text style={styles.name}>Notificações</Text>
        </Button>
        <Button
          style={{...styles.button, marginTop: 250}}
          full
          onPress={() =>
            auth()
              .signOut()
              .then(() => navigation.navigate('SignInScreen'))
          }>
          <IconMi
            name="exit-to-app"
            color="white"
            size={30}
            style={styles.icon}
          />
          <Text style={styles.name}>Sair</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default MenuDrawer;
