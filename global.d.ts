import en from './dictionaries/en.json';

type Messages = typeof en;

declare global {
  interface IntlMessages extends Messages {}
}
