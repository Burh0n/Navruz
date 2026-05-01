import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const menuData = {
  "Завтраки": {
    icon: "🌅",
    items: [
      { e: "🍳", name: "Яичница с зеленью фермы", desc: "Три яйца свободного выгула, свежая зелень, помидоры черри", price: "34 000 сум", badge: "hit" },
      { e: "🧀", name: "Творожные шарики", desc: "Домашний творог, зелень, чеснок. Подаётся со сметаной", price: "36 000 сум", badge: null },
      { e: "🥣", name: "Каша из полбы с мёдом", desc: "Полба с фермы, наш мёд, сезонные фрукты и орехи", price: "28 000 сум", badge: "veg" },
      { e: "🥞", name: "Блинчики с козьим сыром", desc: "Тонкие блины на козьем молоке, начинка из свежего сыра", price: "38 000 сум", badge: "new" },
      { e: "🍓", name: "Фермерская тарелка", desc: "Сыры, мёд, сезонные варенья, хлеб на закваске", price: "54 000 сум", badge: null },
      { e: "☕", name: "Кофе с фермерским молоком", desc: "Эспрессо или фильтр, цельное молоко утренней дойки", price: "22 000 сум", badge: null },
    ]
  },
  "Основные блюда": {
    icon: "🍽",
    items: [
      { e: "🍚", name: "Плов девзира", desc: "Рис девзира, ягнятина с фермы, морковь, чеснок. Рецепт 1947 года", price: "78 000 сум", badge: "hit" },
      { e: "🐑", name: "Рёбра ягнёнка на углях", desc: "Ягнятина на открытых углях, соус из трав, лепёшка тандыр", price: "128 000 сум", badge: null },
      { e: "🐟", name: "Форель на гриле", desc: "Форель из горной реки, запечённые овощи с фермы, ароматные травы", price: "96 000 сум", badge: "new" },
      { e: "🥩", name: "Говяжий стейк", desc: "Говядина собственного выпаса, 180г, соус из козьего молока", price: "145 000 сум", badge: null },
      { e: "🫕", name: "Мастава с фермерскими овощами", desc: "Густой суп с рисом, томатами и мясом. Традиционный рецепт", price: "42 000 сум", badge: "veg" },
      { e: "🥗", name: "Тёплый салат с козьим сыром", desc: "Сезонные овощи с грядки, козий сыр, грецкие орехи, оливковое масло", price: "46 000 сум", badge: "veg" },
    ]
  },
  "Закуски и салаты": {
    icon: "🥙",
    items: [
      { e: "🥗", name: "Салат из томатов и огурцов", desc: "Томаты и огурцы с грядки, лук, зелень, оливковое масло", price: "24 000 сум", badge: "veg" },
      { e: "🫙", name: "Сырная тарелка", desc: "3 вида козьего сыра собственного производства, виноград, мёд", price: "68 000 сум", badge: null },
      { e: "🧆", name: "Мучные шарики с зеленью", desc: "Хрустящие шарики из нутовой муки, соус из свежей мяты", price: "32 000 сум", badge: "veg" },
      { e: "🍞", name: "Хлеб тандыр с маслом", desc: "Свежий хлеб из печи тандыр, домашнее сливочное масло", price: "18 000 сум", badge: null },
    ]
  },
  "Десерты": {
    icon: "🍮",
    items: [
      { e: "🍯", name: "Чак-чак с мёдом фермы", desc: "Классический чак-чак пропитанный нашим горным мёдом", price: "34 000 сум", badge: "hit" },
      { e: "🍮", name: "Молочная халва", desc: "Халва на козьем молоке, без красителей, ореховая крошка", price: "28 000 сум", badge: null },
      { e: "🍓", name: "Сезонные фрукты с кремом", desc: "Фрукты прямо с сада, взбитые сливки козьего молока", price: "36 000 сум", badge: "new" },
      { e: "🧁", name: "Творожный кекс", desc: "На основе фермерского творога, с ванилью и лимонной цедрой", price: "30 000 сум", badge: null },
    ]
  },
  "Напитки": {
    icon: "🍵",
    items: [
      { e: "🍵", name: "Чай из трав фермы", desc: "Смесь сушёных трав: мята, мелисса, чабрец, шиповник", price: "16 000 сум", badge: "hit" },
      { e: "🥛", name: "Свежее молоко", desc: "Молоко утренней дойки, козье или коровье — на выбор", price: "12 000 сум", badge: null },
      { e: "🍋", name: "Лимонад из мяты и лимона", desc: "Домашний лимонад, без консервантов и сахара", price: "20 000 сум", badge: "veg" },
      { e: "☕", name: "Кофе", desc: "Эспрессо, американо, капучино. Со свежим фермерским молоком", price: "18 000 сум", badge: null },
      { e: "🫖", name: "Зелёный чай Ташкент", desc: "Узбекский зелёный чай, чайник с термосом", price: "14 000 сум", badge: null },
    ]
  }
};

const badgeLabel = { new: "Новинка", hit: "Хит", veg: "Вег" };

