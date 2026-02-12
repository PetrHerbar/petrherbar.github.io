// Helpers
function qs(selector, scope) { return (scope || document).querySelector(selector); }
function qsa(selector, scope) { return Array.from((scope || document).querySelectorAll(selector)); }

// Product data structure
const products = {
  'facetoner': {
    name: 'Moony',
    description: 'Osvěžující tonikum, které dodává pleti svěžest a rovnováhu. Měsíček zklidňuje citlivá místa a podporuje přirozenou obnovu pokožky. Použití: Naneste na vatový tampon nebo prsty a vklepte do pleti po odstranění make-upu.',
    price: 359,
    sleva: 15,
    image: 'assets/Products/moony.png',
    features: [
      'Přírodní bylinné extrakty',
      'Bez alkoholu a sulfátů',
      'Vhodné pro citlivou pokožku',
      'Hydratuje a zklidňuje',
      'Objem: 350 ml'
    ]
  },
  'krem': {
    name: 'Rosa',
    description: 'Odličovací voda, jemně čistí bez vysoušení. Růže pomáhá pleť zklidnit a hydratovat, díky čemuž se dobře hodí pro citlivou a suchou pleť.',
    price: 359,
    sleva: null,
    image: 'assets/Products/lahvac.jpg',
    features: [
      'Dvoufázová emulze',
      '24hodinová hydratace',
      'Antioxidanty z rostlin',
      'Vhodné pro všechny typy pleti'
    ]
  },
  'krem2': {
    name: 'Levander',
    description: 'Hydratační krém vyživuje a zanechává pleť jemnou. Levandule podporuje hydrataci a obnovuje kožní bariéru.',
    price: 459,
    sleva: null,
    image: 'assets/Products/masticka.jpg',
    features: [
      'Přírodní hydratační oleje',
      '24hodinová hydratace',
      'Antioxidanty z rostlin',
      'Vhodné pro všechny typy pleti',
      'Bez parabenů a silikonů'
    ]
  },
  'lahvac': {
    name: 'Makarnika',
    description: 'Krém na ruce s arnikou a makadamovým olejem vyživuje a zklidňuje pokožku rukou, zanechává je jemné a chráněné.',
    price: 389,
    sleva: null,
    image: 'assets/Products/makarnika2.png',
    features: [
      '100% přírodní složení',
      'Bohatý na vitamíny',
      'Rychle se vstřebává',
      'Jemná přírodní vůně'
    ]
  },
  'pudr': {
    name: 'Lichi',
    description: 'Balzám na rty, který osvěžuje rty a dodává jim přirozenou pružnost.',
    price: 179,
    sleva: null,
    image: 'assets/Products/Pudr.png',
    features: [
      'Dlouhodobé zakrytí',
      'Matný vzhled',
      'Bez škodlivých chemikálií'
    ]
  },
  'pudr2': {
    name: 'Minty',
    description: 'Balzám na rty, který chladivě zklidňuje a přináší pocit lehkosti.',
    price: 179,
    sleva: 10,
    image: 'assets/Products/Pudr2.png',
    features: [
      'Jemný přírodní lesk',
      'Dlouhodobé zakrytí',
      'Přírodní bylinné složení'
    ]
  },
  // Special Package Products
  'package-hydratace': {
    name: 'Balíček Hydratace',
    description: 'Kompletní sada pro intenzivní hydrataci. Obsahuje tonikum Moony, hydratační krém Levander a balzám na rty Minty pro celodenní péči.',
    price: 799,
    sleva: null,
    image: 'assets/Products/masticka.jpg',
    isPackage: true,
    features: [
      'Tonikum Moony',
      'Krém Levander',
      'Balzám Minty',
      'Dárková krabička',
      'Úspora 25%'
    ]
  },
  'package-pece': {
    name: 'Balíček Péče o pleť',
    description: 'Luxusní sada pro každodenní péči o pleť. Obsahuje odličovací vodu Rosa a krém na ruce Makarnika pro hedvábně jemnou pokožku.',
    price: 649,
    sleva: null,
    image: 'assets/Products/lahvac.jpg',
    isPackage: true,
    features: [
      'Odličovací voda Rosa',
      'Krém na ruce Makarnika',
      'Kosmetická taštička',
      'Úspora 20%'
    ]
  },
  'package-komplet': {
    name: 'Kompletní balíček',
    description: 'Vše co potřebujete v jednom balení. Kompletní sada všech našich produktů za výhodnou cenu. Ideální dárek pro každou příležitost.',
    price: 1299,
    sleva: null,
    image: 'assets/Products/moony.png',
    isPackage: true,
    features: [
      'Všechny produkty',
      'Luxusní dárková krabice',
      'Osobní věnování',
      'Doprava zdarma',
      'Úspora 30%'
    ]
  },

};

// Helper function to calculate discounted price
function getDiscountedPrice(price, sleva) {
  if (!sleva) return null;
  return Math.round(price * (1 - sleva / 100));
}

// Helper function to format price with currency
function formatPrice(price) {
  return `${price} Kč`;
}

// Current filter state
let currentFilters = {
  sleva: false
};

