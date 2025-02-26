import React, { useEffect, useState } from 'react';
import bookApi from '../api/bookApi';

export default function BookReview() {
  // 도서 검색 관련
  const [searchBook, setSearchBook] = useState(false);
  const [bookItems, setBookItems] = useState([]);
  const [isReadOnly, setIsReadOnly] = useState(true);

  // 도서 정보 입력칸 관련
  const [bookImage, setBookImage] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');

  // 한줄평 관련
  const [cardImage, setCardImage] = useState('');

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
    setBookImage(book.imageUrl);
    setTitle(book.title);
    setAuthor(book.author);
    setPublisher(book.publisher);
  };

  const onUserInput = (searchBook) => {
    if (searchBook) {
      setIsReadOnly(false);

      setBookImage('');
      setAuthor('');
      setPublisher('');
      setTitle(searchBook);
    }
  };
  useEffect(() => {
    console.log(isReadOnly);
  }, []);

  return (
    <>
      <input type="text" onChange={handleSearchBookTitle} />

      {searchBook && (
        <ul>
          {bookItems.length != 0 ? (
            <>
              {bookItems.map((book) => (
                <li key={book.bookId} onClick={() => setBookInfo(book)}>
                  <img src={book.imageUrl} alt="" />
                  <div>{book.title}</div>
                  <div>{book.author}</div>
                  <div>{book.publisher}</div>
                </li>
              ))}
            </>
          ) : (
            <>
              <li onClick={() => onUserInput(searchBook)}>"{searchBook}" 직접입력</li>
            </>
          )}
        </ul>
      )}

      <img name="bookImage" src={bookImage} alt="" />
      <input
        name="title"
        value={title}
        type="text"
        placeholder="도서 검색을 먼저 하세요"
        readOnly={isReadOnly}
      />
      <input
        name="author"
        value={author}
        type="text"
        placeholder="도서 검색을 먼저 하세요"
        readOnly={isReadOnly}
      />
      <input
        name="publisher"
        value={publisher}
        type="text"
        placeholder="도서 검색을 먼저 하세요"
        readOnly={isReadOnly}
      />

      <img name="cardImage" src={cardImage} alt="" />
      <input name="onelineTitle" type="text" />

      <textarea name="" id=""></textarea>
    </>
  );
}
