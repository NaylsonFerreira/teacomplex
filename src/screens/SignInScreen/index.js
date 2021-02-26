import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {StyleSheet, TouchableOpacity} from 'react-native';
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
import {LoginGoogle} from '../../componets';

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
    borderRadius: 30,
    marginTop: 30,
    padding: 20,
    alignSelf: 'center',
    backgroundColor: '#4285f4',
  },
  login_google: {
    borderRadius: 30,
    marginTop: 20,
    padding: 20,
    alignSelf: 'center',
    backgroundColor: '#ea4335',
  },
  signup: {
    marginTop: 30,
    fontSize: 18,
    alignSelf: 'center',
    color: '#4285f4',
    textDecorationLine: 'underline',
  },
});

export const SignInScreen = ({navigation}) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(data?.email, data?.password)
      .then(() => {
        navigation.navigate('HomeScreen');
      })
      .catch((error) => {
        setMsg('Credenciais inválidas');
      });
    setLoading(true);
  };
  return (
    <Container style={styles.container}>
      <Content>
        <Thumbnail
          style={styles.logo}
          source={{
            uri: 'https://overloadlab.com.br/pcomplex/static/teacomplex.png',
          }}
        />
        <Text style={styles.name}>TeaComplex</Text>
        <Form style={styles.form}>
          <Item floatingLabel>
            <Label>E-mail</Label>
            <Input onChange={(value) => setData({...data, email: value})} />
          </Item>
          <Item floatingLabel last>
            <Label>Senha</Label>
            <Input onChange={(value) => setData({...data, password: value})} />
          </Item>
          {msg && <Text style={styles.msg}>{msg}</Text>}
          <Button
            iconLeft
            disabled={loading}
            style={styles.login_email}
            onPress={() => handleSubmit()}>
            <Icon size={20} color="white" name="envelope" />
            <Text>Entrar com email e senha</Text>
          </Button>
          <Button
            iconLeft
            style={styles.login_google}
            onPress={() => LoginGoogle()}>
            <Icon size={20} color="white" name="google" />
            <Text>Entrar com conta google</Text>
          </Button>
          <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
            <Text style={styles.signup}>Criar uma conta</Text>
          </TouchableOpacity>
        </Form>
      </Content>
    </Container>
  );
};

export default SignInScreen;
