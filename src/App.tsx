import React from 'react';
import styles from "./App.module.css"
import { Route, Routes } from 'react-router-dom';
import { BASE_URL, POST_LIST_URL, POST_URL } from './utils/constants';
import PostListPage from './pages/PostListPage/PostListPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import MainPage from './pages/MainPage/MainPage';
import PostPage from './pages/PostPage/PostPage';

function App() {
  return (
    <div className={styles.App}>
      <main>
        <Routes>
          <Route path={BASE_URL} element={<MainPage/>}/>
          <Route path={POST_LIST_URL} element={<PostListPage/>}/>
          <Route path={`${POST_URL}/:id`} element={<PostPage/>}/>
          <Route path='*' element={<ErrorPage/>}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;
