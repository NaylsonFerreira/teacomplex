import React, {useContext, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Container, Content, Text} from 'native-base';
import {Header, Form} from '../../componets';
import {AuthContext} from '../../hooks/authContext';
import {LoadingScreen} from '../LoadingScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  form: {
    marginBottom: 30,
  },
});

export const HabilidadeScreen = ({navigation}) => {
  const {listaHabilidades, error, loadAllSkills} = useContext(AuthContext);
  const [data, setData] = useState({habilidades: []});
  if (!listaHabilidades.length) {
    setTimeout(() => loadAllSkills(), 3000);
    return <LoadingScreen />;
  }

  const checklist = listaHabilidades.slice(1).map((name) => {
    return {label: name.split('_').join(' '), value: name};
  });

  return (
    <Container style={styles.container}>
      <Content>
        <Header navigation={navigation} title="TeaComplex" />
        {error && <Text style={styles.error}>{error}</Text>}
        <Text>{JSON.stringify(data)}</Text>
        <Form
          style={styles.form}
          fields={[
            {
              name: 'habilidades',
              label: 'Quais suas habilidades?',
              checklist,
            },
          ]}
          setData={setData}
          data={data}
        />
      </Content>
    </Container>
  );
};

export default HabilidadeScreen;
