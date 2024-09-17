import { Locale } from '@/i18n/settings';

const CURRENCY_FORMATTER = new Intl.NumberFormat('pt', {
  currency: 'EUR',
  style: 'currency',
  minimumFractionDigits: 0,
});

export function formatCurrency(amount: number) {
  return CURRENCY_FORMATTER.format(amount);
}

const NUMBER_FORMATTER = new Intl.NumberFormat('pt');

export function formatNumber(number: number) {
  return NUMBER_FORMATTER.format(number);
}

export function formatDate(date: Date, locale: Locale) {
  const dateFormatter = new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
  });

  return dateFormatter.format(date);
}
