import { Category } from '@/types/category';
import axios from 'axios';

export async function fetchGoogleNewsFeed() {
  const { data } = await axios.get(`/${Category.GOOGLE_NEWS}`);
  return data;
}

export async function fetchHatenaFeed() {
  const { data } = await axios.get(`/${Category.HATENA}`);
  return data;
}

export async function fetchClassmethodFeed() {
  const { data } = await axios.get(`/${Category.CLASSMETHOD}`);
  return data;
}

export async function fetchITMediaFeed() {
  const { data } = await axios.get(`/${Category.ITMEDIA}`);
  return data;
}

export async function fetchWebCreatorFeed() {
  const { data } = await axios.get(`/${Category.WEBCREATOR}`);
  return data;
}

export async function fetchZennFeed() {
  const { data } = await axios.get(`/${Category.ZENN}`);
  return data;
}
