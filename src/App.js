import './App.css';
import SearchPanel from './components/SearchPanel/SearchPanel';
import { useEffect, useState } from 'react';
const apiKey = 'AIzaSyBki-gPmcA9s8U0cJiCNE8Dhetv4H1iKxk';

function App() {
  const [books, setBooks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  function handleInput(e) {
    const {value: targetValue} = e.target;
    setInputValue(targetValue);
  }

  useEffect(() => {
    async function fetchBooks() {
      try {
        const fetchBooks = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${inputValue}&key=${apiKey}`,
        )
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error('Something went wrong');
          })
          .then((data) => data.items);
        setBooks(fetchBooks);
      } catch (e) {
        console.log(e);
        setBooks([]);
      }
    }
    fetchBooks();
  }, [inputValue]);

  return (
    <div className="App">
      <input type="text" value={inputValue} onChange={handleInput} />
      {books.map(item => (<p key={item.id}>{item.volumeInfo.title}</p>))}
      {/* <SearchPanel /> */}
    </div>
  );
}

export default App;
