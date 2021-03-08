import React from 'react';
import {StyleSheet, Linking, Alert} from 'react-native';
import {
  Text,
  List,
  Thumbnail,
  ListItem,
  Left,
  Body,
  Right,
  Button,
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
            uri: props.icon,
          }}
        />
      </Left>
      <Body style={styles.body}>
        <Text>{props.nome?.split('_').join(' ')}</Text>
        <Text note numberOfLines={2}>
          Faça amigos e divirta-se
        </Text>
      </Body>
      <Right>
        <Button
          transparent
          onPress={async () => {
            const url = props.link;
            const supported = await Linking.canOpenURL(url);
            if (supported) {
              await Linking.openURL(url);
            } else {
              Alert.alert(`Acesse: ${url}`);
            }
          }}>
          <Text>Jogar</Text>
        </Button>
      </Right>
    </ListItem>
  );
};

const Lista = ({lista}) => {
  const itens = [];
  lista.forEach((props) => {
    itens.push(<ItemAvatar {...props} key={props.id} />);
  });
  return <List style={styles.lista}>{itens}</List>;
};
export default Lista;
