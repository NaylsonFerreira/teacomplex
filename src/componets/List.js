import React from 'react';
import {StyleSheet} from 'react-native';
import {
  Text,
  List,
  Thumbnail,
  ListItem,
  Left,
  Body,
  Right,
  Button,
  Separator,
} from 'native-base';
const styles = StyleSheet.create({
  left: {
    alignItems: 'stretch',
    backgroundColor: '#4285f4',
  },
  imagen: {
    width: 80,
    height: 80,
  },
  separator: {
    fontSize: 18,
  },
  lista: {},
  item: {},
});

const ItemAvatar = (props) => {
  return (
    <ListItem thumbnail style={styles.item}>
      <Left style={styles.left}>
        <Thumbnail
          style={styles.imagen}
          square
          source={{
            uri: 'https://overloadlab.com.br/pcomplex/static/logo2.png',
          }}
        />
      </Left>
      <Body style={styles.body}>
        <Text>Khunters</Text>
        <Text note numberOfLines={2}>
          Faça amigos e divirta-se
        </Text>
      </Body>
      <Right>
        <Button transparent>
          <Text>Jogar</Text>
        </Button>
      </Right>
    </ListItem>
  );
};

const Lista = (props) => {
  const itens = [];
  for (let i = 1; i < 5; i++) {
    itens.push(<ItemAvatar index={i} key={i} />);
  }
  return (
    <List style={styles.lista}>
      <Separator bordered>
        <Text style={styles.separator}>Jogos de Aventura</Text>
      </Separator>
      {itens}
      <Separator bordered>
        <Text style={styles.separator}>Jogos de Corrida</Text>
      </Separator>
      {itens}
    </List>
  );
};
export default Lista;
