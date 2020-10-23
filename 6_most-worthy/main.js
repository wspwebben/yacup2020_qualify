import equal from 'deep-equal';
import solution from './solution';

function assert(input, expected) {
  const result = solution(input);

  if (equal(result, expected)) {
    console.log('Succesful with ', input, 'expected', expected, 'got', result);
  } else {
    console.error('Error with ', input, 'expected', expected, 'got', result);
  }
}

//

const input = {
  // абсолютный путь до дирректории проекта в файловой системе
  absoluteRepoPath: '/var/www/projects/project1',
  // список алиасов по путям из исходной системы сборки
  aliases: {
    '@': '/var/www/projects/project1/src',
  },
  // список всех входных точек приложения
  entrypoints: [
    '/var/www/projects/project1/src/pages/a.js',
    '/var/www/projects/project1/src/pages/b.js',
  ],
  // информация о всех модулях данного проекта
  modules: [
    {
      // относительный от корня путь
      file: './src/pages/a.js',
      deps: [
        // валидная для исходной системы сборки строка, описывающая путь до модуля
        // гарантируется, что такой модуль существует и описан в данной секции
        '/var/www/projects/project1/src/a.js',
      ],
    },
    {
      file: './src/pages/b.js',
      deps: ['@/a.js'],
    },
    {
      file: './src/a.js',
      deps: [],
    },
    {
      file: './src/f.js',
      deps: [],
    },
    {
      file: './src/g.js',
      deps: [],
    },
  ],
};

const output = [
  '/var/www/projects/project1/src/f.js',
  '/var/www/projects/project1/src/g.js',
];

//

assert(input, output);
