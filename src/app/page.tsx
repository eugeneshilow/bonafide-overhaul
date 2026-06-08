"use client";

import Image from "next/image";
import {
  ArrowRight,
  ChevronDown,
  Heart,
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Star,
  Truck,
  User,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  campaignImages,
  categories,
  formatPrice,
  heroImages,
  products,
  sizes,
  type Product,
} from "@/lib/catalog";

type CartLine = {
  product: Product;
  size: string;
  quantity: number;
};

const navItems = ["Новинки", "Леггинсы", "Топы", "Комплекты", "Коллекции", "Sale"];
const colorDrops = [
  { name: "Black Skin", color: "#111111" },
  { name: "Candy Pink", color: "#ff1493" },
  { name: "Cloud Dancer", color: "#f4f1ea" },
  { name: "Burgundy", color: "#66151d" },
  { name: "Acid Green", color: "#b9ff1f" },
];

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("M");
  const [cartLines, setCartLines] = useState<CartLine[]>([]);

  const heroProduct = products[0];

  const subtotal = useMemo(
    () =>
      cartLines.reduce(
        (total, line) => total + line.product.price * line.quantity,
        0,
      ),
    [cartLines],
  );

  function addToCart(product: Product, size = "M") {
    setCartLines((lines) => {
      const existingIndex = lines.findIndex(
        (line) => line.product.id === product.id && line.size === size,
      );

      if (existingIndex === -1) {
        return [...lines, { product, size, quantity: 1 }];
      }

      return lines.map((line, index) =>
        index === existingIndex
          ? { ...line, quantity: line.quantity + 1 }
          : line,
      );
    });
    setCartOpen(true);
  }

  function changeQuantity(productId: string, size: string, delta: number) {
    setCartLines((lines) =>
      lines
        .map((line) =>
          line.product.id === productId && line.size === size
            ? { ...line, quantity: Math.max(0, line.quantity + delta) }
            : line,
        )
        .filter((line) => line.quantity > 0),
    );
  }

  return (
    <main className="min-h-screen bg-white text-neutral-950">
      <TopBar />
      <Header
        cartCount={cartLines.reduce((total, line) => total + line.quantity, 0)}
        mobileMenuOpen={mobileMenuOpen}
        onCartOpen={() => setCartOpen(true)}
        onMobileMenuToggle={() => setMobileMenuOpen((open) => !open)}
      />

      {mobileMenuOpen && (
        <div className="border-b border-neutral-200 bg-white px-5 py-4 md:hidden">
          <nav className="grid gap-3 text-lg font-bold">
            {navItems.map((item) => (
              <a href="#shop" key={item} onClick={() => setMobileMenuOpen(false)}>
                {item}
              </a>
            ))}
          </nav>
        </div>
      )}

      <Hero onPrimary={() => document.getElementById("shop")?.scrollIntoView()} />
      <CategoryRail />
      <CampaignGrid />
      <ProductGrid onAdd={addToCart} />
      <ColorStory />
      <ProductSpotlight
        onAdd={() => addToCart(heroProduct, selectedSize)}
        product={heroProduct}
        selectedSize={selectedSize}
        onSizeChange={setSelectedSize}
      />
      <EditorialFooter />

      <CartDrawer
        lines={cartLines}
        onClose={() => setCartOpen(false)}
        onQuantityChange={changeQuantity}
        open={cartOpen}
        subtotal={subtotal}
      />
    </main>
  );
}

function TopBar() {
  return (
    <div className="flex min-h-10 items-center justify-center bg-black px-4 text-center text-sm font-semibold text-white">
      Бесплатная доставка от 5 000 ₽ · 1000 бонусов за регистрацию
    </div>
  );
}

