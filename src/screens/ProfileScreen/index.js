import React, {useContext} from 'react';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
} from 'native-base';
import {AuthContext} from '../../hooks/authContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Header} from '../../componets';
import {useState} from 'react';

export const ProfileScreen = ({navigation}) => {
  const {user, updateUser, error} = useContext(AuthContext);
  const [data, setData] = useState({});

  return (
    <Container>
      <Header navigation={navigation} back="HomeScreen" />
      <Content>
        {error && <Text>{error}</Text>}
        <Form>
          <Item stackedLabel>
            <Label>Nome</Label>
            <Input
              defaultValue={user?.nome}
              onChangeText={(text) => setData({...data, nome: text})}
            />
          </Item>
          <Item stackedLabel last>
            <Label>Idade</Label>
            <Input
              keyboardType="numeric"
              defaultValue={`${user?.idade}`}
              onChangeText={(text) => setData({...data, idade: text})}
            />
          </Item>
          <Item stackedLabel last>
            <Label>Whatsapp</Label>
            <Input
              keyboardType="numeric"
              defaultValue={user?.whatsapp}
              onChangeText={(text) => setData({...data, whatsapp: text})}
            />
          </Item>
          <Item stackedLabel last>
            <Label>Instagram</Label>
            <Input
              defaultValue={user?.instagram}
              onChangeText={(text) => setData({...data, instagram: text})}
            />
          </Item>
          <Item stackedLabel last>
            <Label>Genero</Label>
            <Input
              defaultValue={user?.genero}
              onChangeText={(text) => setData({...data, genero: text})}
            />
          </Item>
          <Item stackedLabel>
            <Label>Escreva algo sobre você</Label>
            <Input
              defaultValue={user?.sobre}
              onChangeText={(text) => setData({...data, sobre: text})}
            />
          </Item>
          <Button full onPress={() => updateUser({...user, ...data})}>
            <Icon size={20} color="white" name="save" />
            <Text>Salvar</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

export default ProfileScreen;
