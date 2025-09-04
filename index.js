// ================== Mobile Menu Toggle ==================
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const header = document.querySelector('.header');
const closeMenuBtn = document.querySelector('.close-menu-btn');

// Toggle mobile menu (hamburger / close icon)
mobileMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  const icon = mobileMenuBtn.querySelector('i');
  if (mobileMenu.classList.contains('active')) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
  } else {
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
});

// Close menu when clicking X button
if (closeMenuBtn) {
  closeMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  });
}

// Close menu when clicking a link
document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  });
});

// ================== Header Background on Scroll ==================
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    header.style.background = 'rgba(25, 27, 29, 0.98)';
  } else {
    header.style.background = 'rgba(24, 26, 29, 0.94)';
  }  
});

// ================== Smooth Scroll for Navigation ==================
const navLinks = document.querySelectorAll('a[href^="#"]');
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const headerHeight = header.offsetHeight;
      const targetPosition = targetSection.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ================== Shopping Cart ==================
let cartCount = 0;
const shoppingBag = document.querySelector('.shopping-bag');
const addToCartButtons = document.querySelectorAll('.add-to-cart');

// Update cart display
function updateCartDisplay() {
  if (cartCount > 0) {
    if (!document.querySelector('.cart-count')) {
      const cartBadge = document.createElement('span');
      cartBadge.className = 'cart-count';
      cartBadge.style.cssText = `
        position: absolute;
        top: -8px;
        right: -8px;
        background: #dc2626;
        color: white;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        font-size: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
      `;
      shoppingBag.style.position = 'relative';
      shoppingBag.appendChild(cartBadge);
    }
    document.querySelector('.cart-count').textContent = cartCount;
  } else {
    const cartBadge = document.querySelector('.cart-count');
    if (cartBadge) cartBadge.remove();
  }
}

// Add to cart
addToCartButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    cartCount++;
    updateCartDisplay();

    // Visual feedback
    button.style.background = '#059669';
    button.textContent = 'Added!';
    setTimeout(() => {
      button.style.background = '#dc2626';
      button.textContent = 'Add to Cart';
    }, 1500);

    // Animate bag
    shoppingBag.style.transform = 'scale(1.2)';
    setTimeout(() => shoppingBag.style.transform = 'scale(1)', 200);
  });
});

// ================== Product Overlay Buttons ==================
const overlayButtons = document.querySelectorAll('.overlay-btn');
overlayButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const icon = button.querySelector('i');

    if (icon.classList.contains('fa-eye')) {
      showQuickView(button);
    } else if (icon.classList.contains('fa-shopping-cart')) {
      cartCount++;
      updateCartDisplay();

      button.style.background = '#059669';
      icon.className = 'fas fa-check';

      setTimeout(() => {
        button.style.background = '#dc2626';
        icon.className = 'fas fa-shopping-cart';
      }, 1500);
    }
  });
});

