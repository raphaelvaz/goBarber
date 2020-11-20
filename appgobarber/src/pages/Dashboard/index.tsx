import React, { useCallback, useEffect, useState } from 'react';
import {
  Container, Header, HeaderTitle, UserName, UserAvatar,
  ProfileButton, ProvidersList, ProvidersListTitle, ProviderContainer, ProviderAvatar, ProviderInfo, ProviderName, ProviderMeta, ProviderMetaText
} from './styles';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather'

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

export interface Provider {
  id: string;
  name: string;
  avatar: string;
}

const Dashboard: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);

  const { user } = useAuth();
  const { navigate } = useNavigation();

  useEffect(() => {
    api.get('/providers').then(response => {
      setProviders(response.data);
    });

  }, []);

  const navigateToCreateAppointment = useCallback((providerId: string) => {
    navigate('CreateAppointment', { providerId });
  }, [navigate]);

  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);

  return (<Container>
    <Header>
      <HeaderTitle>
        Bem vindo, {"\n"}
        <UserName>{user.name}</UserName>
      </HeaderTitle>
      <ProfileButton onPress={navigateToProfile} >
        <UserAvatar source={{ uri: user.avatar }} />
      </ProfileButton>
    </Header>

    <ProvidersList
      data={providers}
      keyExtractor={(provider: Provider) => provider.id}
      ListHeaderComponent={
        <ProvidersListTitle>Cabeleireiros</ProvidersListTitle>
      }
      renderItem={({ item: provider }) => (
        (<ProviderContainer onPress={() => navigateToCreateAppointment(provider.id)}>
          <ProviderAvatar source={{ uri: provider.avatar }} />
          <ProviderInfo>
            <ProviderName>{provider.name}</ProviderName>
            <ProviderMeta>
              <Icon name='calendar' size={24} color='#ff9000' />
              <ProviderMetaText>Segunda à sexta</ProviderMetaText>
            </ProviderMeta>

            <ProviderMeta>
              <Icon name='clock' size={24} color='#ff9000' />
              <ProviderMetaText>8h as 18h</ProviderMetaText>
            </ProviderMeta>
          </ProviderInfo>
        </ProviderContainer>)
      )}
    />
  </Container>)
};

export default Dashboard;
