import axios from 'axios';

export async function getRandomUserImage() {
  const { data } = await axios.get('https://randomuser.me/api/');

  return data.results[0].picture.thumbnail;
}
