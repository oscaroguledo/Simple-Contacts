import logo from './logo.svg';
import './App.css';

function App() {
  const { data, loading, error } = useGet('https://jsonplaceholder.typicode.com/posts');
  const { sendData, response: postResponse } = usePostOrPut('https://jsonplaceholder.typicode.com/posts', 'post');
  const { deleteData, response: deleteResponse } = useDelete('https://jsonplaceholder.typicode.com/posts/1');

  useEffect(() => {
    sendData({ title: 'New Post', body: 'This is a test post.', userId: 1 });
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
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
