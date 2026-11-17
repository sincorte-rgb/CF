// ==========================================
// CF CELL - APLICACIÓN WEB & GESTIÓN DE CATÁLOGO
// Tema: Pink & Black (Elegante y Moderno)
// ==========================================

const DEFAULT_SETTINGS = {
  whatsapp: "595983236508",
  displayPhone: "0983 236 508",
  address: "Lopez de Vega c/ Carlos M. Gimenez",
  hours: "Lun a Sáb: 08:00 a 18:30 hs",
  currency: "Gs."
};

const DEFAULT_PRODUCTS = [
  {
    id: "prod-1",
    title: "Cargador Notebook Lenovo 20V 3.25A USB-C 65W",
    category: "Cargadores Notebook",
    retailPrice: 150000,
    wholesalePrice: 110000,
    inStock: true,
    image: "img/CargadorLenovo20V.jpg",
    description: "Cargador tipo C de alta calidad compatible con ThinkPad, Yoga, IdeaPad y marcas universales."
  },
  {
    id: "prod-2",
    title: "Cargador Notebook HP 19.5V 3.33A Punta Azul 65W",
    category: "Cargadores Notebook",
    retailPrice: 140000,
    wholesalePrice: 105000,
    inStock: true,
    image: "img/CargadorHP19.5VAzul65W.jpg",
    description: "Filtro de protección contra sobretensión. Compatible con series Pavilion y ProBook."
  },
  {
    id: "prod-3",
    title: "Cargador Notebook Dell 19.5V 4.62A 90W Pin Central",
    category: "Cargadores Notebook",
    retailPrice: 145000,
    wholesalePrice: 108000,
    inStock: true,
    image: "img/CargadorDell19.5V4.62A90W.jpg",
    description: "Cargador OEM de alta durabilidad para Dell Inspiron y Vostro."
  },
  {
    id: "prod-4",
    title: "Disco de Estado Sólido SSD Kingston A400 480GB",
    category: "Informática",
    retailPrice: 220000,
    wholesalePrice: 175000,
    inStock: true,
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80",
    description: "10x más rápido que un disco tradicional. Ideal para revivir notebooks y PCs lentas."
  },
  {
    id: "prod-5",
    title: "Memoria RAM Kingston Fury 8GB DDR4 3200MHz",
    category: "Informática",
    retailPrice: 160000,
    wholesalePrice: 125000,
    inStock: true,
    image: "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=600&q=80",
    description: "Para Notebook y PC de escritorio. Mayor fluidez multitarea y rendimiento."
  },
  {
    id: "prod-6",
    title: "Celular Android Pantalla Quebrada (Samsung A02, A03 y más)",
    category: "Repuestos",
    retailPrice: 230000,
    wholesalePrice: 175000,
    inStock: true,
    image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80",
    description: "Reparamos tu pantalla a partir de 230.000 Gs. Para Samsung A02, A03 y toda la línea Android con garantía."
  },
  {
    id: "prod-7",
    title: "Pantalla iPhone (iPhone X, XR, 11 y más)",
    category: "Repuestos",
    retailPrice: 250000,
    wholesalePrice: 195000,
    inStock: true,
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=600&q=80",
    description: "Reparamos tu iPhone a partir de 250.000 Gs. Pantallas para iPhone X, XR, 11 con repuestos de calidad garantizada."
  },
  {
    id: "prod-8",
    title: "Kit Cámaras CCTV DVR 4 Canales + 2 Cámaras Infrarrojas HD",
    category: "CCTV & Seguridad",
    retailPrice: 580000,
    wholesalePrice: 460000,
    inStock: true,
    image: "img/Kitcamaras4.jpg",
    description: "Visión nocturna, detección de movimiento y monitoreo remoto desde celular."
  },
  {
    id: "prod-9",
    title: "Fuente Conmutada 12V 5A para Cámaras CCTV y Tiras LED",
    category: "CCTV & Seguridad",
    retailPrice: 85000,
    wholesalePrice: 62000,
    inStock: true,
    image: "img/Fuente12V5AMetal.jpg",
    description: "Carcasa metálica perforada con fusible y bornera para distribución de energía."
  },
  {
    id: "prod-10",
    title: "Cable USB Tipo C Carga Rápida 60W Reforzado",
    category: "Accesorios",
    retailPrice: 35000,
    wholesalePrice: 22000,
    inStock: true,
    image: "img/cabletipoC.jpg",
    description: "Malla de nylon trenzado antienredos compatible con Xiaomi, Samsung, Motorola."
  }
];

let products = [];
let settings = {};
let currentCategory = 'all';
let searchQuery = '';
let priceView = 'retail';

