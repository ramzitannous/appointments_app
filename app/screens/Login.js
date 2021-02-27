import styled from 'styled-components/native';
import React, {useState} from 'react';
import {PrimaryButton, SecondaryButton} from '../components/Button';
import {Input} from '../components/Input';
import {useNavigation} from '@react-navigation/core';
import {ROUTES} from '../navigation/routes';
import {Error, Title} from '../components/Typogrophy';
import auth from '@react-native-firebase/auth';
import {Images} from '../images';
import {setUser} from '../store/auth';
import {useDispatch} from 'react-redux';

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const MailImage = styled.Image`
  height: 100px;
  width: 100px;
`;

const InputWrapper = styled.View`
  flex-direction: column;
  width: 80%;
`;

export const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const login = async () => {
    try {
      setError(null);
      const result = await auth().signInWithEmailAndPassword(
        email.trim(),
        password.trim(),
      );
      if (result.user) {
        //login success\
        const user = {
          email: result.user.email,
          name: result.user.displayName,
          id: result.user.uid,
        };
        dispatch(setUser({user, isAuthenticated: true}));
        navigation.reset({
          index: 0,
          routes: [{name: ROUTES.HOME}],
        });
      }
    } catch (e) {
      //login failed
      setError(e?.toString());
      console.error(e);
    }
  };

  const navigateToCreateAccount = () => {
    navigation.navigate(ROUTES.CREATE_ACCOUNT);
  };

  return (
    <Container>
      <MailImage source={Images.img} />
      <Title>Appointments App</Title>
      <InputWrapper>
        <Input
          placeholder={'Email'}
          keyboardType={'email-address'}
          onChangeText={(e) => setEmail(e)}
          textContentType={'emailAddress'}
          autoCompleteType={'email'}
        />
        <Input
          placeholder={'password'}
          textContentType={'password'}
          autoCompleteType={'password'}
          secureTextEntry={true}
          onChangeText={(e) => setPassword(e)}
        />
        <SecondaryButton
          onPress={navigateToCreateAccount}
          title={'Create Account'}
        />
      </InputWrapper>
      {error && <Error>{error}</Error>}
      <PrimaryButton
        onPress={login}
        disabled={!email.length || !password.length}
        title={'Next'}
      />
    </Container>
  );
};
