import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  constructor(props) {
    // console.log(props)
    console.log(props.value) // 這個 props 是從 Board 傳過來的
    super(props);
    // 在 JavaScript class 中，當你定義一個 subclass 的 constructor 時，你總是會需要呼叫 super。
    // 所有的 React component class，凡是有 constructor 的，都應該要從呼叫 super(props) 開始。
    this.state = {
      value: null,
      // 先設定為 null，被點擊時onClick={() => this.setState({value: 'X'}) 再設定成 X
    };
  }

  render() {
    return (
      <button
        className="square"
        onClick={() => this.setState({value: 'X'}) }>
        {this.state.value}
      </button>
    );
  }
}

class Board extends React.Component {
  // Board 是 Parent
  renderSquare(i, o = 'not') {
    return <Square value={i} duncan={o} />;
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
