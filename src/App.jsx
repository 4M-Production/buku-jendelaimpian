import React, { useState } from "react";
import {
  Menu, X, ShoppingBag, Search, Flame, ArrowRight, Mail,
  Instagram, Twitter, Shirt, Footprints, Sparkles, Layers, Plus, Minus,
} from "lucide-react";

/**
 * ====================================================================
 * DATA LAYER — ini bagian yang "fleksibel diupgrade ikut tren".
 * Semua konten di bawah ini sengaja dipisah dari layout/komponen.
 * Di produksi nyata, array-array ini diganti dengan hasil fetch dari
 * API tren (analytics penjualan, search volume, dst) — komponennya
 * sendiri tidak perlu disentuh sama sekali.
 * ====================================================================
 */
const trendingProducts = [
  {
    id: 1, name: "Hoodie Oversized \"Ombak\"", category: "Streetwear",
    price: 289000, trend: 124, icon: Shirt, img: "arus-hoodie-1",
    description: "Fleece tebal, potongan oversized, lagi rame dipakai beberapa kreator lokal minggu ini.",
  },
  {
    id: 2, name: "Sneakers Retro \"Lintas\"", category: "Sepatu",
    price: 459000, trend: 98, icon: Footprints, img: "arus-sneakers-1",
    description: "Siluet retro low-top, sol karet empuk, jadi salah satu sepatu paling banyak dicari pekan ini.",
  },
  {
    id: 3, name: "Tote Bag Canvas \"Pesisir\"", category: "Aksesoris",
    price: 99000, trend: 76, icon: ShoppingBag, img: "arus-totebag-1",
    description: "Canvas tebal anti sobek, muat laptop 14 inci, cocok buat dipakai harian.",
  },
  {
    id: 4, name: "Kaos Grafis \"Arus Lokal\"", category: "Streetwear",
    price: 129000, trend: 65, icon: Shirt, img: "arus-tshirt-1",
    description: "Sablon DTF tahan lama, bahan cotton combed 24s, desain edisi terbatas.",
  },
  {
    id: 5, name: "Cardigan Rajut \"Senja\"", category: "Outer",
    price: 219000, trend: 52, icon: Layers, img: "arus-cardigan-1",
    description: "Rajutan rapat, cocok buat cuaca mendung, ada 4 pilihan warna.",
  },
];

const tickerTerms = [
  "oversized hoodie", "sneakers retro", "tote bag canvas",
  "kaos grafis lokal", "cardigan rajut", "cargo pants", "topi bucket",
];

const categories = [
  { name: "Streetwear", count: 86, icon: Shirt },
  { name: "Sepatu", count: 42, icon: Footprints },
  { name: "Aksesoris", count: 65, icon: ShoppingBag },
  { name: "Outer & Rajut", count: 31, icon: Layers },
];

const catalogProducts = [
  { id: 11, name: "Jaket Denim \"Karang\"", price: 349000, icon: Layers, img: "arus-denim-1", description: "Denim washed, kancing logam, model regular fit." },
  { id: 12, name: "Celana Cargo \"Rantau\"", price: 259000, icon: Shirt, img: "arus-cargo-1", description: "6 kantong fungsional, bahan ripstop ringan." },
  { id: 13, name: "Topi Bucket \"Pasir\"", price: 79000, icon: ShoppingBag, img: "arus-bucket-1", description: "Bahan kanvas, reversible dua warna." },
  { id: 14, name: "Sandal Slide \"Karang\"", price: 119000, icon: Footprints, img: "arus-sandal-1", description: "Sol empuk, anti slip, ringan dipakai harian." },
  { id: 15, name: "Kaos Polo \"Teluk\"", price: 159000, icon: Shirt, img: "arus-polo-1", description: "Pique cotton, kerah rib, cocok semi-formal." },
  { id: 16, name: "Sling Bag \"Nusa\"", price: 139000, icon: ShoppingBag, img: "arus-slingbag-1", description: "Tahan air, kompartemen utama + kantong depan." },
];

function formatRupiah(n) {
  return "Rp" + n.toLocaleString("id-ID");
}

