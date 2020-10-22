import {
  game
} from './main.js';

export const third = {

  world: {

    columns: 24,
    rows: 14,
    tile_size: 14,

    map: [
      14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14,
      14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14,
      14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14,
      14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14,

      0, 0, 0, 0, 15, 0, 0, 15, 0, 0, 15, 0, 0, 15, 0, 0, 15, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 9, 9, 9, 0, 9, 9, 9, 0, 0, 6, 0, 0, 9, 9, 9, 0, 0, 0, 5, 0,
      3, 0, 0, 0, 13, 13, 13, 0, 13, 13, 13, 0, 0, 0, 0, 0, 13, 13, 13, 0, 0, 0, 8, 0,
      1, 0, 4, 0, 10, 11, 0, 10, 11, 0, 10, 11, 0, 10, 11, 0, 10, 11, 0, 0, 4, 0, 12, 0,
      2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,

      14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14,
      14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14,
      14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14,
      14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14,

    ],




    // 1 - salter, 2 - pod, 3 - PC, 4 - SS, 5 - daska, 6 - logo, 7 - slika, 8 - gornja, 9 - prozor gore, 10 - levi, 11 - desni, 12 - donja, 13 - prozor dole, 14 - crno, 15 - prozor
  },

  ////////////////////////////////////////////////////////////////////////////
  collision: {

    1: function (object, row, column) {
      if (game.topCollision(object, row)) return;
    },

    // pod
    2: function (object, row, column) {
      if (game.topCollision(object, row)) return;
      game.rightCollision(object, column);
    },

    // PC
    3: function (object, row, column) {
      // if (game.topCollision(object, row)) return;
      // if (game.leftCollision(object, column)) return;
      // game.rightCollision(object, column);
    },

    // SS
    4: function (object, row, column) {

    },

    // daska
    5: function (object, row, column) {
      game.topCollision(object, row);
    },

    // Logo ````````````````````````````````````````````````````````````
    6: function (object, row, column) {

    },

    // slika
    7: function (object, row, column) {
      // No colission
      game.topCollision(object, row);
    },

    // gornja vrata
    8: function (object, row, column) {
      // game.topCollision(object, row);
    },

    // stepenice
    9: function (object, row, column) {
      // game.topCollision(object, row);
    },

    // levi sto
    10: function (object, row, column) {
      game.topCollision(object, row)
    },

    // desni sto
    11: function (object, row, column) {
      //game.topCollision(object, row)
    },

    // donja vrata
    12: function (object, row, column) {
      // No colission
    },

    // tabla 
    13: function (object, row, column) {
      // game.topCollision(object, row);
    },

    // crno
    14: function (object, row, column) {

      if (game.topCollision(object, row)) return;
      if (game.leftCollision(object, column)) return;
      game.rightCollision(object, column);

    },

    // prozor
    15: function (object, row, column) {

    },
  }
};

