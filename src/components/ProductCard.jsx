import CardBody from "./CardBody/CardBody"
import CardHeader from "./CardHeader/CardHeader"
import styles from './ProductCard.module.css'

export const ProductCard = (mok) => {

	return <div data-testid={'product-card'} className={styles['card__wrapper']}>
		<CardHeader
			imageUrl={mok.imageUrl}
			isFavorite={mok.isFavorite}
			isHit={mok.isHit}
			isSale={mok.isSale}
		/>
		<CardBody
			bouquetHeight={mok.bouquetHeight}
			bouquetWidth={mok.bouquetWidth}
			currentPrice={mok.currentPrice}
			flowersCount={mok.flowersCount}
			oldPrice={mok.oldPrice}
			title={mok.title}
		/>
	</div>
}