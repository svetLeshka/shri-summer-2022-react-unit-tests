import React from 'react'
import styles from './styles.module.scss';

const CardHeader = ({ imageUrl = '/no-photo.png', isFavorite = false, isHit = false, isSale = false }) => {
	return (
		<div className={styles['card-header__wrapper']}>
			<img data-testid="header-img" src={imageUrl} alt="card" className={styles['card-header__img']} />
			{
				Boolean(isHit || isSale) &&
				<div data-testid="info" className={styles['card-header__info-wrapper']}>
					{Boolean(isHit) && <div data-testid="hit" className={styles['card-header__hit']}>хит</div>}
					{Boolean(isSale) && <div data-testid="sale" className={styles['card-header__sale']}>скидка</div>}
				</div>
			}
			{(isFavorite)
				? <img data-testid="favorite" src='/favorite.svg' alt='favorite' className={styles['card-header__favorite']} />
				: <img data-testid="favorite" src="/not-favorite.svg" alt='not favorite' className={styles['card-header__favorite']} />}
		</div>
	)
}

export default CardHeader
