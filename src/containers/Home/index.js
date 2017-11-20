import './style.scss';

import React from 'react'
import PosterSection from 'components/PosterSection/index';
import SectionHeader from 'components/SectionHeader/index';
import CardPanel from 'components/CardPanel/index';

class Home extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className="wrap">
        <PosterSection>
          <SectionHeader
            title="Movies"
            url="/movie/popular"
          />
          <CardPanel />
        </PosterSection>
        <PosterSection>
          <SectionHeader
            title="TV shows"
            url="/tv/popular"
          />
          <CardPanel />
        </PosterSection>
      </div>
    );
  }
}

export default Home