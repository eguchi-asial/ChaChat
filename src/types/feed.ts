import FeedItem from './feedItem';

export default interface Feed {
  copyright: string;
  description: string;
  generator: string;
  items: Array<FeedItem>;
  language: string;
  lastBuildDate: string;
  link: string;
  title: string;
  webMaster: string;
}
