import Head from 'next/head';
import Menu from '../components/menu';

const Index = () => {

    return (
        <>
        <Head>
            <title>Sudoku</title>
            <link rel="icon" href="/favicon.ico" />
            <meta name="viewport" content="width=device-width, user-scalable=no" />
        </Head>
        <h1>React-Sudoku</h1>
        
        <main>
            <div id='page-container'>
                <Menu />
            </div>
        </main>
        <footer>
            <a href='https://github.com/michaellasky/react-sudoku'>https://github.com/michaellasky/react-sudoku</a>
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
          
            h1 {
                text-align: center;
                color: #fc7303;
            }

            footer {
                width: 100%;
                position: absolute;
                bottom: 0;
                padding: 1em;
                text-align: center;
            }

            footer a {
                color: #eeeeee;
            }
        `}</style>
        </>
    );
}

export default Index;