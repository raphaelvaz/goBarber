import React, { useRef, useCallback } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import api from '../../services/api';
import Icon from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-picker';

import Input from '../../components/Input';
import Button from '../../components/Button';

import getValidationErrors from '../../utils/getValidationErrors';

import { Container, BackButton, Title, UserAvatarButton, UserAvatar } from './styles';
import { useAuth } from '../../hooks/auth';

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const SignUp: React.FC = () => {
  const { user, updateUser } = useAuth();

  const formRef = useRef<FormHandles>(null);
  const { goBack } = useNavigation();

  const emailInputRef = useRef<TextInput>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const handleUpdateAvatar = useCallback(() => {
    ImagePicker.showImagePicker({
      title: 'Selecione um avatar',
      cancelButtonTitle: 'Cancelar',
      takePhotoButtonTitle: 'Usar câmera',
      chooseFromLibraryButtonTitle: 'Escolhe da galeria',
    }, response => {
      if (response.didCancel) {
        return;
      }

      if (response.error) {
        Alert.alert('Erro ao atualizar seu avatar.');
        return;
      }

      const data = new FormData();

      data.append('avatar', {
        type: 'image/jpeg',
        name: `${user.id}.jpg`,
        uri: response.uri,
      });

      api.patch('users/avatar', data).then(apiResponse => {
        updateUser(apiResponse.data);
      });
    });
  }, [updateUser, user.id]);

  const handleChangeProfile = useCallback(async (data: ProfileFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('Email obrigatório').email('Digite um e-mail válido'),
        old_password: Yup.string(),
        password: Yup.string().when('old_password', {
          is: val => !!val.length,
          then: Yup.string().required('Campo obrigatório'),
          otherwise: Yup.string(),
        }),
        password_confirmation: Yup.string().when('old_password', {
          is: val => !!val.length,
          then: Yup.string().required('Campo obrigatório'),
          otherwise: Yup.string(),
        }).oneOf([Yup.ref('password'), undefined], 'Confirmação incorreta'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const { name, email, old_password, password, password_confirmation } = data;

      const formData = Object.assign({
        name,
        email,
      }, data.old_password ? {
        old_password,
        password,
        password_confirmation,
      } : {});

      const response = await api.put('/profile', formData);

      updateUser(response.data);

      Alert.alert('Perfil atualizado com sucesso!');


      goBack();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }

      Alert.alert('Erro na atualização do perfil', 'Ocorreu um erro ao atualizar seu perfil, tente novamente.');
    }
  }
    , [goBack, updateUser]);

  const handleGoBack = useCallback(() => {
    goBack();
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <BackButton onPress={handleGoBack}>
              <Icon name="chevron-left" size={24} color="#999591" />
            </BackButton>
            <UserAvatarButton onPress={handleUpdateAvatar}>
              <UserAvatar source={{ uri: user.avatar }} />
            </UserAvatarButton>

            <View>
              <Title>Meu perfil</Title>
            </View>
            <Form initialData={user} ref={formRef} onSubmit={handleChangeProfile}>
              <Input
                autoCapitalize='words'
                name='name'
                icon='user'
                placeholder='Nome'
                returnKeyType='next'
                onSubmitEditing={() => emailInputRef.current?.focus()}
              />
              <Input
                ref={emailInputRef}
                keyboardType='email-address'
                autoCorrect={false}
                autoCapitalize='none'
                name='email'
                icon='mail'
                placeholder='E-mail'
                returnKeyType='next'
                onSubmitEditing={() => oldPasswordInputRef.current?.focus()}
              />
              <Input
                ref={oldPasswordInputRef}
                secureTextEntry
                name='old_password'
                icon='lock'
                placeholder='Senha atual'
                textContentType='newPassword'
                returnKeyType='next'
                onSubmitEditing={() => passwordInputRef.current?.focus()}
                containerStyle={{ marginTop: 16 }}
              />

              <Input
                ref={passwordInputRef}
                secureTextEntry
                name='password'
                icon='lock'
                placeholder='Nova senha'
                textContentType='newPassword'
                returnKeyType='next'
                onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
              />

              <Input
                ref={confirmPasswordInputRef}
                secureTextEntry
                name='password_confirmation'
                icon='lock'
                placeholder='Confirmar senha'
                textContentType='newPassword'
                returnKeyType='send'
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
            </Form>
            <Button onPress={() => formRef.current?.submitForm()}>Confirmar mudanças</Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignUp;