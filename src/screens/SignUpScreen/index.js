import React, {useState, useContext} from 'react';
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
import {AuthContext} from '../../hooks/authContext';

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
    padding: 10,
    alignSelf: 'center',
  },
  login_email: {
    borderRadius: 30,
    marginTop: 30,
    padding: 20,
    alignSelf: 'center',
    backgroundColor: '#4285f4',
    width: '100%',
  },
  error: {
    textAlign: 'center',
    fontSize: 20,
    color: 'red',
  },
});

export const SignUpScreen = ({navigation}) => {
  const {signUp, error} = useContext(AuthContext);
  const [data, setData] = useState({
    email: '',
    password: '',
    password2: '',
  });

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
          <Item floatingLabel last>
            <Label>Repetir a Senha</Label>
            <Input
              defaultValue={data.password2}
              onChangeText={(value) => setData({...data, password2: value})}
            />
          </Item>
          <Button full style={styles.login_email} onPress={() => signUp(data)}>
            <Icon size={20} color="white" name="envelope" />
            <Text>Criar uma conta</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

export default SignUpScreen;