// Filter products based on current filters
function filterProducts(productsObj) {
  return Object.entries(productsObj).filter(([id, product]) => {
    // If sleva filter is active, only show products with sale
    if (currentFilters.sleva) {
      return product.sleva && product.sleva > 0;
    }
    return true;
  });
}

// Initialize filter functionality
function initializeFilters() {
  const filterToggle = qs('.filter-toggle');
  const filterMenu = qs('.filter-menu');
  const slevaCheckbox = qs('[data-filter-sleva]');
  
  if (!filterToggle || !filterMenu) return;
  
  // Toggle filter menu
  filterToggle.addEventListener('click', () => {
    const isExpanded = filterToggle.getAttribute('aria-expanded') === 'true';
    filterToggle.setAttribute('aria-expanded', !isExpanded);
    filterMenu.hidden = isExpanded;
    filterToggle.classList.toggle('active', !isExpanded);
  });
  
  // Close filter menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.products-filter')) {
      filterToggle.setAttribute('aria-expanded', 'false');
      filterMenu.hidden = true;
      filterToggle.classList.remove('active');
    }
  });
  
  // Handle sleva filter change
  if (slevaCheckbox) {
    slevaCheckbox.addEventListener('change', (e) => {
      currentFilters.sleva = e.target.checked;
      renderProductsPage();
      // Re-animate product cards after filter change
      animateProductCards();
    });
  }
}

// Render special package products on homepage
function renderSpecialPackages() {
  const grid = qs('[data-special-packages]');
  if (!grid) return;

  grid.innerHTML = '';
  const fragment = document.createDocumentFragment();

  // Filter only package products
  const packageProducts = Object.entries(products).filter(([id, product]) => product.isPackage);

  packageProducts.forEach(([id, product]) => {
    const card = document.createElement('article');
    card.className = 'special-card';
    card.dataset.product = id;
    
    const hasSleva = product.sleva && product.sleva > 0;
    const discountedPrice = hasSleva ? getDiscountedPrice(product.price, product.sleva) : null;
    
    // Build price HTML
    let priceHtml = '';
    if (hasSleva) {
      priceHtml = `
        <span class="special-price-original">${formatPrice(product.price)}</span>
        <span class="special-price">${formatPrice(discountedPrice)}</span>
      `;
    } else {
      priceHtml = `<span class="special-price">${formatPrice(product.price)}</span>`;
    }
    
    card.innerHTML = `
      <div class="special-card-flowers">
        <div class="flower flower-1"></div>
        <div class="flower flower-2"></div>
        <div class="flower flower-3"></div>
        <div class="leaf-deco leaf-deco-1"></div>
        <div class="leaf-deco leaf-deco-2"></div>
      </div>
      
      <div class="special-card-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
      </div>
      <div class="special-card-content">
        <h3 class="special-card-name">${product.name}</h3>
        <p class="special-card-description">${product.description}</p>
        <div class="special-card-features">
          ${product.features.slice(0, 3).map(f => `<span class="feature-tag">${f}</span>`).join('')}
        </div>
        <div class="special-card-footer">
          <div class="special-card-price">
            ${priceHtml}
          </div>
          <button class="btn btn-primary special-btn">Koupit</button>
        </div>
      </div>
    `;

    fragment.appendChild(card);
  });

  grid.appendChild(fragment);
  
  // Add click handlers
  qsa('.special-card').forEach(card => {
    const buyBtn = qs('.special-btn', card);
    if (buyBtn) {
      buyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        cartManager.addToCart(card.dataset.product);
        showPurchaseMessage(card.dataset.product, 'Balíček přidán');
      });
    }
    
    // Click on card navigates to detail
    card.addEventListener('click', (e) => {
      if (!e.target.closest('.special-btn')) {
        navigateToProductDetail(card.dataset.product);
      }
    });
  });
}

// Animate product cards (used on page load and after filtering)
function animateProductCards() {
  const productCards = qsa('.product-card');
  if (productCards.length > 0 && window.gsap) {
    // Reset and animate cards
    window.gsap.set(productCards, { opacity: 0, y: 30, scale: 0.95 });
    window.gsap.to(productCards, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: 'power2.out',
      stagger: 0.08
    });
  } else if (productCards.length > 0) {
    // Fallback if GSAP not available - just show cards
    productCards.forEach(card => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    });
  }
  
  // Handle image visibility - add loaded class when images load
  const productImages = qsa('.product-card .product-image img');
  productImages.forEach(img => {
    if (img.complete) {
      // Image already loaded
      img.classList.add('loaded');
    } else {
      // Wait for image to load
      img.addEventListener('load', () => {
        img.classList.add('loaded');
      });
    }
  });
}

