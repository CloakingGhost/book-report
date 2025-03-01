import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import bookApi from '../api/bookApi';
import reviewApi from '../api/reviewApi';
import styles from '../styles/BookReview.module.css';

/**
 * BookReview 컴포넌트는 도서 리뷰를 표시하고 제출하는 기능을 제공합니다.
 * @returns {JSX.Element} 렌더링된 컴포넌트.
 */
export default function BookReview() {
  const navigate = useNavigate();

  // 도서 검색 관련
  const [searchBook, setSearchBook] = useState('');
  const [bookItems, setBookItems] = useState([]);
  const cleanSearchTitle = useRef();

  const [bookId, setBookId] = useState(null);
  const [bookImage, setBookImage] = useState('https://placehold.co/400X600');
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

  /**
   * 입력 값에 따라 도서를 검색합니다.
   * @param {React.ChangeEvent<HTMLInputElement>} e - 입력 이벤트.
   */
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

  /**
   * 목록에서 도서를 선택할 때 도서 정보를 설정합니다.
   * @param {Object} book - 선택된 도서 객체.
   */
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

  /**
   * 사용자가 수동으로 도서 정보를 입력할 때 호출됩니다.
   */
  const onUserInput = () => {
    cleanSearchTitle.current.value = '';
    setTitle(searchBook);
    setSearchBook('');
    removeBookInfo();
    setIsReadOnly(false);
  };

  /**
   * 상태에서 도서 정보를 제거합니다.
   */
  const removeBookInfo = () => {
    setBookImage(null);
    setBookImageFile(null);
    setAuthor(null);
    setPublisher(null);
  };

  /**
   * 도서의 이미지 파일을 추가합니다.
   * @param {React.ChangeEvent<HTMLInputElement>} e - 파일 입력의 변경 이벤트.
   */
  const addImage = (e) => {
    const addImage = e.target.files[0];
    setBookImageFile(addImage);
    setBookImage(URL.createObjectURL(addImage));
  };

  /**
   * 도서 리뷰를 API에 제출합니다.
   */
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
