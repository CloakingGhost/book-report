import React, { useEffect, useState } from 'react';
import bookApi from '../api/bookApi';

export default function BookReview() {
  const [searchBook, setSearchBook] = useState('');
  const [bookImage, setBookImage] = useState('');
  const [cardImage, setCardImage] = useState('');

  // 도서 검색 관련
  const [bookList, setBookList] = useState([]);

  const handleSearchBookTitle = async (e) => {
    setSearchBook(e.target.value);

    try {
      const response = await bookApi.searchBooks(searchBook);
      const { hasNext, bookList } = response;

      setBookList(bookList);
    } catch {
      console.error();
    }
  };
  return (
    <>
      <input type="text" onChange={handleSearchBookTitle} />
      {
        <>
          {bookList.length != 0 ? (
            <ul>
              {bookList.map((book) => (
                <li key={book.bookId}>
                  <img src={book.imgUrl} alt="" />
                  <div>{book.title}</div>
                  <div>{book.author}</div>
                  <div>{book.publisher}</div>
                </li>
              ))}
            </ul>
          ) : (
            <div>도서 검색 직접입력 모달창</div>
          )}
        </>
      }

      <img name="bookImage" src={bookImage} alt="" />
      <input name="title" type="text" placeholder="도서 검색을 먼저 하세요" readOnly />
      <input name="author" type="text" placeholder="도서 검색을 먼저 하세요" readOnly />
      <input name="publisher" type="text" placeholder="도서 검색을 먼저 하세요" readOnly />

      <img name="cardImage" src={cardImage} alt="" />
      <input name="onelineTitle" type="text" />

      <textarea name="" id=""></textarea>
    </>
  );
}
