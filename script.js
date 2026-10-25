/* ==========================================================================
   صالون ايليت سنتر  — JavaScript (بدون أي مكتبات أو سيرفر)
   كل البيانات القابلة للتعديل موجودة في أعلى هذا الملف
   ========================================================================== */
(function () {
  "use strict";
  document.documentElement.classList.add("js");

  /* ===================== 1) إعدادات الصالون ===================== */
const SITE = {
  name: "صالون ايليت سنتر ",

  // رقم واتساب لاستقبال الحجوزات
  whatsapp: "972525840464",

  // رقم الهاتف المعروض للزوار
  phoneDisplay: "052-584-0464",

  // رابط الاتصال المباشر
  phoneHref: "+972525840464",

  instagram: "https://instagram.com/",
  instagramHandle: "@alabboud_salon",

  address: "بيت جالا",

  // أوقات الحجز
  hours: {
    open: "10:00",
    close: "20:30",
    step: 30
  }
};

  /* ===================== 2) الصور ===================== */
  // صور Unsplash مجانية. لاستبدالها بصور صالونك ضعها في مجلد images/ واكتب "images/اسم.jpg"
  const u = (id, w) =>
    "https://images.unsplash.com/photo-" + id + "?auto=format&fit=crop&w=" + (w || 1400) + "&q=80";
  const IMG = {
    hero: u("1672642150228-3fcd5826ec26", 2000),
    barber: u("1634480257305-7f4ca3582e6a"),
    shop: u("1702865272115-5afdbae975af"),
    chair: u("1621645582931-d1d3e6564943"),
    beard: u("1494873446894-adbfecfc407a"),
    razor: u("1634484144058-fbe30f770ca1"),
  };

  /* ===================== 3) الخدمات والأسعار (₪) ===================== */
 const SERVICES = [
    { id: "classic", name: "العناية بالبشرة | SKIN CARE", price: 40, icon: "scissors",
      desc: "تنظيف بشرة عميق هايدرافيشل (HydraFacial) تفتيح البشرة العناية بالتصبغات جلسات نضارة البشرة تقشير البشرة والجسم." },
    { id: "cut-beard", name: "الحلاقة الرجالية | BARBER CLUB", price: 60, icon: "razor",
      desc: "قص شعر كلاسيك، Skin Fade، تحديد وترتيب اللحية، قص شعر ولحية، رسم وتصميم على الشعر، حلاقة VIP بغرفة خاصة، تجهيز العريس." },
    { id: "kids", name: "علاجات الشعر | HAIR LAB", price: 30, icon: "smile",
      desc: "صبغات الشعر، سحب اللون، بروتين الشعر، كرياتين وتنعيم الشعر، علاجات الشعر، تصفيف الشعر." },
    { id: "facial", name: "الأظافر والعناية باليدين والقدمين | NAIL CARE", price: 50, icon: "sparkle",
      desc: "مانيكير رجالي، بديكير رجالي، تنظيف وترتيب الأظافر، إزالة الجلد الميت، العناية باليدين والقدمين." },
    { id: "protein", name: "المساج والاسترخاء | WELLNESS", price: 150, icon: "drop",
      desc: "مساج استرخائي، مساج علاجي." },
      { id: "protein", name: "الحجامة وكاسات الهواء | HIJAMA & CUPPING", price: 150, icon: "drop",
      desc: "مساج استرخائي، مساج علاجي." },
  ];
  const QUICK_IDS = ["classic", "cut-beard", "facial"]; // الخدمات الظاهرة في الرئيسية

  const WHY_US = [
    { icon: "shield", title: "نظافة تامة",
      text: "نعتمد معايير نظافة وتعقيم صارمة للأدوات والمقاعد بعد كل زبون، لأن راحتك وسلامتك أولًا." },
    { icon: "award", title: "احترافية عالية",
      text: "حلاقون ذوو خبرة طويلة يُصغون لطلبك ويقترحون ما يناسب شكل وجهك بدقة وإتقان." },
    { icon: "flask", title: "منتجات أصلية",
      text: "نستخدم منتجات عناية أصلية من علامات موثوقة تحافظ على صحة شعرك وبشرتك." },
  ];
  const COURSE_GROUPS = [
    { num: "01", title: "دورات الحلاقة", en: "BARBER COURSES", items: [
      { name: "الدورة المكثفة", en: "INTENSIVE COURSE", desc: "تدريب عملي مكثف لتعلّم أساسيات الحلاقة وتقنياتها، من استخدام الأدوات إلى تنفيذ القصّات والتدرّجات." },
      { name: "الدورة العادية", en: "BASIC COURSE", desc: "مسار تدريبي لتعلّم أساسيات الحلاقة خطوة بخطوة، من المبادئ الأولى إلى التطبيق العملي." },
      { name: "دورة تطوير الخبرة", en: "SKILL UPGRADE", desc: "للحلاقين اللي بدهم يطوّروا مستواهم، ويحسّنوا دقة القصّات وسرعة التنفيذ والتشطيب." },
      { name: "دورة Skin Fade", en: "", desc: "تعلّم تقنيات التدرّج، الدمج بين الأطوال، والوصول إلى تشطيب نظيف واحترافي." },
      { name: "دورة الرسم على الشعر", en: "HAIR DESIGN", desc: "تعلّم تصميم الخطوط والرسومات على الشعر، وتطوير الدقة والإبداع في التنفيذ." },
    ] },
    { num: "02", title: "دورات الصبغات", en: "HAIR COLOR COURSES", items: [
      { name: "دورة أساسيات الصبغة", desc: "فهم الألوان واختيار الدرجة المناسبة." },
      { name: "دورة سحب اللون", desc: "التعرّف على تقنيات سحب اللون وتقييم حالة الشعر." },
      { name: "دورة تصحيح الألوان", desc: "التعامل مع اختلاف الدرجات والنتائج غير المرغوبة." },
      { name: "دورة تقنيات الصبغ الحديثة", desc: "تطبيق أساليب الصبغة المختلفة عمليًا." },
    ] },
    { num: "03", title: "دورات علاجات الشعر", en: "HAIR TREATMENT COURSES", items: [
      { name: "دورة البروتين", desc: "التعرّف على المنتجات وطرق التطبيق والعناية اللاحقة." },
      { name: "دورة الكرياتين والتنعيم", desc: "فهم تقنيات التنعيم واختيار المنتج المناسب." },
      { name: "دورة العناية بالشعر", desc: "التعرّف على أنواع الشعر واحتياجاته وكيفية اختيار العلاج المناسب." },
    ] },
    { num: "04", title: "دورات العناية بالبشرة", en: "SKIN CARE COURSES", items: [
      { name: "أساسيات العناية بالبشرة" },
      { name: "تنظيف البشرة" },
      { name: "الهايدرافيشل", desc: "حسب الأجهزة والتقنيات المتوفرة." },
      { name: "تقنيات العناية بنضارة البشرة" },
      { name: "تقشير البشرة ومبادئ اختيار المنتجات المناسبة" },
    ] },
    { num: "05", title: "دورات العناية الشخصية", en: "PERSONAL CARE COURSES", items: [
      { name: "المانيكير والبديكير الرجالي" },
      { name: "أساسيات العناية باليدين والقدمين" },
      { name: "التعرّف على الأدوات والنظافة والتعقيم" },
    ] },
    { num: "06", title: "دورات الحجامة وكاسات الهواء", en: "HIJAMA & CUPPING COURSES",
      note: "تُقدَّم هذه الدورات فقط ضمن نطاق التدريب المؤهل والمتطلبات الصحية والتنظيمية المعمول بها.",
      items: [
      { name: "أساسيات الحجامة ومبادئ السلامة" },
      { name: "التعرّف على الأدوات والتعقيم" },
      { name: "أساسيات كاسات الهواء الجافة" },
    ] },
  ];
  const ACADEMY_PERKS = [
    "تدريب نظري وعملي حسب البرنامج.",
    "محتوى تدريبي مناسب لمستوى الدورة.",
    "شهادة صادرة عن ELITE CENTRE عند استيفاء متطلبات الدورة.",
    "تفاصيل واضحة عن مدة الدورة ورسومها ومواعيدها قبل التسجيل.",
  ];
  /* ===================== 4) معرض الأعمال (12 صورة) ===================== */
  // لإضافة صورة "قبل" حقيقية: اكتب مسارها في الحقل before مثل "images/before-1.jpg"
  // وسيظهر زر قبل / بعد تلقائيًا داخل نافذة التكبير.
  const GALLERY = [
    { title: "تدرج كلاسيكي", tag: "قصّة", src: IMG.hero, pos: "center", before: null },
    { title: "قصّة عصرية", tag: "قصّة", src: IMG.barber, pos: "center 35%", before: null },
    { title: "تحديد اللحية", tag: "لحية", src: IMG.beard, pos: "center", before: null },
    { title: "لمسة الموس", tag: "حلاقة", src: IMG.razor, pos: "center", before: null },
    { title: "فيد منخفض", tag: "قصّة", src: IMG.hero, pos: "30% center", before: null },
    { title: "ستايل رجالي أنيق", tag: "تصفيف", src: IMG.barber, pos: "70% center", before: null },
    { title: "تشذيب لحية كثيفة", tag: "لحية", src: IMG.beard, pos: "35% center", before: null },
    { title: "أجواء الصالون", tag: "المكان", src: IMG.shop, pos: "center", before: null },
    { title: "قصّة شبابية", tag: "قصّة", src: IMG.razor, pos: "70% 40%", before: null },
    { title: "كرسي العبود", tag: "المكان", src: IMG.chair, pos: "center", before: null },
    { title: "تدرج متوسط", tag: "قصّة", src: IMG.hero, pos: "center 70%", before: null },
    { title: "اللمسة الأخيرة", tag: "تصفيف", src: IMG.barber, pos: "center 65%", before: null },
  ];

  /* ===================== المنتجات (صفحة المنتجات) ===================== */
  // الأسعار والأسماء هنا أمثلة — عدّلها حسب منتجاتك.
  // الصور من Burst (Shopify) المجانية. لاستبدال أي صورة بصورة منتجك الحقيقية:
  // ضعها في مجلد images/ واكتب  image: "images/اسم-الصورة.jpg"
  // (إن فشل تحميل صورة تظهر أيقونة ذهبية تلقائيًا بدلها)
  const burst = (slug) =>
    "https://burst.shopifycdn.com/photos/" + slug + ".jpg?width=900&format=pjpg&exif=0&iptc=0";

  const PRODUCT_CATS = [
    { id: "all", name: "الكل" },
    { id: "hair", name: "الشعر" },
    { id: "beard", name: "اللحية" },
    { id: "care", name: "العناية" },
  ];
  const PRODUCTS = [
    { id: "wax", name: "شمع تصفيف للشعر", cat: "hair", price: 35, icon: "scissors", badge: "الأكثر طلبًا",
      image: burst("profile-of-a-man-with-beard-and-styled-hair"),
      desc: "ثبات قوي ولمسة مطفية طبيعية، سهل التوزيع ويُغسل بسهولة." },
    { id: "comb", name: "مشط شعر وشارب", cat: "hair", price: 20, icon: "razor",
      image: burst("man-holds-a-comb-up-to-his-mustache"),
      desc: "مشط ناعم يرتّب الشعر والشارب ويوزّع المنتج بالتساوي." },
    { id: "beard-oil", name: "زيت اللحية", cat: "beard", price: 45, icon: "flask", badge: "الأكثر طلبًا",
      image: burst("beard-oil-product-photo"),
      desc: "يرطّب اللحية ويمنحها لمعانًا ونعومة ويقلل الحكة." },
    { id: "beard-oil-amber", name: "زيت لحية فاخر", cat: "beard", price: 55, icon: "drop",
      image: burst("amber-beard-oil-bottle"),
      desc: "تركيبة غنية بزجاجة عنبرية، تغذّي اللحية وتمنحها رائحة أنيقة." },
    { id: "beard-balm", name: "بلسم اللحية", cat: "beard", price: 40, icon: "drop",
      image: burst("beard-balm-product-photo"),
      desc: "يساعد على ترتيب اللحية وتشكيلها مع ترطيب عميق." },
    { id: "beard-kit", name: "طقم عناية باللحية", cat: "beard", price: 85, icon: "flask",
      image: burst("diy-beard-oil-bottles"),
      desc: "مجموعة زيوت للعناية اليومية باللحية بسعر أوفر." },
    { id: "shave-set", name: "فرشاة وموس حلاقة", cat: "care", price: 60, icon: "razor",
      image: burst("razor-and-shaving-brush-on-black-and-white"),
      desc: "طقم حلاقة كلاسيكي لحلاقة ناعمة ونظيفة مع رغوة كثيفة." },
    { id: "face-cream", name: "كريم ترطيب للوجه", cat: "care", price: 35, icon: "sparkle",
      image: burst("a-person-looks-into-a-mirror-rubbing-in-face-cream"),
      desc: "ترطيب خفيف يهدّئ البشرة بعد الحلاقة ويمنحها نضارة." },
  ];

  const NAV = [
    { href: "index.html", label: "الرئيسية", page: "home" },
    { href: "about.html", label: "من نحن", page: "about" },
    { href: "gallery.html", label: "أعمالنا", page: "gallery" },
    { href: "services.html", label: "الخدمات", page: "services" },
    { href: "products.html", label: "المنتجات", page: "products" },
     { href: "courses.html", label: "الدورات ", page: "courses" },
    { href: "booking.html", label: "الحجز", page: "booking" },
  ];

  /* ===================== 5) أدوات مساعدة ===================== */
  const ICON_PATHS = {
    scissors: '<circle cx="6" cy="6" r="3"/><path d="M8.12 8.12 12 12"/><path d="M20 4 8.12 15.88"/><circle cx="6" cy="18" r="3"/><path d="M14.8 14.8 20 20"/>',
    razor: '<path d="M4 16 14 6l4 4L8 20z"/><path d="m14 6 2-2 4 4-2 2"/><path d="M7 13l4 4"/>',
    sparkle: '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>',
    smile: '<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><path d="M9 9h.01"/><path d="M15 9h.01"/>',
    drop: '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>',
    shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    award: '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>',
    flask: '<path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    instagram: '<rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><path d="M17.5 6.5h.01"/>',
    menu: '<path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h10"/>',
    close: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    right: '<path d="m9 18 6-6-6-6"/>',
    left: '<path d="m15 18-6-6 6-6"/>',
    zoom: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6"/><path d="M8 11h6"/>',
    arrow: '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',
  };
  const icon = (name, cls) =>
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="' +
    (cls || "icon") + '" aria-hidden="true">' + ICON_PATHS[name] + "</svg>";

  const WA_SVG =
    '<svg viewBox="0 0 32 32" fill="currentColor" class="icon" aria-hidden="true"><path d="M16.02 3C9.4 3 4 8.38 4 15c0 2.36.7 4.55 1.9 6.4L4 29l7.8-1.85A11.9 11.9 0 0 0 16.02 27C22.64 27 28 21.62 28 15S22.64 3 16.02 3Zm6.9 17.03c-.29.82-1.6 1.55-2.2 1.63-.56.08-1.27.11-2.06-.13-.47-.15-1.08-.35-1.86-.68-3.27-1.41-5.4-4.71-5.56-4.93-.16-.22-1.33-1.77-1.33-3.38s.84-2.4 1.14-2.73c.29-.32.64-.4.85-.4h.61c.2 0 .46-.04.72.55.29.66.98 2.28 1.06 2.44.08.16.13.35.02.57-.11.22-.16.35-.32.55-.16.19-.34.43-.48.58-.16.16-.33.34-.14.66.19.32.85 1.4 1.83 2.27 1.26 1.12 2.32 1.47 2.64 1.63.32.16.5.13.69-.08.19-.22.81-.94 1.03-1.26.22-.32.43-.27.72-.16.29.11 1.86.88 2.18 1.04.32.16.53.24.61.37.08.14.08.79-.21 1.6Z"/></svg>';

  const waLink = (text) =>
    "https://wa.me/" + SITE.whatsapp + (text ? "?text=" + encodeURIComponent(text) : "");

  // الصيغة المطلوبة: مرحبا، بدي احجز [الخدمة] بتاريخ [التاريخ] الساعة [الوقت] اسمي [الاسم]
  const bookingMessage = (d) =>
    "مرحبا، بدي احجز " + d.service + " بتاريخ " + d.date + " الساعة " + d.time + " اسمي " + d.name +
    (d.phone ? "، رقم جوالي: " + d.phone : "");

  const $ = (s, r) => (r || document).querySelector(s);

  /* ===================== 6) الهيدر / الفوتر / زر واتساب ===================== */
  const logoHTML =
    '<span class="logo"><span class="logo-mark">' + icon("scissors", "icon") +
    '</span><span class="logo-text"><strong class="gold-text">صالون ايليت سنتر </strong><small>ELITE TOUCH</small></span></span>';

  function renderHeader(page) {
    const host = $("#site-header");
    if (!host) return;
    const links = NAV.map(
      (n) => '<a href="' + n.href + '"' + (n.page === page ? ' class="active" aria-current="page"' : "") + ">" + n.label + "</a>"
    ).join("");
    host.innerHTML =
      '<header class="site-header" id="siteHeader"><div class="container header-inner">' +
      '<a href="index.html" class="brand" aria-label="صالون العبود للحلاقة - الرئيسية">' + logoHTML + "</a>" +
      '<nav class="nav-desktop" aria-label="القائمة الرئيسية">' + links + "</nav>" +
      '<div class="header-actions"><a href="booking.html" class="btn btn-gold btn-sm header-cta">احجز الآن</a>' +
      '<button type="button" class="burger" id="burger" aria-label="فتح القائمة" aria-expanded="false">' +
      icon("menu") + "</button></div></div></header>" +
      '<div class="mobile-menu" id="mobileMenu"><nav aria-label="قائمة الموبايل">' + links +
      '<a href="booking.html" class="btn btn-gold">احجز الآن</a></nav></div>';

    const header = $("#siteHeader");
    const burger = $("#burger");
    const menu = $("#mobileMenu");
    const onScroll = () => header.classList.toggle("solid", window.scrollY > 24 || menu.classList.contains("open"));
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    burger.addEventListener("click", () => {
      const open = !menu.classList.contains("open");
      menu.classList.toggle("open", open);
      burger.innerHTML = icon(open ? "close" : "menu");
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "إغلاق القائمة" : "فتح القائمة");
      document.body.style.overflow = open ? "hidden" : "";
      onScroll();
    });
  }

  function renderFooter() {
    const host = $("#site-footer");
    if (!host) return;
    host.innerHTML =
      '<footer class="site-footer"><div class="container footer-grid">' +
      '<div><a href="index.html" class="brand">' + logoHTML + "</a>" +
      '<p class="footer-about">فن الحلاقة الرجالية بلمسة فاخرة. أكثر من 10 سنوات من الخبرة والاهتمام بأدق التفاصيل لتخرج بأفضل إطلالة.</p></div>' +
      '<div><h3>روابط سريعة</h3><ul>' +
      NAV.map((n) => '<li><a href="' + n.href + '">' + n.label + "</a></li>").join("") +
      "</ul></div>" +
      '<div><h3>تواصل معنا</h3><ul class="contact-list">' +
      "<li>" + icon("pin") + "<span>" + SITE.address + "</span></li>" +
      '<li><a href="tel:' + SITE.phoneHref + '">' + icon("phone") + '<span dir="ltr">' + SITE.phoneDisplay + "</span></a></li>" +
      '<li><a href="' + SITE.instagram + '" target="_blank" rel="noopener noreferrer">' + icon("instagram") +
      '<span dir="ltr">' + SITE.instagramHandle + "</span></a></li>" +
      '<li class="wa-li"></li>' +
      "</ul></div></div>" +
      '<div class="footer-bottom">© ' + new Date().getFullYear() + " " + SITE.name + ". جميع الحقوق محفوظة.</div></footer>";
    // سطر واتساب (يستخدم أيقونة واتساب الأصلية)
    $(".wa-li", host).innerHTML =
      '<a href="' + waLink() + '" target="_blank" rel="noopener noreferrer">' + WA_SVG + "<span>راسلنا على واتساب</span></a>";
  }

  function renderWhatsAppFloat() {
    const a = document.createElement("a");
    a.className = "wa-float";
    a.href = waLink("مرحبا، بدي أستفسر عن الحجز في صالون العبود");
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.setAttribute("aria-label", "تواصل معنا عبر واتساب");
    a.innerHTML = '<span class="wa-ring" aria-hidden="true"></span><span class="wa-icon">' + WA_SVG + "</span>";
    document.body.appendChild(a);
  }

  /* ===================== 7) الظهور عند التمرير ===================== */
  function initReveal() {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((e) => io.observe(e));
  }

  /* ===================== 8) محتوى الصفحات ===================== */
  const priceHTML = (p) => '<span dir="ltr">' + p + " ₪</span>";

  function initHome() {
    const host = $("#quick-services");
    if (!host) return;
    host.innerHTML = QUICK_IDS.map((id, i) => {
      const s = SERVICES.find((x) => x.id === id);
      return '<article class="card card-pad reveal" style="transition-delay:' + i * 120 + 'ms">' +
        '<span class="icon-circle">' + icon(s.icon, "icon icon-lg") + "</span>" +
        "<h3>" + s.name + "</h3><p>" + s.desc + "</p>" +
        '<p class="from-price">تبدأ من <strong>' + priceHTML(s.price) + "</strong></p></article>";
    }).join("");
  }

  function initAbout() {
    const host = $("#why-us");
    if (!host) return;
    host.innerHTML = WHY_US.map((w, i) =>
      '<article class="card card-pad center reveal" style="transition-delay:' + i * 120 + 'ms">' +
      '<span class="icon-circle big">' + icon(w.icon, "icon icon-xl") + "</span>" +
      "<h3>" + w.title + "</h3><p>" + w.text + "</p></article>"
    ).join("");
  }

  function initServices() {
    const host = $("#services-list");
    if (!host) return;
    host.innerHTML = SERVICES.map((s, i) =>
      '<li class="card service-row reveal" style="transition-delay:' + i * 80 + 'ms">' +
      '<span class="icon-circle">' + icon(s.icon, "icon icon-lg") + "</span>" +
      '<div class="service-info"><h2>' + s.name + "</h2><p>" + s.desc + "</p></div>" +
      '<div class="service-side"><span class="price">' + priceHTML(s.price) + "</span>" +
      '<a class="btn btn-gold btn-sm" href="booking.html?service=' + s.id + '">احجز هاي الخدمة</a></div></li>'
    ).join("");
  }

  function initProducts() {
    const grid = $("#products-grid");
    const filters = $("#product-filters");
    if (!grid || !filters) return;

    let active = "all";
    const orderLink = (p) =>
      waLink("مرحبا، بدي اطلب " + p.name + " (" + p.price + "₪) من صالون العبود");

    const renderFilters = () => {
      filters.innerHTML = PRODUCT_CATS.map((c) =>
        '<button type="button" class="chip' + (c.id === active ? " on" : "") + '" data-cat="' + c.id +
        '" aria-pressed="' + (c.id === active) + '">' + c.name + "</button>"
      ).join("");
    };

    const renderGrid = () => {
      const list = PRODUCTS.filter((p) => active === "all" || p.cat === active);
      grid.innerHTML = list.map((p, i) =>
        '<article class="p-card reveal" style="transition-delay:' + (i % 3) * 90 + 'ms">' +
        '<div class="p-media">' +
        (p.image
          ? '<img src="' + p.image + '" alt="' + p.name + '" loading="lazy">'
          : '<span class="p-icon">' + icon(p.icon, "icon icon-xl") + "</span>") +
        (p.badge ? '<span class="g-badge">' + p.badge + "</span>" : "") +
        "</div>" +
        '<div class="p-body"><h3>' + p.name + "</h3><p>" + p.desc + "</p>" +
        '<div class="p-foot"><span class="price p-price">' + priceHTML(p.price) + "</span>" +
        '<a class="btn btn-gold btn-sm" href="' + orderLink(p) + '" target="_blank" rel="noopener noreferrer" aria-label="اطلب ' +
        p.name + ' عبر واتساب">' + WA_SVG.replace('class="icon"', 'class="icon icon-sm"') + " اطلب عبر واتساب</a></div></div></article>"
      ).join("");
      grid.querySelectorAll(".reveal").forEach((el) => requestAnimationFrame(() => el.classList.add("is-visible")));
      // إن فشل تحميل صورة منتج نعرض أيقونة بدلها
      grid.querySelectorAll(".p-media img").forEach((img, i) => {
        img.addEventListener("error", () => {
          const wrap = document.createElement("span");
          wrap.className = "p-icon";
          wrap.innerHTML = icon(list[i].icon, "icon icon-xl");
          img.replaceWith(wrap);
        });
      });
    };

    filters.addEventListener("click", (e) => {
      const b = e.target.closest(".chip");
      if (!b) return;
      active = b.dataset.cat;
      renderFilters();
      renderGrid();
    });
    renderFilters();
    renderGrid();
  }

  function initGallery() {
    const host = $("#gallery-grid");
    if (!host) return;
    host.innerHTML = GALLERY.map((g, i) =>
      '<button type="button" class="g-item reveal" data-i="' + i + '" style="transition-delay:' + (i % 4) * 90 +
      'ms" aria-label="تكبير الصورة: ' + g.title + '">' +
      '<img src="' + g.src + '" alt="' + g.title + '" loading="lazy" style="object-position:' + g.pos + '">' +
      '<span class="g-shade"></span>' +
      (g.before ? '<span class="g-badge">قبل / بعد</span>' : "") +
      '<span class="g-zoom">' + icon("zoom", "icon icon-sm") + "</span>" +
      '<span class="g-caption"><small>' + g.tag + "</small><strong>" + g.title + "</strong></span></button>"
    ).join("");

    // نافذة التكبير
    const box = document.createElement("div");
    box.className = "lightbox";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.innerHTML =
      '<button type="button" class="lb-close" aria-label="إغلاق">' + icon("close") + "</button>" +
      '<button type="button" class="lb-nav lb-prev" aria-label="الصورة السابقة">' + icon("right") + "</button>" +
      '<button type="button" class="lb-nav lb-next" aria-label="الصورة التالية">' + icon("left") + "</button>" +
      '<figure class="lb-figure"><img class="lb-img" alt=""><figcaption>' +
      '<strong class="lb-title"></strong><span class="lb-count"></span>' +
      '<span class="lb-toggle" hidden><button type="button" data-v="before">قبل</button><button type="button" data-v="after" class="on">بعد</button></span>' +
      "</figcaption></figure>";
    document.body.appendChild(box);

    const img = $(".lb-img", box);
    const toggle = $(".lb-toggle", box);
    let cur = 0;

    const show = (i, side) => {
      cur = (i + GALLERY.length) % GALLERY.length;
      const g = GALLERY[cur];
      const useBefore = side === "before" && g.before;
      img.src = useBefore ? g.before : g.src;
      img.alt = g.title;
      $(".lb-title", box).textContent = g.title;
      $(".lb-count", box).textContent = cur + 1 + " / " + GALLERY.length;
      toggle.hidden = !g.before;
      toggle.querySelectorAll("button").forEach((b) => b.classList.toggle("on", b.dataset.v === (useBefore ? "before" : "after")));
    };
    const open = (i) => { show(i); box.classList.add("open"); document.body.style.overflow = "hidden"; };
    const close = () => { box.classList.remove("open"); document.body.style.overflow = ""; };

    host.addEventListener("click", (e) => {
      const b = e.target.closest(".g-item");
      if (b) open(Number(b.dataset.i));
    });
    $(".lb-close", box).addEventListener("click", close);
    $(".lb-prev", box).addEventListener("click", (e) => { e.stopPropagation(); show(cur - 1); });
    $(".lb-next", box).addEventListener("click", (e) => { e.stopPropagation(); show(cur + 1); });
    toggle.addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) show(cur, b.dataset.v); });
    box.addEventListener("click", (e) => { if (e.target === box) close(); });
    $(".lb-figure", box).addEventListener("click", (e) => e.stopPropagation());
    document.addEventListener("keydown", (e) => {
      if (!box.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(cur + 1);
      if (e.key === "ArrowRight") show(cur - 1);
    });
  }

  function initBooking() {
    const form = $("#bookingForm");
    if (!form) return;

    // صندوق التواصل المباشر بجانب الفورم
    const box = $("#contactBox");
    if (box) {
      box.innerHTML =
        "<li>" + icon("pin") + "<span>" + SITE.address + "</span></li>" +
        '<li><a href="tel:' + SITE.phoneHref + '">' + icon("phone") + '<span dir="ltr">' + SITE.phoneDisplay + "</span></a></li>" +
        '<li><a href="' + SITE.instagram + '" target="_blank" rel="noopener noreferrer">' + icon("instagram") +
        '<span dir="ltr">' + SITE.instagramHandle + "</span></a></li>" +
        "<li>" + icon("check") + "<span>الدفع في الصالون فقط</span></li>";
    }
    const f = {
      name: $("#name"), phone: $("#phone"), service: $("#service"), date: $("#date"), time: $("#time"),
    };

    // الخدمات
    f.service.innerHTML = '<option value="">اختر الخدمة…</option>' +
      SERVICES.map((s) => '<option value="' + s.id + '">' + s.name + " — " + s.price + "₪</option>").join("");

    // الأوقات
    const [oh, om] = SITE.hours.open.split(":").map(Number);
    const [ch, cm] = SITE.hours.close.split(":").map(Number);
    let slots = '<option value="">اختر الوقت…</option>';
    for (let m = oh * 60 + om; m <= ch * 60 + cm; m += SITE.hours.step) {
      const h = Math.floor(m / 60);
      const h12 = h % 12 === 0 ? 12 : h % 12;
      const label = h12 + ":" + String(m % 60).padStart(2, "0") + " " + (h < 12 ? "ص" : "م");
      slots += '<option value="' + label + '">' + label + "</option>";
    }
    f.time.innerHTML = slots;

    // أقل تاريخ = اليوم
    const now = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    f.date.min = now.getFullYear() + "-" + pad(now.getMonth() + 1) + "-" + pad(now.getDate());

    // اختيار الخدمة تلقائيًا من الرابط: booking.html?service=classic
    const preset = new URLSearchParams(window.location.search).get("service");
    if (preset && SERVICES.some((s) => s.id === preset)) f.service.value = preset;

    const summary = $("#serviceSummary");
    const updateSummary = () => {
      const s = SERVICES.find((x) => x.id === f.service.value);
      summary.hidden = !s;
      if (s) summary.innerHTML = "<span>" + s.name + '</span><strong dir="ltr">' + s.price + " ₪</strong>";
    };
    f.service.addEventListener("change", updateSummary);
    updateSummary();

    const setError = (key, msg) => {
      const el = $("#" + key + "-error");
      el.textContent = msg || "";
      f[key].setAttribute("aria-invalid", msg ? "true" : "false");
    };
    Object.keys(f).forEach((k) => f[k].addEventListener("input", () => setError(k, "")));

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const errs = {};
      if (f.name.value.trim().length < 2) errs.name = "الرجاء إدخال اسمك";
      if (!/^[0-9+\s-]{9,15}$/.test(f.phone.value.trim())) errs.phone = "رقم الجوال غير صحيح";
      if (!f.service.value) errs.service = "اختر نوع الخدمة";
      if (!f.date.value) errs.date = "اختر التاريخ";
      if (!f.time.value) errs.time = "اختر الوقت";
      Object.keys(f).forEach((k) => setError(k, errs[k]));
      if (Object.keys(errs).length) return;

      const s = SERVICES.find((x) => x.id === f.service.value);
      const [y, mo, d] = f.date.value.split("-");
      const url = waLink(bookingMessage({
        service: s.name,
        date: d + "/" + mo + "/" + y,
        time: f.time.value,
        name: f.name.value.trim(),
        phone: f.phone.value.trim(),
      }));
      window.open(url, "_blank", "noopener,noreferrer");
      const fb = $("#waFallback");
      fb.hidden = false;
      $("a", fb).href = url;
    });
  }


    function initCourses() {
    const host = $("#course-groups");
    if (!host) return;
    const reg = (courseName) =>
      waLinkTo(ACADEMY.phone, "مرحبا، بدي أستفسر وأسجّل بدورة: " + courseName + " (" + ACADEMY.name + ")");

    host.innerHTML = COURSE_GROUPS.map((g) =>
      '<section class="course-group reveal" aria-labelledby="cg-' + g.num + '">' +
      '<div class="cg-head"><span class="cg-num" aria-hidden="true">' + g.num + "</span><div>" +
      '<h2 id="cg-' + g.num + '">' + g.title + '</h2><span class="cg-en" dir="ltr">' + g.en + "</span></div></div>" +
      '<div class="course-grid">' + g.items.map((c) =>
        '<article class="course-card">' +
        '<div class="cc-top"><h3>' + c.name + "</h3>" + (c.en ? '<span class="cc-en" dir="ltr">' + c.en + "</span>" : "") + "</div>" +
        (c.desc ? "<p>" + c.desc + "</p>" : "") +
        '<a class="cc-reg" href="' + reg(c.name) + '" target="_blank" rel="noopener noreferrer">سجّل بهالدورة ' + icon("arrow", "icon icon-sm") + "</a></article>"
      ).join("") + "</div>" +
      (g.note ? '<p class="cg-note">' + g.note + "</p>" : "") + "</section>"
    ).join("");

  /* ===================== 9) التشغيل ===================== */
  function init() {
    const page = document.body.dataset.page;
    renderHeader(page);
    renderFooter();
    renderWhatsAppFloat();
    initHome();
    initAbout();
    initServices();
    initProducts();
    initGallery();
    initBooking();
    initReveal();
    const heroImg = $("[data-hero-img]");
    if (heroImg) heroImg.src = IMG.hero;
    document.querySelectorAll("[data-img]").forEach((el) => {
      const src = IMG[el.dataset.img];
      if (el.tagName === "IMG") el.src = src; else el.style.backgroundImage = "url('" + src + "')";
    });
  }
  document.addEventListener("DOMContentLoaded", init);
})();
