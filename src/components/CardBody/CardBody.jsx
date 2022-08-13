import React from 'react'
import styles from './styles.module.scss'
import classNames from 'classnames'

const CardBody = ({ bouquetHeight = false, bouquetWidth = false, currentPrice = false, flowersCount = false, oldPrice = false, title = false }) => {
	return (
		<div className={styles['card-body__wrapper']}>
			{Boolean(title) && <p data-testid="title" className={styles['card-body__title']}>{title}</p>}
			{
				Boolean(currentPrice || oldPrice) &&
				<p data-testid="price" className={styles['card-body__cost-wrapper']}>
					{
						(
							Boolean(currentPrice && oldPrice) &&
							<>
								<span data-testid="cur-price" className={styles['card-body__current']}>{currentPrice} ₽</span>
								<span data-testid="old-price" className={styles['card-body__old']}>{oldPrice} ₽</span>
							</>
						) || (
							Boolean(currentPrice) &&
							<>
								<span data-testid="cur-price" className={styles['card-body__price']}>{currentPrice} ₽</span>
							</>
						) || (
							Boolean(oldPrice) &&
							<>
								<span data-testid="old-price" className={styles['card-body__price']}>{oldPrice} ₽</span>
							</>
						)
					}
				</p>
			}
			{
				Boolean(bouquetHeight || bouquetWidth || flowersCount) &&
				<div data-testid="info-body" className={styles['card-body__info']}>
					{
						Boolean(flowersCount && Number(flowersCount) !== 0) &&
						<div data-testid="count" className={styles['card-body__count-wrapper']}>
							<img className={styles['card-body__count-img']} src='/flower.svg' alt='flower' />
							<span className={styles['card-body__count-text']}>{flowersCount} шт.</span>
						</div>
					}
					{
						Boolean(bouquetHeight && Number(bouquetHeight) !== 0) &&
						<div data-testid="height" className={styles['card-body__height-wrapper']}>
							<img className={styles['card-body__height-img']} src='/height.svg' alt='height' />
							<span className={styles['card-body__height-text']}>{bouquetHeight} см</span>
						</div>
					}
					{
						Boolean(bouquetWidth && Number(bouquetWidth) !== 0) &&
						<div data-testid="width" className={styles['card-body__width-wrapper']}>
							<img className={styles['card-body__width-img']} src='/width.svg' alt='width' />
							<span className={styles['card-body__width-text']}>{bouquetWidth} см</span>
						</div>
					}
				</div>
			}
			{
				<div className={styles['card-body__btns']}>
					<div data-testid="busket" className={
						classNames(
							(flowersCount && flowersCount !== 0)
								? styles['card-body__btn_basket_enable']
								: styles['card-body__btn_disable']
							, styles['card-body__btn_basket'])
					}>В корзину</div>
					<div data-testid="buy" className={
						classNames(
							(flowersCount && flowersCount !== 0)
								? styles['card-body__btn_buy_enable']
								: styles['card-body__btn_disable']
							, styles['card-body__btn_buy'])
					}>Купить сразу</div>
				</div>
			}
		</div>
	)
}

export default CardBody
