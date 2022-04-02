const reduceIngredients = (data) => Object.entries(data)
  .reduce((acc, entries, index, arr) => {
    if (entries[0].includes('strIngredient') && entries[1]) {
      return [[...acc[0], entries[1]], [...acc[1]]];
    }

    if (entries[0].includes('strMeasure') && entries[1]) {
      return [[...acc[0]], [...acc[1], entries[1]]];
    }

    if (arr.length - 1 === index) {
      return acc[0]
        .map((item, mapIndex) => `${item} - ${acc[1][mapIndex]}`.trim())
        .filter((value) => !value.includes('undefined'));
    }

    return acc;
  }, [[], []]);

export default reduceIngredients;
