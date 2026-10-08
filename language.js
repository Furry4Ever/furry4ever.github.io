/* =========================================================
   Furry4Ever - Language System
   Arabic / English
   ========================================================= */

(function () {

  const STORAGE_KEY = "furry4ever-language";

  const translations = {

    ar: {
      dir: "rtl",
      langName: "العربية",

      "language.english": "English",
      "language.arabic": "العربية",

      "nav.home": "الرئيسية",
      "nav.services": "الخدمات",
      "nav.shop": "المتجر",
      "nav.about": "من نحن",
      "nav.knowledge": "المعرفة",

      "button.book": "حجز موعد",
      "button.shop": "تسوق الآن",
      "button.services": "الخدمات",
      "button.order": "طلب",
      "button.inquiry": "استفسار",
      "button.all": "الكل",
      "button.back": "العودة",

      "shop.title": "المتجر",
      "shop.search": "ابحث عن منتج...",
      "shop.noProducts": "لا توجد منتجات مطابقة.",
      "shop.loading": "جاري تحميل المنتجات...",
      "shop.error": "تعذر تحميل المنتجات حاليًا. حاول مرة أخرى.",
      "shop.unavailable": "غير متوفر حاليًا",

      "product.loading": "جاري تحميل المنتج...",
      "product.notFound": "المنتج غير موجود",
      "product.loadError": "تعذر تحميل المنتج",
      "product.order": "طلب المنتج عبر واتساب",
      "product.backToShop": "العودة إلى المتجر",

      "why.title": "لماذا Furry4Ever؟",
      "why.vet": "رعاية بيطرية احترافية",
      "why.home": "زيارات بيطرية منزلية",
      "why.products": "منتجات للحيوانات الأليفة",
      "why.support": "حجز ودعم سهل عبر واتساب"
    },

    en: {
      dir: "ltr",
      langName: "English",

      "language.english": "English",
      "language.arabic": "العربية",

      "nav.home": "Home",
      "nav.services": "Services",
      "nav.shop": "Shop",
      "nav.about": "About Us",
      "nav.knowledge": "Knowledge",

      "button.book": "Book an Appointment",
      "button.shop": "Shop Now",
      "button.services": "Services",
      "button.order": "Order",
      "button.inquiry": "Inquiry",
      "button.all": "All",
      "button.back": "Back",

      "shop.title": "Shop",
      "shop.search": "Search products...",
      "shop.noProducts": "No matching products found.",
      "shop.loading": "Loading products...",
      "shop.error": "Unable to load products right now. Please try again.",
      "shop.unavailable": "Currently unavailable",

      "product.loading": "Loading product...",
      "product.notFound": "Product not found",
      "product.loadError": "Unable to load product",
      "product.order": "Order via WhatsApp",
      "product.backToShop": "Back to Shop",

      "why.title": "Why Furry4Ever?",
      "why.vet": "Professional Veterinary Care",
      "why.home": "Home Veterinary Visits",
      "why.products": "Pet Products",
      "why.support": "Easy Booking & WhatsApp Support"
    }

  };


  /* ---------------------------------------------------------
     Get current language
     --------------------------------------------------------- */

  function getLanguage() {

    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved === "ar" || saved === "en") {
      return saved;
    }

    return "en";
  }


  /* ---------------------------------------------------------
     Get translation
     --------------------------------------------------------- */

  function t(key) {

    const lang = getLanguage();

    return (
      translations[lang]?.[key] ||
      translations.en?.[key] ||
      key
    );

  }


  /* ---------------------------------------------------------
     Apply page language
     --------------------------------------------------------- */

  function applyLanguage(lang) {

    if (lang !== "ar" && lang !== "en") {
      lang = "en";
    }

    localStorage.setItem(STORAGE_KEY, lang);

    document.documentElement.lang = lang;
    document.documentElement.dir =
      translations[lang].dir;


    /*
      Translate elements that have:
      data-i18n="translation.key"
    */

    document.querySelectorAll("[data-i18n], [data-f4-key]")
      .forEach(element => {

        const key =
          element.getAttribute("data-i18n");

        const value = t(key);

        if (element.tagName === "INPUT" ||
            element.tagName === "TEXTAREA") {

          element.placeholder = value;

        } else {

          element.textContent = value;

        }

      });


    /*
      Translate placeholders separately if needed
    */

    document.querySelectorAll("[data-i18n-placeholder]")
      .forEach(element => {

        const key =
          element.getAttribute("data-i18n-placeholder");

        element.placeholder = t(key);

      });


    updateLanguageSwitcher();

    /*
      Allow the page itself to refresh dynamic content.
      This is important for the Shop.
    */

    window.dispatchEvent(
      new CustomEvent("furry4ever-language-changed", {
        detail: { language: lang }
      })
    );

  }


  /* ---------------------------------------------------------
     Language switcher
     --------------------------------------------------------- */

  function createLanguageSwitcher() {

    if (document.getElementById("furry4ever-language-switcher")) {
      return;
    }


    const switcher =
      document.createElement("div");

    switcher.id =
      "furry4ever-language-switcher";


    switcher.innerHTML = `
      <button
        type="button"
        id="furry4ever-language-button"
        aria-label="Change language"
        title="Change language"
        style="
          display:flex;
          align-items:center;
          gap:6px;
          border:1px solid rgba(19,92,89,.15);
          background:white;
          color:#135c59;
          border-radius:999px;
          padding:6px 10px;
          font-size:12px;
          font-weight:700;
          cursor:pointer;
          box-shadow:0 2px 8px rgba(0,0,0,.05);
        "
      >
        <span style="font-size:14px;">🌐</span>
        <span id="furry4ever-language-label">العربية</span>
      </button>
    `;


    document
      .getElementById("furry4ever-language-button")
      .addEventListener("click", function () {

        const current = getLanguage();

        const next =
          current === "en"
            ? "ar"
            : "en";

        applyLanguage(next);

      });


    updateLanguageSwitcher();

  }


  /* ---------------------------------------------------------
     Update switcher text
     --------------------------------------------------------- */

  function updateLanguageSwitcher() {

    const label =
      document.getElementById(
        "furry4ever-language-label"
      );

    if (!label) return;


    const current = getLanguage();

    label.textContent =
      current === "en"
        ? "العربية"
        : "English";

  }


  /* ---------------------------------------------------------
     Public API
     --------------------------------------------------------- */

  window.Furry4EverLanguage = {

    getLanguage,
    setLanguage: applyLanguage,
    translate: t

  };


  /* ---------------------------------------------------------
     Start
     --------------------------------------------------------- */

  function initLanguageSystem() {

    createLanguageSwitcher();

    applyLanguage(getLanguage());

  }


  if (document.readyState === "loading") {

    document.addEventListener(
      "DOMContentLoaded",
      initLanguageSystem
    );

  } else {

    initLanguageSystem();

  }

})();