function renderProductsPage() {
  const grid = qs('[data-products-grid]');
  if (!grid) return;

  grid.innerHTML = '';

  const fragment = document.createDocumentFragment();
  
  // Apply filters
  const filteredProducts = filterProducts(products);
  
  // Show message if no products match filter
  if (filteredProducts.length === 0) {
    const noResults = document.createElement('div');
    noResults.className = 'no-results';
    noResults.innerHTML = `
      <p>Žádné produkty neodpovídají vašemu filtru.</p>
    `;
    grid.appendChild(noResults);
    return;
  }

  filteredProducts.forEach(([id, product]) => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.dataset.product = id;
    
    const hasSleva = product.sleva && product.sleva > 0;
    const discountedPrice = hasSleva ? getDiscountedPrice(product.price, product.sleva) : null;
    
    // Build price HTML
    let priceHtml = '';
    if (hasSleva) {
      priceHtml = `
        <span class="product-price-original">${formatPrice(product.price)}</span>
        <span class="product-price product-price-sale">${formatPrice(discountedPrice)}</span>
      `;
    } else {
      priceHtml = `<span class="product-price">${formatPrice(product.price)}</span>`;
    }
    
    // Build sale badge HTML
    const saleBadgeHtml = hasSleva ? `<div class="sale-badge">${product.sleva}% sleva</div>` : '';
    
    card.innerHTML = `
      <div class="product-image">
        ${saleBadgeHtml}
        <img src="${product.image}" alt="${product.name}" loading="lazy" decoding="async">
        <div class="product-overlay">
          <button class="btn btn-primary product-btn">Více</button>
        </div>
      </div>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-footer">
          <div class="product-price-container">
            ${priceHtml}
          </div>
          <button class="btn btn-primary buy-btn">Koupit</button>
        </div>
      </div>
    `;

    fragment.appendChild(card);
  });

  grid.appendChild(fragment);
}

// Cart management system
class CartManager {
  constructor() {
    this.cart = this.loadCart();
    this.updateCartCounter();
  }

  loadCart() {
    try {
      const cartData = localStorage.getItem('herbio_cart');
      return cartData ? JSON.parse(cartData) : [];
    } catch (error) {
      console.error('Error loading cart:', error);
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem('herbio_cart', JSON.stringify(this.cart));
      this.updateCartCounter();
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }

  addToCart(productId, quantity = 1) {
    const product = products[productId];
    if (!product) return false;

    const existingItem = this.cart.find(item => item.id === productId);
    
    // Calculate the actual price (with discount if applicable)
    const hasSleva = product.sleva && product.sleva > 0;
    const actualPrice = hasSleva ? getDiscountedPrice(product.price, product.sleva) : product.price;
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cart.push({
        id: productId,
        name: product.name,
        price: actualPrice,
        originalPrice: product.price,
        sleva: product.sleva || null,
        image: product.image,
        quantity: quantity
      });
    }
    
    this.saveCart();
    return true;
  }

  removeFromCart(productId) {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.saveCart();
  }

  updateQuantity(productId, quantity) {
    const item = this.cart.find(item => item.id === productId);
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        item.quantity = quantity;
        this.saveCart();
      }
    }
  }

  getCartTotal() {
    return this.cart.reduce((total, item) => {
      // Handle both numeric prices and legacy string prices
      const price = typeof item.price === 'number' 
        ? item.price 
        : parseFloat(item.price.replace(' Kč', '').replace(',', '.'));
      return total + (price * item.quantity);
    }, 0);
  }

  getCartCount() {
    return this.cart.reduce((count, item) => count + item.quantity, 0);
  }

  updateCartCounter() {
    const counters = qsa('.cart-counter');
    if (counters.length === 0) return;

    const count = this.getCartCount();
    counters.forEach(counter => {
      counter.textContent = count;
      counter.style.display = count > 0 ? 'flex' : 'none';
    });
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
  }
}

// Initialize cart manager
const cartManager = new CartManager();

// Bubble System
class BubbleSystem {
  constructor() {
    this.container = qs('#bubbleContainer');
    this.bubbles = [];
    this.mouse = { x: 0, y: 0 };
    this.animationId = null;
    this.isActive = false;
    
    console.log('BubbleSystem constructor called');
    console.log('Container found:', !!this.container);
    
    if (this.container) {
      console.log('Container dimensions:', this.container.offsetWidth, 'x', this.container.offsetHeight);
      this.init();
    } else {
      console.error('Bubble container not found!');
    }
  }

  init() {
    console.log('Initializing bubble system...');
    this.createBubbles();
    this.bindEvents();
    this.startAnimation();
    console.log('Bubble system initialization complete');
  }

  createBubbles() {
    // Adjust bubble count based on screen size and device performance
    const isMobile = window.innerWidth < 768;
    const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
    
    let bubbleCount;
    if (isMobile) {
      bubbleCount = isLowEnd ? 10 : 18;
    } else {
      bubbleCount = isLowEnd ? 18 : 40;
    }
    
    const sizes = ['bubble-small', 'bubble-medium', 'bubble-large', 'bubble-extra-large'];
    
    console.log(`Creating ${bubbleCount} bubbles...`);
    for (let i = 0; i < bubbleCount; i++) {
      const bubble = this.createBubble(sizes[Math.floor(Math.random() * sizes.length)]);
      this.bubbles.push(bubble);
      this.container.appendChild(bubble.element);
    }
    console.log(`Created ${this.bubbles.length} bubbles successfully`);
  }

