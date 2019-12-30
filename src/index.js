import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Game 呼叫 Board ，Board 呼叫 Square

function Square(props) {
  // 沒有 constructor state 只有 render ，所以把這個 Component 改寫成 Function Commponent
  return (
    <button
      className="square"
      onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null), // 製造一個有9個 null 值的 Array，對應 renderSquare 的 0 ~ 8
      xIsNext: true, // true 是 X，false 是 O
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return; // 勝負揭曉就提早回傳，不再印上 X 或 O
    }

    // console.log(squares[i]) //這時一定是 null 
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    // console.log(squares[i]) //這時會印上 X 或 O
    // 一開始整個 squares 是有 9 個 null 值的 Array
    // 在這裡透過把每一個 square 設定的 i (數字 0~8) 傳進來
    // 印上 X 或 O
    // 並把 xIsNext 反轉 !true 變成 false，讓遊戲知道下一個是換誰玩
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });

    // var player = {score: 1, name: 'Duncan'};
    // var newPlayer = Object.assign({}, player, {score: 2});
    // console.log(player);
    // console.log(newPlayer)
    // Immutability（不可變性）的重要性。
    // 不直接改變原本的值，copy 出來再修改
    // 1. 保留原始資料，可直接在被使用
    // 2. 偵測改變，資料跟原本不一樣代表 被改變了
  }

  renderSquare(i, o = 'not') {
    // 這個方法在 board-row 裡被呼叫出來
    // 然後在呼叫 Square class 顯示出每一個方格的值
    return <Square
             value={this.state.squares[i]}
             onClick={() => this.handleClick(i) }
             duncan={o}
           />;
    // 把值傳出去讓子層接收的 props
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0, '2')}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
