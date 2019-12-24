import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button
      className="square"
      onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  // Board 是 Parent
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    this.setState({squares: squares});

    var player = {score: 1, name: 'Duncan'};
    var newPlayer = Object.assign({}, player, {score: 2});
    console.log(player);
    console.log(newPlayer)
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
    // 把值傳出去讓別人可以用 props 接收
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(11, '2')}
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

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