  createBubble(sizeClass) {
    const element = document.createElement('div');
    element.className = `bubble ${sizeClass} bubble-floating`;
    
    // Add random glow intensity
    const glowIntensity = Math.random() * 0.3 + 0.1; // 0.1 to 0.4
    element.style.setProperty('--glow-intensity', glowIntensity);
    
    const bubble = {
      element: element,
      x: Math.random() * (this.container.offsetWidth - 100),
      y: Math.random() * (this.container.offsetHeight - 100),
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      rotation: Math.random() * 360, // Random initial rotation
      rotationSpeed: (Math.random() - 0.5) * 2, // Random rotation speed
      size: this.getElementSize(sizeClass),
      repulsionRadius: this.getRepulsionRadius(sizeClass),
      originalX: 0,
      originalY: 0,
      isRepelling: false
    };

    element.style.left = bubble.x + 'px';
    element.style.top = bubble.y + 'px';
    element.style.transform = `rotate(${bubble.rotation}deg)`;
    
    return bubble;
  }

  getElementSize(sizeClass) {
    const sizes = {
      'bubble-small': 20,
      'bubble-medium': 35,
      'bubble-large': 50,
      'bubble-extra-large': 70
    };
    return sizes[sizeClass] || 35;
  }

  getRepulsionRadius(sizeClass) {
    const radii = {
      'bubble-small': 80,
      'bubble-medium': 100,
      'bubble-large': 120,
      'bubble-extra-large': 140
    };
    return radii[sizeClass] || 100;
  }

  bindEvents() {
    // Find the hero section to track mouse movement
    const heroSection = this.container.closest('.hero');
    
    if (heroSection) {
      // Mouse tracking on hero section
      heroSection.addEventListener('mousemove', (e) => {
        const rect = this.container.getBoundingClientRect();
        this.mouse.x = e.clientX - rect.left;
        this.mouse.y = e.clientY - rect.top;
      });

      // Touch tracking for mobile
      heroSection.addEventListener('touchmove', (e) => {
        const rect = this.container.getBoundingClientRect();
        const touch = e.touches[0];
        this.mouse.x = touch.clientX - rect.left;
        this.mouse.y = touch.clientY - rect.top;
      }, { passive: true });

      // Mouse leave - reset repulsion
      heroSection.addEventListener('mouseleave', () => {
        this.mouse.x = -1000;
        this.mouse.y = -1000;
      });
    }

    // Window resize - reposition bubbles
    window.addEventListener('resize', () => {
      this.handleResize();
    });
  }

  startAnimation() {
    if (this.animationId) return;
    this.isActive = true;
    this.animate();
  }

