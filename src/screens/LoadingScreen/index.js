import React from 'react';
import {connect} from 'react-redux';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Container, Content, Text, Spinner, Thumbnail} from 'native-base';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  logo: {
    flex: 1,
    width: 200,
    height: 200,
    marginTop: 200,
    alignSelf: 'center',
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 30,
    alignSelf: 'center',
  },
});

export const LoadingScreen = ({navigation}) => {
  return (
    <Container style={styles.container}>
      <Content>
        <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
          <Thumbnail
            style={styles.logo}
            source={{
              uri: 'https://overloadlab.com.br/pcomplex/static/teacomplex.png',
            }}
          />
          <Text style={styles.name}>TeaComplex</Text>
        </TouchableOpacity>
        <Spinner size={60} color="blue" />
      </Content>
    </Container>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LoadingScreen);
