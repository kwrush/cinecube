import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import PosterBanner from '../index';
import PosterBox from '../../PosterBox';

const mockData = [
  {
    "id": 383498,
    "mediaType": "movie",
    "title": "Deadpool 2",
    "posterUrl": "/a.jpg",
  },
  {
    "id": 335984,
    "mediaType": "movie",
    "title": "Blade Runner 2049",
    "posterUrl": "/b.jpg",
  },
  {
    "id": 353081,
    "mediaType": "movie",
    "title": "Mission: Impossible - Fallout",
    "posterUrl": "/c.jpg",
  }
];


describe('Test <PosterBanner />', () => {

  it('should render poster bannner properly', () => {
    const wrapper = mount(
      <MemoryRouter>
        <PosterBanner
          title="Movie"
          items={mockData}
        />
      </MemoryRouter>
    );

    expect(wrapper.find(PosterBox)).toHaveLength(3);
    expect(wrapper.find('a[href="/movie/383498"]')).toHaveLength(1);
  });
});