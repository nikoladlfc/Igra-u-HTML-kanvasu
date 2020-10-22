"use strict"

import {
  first
} from './first.js';

import {
  second
} from './second.js';

import {
  third
} from './third.js';

// VARIABLES ````````````````````````````````````````
const name = document.querySelector('.name');
const start = document.querySelector('.start');
const logotype = document.querySelector('.logotype');
const desc = document.querySelector('.desc');
const loaderWrap = document.querySelector('.loader-wrap');
const loader = document.querySelector('.loader');
const endLogo = document.querySelector('.end_logo');
const fadingScreen = document.querySelector('.fading_screen');
const endScreen = document.querySelector('.end_screen');
const endTextWrap = document.querySelector('.end_text_wrap');
const endText = document.querySelector('.end_text');
const coinsDOM = [...document.querySelectorAll('.coins img')]
const mainText = document.querySelector('.paragraph');

let active = true;
let coinCount = 0;
let lightCount = 0;
let opacity = 0;
let controller, display, map_index, tile_value, level, leftPosition, midHeight; 

// LEVEL INDETIFIER ``````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````

if (window.location.href.indexOf("index") != -1) {
  level = first;
  leftPosition = true;
  midHeight = false;
} else if (window.location.href.indexOf("second") != -1) {
  level = second;
  leftPosition = false;
  midHeight = false;
} else if (window.location.href.indexOf("third") != -1) {
  leftPosition = true;
  level = third;
  midHeight = true;

}

// EFFECTS ``````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````

const fadeIn = (element) => {
  element.classList.remove('fadeout')
  element.classList.add('fadein')
}

const fadeOut = (element) => {
  element.classList.remove('fadein')
  element.classList.add('fadeout')
}

// Fade in and out text
function showText() {
  let txt = getText();
  mainText.innerHTML = txt;
  fadeIn(mainText)

  setTimeout(() => {
    fadeOut(mainText)
  }, 5000);
}

// Typewriter effect
const getText = () => {
  if (level === first) {
    return 'Pritisni F11 za igru preko celog ekrana' ;
  } else if (level === second) {
    return 'Idi na salter studentske sluzbe';  
  } else if (level === third) {
    return  'Nadji nacin da izadjes iz kabineta';  
  }
}

var i = 0;
var txt = 'HVALA NA PAZNJI';
var speed = 100;

