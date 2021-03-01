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
  const {user, updateUser} = useContext(AuthContext);
  const [data, setData] = useState({});

  return (
    <Container>
      <Header navigation={navigation} back="HomeScreen" />
      <Content>
        <Form>
          <Item fixedLabel>
            <Label>Nome</Label>
            <Input
              defaultValue={user?.name}
              onChangeText={(text) => setData({...data, name: text})}
            />
          </Item>
          <Item fixedLabel last>
            <Label>Idade</Label>
            <Input
              defaultValue={user?.age}
              onChangeText={(text) => setData({...data, age: text})}
            />
          </Item>
          <Button full onPress={() => updateUser(data)}>
            <Icon size={20} color="white" name="envelope" />
            <Text>Salvar</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

export default ProfileScreen;
