import React, { useEffect, useState } from 'react';
import styles from '../../styles/Card.module.css';
import { useDispatch } from 'react-redux';
import { selectCard } from '../../store/slices/selectedCardSlice';
import imageApi from '../../api/imageApi';

export default function UserCardImageLists() {
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [images, setImages] = useState({
    size: 0,
    items: [],
  });
  const { size, items } = images;
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchUserCardImages() {
      try {
        const response = await imageApi.getUserImages('CARD');
        const data = response.data;
        setImages(data.images);
      } catch (e) {
        console.error('이미지 불러오기 실패');
      }
    }
    fetchUserCardImages();
  }, []);

  function handleClickImage(e, imageId) {
    setSelectedImageId(imageId);
    dispatch(selectCard({ imageId: imageId, imageUrl: e.target.src }));
  }

  async function createImages(addImages) {
    try {
      const response = await imageApi.createImage('CARD', addImages);

      const newImages = response.data.images.map((image) => {
        const { id, imageUrl } = image;
        return { id, imageUrl };
      });

      setImages((prevImages) => ({
        size: prevImages.size + newImages.length,
        items: [...prevImages.items, ...newImages],
      }));
    } catch (e) {
      console.error('이미지 생성에 실패했습니다.');
    }
  }

  function addImage(e) {
    let addImages = Array.from(e.target.files);

    if (addImages.length + size > 8) {
      alert('커스텀 이미지는 최대 8개까지 생성 가능합니다.');
      return;
    }

    createImages(addImages);
  }

  async function handleDeleteImage(imageId) {
    await imageApi.deleteImage(imageId);

    setImages((prevImages) => ({
      size: prevImages.size - 1,
      items: prevImages.items.filter((item) => item.id !== imageId),
    }));
  }

  return (
    <ul className={styles.selectCardImageSection}>
      {items.map((item, index) => (
        <li
          key={index}
          className={`${styles.cardImageStyle} ${selectedImageId === item.id ? styles.selected : ''}`}
        >
          <img src={item.imageUrl} alt="" onClick={(e) => handleClickImage(e, item.id)} />
          <div className={styles.cardDeleteButton} onClick={() => handleDeleteImage(item.id)}>
            x
          </div>
        </li>
      ))}
      <label htmlFor="image-file" className={styles.cardImageStyle}>
        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          id="image-file"
          multiple
          hidden
          onChange={addImage}
        />
        <span className={styles.addButton}>+</span>
      </label>
    </ul>
  );
}
