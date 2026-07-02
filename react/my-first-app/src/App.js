import logo from './logo.svg';
import './App.css';
import Button from './loginbutton';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          This entire project is built using React. 
          Now we can make changes to the code and see them reflected in the browser without having to refresh the page.
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Button />
        <p>The above button is newly added by you, many buttons can be added</p> 
        <Button />
        <Button />
        <Button />

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