function Header({
  cartCount,
  mobileMenuOpen,
  onCartOpen,
  onMobileMenuToggle,
}: {
  cartCount: number;
  mobileMenuOpen: boolean;
  onCartOpen: () => void;
  onMobileMenuToggle: () => void;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <div className="mx-auto grid h-20 max-w-[1600px] grid-cols-[auto_1fr_auto] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <button
          aria-label={mobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
          className="flex size-11 items-center justify-center border border-neutral-200 md:hidden"
          onClick={onMobileMenuToggle}
          type="button"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <a
          aria-label="Bona Fide"
          className="flex items-center"
          href="#"
        >
          <Image
            alt="Bona Fide"
            className="h-10 w-auto sm:h-12"
            height={128}
            priority
            src="/brand/bonafide-logo.png"
            width={394}
          />
        </a>

        <nav className="hidden justify-center gap-9 text-base font-bold md:flex">
          {navItems.map((item) => (
            <a className="transition hover:text-pink-600" href="#shop" key={item}>
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2">
          <button
            aria-label="Поиск"
            className="hidden h-11 items-center gap-2 border border-neutral-200 px-4 text-sm font-semibold text-neutral-600 transition hover:border-neutral-950 md:flex"
            type="button"
          >
            <Search size={18} />
            <span>Поиск</span>
          </button>
          <IconButton label="Аккаунт">
            <User size={20} />
          </IconButton>
          <IconButton label="Избранное">
            <Heart size={20} />
          </IconButton>
          <button
            aria-label="Корзина"
            className="relative flex size-11 items-center justify-center border border-neutral-950 bg-neutral-950 text-white transition hover:bg-pink-600"
            onClick={onCartOpen}
            type="button"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex size-6 items-center justify-center bg-pink-600 text-xs font-black text-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

function IconButton({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <button
      aria-label={label}
      className="hidden size-11 items-center justify-center border border-neutral-200 transition hover:border-neutral-950 sm:flex"
      type="button"
    >
      {children}
    </button>
  );
}

function Hero({ onPrimary }: { onPrimary: () => void }) {
  return (
    <section className="relative min-h-[76vh] overflow-hidden bg-black text-white">
      <div className="absolute inset-0 grid grid-cols-1 sm:grid-cols-3">
        {heroImages.map((image, index) => (
          <div
            className={[
              "min-h-full bg-cover bg-center",
              index === 1 ? "hidden sm:block" : "",
              index === 2 ? "hidden sm:block" : "",
            ].join(" ")}
            key={image}
            style={{ backgroundImage: `url("${image}")` }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 mx-auto flex min-h-[76vh] max-w-[1600px] flex-col justify-end px-5 pb-10 pt-24 sm:px-8 lg:px-12">
        <div className="max-w-4xl">
          <p className="mb-4 text-base font-black uppercase text-pink-400">
            Summer Studio Edit
          </p>
          <h1 className="max-w-5xl text-6xl font-black leading-none sm:text-8xl lg:text-9xl">
            Форма, которая держит движение.
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-white/90 sm:text-xl">
            Леггинсы, топы и комбинезоны Bona Fide для тренировки, города и
            летних дропов. Чистый силуэт, яркий цвет, посадка без компромисса.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              className="inline-flex h-12 items-center gap-2 bg-white px-6 text-base font-black text-neutral-950 transition hover:bg-pink-500 hover:text-white"
              onClick={onPrimary}
              type="button"
            >
              Купить новинки
              <ArrowRight size={19} />
            </button>
            <a
              className="inline-flex h-12 items-center border border-white px-6 text-base font-black text-white transition hover:bg-white hover:text-neutral-950"
              href="#spotlight"
            >
              Собрать комплект
            </a>
          </div>
        </div>

        <div className="mt-10 hidden max-w-3xl grid-cols-3 border border-white/35 text-sm font-bold md:grid">
          <div className="border-r border-white/35 p-4">
            Push-Up fit
            <span className="mt-1 block text-white/65">скульптурная посадка</span>
          </div>
          <div className="border-r border-white/35 p-4">
            Drop colors
            <span className="mt-1 block text-white/65">black, pink, cloud</span>
          </div>
          <div className="p-4">
            Quick add
            <span className="mt-1 block text-white/65">XS - XL</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryRail() {
  return (
    <section className="border-b border-neutral-200 bg-white py-10">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-black uppercase text-pink-600">
              Shop the look
            </p>
            <h2 className="text-3xl font-black sm:text-5xl">Категории без шума</h2>
          </div>
          <a className="hidden font-black underline sm:inline" href="#shop">
            Все товары
          </a>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <a
              className="group relative min-h-[360px] overflow-hidden bg-neutral-100"
              href="#shop"
              key={category.name}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url("${category.image}")` }}
              />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <h3 className="text-3xl font-black">{category.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-white/80">
                  {category.label}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function CampaignGrid() {
  return (
    <section className="bg-neutral-950 py-12 text-white">
      <div className="mx-auto grid max-w-[1600px] gap-4 px-5 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-12">
        <article className="relative min-h-[520px] overflow-hidden bg-neutral-900">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url("${campaignImages.neon}")` }}
          />
          <div className="absolute inset-0 bg-black/28" />
          <div className="absolute bottom-0 left-0 max-w-xl p-6 sm:p-8">
            <p className="mb-3 text-sm font-black uppercase text-pink-400">
              Neon Pink drop
            </p>
            <h2 className="text-5xl font-black leading-none sm:text-7xl">
              Цвет, который не просит разрешения.
            </h2>
            <a
              className="mt-6 inline-flex h-11 items-center gap-2 bg-white px-5 font-black text-neutral-950"
              href="#shop"
            >
              Смотреть дроп
              <ArrowRight size={18} />
            </a>
          </div>
        </article>

        <div className="grid gap-4">
          <article className="relative min-h-[250px] overflow-hidden bg-neutral-900">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url("${campaignImages.street}")` }}
            />
            <div className="absolute inset-0 bg-black/25" />
            <div className="absolute bottom-0 p-5">
              <p className="text-sm font-black uppercase text-white/70">
                Street body
              </p>
              <h3 className="mt-1 text-3xl font-black">Комбинезоны на каждый день</h3>
            </div>
          </article>
          <article className="relative min-h-[250px] overflow-hidden bg-neutral-900">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url("${campaignImages.summer}")` }}
            />
            <div className="absolute inset-0 bg-black/25" />
            <div className="absolute bottom-0 p-5">
              <p className="text-sm font-black uppercase text-white/70">
                Swim & resort
              </p>
              <h3 className="mt-1 text-3xl font-black">Летние силуэты Bona Fide</h3>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function ProductGrid({ onAdd }: { onAdd: (product: Product) => void }) {
  return (
    <section className="bg-white py-12" id="shop">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-2 text-sm font-black uppercase text-pink-600">
              New this week
            </p>
            <h2 className="text-4xl font-black sm:text-6xl">Новинки и хиты</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="inline-flex h-11 items-center gap-2 border border-neutral-300 px-4 font-bold">
              <SlidersHorizontal size={18} />
              Фильтр
            </button>
            <button className="inline-flex h-11 items-center gap-2 border border-neutral-300 px-4 font-bold">
              По популярности
              <ChevronDown size={18} />
            </button>
          </div>
        </div>

        <div className="grid gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} onAdd={onAdd} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ColorStory() {
  return (
    <section className="border-t border-neutral-200 bg-white py-12">
      <div className="mx-auto grid max-w-[1600px] gap-8 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-12">
        <div>
          <p className="mb-2 text-sm font-black uppercase text-pink-600">
            Shop by color
          </p>
          <h2 className="text-4xl font-black leading-none sm:text-6xl">
            Выбирай цвет. Собирай образ.
          </h2>
          <p className="mt-4 max-w-lg text-base font-medium leading-7 text-neutral-600">
            От базового Black Skin до Candy Pink: дропы Bona Fide строятся вокруг
            цвета, посадки и готовых комплектов.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-5">
          {colorDrops.map((drop) => (
            <a
              className="group flex min-h-[240px] flex-col justify-between border border-neutral-200 bg-neutral-50 p-4 transition hover:border-neutral-950"
              href="#shop"
              key={drop.name}
            >
              <span
                className="block h-28 w-full border border-black/10"
                style={{ backgroundColor: drop.color }}
              />
              <span className="mt-4 flex items-center justify-between gap-3 font-black">
                {drop.name}
                <ArrowRight
                  className="transition group-hover:translate-x-1"
                  size={18}
                />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({
  onAdd,
  product,
}: {
  onAdd: (product: Product) => void;
  product: Product;
}) {
  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
        <div
          className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url("${product.image}")` }}
        />
        <button
          aria-label="Добавить в избранное"
          className="absolute right-3 top-3 flex size-10 items-center justify-center bg-white text-neutral-950 shadow-sm transition hover:text-pink-600"
          type="button"
        >
          <Heart size={19} />
        </button>
        {product.badge && (
          <span className="absolute left-3 top-3 bg-white px-3 py-2 text-xs font-black uppercase">
            {product.badge}
          </span>
        )}
        <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
          <button
            className="flex h-12 w-full items-center justify-center gap-2 bg-neutral-950 font-black text-white transition hover:bg-pink-600"
            onClick={() => onAdd(product)}
            type="button"
          >
            <ShoppingBag size={18} />
            В корзину
          </button>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex justify-between gap-3">
          <div>
            <p className="font-black">{product.name}</p>
            <p className="mt-1 text-sm font-medium text-neutral-500">
              {product.category} · {product.color}
            </p>
          </div>
          <p className="whitespace-nowrap text-sm font-bold text-pink-600">
            + {product.bonus} бонусов
          </p>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <span className="text-xl font-black">{formatPrice(product.price)}</span>
          {product.oldPrice && (
            <span className="font-semibold text-neutral-400 line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

function ProductSpotlight({
  onAdd,
  onSizeChange,
  product,
  selectedSize,
}: {
  onAdd: () => void;
  onSizeChange: (size: string) => void;
  product: Product;
  selectedSize: string;
}) {
  return (
    <section className="border-y border-neutral-200 bg-[#f4f4f1] py-12" id="spotlight">
      <div className="mx-auto grid max-w-[1600px] gap-8 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-12">
        <div className="grid gap-4 sm:grid-cols-2">
          {[product.image, heroImages[1], heroImages[2], products[5].image].map(
            (image, index) => (
              <div
                className={[
                  "min-h-[420px] bg-neutral-200 bg-cover bg-center",
                  index === 0 ? "sm:row-span-2 sm:min-h-[860px]" : "",
                ].join(" ")}
                key={`${image}-${index}`}
                style={{ backgroundImage: `url("${image}")` }}
              />
            ),
          )}
        </div>

        <aside className="self-start bg-white p-6 shadow-sm sm:p-8 lg:sticky lg:top-28">
          <p className="mb-3 text-sm font-black uppercase text-pink-600">
            Product focus
          </p>
          <h2 className="text-4xl font-black leading-none sm:text-6xl">
            {product.name}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-neutral-600">
            Фирменная посадка Bona Fide: высокая талия, акцент на силуэт,
            плотная поддержка и визуально чистая линия комплекта.
          </p>

          <div className="mt-6 flex items-end gap-3">
            <span className="text-3xl font-black">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="pb-1 text-lg font-semibold text-neutral-400 line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          <div className="mt-6">
            <div className="mb-3 flex items-center justify-between">
              <p className="font-black">Размер</p>
              <button className="font-bold underline" type="button">
                Таблица размеров
              </button>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {sizes.map((size) => (
                <button
                  className={[
                    "h-12 border text-base font-black transition",
                    selectedSize === size
                      ? "border-neutral-950 bg-neutral-950 text-white"
                      : "border-neutral-300 bg-white hover:border-neutral-950",
                  ].join(" ")}
                  key={size}
                  onClick={() => onSizeChange(size)}
                  type="button"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button
            className="mt-6 flex h-14 w-full items-center justify-center gap-2 bg-neutral-950 text-base font-black text-white transition hover:bg-pink-600"
            onClick={onAdd}
            type="button"
          >
            <ShoppingBag size={20} />
            Добавить в корзину
          </button>

          <div className="mt-6 grid gap-3 border-t border-neutral-200 pt-5 text-sm font-semibold">
            <div className="flex items-center gap-3">
              <Truck size={20} />
              Доставка бесплатно от 5 000 ₽
            </div>
            <div className="flex items-center gap-3">
              <Star size={20} />
              + {product.bonus} бонусов по программе лояльности
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function EditorialFooter() {
  return (
    <footer className="bg-neutral-950 px-5 py-12 text-white sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-[1600px] gap-8 lg:grid-cols-[1fr_1fr]">
        <div>
          <p className="mb-3 text-sm font-black uppercase text-pink-400">
            Bona Fide DNA
          </p>
          <h2 className="max-w-3xl text-5xl font-black leading-none sm:text-7xl">
            Сначала посадка. Потом все остальное.
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ["2015", "бренд развивает спортивную одежду с собственным характером"],
            ["СПБ", "собственное производство и контроль посадки"],
            ["Drop", "лимитированные цвета и регулярные обновления"],
            ["30%", "бонусами можно оплатить часть покупки"],
          ].map(([title, text]) => (
            <div className="border border-white/20 p-5" key={title}>
              <p className="text-4xl font-black text-pink-400">{title}</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-white/75">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

function CartDrawer({
  lines,
  onClose,
  onQuantityChange,
  open,
  subtotal,
}: {
  lines: CartLine[];
  onClose: () => void;
  onQuantityChange: (productId: string, size: string, delta: number) => void;
  open: boolean;
  subtotal: number;
}) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50">
      <button
        aria-label="Закрыть корзину"
        className="absolute inset-0 bg-black/45"
        onClick={onClose}
        type="button"
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex h-20 items-center justify-between border-b border-neutral-200 px-5">
          <div>
            <p className="text-sm font-bold text-neutral-500">Bona Fide</p>
            <h2 className="text-2xl font-black">Корзина</h2>
          </div>
          <button
            aria-label="Закрыть"
            className="flex size-11 items-center justify-center border border-neutral-200"
            onClick={onClose}
            type="button"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-auto px-5 py-5">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingBag size={42} />
              <p className="mt-4 text-xl font-black">Корзина пока пустая</p>
              <p className="mt-2 text-sm text-neutral-500">
                Добавь новинки или собери комплект из product focus.
              </p>
            </div>
          ) : (
            <div className="grid gap-5">
              {lines.map((line) => (
                <div
                  className="grid grid-cols-[92px_1fr] gap-4"
                  key={`${line.product.id}-${line.size}`}
                >
                  <div
                    className="aspect-square bg-neutral-100 bg-cover bg-center"
                    style={{ backgroundImage: `url("${line.product.image}")` }}
                  />
                  <div>
                    <p className="font-black">{line.product.name}</p>
                    <p className="mt-1 text-sm font-medium text-neutral-500">
                      {line.product.category} · {line.product.color} · {line.size}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <p className="font-black">{formatPrice(line.product.price)}</p>
                      <div className="flex items-center border border-neutral-200">
                        <button
                          aria-label="Уменьшить количество"
                          className="flex size-9 items-center justify-center"
                          onClick={() =>
                            onQuantityChange(line.product.id, line.size, -1)
                          }
                          type="button"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center text-sm font-black">
                          {line.quantity}
                        </span>
                        <button
                          aria-label="Увеличить количество"
                          className="flex size-9 items-center justify-center"
                          onClick={() =>
                            onQuantityChange(line.product.id, line.size, 1)
                          }
                          type="button"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-neutral-200 p-5">
          <div className="mb-4 flex items-center justify-between text-lg font-black">
            <span>Итого</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <button className="h-14 w-full bg-neutral-950 text-base font-black text-white transition hover:bg-pink-600">
            Оформить заказ
          </button>
        </div>
      </aside>
    </div>
  );
}