export default function MenuPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [toast, setToast] = useState("");
  const [cart, setCart] = useState({});
  const [animating, setAnimating] = useState(false);

  const ping = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2400); };

  const addToCart = (name) => {
    setCart(p => ({ ...p, [name]: (p[name] || 0) + 1 }));
    ping("✓ Добавлено в заказ");
  };

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

  const tabs = ["all", ...Object.keys(menuData)];
  const tabLabels = { all: "Всё меню", ...Object.fromEntries(Object.entries(menuData).map(([k, v]) => [k, v.icon + " " + k])) };

  const switchTab = (tab) => {
    setAnimating(true);
    setTimeout(() => { setActiveTab(tab); setAnimating(false); }, 200);
  };

  const visibleCategories = activeTab === "all" ? Object.entries(menuData) : [[activeTab, menuData[activeTab]]];

  return (
    <div className="menu-page">
      <div className="bg-orb orb-a" />
      <div className="bg-orb orb-b" />
      <div className={`toast ${toast ? "show" : ""}`}>{toast}</div>

      {/* NAV */}
      <nav>
        <div className="container row">
          <button className="menu-back" onClick={() => navigate("/")}>
            <span className="back-arrow">←</span>
            <span className="logo">Navruz <span>Eco Farm</span></span>
          </button>
          <ul className="nav-links">
            {Object.entries(menuData).map(([cat, v]) => (
              <li key={cat}><a href="#" onClick={e => { e.preventDefault(); switchTab(cat); }}>{v.icon} {cat}</a></li>
            ))}
          </ul>
          {totalItems > 0 && (
            <button className="btn btn-brand" onClick={() => navigate("/", { state: { scrollTo: "book" } })}>
              🛒 {totalItems} · Оформить
            </button>
          )}
        </div>
      </nav>

      {/* HERO */}
      <div className="menu-hero">
        <div className="container" style={{ animation: "fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) both" }}>
          <span className="section-label">Ресторан Navruz Eco Farm</span>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.2rem,5vw,3.8rem)", marginBottom: 12 }}>
            Меню ресторана
          </h1>
          <p className="muted" style={{ maxWidth: 520, margin: "0 auto 10px" }}>
            Все блюда готовятся из продуктов нашей фермы. Меню обновляется каждый сезон.
          </p>

          {/* Tabs */}
          <div className="menu-tabs">
            {tabs.map(tab => (
              <button key={tab} className={`tab-btn ${activeTab === tab ? "active" : ""}`} onClick={() => switchTab(tab)}>
                {tabLabels[tab]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chef block */}
      <div className="container" style={{ marginTop: 50 }}>
        <div className="chef-block" style={{ animation: "fadeUp 0.9s ease 0.1s both" }}>
          <div className="chef-avatar">👨‍🍳</div>
          <div className="chef-info">
            <h3>Шеф-повар Баходир Каримов</h3>
            <p>12 лет опыта в узбекской и современной кухне. Все блюда готовятся с использованием продуктов, собранных в этот же день на нашей ферме. Лауреат конкурса «Лучший повар Узбекистана 2022».</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginLeft: "auto", flexShrink: 0 }}>
            <div style={{ fontSize: "0.82rem", color: "var(--muted)", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "var(--warn)" }}>★★★★★</span> 4.9 / 5.0
            </div>
            <div style={{ fontSize: "0.82rem", color: "var(--muted)" }}>🕐 Ежедневно 10:00–22:00</div>
            <div style={{ fontSize: "0.82rem", color: "var(--muted)" }}>📍 Ташкентская область</div>
          </div>
        </div>
      </div>

      {/* Menu sections */}
      <div className="container menu-section" style={{ opacity: animating ? 0 : 1, transition: "opacity 0.2s" }}>
        {visibleCategories.map(([cat, data]) => (
          <div key={cat} style={{ marginBottom: 56 }}>
            <div className="menu-cat-label">
              <span style={{ fontSize: "2rem" }}>{data.icon}</span>
              <h2>{cat}</h2>
              <div className="cat-line" />
              <span style={{ color: "var(--muted)", fontSize: "0.85rem", whiteSpace: "nowrap" }}>{data.items.length} блюд</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 18 }}>
              {data.items.map((item, i) => (
                <div
                  key={item.name}
                  className="menu-card"
                  style={{ animation: `fadeUp 0.6s ease ${i * 0.07}s both` }}
                >
                  <div className="menu-card-top">
                    <span className="menu-card-emoji">{item.e}</span>
                    {item.badge && (
                      <span className={`menu-card-badge badge-${item.badge}`}>{badgeLabel[item.badge]}</span>
                    )}
                  </div>
                  <h3>{item.name}</h3>
                  <p>{item.desc}</p>
                  <div className="menu-card-footer">
                    <span className="menu-card-price">{item.price}</span>
                    <button className="add-btn" onClick={() => addToCart(item.name)} title="Добавить в заказ">+</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="menu-cta container">
        <span className="section-label">Готовы к визиту?</span>
        <h2>Забронируйте стол прямо сейчас</h2>
        <p className="muted">Подтверждение в течение часа. Бронирование бесплатное.</p>
        <div className="actions">
          <button className="btn btn-brand" onClick={() => navigate("/#book")}>Забронировать →</button>
          <button className="btn btn-soft" onClick={() => navigate("/")}>← Вернуться на главную</button>
        </div>
      </div>

      {/* Cart FAB */}
      {totalItems > 0 && (
        <div className="fab">
          <button onClick={() => navigate("/")}>🛒</button>
          <span className="badge-count">{totalItems}</span>
        </div>
      )}
    </div>
  );
}