  stopAnimation() {
    this.isActive = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  animate() {
    if (!this.isActive) return;

    // Performance optimization: reduce update frequency on slower devices
    const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
    const updateFrequency = isLowEnd ? 2 : 1; // Update every 2nd frame on low-end devices
    
    if (!this.frameCount) this.frameCount = 0;
    this.frameCount++;

    if (this.frameCount % updateFrequency === 0) {
      this.bubbles.forEach(bubble => {
        this.updateBubble(bubble);
      });
    }

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  updateBubble(bubble) {
    // Calculate distance to mouse
    const dx = bubble.x - this.mouse.x;
    const dy = bubble.y - this.mouse.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Apply repulsion force if mouse is close
    if (distance < bubble.repulsionRadius && distance > 0) {
      const force = (bubble.repulsionRadius - distance) / bubble.repulsionRadius;
      const repulsionStrength = force * 0.3;
      
      bubble.vx += (dx / distance) * repulsionStrength;
      bubble.vy += (dy / distance) * repulsionStrength;
      bubble.isRepelling = true;
    } else {
      bubble.isRepelling = false;
    }

    // Apply natural floating movement (zero gravity)
    bubble.vx += (Math.random() - 0.5) * 0.01;
    bubble.vy += (Math.random() - 0.5) * 0.01;

    // Apply friction
    bubble.vx *= 0.98;
    bubble.vy *= 0.98;

    // Update position
    bubble.x += bubble.vx;
    bubble.y += bubble.vy;

    // Update rotation
    bubble.rotation += bubble.rotationSpeed;
    if (bubble.rotation >= 360) bubble.rotation -= 360;
    if (bubble.rotation < 0) bubble.rotation += 360;

    // Boundary collision with soft bounce
    const margin = bubble.size / 2;
    if (bubble.x < margin) {
      bubble.x = margin;
      bubble.vx = Math.abs(bubble.vx) * 0.5;
    } else if (bubble.x > this.container.offsetWidth - margin) {
      bubble.x = this.container.offsetWidth - margin;
      bubble.vx = -Math.abs(bubble.vx) * 0.5;
    }

    if (bubble.y < margin) {
      bubble.y = margin;
      bubble.vy = Math.abs(bubble.vy) * 0.5;
    } else if (bubble.y > this.container.offsetHeight - margin) {
      bubble.y = this.container.offsetHeight - margin;
      bubble.vy = -Math.abs(bubble.vy) * 0.5;
    }

    // Update DOM
    bubble.element.style.left = bubble.x + 'px';
    bubble.element.style.top = bubble.y + 'px';
    bubble.element.style.transform = `rotate(${bubble.rotation}deg)`;

    // Update CSS classes for repulsion effect
    if (bubble.isRepelling) {
      bubble.element.classList.add('bubble-repelling');
    } else {
      bubble.element.classList.remove('bubble-repelling');
    }
  }

  handleResize() {
    // Reposition bubbles that are outside the new container bounds
    this.bubbles.forEach(bubble => {
      const margin = bubble.size / 2;
      if (bubble.x > this.container.offsetWidth - margin) {
        bubble.x = this.container.offsetWidth - margin;
      }
      if (bubble.y > this.container.offsetHeight - margin) {
        bubble.y = this.container.offsetHeight - margin;
      }
    });
  }

  destroy() {
    this.stopAnimation();
    if (this.container) {
      this.container.innerHTML = '';
    }
    this.bubbles = [];
  }
}

// Cleanup function for page navigation
function cleanupBubbleSystem() {
  if (bubbleSystem) {
    bubbleSystem.destroy();
    bubbleSystem = null;
  }
}

// Cleanup on page unload
window.addEventListener('beforeunload', cleanupBubbleSystem);

// Fallback initialization for when GSAP might not be available
document.addEventListener('DOMContentLoaded', () => {
  // Small delay to ensure all scripts are loaded
  setTimeout(() => {
    if (!bubbleSystem && qs('#bubbleContainer')) {
      console.log('Fallback bubble system initialization');
      initializeBubbleSystem();
    }
  }, 1000);
});

// Initialize bubble system
let bubbleSystem = null;

// Robust bubble system initialization
function initializeBubbleSystem() {
  // Try multiple times to ensure the container is available
  let attempts = 0;
  const maxAttempts = 10;
  
  function tryInit() {
    attempts++;
    const container = qs('#bubbleContainer');
    
    if (container) {
      console.log('Bubble container found, initializing bubble system...');
      // Delay to ensure page is fully loaded
      setTimeout(() => {
        bubbleSystem = new BubbleSystem();
        console.log('Bubble system initialized successfully');
      }, 500);
    } else if (attempts < maxAttempts) {
      console.log(`Bubble container not found, retrying... (${attempts}/${maxAttempts})`);
      setTimeout(tryInit, 200);
    } else {
      console.log('Bubble container not found after maximum attempts');
    }
  }
  
  tryInit();
}

// Year in footer
const yearEl = qs('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobile nav toggle (dropdown under header)
const toggle = qs('.menu-toggle');
const desktopNav = qs('.site-nav');
const mobileNav = qs('.mobile-nav');
if (toggle && (desktopNav || mobileNav)) {
  let open = false;
  if (window.gsap) {
    window.gsap.set(mobileNav, { height: 0, display: 'none' });
  }
  toggle.addEventListener('click', () => {
    open = !open;
    toggle.setAttribute('aria-expanded', String(open));
    // Desktop nav remains hidden on mobile via CSS. Animate mobile dropdown.
    if (window.gsap && mobileNav) {
      if (open) {
        mobileNav.style.display = 'block';
        const contentHeight = mobileNav.scrollHeight;
        window.gsap.fromTo(mobileNav, { height: 0 }, { height: contentHeight, duration: 0.35, ease: 'power2.out', onComplete: () => { mobileNav.style.height = 'auto'; } });
      } else {
        const currentHeight = mobileNav.offsetHeight;
        window.gsap.fromTo(mobileNav, { height: currentHeight }, { height: 0, duration: 0.28, ease: 'power2.in', onComplete: () => { mobileNav.style.display = 'none'; } });
      }
    } else if (mobileNav) {
      mobileNav.style.display = open ? 'block' : 'none';
    }
  });
}

// Cookie bar logic
(function cookieConsent() {
  const bar = qs('.cookie-bar');
  if (!bar) return;
  const KEY = 'herbio_cookie_consent';
  const saved = localStorage.getItem(KEY);
  if (!saved) {
    bar.hidden = false;
  }

  function setConsent(value) {
    try { localStorage.setItem(KEY, value); } catch (_) {}
    bar.hidden = true;
  }

  qs('[data-cookie-accept]', bar)?.addEventListener('click', () => setConsent('accepted'));
  qs('[data-cookie-decline]', bar)?.addEventListener('click', () => setConsent('declined'));
  qs('[data-cookie-close]', bar)?.addEventListener('click', () => { bar.hidden = true; });
})();

// GSAP Animations
window.addEventListener('DOMContentLoaded', () => {
  initializeFilters();
  renderProductsPage();
  renderSpecialPackages();

  if (!window.gsap) return;
  const { gsap } = window;
  if (window.ScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);

  // Loader
  const loader = qs('.loader');
  if (loader) {
    gsap.to(loader, { opacity: 0, duration: 0.4, delay: 0.2, ease: 'power2.out', onComplete: () => loader.remove() });
  }

  const hasHero = !!qs('.hero');
  const hasLeaves = !!qs('.hero .leaf');

  // Hero load animation
  if (hasHero && hasLeaves) {
    // Homepage special: leaves + fade ups
    gsap.set(['.hero-title', '.hero-subtitle', '.hero-cta .btn'], { opacity: 0, y: 20 });
    gsap.set('.leaf', { opacity: 0, scale: 0.9 });

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' }, delay: loader ? 0.25 : 0 });
    tl.to('.leaf', { opacity: 1, scale: 1, duration: 0.8, stagger: 0.1 })
      .to('.hero-title', { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
      .to('.hero-subtitle', { opacity: 1, y: 0, duration: 0.6 }, '-=0.35')
      .to('.hero-cta .btn', { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 }, '-=0.35');

    // Floating leaves unique motion
    qsa('.leaf').forEach((leaf, i) => {
      gsap.to(leaf, {
        y: () => gsap.utils.random(-20, 20),
        x: () => gsap.utils.random(-10, 10),
        scale: () => gsap.utils.random(0.95, 1.05),
        repeat: -1,
        yoyo: true,
        duration: gsap.utils.random(3, 6),
        ease: 'sine.inOut',
        delay: i * 0.3
      });
    });
  } else if (hasHero) {
    // Generic pages: slide-in hero title/subtitle from sides
    gsap.set('.hero-title', { opacity: 0, x: -28 });
    gsap.set('.hero-subtitle', { opacity: 0, x: 28 });
    const tlHero = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: loader ? 0.25 : 0 });
    tlHero.to('.hero-title', { opacity: 1, x: 0, duration: 0.7 })
          .to('.hero-subtitle', { opacity: 1, x: 0, duration: 0.7 }, '-=0.45');
  }

  // Generic scroll reveals across pages
  const revealItems = [
    '.about .about-text h2',
    '.about .about-text p',
    '.about .card',
    '.contact h2',
    '.contact p',
    '.contact .form-field',
    // kontakt & produkty pages
    'main .container > h1',
    'main .container > p',
    '.grid .card',
  ];

  revealItems.forEach((sel) => {
    qsa(sel).forEach((el, i) => {
      gsap.from(el, {
        opacity: 0,
        y: 24,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        delay: i * 0.04
      });
    });
  });

  // Parallax-y hero bg (index only if present)
  if (window.ScrollTrigger && hasLeaves) {
    gsap.to('.hero-bg', {
      yPercent: 10,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    });
  }

  // Button label magnet effect (constrained within button)
  function attachMagnet(selector, maxX = 12, maxY = 10) {
    qsa(selector).forEach((el) => {
      const label = qs('.btn-label', el) || el;
      const getBounds = () => el.getBoundingClientRect();
      const lerp = gsap.utils.interpolate;
      let anim;
      function move(e) {
        const b = getBounds();
        const x = e.clientX - b.left;
        const y = e.clientY - b.top;
        const cx = b.width / 2, cy = b.height / 2;
        const tx = lerp(0, Math.min(maxX, b.width * 0.15), (x - cx) / cx);
        const ty = lerp(0, Math.min(maxY, b.height * 0.15), (y - cy) / cy);
        if (anim) anim.kill();
        anim = gsap.to(label, { x: tx, y: ty, duration: 0.18, ease: 'power2.out' });
      }
      function reset() { if (anim) anim.kill(); gsap.to(label, { x: 0, y: 0, duration: 0.25, ease: 'power2.out' }); }
      el.addEventListener('mousemove', move);
      el.addEventListener('mouseleave', reset);
      el.addEventListener('touchmove', (e) => { const t = e.touches[0]; if (t) move({ clientX: t.clientX, clientY: t.clientY }); }, { passive: true });
      el.addEventListener('touchend', reset);
    });
  }

  // Apply to hero buttons and header links
  attachMagnet('.hero .btn');
  attachMagnet('.site-nav a', 8, 6);

  // kontakt & produkty: subtle load-in for first heading and paragraph
  const pageHeading = qs('main .container > h1');
  const pageIntro = qs('main .container > p');
  if (pageHeading) gsap.from(pageHeading, { opacity: 0, y: 18, duration: 0.6, ease: 'power2.out', delay: loader ? 0.25 : 0 });
  if (pageIntro) gsap.from(pageIntro, { opacity: 0, y: 18, duration: 0.6, ease: 'power2.out', delay: loader ? 0.32 : 0 });

  // Initialize bubble system on all pages with hero sections
  initializeBubbleSystem();

  // Initialize product detail page if we're on that page
  if (window.location.pathname.includes('product-detail.html')) {
    initializeProductDetail();
  }

  // Initialize cart page if we're on that page
  if (window.location.pathname.includes('cart.html')) {
    initializeCartPage();
  }

  // Product cards animations
  const productCards = qsa('.product-card');
  if (productCards.length > 0) {
    // Set initial state for product cards
    gsap.set(productCards, { opacity: 0, y: 50, scale: 0.9 });

    // Animate product cards with stagger
    gsap.to(productCards, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.products-showcase',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    // Add hover animations for product cards
    productCards.forEach((card, index) => {
      const image = qs('.product-image img', card);
      const overlay = qs('.product-overlay', card);
      const buyBtn = qs('.buy-btn', card);
      
      // Image loading animation
      if (image) {
        image.addEventListener('load', () => {
          gsap.to(image, { opacity: 1, duration: 0.5 });
        });
      }

      // Card hover effects
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { 
          y: -8, 
          scale: 1.02, 
          duration: 0.4, 
          ease: 'power2.out' 
        });
        
        if (overlay) {
          gsap.to(overlay, { 
            opacity: 1, 
            duration: 0.3, 
            ease: 'power2.out' 
          });
        }
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, { 
          y: 0, 
          scale: 1, 
          duration: 0.4, 
          ease: 'power2.out' 
        });
        
        if (overlay) {
          gsap.to(overlay, { 
            opacity: 0, 
            duration: 0.3, 
            ease: 'power2.out' 
          });
        }
      });

      // Buy button click animation
      if (buyBtn) {
        buyBtn.addEventListener('click', (e) => {
          e.preventDefault();
          
          // Create ripple effect
          const ripple = document.createElement('div');
          ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
          `;
          
          const rect = buyBtn.getBoundingClientRect();
          const size = Math.max(rect.width, rect.height);
          ripple.style.width = ripple.style.height = size + 'px';
          ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
          ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
          
          buyBtn.style.position = 'relative';
          buyBtn.style.overflow = 'hidden';
          buyBtn.appendChild(ripple);
          
          // Button click animation
          gsap.to(buyBtn, { 
            scale: 0.95, 
            duration: 0.1, 
            yoyo: true, 
            repeat: 1, 
            ease: 'power2.inOut' 
          });
          
          // Remove ripple after animation
          setTimeout(() => {
            if (ripple.parentNode) {
              ripple.parentNode.removeChild(ripple);
            }
          }, 600);
          
          // Add to cart and show success message
          cartManager.addToCart(card.dataset.product);
          showPurchaseMessage(card.dataset.product, 'Přidat do košíku');
        });
      }

      // "Více" button click - navigate to product detail
      const moreBtn = qs('.product-btn', card);
      if (moreBtn) {
        moreBtn.addEventListener('click', (e) => {
          e.preventDefault();
          const productId = card.dataset.product;
          navigateToProductDetail(productId);
        });
      }
    });
  }
});

// Navigation to product detail page
function navigateToProductDetail(productId) {
  // Store product data in sessionStorage for the detail page
  if (products[productId]) {
    sessionStorage.setItem('selectedProduct', JSON.stringify({
      id: productId,
      ...products[productId]
    }));
    // Navigate to product detail page
    window.location.href = 'product-detail.html';
  }
}

// Initialize product detail page
function initializeProductDetail() {
  const productData = sessionStorage.getItem('selectedProduct');
  
  if (!productData) {
    // If no product data, redirect to products page
    window.location.href = 'produkty.html';
    return;
  }
  
  try {
    const product = JSON.parse(productData);
    
    // Update page title
    const pageTitle = qs('#page-title');
    if (pageTitle) {
      pageTitle.textContent = `${product.name} — HerBio s. r. o.`;
    }
    
    // Update hero section
    const heroTitle = qs('#product-title');
    const heroSubtitle = qs('.hero-subtitle');
    if (heroTitle) heroTitle.textContent = product.name;
    if (heroSubtitle) heroSubtitle.textContent = 'Detailní informace o produktu';
    
    // Update product details
    const productName = qs('#product-name');
    const productDescription = qs('#product-description');
    const productPriceContainer = qs('.product-detail-price');
    const productImage = qs('#product-image');
    const productImageContainer = qs('.product-detail-image');
    const productFeatures = qs('#product-features');
    
    if (productName) productName.textContent = product.name;
    if (productDescription) productDescription.textContent = product.description;
    
    // Handle price and sale display
    const hasSleva = product.sleva && product.sleva > 0;
    const discountedPrice = hasSleva ? getDiscountedPrice(product.price, product.sleva) : null;
    
    if (productPriceContainer) {
      if (hasSleva) {
        productPriceContainer.innerHTML = `
          <span class="price-original">${formatPrice(product.price)}</span>
          <span id="product-price" class="price price-sale">${formatPrice(discountedPrice)}</span>
        `;
      } else {
        productPriceContainer.innerHTML = `
          <span id="product-price" class="price">${formatPrice(product.price)}</span>
        `;
      }
    }
    
    // Add sale badge to image container
    if (productImageContainer && hasSleva) {
      const existingBadge = productImageContainer.querySelector('.sale-badge');
      if (!existingBadge) {
        const saleBadge = document.createElement('div');
        saleBadge.className = 'sale-badge sale-badge-detail';
        saleBadge.textContent = `${product.sleva}% sleva`;
        productImageContainer.appendChild(saleBadge);
      }
    }
    
    if (productImage) {
      productImage.src = product.image;
      productImage.alt = product.name;
    }
    
    if (productFeatures && product.features) {
      productFeatures.innerHTML = '';
      product.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        productFeatures.appendChild(li);
      });
    }
    
    // Add click handlers for buy buttons
    const buyNowBtn = qs('#buy-now');
    const addToCartBtn = qs('#add-to-cart');
    
    if (buyNowBtn) {
      buyNowBtn.addEventListener('click', (e) => {
        e.preventDefault();
        cartManager.addToCart(product.id);
        showPurchaseMessage(product.id, 'Koupit nyní');
      });
    }
    
    if (addToCartBtn) {
      addToCartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        cartManager.addToCart(product.id);
        showPurchaseMessage(product.id, 'Přidat do košíku');
      });
    }
    
  } catch (error) {
    console.error('Error loading product data:', error);
    window.location.href = 'produkty.html';
  }
}

// Initialize cart page
function initializeCartPage() {
  const cartItems = qs('#cart-items');
  const cartEmpty = qs('#cart-empty');
  const cartSummary = qs('#cart-summary');
  const totalPrice = qs('#total-price');
  const clearCartBtn = qs('#clear-cart');
  const checkoutBtn = qs('#checkout');

  function renderCart() {
    const cart = cartManager.cart;
    
    if (cart.length === 0) {
      // Show empty cart message
      cartEmpty.style.display = 'block';
      cartItems.style.display = 'none';
      cartSummary.style.display = 'none';
    } else {
      // Show cart items
      cartEmpty.style.display = 'none';
      cartItems.style.display = 'block';
      cartSummary.style.display = 'block';
      
      // Render cart items
      cartItems.innerHTML = '';
      cart.forEach(item => {
        const cartItem = createCartItem(item);
        cartItems.appendChild(cartItem);
      });
      
      // Update total
      const total = cartManager.getCartTotal();
      totalPrice.textContent = `${total.toFixed(0)} Kč`;
    }
  }

  function createCartItem(item) {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    
    // Format price display - handle both numeric and legacy string prices
    const displayPrice = typeof item.price === 'number' ? formatPrice(item.price) : item.price;
    const hasSleva = item.sleva && item.sleva > 0;
    const originalPriceDisplay = hasSleva && item.originalPrice ? formatPrice(item.originalPrice) : null;
    
    // Build price HTML for cart item
    let priceHtml = '';
    if (hasSleva && originalPriceDisplay) {
      priceHtml = `
        <span class="cart-item-price-original">${originalPriceDisplay}</span>
        <span class="cart-item-price cart-item-price-sale">${displayPrice}</span>
      `;
    } else {
      priceHtml = `<p class="cart-item-price">${displayPrice}</p>`;
    }
    
    cartItem.innerHTML = `
      <div class="cart-item-image">
        <img src="${item.image}" alt="${item.name}" loading="lazy">
      </div>
      <div class="cart-item-info">
        <h3 class="cart-item-name">${item.name}</h3>
        <div class="cart-item-price-container">${priceHtml}</div>
      </div>
      <div class="cart-item-controls">
        <div class="cart-item-quantity">
          <button class="quantity-btn" data-action="decrease" ${item.quantity <= 1 ? 'disabled' : ''}>-</button>
          <span class="quantity-display">${item.quantity}</span>
          <button class="quantity-btn" data-action="increase">+</button>
        </div>
        <button class="cart-item-remove" data-action="remove">Odstranit</button>
      </div>
    `;

    // Add event listeners
    const decreaseBtn = cartItem.querySelector('[data-action="decrease"]');
    const increaseBtn = cartItem.querySelector('[data-action="increase"]');
    const removeBtn = cartItem.querySelector('[data-action="remove"]');

    decreaseBtn.addEventListener('click', () => {
      cartManager.updateQuantity(item.id, item.quantity - 1);
      renderCart();
    });

    increaseBtn.addEventListener('click', () => {
      cartManager.updateQuantity(item.id, item.quantity + 1);
      renderCart();
    });

    removeBtn.addEventListener('click', () => {
      cartManager.removeFromCart(item.id);
      renderCart();
    });

    return cartItem;
  }

  // Clear cart button
  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
      if (confirm('Opravdu chcete vymazat celý košík?')) {
        cartManager.clearCart();
        renderCart();
      }
    });
  }

  // Checkout button
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      // For now, just show a message. You can integrate with a payment system later
      alert('Funkce objednávání bude brzy dostupná!');
    });
  }

  // Initial render
  renderCart();
}

// Purchase message function
function showPurchaseMessage(productId, action = 'Přidat do košíku') {
  // Remove any existing messages first
  const existingMessage = document.querySelector('.purchase-message');
  if (existingMessage) {
    existingMessage.remove();
  }
  
  // Create a temporary success message
  const message = document.createElement('div');
  message.className = 'purchase-message';
  message.textContent = `${action} - Produkt přidán do košíku!`;
  
  document.body.appendChild(message);
  
  // Animate in
  setTimeout(() => {
    message.classList.add('show');
  }, 100);
  
  // Animate out and remove
  setTimeout(() => {
    message.classList.remove('show');
    setTimeout(() => {
      if (message.parentNode) {
        message.parentNode.removeChild(message);
      }
    }, 300);
  }, 3000);
}

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);











