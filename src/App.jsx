import { useMemo, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const products = [
  { e: "🥛", n: "Молоко", d: "Утренняя дойка", p: "20 000 сум/л" },
  { e: "🧀", n: "Козий сыр", d: "Выдержка 30 дней", p: "120 000 сум/кг" },
  { e: "🥚", n: "Яйца", d: "Свободный выгул", p: "40 000 сум/10 шт" },
  { e: "🍯", n: "Мёд", d: "С пасеки фермы", p: "280 000 сум/кг" },
];

const tours = [
  { e: "🌅", n: "Рассвет на ферме", m: "2 часа", p: "от 249 000 сум", d: "Встречаем рассвет, доим коров, завтракаем." },
  { e: "🐄", n: "Тур с животными", m: "3 часа", p: "от 149 000 сум", d: "Кормление, уход и прогулка по ферме." },
  { e: "🧀", n: "Сырный мастер-класс", m: "4 часа", p: "от 279 000 сум", d: "Делаем козий сыр с нашим мастером." },
];

const reviews = [
  { name: "Марина, Ташкент", text: "Быстро забронировали. Очень уютная атмосфера, дети в восторге!", rating: 5 },
  { name: "Азиз, Самарканд", text: "Плов девзира — лучший, что я пробовал. Всё свежее и натуральное.", rating: 5 },
  { name: "Ольга, Чирчик", text: "Сырный мастер-класс — незабываемый опыт. Рекомендую всем!", rating: 5 },
];

const whyUs = [
  { e: "🌱", t: "100% органика", d: "Никакой химии. Только натуральное производство и строгий контроль качества." },
  { e: "🍽️", t: "Ресторан на ферме", d: "Продукты попадают на стол в день сбора — максимум вкуса и свежести." },
  { e: "👨‍👩‍👧‍👦", t: "Семейный отдых", d: "Безопасная локация, туры для детей и мастер-классы для всей семьи." },
  { e: "🏆", t: "3 года опыта", d: "Работаем с 2023 года. Тысячи довольных гостей из всего Узбекистана." },
];

// Scroll reveal hook
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function RevealSection({ children, className = "", delay = "" }) {
  const ref = useReveal();
  return <div ref={ref} className={`reveal ${delay} ${className}`}>{children}</div>;
}

export default function App() {
  const navigate = useNavigate();
  const [cart, setCart] = useState({});
  const [showCart, setShowCart] = useState(false);
  const [toast, setToast] = useState("");
  const [sent, setSent] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const totalItems = useMemo(() => Object.values(cart).reduce((a, b) => a + b, 0), [cart]);
  const cartKeys = useMemo(() => Object.keys(cart).filter((k) => cart[k] > 0), [cart]);

  const ping = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2400); };
  const add = (i) => { setCart((p) => ({ ...p, [i]: (p[i] || 0) + 1 })); ping("✓ Товар добавлен в корзину"); };
  const changeQty = (i, d) => setCart((p) => ({ ...p, [i]: Math.max(0, (p[i] || 0) + d) }));

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    e.currentTarget.reset();
    ping("✓ Заявка отправлена!");
  };

  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      {/* Ambient orbs */}
      <div className="bg-orb orb-a" />
      <div className="bg-orb orb-b" />
      <div className="bg-orb orb-c" />

      {/* Toast */}
      <div className={`toast ${toast ? "show" : ""}`}>{toast}</div>

      {/* NAV */}
      <nav>
        <div className="container row">
          <div className="logo">Navruz <span>Eco Farm</span></div>
          <ul className="nav-links">
            <li><a href="#about">О нас</a></li>
            <li><a href="#shop">Магазин</a></li>
            <li><a href="#rest">Ресторан</a></li>
            <li><a href="#gallery">Галерея</a></li>
            <li><a href="#tours">Туры</a></li>
            <li><a href="#book">Бронь</a></li>
          </ul>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn-outline" onClick={() => navigate("/menu")}>🍽 Меню</button>
            <button className="btn btn-brand" onClick={() => scrollTo("#book")}>Забронировать</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="container hero">
        <div className="hero-text">
          <div className="badge">
            <span className="badge-dot" />
            Узбекистан · Ташкентская область · Работаем с 2011
          </div>
          <h1>Эко-ферма<br />и ресторан<br /><em>Navruz</em></h1>
          <p className="hero-sub muted">Свежие органические продукты, ресторан с блюдами прямо с фермы и незабываемые туры для всей семьи.</p>
          <div className="hero-actions">
            <button className="btn btn-brand" onClick={() => navigate("/menu")}>🍽 Смотреть меню</button>
            <button className="btn btn-soft" onClick={() => scrollTo("#tours")}>Выбрать тур →</button>
          </div>
          <div className="stats">
            <div className="stat"><b>3 года</b><span>опыта</span></div>
            <div className="stat"><b>65 гектаров</b><span>земли</span></div>
            <div className="stat"><b>4.9 ★</b><span>оценка гостей</span></div>
          </div>
        </div>
        <aside className="hero-card card">
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", marginBottom: 12 }}>Сегодня на ферме</h3>
          <p className="muted" style={{ marginBottom: 16 }}>🥛 Молоко, 🧀 сыр, 🍅 томаты и 🌿 чай доступны в ресторане и магазине.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {["Ресторан открыт 10:00 – 22:00", "Магазин открыт 8:00 – 20:00", "Туры по записи"].map(t => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "0.88rem", color: "var(--muted)" }}>
                <span style={{ color: "var(--brand2)", fontSize: "0.7rem" }}>●</span> {t}
              </div>
            ))}
          </div>
          <button className="btn btn-brand" style={{ marginTop: 20, width: "100%" }} onClick={() => scrollTo("#book")}>
            Забронировать столик
          </button>
        </aside>
      </header>

      {/* WHY US */}
      <section id="about">
        <div className="container">
          <RevealSection>
            <span className="section-label">Почему мы</span>
            <h2>Настоящая ферма.<br />Настоящий вкус.</h2>
            <p className="section-desc">Мы выращиваем, производим и готовим — всё в одном месте. Никаких посредников, никакой химии.</p>
          </RevealSection>
          <div className="grid4">
            {whyUs.map((w, i) => (
              <RevealSection key={w.t} delay={`reveal-delay-${i + 1}`}>
                <div className="card item-card">
                  <div><div className="emoji">{w.e}</div><h3>{w.t}</h3><p className="muted">{w.d}</p></div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* SHOP */}
      <section id="shop">
        <div className="container">
          <RevealSection>
            <span className="section-label">Магазин</span>
            <h2>Органические продукты</h2>
            <p className="section-desc">Забирайте домой кусочек фермы. Всё собрано и произведено сегодня.</p>
          </RevealSection>
          <div className="grid4">
            {products.map((p, i) => (
              <RevealSection key={p.n} delay={`reveal-delay-${i + 1}`}>
                <div className="card item-card">
                  <div>
                    <div className="emoji">{p.e}</div>
                    <h3>{p.n}</h3>
                    <p className="muted">{p.d}</p>
                  </div>
                  <div className="meta-line">
                    <span className="price">{p.p}</span>
                    <button className="mini" onClick={() => add(i)}>+</button>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* RESTAURANT */}
      <section id="rest">
        <div className="container">
          <RevealSection>
            <span className="section-label">Ресторан</span>
            <h2>Блюда с душой фермы</h2>
            <p className="section-desc">Наш шеф-повар Баходир Каримов готовит из продуктов, собранных сегодня утром.</p>
          </RevealSection>
          <div className="grid3">
            <RevealSection delay="reveal-delay-1">
              <div className="card item-card">
                <div>
                  <div className="emoji">🍽</div>
                  <h3>Популярные блюда</h3>
                  <p className="muted">Плов девзира, форель на гриле, фермерские завтраки и сезонные десерты.</p>
                </div>
                <button className="btn btn-brand" onClick={() => navigate("/menu")} style={{ marginTop: 14 }}>Смотреть меню →</button>
              </div>
            </RevealSection>
            <RevealSection delay="reveal-delay-2">
              <div className="card item-card">
                <div>
                  <div className="emoji">👨‍🍳</div>
                  <h3>Шеф-повар</h3>
                  <p className="muted">Баходир Каримов — 12 лет опыта, лауреат конкурса «Лучший повар Узбекистана 2022».</p>
                </div>
              </div>
            </RevealSection>
            <RevealSection delay="reveal-delay-3">
              <div className="card item-card">
                <div>
                  <div className="emoji">🌿</div>
                  <h3>Сезонное меню</h3>
                  <p className="muted">Меню меняется каждый сезон. Только то, что выросло на нашей земле сейчас.</p>
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery">
        <div className="container">
          <RevealSection>
            <span className="section-label">Атмосфера</span>
            <h2>Фотогалерея</h2>
            <p className="section-desc">Загляните в наш ресторан и ферму — ещё до вашего приезда.</p>
          </RevealSection>
          <div className="gallery-grid">
            <img className="tall" src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80" alt="ресторан" />
            <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80" alt="блюдо" />
            <img src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80" alt="кухня" />
            <img src="https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?auto=format&fit=crop&w=800&q=80" alt="ферма" />
            <img src="https://images.unsplash.com/photo-1498579150354-977475b7ea0b?auto=format&fit=crop&w=800&q=80" alt="природа" />
          </div>
        </div>
      </section>

      {/* TOURS */}
      <section id="tours">
        <div className="container">
          <RevealSection>
            <span className="section-label">Экскурсии</span>
            <h2>Туры на ферме</h2>
            <p className="section-desc">Познакомьтесь с фермой изнутри. Идеально для детей и всей семьи.</p>
          </RevealSection>
          <div className="grid3">
            {tours.map((t, i) => (
              <RevealSection key={t.n} delay={`reveal-delay-${i + 1}`}>
                <div className="card item-card">
                  <div>
                    <div className="emoji">{t.e}</div>
                    <h3>{t.n}</h3>
                    <p className="muted">{t.d}</p>
                    <p className="muted" style={{ marginTop: 6, fontSize: "0.85rem" }}>⏱ {t.m}</p>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14 }}>
                    <span className="price">{t.p}</span>
                    <button className="btn btn-outline" onClick={() => scrollTo("#book")}>Записаться</button>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section>
        <div className="container">
          <RevealSection>
            <span className="section-label">Отзывы</span>
            <h2>Что говорят гости</h2>
          </RevealSection>
          <div className="grid3">
            {reviews.map((r, i) => (
              <RevealSection key={r.name} delay={`reveal-delay-${i + 1}`}>
                <div className="card item-card">
                  <div>
                    <div className="stars">{"★".repeat(r.rating)}</div>
                    <p className="muted" style={{ marginTop: 12 }}>«{r.text}»</p>
                  </div>
                  <div className="reviewer">{r.name}</div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section id="book">
        <div className="container">
          <RevealSection>
            <div className="card book" style={{ maxWidth: 780, margin: "0 auto" }}>
              <span className="section-label">Онлайн-запись</span>
              <h2>Забронировать</h2>
              <p className="muted">Подтверждаем заявку в течение часа. Бронирование бесплатное.</p>
              <form className="form" onSubmit={submit}>
                <input required placeholder="Ваше имя" />
                <input required placeholder="Телефон" />
                <input type="date" required />
                <select>
                  <option>2 гостя</option>
                  <option>3–4 гостя</option>
                  <option>5–8 гостей</option>
                  <option>Больше 8</option>
                </select>
                <select className="full">
                  <option>Ужин в ресторане</option>
                  <option>Завтрак на ферме</option>
                  <option>Тур «Рассвет»</option>
                  <option>Тур с животными</option>
                  <option>Мастер-класс по сыру</option>
                </select>
                <textarea className="full" placeholder="Особые пожелания или вопросы" />
                <button className="btn btn-brand full" type="submit" style={{ padding: "15px" }}>
                  Отправить заявку →
                </button>
              </form>
              {sent && <div className="ok">✓ Заявка принята! Мы свяжемся с вами в течение часа.</div>}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="container row">
          <div>
            <div className="logo" style={{ marginBottom: 4 }}>Navruz <span>Eco Farm</span></div>
            <div className="footer-copy">© 2026 · Ташкент</div>
          </div>
          <div className="footer-actions">
            <button className="btn btn-soft" onClick={() => ping("📞 +998 (99) 107-70-10")}>Позвонить</button>
            <button className="btn btn-soft" onClick={() => window.open("https://maps.google.com/?q=Bostanliq+district+Tashkent+region", "_blank")}>Карта</button>
            <button className="btn btn-outline" onClick={() => navigate("/menu")}>🍽 Меню</button>
          </div>
        </div>
      </footer>

      {/* Cart FAB */}
      {totalItems > 0 && (
        <div className="fab">
          <button onClick={() => setShowCart(true)}>🛒</button>
          <span className="badge-count">{totalItems}</span>
        </div>
      )}

      {/* Cart modal */}
      <div className={`modal-bg ${showCart ? "open" : ""}`} onClick={(e) => e.target.classList.contains("modal-bg") && setShowCart(false)}>
        <div className="modal">
          <div className="modal-header">
            <h3>🛒 Корзина</h3>
            <button className="btn btn-soft" onClick={() => setShowCart(false)}>✕ Закрыть</button>
          </div>
          {cartKeys.length ? (
            <>
              {cartKeys.map((k) => (
                <div className="menu-row" key={k}>
                  <span>{products[k].e} {products[k].n}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <button className="mini" onClick={() => changeQty(k, -1)}>−</button>
                    <b>{cart[k]}</b>
                    <button className="mini" onClick={() => changeQty(k, 1)}>+</button>
                  </span>
                </div>
              ))}
              <button className="btn btn-brand" style={{ width: "100%", marginTop: 18 }} onClick={() => { setShowCart(false); scrollTo("#book"); }}>
                Оформить заказ →
              </button>
            </>
          ) : <p className="muted" style={{ textAlign: "center", padding: "20px 0" }}>Корзина пуста</p>}
        </div>
      </div>
    </>
  );
}