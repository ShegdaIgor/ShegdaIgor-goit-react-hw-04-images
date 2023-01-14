import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '31796661-d78e1c08e6ba05d0253f19feb';

const getImagesInstance = axios.create({
  baseURL: BASE_URL,
  params: {
    key: KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: '12',
  },
});

export const pixabayGetImages = async (query, page) => {
  const { data } = await getImagesInstance.get(`?q=${query}&page=${page}`);
  return data;
};
