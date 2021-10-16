isString = value => typeof value === 'string' || value instanceof String;
documentIsLoading = () => document.readyState == 'loading';
objectToQueryString = object => Object.entries(object).map(([key, value]) => `${key}=${value}`).join('$');
toCamelCase = value => value.replace(/(-[a-z])/, g => g.replace('-', '').toUpperCase());

module.exports = { isString, documentIsLoading, objectToQueryString, toCamelCase }