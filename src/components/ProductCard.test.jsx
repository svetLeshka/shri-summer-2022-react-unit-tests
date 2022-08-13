import { describe, it, expect } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import { ProductCard } from './ProductCard';
import { faker } from '@faker-js/faker/locale/ru';

const mok = {
	bouquetHeight: faker.datatype.number({ min: 30, max: 100 }),
	bouquetWidth: faker.datatype.number({ min: 30, max: 100 }),
	currentPrice: faker.commerce.price(0, 99999, 0),
	flowersCount: faker.datatype.number({ min: 1, max: 1000 }),
	id: faker.datatype.uuid(),
	imageUrl: faker.image.imageUrl(400, 400, 'nature', true),
	isFavorite: faker.datatype.boolean(),
	isHit: faker.datatype.boolean(),
	isSale: faker.datatype.boolean(),
	oldPrice: faker.datatype.boolean() ? faker.commerce.price(0, 99999, 0) : undefined,
	title: faker.commerce.productName(),
}

describe('Компонент «Карточка товара», информация в header', () => {
	it('Карточка при отсутсвии изображения, показывает правильную заглушку', () => {
		const newMok = Object.assign({}, mok);
		delete newMok.imageUrl;
		const component = <ProductCard {...newMok} />

		const { getByTestId } = render(component);

		const img = getByTestId('header-img');
		expect(img.src).toMatch('no-photo.png');
	});

	it('Карточка при получении пути к изображению, показывает её', () => {
		const newMok = Object.assign({}, mok);
		const component = <ProductCard {...newMok} />

		const { getByTestId } = render(component);

		const img = getByTestId('header-img');
		expect(img.src).toMatch(newMok.imageUrl);
	});

	it('Не отрисовывает хит, если товар не является хитом', () => {
		const newMok = Object.assign({}, mok);
		delete newMok.isHit;
		const component = <ProductCard {...newMok} />

		const { queryByTestId } = render(component);

		const hit = queryByTestId('hit');
		expect(hit).toBe(null);
	});

	it('Не отрисовывает скидку, если товар без скидки', () => {
		const newMok = Object.assign({}, mok);
		delete newMok.isSale;
		const component = <ProductCard {...newMok} />

		const { queryByTestId } = render(component);

		const sale = queryByTestId('sale');
		expect(sale).toBe(null);
	});

	it('Не отрисовывает контейнер со скидкой и хитом, если товар без скидки и не хит', () => {
		const newMok = Object.assign({}, mok);
		delete newMok.isSale;
		delete newMok.isHit;
		const component = <ProductCard {...newMok} />

		const { queryByTestId } = render(component);

		const info = queryByTestId('info');
		expect(info).toBe(null);
	});

	it('Отрисовывает сердечко, если товар в избранных или нет', () => {
		const newMok = Object.assign({}, mok);
		const component = <ProductCard {...newMok} />

		const { queryByTestId } = render(component);

		const favorite = queryByTestId('favorite');
		expect(favorite).not.toBe(null);
	});
});

