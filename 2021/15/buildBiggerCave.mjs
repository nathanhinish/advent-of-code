export default function buildBiggerCave(cave, tileInDimension) {
  const biggerCave = [];

  const NEW_HEIGHT = cave.length * tileInDimension;
  const NEW_WIDTH = cave[0].length * tileInDimension;

  for (let y = 0; y < NEW_HEIGHT; y++) {
    const oldY = y % cave.length;
    const row = cave[oldY];

    const addedYWeight = Math.floor(y / cave.length);

    const newRow = [];
    for (let addedXWeight = 0; addedXWeight < tileInDimension; addedXWeight++) {
      const addedWieght = addedYWeight + addedXWeight;
      newRow.push(
        ...row.map((v) => {
          v = v + addedWieght;
          if (v > 9) {
            v = v - 9;
          }
          return v;
        })
      );
    }
    biggerCave.push(newRow);
  }

  return biggerCave;
}
