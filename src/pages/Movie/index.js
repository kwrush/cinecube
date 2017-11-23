import './style.scss';

import React from 'react';
import PosterSection from 'components/PosterSection/index';
import SectionHeader from 'components/SectionHeader/index';
import ShutterPanel from 'components/ShutterPanel/index';

class Movie extends React.Component {
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
          <ShutterPanel />
        </PosterSection>
      </div>
    );
  }
}

export default Movie