describe('Компонент «Карточка товара», информация в body', () => {
	it('Не отрисовывает заголовок, если товар без него', () => {
		const newMok = Object.assign({}, mok);
		delete newMok.title;
		const component = <ProductCard {...newMok} />

		const { queryByTestId } = render(component);

		const title = queryByTestId('title');
		expect(title).toBe(null);
	});

	it('Не отрисовывает зачёркнутую цену, если товар не получил старую цену', () => {
		const newMok = Object.assign({}, mok);
		delete newMok.oldPrice;
		const component = <ProductCard {...newMok} />

		const { queryByTestId } = render(component);

		const oldPrice = queryByTestId('old-price');
		expect(oldPrice).toBe(null);
	});

	it('Не отрисовывает зачёркнутую цену, если товар не получил текущую цену', () => {
		const newMok = Object.assign({}, mok);
		delete newMok.currentPrice;
		const component = <ProductCard {...newMok} />

		const { queryByTestId } = render(component);

		const curPrice = queryByTestId('cur-price');
		expect(curPrice).toBe(null);
	});

	it('Отрисовывает две цены, если товар получил текущую и старую цену', () => {
		const newMok = Object.assign({}, mok);
		newMok.currentPrice = 10;
		newMok.oldPrice = 10;
		const component = <ProductCard {...newMok} />

		const { queryByTestId } = render(component);

		const curPrice = queryByTestId('cur-price');
		const oldPrice = queryByTestId('old-price');
		const result = Boolean(curPrice && oldPrice);
		expect(result).toBeTruthy();
	});

	it('Не отрисовывает контейнер с ценами, если товар не получил текущую и старую цену', () => {
		const newMok = Object.assign({}, mok);
		delete newMok.oldPrice;
		delete newMok.currentPrice;
		const component = <ProductCard {...newMok} />

		const { queryByTestId } = render(component);

		const price = queryByTestId('price');
		expect(price).toBe(null);
	});

	it('Не отрисовывает контейнер с количеством, если товар не получил его', () => {
		const newMok = Object.assign({}, mok);
		delete newMok.flowersCount;
		const component = <ProductCard {...newMok} />

		const { queryByTestId } = render(component);

		const count = queryByTestId('count');
		expect(count).toBe(null);
	});

	it('Не отрисовывает контейнер с количеством, если товара нет на складе', () => {
		const newMok = Object.assign({}, mok);
		newMok.flowersCount = 0;
		const component = <ProductCard {...newMok} />

		const { queryByTestId } = render(component);

		const count = queryByTestId('count');
		expect(count).toBe(null);
	});

	it('Отрисовывает контейнер с количеством, если товар есть на складе', () => {
		const newMok = Object.assign({}, mok);
		newMok.flowersCount = 10;
		const component = <ProductCard {...newMok} />

		const { queryByTestId } = render(component);

		const count = queryByTestId('count');
		expect(count).toBeTruthy();
	});

	it('Не отрисовывает контейнер с высотой, если товар не получил её', () => {
		const newMok = Object.assign({}, mok);
		delete newMok.bouquetHeight;
		const component = <ProductCard {...newMok} />

		const { queryByTestId } = render(component);

		const height = queryByTestId('height');
		expect(height).toBe(null);
	});

	it('Не отрисовывает контейнер с высотой, если высота товара равна 0', () => {
		const newMok = Object.assign({}, mok);
		newMok.bouquetHeight = 0;
		const component = <ProductCard {...newMok} />

		const { queryByTestId } = render(component);

		const height = queryByTestId('height');
		expect(height).toBe(null);
	});

	it('Отрисовывает контейнер с высотой, если товар получил её', () => {
		const newMok = Object.assign({}, mok);
		newMok.bouquetHeight = 10;
		const component = <ProductCard {...newMok} />

		const { queryByTestId } = render(component);

		const height = queryByTestId('height');
		expect(height).toBeTruthy();
	});

	it('Не отрисовывает контейнер с шириной, если товар не получил её', () => {
		const newMok = Object.assign({}, mok);
		delete newMok.bouquetWidth;
		const component = <ProductCard {...newMok} />

		const { queryByTestId } = render(component);

		const width = queryByTestId('width');
		expect(width).toBe(null);
	});

	it('Не отрисовывает контейнер с шириной, если ширина товара равна 0', () => {
		const newMok = Object.assign({}, mok);
		newMok.bouquetWidth = 0;
		const component = <ProductCard {...newMok} />

		const { queryByTestId } = render(component);

		const width = queryByTestId('width');
		expect(width).toBe(null);
	});

	it('Отрисовывает контейнер с шириной, если товар получил её', () => {
		const newMok = Object.assign({}, mok);
		newMok.bouquetWidth = 10;
		const component = <ProductCard {...newMok} />

		const { queryByTestId } = render(component);

		const width = queryByTestId('width');
		expect(width).toBeTruthy();
	});

	it('Не отрисовывает контейнер с информацией по товару, если товар не имеет её', () => {
		const newMok = Object.assign({}, mok);
		newMok.bouquetWidth = 0;
		newMok.bouquetHeight = 0;
		newMok.flowersCount = 0;
		const component = <ProductCard {...newMok} />

		const { queryByTestId } = render(component);

		const info = queryByTestId('info-body');
		expect(info).toBe(null);
	});
});

describe('Компонент «Карточка товара», информация в buttons', () => {
	it('Кнопки не активны, если товара нет на складе', () => {
		const newMok = Object.assign({}, mok);
		newMok.flowersCount = 0;
		const component = <ProductCard {...newMok} />

		const { queryByTestId } = render(component);

		const busket = queryByTestId('busket');
		const buy = queryByTestId('buy');
		const result = Boolean(buy.classList.contains('card-body__btn_disable')
			&& busket.classList.contains('card-body__btn_disable'));
		expect(result).toBeTruthy();
	});

	it('Кнопки активны, если товар есть складе', () => {
		const newMok = Object.assign({}, mok);
		newMok.flowersCount = 10;
		const component = <ProductCard {...newMok} />

		const { queryByTestId } = render(component);

		const busket = queryByTestId('busket');
		const buy = queryByTestId('buy');
		const result = Boolean(buy.classList.contains('card-body__btn_disable')
			|| busket.classList.contains('card-body__btn_disable'));
		expect(result).toBeFalsy();
	});
});