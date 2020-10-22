import {
  game
} from './main.js';

export const first = {
  world: {

    columns: 24,
    rows: 14,
    tile_size: 14,

    map: [
      10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15,
      10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15,
      10, 0, 6, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 6, 0, 15,
      10, 0, 0, 12, 12, 12, 0, 0, 0, 0, 0, 0, 12, 12, 12, 0, 12, 12, 12, 0, 0, 0, 0, 15,
      10, 0, 0, 13, 13, 13, 0, 0, 8, 9, 0, 0, 13, 13, 13, 0, 13, 13, 13, 0, 0, 8, 0, 15,
      10, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 15,
      10, 0, 6, 0, 0, 0, 0, 0, 8, 9, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 15,
      10, 0, 0, 12, 12, 12, 0, 0, 0, 0, 0, 0, 12, 12, 12, 0, 12, 12, 12, 0, 0, 0, 0, 15,
      10, 0, 0, 13, 13, 13, 0, 0, 8, 9, 0, 0, 13, 13, 13, 0, 13, 13, 13, 0, 0, 0, 0, 15,
      10, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 14,
      10, 0, 6, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 6, 0, 0, 0, 0, 6, 0, 0, 14,
      10, 0, 0, 7, 7, 7, 0, 0, 0, 0, 0, 0, 7, 7, 7, 0, 7, 7, 7, 0, 0, 4, 4, 4,
      11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 4, 5, 4, 5, 4, 0, 0, 4, 4, 4, 4,
      2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
      2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2
    ],




    // 1 - salter, 2 - pod, 3 - PC, 4 - SS, 5 - daska, 6 - logo, 7 - slika, 8 - gornja, 9 - stepenice, 10 - levi, 11 - desni, 12 - donja, 13 - tabla, 14 - crno, 15 - prozor
  },

  collision: {

    1: function (object, row, column) {
      if (game.topCollision(object, row)) return;
    },


    2: function (object, row, column) {
      if (game.topCollision(object, row)) return;
      game.rightCollision(object, column);
    },


    3: function (object, row, column) {
      if (game.topCollision(object, row)) return;
      if (game.leftCollision(object, column)) return;
      game.rightCollision(object, column);
    },


    4: function (object, row, column) {
      if (game.topCollision(object, row)) return;
      if (game.leftCollision(object, column)) return;
      game.rightCollision(object, column);
    },


    5: function (object, row, column) {
      game.topCollision(object, row);
    },

    // Logo ````````````````````````````````````````````````````````````
    6: function (object, row, column) {

    },

    // Windows with bars
    7: function (object, row, column) {
      // No colission
    },

    // Air condition left
    8: function (object, row, column) {
      game.topCollision(object, row);
    },

    // Air condition right
    9: function (object, row, column) {
      game.topCollision(object, row);
    },

    // Gutter
    10: function (object, row, column) {
      if (game.topCollision(object, row)) {
        return;
      }
      game.rightCollision(object, column);
    },

    // Gutter bottom
    11: function (object, row, column) {
      if (game.topCollision(object, row)) {
        return;
      }
      game.rightCollision(object, column);
    },

    // Window upper side
    12: function (object, row, column) {
      // No colission
    },

    // Window bottom side
    13: function (object, row, column) {
      // No colission
    },

    // Door
    14: function (object, row, column) {


    },

    // Windows
    15: function (object, row, column) {

    },


  }
};







// // Text effect function
// var i = 0;
// let txt = 'Pritisni f11 za igru preko';  
// var speed = 100;

// function typeWriter() {
//   if (i < txt.length) {
//     mainText.innerHTML += txt.charAt(i);
//     i++;
//     setTimeout(typeWriter, speed);
//   }
//   setTimeout(() => {
//     mainText.innerHTML = '';  
// }, txt.length * speed + 1000); // Added +1000 because of unshow animation

// }

// setTimeout(() => {
//   typeWriter()
// }, 3000)