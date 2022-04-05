const formatTitle = (input) => {
  if (input.match(/\//g).length > 2) {
    input = input.replace(/(?<!^)\/\w+/, '');
  }
  return input
    .replace(/((\/|-)\w?)/g,
      (_, firstLetter) => ` ${firstLetter[1]?.toUpperCase() || ''}`)
    .trim();
};

export default formatTitle;
