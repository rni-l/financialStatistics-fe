export const getValueBetweenTwoTxt = (val: string, first: string, last: string) => {
  const regexp = new RegExp(`${first}[^${last}]+${last}`),
    _match = val.match(regexp);
  if (!_match || !_match[0]) return val;
  return _match[0].replace(new RegExp(`[${first}${last}]`, 'g'), '');
};
