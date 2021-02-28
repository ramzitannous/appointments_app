import styled from 'styled-components/native';
import auth from '@react-native-firebase/auth';
import React, {useState} from 'react';
import {PrimaryButton} from '../components/Button';
import {Input} from '../components/Input';
import {Error, Success, Title} from '../components/Typogrophy';

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const InputWrapper = styled.View`
  flex-direction: column;
  width: 80%;
`;

export const CreateAccountScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [created, setCreated] = useState(false);

  const clearInputs = () => {
    setEmail('');
    setPassword('');
  };

  const createAccount = async () => {
    try {
      setCreated(false);
      setError(null);
      await auth().createUserWithEmailAndPassword(
        email.trim(),
        password.trim(),
      );
      setError(null);
      setCreated(true);
      clearInputs();
    } catch (e) {
      if (error.code === 'auth/email-already-in-use') {
        setError('That email address already exists !');
      }

      if (error.code === 'auth/invalid-email') {
        setError('Email address is invalid!');
      }
    }
  };

  return (
    <Container>
      <Title>Create Account</Title>
      <InputWrapper>
        <Input
          placeholder={'Email'}
          keyboardType={'email-address'}
          onChangeText={(e) => setEmail(e)}
        />
        <Input
          placeholder={'password'}
          textContentType={'password'}
          autoCompleteType={'password'}
          secureTextEntry={true}
          onChangeText={(e) => setPassword(e)}
        />
      </InputWrapper>
      {created && <Success>{'Account Created Successfully'}</Success>}
      {error && <Error>{error}</Error>}
      <PrimaryButton
        onPress={createAccount}
        disabled={!email.length || !password.length}
        title={'Create Account'}
      />
    </Container>
  );
};
