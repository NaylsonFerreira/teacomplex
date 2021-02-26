import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {StyleSheet} from 'react-native';
import {
  Container,
  Item,
  Form,
  Input,
  Content,
  Label,
  Text,
  Button,
  Thumbnail,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Header} from '../../componets';

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  logo: {
    flex: 1,
    width: 170,
    height: 170,
    marginTop: 10,
    alignSelf: 'center',
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 5,
    alignSelf: 'center',
  },
  form: {
    width: 370,
    padding: 20,
    alignSelf: 'center',
  },
  login_google: {
    borderRadius: 30,
    marginTop: 20,
    padding: 20,
    alignSelf: 'center',
    backgroundColor: '#ea4335',
  },
  login_email: {
    borderRadius: 30,
    marginTop: 30,
    padding: 20,
    alignSelf: 'center',
    backgroundColor: '#4285f4',
  },
});

export const SignUpScreen = ({navigation}) => {
  const [data, setData] = useState({
    email: 'naylsonfsa@gmail.com',
    password: 'overload',
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    if (data?.password === data?.password2 && data?.password?.length > 8) {
      auth()
        .createUserWithEmailAndPassword(data?.email, data?.password)
        .then(() => navigation.navigate('LoadingScreen'))
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            auth
              .signInWithEmailAndPassword(data?.email, data?.password)
              .then(() => navigation.navigate('LoadingScreen'))
              .catch(() => setMsg('Email já cadastrado'));
          }

          if (error.code === 'auth/invalid-email') {
            setMsg('Credenciais inválidas');
          }
        });
    }

    setLoading(true);
  };
  return (
    <Container style={styles.container}>
      <Header navigation={navigation} back="SignInScreen" />
      <Content style={styles.content}>
        <Thumbnail
          style={styles.logo}
          source={{
            uri: 'https://overloadlab.com.br/pcomplex/static/teacomplex.png',
          }}
        />
        <Text style={styles.name}>Cadastre-se</Text>
        <Form style={styles.form}>
          <Item floatingLabel>
            <Label>Nome</Label>
            <Input />
          </Item>
          <Item floatingLabel>
            <Label>E-mail</Label>
            <Input
              value={data?.email}
              onChange={(value) => setData({...data, email: value})}
            />
          </Item>
          <Item floatingLabel last>
            <Label>Senha</Label>
            <Input
              value={data?.password}
              onChange={(value) => setData({...data, password: value})}
            />
          </Item>
          <Item floatingLabel last>
            <Label>Repetir a Senha</Label>
            <Input
              value={data?.password2}
              onChange={(value) => setData({...data, password2: value})}
            />
          </Item>
          {msg && <Text style={styles.msg}>{msg}</Text>}
          <Button
            disabled={loading}
            iconLeft
            style={styles.login_email}
            onPress={() => handleSubmit()}>
            <Icon size={20} color="white" name="envelope" />
            <Text>Criar uma conta</Text>
          </Button>
          <Button disabled={loading} iconLeft style={styles.login_google}>
            <Icon size={20} color="white" name="google" />
            <Text>Entrar com conta google</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

export default SignUpScreen;
