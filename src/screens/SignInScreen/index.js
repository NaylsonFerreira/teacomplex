import React, {useState, useContext} from 'react';
import {StyleSheet} from 'react-native';
import {
  Container,
  Label,
  Form,
  Item,
  Input,
  Content,
  Text,
  Button,
  Thumbnail,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AuthContext} from '../../hooks/authContext';

const defaultButton = {
  borderRadius: 30,
  marginTop: 20,
  alignSelf: 'center',
  width: '100%',
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginTop: 25,
    alignSelf: 'center',
  },
  name: {
    fontSize: 40,
    marginTop: 5,
    alignSelf: 'center',
  },
  form: {
    width: 370,
    padding: 20,
    alignSelf: 'center',
  },
  login_email: {
    ...defaultButton,
    backgroundColor: '#4285f4',
  },
  login_google: {
    ...defaultButton,
    backgroundColor: '#ea4335',
  },
  signup: {
    ...defaultButton,
    backgroundColor: '#ec3c3c',
  },
  reset: {
    ...defaultButton,
    backgroundColor: '#5f9b36',
  },
  error: {
    textAlign: 'center',
    fontSize: 20,
    color: 'red',
  },
});

export const SignInScreen = ({navigation}) => {
  const {signIn, resetPassword, error} = useContext(AuthContext);
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  return (
    <Container style={styles.container}>
      <Content>
        <Thumbnail
          style={styles.logo}
          source={{
            uri: 'https://overloadlab.com.br/pcomplex/static/teacomplex.png',
          }}
        />
        <Form style={styles.form}>
          {error && <Text style={styles.error}>{error}</Text>}
          <Item floatingLabel>
            <Label>E-mail</Label>
            <Input
              defaultValue={data.email}
              onChangeText={(value) => setData({...data, email: value})}
            />
          </Item>
          <Item floatingLabel last>
            <Label>Senha</Label>
            <Input
              defaultValue={data.password}
              onChangeText={(value) => setData({...data, password: value})}
            />
          </Item>
          <Button
            iconLeft
            full
            style={styles.login_email}
            onPress={() => signIn(data)}>
            <Icon size={20} color="white" name="envelope" />
            <Text>Entrar com email e senha</Text>
          </Button>
          <Button
            full
            style={styles.signup}
            onPress={() => navigation.navigate('SignUpScreen')}>
            <Icon size={20} color="white" name="user-plus" />
            <Text>Criar uma conta</Text>
          </Button>

          <Button full style={styles.reset} onPress={() => resetPassword()}>
            <Icon size={20} color="white" name="unlock-alt" />
            <Text>Esqueci minha senha</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

export default SignInScreen;
