import Head from 'next/head'
import SudokuBoard from '../components/sudokuBoard';

const Home = () => (
  <div className="container">
    <Head>
      <title>Sudoku</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <h1 className="title">
        Sudoku!!
      </h1>
      <SudokuBoard />
    </main>

    <footer>

    </footer>

    <style jsx>{`
     
    `}</style>

    <style jsx global>{`
      html,
      body {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      }

      * {
        box-sizing: border-box;
      }
    `}</style>
  </div>
)

export default Home
