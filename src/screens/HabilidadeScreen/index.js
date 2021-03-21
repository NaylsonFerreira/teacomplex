import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Container, Content, Text, Button} from 'native-base';
import {Header, Form} from '../../componets';
import {AuthContext} from '../../hooks/authContext';
import {LoadingScreen} from '../LoadingScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  form: {
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#4285f4',
  },
});

export const HabilidadeScreen = ({navigation}) => {
  const {
    error,
    user,
    listaHabilidades,
    minhasHabilidades,
    loadAllSkills,
    loadMySkills,
    updateSkills,
  } = useContext(AuthContext);

  const [data, setData] = useState({habilidades: []});

  useEffect(() => {
    return loadMySkills(user.id);
  }, []);

  useEffect(() => {
    return setData({habilidades: minhasHabilidades});
  }, [minhasHabilidades]);

  if (!listaHabilidades.length) {
    loadAllSkills();
    return <LoadingScreen />;
  }

  const checklist = listaHabilidades.slice(1).map((name) => {
    return {label: name.split('_').join(' '), value: name};
  });

  return (
    <Container style={styles.container}>
      <Header navigation={navigation} title="TeaComplex" />
      {error && <Text style={styles.error}>{error}</Text>}
      <Content style={styles.body}>
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
      <Button
        style={styles.button}
        full
        onPress={() => updateSkills({id: user.id, skills: data.habilidades})}>
        <Icon size={20} color="white" name="save" />
        <Text>Salvar</Text>
      </Button>
    </Container>
  );
};

export default HabilidadeScreen;