function TrendPulse() {
  const heights = [45, 75, 55, 95, 65];
  return (
    <div className="flex items-end gap-0.5 h-4" aria-hidden="true">
      {heights.map((h, i) => (
        <div
          key={i}
          className="w-1 rounded-sm bg-teal-500"
          style={{
            height: `${h}%`,
            transformOrigin: "bottom",
            animation: `arus-pulse 1.4s ease-in-out ${i * 0.12}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export default function ArusStorefront() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.qty * i.price, 0);

  function addToCart(product, qty = 1) {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, qty }];
    });
  }

  function changeQty(id, delta) {
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i))
    );
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }

  function handleSubscribe(e) {
    e.preventDefault();
    if (email.trim().length > 3) setSubscribed(true);
  }

  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="font-body bg-stone-950 text-stone-50 min-h-screen relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Work+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
        .font-display { font-family: 'Archivo Black', sans-serif; }
        .font-body { font-family: 'Work Sans', sans-serif; }
        .font-mono { font-family: 'IBM Plex Mono', monospace; }
        @keyframes arus-pulse {
          0%, 100% { opacity: 0.45; transform: scaleY(0.6); }
          50% { opacity: 1; transform: scaleY(1); }
        }
        @keyframes arus-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track { animation: arus-marquee 22s linear infinite; }
      `}</style>

      {/* TICKER */}
      <div className="bg-orange-600 text-orange-50 overflow-hidden whitespace-nowrap py-2">
        <div className="marquee-track inline-flex font-mono text-xs tracking-wide uppercase">
          {[...tickerTerms, ...tickerTerms].map((term, i) => (
            <span key={i} className="mx-6 inline-flex items-center gap-2">
              <Flame size={12} /> Sedang dicari: {term}
            </span>
          ))}
        </div>
      </div>

      {/* NAV */}
      <header className="border-b border-stone-800 sticky top-0 bg-stone-950 z-30">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-display text-xl tracking-tight">ARUS</span>
          <nav className="hidden md:flex items-center gap-8 text-sm text-stone-300">
            <button onClick={() => scrollToSection("trending")} className="hover:text-stone-50">Trending</button>
            <button onClick={() => scrollToSection("kategori")} className="hover:text-stone-50">Kategori</button>
            <button onClick={() => scrollToSection("katalog")} className="hover:text-stone-50">Semua Produk</button>
          </nav>
          <div className="hidden md:flex items-center gap-5">
            <Search size={18} className="text-stone-400" />
            <button
              onClick={() => setCartOpen(true)}
              className="relative text-stone-300 hover:text-stone-50"
              aria-label="Buka keranjang"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-600 text-[10px] font-mono w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setCartOpen(true)}
              className="relative text-stone-300"
              aria-label="Buka keranjang"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-600 text-[10px] font-mono w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Buka menu" className="text-stone-300">
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden px-6 pb-4 flex flex-col gap-3 text-sm text-stone-300">
            <button onClick={() => { scrollToSection("trending"); setMenuOpen(false); }} className="text-left">Trending</button>
            <button onClick={() => { scrollToSection("kategori"); setMenuOpen(false); }} className="text-left">Kategori</button>
            <button onClick={() => { scrollToSection("katalog"); setMenuOpen(false); }} className="text-left">Semua Produk</button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-teal-400 mb-4">
            Toko online · adaptif
          </p>
          <h1 className="font-display text-3xl md:text-5xl leading-tight mb-5">
            Toko yang nggak pernah ketinggalan tren.
          </h1>
          <p className="text-stone-300 mb-8 max-w-md">
            BUKU nge-update bagian "trending" secara otomatis berdasarkan
            data pencarian dan penjualan terbaru — bukan ditulis manual
            setiap minggu.
          </p>
          <button
            onClick={() => scrollToSection("trending")}
            className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-stone-50 font-medium px-5 py-3 rounded-full transition-colors"
          >
            Lihat yang Trending <ArrowRight size={16} />
          </button>
        </div>
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs text-stone-400 uppercase tracking-wide">
              Live · minggu ini
            </span>
            <Sparkles size={16} className="text-orange-500" />
          </div>
          {trendingProducts.slice(0, 3).map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedProduct(p)}
              className="w-full flex items-center justify-between py-3 border-b border-stone-800 last:border-none text-left"
            >
              <span className="text-sm text-stone-200 truncate pr-3">{p.name}</span>
              <span className="font-mono text-sm text-teal-400 shrink-0">+{p.trend}%</span>
            </button>
          ))}
        </div>
      </section>

      {/* TRENDING NOW */}
      <section id="trending" className="max-w-5xl mx-auto px-6 py-12" style={{ scrollMarginTop: "72px" }}>
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="font-display text-2xl">Sedang Naik Minggu Ini</h2>
            <p className="text-stone-400 text-sm mt-1">
              Diurutkan otomatis dari data pencarian &amp; penjualan
            </p>
          </div>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-6 px-6 md:mx-0 md:px-0">
          {trendingProducts.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.id}
                onClick={() => setSelectedProduct(p)}
                className="min-w-[220px] bg-stone-900 border border-stone-800 hover:border-stone-700 rounded-2xl p-5 shrink-0 cursor-pointer transition-colors"
              >
                <div className="relative w-full h-28 rounded-xl bg-stone-800 overflow-hidden mb-4">
                  <img
                    src={`https://picsum.photos/seed/${p.img}/300/220`}
                    alt={p.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-stone-950/80 rounded-full p-1.5">
                    <Icon size={14} className="text-stone-300" />
                  </span>
                </div>
                <p className="font-mono text-[11px] uppercase text-stone-500 mb-1">
                  {p.category}
                </p>
                <h3 className="text-sm font-medium leading-snug mb-3">{p.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm">{formatRupiah(p.price)}</span>
                  <div className="flex items-center gap-2">
                    <TrendPulse />
                    <span className="font-mono text-xs text-teal-400">+{p.trend}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* KATEGORI */}
      <section id="kategori" className="max-w-5xl mx-auto px-6 py-12" style={{ scrollMarginTop: "72px" }}>
        <h2 className="font-display text-2xl mb-6">Kategori</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((c) => {
            const Icon = c.icon;
            return (
              <button
                key={c.name}
                className="bg-stone-900 border border-stone-800 hover:border-stone-700 rounded-2xl p-5 text-left transition-colors"
              >
                <Icon size={22} className="text-orange-500 mb-3" />
                <p className="text-sm font-medium">{c.name}</p>
                <p className="font-mono text-xs text-stone-500 mt-1">{c.count} produk</p>
              </button>
            );
          })}
        </div>
      </section>

      {/* KATALOG */}
      <section id="katalog" className="max-w-5xl mx-auto px-6 py-12" style={{ scrollMarginTop: "72px" }}>
        <h2 className="font-display text-2xl mb-6">Semua Produk</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {catalogProducts.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.id}
                onClick={() => setSelectedProduct(p)}
                className="bg-stone-900 border border-stone-800 hover:border-stone-700 rounded-2xl p-4 cursor-pointer transition-colors"
              >
                <div className="relative w-full h-24 rounded-xl bg-stone-800 overflow-hidden mb-3">
                  <img
                    src={`https://picsum.photos/seed/${p.img}/280/200`}
                    alt={p.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-stone-950/80 rounded-full p-1.5">
                    <Icon size={12} className="text-stone-300" />
                  </span>
                </div>
                <h3 className="text-sm font-medium leading-snug mb-2">{p.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm">{formatRupiah(p.price)}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(p);
                    }}
                    className="text-stone-400 hover:text-orange-500 transition-colors"
                    aria-label="Tambah ke keranjang"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-xl mb-2">Jangan sampai ketinggalan arus.</h2>
            <p className="text-stone-400 text-sm max-w-sm">
              Dapat email kalau ada barang baru yang mulai naik tren, sebelum stoknya habis.
            </p>
          </div>
          {subscribed ? (
            <p className="text-teal-400 text-sm font-medium">
              Sip, kamu bakal dapet update tren duluan.
            </p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex w-full md:w-auto gap-2">
              <div className="flex items-center gap-2 bg-stone-950 border border-stone-700 rounded-full px-4 py-2 flex-1">
                <Mail size={16} className="text-stone-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@kamu.com"
                  className="bg-transparent outline-none text-sm flex-1 placeholder-stone-500"
                />
              </div>
              <button
                type="submit"
                className="bg-orange-600 hover:bg-orange-500 text-stone-50 text-sm font-medium px-5 py-2 rounded-full transition-colors shrink-0"
              >
                Gabung
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-stone-800">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display text-sm">ARUS</span>
          <p className="font-mono text-xs text-stone-500">© 2026 ARUS. Semua hak dilindungi.</p>
          <div className="flex items-center gap-4 text-stone-400">
            <Instagram size={18} />
            <Twitter size={18} />
          </div>
        </div>
      </footer>

      {/* PRODUCT DETAIL MODAL */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-stone-900 border border-stone-800 rounded-2xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <span className="font-mono text-[11px] uppercase text-stone-500">
                {selectedProduct.category || "Produk"}
              </span>
              <button onClick={() => setSelectedProduct(null)} aria-label="Tutup" className="text-stone-400 hover:text-stone-50">
                <X size={18} />
              </button>
            </div>
            <div className="w-full h-40 rounded-xl bg-stone-800 overflow-hidden mb-5">
              <img
                src={`https://picsum.photos/seed/${selectedProduct.img}/500/360`}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-display text-lg mb-2">{selectedProduct.name}</h3>
            <p className="text-stone-400 text-sm mb-4">{selectedProduct.description}</p>
            <div className="flex items-center justify-between mb-5">
              <span className="font-mono text-lg">{formatRupiah(selectedProduct.price)}</span>
              {selectedProduct.trend && (
                <span className="font-mono text-xs text-teal-400">+{selectedProduct.trend}% minggu ini</span>
              )}
            </div>
            <button
              onClick={() => {
                addToCart(selectedProduct);
                setSelectedProduct(null);
                setCartOpen(true);
              }}
              className="w-full bg-orange-600 hover:bg-orange-500 text-stone-50 text-sm font-medium py-3 rounded-full transition-colors"
            >
              Tambah ke Keranjang
            </button>
          </div>
        </div>
      )}

      {/* CART DRAWER */}
      {cartOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60" onClick={() => setCartOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-stone-900 border-l border-stone-800 p-6 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-display text-lg">Keranjang</h3>
              <button onClick={() => setCartOpen(false)} aria-label="Tutup keranjang" className="text-stone-400 hover:text-stone-50">
                <X size={20} />
              </button>
            </div>
            {cart.length === 0 ? (
              <p className="text-stone-500 text-sm">Keranjang masih kosong.</p>
            ) : (
              <div className="flex-1 overflow-y-auto flex flex-col gap-4">
                {cart.map((item) => (
                  <div key={item.id} className="border-b border-stone-800 pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm pr-2">{item.name}</span>
                      <button onClick={() => removeFromCart(item.id)} aria-label="Hapus" className="text-stone-500 hover:text-orange-500">
                        <X size={14} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 bg-stone-950 border border-stone-700 rounded-full px-2 py-1">
                        <button onClick={() => changeQty(item.id, -1)} aria-label="Kurangi"><Minus size={12} /></button>
                        <span className="font-mono text-xs w-4 text-center">{item.qty}</span>
                        <button onClick={() => changeQty(item.id, 1)} aria-label="Tambah"><Plus size={12} /></button>
                      </div>
                      <span className="font-mono text-sm">{formatRupiah(item.price * item.qty)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="border-t border-stone-800 pt-4 mt-4">
              <div className="flex justify-between mb-4">
                <span className="text-sm text-stone-400">Total</span>
                <span className="font-mono text-lg">{formatRupiah(cartTotal)}</span>
              </div>
              <button
                disabled={cart.length === 0}
                className="w-full bg-orange-600 hover:bg-orange-500 disabled:bg-stone-800 disabled:text-stone-500 text-stone-50 text-sm font-medium py-3 rounded-full transition-colors"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
