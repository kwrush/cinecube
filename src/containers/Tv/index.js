import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';

import { tvDomains } from 'constants/domains';
import { getPopularTvs, get, getOnAirTvs } from 'selectors/tvSelectors';
import { tvActionTypes as actionTypes } from 'constants/actionTypes';
import { fetchTvShowsIfNeeded } from 'actions/tvActions';
import { mapToCssModules } from 'utils/helpers';

import LoadingHOC from 'components/LoadingHOC/index';
import SectionContainer from 'components/SectionContainer/index';
import SectionHeader from 'components/SectionHeader/index';
import PosterPanel from 'components/PosterPanel/index';

const mapStateToProps = (state) => {
  return {
    popularTvShows: getPopularTvs(state).slice(0, 8),
    onAirTvShows: getOnAirTvs(state).slice(0, 8)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadPopularTvShows: () => dispatch(fetchTvShowsIfNeeded(actionTypes.FETCH_POPULAR_TV_REQUEST)),
    loadOnAirTvShows: () => dispatch(fetchTvShowsIfNeeded(actionTypes.FETCH_ON_AIR_TV_REQUEST)),
  };
};

const PosterPanelHOC = LoadingHOC(PosterPanel);

const Tv = (props) => {
  
  const { 
    popularTvShows, 
    onAirTvShows,
    loadOnAirTvShows,
    loadPopularTvShows,
    className,
    cssModule
  } = props;

  const classes = mapToCssModules(className, cssModule);
  
  return (
    <Container className={classes}>
      <SectionContainer>
        <SectionHeader
          title="Popular"
          url={tvDomains.popular}
        />
        <PosterPanelHOC
          items={popularTvShows}
          loadData={loadPopularTvShows}
          domain={tvDomains.info}
          posterSize={'m'}
          columns={8}
        />
      </SectionContainer>
      <SectionContainer>
        <SectionHeader
          title="On Air"
          url={tvDomains.onAir}
        />
        <PosterPanelHOC
          items={onAirTvShows}
          loadData={loadOnAirTvShows}
          domain={tvDomains.info}
          posterSize={'m'}
          columns={8}
        />
      </SectionContainer>
    </Container>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Tv);