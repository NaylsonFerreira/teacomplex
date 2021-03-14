import React from 'react';
import {
  ListItem,
  Left,
  Right,
  Text,
  Radio,
  Label,
  Form as NForm,
  Item,
  Input,
  View,
  CheckBox,
} from 'native-base';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  labelOptions: {
    paddingLeft: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    margin: 10,
  },
});

function capitalize(s) {
  if (!s) {
    return false;
  }
  return s[0].toUpperCase() + s.slice(1);
}

export const Form = ({
  fields = [],
  submit = () => {},
  data = {},
  setData = () => {},
  ...props
}) => {
  const form = fields.map(
    (
      {
        name = '',
        label = false,
        type = 'default',
        options = [],
        checklist = [],
      },
      index,
      [],
    ) => {
      if (options.length || checklist.length) {
        return (
          <View key={index}>
            <Label style={styles.labelOptions}>
              <Text>{capitalize(label) || capitalize(name)}</Text>
            </Label>
            {options?.map((option, key) => {
              let selected;
              if (data[name] === option.value) {
                selected = true;
              }
              return (
                <ListItem
                  key={key}
                  onPress={() => {
                    setData((oldValue) => {
                      return {...oldValue, [name]: option.value};
                    });
                  }}>
                  <Left>
                    <Text>{option.label}</Text>
                  </Left>
                  <Right>
                    <Radio selected={selected} />
                  </Right>
                </ListItem>
              );
            })}

            {checklist?.map((checkbox, key) => {
              let checked = data[name].includes(checkbox.value);
              return (
                <ListItem
                  key={key}
                  onPress={() => {
                    setData((oldValue) => {
                      if (oldValue[name].includes(checkbox.value)) {
                        oldValue[name] = oldValue[name].filter(
                          (text) => text !== checkbox?.value,
                        );
                      } else {
                        oldValue[name]?.push(checkbox?.value);
                      }
                      checked = !checked;
                      return {...oldValue};
                    });
                  }}>
                  <Left>
                    <Text>{checkbox.label}</Text>
                  </Left>
                  <Right>
                    <CheckBox checked={checked} />
                  </Right>
                </ListItem>
              );
            })}
          </View>
        );
      }

      return (
        <Item stackedLabel key={index}>
          <Label>
            <Text>{capitalize(label) || capitalize(name)}</Text>
          </Label>
          <Input
            styles={styles.input}
            keyboardType={type}
            defaultValue={`${data[name] || ''}`}
            onChangeText={(text) =>
              setData((oldValue) => {
                return {...oldValue, [name]: text};
              })
            }
          />
        </Item>
      );
    },
  );
  return (
    <NForm {...props} style={{...props.style, ...styles.form}}>
      {form}
    </NForm>
  );
};

export default Form;
