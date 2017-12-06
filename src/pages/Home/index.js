import './style.scss';

import React from 'react'
import SectionContainer from 'components/SectionContainer/index';
import SectionHeader from 'components/SectionHeader/index';
import CardPanel from 'components/CardPanel/index';

class Home extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className="wrap">
        <SectionContainer>
          <SectionHeader
            title="Movies"
            url="/movie/popular"
          />
          <CardPanel />
        </SectionContainer>
        <SectionContainer>
          <SectionHeader
            title="TV shows"
            url="/tv/popular"
          />
          <CardPanel />
        </SectionContainer>
      </div>
    );
  }
}

export default Home