import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import bookApi from '../api/bookApi';
import reviewApi from '../api/reviewApi';
import styles from '../styles/BookReview.module.css';
import { tips } from '../assets/tips';

export default function BookReview() {
  const navigate = useNavigate();

  // 도서 검색 관련
  const [searchBook, setSearchBook] = useState('');
  const [bookItems, setBookItems] = useState([]);
  const cleanSearchTitle = useRef();

  const [bookId, setBookId] = useState(null);
  const [bookImage, setBookImage] = useState(null);
  const [bookImageFile, setBookImageFile] = useState(null);
  const [title, setTitle] = useState(null);
  const [author, setAuthor] = useState(null);
  const [publisher, setPublisher] = useState(null);
  const [isReadOnly, setIsReadOnly] = useState(true);

  const [cardImage, setCardImage] = useState();
  const [onelineTitle, setOnelineTitle] = useState();

  const [content, setContent] = useState();

  const tempBookItems = [
    {
      bookId: 1,
      imageUrl: 'https://placehold.co/400X600',
      title: '책 제목1',
      author: '작가1',
      publisher: '출판사1',
    },
    {
      bookId: 2,
      imageUrl: 'https://placehold.co/400X600',
      title: '책 제목2',
      author: '작가2',
      publisher: '출판사2',
    },
    {
      bookId: 3,
      imageUrl: 'https://placehold.co/400X600',
      title: '책 제목3',
      author: '작가3',
      publisher: '출판사3',
    },
  ];

  // 도서 검색Api
  const handleSearchBookTitle = async (e) => {
    const searchTitle = e.target.value;
    setSearchBook(searchTitle);

    if (searchTitle) {
      try {
        const response = await bookApi.searchBooks(searchTitle);
        setBookItems(response.bookList.slice(0, 7));
      } catch (error) {
        console.error(error);
      }
    } else {
      setBookItems([]);
    }
  };

  // 자동 입력
  const setBookInfo = (book) => {
    cleanSearchTitle.current.value = '';
    setSearchBook('');
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
    setSearchBook('');
    removeBookInfo();
    setIsReadOnly(false);
  };

  const removeBookInfo = () => {
    setBookImage(null);
    setBookImageFile(null);
    setAuthor(null);
    setPublisher(null);
  };

  // 수동 입력 이미지 넣기
  const addImage = (e) => {
    const addImage = e.target.files[0];
    setBookImageFile(addImage);
    setBookImage(URL.createObjectURL(addImage));
  };

  // 감상문 저장
  const postBookReview = async () => {
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
      const response = await reviewApi.createReview(bookReview);
      navigate(`/reviews/${response.bookReviewId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.bookSearchInputWrapper}>
        <input
          className={styles.bookSearchInput}
          type="text"
          defaultValue={searchBook}
          ref={cleanSearchTitle}
          onChange={handleSearchBookTitle}
        />
        <div className={styles.bookListWrapper}>
          {searchBook !== '' && (
            <div className={styles.bookList}>
              {tempBookItems.map((book) => (
                <div
                  className={styles.bookItem}
                  key={book.bookId}
                  onClick={() => setBookInfo(book)}
                >
                  <img className={styles.bookImage} src={book.imageUrl} alt="" />
                  <div className={styles.bookInfo}>
                    <div className={styles.bookInfoItem}>{book.title}</div>
                    <div className={styles.bookInfoItem}>{book.author}</div>
                    <div className={styles.bookInfoItem}>{book.publisher}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div>검색을 먼저 해야 입력이 가능합니다</div>
      <div className={styles.bookReviewInputWrapper}>
        <div className={styles.bookInfoInputFormWrapper}>
          <img className={styles.bookImage} name="bookImage" src={bookImage} alt="" />
          {!isReadOnly && (
            <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={addImage} />
          )}
          <div className={styles.bookInfoInputForm}>
            <label className={styles.inputFormLabel}>제목</label>
            <input
              className={styles.bookInfoItem}
              name="title"
              defaultValue={title}
              type="text"
              readOnly
            />
            <label className={styles.inputFormLabel}>작가</label>
            <input
              className={styles.bookInfoItem}
              name="author"
              defaultValue={author}
              type="text"
              readOnly={isReadOnly}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <label className={styles.inputFormLabel}>출판사</label>
            <input
              className={styles.bookInfoItem}
              name="publisher"
              defaultValue={publisher}
              type="text"
              readOnly={isReadOnly}
              onChange={(e) => setPublisher(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.reviewInputFormWrapper}>
          <textarea
            name="content"
            onChange={(e) => setContent(e.target.value)}
            className={styles.reviewInputTextarea}
            rows={5}
          ></textarea>
          <button className={styles.reviewInputSubmit} onClick={postBookReview}>
            감상문 제출하기
          </button>
        </div>
      </div>
    </div>
  );
}
