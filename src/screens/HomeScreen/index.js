import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';
import {Container, Content, Button, Text} from 'native-base';
import {Header, List} from '../../componets';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
});

export const HomeScreen = ({navigation}) => {
  return (
    <Container style={styles.container}>
      <Content>
        <Header navigation={navigation} />
        <List />
      </Content>
    </Container>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
