var $dieAndNum = $('#die, #roll');
var $die = $('#die');
var $roll = $('#roll');
var $hillary = $('#player1');
var $trump = $('#player2');
var hillaryPos = 0;
var trumpPos = 0;
var tiles = {};
var $winnerCircle = $('#winner-circle')
var gameOver = false;



for (var i = 1; i <= 10; i++) {
    tiles[i] = $('#tile' + i);
}

var turn;
if (Math.random() > 0.5) {
    turn = 'player1';
} else {
    turn = 'player2';
}

$dieAndNum.click(function() {
    if (gameOver === true) return false;
      $die.attr('src', './img/Dodecahedron3.gif');
      $roll.html('?');
      var num = Math.floor(Math.random() * 10 + 1);

    setTimeout(function() {
        $roll.html(num);
        movePlayer(num);
    }, 900);


});

function movePlayer(num) {
  var $playerToMove;
  var playerTile;
  if (turn === 'player1') {
      $playerToMove = $hillary;
      turn = 'player2';
      hillaryPos += num;
      playerTile = hillaryPos;
  } else {
      $playerToMove = $trump;
      turn = 'player1';
      trumpPos += num;
      playerTile = trumpPos;
  }

  if (trumpPos > 10 || hillaryPos > 10) {
      onGameOver($playerToMove);
      return false;
  }

  var tilePos = tiles[playerTile][0].getBoundingClientRect();

  $playerToMove.css({
      'top': tilePos.top,
      'bottom': tilePos.bottom,
      'left': tilePos.left,
      'right': tilePos.right,
  });
};

function onGameOver($winner) {
    gameOver = true;
    var tilePos = $winnerCircle[0].getBoundingClientRect();
    $winner.css({
        'top': tilePos.top,
        // 'bottom': tilePos.bottom + 32,
        'left': tilePos.left,
        // 'right': tilePos.right + 32,
    }).addClass('winner-style');
    setTimeout(function() {
        alert('Winner!');
        alert('Would you like to play again?');
        reset();
    }, 400);

}

function reset() {
    gameOver = false;
    trumpPos = 0;
    hillaryPos = 0;
    $hillary.css({
        left: '10px',
        top: '160px'
    }).removeClass('winner-style');
    $trump.css({
        left: '10px',
        top: '250px'
    }).removeClass('winner-style');
}
