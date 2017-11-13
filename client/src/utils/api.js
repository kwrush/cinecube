import axios from 'axios';
import { API_KEY, API_URL, LANG } from '../constants/appContants';

export const searchMovie = async (query, option) => {
  option = Object.assign(
    {
      page: 1,
      region: '',
      year: ''
    }, option);

  return axios.get(API_URL 
    + `search/movie?api_key=${API_KEY}&language=${LANG}&query=${query}&page=${option.page}&region=${option.region}&year=${option.year}`
  )
  .then(res => res.data);
}