// ================== Quick View Modal ==================
function showQuickView(button) {
  const productCard = button.closest('.product-card');
  const productName = productCard.querySelector('h3').textContent;
  const productImage = productCard.querySelector('img').src;
  const productPrice = productCard.querySelector('.current-price').textContent;

  const modal = document.createElement('div');
  modal.className = 'quick-view-modal';
  modal.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.8);
    display: flex; align-items: center; justify-content: center;
    z-index: 2000; opacity: 0; transition: opacity 0.3s ease;
  `;

  modal.innerHTML = `
    <div class="modal-content" style="
      background: #1f2937; border-radius: 16px; padding: 32px;
      max-width: 500px; width: 90%; position: relative;
      transform: scale(0.8); transition: transform 0.3s ease;">
      <button class="close-modal" style="
        position: absolute; top: 16px; right: 16px;
        background: none; border: none; color: #9ca3af;
        font-size: 24px; cursor: pointer;">
        <i class="fas fa-times"></i>
      </button>
      <img src="${productImage}" alt="${productName}" style="
        width: 100%; height: 200px; object-fit: cover;
        border-radius: 12px; margin-bottom: 16px;">
      <h3 style="color: white; margin-bottom: 8px;">${productName}</h3>
      <p style="color: #dc2626; font-size: 1.5rem; font-weight: 700; margin-bottom: 16px;">${productPrice}</p>
      <p style="color: #9ca3af; margin-bottom: 24px;">
        Premium quality clothing with modern design and comfortable fit. Available in multiple sizes and colors.
      </p>
      <button class="modal-add-to-cart" style="
        background: #dc2626; color: white; border: none;
        padding: 12px 24px; border-radius: 8px; font-weight: 600;
        cursor: pointer; width: 100%;">Add to Cart</button>
    </div>
  `;

  document.body.appendChild(modal);

  setTimeout(() => {
    modal.style.opacity = '1';
    modal.querySelector('.modal-content').style.transform = 'scale(1)';
  }, 10);

  const closeModal = () => {
    modal.style.opacity = '0';
    modal.querySelector('.modal-content').style.transform = 'scale(0.8)';
    setTimeout(() => document.body.removeChild(modal), 300);
  };

  modal.querySelector('.close-modal').addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

  modal.querySelector('.modal-add-to-cart').addEventListener('click', () => {
    cartCount++;
    updateCartDisplay();
    closeModal();
  });
}

// ================== Intersection Observer Animations ==================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.feature-card, .product-card, .testimonial-card')
  .forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

// ================== Hero Buttons ==================
document.querySelectorAll('.hero-buttons .btn').forEach(button => {
  button.addEventListener('click', (e) => {
    if (button.textContent.includes('Shop Collection')) {
      e.preventDefault();
      document.querySelector('#products').scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (button.textContent.includes('Learn More')) {
      e.preventDefault();
      document.querySelector('#about').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ================== View All Products Button ==================
const viewAllBtn = document.querySelector('.view-all .btn');
if (viewAllBtn) {
  viewAllBtn.addEventListener('click', (e) => {
    e.preventDefault();
    alert('View All Products functionality would redirect to a full catalog page.');
  });
}

// ================== Contact Form ==================
document.querySelectorAll('.contact-item a').forEach(item => {
  if (item.href.startsWith('tel:') || item.href.startsWith('mailto:')) {
    item.addEventListener('click', () => {
      console.log('Contact action:', item.href);
    });
  }
});

// ================== Hero Section Animation ==================
window.addEventListener('load', () => {
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(30px)';
    heroContent.style.transition = 'opacity 1s ease, transform 1s ease';

    setTimeout(() => {
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
    }, 100);
  }
});

// ================== Buttons Loading State ==================
function addLoadingState(button, originalText, loadingText = 'Loading...') {
  button.disabled = true;
  button.textContent = loadingText;
  button.style.opacity = '0.7';

  setTimeout(() => {
    button.disabled = false;
    button.textContent = originalText;
    button.style.opacity = '1';
  }, 1000);
}

// ================== Button Hover Effects ==================
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('mouseenter', () => button.style.transform = 'translateY(-2px)');
  button.addEventListener('mouseleave', () => button.style.transform = 'translateY(0)');
});

// ================== Keyboard Support ==================
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (mobileMenu.classList.contains('active')) {
      mobileMenu.classList.remove('active');
      const icon = mobileMenuBtn.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
    const modal = document.querySelector('.quick-view-modal');
    if (modal) modal.click();
  }
});

// ================== Debounce for Scroll ==================
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args); 
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  }; 
}

const debouncedScrollHandler = debounce(() => {
  if (window.scrollY > 100) {
    header.style.background = 'rgba(25, 27, 29, 0.98)';
  } else {
    header.style.background = 'rgba(24, 26, 29, 0.94)';
  }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

console.log('Red N Red website loaded successfully! 🔴');
