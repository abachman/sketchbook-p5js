import style from './sketch.module.css'

function SudokuGrid(props) {
  return (
    <div className={style.container}>
      <h3>Sudoku Grid</h3>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="720px"
        height="720px"
        className={style.canvas}
        viewBox="0 0 16 16"
      >

      </svg>
    </div>
  );
}

export default SudokuGrid;