function typeWriter() {
  if (i < txt.length) {
    endText.innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

// SCREEN CHANGES FUNCTIONS --------------------------------------------------------------------------------------------------------------------------------------------------------------
const showLoader = () => {
  fadeIn(loaderWrap)
  fadeIn(loader)
}

const hideLoader = () => {
  setTimeout(() => {
    fadeOut(loader);
    setTimeout(() => {
      fadeOut(loaderWrap);
    }, 500);
  }, 500);
}

const endGame = () => {
  fadeIn(endScreen);
  active = false;
  endLogo.classList.add('end_logo_animation')

  setTimeout(() => {
    fadeIn(endLogo)
    endLogo.addEventListener("animationend", () =>  endLogo.classList.add('end_logo_scale'));
    setTimeout(() => {
      fadeIn(endTextWrap)
      typeWriter()
    }, 2000);
  }, 2000);
}

// START SCREEN LEVEL 1
if (level === first) {
  setTimeout(() => {
    fadeIn(logotype);
    setTimeout(() => { 
      fadeIn(name);
      setTimeout(() => {    
        fadeIn(desc)
        setTimeout(() => {
          fadeIn(start)
        }, 2000);
      }, 2000);
    }, 2000);
  }, 2000);

  window.addEventListener("keydown", (event) => {
    if (event.keyCode === 32
      ) {
      startup.style.display = 'none';
      setTimeout(() => {
        hideLoader();
        setTimeout(() => {
          if (level === first) showText();
        }, 4000);
      }, 500);
    }
  });
}


if (level === second || level === third) {
  hideLoader();
  if (level === third) {
    showText()
  }
}

// ANMATION --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Moving animation for player
const Animation = function(frame_set, delay) {
    this.count = 0;
    this.delay = delay;
    this.frame = 0;
    this.frame_index = 0;
    this.frame_set = frame_set; 
}

Animation.prototype = {

  change: function(frame_set, delay = 15) {
    if (this.frame_set != frame_set) {
      this.count = 0;
      this.delay = delay;
      this.frame_index = 0;
      this.frame_set = frame_set;
      this.frame = this.frame_set[this.frame_index];
    }
  },

  update: function() {
    this.count++;
    if (this.count >= this.delay) {
      this.count = 0;

      this.frame_index = (this.frame_index == this.frame_set.length - 1) ? 0 : this.frame_index + 1;
      this.frame = this.frame_set[this.frame_index]; // Change the current frame value.
    }
  }
}



// NPC LOGIC --------------------------------------------------------------------------------------------------------------------------------

var secondLevel_set = new Image();
var thirdLevel_set = new Array();
thirdLevel_set[0] = new Image();
thirdLevel_set[1] = new Image();
thirdLevel_set[2] = new Image();
var boss_set = new Image();
var SPRITE_SIZE = 16;
var map_columns = 24;
var floor = level === second ? 96 : 110;
var friction = 0.9;

// NPC class
const NPC = function (x, y, old_x, behavior) {
  this.x = x;
  this.y = y;
  this.old_x = old_x;
  this.behavior = behavior;
  this.animation = new Animation();
};

NPC.prototype.behave = function () {
  this.behavior(this);
}

const Enemy = function (x, y, behavior) {
  NPC.call(this, x, y, 307, behavior);
  this.vx = 0;
  this.destination_x = x;

}

// Object collision detection and response
Enemy.prototype = {

  // Enemy rectangle
  get bottom() { return this.y + SPRITE_SIZE; },
  get left() { return this.x; },
  get right() { return this.x + 5; },
  get top() { return this.y; },

  testCollision:function(player) {
    if (this.top > player.bottom || this.right < player.left || this.bottom < player.top || this.left > player.right) {
     return false;    
    } else {
      const caught = document.querySelector('.caught');
      caught.play();
      setTimeout(() => {
        location.reload();  
      }, 350);
      return true;
    }
  }
};

Object.assign(Enemy.prototype, NPC.prototype);

// Creating enemies
const enemyScndLvl = new Enemy(64, floor, npcBehavior);
const enemiesThirdLvl = [
  new Enemy(160, floor, npcBehavior),
  new Enemy(220, floor, npcBehavior),
  new Enemy(270, floor, npcBehavior),
]
const boss = new Enemy(307, floor, npcBehavior);

// Behave function ``````````````````````````````````````````````````````````````````````````````````````````````````````
function npcBehavior(npc) {
  let d = npc.destination_x - npc.x;
  npc.vx += d * 0.1;

 // Walking control (SECOND level)
 if (level === second) {
    if (npc.x < SPRITE_SIZE * 5) {
      npc.destination_x =( map_columns - 6) * SPRITE_SIZE
    } else if (npc.x > (map_columns - 6) * SPRITE_SIZE  ) {
      npc.destination_x = SPRITE_SIZE * 5
    }
 }
 // Walking control (THIRD level)
 if (level === third) {
  if (d * d < 1000) npc.destination_x = Math.random() * (map_columns) * SPRITE_SIZE - 2 * SPRITE_SIZE;
 }

  // Velocity controll
  if (npc.vx > 0.9) npc.vx = 0.9;
  else if (npc.vx < -0.9) npc.vx = -0.9;
  npc.x += npc.vx;
  npc.vx *= friction;

  
  if (lightCount < 1) {
    boss.animation.change(game.sprite_sheet.frame_sets[0], 10);

  }
  
  // Enemy animaton
  if (npc.old_x > npc.x) {
    npc.animation.change(game.sprite_sheet.frame_sets[2], 7);

  } else if (npc.old_x < npc.x) {
    npc.animation.change(game.sprite_sheet.frame_sets[1], 7);
  } else if (npc.old_x === npc.x) {

  }
  npc.old_x = npc.x;
}


// LEVEL CONTROL ----------------------------------------------------------------------------------------------------------------------------------------------------------------

const levelControll = (value) => {
  const map = second.world.map;
  // Logo
  if (level === first || level === second) {
    if (value === 6) {
      coinCount++;
      level.world.map[map_index] = 0;

      const coin = document.querySelector(`.coin`);
      coin.currentTime = 0;
      coin.play();
    } 

    coinsDOM.slice(0, coinCount).forEach(e => {
      e.src = 'assets/img/Logo.png'
    });
    

  }

  // Changing levels - entering doors ````````````````````````````````````````````
  if (level === first && value === 14 && coinCount === 10) {
    coinCount = 0;
    loaderWrap.classList.remove('fadeout')
    loaderWrap.classList.add('fadein')
    showLoader();
    // Removes collected coin on graphic
    coinsDOM.slice(0, coinCount).forEach(e => {
      e.src = 'assets/img/logo_bw.png'
    });
    window.location.href = 'second.html';
  }

  // 2 LEVEL ````````````````````````````````````````````````````````````
  if (level === second) {
    if (coinCount === 10) {
      second.world.map[281] = 4;
      showText()

      if (value === 4) {
        showLoader();
        window.location.href = 'third.html';
      }
    }
    // Library reveal
    if (value === 15) {
      const reveal = document.querySelector('.reveal');
      reveal.currentTime = 0;
      reveal.play();
      
      map[6] = 0;
      map[7] = 0;
      map[8] = 0;
      map[9] = 0;
      map[30] = 0;
      map[31] = 0;
      map[32] = 0;
      map[33] = 0;
      map[54] = 0;
      map[57] = 0;
      map[31] = 3;
      map[32] = 6;
      map[55] = 10;
      map[56] = 11;
      map[5] = 13;
      map[29] = 13;
      map[53] = 13;
    }
  }


  // 3 LEVEL ````````````````````````````````````````````````````````````````````
  if (level === third) {
    

    if(value === 15) {
      level.world.map[map_index] = 0;
      lightCount ++;

      // Transparency drop
      opacity += 0.17;
      fadingScreen.style.opacity = opacity;
  
      // Glass sound
      const glass = document.querySelector('.glass');
      glass.currentTime = 0;
      glass.play();
    }

    if (lightCount === 5) {
      boss.behave();
      third.world.map[190] = 7;
      third.world.map[214] = 7;

      if (tile_value === 7) {
        // Function called when game is finished
        endGame();
      }
    }


  }  

}

// CONTROLLER OBJECT ----------------------------------------------------------------------------------------------------------------

controller = {

  left: {
    active: false,
    state: false
  },
  right: {
    active: false,
    state: false
  },
  up: {
    active: false,
    state: false
  },

  keyUpDown: function (event) {

    var key_state = (event.type == "keydown") ? true : false;
    switch (event.keyCode) {
      case 37: // left key
        if (controller.left.state != key_state) controller.left.active = key_state;
        controller.left.state = key_state; // Always update the physical state.
        break;
      case 38: // up key
        if (controller.up.state != key_state) controller.up.active = key_state;
        controller.up.state = key_state;
        break;
      case 39: // right key
        if (controller.right.state != key_state) controller.right.active = key_state;
        controller.right.state = key_state;
        break;
    }
  },

  movement: function () {

    // Jump player
    if (controller.up.active && !game.player.jumping) {
      controller.up.active = false;
      game.player.jumping = true;

      if (level === first) {
        game.player.velocity_y -= 10; // Jump height 10
      } else if (level === second) {
        game.player.velocity_y -= 6; // Jump height 6
      } else if (level === third) {
        game.player.velocity_y -= 13;
      }

      // Jump sound
      const jump = document.querySelector('.jump');
      jump.currentTime = 0;
      jump.play();
    }

    // Move left
    if (controller.left.active) {
      game.player.animation.change(game.sprite_sheet.frame_sets[2], 5);
      game.player.velocity_x -= 0.2;
    }

    // Move right
    if (controller.right.active) {
      game.player.animation.change(game.sprite_sheet.frame_sets[1], 5);
      game.player.velocity_x += 0.2;
    }

    // Player stop
    if (!controller.left.active && !controller.right.active) {
      game.player.animation.change(game.sprite_sheet.frame_sets[0], 20);
    }

    game.player.velocity_y += 0.4;
    game.player.old_x = game.player.x;
    game.player.old_y = game.player.y;
    game.player.x += game.player.velocity_x;
    game.player.y += game.player.velocity_y;
    game.player.velocity_x *= 0.8;
    game.player.velocity_y *= 0.8;

    if (game.player.x < 0) {
      game.player.velocity_x = 0;
      game.player.old_x = game.player.x = 0;

    } else if (game.player.x + game.player.width > display.buffer.canvas.width) {
      game.player.velocity_x = 0;
      game.player.old_x = game.player.x = display.buffer.canvas.width - game.player.width;
    }

    if (game.player.y < 0) {
      game.player.velocity_y = 0;
      game.player.old_y = game.player.y = 0;

    } else if (game.player.y + game.player.height > display.buffer.canvas.height) {
      game.player.velocity_y = 0;
      game.player.old_y = game.player.y = display.buffer.canvas.height - game.player.height;
    }
  }
};


// GAME OBJECT --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const game = {

  player: {
    animation: new Animation(),
    height: 16,
    width: 16,
    jumping: false,
    old_x: 160,
    old_y: 160,
    velocity_x: 0,
    velocity_y: 0,
    x: leftPosition ? 20 : 300,
    y: midHeight ? 90 : 150
  },

  sprite_sheet: {
    frame_sets: [
      [0, 1],
      [2, 3],
      [4, 5]
    ],
    image: new Image()
  },


  // Collision methods ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  leftCollision(object, column) {
    if (object.velocity_x > 0) {
      let left = column * second.world.tile_size;
      if (object.x + object.width * 0.5 > left && object.old_x <= left) {
        object.velocity_x = 0;
        object.x = object.old_x = left - object.width * 0.5 - 0.01;
        return true;
      }
    }
    return false;
  },

  rightCollision(object, column) {
    if (object.velocity_x < 0) {
      let right = (column + 1) * second.world.tile_size;
      if (object.x + object.width * 0.5 < right && object.old_x + object.width * 0.5 >= right) {
        object.velocity_x = 0;
        object.old_x = object.x = right - object.width * 0.5;
        return true;
      }
    }
    return false;
  },

  topCollision(object, row) {
    if (object.velocity_y > 0) {
      let top = row * second.world.tile_size;
      if (object.y + object.height > top && object.old_y + object.height <= top) {
        object.jumping = false;
        object.velocity_y = 0;
        object.old_y = object.y = top - object.height - 0.01;
        return true;
      }
    }
    return false;
  },
};

