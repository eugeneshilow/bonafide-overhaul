export type Product = {
  id: string;
  name: string;
  category: string;
  color: string;
  price: number;
  oldPrice?: number;
  bonus: number;
  badge?: string;
  image: string;
};

export type Category = {
  name: string;
  label: string;
  image: string;
};

export const heroImages = [
  "https://bonafide.ru/upload/resize_cache/iblock/0d1/1000_1000_140cd750bba9870f18aada2478b24840a/p00k13qsefn3kv80y8457lq2ec9tj1a9.jpg",
  "https://bonafide.ru/upload/resize_cache/iblock/29c/1000_1000_140cd750bba9870f18aada2478b24840a/qlkwwu13zvb0ybgyp1jorlgsnfhoo6s2.png",
  "https://bonafide.ru/upload/resize_cache/iblock/35b/1000_1000_140cd750bba9870f18aada2478b24840a/aavs7stuf16xqtq9v9z6g7dnrxbjyj4f.png",
];

export const campaignImages = {
  neon:
    "https://bonafide.ru/upload/iblock/50b/euld4e4agf8a9yyeqzoyev413oh2j3dg.jpg",
  summer:
    "https://bonafide.ru/upload/iblock/2a1/rvp67kcktso16eli1e3xyra8az6kkbk0.jpg",
  street:
    "https://bonafide.ru/upload/iblock/639/tcd8dlz8wgtajxp14b0bp2r7d0mx7aaa.jpg",
};

export const categories: Category[] = [
  {
    name: "Леггинсы",
    label: "Push-Up, seamless, sculpt",
    image:
      "https://bonafide.ru/upload/resize_cache/iblock/58b/1000_1000_140cd750bba9870f18aada2478b24840a/ow47unz7y6r9xnqr57dfz2c0lhujt2pa.jpg",
  },
  {
    name: "Топы",
    label: "Support для тренировки",
    image:
      "https://bonafide.ru/upload/resize_cache/iblock/4cd/1000_1000_140cd750bba9870f18aada2478b24840a/z4sjaidepg1gdyd54z14j5q2lps14goo.jpg",
  },
  {
    name: "Комбинезоны",
    label: "Один образ без пауз",
    image:
      "https://bonafide.ru/upload/resize_cache/iblock/168/1000_1000_140cd750bba9870f18aada2478b24840a/3rghk8v4pd6274wsaf6hl6w5ddoc6ugx.png",
  },
  {
    name: "Кроссовки",
    label: "Shadow Flex и city looks",
    image:
      "https://bonafide.ru/upload/resize_cache/iblock/906/1000_1000_140cd750bba9870f18aada2478b24840a/2abr2g5npvdczykudu4zl8k2kgjxffk1.jpg",
  },
];

export const products: Product[] = [
  {
    id: "mistress-black",
    name: 'Mistress Leggings "Black"',
    category: "Леггинсы",
    color: "Black",
    price: 5802,
    oldPrice: 8300,
    bonus: 290,
    badge: "Хит сезона",
    image:
      "https://bonafide.ru/upload/resize_cache/iblock/35b/1000_1000_140cd750bba9870f18aada2478b24840a/aavs7stuf16xqtq9v9z6g7dnrxbjyj4f.png",
  },
  {
    id: "extra-sex-candy-pink",
    name: 'Extra Sex "Candy Pink"',
    category: "Леггинсы",
    color: "Candy Pink",
    price: 4109,
    oldPrice: 9300,
    bonus: 205,
    badge: "New -40%",
    image:
      "https://bonafide.ru/upload/resize_cache/iblock/0d1/1000_1000_140cd750bba9870f18aada2478b24840a/p00k13qsefn3kv80y8457lq2ec9tj1a9.jpg",
  },
  {
    id: "magnetic-cloud-dancer",
    name: 'Magnetic "Cloud Dancer"',
    category: "Леггинсы",
    color: "Cloud Dancer",
    price: 6369,
    oldPrice: 7750,
    bonus: 318,
    badge: "New",
    image:
      "https://bonafide.ru/upload/resize_cache/iblock/29c/1000_1000_140cd750bba9870f18aada2478b24840a/qlkwwu13zvb0ybgyp1jorlgsnfhoo6s2.png",
  },
  {
    id: "extra-push-black-skin",
    name: 'Extra Sex Push-Up "Black Skin"',
    category: "Леггинсы",
    color: "Black Skin",
    price: 6356,
    oldPrice: 8300,
    bonus: 318,
    badge: "Push-Up",
    image:
      "https://bonafide.ru/upload/resize_cache/iblock/58b/1000_1000_140cd750bba9870f18aada2478b24840a/ow47unz7y6r9xnqr57dfz2c0lhujt2pa.jpg",
  },
  {
    id: "rashguard-extra-sex-black",
    name: 'Rashguard Extra Sex "Black"',
    category: "Рашгард",
    color: "Black",
    price: 5179,
    bonus: 259,
    image:
      "https://bonafide.ru/upload/resize_cache/iblock/7e9/1000_1000_140cd750bba9870f18aada2478b24840a/49e96fg0ilsu438x7dutl7sw1j7p292j.jpg",
  },
  {
    id: "shadow-flex-gray",
    name: 'Sneakers Shadow Flex "Gray"',
    category: "Кроссовки",
    color: "Gray",
    price: 6103,
    oldPrice: 8000,
    bonus: 305,
    badge: "New",
    image:
      "https://bonafide.ru/upload/resize_cache/iblock/906/1000_1000_140cd750bba9870f18aada2478b24840a/2abr2g5npvdczykudu4zl8k2kgjxffk1.jpg",
  },
  {
    id: "body-burgundy",
    name: 'Body Move "Burgundy"',
    category: "Комбинезон",
    color: "Burgundy",
    price: 6890,
    bonus: 344,
    badge: "Drop",
    image:
      "https://bonafide.ru/upload/iblock/639/tcd8dlz8wgtajxp14b0bp2r7d0mx7aaa.jpg",
  },
  {
    id: "top-sirene-black",
    name: 'Sirene Top "Black"',
    category: "Топ",
    color: "Black",
    price: 3352,
    bonus: 168,
    image:
      "https://bonafide.ru/upload/resize_cache/iblock/4cd/1000_1000_140cd750bba9870f18aada2478b24840a/z4sjaidepg1gdyd54z14j5q2lps14goo.jpg",
  },
];

export const sizes = ["XS", "S", "M", "L", "XL"];

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("ru-RU").format(price) + " ₽";
