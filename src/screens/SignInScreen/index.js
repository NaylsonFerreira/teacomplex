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
  Spinner,
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
  msg: {
    textAlign: 'center',
    fontSize: 20,
    color: 'red',
  },
});

export const SignInScreen = ({navigation}) => {
  const [data, setData] = useState({
    email: 'naylsonfsa@gmail.com',
    password: 'overload',
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    if (data?.email && data?.password) {
      auth()
        .signInWithEmailAndPassword(data.email, data.password)
        .then(() => {
          navigation.navigate('HomeScreen');
        })
        .catch((error) => {
          setMsg('Credenciais inválidas');
        });
    }
    setLoading(false);
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
        {loading ? (
          <Spinner size={60} color="blue" />
        ) : (
          <Form style={styles.form}>
            {msg && <Text style={styles.msg}>{msg}</Text>}
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
              disabled={loading}
              style={styles.login_email}
              onPress={() => handleSubmit()}>
              <Icon size={20} color="white" name="envelope" />
              <Text>Entrar com email e senha</Text>
            </Button>
            {/* <Button iconLeft style={styles.login_google} onPress={() => {}}>
              <Icon size={20} color="white" name="google" />
              <Text>Entrar com conta google</Text>
            </Button> */}
            <TouchableOpacity
              onPress={() => navigation.navigate('SignUpScreen')}>
              <Text style={styles.signup}>Criar uma conta</Text>
            </TouchableOpacity>
          </Form>
        )}
      </Content>
    </Container>
  );
};

export default SignInScreen;