// DISPLAY OBJECT --------------------------------------------------------------------------------------------------------------------------------------------------------------

display = {

  buffer: document.createElement("canvas").getContext("2d"),
  context: document.querySelector("canvas").getContext("2d"),
  output: document.querySelector("p"),

  tile_sheet: {
    image: new Image(),
    columns: 4,
    tile_height: 14,
    tile_width: 14
  },

  render: function () {

    for (let index = level.world.map.length - 1; index > -1; --index) {
     // this.buffer.fillRect((index % level.world.columns) * level.world.tile_size, Math.floor(index / level.world.columns) * level.world.tile_size, level.world.tile_size, level.world.tile_size);
      var value = level.world.map[index];
      // This is the x and y location at which to cut the tile image out of the tile_sheet.image
      var source_x = (value % this.tile_sheet.columns) * this.tile_sheet.tile_width;
      var source_y = Math.floor(value / this.tile_sheet.columns) * this.tile_sheet.tile_height;
      // This is the x and y location at which to draw the tile image we are cutting from the tile_sheet.image to the buffer canvas
      var destination_x = (index % level.world.columns) * this.tile_sheet.tile_width;
      var destination_y = Math.floor(index / level.world.columns) * this.tile_sheet.tile_height;
      // Draw the tile image to the buffer. The width and height of the tile is taken from the tile_sheet object
      this.buffer.drawImage(this.tile_sheet.image, source_x, source_y, this.tile_sheet.tile_width, this.tile_sheet.tile_height, destination_x, destination_y, this.tile_sheet.tile_width, this.tile_sheet.tile_height);
    }

    //context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);

    // Draw enemies
    if (level === second ) {
      this.buffer.drawImage(secondLevel_set, enemyScndLvl.animation.frame * SPRITE_SIZE, 0, SPRITE_SIZE, SPRITE_SIZE, Math.round(enemyScndLvl.x), Math.round(enemyScndLvl.y), SPRITE_SIZE, SPRITE_SIZE);
    } else if (level === third ) {

      // Draw array of enemies
      for (let i = 0; i < enemiesThirdLvl.length; i++) {
        const element = enemiesThirdLvl[i]; 
        this.buffer.drawImage(thirdLevel_set[i], element.animation.frame * SPRITE_SIZE, 0, SPRITE_SIZE, SPRITE_SIZE, Math.round(element.x), Math.round(element.y), SPRITE_SIZE, SPRITE_SIZE);
        element.behave(); 
      }

      // Draw boss
      this.buffer.drawImage(boss_set, boss.animation.frame * SPRITE_SIZE, 0, SPRITE_SIZE, SPRITE_SIZE, Math.round(boss.x), Math.round(boss.y), SPRITE_SIZE, SPRITE_SIZE);

    }
    
    enemyScndLvl.behave();

      // Start animations
      game.player.animation.update();
      enemyScndLvl.animation.update();
      enemiesThirdLvl.forEach(e => {
        e.animation.update();
      })
      boss.animation.update()

    // Draw players and map
    this.buffer.drawImage(game.sprite_sheet.image, game.player.animation.frame * SPRITE_SIZE, 0, SPRITE_SIZE, SPRITE_SIZE, Math.floor(game.player.x), Math.floor(game.player.y), SPRITE_SIZE, SPRITE_SIZE);
    this.context.drawImage(this.buffer.canvas, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height, 0, 0, this.context.canvas.width, this.context.canvas.height);

  },

  // Resize function
  resize: function (event) {
    let client_height = document.documentElement.clientHeight;
    display.context.canvas.width = document.documentElement.clientWidth - 32;
    if (display.context.canvas.width > client_height) {
      display.context.canvas.width = client_height;
    }
    display.context.canvas.height = Math.floor(display.context.canvas.width * 0.625);
    display.render();
  }

};

