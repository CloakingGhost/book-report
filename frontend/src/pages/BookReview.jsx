import React, { useEffect, useState } from 'react';
import bookApi from '../api/bookApi';
import { useRef } from 'react';
import reviewApi from '../api/reviewApi';
import { useNavigate } from 'react-router-dom';

export default function BookReview() {
  const navigate = useNavigate();

  // 도서 검색 관련
  const [searchBook, setSearchBook] = useState('');
  const [bookItems, setBookItems] = useState([]);
  const cleanSearchTitle = useRef();

  //////////////// 자동 입력 도서 정보 입력칸 관련///////////////////////
  const [bookId, setBookId] = useState(null);

  // 도서 이미지 미리보기 변수
  const [bookImage, setBookImage] = useState(null);
  // axios에 넘겨줄 도서 이미지 변수
  const [bookImageFile, setBookImageFile] = useState(null);

  const [title, setTitle] = useState(null);
  const [author, setAuthor] = useState(null);
  const [publisher, setPublisher] = useState(null);
  const [isReadOnly, setIsReadOnly] = useState(true);

  ////////////////카드 이미지//////////////////////////////
  const [cardImage, setCardImage] = useState();
  const [onelineTitle, setOnelineTitle] = useState();

  // 감상문 내용
  const [content, setContent] = useState();

  // 도서 검색Api
  const handleSearchBookTitle = async (e) => {
    const searchTitle = e.target.value;

    setSearchBook(searchTitle);

    if (searchTitle !== '') {
      try {
        const response = await bookApi.searchBooks(searchTitle);
        let { hasNext, bookList } = response;
        bookList = bookList.slice(0, 7);
        setBookItems(bookList);
      } catch {
        console.error();
      }
    } else {
      setBookItems([]);
    }
  };

  // 자동 입력
  const setBookInfo = async (book) => {
    cleanSearchTitle.current.value = '';
    setSearchBook(cleanSearchTitle.current.value);

    setIsReadOnly(true);

    setBookId(book.bookId);
    setBookImage(book.imageUrl);
    setTitle(book.title);
    setAuthor(book.author);
    setPublisher(book.publisher);
  };

  // 사용자 수동 입력
  const onUserInput = () => {
    setTitle(searchBook);

    cleanSearchTitle.current.value = '';
    setSearchBook(cleanSearchTitle.current.value);

    removeBookInfo();
    setIsReadOnly(false);
  };

  function removeBookInfo() {
    setBookImage(null);
    setBookImageFile(null);
    setAuthor(null);
    setPublisher(null);
  }

  // 수동 입력 이미지 넣기
  function addImage(e) {
    const addImage = e.target.files;
    setBookImageFile(addImage);

    const imageurl = URL.createObjectURL(addImage[0]);

    setBookImage(imageurl);
  }

  // 감상문 저장
  const saveBookReview = async () => {
    let bookReview;
    if (bookId) {
      bookReview = {
        data: {
          book: {
            title: null,
            author: null,
            publisher: null,
          },

          review: {
            imageId: cardImage, // 카드 커버
            title: onelineTitle,
            content: content,
          },
        },
        imageFile: bookImageFile, // (책 표지)
      };
    } else {
      bookReview = {
        data: {
          book: {
            title: title,
            author: author,
            publisher: publisher,
          },

          review: {
            imageId: cardImage, // 카드 커버
            title: '한줄평',
            content: content,
          },
        },
        imageFile: bookImageFile, // (책 표지) => 임의로 지정함
      };
    }

    try {
      // const response = await reviewApi.createReview(bookReview);
      // const { status, bookReviewId } = response;

      const bookReviewId = 1; // 백엔드 완성 전이라 임의로 설정
      const reviewId = bookReviewId;
      navigate(`/reviews/${reviewId}`);
    } catch {
      console.error();
    }
  };

  return (
    <>
      검색:
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
      <img
        name="bookImage"
        src={bookImage}
        alt=""
        style={{ border: 'black, solid ,1px', width: '500px', height: '500px' }}
      />
      {!isReadOnly && (
        <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={addImage} />
      )}
      <div>검색을 먼저 해야 입력이 가능합니다</div>
      책 제목: <input name="title" defaultValue={title} type="text" readOnly />
      작가:
      <input
        name="author"
        defaultValue={author}
        type="text"
        readOnly={isReadOnly}
        onChange={(e) => setAuthor(e.target.value)}
      />
      출판사:
      <input
        name="publisher"
        defaultValue={publisher}
        type="text"
        readOnly={isReadOnly}
        onChange={(e) => setPublisher(e.target.value)}
      />
      <div>나중에 카드 컴포넌트 들어갈 자리</div>
      <textarea name="content" onChange={(e) => setContent(e.target.value)}></textarea>
      <button onClick={saveBookReview}>저장</button>
    </>
  );
}
