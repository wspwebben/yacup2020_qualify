import { blockClasses } from './consts';

const trimAndSplit = del => str => str.trim().split(del);

const parseMap = map => trimAndSplit('\n')(map).map(trimAndSplit(''));

export let map = [];

export const setMap = (newMap) => map = newMap;

export const render = () => {
  const fragment = document.createDocumentFragment();

  map.forEach(row => {
    const rowElem = document.createElement('div');
    rowElem.className = 'row';

    row.forEach(cell => {
      const element = document.createElement('div');
      element.className = 'cell ' + blockClasses[cell];

      rowElem.appendChild(element);
    })
    fragment.appendChild(rowElem);
  })

  const container = document.querySelector('.map');
  container.innerHTML = '';
  container.appendChild(fragment);
}

export const initMap = (mapSource) => {
  map = parseMap(mapSource);
  render();
};
