import axios from 'axios';

export async function fetchNewsFeed() {
  const { data } = await axios.get('/news-feed');
  return data;
}
