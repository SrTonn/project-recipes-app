const filt
const [ingredientsList, measureList] = Object.entries(obj).reduce((acc, entries) => {
  if (entries.at(0).includes('strIngredient') && entries.at(1)) {
    return [[...acc.at(0), entries.at(1)], [...acc.at(1)]];
  }

  if (entries.at(0).includes('strMeasure') && entries.at(1)) {
    return [[...acc.at(0)], [...acc.at(1), entries.at(1)]];
  }

  return acc;
}, [[], []]);
console.log(ingredientsList);
console.log(measureList);

// console.log(ingredientsList.map((item, index) => `${item} - ${measureList.at(index)}`));
