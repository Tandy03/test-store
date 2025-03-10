.featured-products {
  padding: 20px;
  background-color: #f8f8f8;
  
  &__title {
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  }

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &__image {
    width: 100%;
    height: auto;
  }

  &__name {
    font-size: 18px;
    margin: 10px 0;
  }

  &__price {
    font-size: 16px;
    font-weight: bold;
  }
}
