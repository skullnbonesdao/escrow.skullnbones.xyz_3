import { format } from 'v-money3';

const format_options = {
  debug: false,
  masked: false,
  prefix: '',
  suffix: '',
  thousands: ',',
  decimal: '.',
  precision: 2,
  disableNegative: true,
  disabled: false,
  min: null,
  max: null,
  allowBlank: false,
  minimumNumberOfCharacters: 0,
  modelModifiers: {
    number: false,
  },
  shouldRound: true,
  focusOnRight: false,
};

export function format_number(number: number, precision = 2): string {
  format_options.precision = precision;
  return format(number, format_options);
}