document.addEventListener('DOMContentLoaded', () => {
  loadData();
  applySettings();
  renderProducts();
  renderAdminTable();
  initCotizador();
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

function loadData() {
  const storedProducts = localStorage.getItem('cf_cell_products_pink_v5');
  if (storedProducts) {
    try {
      products = JSON.parse(storedProducts);
    } catch (e) {
      products = [...DEFAULT_PRODUCTS];
    }
  } else {
    products = [...DEFAULT_PRODUCTS];
    saveProducts();
  }

  const storedSettings = localStorage.getItem('cf_cell_settings_pink_v5');
  if (storedSettings) {
    try {
      settings = JSON.parse(storedSettings);
    } catch (e) {
      settings = { ...DEFAULT_SETTINGS };
    }
  } else {
    settings = { ...DEFAULT_SETTINGS };
    saveSettings();
  }
}

function saveProducts() {
  localStorage.setItem('cf_cell_products_pink_v5', JSON.stringify(products));
}

function saveSettings() {
  localStorage.setItem('cf_cell_settings_pink_v5', JSON.stringify(settings));
}

function applySettings() {
  const phone = settings.whatsapp || DEFAULT_SETTINGS.whatsapp;
  const genericMsg = encodeURIComponent("¡Hola CF Cell! Vengo desde su página web y quiero hacer una consulta.");
  const waUrl = `https://wa.me/${phone}?text=${genericMsg}`;

  const headerBtn = document.getElementById('btn-header-whatsapp');
  if (headerBtn) headerBtn.href = waUrl;

  const heroBtn = document.getElementById('btn-hero-quote');
  if (heroBtn) heroBtn.href = waUrl;

  const floatingBtn = document.getElementById('btn-floating-whatsapp');
  if (floatingBtn) floatingBtn.href = waUrl;

  const wholesaleBtn = document.getElementById('btn-wholesale-contact');
  if (wholesaleBtn) {
    const wholesaleMsg = encodeURIComponent("¡Hola CF Cell! Soy técnico / comerciante y deseo solicitar la lista de precios mayoristas.");
    wholesaleBtn.href = `https://wa.me/${phone}?text=${wholesaleMsg}`;
  }

  const topAddress = document.getElementById('top-address');
  if (topAddress) topAddress.innerHTML = `<i class="fa-solid fa-location-dot text-pink-400 mr-1.5"></i> ${settings.address || DEFAULT_SETTINGS.address}`;

  const contactAddress = document.getElementById('contact-address');
  if (contactAddress) contactAddress.textContent = settings.address || DEFAULT_SETTINGS.address;

  const contactPhone = document.getElementById('contact-phone');
  if (contactPhone) contactPhone.textContent = settings.displayPhone || "0983 236 508";

  const contactHours = document.getElementById('contact-hours');
  if (contactHours) contactHours.textContent = settings.hours || DEFAULT_SETTINGS.hours;

  const settingWaInput = document.getElementById('setting-whatsapp');
  if (settingWaInput) settingWaInput.value = settings.whatsapp || '';

  const settingDispInput = document.getElementById('setting-display-phone');
  if (settingDispInput) settingDispInput.value = settings.displayPhone || '0983 236 508';

  const settingAddrInput = document.getElementById('setting-address');
  if (settingAddrInput) settingAddrInput.value = settings.address || '';

  const settingHoursInput = document.getElementById('setting-hours');
  if (settingHoursInput) settingHoursInput.value = settings.hours || '';

  const settingCurrInput = document.getElementById('setting-currency');
  if (settingCurrInput) settingCurrInput.value = settings.currency || 'Gs.';
}

function saveGeneralSettings() {
  const waInput = document.getElementById('setting-whatsapp').value.trim().replace(/[^0-9]/g, '');
  const dispInput = document.getElementById('setting-display-phone').value.trim();
  const addrInput = document.getElementById('setting-address').value.trim();
  const hoursInput = document.getElementById('setting-hours').value.trim();
  const currInput = document.getElementById('setting-currency').value.trim();

  settings = {
    whatsapp: waInput || DEFAULT_SETTINGS.whatsapp,
    displayPhone: dispInput || DEFAULT_SETTINGS.displayPhone,
    address: addrInput || DEFAULT_SETTINGS.address,
    hours: hoursInput || DEFAULT_SETTINGS.hours,
    currency: currInput || "Gs."
  };

  saveSettings();
  applySettings();
  renderProducts();
  alert("¡Configuración guardada exitosamente!");
}

function formatPrice(number) {
  const currency = settings.currency || "Gs.";
  return `${Number(number).toLocaleString('es-PY')} ${currency}`;
}

function setPriceView(view) {
  priceView = view;
  const retailBtn = document.getElementById('view-retail-btn');
  const wholesaleBtn = document.getElementById('view-wholesale-btn');

  if (view === 'retail') {
    retailBtn.className = "px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-pink-600 text-white transition shadow";
    wholesaleBtn.className = "px-3.5 py-1.5 text-xs font-semibold rounded-lg text-slate-400 hover:text-amber-400 transition";
  } else {
    wholesaleBtn.className = "px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-amber-500 text-slate-950 font-bold transition shadow";
    retailBtn.className = "px-3.5 py-1.5 text-xs font-semibold rounded-lg text-slate-400 hover:text-pink-400 transition";
  }

  renderProducts();
}

function filterCategory(category) {
  currentCategory = category;

  const pills = document.querySelectorAll('.cat-pill');
  pills.forEach(pill => {
    if ((category === 'all' && pill.textContent.trim() === 'Todos') || pill.textContent.trim() === category) {
      pill.className = "cat-pill px-3.5 py-1.5 rounded-lg text-xs font-medium bg-pink-500/20 text-pink-300 border border-pink-500/40";
    } else {
      pill.className = "cat-pill px-3.5 py-1.5 rounded-lg text-xs font-medium bg-slate-900 text-slate-400 hover:text-white border border-slate-800";
    }
  });

  renderProducts();
}

function searchProducts(query) {
  searchQuery = query.toLowerCase().trim();
  renderProducts();
}

function renderProducts() {
  const grid = document.getElementById('product-grid');
  const emptyState = document.getElementById('empty-state');
  if (!grid) return;

  grid.innerHTML = '';

  const filtered = products.filter(p => {
    const matchCat = (currentCategory === 'all' || p.category === currentCategory);
    const matchSearch = (!searchQuery || 
      p.title.toLowerCase().includes(searchQuery) || 
      p.description.toLowerCase().includes(searchQuery) ||
      p.category.toLowerCase().includes(searchQuery));
    return matchCat && matchSearch;
  });

  if (filtered.length === 0) {
    emptyState.classList.remove('hidden');
    return;
  } else {
    emptyState.classList.add('hidden');
  }

  const phone = settings.whatsapp || DEFAULT_SETTINGS.whatsapp;

  filtered.forEach(p => {
    const isWholesale = (priceView === 'wholesale');
    const displayPrice = isWholesale ? p.wholesalePrice : p.retailPrice;
    const priceLabel = isWholesale ? 'Precio Mayorista' : 'Precio Minorista';
    const tagBadge = isWholesale 
      ? `<span class="bg-amber-500/20 text-amber-300 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-amber-500/30">Gremio / Mayorista</span>`
      : `<span class="bg-pink-500/10 text-pink-400 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-pink-500/20">${p.category}</span>`;

    const orderText = encodeURIComponent(
      `¡Hola CF Cell! Quiero consultar por el producto:\n` +
      `📦 *${p.title}*\n` +
      `🏷️ Categoría: ${p.category}\n` +
      `💰 Precio (${priceLabel}): ${formatPrice(displayPrice)}\n` +
      `¿Tienen stock disponible? Muchas gracias.`
    );
    const waProductLink = `https://wa.me/${phone}?text=${orderText}`;

    const card = document.createElement('div');
    card.className = "product-card bg-[#0f0f16] border border-pink-950/40 hover:border-pink-500/50 rounded-2xl overflow-hidden flex flex-col transition duration-300 shadow-lg glow-card";

    const imgUrl = p.image || 'https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=600&q=80';

    card.innerHTML = `
      <div class="relative h-44 overflow-hidden bg-black">
        <img src="${imgUrl}" alt="${p.title}" class="product-card-img w-full h-full object-cover" onerror="this.src='https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=600&q=80'">
        <div class="absolute top-3 left-3">
          ${tagBadge}
        </div>
        ${p.inStock ? 
          `<span class="absolute top-3 right-3 bg-emerald-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">Stock Disponible</span>` : 
          `<span class="absolute top-3 right-3 bg-rose-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">A Pedido</span>`
        }
      </div>

      <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 class="font-heading font-bold text-white text-base leading-snug line-clamp-2">${p.title}</h3>
          <p class="text-xs text-slate-400 mt-2 line-clamp-2">${p.description}</p>
        </div>

        <div class="pt-3 border-t border-slate-800/80 flex items-center justify-between">
          <div>
            <span class="block text-[10px] uppercase font-bold tracking-wider ${isWholesale ? 'text-amber-400' : 'text-slate-400'}">${priceLabel}</span>
            <span class="text-lg font-extrabold ${isWholesale ? 'text-amber-300' : 'text-white'} font-heading">${formatPrice(displayPrice)}</span>
          </div>

          <a href="${waProductLink}" target="_blank" class="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 transition shadow-md shadow-emerald-500/20">
            <i class="fa-brands fa-whatsapp text-sm"></i>
            <span>Consultar</span>
          </a>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}

function quickQuote(serviceName) {
  const phone = settings.whatsapp || DEFAULT_SETTINGS.whatsapp;
  const msg = encodeURIComponent(
    `¡Hola CF Cell! Necesito un presupuesto / servicio técnico para:\n` +
    `🔧 *Servicio / Equipo:* ${serviceName}\n` +
    `¿Me podrían indicar los pasos para acercarlo a Lopez de Vega c/ Carlos M. Gimenez o cotizarlo? ¡Gracias!`
  );
  window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
}

function handleContactForm(e) {
  e.preventDefault();
  const name = document.getElementById('form-name').value.trim();
  const type = document.getElementById('form-type').value;
  const model = document.getElementById('form-model').value.trim();
  const message = document.getElementById('form-message').value.trim();

  const phone = settings.whatsapp || DEFAULT_SETTINGS.whatsapp;
  const formattedText = encodeURIComponent(
    `*NUEVA CONSULTA DESDE LA WEB - CF CELL*\n\n` +
    `👤 *Nombre:* ${name}\n` +
    `📋 *Tipo:* ${type}\n` +
    `💻 *Equipo / Producto:* ${model}\n` +
    `💬 *Mensaje:* ${message}\n\n` +
    `📍 *Referencia:* Lopez de Vega c/ Carlos M. Gimenez`
  );

  window.open(`https://wa.me/${phone}?text=${formattedText}`, '_blank');
}

// Mini formulario del Hero (al principio de la página)
function setHeroQuery(type, modelPrefix) {
  const typeEl = document.getElementById('hero-type');
  const modelEl = document.getElementById('hero-model');
  if (typeEl) typeEl.value = type;
  if (modelEl) {
    modelEl.value = modelPrefix;
    modelEl.focus();
  }
}

function handleHeroContactForm(e) {
  e.preventDefault();
  const name = document.getElementById('hero-name').value.trim();
  const type = document.getElementById('hero-type').value;
  const model = document.getElementById('hero-model').value.trim();
  const message = document.getElementById('hero-message').value.trim();

  const phone = settings.whatsapp || DEFAULT_SETTINGS.whatsapp;
  const formattedText = encodeURIComponent(
    `*CONSULTA / PEDIDO DIRECTO - CF CELL*\n\n` +
    `👤 *Nombre:* ${name}\n` +
    `📋 *Tipo:* ${type}\n` +
    `💻 *Equipo / Producto:* ${model}\n` +
    `💬 *Detalle:* ${message}\n\n` +
    `📍 *Ubicación:* Lopez de Vega c/ Carlos M. Gimenez`
  );

  window.open(`https://wa.me/${phone}?text=${formattedText}`, '_blank');
}

function openAdminModal() {
  document.getElementById('admin-modal').classList.remove('hidden');
  renderAdminTable();
}

function closeAdminModal() {
  document.getElementById('admin-modal').classList.add('hidden');
  cancelProductEdit();
}

function switchAdminTab(tabId) {
  const tabProducts = document.getElementById('tab-products');
  const tabSettings = document.getElementById('tab-settings');
  const btnProducts = document.getElementById('btn-tab-products');
  const btnSettings = document.getElementById('btn-tab-settings');

  if (tabId === 'tab-products') {
    tabProducts.classList.remove('hidden');
    tabSettings.classList.add('hidden');
    btnProducts.className = "px-4 py-2 text-xs font-semibold border-b-2 border-pink-500 text-pink-400";
    btnSettings.className = "px-4 py-2 text-xs font-semibold border-b-2 border-transparent text-slate-400 hover:text-slate-200";
  } else {
    tabSettings.classList.remove('hidden');
    tabProducts.classList.add('hidden');
    btnSettings.className = "px-4 py-2 text-xs font-semibold border-b-2 border-pink-500 text-pink-400";
    btnProducts.className = "px-4 py-2 text-xs font-semibold border-b-2 border-transparent text-slate-400 hover:text-slate-200";
  }
}

function renderAdminTable() {
  const tbody = document.getElementById('admin-product-table-body');
  const countSpan = document.getElementById('admin-prod-count');
  if (!tbody) return;

  tbody.innerHTML = '';
  if (countSpan) countSpan.textContent = products.length;

  products.forEach(p => {
    const tr = document.createElement('tr');
    tr.className = "hover:bg-slate-800/40 transition";
    tr.innerHTML = `
      <td class="p-3">
        <div class="flex items-center gap-2">
          <img src="${p.image || 'https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=100&q=80'}" class="w-8 h-8 rounded object-cover">
          <div>
            <div class="font-semibold text-white line-clamp-1">${p.title}</div>
            <div class="text-[10px] text-slate-400 line-clamp-1">${p.description || ''}</div>
          </div>
        </div>
      </td>
      <td class="p-3 text-slate-300">${p.category}</td>
      <td class="p-3 text-pink-400 font-bold">${formatPrice(p.retailPrice)}</td>
      <td class="p-3 text-amber-400 font-bold">${formatPrice(p.wholesalePrice)}</td>
      <td class="p-3 text-right">
        <div class="flex items-center justify-end gap-1">
          <button onclick="editProduct('${p.id}')" class="p-1.5 text-pink-400 hover:text-pink-300 hover:bg-pink-500/10 rounded transition" title="Editar">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button onclick="deleteProduct('${p.id}')" class="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded transition" title="Eliminar">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function handleProductSubmit(e) {
  e.preventDefault();

  const id = document.getElementById('prod-id').value;
  const title = document.getElementById('prod-title').value.trim();
  const category = document.getElementById('prod-category').value;
  const retailPrice = Number(document.getElementById('prod-retail-price').value);
  const wholesalePrice = Number(document.getElementById('prod-wholesale-price').value);
  const inStock = document.getElementById('prod-stock').value === 'true';
  const image = document.getElementById('prod-image').value.trim();
  const description = document.getElementById('prod-desc').value.trim();

  if (id) {
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
      products[index] = {
        ...products[index],
        title,
        category,
        retailPrice,
        wholesalePrice,
        inStock,
        image: image || products[index].image,
        description
      };
    }
  } else {
    const newProduct = {
      id: "prod-" + Date.now(),
      title,
      category,
      retailPrice,
      wholesalePrice,
      inStock,
      image: image || "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=600&q=80",
      description
    };
    products.unshift(newProduct);
  }

  saveProducts();
  renderProducts();
  renderAdminTable();
  cancelProductEdit();
  alert("Producto guardado correctamente en el catálogo.");
}

function editProduct(id) {
  const p = products.find(item => item.id === id);
  if (!p) return;

  document.getElementById('prod-id').value = p.id;
  document.getElementById('prod-title').value = p.title;
  document.getElementById('prod-category').value = p.category;
  document.getElementById('prod-retail-price').value = p.retailPrice;
  document.getElementById('prod-wholesale-price').value = p.wholesalePrice;
  document.getElementById('prod-stock').value = p.inStock ? 'true' : 'false';
  document.getElementById('prod-image').value = p.image || '';
  document.getElementById('prod-desc').value = p.description || '';

  document.getElementById('admin-form-title').innerHTML = `<i class="fa-solid fa-pen-to-square text-amber-400"></i> Editando: ${p.title}`;
  document.getElementById('prod-submit-btn').textContent = "Actualizar Producto";
  document.getElementById('prod-submit-btn').className = "flex-1 py-2 px-3 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-lg text-xs transition";
  document.getElementById('prod-cancel-btn').classList.remove('hidden');

  document.getElementById('product-form').scrollIntoView({ behavior: 'smooth' });
}

function cancelProductEdit() {
  document.getElementById('prod-id').value = '';
  document.getElementById('product-form').reset();
  document.getElementById('admin-form-title').innerHTML = `<i class="fa-solid fa-plus-circle text-pink-400"></i> Agregar Nuevo Producto`;
  document.getElementById('prod-submit-btn').textContent = "Guardar Producto";
  document.getElementById('prod-submit-btn').className = "flex-1 py-2 px-3 bg-pink-600 hover:bg-pink-500 text-white font-semibold rounded-lg text-xs transition";
  document.getElementById('prod-cancel-btn').classList.add('hidden');
}

function deleteProduct(id) {
  if (confirm("¿Estás seguro de que deseas eliminar este producto del catálogo?")) {
    products = products.filter(p => p.id !== id);
    saveProducts();
    renderProducts();
    renderAdminTable();
  }
}

function exportCatalogJSON() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(products, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `catalogo_cf_cell_${Date.now()}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

function importCatalogJSON(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (Array.isArray(imported)) {
        products = imported;
        saveProducts();
        renderProducts();
        renderAdminTable();
        alert("¡Catálogo importado exitosamente!");
      } else {
        alert("El archivo no tiene el formato de catálogo válido.");
      }
    } catch (err) {
      alert("Error al leer el archivo JSON.");
    }
  };
  reader.readAsText(file);
}

function resetToDefaultCatalog() {
  if (confirm("¿Deseas restablecer el catálogo a los productos iniciales?")) {
    products = [...DEFAULT_PRODUCTS];
    saveProducts();
    renderProducts();
    renderAdminTable();
  }
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu) {
    menu.classList.toggle('hidden');
  }
}

// ==========================================
// COTIZADOR RÁPIDO DE PANTALLAS Y FALLAS
// ==========================================

const QUOTE_DATA = {
  "Samsung": {
    models: [
      { name: "Samsung Galaxy A02 / A02s", screenPrice: 230000 },
      { name: "Samsung Galaxy A03 / A03s / A03 Core", screenPrice: 230000 },
      { name: "Samsung Galaxy A12 / A13 / A14", screenPrice: 240000 },
      { name: "Samsung Galaxy A22 / A23 / A24", screenPrice: 260000 },
      { name: "Samsung Galaxy A32 / A33 / A34", screenPrice: 320000 },
      { name: "Samsung Galaxy A52 / A53 / A54", screenPrice: 380000 },
      { name: "Samsung Galaxy S20 / S21 / S22 Series", screenPrice: 650000 },
      { name: "Otro modelo Samsung", screenPrice: 230000 }
    ],
    pinPrice: 90000,
    batteryPrice: 130000,
    touchPrice: 180000,
    boardPrice: 150000,
    cameraPrice: 120000,
    backPrice: 100000
  },
  "iPhone": {
    models: [
      { name: "iPhone X / XR / XS", screenPrice: 250000 },
      { name: "iPhone 11 / 11 Pro / 11 Pro Max", screenPrice: 270000 },
      { name: "iPhone 12 / 12 Mini / 12 Pro", screenPrice: 380000 },
      { name: "iPhone 13 / 13 Pro / 13 Pro Max", screenPrice: 480000 },
      { name: "iPhone 14 / 14 Plus / 14 Pro", screenPrice: 650000 },
      { name: "iPhone 7 / 8 / SE (2da/3ra Gen)", screenPrice: 220000 },
      { name: "Otro modelo iPhone", screenPrice: 250000 }
    ],
    pinPrice: 120000,
    batteryPrice: 160000,
    touchPrice: 220000,
    boardPrice: 180000,
    cameraPrice: 150000,
    backPrice: 140000
  },
  "Xiaomi": {
    models: [
      { name: "Redmi Note 10 / Note 10 Pro", screenPrice: 260000 },
      { name: "Redmi Note 11 / Note 11S", screenPrice: 270000 },
      { name: "Redmi Note 12 / Note 12 Pro", screenPrice: 290000 },
      { name: "Redmi 9 / 9A / 9C / 10 / 10C", screenPrice: 220000 },
      { name: "Poco X3 / Poco X4 Pro / Poco M4", screenPrice: 280000 },
      { name: "Xiaomi Mi 11 / 12 Series", screenPrice: 450000 },
      { name: "Otro modelo Xiaomi", screenPrice: 230000 }
    ],
    pinPrice: 85000,
    batteryPrice: 135000,
    touchPrice: 180000,
    boardPrice: 150000,
    cameraPrice: 120000,
    backPrice: 95000
  },
  "Motorola": {
    models: [
      { name: "Moto G20 / G30 / E20", screenPrice: 220000 },
      { name: "Moto G22 / G32 / G52", screenPrice: 240000 },
      { name: "Moto G60 / G60s", screenPrice: 280000 },
      { name: "Moto Edge 20 / 30 Series", screenPrice: 450000 },
      { name: "Otro modelo Motorola", screenPrice: 220000 }
    ],
    pinPrice: 80000,
    batteryPrice: 130000,
    touchPrice: 175000,
    boardPrice: 140000,
    cameraPrice: 110000,
    backPrice: 90000
  },
  "Otro": {
    models: [
      { name: "Huawei", screenPrice: 240000 },
      { name: "Infinix / Tecno", screenPrice: 230000 },
      { name: "Realme / Oppo", screenPrice: 240000 },
      { name: "ZTE / Blu", screenPrice: 210000 }
    ],
    pinPrice: 85000,
    batteryPrice: 130000,
    touchPrice: 180000,
    boardPrice: 150000,
    cameraPrice: 120000,
    backPrice: 90000
  }
};

let currentQuoteBrand = 'Samsung';

function initCotizador() {
  selectBrand('Samsung');
}

function selectBrand(brand) {
  currentQuoteBrand = brand;

  // Actualizar estilos de los botones de marca
  const brands = ['Samsung', 'iPhone', 'Xiaomi', 'Motorola', 'Otro'];
  brands.forEach(b => {
    const btn = document.getElementById(`brand-btn-${b}`);
    if (btn) {
      if (b === brand) {
        btn.className = "brand-opt p-3 rounded-2xl bg-[#1c1427] border-2 border-pink-500 text-white font-bold text-xs flex flex-col items-center gap-1.5 transition shadow-lg shadow-pink-500/20";
      } else {
        btn.className = "brand-opt p-3 rounded-2xl bg-[#140f1e] border-2 border-pink-950/60 hover:border-pink-500/40 text-slate-300 font-bold text-xs flex flex-col items-center gap-1.5 transition";
      }
    }
  });

  const modelInput = document.getElementById('quote-model');
  const datalist = document.getElementById('model-suggestions');
  const chipsContainer = document.getElementById('model-quick-chips');

  // Actualizar placeholder y sugerencias
  if (modelInput) {
    if (brand === 'Samsung') {
      modelInput.placeholder = "Escribe tu Samsung (Ej: Galaxy A03, A12, A52, S21...)";
    } else if (brand === 'iPhone') {
      modelInput.placeholder = "Escribe tu iPhone (Ej: iPhone 11, XR, 12 Pro, 13...)";
    } else if (brand === 'Xiaomi') {
      modelInput.placeholder = "Escribe tu Xiaomi (Ej: Redmi Note 10, Note 11, Poco X3...)";
    } else if (brand === 'Motorola') {
      modelInput.placeholder = "Escribe tu Motorola (Ej: Moto G20, G32, G60...)";
    } else {
      modelInput.placeholder = "Escribe la marca y modelo de tu celular...";
    }
  }

  // Llenar datalist de sugerencias
  if (datalist && QUOTE_DATA[brand]) {
    datalist.innerHTML = '';
    QUOTE_DATA[brand].models.forEach(m => {
      const opt = document.createElement('option');
      opt.value = m.name;
      datalist.appendChild(opt);
    });
  }

  // Generar chips rápidos para hacer clic directo si el cliente prefiere no escribir
  if (chipsContainer && QUOTE_DATA[brand]) {
    chipsContainer.innerHTML = '<span class="text-[10px] text-slate-500 mr-1">Sugerencias:</span>';
    QUOTE_DATA[brand].models.slice(0, 4).forEach(m => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = "text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#191325] hover:bg-pink-600 hover:text-white text-pink-300/80 border border-pink-950 transition";
      chip.textContent = m.name.split('Series')[0].replace('Samsung Galaxy', '').replace('Apple', '').trim();
      chip.onclick = () => {
        if (modelInput) {
          modelInput.value = m.name;
          updateQuoteCalculation();
        }
      };
      chipsContainer.appendChild(chip);
    });
  }

  updateQuoteCalculation();
}

function updateQuoteCalculation() {
  const modelInput = document.getElementById('quote-model');
  const issueSelect = document.getElementById('quote-issue');
  const summaryTitle = document.getElementById('quote-summary-title');
  const estimatedPriceEl = document.getElementById('quote-estimated-price');

  if (!issueSelect || !QUOTE_DATA[currentQuoteBrand]) return;

  const rawModel = modelInput ? modelInput.value.trim() : '';
  const selectedIssue = issueSelect.value;
  const brandObj = QUOTE_DATA[currentQuoteBrand];

  // Base price
  let baseScreenPrice = 230000;
  if (currentQuoteBrand === 'iPhone') baseScreenPrice = 250000;
  if (currentQuoteBrand === 'Xiaomi') baseScreenPrice = 230000;
  if (currentQuoteBrand === 'Motorola') baseScreenPrice = 220000;

  // Si el usuario escribió un modelo específico, intentamos buscar si coincide con alguno conocido
  if (rawModel) {
    const match = brandObj.models.find(m => 
      rawModel.toLowerCase().includes(m.name.toLowerCase()) || 
      m.name.toLowerCase().includes(rawModel.toLowerCase())
    );
    if (match) {
      baseScreenPrice = match.screenPrice;
    }
  }

  let finalPrice = baseScreenPrice;

  if (selectedIssue.includes('Pin de Carga')) {
    finalPrice = brandObj.pinPrice || 90000;
  } else if (selectedIssue.includes('Batería')) {
    finalPrice = brandObj.batteryPrice || 130000;
  } else if (selectedIssue.includes('Táctil')) {
    finalPrice = brandObj.touchPrice || 180000;
  } else if (selectedIssue.includes('No enciende') || selectedIssue.includes('placa')) {
    finalPrice = brandObj.boardPrice || 150000;
  } else if (selectedIssue.includes('Cámara')) {
    finalPrice = brandObj.cameraPrice || 120000;
  } else if (selectedIssue.includes('Tapa trasera')) {
    finalPrice = brandObj.backPrice || 100000;
  }

  const displayModel = rawModel || (currentQuoteBrand === 'Otro' ? 'Cualquier Celular' : `${currentQuoteBrand} (Modelo a consultar)`);

  if (summaryTitle) {
    summaryTitle.textContent = `${displayModel} • ${selectedIssue.split('(')[0].trim()}`;
  }

  if (estimatedPriceEl) {
    estimatedPriceEl.textContent = `Desde ${finalPrice.toLocaleString('es-PY')} Gs.`;
  }
}

function sendCotizadorToWhatsApp() {
  const modelInput = document.getElementById('quote-model');
  const issueSelect = document.getElementById('quote-issue');
  const notesInput = document.getElementById('quote-notes');

  const modelName = modelInput && modelInput.value.trim() ? modelInput.value.trim() : (currentQuoteBrand + ' (Modelo a indicar)');
  const issue = issueSelect ? issueSelect.value : 'Pantalla quebrada';
  const notes = notesInput ? notesInput.value.trim() : '';

  const estimatedPriceEl = document.getElementById('quote-estimated-price');
  const priceText = estimatedPriceEl ? estimatedPriceEl.textContent.trim() : 'a cotizar';

  const phone = settings.whatsapp || DEFAULT_SETTINGS.whatsapp;
  const formattedText = encodeURIComponent(
    `*COTIZACIÓN DE PANTALLA / REPARACIÓN - CF CELL*\n\n` +
    `📱 *Marca:* ${currentQuoteBrand}\n` +
    `📲 *Modelo escrito por cliente:* ${modelName}\n` +
    `💥 *Falla / Servicio:* ${issue}\n` +
    `💰 *Precio estimado web:* ${priceText}\n` +
    (notes ? `📝 *Detalle extra:* ${notes}\n\n` : `\n`) +
    `📍 *Local:* Lopez de Vega c/ Carlos M. Gimenez\n\n` +
    `¿Tienen repuesto disponible para este modelo? ¡Muchas gracias!`
  );

  window.open(`https://wa.me/${phone}?text=${formattedText}`, '_blank');
}

// ==========================================
// VISOR COMPARADOR ANTES Y DESPUÉS (SLIDER)
// ==========================================

const WORK_CASES = {
  pantalla: {
    title: "Cambio de Pantalla y Cristal Roto (Samsung / iPhone)",
    desc: "Teléfono con impacto severo y pantalla estallada vs. equipo 100% restaurado con módulo nuevo de alta definición y sellado profesional.",
    beforeImg: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1200&q=80",
    afterImg: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=1200&q=80",
    icon: "fa-mobile-screen"
  },
  microsoldadura: {
    title: "Microsoldadura en Placa Base & Conectores",
    desc: "Pistas quemadas y componentes dañados por corto vs. reconstrucción milimétrica de pistas bajo microscopio trinocular con estaño de alta conductividad.",
    beforeImg: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    afterImg: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    icon: "fa-microscope"
  }
};

function moveComparisonSlider(val) {
  const beforeCont = document.getElementById('ba-before-container');
  const handleLine = document.getElementById('ba-handle-line');
  if (beforeCont) beforeCont.style.clipPath = `inset(0 ${100 - val}% 0 0)`;
  if (handleLine) handleLine.style.left = `${val}%`;
}

function switchCase(caseKey) {
  const caseData = WORK_CASES[caseKey];
  if (!caseData) return;

  const beforeImg = document.getElementById('ba-before-img');
  const afterImg = document.getElementById('ba-after-img');
  const titleEl = document.getElementById('ba-case-title');
  const descEl = document.getElementById('ba-case-desc');
  const range = document.getElementById('ba-range');

  if (beforeImg) beforeImg.src = caseData.beforeImg;
  if (afterImg) afterImg.src = caseData.afterImg;
  if (titleEl) titleEl.innerHTML = `<i class="fa-solid ${caseData.icon} text-pink-400"></i> ${caseData.title}`;
  if (descEl) descEl.textContent = caseData.desc;

  if (range) {
    range.value = 50;
    moveComparisonSlider(50);
  }

  const tabPantalla = document.getElementById('tab-case-pantalla');
  const tabMicro = document.getElementById('tab-case-microsoldadura');

  if (caseKey === 'pantalla') {
    if (tabPantalla) tabPantalla.className = "case-tab px-5 py-2.5 rounded-xl font-bold text-xs bg-pink-600 text-white shadow-lg shadow-pink-600/30 border border-pink-500 flex items-center gap-2 transition";
    if (tabMicro) tabMicro.className = "case-tab px-5 py-2.5 rounded-xl font-bold text-xs bg-[#140f1e] hover:bg-[#1d1628] text-slate-300 border border-pink-950/70 hover:border-pink-500/40 flex items-center gap-2 transition";
  } else {
    if (tabMicro) tabMicro.className = "case-tab px-5 py-2.5 rounded-xl font-bold text-xs bg-pink-600 text-white shadow-lg shadow-pink-600/30 border border-pink-500 flex items-center gap-2 transition";
    if (tabPantalla) tabPantalla.className = "case-tab px-5 py-2.5 rounded-xl font-bold text-xs bg-[#140f1e] hover:bg-[#1d1628] text-slate-300 border border-pink-950/70 hover:border-pink-500/40 flex items-center gap-2 transition";
  }
}
