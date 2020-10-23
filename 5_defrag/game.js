import { DIRECTION, BLOCK } from './consts';
import { map, setMap } from './map';

const figures = [BLOCK.MOVING_FIRST, BLOCK.MOVING_SECOND];

const isFigure = (cell) => figures.includes(cell);
const isHorizontal = (figure) => figure.direction === DIRECTION.HORIZONTAL
const setFixed = (cell) => cell.toUpperCase();

const getFromMap = (point) => {
  const [x, y] = point;
  return map[y][x];
}

const setOnMap = (point, figure) => {
  const [x, y] = point;
  map[y][x] = figure;
}

const setFigureOnMap = (figure) => (point) => setOnMap(point, figure);

const getPoints = (figure) => {
  const [x, y] = figure.center;

  if (isHorizontal(figure)) {
    return [
      [x - 1, y],
      [x, y],
      [x + 1, y]
    ]
  }
  
  return [
    [x, y - 1],
    [x, y],
    [x, y + 1]
  ]
}

const findFigure = () => {
  

  for (let y = 0; y < map.length; y += 1) {
    const row = map[y];
    const x = row.findIndex(isFigure);
    
    if (x >= 0) {
      const nextInRow = row[x + 1];
      
      if (isFigure(nextInRow)) {
        return {
          center: [x + 1, y],
          direction: DIRECTION.HORIZONTAL
        }
      } else {
        return {
          center: [x, y + 1],
          direction: DIRECTION.VERTICAL
        }
      }
    }
  }
}

export const createNewBlock = () => {
  
}

export const checkCollision = () => {
  const figure = findFigure();
  const points = getPoints(figure);
  const [high, center, low] = points;
  const fixedBlock = setFixed(getFromMap(center));
  
  if (isHorizontal(figure)) {
    const newPoints = points.map(([x, y]) => [x, y + 1]);
    if (newPoints.some(point => getFromMap(point) !== BLOCK.EMPTY)) {
      points.forEach(setFigureOnMap(fixedBlock));
      createNewBlock();
    }
  } else {
    const [x, y] = low;
    if(getFromMap([x, y + 1]) !== BLOCK.EMPTY) {
      points.forEach(setFigureOnMap(fixedBlock));
      createNewBlock();
    }
  }
}

export const goDown = () => {
  const figure = findFigure();
  const points = getPoints(figure);
  const [high, center, low] = points;
  const currentColor = getFromMap(center);

  if (isHorizontal(figure)) {
    const newPoints = points.map(([x, y]) => [x, y + 1]);
    points.forEach(setFigureOnMap(BLOCK.EMPTY));
    newPoints.forEach(setFigureOnMap(currentColor));
  } else {
    setOnMap(high, BLOCK.EMPTY);

    const [x, y] = low;
    setOnMap([x, y + 1], currentColor)
  }
  checkCollision();
}

export const goLeft = () => {
  const figure = findFigure();
  const [x, y] = figure.center;
  const currentColor = getFromMap(figure.center);
  const offset = 1 + isHorizontal(figure);

  if (getFromMap([x - offset, y]) !== BLOCK.WALL) {
    const points = getPoints(figure);
    const newPoints = points.map(([x, y]) => [x - 1, y]);
    points.forEach(setFigureOnMap(BLOCK.EMPTY));
    newPoints.forEach(setFigureOnMap(currentColor));
  }

  goDown();
}


export const goRight = () => {
  const figure = findFigure();
  const [x, y] = figure.center;
  const currentColor = getFromMap(figure.center);
  const offset = 1 + isHorizontal(figure);

  if (getFromMap([x + offset, y]) !== BLOCK.WALL) {
    const points = getPoints(figure);
    const newPoints = points.map(([x, y]) => [x + 1, y]);
    points.forEach(setFigureOnMap(BLOCK.EMPTY));
    newPoints.forEach(setFigureOnMap(currentColor));
  }

  goDown();
}

export const switchFigure = () => {
  const figure = findFigure();
  const points = getPoints(figure);

  if (isHorizontal(figure)) {
    points.reverse();
  }

  const [high, center, low] = points;

  const currentBlock = getFromMap(center);
  setOnMap(high, BLOCK.EMPTY);
  setOnMap(low, BLOCK.EMPTY);

  const newHigh = [
    high[0] - 1,
    high[1] + 1,
  ];
  const newLow = [
    low[0] + 1,
    low[1] - 1,
  ];
  setOnMap(newHigh, currentBlock);
  setOnMap(newLow, currentBlock);
}

export const switchColor = () => {
  const figure = findFigure();
  const points = getPoints(figure);

  const currentColor = getFromMap(figure.center);
  const currentColorIndex = figures.indexOf(currentColor);
  const nextColor = figures[1 - currentColorIndex];

  points.forEach(setFigureOnMap(nextColor));
}
