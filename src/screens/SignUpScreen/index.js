import React from 'react';
import {connect} from 'react-redux';
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
            <Input />
          </Item>
          <Item floatingLabel last>
            <Label>Senha</Label>
            <Input />
          </Item>
          <Item floatingLabel last>
            <Label>Repetir a Senha</Label>
            <Input />
          </Item>
          <Button iconLeft style={styles.login_email}>
            <Icon size={20} color="white" name="envelope" />
            <Text>Criar uma conta</Text>
          </Button>
          <Button iconLeft style={styles.login_google}>
            <Icon size={20} color="white" name="google" />
            <Text>Entrar com conta google</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
