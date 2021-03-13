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
  ListItem,
  Radio,
  Left,
  Right,
} from 'native-base';
import {AuthContext} from '../../hooks/authContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Header} from '../../componets';
import {useState} from 'react';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4285f4',
  },
});

export const ProfileScreen = ({navigation}) => {
  const {user, updateUser, error} = useContext(AuthContext);
  const [data, setData] = useState({genero: user.genero});

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
          <ListItem onPress={() => setData({...data, genero: 'M'})}>
            <Left>
              <Text>Sou menino</Text>
            </Left>
            <Right>
              <Radio selected={data?.genero === 'M'} />
            </Right>
          </ListItem>
          <ListItem onPress={() => setData({...data, genero: 'F'})}>
            <Left>
              <Text>Sou menina</Text>
            </Left>
            <Right>
              <Radio selected={data.genero === 'F'} />
            </Right>
          </ListItem>
          <Item stackedLabel>
            <Label>Escreva algo sobre você</Label>
            <Input
              defaultValue={user?.sobre}
              onChangeText={(text) => setData({...data, sobre: text})}
            />
          </Item>
          <Button
            style={styles.button}
            full
            onPress={() => updateUser({...user, ...data})}>
            <Icon size={20} color="white" name="save" />
            <Text>Salvar</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

export default ProfileScreen;
