import React, { useState } from 'react';
import styles from '../../styles/Card.module.css';

export default function UserCardImageLists() {
  const [images, setImages] = useState([]);

  function addImage(e) {
    const addImages = Array.from(e.target.files);
    const imageUrlLists = [...images];

    addImages.forEach((image) => {
      const imageUrl = URL.createObjectURL(image);
      imageUrlLists.push(imageUrl);
    });

    if (imageUrlLists.length > 8) {
      alert('커스텀 이미지는 최대 8개까지 생성 가능합니다.');
      imageUrlLists = imageUrlLists.slice(0, 8);
    }

    setImages(imageUrlLists);
  }

  return (
    <div className={styles.selectCardImageSection}>
      {images.map((image, index) => (
        <div className={styles.userImageStyle}>
          <img key={index} src={image} alt="" />
        </div>
      ))}
      <label htmlFor="image-file" className={styles.userImageStyle}>
        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          id="image-file"
          multiple
          hidden
          onChange={addImage}
        />
        <span>+</span>
      </label>
    </div>
  );
}
