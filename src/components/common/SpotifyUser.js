import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as spotifyActions from '../../actions/spotifyActions';

class SpotifyUser extends Component {
  componentDidMount () {
    const { params } = this.props;
    const { accessToken, refreshToken } = params;
    this.props.actions.setTokens({ accessToken, refreshToken });
    this.props.actions.getUserInfo();
  }

  render () {
    const { accessToken, refreshToken, user } = this.props;
    const { loading, display_name, images, id, email, external_urls, href, country, product } = user;
    const imageUrl = images[0] ? images[0].url : '';
    // if we're still loading, indicate such
    if (loading) {
      return <h2>Loading...</h2>;
    }
    return (
      <div className='spotify-user'>
        <h2>{`Logged in as ${display_name}`}</h2>
        <div className="user-content">
          <img src={imageUrl} />
          <ul>
            <li><span>Display name</span><span>{display_name}</span></li>
            <li><span>Id</span><span>{id}</span></li>
            <li><span>Email</span><span>{email}</span></li>
            <li><span>Spotify URI</span><span><a href={external_urls.spotify}>{external_urls.spotify}</a></span></li>
            <li><span>Link</span><span><a href={href}>{href}</a></span></li>
            <li><span>Profile Image</span><span><a href={imageUrl}>{imageUrl}</a></span></li>
            <li><span>Country</span><span>{country}</span></li>
            <li><span>Product</span><span>{product}</span></li>
          </ul>
        </div>
      </div>
    );
  }
}

SpotifyUser.propTypes = {
  params: PropTypes.object,
  accessToken: PropTypes.string,
  refreshToken: PropTypes.string,
  user: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(spotifyActions, dispatch)
  };
};

export default connect(mapDispatchToProps)(SpotifyUser);
