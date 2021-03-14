import React, {useContext} from 'react';
import {Container, Content, Button, Text} from 'native-base';
import {AuthContext} from '../../hooks/authContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Header, Form} from '../../componets';
import {useState} from 'react';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4285f4',
  },
});

export const ProfileScreen = ({navigation}) => {
  const {user, updateUser, error} = useContext(AuthContext);
  const [data, setData] = useState({...user});

  return (
    <Container>
      <Header navigation={navigation} back="HomeScreen" />
      <Content>
        {error && <Text>{error}</Text>}
        <Form
          fields={[
            {name: 'nome'},
            {name: 'idade', type: 'numeric'},
            {name: 'whatsapp', type: 'numeric'},
            {name: 'instagram'},
            {name: 'sobre', label: 'Escreva algo sobre você'},
            {
              name: 'genero',
              options: [
                {label: 'Sou um menino', value: 'M'},
                {label: 'Sou uma menina', value: 'F'},
              ],
            },
          ]}
          setData={setData}
          data={data}
        />
        <Button
          style={styles.button}
          full
          onPress={() => updateUser({...user, ...data})}>
          <Icon size={20} color="white" name="save" />
          <Text>Salvar</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default ProfileScreen;
