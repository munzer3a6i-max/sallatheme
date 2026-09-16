# زِرار — Zirar

ثيم [سلة](https://salla.sa) مبني على قوالب **Twilight**، مصمَّم خصيصًا لمتاجر الأثواب والملابس
الرجالية التقليدية: هوية رملية هادئة، وضع ليلي كامل، وصفحة منتج غنية بتفاصيل القماش والمقاس.

A Salla **Twilight** theme for thobe and men's traditional wear stores: a calm sand identity,
a full dark mode, and a product page built around the details a thobe buyer actually asks about.

---

## المزايا · Features

| | |
|---|---|
| **وضع ليلي** | يختار التاجر النمط الافتراضي (فاتح / داكن / حسب الجهاز)، ويستطيع الزائر تبديله ويُحفظ اختياره. |
| **هوية رملية** | لوحة ألوان رملية–حبرية مع لون العلامة الذي يختاره التاجر من لوحة تحكم سلة. |
| **شريط إعلان** | شريط علوي قابل للإغلاق، ويعود للظهور تلقائيًا عند تغيير نص الإعلان. |
| **شريط تنقل سفلي** | تنقل سريع في الجوال (الرئيسية، التصنيفات، البحث، السلة، الحساب) يختفي عند التمرير لأسفل. |
| **صفحة منتج للأثواب** | بطاقة القماش والعناية، تنويه اختيار المقاس، دليل المقاسات، وزر شراء مثبّت في الجوال. |
| **١٠ عناصر للصفحة الرئيسية** | معرض رئيسي، تشكيلات، مزايا المتجر، بانر تعريفي، منتجات مميزة، عدّاد عروض، دليل المقاسات، معرض إطلالات، آراء العملاء، والماركات. |
| **دعم كامل للعربية** | الثيم مكتوب RTL أولًا، مع تعريب كل نصوص الثيم في `src/locales`. |
| **إتاحة** | تباين مُتحقق منه في النمطين، واحترام `prefers-reduced-motion`. |

## التشغيل · Getting started

```bash
npm install          # تثبيت الاعتماديات
npm run watch        # التطوير: مراقبة الملفات ورفع التغييرات للمتجر المرتبط
npm run production   # بناء ملفات الإنتاج داخل public/
```

> `npm run watch` يستخدم مراقب Twilight الرسمي (`@salla.sa/twilight/watcher.js`).
> لتعطيله في بيئة لا تتصل بمتجر (CI مثلًا) شغّل البناء مع `ZIRAR_DISABLE_WATCHER=1`.

الرفع إلى متجرك يتم عبر [Salla CLI](https://docs.salla.dev/) بعد تسجيل الدخول:

```bash
salla theme publish
```

## البنية · Project structure

```
twilight.json              بيانات الثيم: المزايا، إعدادات التاجر، وعناصر الصفحة الرئيسية
src/
├── assets/
│   ├── images/            صور الثيم (تُنسخ إلى public/images عند البناء)
│   ├── js/                منطق الصفحات + مكوّنات الويب المخصصة
│   │   └── partials/      بطاقة المنتج، القائمة الرئيسية، الوضع الليلي، شريط الإعلان…
│   └── styles/            نظام التصميم (ITCSS): settings → generic → elements → components → utilities
├── locales/               ar.json / en.json لنصوص الثيم
└── views/
    ├── layouts/           master.twig و customer.twig
    ├── components/        header، footer، وعناصر الصفحة الرئيسية
    └── pages/             صفحات المتجر (المنتج، السلة، الحساب، المدونة، الماركات…)
public/                    مخرجات البناء التي يقدّمها المتجر
```

## نظام التصميم · Design tokens

كل الألوان معرَّفة كمتغيرات CSS في `src/assets/styles/01-settings/global.scss`، ويعاد تعريفها
تحت `html.dark`:

| المتغير | الدور |
|---|---|
| `--color-primary` *(من سلة)* | لون العلامة الذي يختاره التاجر؛ يُفتَّح تلقائيًا في الوضع الليلي إن كان داكنًا. |
| `--color-ivory` / `--color-surface` | خلفية الصفحة وخلفية البطاقات. |
| `--color-sand` / `--color-sand-dark` | الأسطح الرملية والفواصل. |
| `--color-ink` / `--color-ink-soft` / `--color-muted` | تدرّجات النص. |
| `--color-invert-bg` / `--color-invert-ink` | الأقسام المعكوسة (شريط الإعلان، التذييل الداكن، بانر العروض) — تبقى داكنة في النمطين. |
| `--s-radius` | استدارة الحواف، يتحكم بها إعداد «شكل الحواف». |

## إعدادات التاجر · Theme settings

تظهر في لوحة تحكم سلة تحت إعدادات الثيم، وهي معرّفة في `twilight.json`:
المظهر العام (النمط، الحواف، الحركات) · الشريط العلوي والقائمة · الصفحة الرئيسية ·
صفحة المنتج (مسار التنقل، تكبير الصور، تثبيت زر الشراء، تنويه المقاسات، بطاقة القماش) · التذييل.

## عناصر الصفحة الرئيسية · Home components

| العنصر | الملف |
|---|---|
| معرض رئيسي | `components/home/zirar-hero.twig` |
| تشكيلات / تصنيفات | `components/home/zirar-collections.twig` |
| مزايا المتجر | `components/home/zirar-usp.twig` |
| بانر تعريفي | `components/home/zirar-split-banner.twig` |
| عرض منتجات مميزة | `components/home/zirar-products-showcase.twig` |
| عرض بعدّاد تنازلي | `components/home/zirar-countdown.twig` |
| شريط دليل المقاسات | `components/home/zirar-size-guide.twig` |
| معرض إطلالات | `components/home/zirar-lookbook.twig` |
| آراء عملاء مخصصة | `components/home/zirar-testimonials.twig` |
| الماركات التجارية | `components/home/zirar-brands.twig` |

بالإضافة إلى عناصر سلة الجاهزة المفعّلة في `features` (منتجات مميزة، بنر ثابت، سلايدر منتجات،
سلايدر صور، خلفية متحركة، آراء العملاء، صور مربعة، مزايا المتجر، يوتيوب).

## الترخيص · License

MIT. بُني هيكل القوالب ومنطق الربط مع Twilight انطلاقًا من
[SallaApp/theme-raed](https://github.com/SallaApp/theme-raed) (MIT)، مع تصميم وهوية مستقلين لمتجر زِرار.
