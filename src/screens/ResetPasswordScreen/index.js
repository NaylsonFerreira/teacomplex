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
import {Header} from '../../componets';
import {AuthContext} from '../../hooks/authContext';

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
  error: {
    textAlign: 'center',
    fontSize: 20,
    color: 'red',
  },
});

export const ResetPasswordScreen = ({navigation}) => {
  const {resetPassword, error} = useContext(AuthContext);
  const [email, setEmail] = useState('naylsonfsa@gmail.com');

  return (
    <Container style={styles.container}>
      <Content>
        <Header navigation={navigation} back="SignInScreen" />
        <Thumbnail
          style={styles.logo}
          source={{
            uri: 'https://overloadlab.com.br/pcomplex/static/teacomplex.png',
          }}
        />
        <Form style={styles.form}>
          <Text style={styles.name}>TeaComplex</Text>
          {error && <Text style={styles.error}>{error}</Text>}
          <Item floatingLabel>
            <Label>E-mail</Label>
            <Input
              defaultValue={email}
              onChangeText={(value) => setEmail(value)}
            />
          </Item>
          <Button
            iconLeft
            style={styles.login_email}
            onPress={() => resetPassword(email)}>
            <Icon size={20} color="white" name="envelope" />
            <Text>Enviar link de recuperação</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

export default ResetPasswordScreen;
