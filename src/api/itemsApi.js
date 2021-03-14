import * as axios from 'axios';

const url = 'https://run.mocky.io/v3/5c5ca647-f9a6-46a4-9ae2-6cd95621e9e9'

const fecthKettles = async () => {
  const response = await axios.get(url);
  return (response.data.kettles)
};

const fetchKettleById = async (id) => {
  const response = await axios.get(url);
  const kettle = response.data.kettles.filter(kettle => kettle.id === id);
  return kettle[0];
};

export const itemsApi = {
  fecthKettles,
  fetchKettleById
};