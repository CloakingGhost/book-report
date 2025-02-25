import React, { useEffect, useState } from 'react';
import bookApi from '../api/bookApi';

export default function BookReview() {
  const [searchBook, setSearchBook] = useState('');
  const [bookImage, setBookImage] = useState('');
  const [cardImage, setCardImage] = useState('');

  // 도서 검색 관련
  const [status, setStatus] = useState();
  const [page, setPage] = useState();
  const [size, setSize] = useState();
  const [items, setItems] = useState([]);

  const handleSearchBookTitle = async (e) => {
    setSearchBook(e.target.value);

    try {
      const response = await bookApi.searchBooks(searchBook);
      const [status, page, size, items] = response;
      setItems(items);
    } catch {
      console.error();
    }
  };

  useEffect(() => {
    console.log(searchBook);
  }, [searchBook]);

  return (
    <>
      <input type="text" onChange={handleSearchBookTitle} />

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
