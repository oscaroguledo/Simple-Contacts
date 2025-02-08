import logo from './logo.svg';
import './App.css';
import useGet from '../src/hooks/api/useGet';
import usePostOrPut from '../src/hooks/api/usePostorPut';
import useDelete from '../src/hooks/api/useDelete';
import { useEffect, useState } from 'react';
import List from './components/ui/List/List';
import Title from './components/ui/Text/Title';

// Dummy data for contacts
const initialContacts = [
  { id: 1, name: 'John Doe', address: '123 Main St', phone: '555-555-5555' },
  { id: 2, name: 'Jane Smith', address: '456 Oak Ave', phone: '555-555-1234' },
  { id: 3, name: 'Emily Johnson', address: '789 Pine Dr', phone: '555-555-9876' },
  { id: 4, name: 'Michael Brown', address: '101 Elm St', phone: '555-555-1122' },
  { id: 5, name: 'Linda Williams', address: '202 Maple Rd', phone: '555-555-3344' },
  { id: 6, name: 'James Taylor', address: '303 Birch Ln', phone: '555-555-5566' },
  { id: 7, name: 'Patricia Martinez', address: '404 Cedar Blvd', phone: '555-555-7788' },
  { id: 8, name: 'Robert Harris', address: '505 Oakwood Dr', phone: '555-555-9900' },
  { id: 9, name: 'Daniel Walker', address: '606 Pineview Ave', phone: '555-555-1123' },
  { id: 10, name: 'Sophia Clark', address: '707 Willow Way', phone: '555-555-4455' },
  { id: 11, name: 'William Lewis', address: '808 Cherry Ln', phone: '555-555-6677' },
  { id: 12, name: 'Isabella Young', address: '909 River Rd', phone: '555-555-8899' },
];
const pages = [
  <>
    <Title align='center' className='mx-3'>Contacts Application</Title>
    <List items={initialContacts} search pagination/>
  </>,
  <div>gggjkhff</div>,
  <div>gggjkhff</div>,
  <div>gggjkhff</div>
]
function App() {
  const { data, loading, error } = useGet('https://jsonplaceholder.typicode.com/posts');
  const { sendData, response: postResponse } = usePostOrPut('https://jsonplaceholder.typicode.com/posts', 'post');
  const { deleteData, response: deleteResponse } = useDelete('https://jsonplaceholder.typicode.com/posts/1');

  useEffect(() => {
    sendData({ title: 'New Post', body: 'This is a test post.', userId: 1 });
  }, []);
  const [currentPage, setCurrentPage] = useState(pages[0]);
  return (
    <div className='app mt-4 '>
      {pages[currentPage]}
    </div>
    
    
    )
}

export default App;
