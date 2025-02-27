import React, { useEffect, useState } from 'react';
import bookApi from '../api/bookApi';
import { useRef } from 'react';

export default function BookReview() {
  // 도서 검색 관련
  const [searchBook, setSearchBook] = useState('');
  const [bookItems, setBookItems] = useState([]);
  const cleanSearchTitle = useRef();

  // 자동 입력 도서 정보 입력칸 관련
  const [bookImage, setBookImage] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [isReadOnly, setIsReadOnly] = useState(true);

  const handleSearchBookTitle = async (e) => {
    const searchTitle = e.target.value;

    setSearchBook(searchTitle);

    if (searchTitle !== '') {
      try {
        const response = await bookApi.searchBooks(searchTitle);
        const { hasNext, bookList } = response;

        setBookItems(bookList);
      } catch {
        console.error();
      }
    } else {
      setBookItems([]);
    }
  };

  const setBookInfo = async (book) => {
    setSearchBook(cleanSearchTitle.current.value);
    cleanSearchTitle.current.value = '';
    setIsReadOnly(true);
    setBookImage(book.imageUrl);
    setTitle(book.title);
    setAuthor(book.author);
    setPublisher(book.publisher);
  };

  // 사용자 직접 입력
  const onUserInput = () => {
    setTitle(searchBook);
    cleanSearchTitle.current.value = '';
    setSearchBook(cleanSearchTitle.current.value);
    removeBookInfo();
    setIsReadOnly(false);
  };

  function removeBookInfo() {
    setBookImage('');
    setAuthor('');
    setPublisher('');
  }

  return (
    <>
      검색:{' '}
      <input
        type="text"
        defaultValue={searchBook}
        ref={cleanSearchTitle}
        onChange={handleSearchBookTitle}
      />
      {searchBook != '' && (
        <ul>
          {bookItems.length != 0 ? (
            <>
              {bookItems.map((book) => (
                <li key={book.bookId} onClick={() => setBookInfo(book)}>
                  <img src={book.imageUrl} alt="" />
                  <img src="" alt="" />
                  <div>{book.title}</div>
                  <div>{book.author}</div>
                  <div>{book.publisher}</div>
                </li>
              ))}
            </>
          ) : (
            <>
              <li onClick={onUserInput}>"{searchBook}" 직접 입력</li>
            </>
          )}
        </ul>
      )}
      <img name="bookImage" src={bookImage} alt="" />
      {!isReadOnly && <button>이미지 첨부</button>}
      책 제목: <input name="title" defaultValue={title} type="text" readOnly />
      작가: <input name="author" defaultValue={author} type="text" readOnly={isReadOnly} />
      출판사:
      <input name="publisher" defaultValue={publisher} type="text" readOnly={isReadOnly} />
      <div>나중에 카드 컴포넌트 들어갈 자리</div>
      <textarea name="" id=""></textarea>
    </>
  );
}
