import React, {Component} from 'react';
import {ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

export default class User extends Component {
  static propTypes = {
    route: PropTypes.shape({
      params: PropTypes.object,
    }).isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    stars: [],
    loading: true,
    loadingItems: false,
    page: 1,
    refreshing: false,
  };

  componentDidMount() {
    this.load();
  }

  load = async (page = 1) => {
    const {stars} = this.state;
    const {route} = this.props;
    const {login} = route.params.user;

    const response = await api.get(`/users/${login}/starred`, {
      params: {page},
    });

    this.setState({
      stars: page >= 2 ? [...stars, ...response.data] : response.data,
      loading: false,
      loadingItems: false,
      page,
    });
  };

  loadMore = () => {
    const {page} = this.state;

    const nextPage = page + 1;

    this.setState({loadingItems: true});

    this.load(nextPage);
  };

  refreshList = () => {
    this.setState({refreshing: true, stars: []});
    this.load();
  };

  navigateToRepository = (repository) => {
    const {navigation} = this.props;
    navigation.navigate('Repository', {repository});
  };

  render() {
    const {route} = this.props;
    const {avatar, name, bio} = route.params.user;
    const {stars, loading, loadingItems, refreshing} = this.state;

    return (
      <Container>
        <Header>
          <Avatar source={{uri: avatar}} />
          <Name>{name}</Name>
          <Bio>{bio}</Bio>
        </Header>

        {loading ? (
          <ActivityIndicator
            style={{marginTop: 60}}
            size={50}
            color="#7159c1"
          />
        ) : (
          <Stars
            onRefresh={this.refreshList}
            refreshing={refreshing}
            onEndReachedThreshold={0.2}
            onEndReached={this.loadMore}
            data={stars}
            keyExtractor={(star) => String(star.id)}
            renderItem={({item}) => (
              <Starred onPress={() => this.navigateToRepository(item)}>
                {loadingItems ? (
                  <ActivityIndicator size={30} color="#7159c1" />
                ) : (
                  <>
                    <OwnerAvatar source={{uri: item.owner.avatar_url}} />
                    <Info>
                      <Title>{item.name}</Title>
                      <Author>{item.owner.login}</Author>
                    </Info>
                  </>
                )}
              </Starred>
            )}
          />
        )}
      </Container>
    );
  }
}