// Game loop ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const loop = function () {

  // calculate the player's x and y tile position in the tile map
  let tile_x = Math.floor((game.player.x + game.player.width * 0.5) / level.world.tile_size);
  let tile_y = Math.floor((game.player.y + game.player.height) / level.world.tile_size);

  // get the value at the tile position in the map
  let value_at_index = level.world.map[tile_y * level.world.columns + tile_x];
  tile_value = level.world.map[tile_y * level.world.columns + tile_x];
  map_index = tile_y * level.world.columns + tile_x;

  if (value_at_index != 0) {
    // Call collision function with number of tile in map
    level.collision[value_at_index](game.player, tile_y, tile_x);
  }


  // Player rectangle, for collision
  const playerRect = {
    bottom: game.player.y + SPRITE_SIZE,
    left:   game.player.x,
    right:   game.player.x + 7 ,
    top:   game.player.y 
  }

  tile_x = Math.floor((game.player.x + game.player.width * 0.5) / level.world.tile_size);
  tile_y = Math.floor((game.player.y + game.player.height) / level.world.tile_size);
  // get the value at the tile position in the map
  value_at_index = level.world.map[tile_y * level.world.columns + tile_x];
  tile_value = level.world.map[tile_y * level.world.columns + tile_x];
  map_index = tile_y * level.world.columns + tile_x;

  if (value_at_index != 0) {
    // Call collision function with number of tile in map
    level.collision[value_at_index](game.player, tile_y, tile_x);
  }

  if (level === second ) {
    enemyScndLvl.testCollision(playerRect);
  } else if (level === third) {
    enemiesThirdLvl.forEach(e => {
      e.testCollision(playerRect);
    })
    boss.testCollision(playerRect);
  }

  levelControll(tile_value);

  // Start up the game ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  controller.movement();
  display.render();
  if (active) {
    window.requestAnimationFrame(loop);
  }
};

// Initialize 
const startup = document.querySelector('.startup')
display.buffer.canvas.height = 200;
display.buffer.canvas.width = 336;

window.addEventListener("resize", display.resize);
window.addEventListener("keydown", controller.keyUpDown);

window.addEventListener("keyup", controller.keyUpDown);

display.resize();
game.sprite_sheet.image.addEventListener("load", function (event) {
    window.requestAnimationFrame(loop);
});


// Images 
game.sprite_sheet.image.src = "assets/img/animation.png";
if (window.location.href.indexOf("index") != -1) {
  display.tile_sheet.image.src = "assets/img/tilesheet.png";
} else if (window.location.href.indexOf("second") != -1) {
  display.tile_sheet.image.src = "assets/img/tilesheet2.png";
} else if (window.location.href.indexOf("third") != -1) {
  display.tile_sheet.image.src = "assets/img/tilesheet3.png";
}

secondLevel_set.src = "assets/img/npc/second.png";
thirdLevel_set[0].src = "assets/img/npc/stan.png";
thirdLevel_set[1].src = "assets/img/npc/cartman.png";
thirdLevel_set[2].src = "assets/img/npc/butters.png";
boss_set.src = "assets/img/npc/kenny.png";

