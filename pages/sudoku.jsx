import Head from 'next/head'
import SudokuBoard from '../components/sudokuBoard';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const Home = () => {
  const router = useRouter();
  const { query: { gameSeed, difficulty } } = router;

  const symbols = ['1','2','3','4','5','6','7','8','9'];
  // const symbols = ['a','b','c','d','e','f','g','h','i'];

  const decimationFactor = difficulty * 0.01;

  return (
  <div className="container">
    <Head>
      <title>Sudoku</title>
      <link rel="icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, user-scalable=no" />
    </Head>

    <main>
      <div id='page-container'>
        <SudokuBoard seed={gameSeed} {...{symbols, decimationFactor }} />
      </div>
    </main>

    <footer>

    </footer>

    <style jsx global>{`
      html,
      body {
        background-color: #1d2431;
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      }

      #page-container {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: grid;
        grid-template-rows: 6fr 1fr;
        grid-template-columns: 1fr;
      }

      @media screen and (orientation: landscape) {
        #page-container {
          width: 70%;
          margin-left: auto;
          margin-right: auto;
        }
      }
      * {
        box-sizing: border-box;
      }
    `}</style>
  </div>
)}

export default Home
