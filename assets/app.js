  document.getElementById('year').textContent = new Date().getFullYear();

  const burger = document.getElementById('burgerBtn');
  const navLinks = document.getElementById('navLinks');
  burger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }));

  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.setAttribute('aria-selected', 'false'));
      btn.setAttribute('aria-selected', 'true');
      document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('active'));
      document.getElementById(btn.dataset.target).classList.add('active');
    });
  });

  // Party packages — full dish names per price tier
  const PKG_DATA = [
    {price:"135.000đ", dishes:["Cải xào tỏi","Cá điêu hồng chiên mắm xoài","Sườn rim mặn","Cá suối chiên giòn","Lươn xào sả ớt","Canh riêu cua rau tập tàng","Cơm trắng, rau sống, tráng miệng, trà đá"]},
    {price:"150.000đ", dishes:["Rau tập tàng xào tỏi","Cá biển chiên mắm xoài","Gà kho sả ớt / kho gừng","Sườn rim tôm","Mực xào hành cần","Canh mồng tơi, cà pháo","Cơm trắng, rau sống, tráng miệng, trà đá"]},
    {price:"175.000đ", dishes:["Gỏi da bò","Mực xào chua ngọt","Sườn rim tôm","Ba chỉ rang cháy cạnh","Rau thập cẩm xào tỏi","Cá biển kho tộ","Canh tập tàng nấu tôm","Cơm trắng, rau sống, trái cây, trà đá"]},
    {price:"185.000đ", dishes:["Gỏi bò bóp thấu","Mực cơm chiên tỏi","Hàu nướng mỡ hành","Gà kho sả ớt","Canh cải nấu tôm","Cá thu sốt cà","Rau muống xào tỏi","Cơm trắng, rau sống, trà đá, tráng miệng"]},
    {price:"195.000đ", dishes:["Chả giò hải sản","Gỏi củ hũ dừa hải sản","Xìa hấp xả","Vẹm nướng mỡ hành","Tôm bạc rang muối","Lẩu hải sản","Bún tươi / mì tôm ăn lẩu","Cơm trắng, tráng miệng, trà đá"]},
    {price:"205.000đ", dishes:["Ngũ quả luộc","Xìa hấp xả","Gỏi hải sản","Tôm bạc rang muối","Cá biển nướng (bánh tráng cuốn)","Cơm chiên Dương Châu","Cháo hải sản","Cải xanh luộc, rau sống, trà đá, tráng miệng"]},
    {price:"215.000đ", dishes:["Gỏi bò tái chanh","Chả ram tôm","Mực hấp","Tôm bạc rang muối","Lẩu gà lá giang","Cơm chiên hải sản","Bún tươi / mì tôm ăn lẩu","Rau xanh xào tỏi theo mùa, cơm trắng, tráng miệng, trà đá"]},
    {price:"225.000đ", dishes:["Chả ram tôm","Gỏi hải sản","Hàu nướng mỡ hành","Mực cơm chiên tỏi","Cá biển nướng (bánh tráng + rau sống)","Lẩu hải sản","Bún tươi / mì tôm ăn lẩu","Cải xanh xào tỏi, cơm trắng, tráng miệng, trà đá"]},
    {price:"245.000đ", dishes:["Gỏi bò trộn cải mầm","Vẹm xanh (hấp + nướng)","Chả ram tôm cuốn lá cải","Ốc hương hấp","Cá biển nướng saté / muối ớt","Lẩu gà lá giang","Bún tươi / mì tôm ăn lẩu","Rau sống + bánh tráng cuốn, tráng miệng, trà đá"]},
    {price:"255.000đ", dishes:["Xìa hấp sả","Gỏi bò tái chanh","Gà ta nướng mật ong + xôi","Vẹm xanh (hấp + nướng)","Cá mú hấp xì dầu / thập cẩm","Cơm chiên dương châu","Rau sống + bánh tráng cuốn, cải xanh xào tỏi, tráng miệng, trà đá"]},
    {price:"265.000đ", dishes:["Gà ta nướng mật ong + xôi","Gỏi hải sản","Tôm sú hấp dừa","Mực ống chiên tỏi","Lẩu hải sản","Cơm chiên hải sản","Bún tươi / mì tôm ăn lẩu","Rau xanh xào tỏi theo mùa, tráng miệng, trà đá"]},
    {price:"275.000đ", dishes:["Xìa hấp sả","Gỏi hải sản","Tôm sú bỏ lò","Bê hấp tía tô","Cá biển nướng ngũ vị / saté / muối ớt","Vịt trời xào măng","Cơm chiên cá mặn","Bún tươi / mì tôm, rau sống + bánh tráng cuốn, tráng miệng, trà đá"]},
    {price:"295.000đ", dishes:["Xìa hấp sả","Chả ram tôm","Sườn non nướng","Ghẹ xanh Sông Cầu hấp","Lẩu hải sản","Cơm chiên dương châu","Bún tươi / mì tôm ăn lẩu","Rau muống xào tỏi, tráng miệng, trà đá"]},
    {price:"310.000đ", dishes:["Gỏi da bò","Xìa hấp sả","Hàu nướng phô mai","Gà ta nướng Tây Bắc","Bê hấp tía tô","Cá mú chiên xù sốt me","Sứa nước lèo + bún tươi / mì tôm","Rau xanh xào theo mùa, rau sống + bánh tráng cuốn, tráng miệng, trà đá"]},
    {price:"325.000đ", dishes:["Gỏi bò tái chanh","Hàu sữa phô mai","Tôm bạc rang muối","Mực hấp","Cá mú chiên xù sốt me","Canh chua cá biển","Ba chỉ chấy cháy cạnh","Cơm trắng, rau tập tàng luộc / xào, rau sống + bánh tráng cuốn, tráng miệng, trà đá"]},
    {price:"400.000đ", dishes:["Ngũ quả","Gà nướng mật ong","Ốc hương hấp","Vẹm xanh (hấp + nướng)","Tôm bạc sốc tỏi","Cá mú hấp xì dầu / thập cẩm","Vịt trời xào măng","Rau tập tàng luộc / xào, rau sống + bánh tráng cuốn, tráng miệng, trà đá"]}
  ];
  const FEATURED_PRICE = "225.000đ";
  const CHECK_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M20 6 9 17l-5-5"/></svg>';

  const pkgGrid = document.getElementById('pkgGrid');
  if (pkgGrid) {
    PKG_DATA.forEach(pkg => {
      const card = document.createElement('div');
      card.className = 'pkg-card' + (pkg.price === FEATURED_PRICE ? ' featured' : '');
      card.innerHTML = `<div class="pkg-name">${pkg.price} / khách</div>` +
        `<div class="pkg-price">${pkg.price} <sub>/ khách</sub></div>` +
        `<ul class="pkg-list">${pkg.dishes.map(d => `<li>${CHECK_SVG}${d}</li>`).join('')}</ul>` +
        `<a class="btn btn-primary pkg-book" href="#dat-tiec-nhanh" data-price="${pkg.price}">Đặt gói này</a>`;
      pkgGrid.appendChild(card);
    });
  }

  /* ===== Lọc 16 mức giá thành 3 tầng ===== */
  const giaSo = (txt) => parseInt(String(txt).replace(/[^0-9]/g, ''), 10);
  const TIERS = {
    'am-cung':     [135000, 185000],
    'sum-vay':     [195000, 265000],
    'trang-trong': [275000, 400000]
  };
  const filterWrap = document.getElementById('pkgFilter');
  const countEl = document.getElementById('pkgCount');
  if (filterWrap && pkgGrid) {
    const cards = pkgGrid.querySelectorAll('.pkg-card');
    cards.forEach((card, idx) => { card.dataset.gia = giaSo(PKG_DATA[idx].price); });
    const locTang = (tier) => {
      let hien = 0;
      cards.forEach(card => {
        const g = parseInt(card.dataset.gia, 10);
        const r = TIERS[tier];
        const ok = !r || (g >= r[0] && g <= r[1]);
        card.style.display = ok ? '' : 'none';
        if (ok) hien++;
      });
      if (countEl) {
        countEl.textContent = 'Đang hiện ' + hien + ' trong tổng số ' + cards.length + ' mức giá';
      }
    };
    filterWrap.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        filterWrap.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        locTang(btn.dataset.tier);
      });
    });
    locTang('sum-vay');
  }

  /* ===== Máy tính chi phí tiệc ===== */
  (function(){
    const gEl = document.getElementById('calcGuests');
    const gOut = document.getElementById('calcGuestsOut');
    const pEl = document.getElementById('calcPkg');
    const totalEl = document.getElementById('calcTotal');
    const perEl = document.getElementById('calcPer');
    const bookEl = document.getElementById('calcBook');
    if (!gEl || !pEl || !totalEl) return;

    PKG_DATA.forEach(pkg => {
      const o = document.createElement('option');
      o.value = pkg.price;
      o.textContent = pkg.price + ' / khách';
      if (pkg.price === FEATURED_PRICE) o.selected = true;
      pEl.appendChild(o);
    });

    const tinh = () => {
      const khach = parseInt(gEl.value, 10);
      const donGia = giaSo(pEl.value);
      gOut.textContent = khach + ' khách';
      totalEl.textContent = (khach * donGia).toLocaleString('vi-VN') + 'đ';
      perEl.textContent = khach + ' khách × ' + pEl.value + '/khách';
    };
    gEl.addEventListener('input', tinh);
    pEl.addEventListener('change', tinh);

    if (bookEl) bookEl.addEventListener('click', () => {
      const sel = document.getElementById('fpackage');
      if (sel) {
        sel.value = pEl.value + '/khách';
        sel.dispatchEvent(new Event('change'));
      }
      const gInput = document.getElementById('fguests');
      if (gInput) gInput.value = gEl.value;
    });

    tinh();
  })();

  const pkgSelect = document.getElementById('fpackage');
  if (pkgSelect) {
    PKG_DATA.forEach(pkg => {
      const opt = document.createElement('option');
      opt.value = pkg.price + '/khách';
      opt.textContent = pkg.price + '/khách';
      if (pkg.price === FEATURED_PRICE) opt.selected = true;
      pkgSelect.appendChild(opt);
    });
    const optAsk = document.createElement('option');
    optAsk.textContent = 'Chưa rõ, cần tư vấn';
    pkgSelect.appendChild(optAsk);

    const pkgPreview = document.getElementById('pkgPreview');
    function updatePkgPreview(){
      if (!pkgPreview) return;
      const found = PKG_DATA.find(p => (p.price + '/khách') === pkgSelect.value);
      if (found) {
        pkgPreview.innerHTML = '<strong>Món trong set ' + found.price + '/khách:</strong>' +
          '<ul class="pkg-preview-list">' + found.dishes.map(d => '<li>' + d + '</li>').join('') + '</ul>';
      } else {
        pkgPreview.textContent = 'Gọi hotline để được tư vấn set phù hợp.';
      }
    }
    pkgSelect.addEventListener('change', updatePkgPreview);
    updatePkgPreview();

    // "Đặt gói này" — chọn sẵn đúng gói rồi cuộn tới form đặt tiệc nhanh
    document.querySelectorAll('.pkg-book').forEach(link => {
      link.addEventListener('click', () => {
        pkgSelect.value = link.dataset.price + '/khách';
        updatePkgPreview();
      });
    });
  }

  // Video reel (auto-playing photo slideshow)
  (function(){
    const slides = document.querySelectorAll('#reelSlides .reel-slide');
    const dotsWrap = document.getElementById('reelDots');
    const capEl = document.getElementById('reelCaption');
    if(!slides.length || !dotsWrap) return;
    slides.forEach((s, idx) => {
      const d = document.createElement('span');
      d.className = 'reel-dot' + (idx === 0 ? ' active' : '');
      dotsWrap.appendChild(d);
    });
    const dots = dotsWrap.querySelectorAll('.reel-dot');
    let i = 0;
    let timer = null;
    function show(n){
      slides[i].classList.remove('active');
      dots[i].classList.remove('active');
      i = n;
      slides[i].classList.add('active');
      dots[i].classList.add('active');
      if (capEl) capEl.textContent = slides[i].alt;
    }
    function restart(){
      clearInterval(timer);
      timer = setInterval(() => show((i + 1) % slides.length), 4500);
    }
    dots.forEach((d, idx) => {
      d.setAttribute('role', 'button');
      d.setAttribute('tabindex', '0');
      d.setAttribute('aria-label', 'Xem ảnh ' + (idx + 1) + ': ' + slides[idx].alt);
      d.style.cursor = 'pointer';
      d.addEventListener('click', () => { show(idx); restart(); });
      d.addEventListener('keydown', ev => {
        if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); show(idx); restart(); }
      });
    });
    const reelFrame = document.querySelector('.reel-frame');
    if (reelFrame) {
      reelFrame.addEventListener('mouseenter', () => clearInterval(timer));
      reelFrame.addEventListener('mouseleave', restart);
    }
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) { clearInterval(timer); } else { restart(); }
    });
    restart();
  })();

  /* =========================================================
     NƠI NHẬN ĐƠN ĐẶT TIỆC
     Dán link Web App của Google Apps Script vào giữa hai dấu nháy bên dưới.
     Hướng dẫn lấy link: xem file google-apps-script-dat-tiec.gs
     Để trống thì form vẫn chạy được, nhưng quán KHÔNG nhận được đơn tự động.
     ========================================================= */
  const BOOKING_ENDPOINT = "https://script.google.com/macros/s/AKfycbz2Z-08MKKZHziCHg50CJkJ4uyBIjeajDnTkWxG0TG2fMh9EoHX-2jn7JMpMur6YlGr/exec";

  const form = document.getElementById('bookingForm');
  const submitBtn = form ? form.querySelector('.form-submit') : null;
  const hintEl = document.getElementById('bookingHint');

  if (form) form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get('fname');
    const phone = data.get('fphone');
    const date = data.get('fdate');
    const guests = data.get('fguests');
    const pkg = data.get('fpackage');
    const note = data.get('fnote');

    const dateLabel = date ? new Date(date).toLocaleString('vi-VN', { dateStyle: 'long', timeStyle: 'short' }) : 'chưa chọn';

    // Mã đơn để khách và quán cùng đối chiếu khi gọi lại
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const maDon = 'DGV-' + pad(now.getDate()) + pad(now.getMonth() + 1) + '-' +
                  String(phone || '').replace(/\D/g, '').slice(-4);

    document.getElementById('bookingCode').textContent = 'Mã đơn của bạn: ' + maDon;
    document.getElementById('bookingSummary').textContent =
      `${name} · ${phone}\nThời gian: ${dateLabel}\nSố khách: ${guests} — ${pkg}` + (note ? `\nGhi chú: ${note}` : '');

    const tinNhan = `Xin chào Đồng Gia Viên, tôi muốn đặt tiệc:\nMã đơn: ${maDon}\nHọ tên: ${name}\nSĐT: ${phone}\nThời gian: ${dateLabel}\nSố khách: ${guests}\nGói: ${pkg}${note ? '\nGhi chú: ' + note : ''}`;

    // Đếm đơn trong Google Analytics (chỉ chạy khi đã gắn mã GA)
    if (typeof gtag === 'function') {
      gtag('event', 'dat_tiec', { so_khach: guests, goi_tiec: pkg, ma_don: maDon });
    }

    // 1) Gửi đơn về Google Sheet của quán
    if (BOOKING_ENDPOINT) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Đang gửi...';
      fetch(BOOKING_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          maDon: maDon,
          name: name, phone: phone, date: dateLabel, dateRaw: date,
          guests: guests, pkg: pkg, note: note || '', trang: location.href
        })
      })
      .catch(() => {})
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Gửi cho quán — quán gọi lại trong 15 phút';
      });
    } else {
      console.warn('[Đồng Gia Viên] CHƯA dán link Google Apps Script vào BOOKING_ENDPOINT — đơn đặt tiệc KHÔNG chạy về quán.');
    }

    // 2) Copy sẵn nội dung để khách dán thẳng vào Zalo (link zalo.me không nhận tin soạn sẵn)
    document.getElementById('zaloLink').href = 'https://zalo.me/0931794488';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(tinNhan).then(() => {
        if (hintEl) hintEl.textContent = 'Đã copy sẵn nội dung đặt tiệc — bấm "Nhắn Zalo" rồi dán (Ctrl+V hoặc giữ để Dán) là gửi được ngay.';
      }).catch(() => {
        if (hintEl) hintEl.textContent = 'Quán sẽ gọi lại để xác nhận. Cần gấp thì bấm "Gọi ngay" giúp quán nhé.';
      });
    } else if (hintEl) {
      hintEl.textContent = 'Quán sẽ gọi lại để xác nhận. Cần gấp thì bấm "Gọi ngay" giúp quán nhé.';
    }

    document.getElementById('bookingResult').classList.add('show');
    document.getElementById('bookingResult').scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  /* ---- Đếm các cú bấm quan trọng (chỉ chạy khi đã gắn mã Google Analytics) ---- */
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a || typeof gtag !== 'function') return;
    const href = a.getAttribute('href') || '';
    let ten = '';
    if (href.startsWith('tel:')) ten = 'bam_goi_dien';
    else if (href.includes('zalo.me')) ten = 'bam_zalo';
    else if (href.includes('m.me') || href.includes('messenger')) ten = 'bam_messenger';
    else if (href.includes('facebook.com')) ten = 'bam_facebook';
    else if (href.includes('maps')) ten = 'bam_chi_duong';
    if (ten) gtag('event', ten, { vi_tri: a.dataset.track || a.className || 'khac' });
  }, { passive: true });

  /* ===== Danh dau muc dang mo tren thanh menu ===== */
  (function(){
    const chuan = (u) => (u || '').split('#')[0]
      .replace(/index\.html$/, '/')
      .replace(/\.html$/, '')
      .replace(/\/$/, '') || '/';
    const trang = chuan(location.pathname);
    document.querySelectorAll('#navLinks a').forEach(a => {
      if (chuan(a.getAttribute('href')) === trang) {
        a.classList.add('active');
        a.setAttribute('aria-current', 'page');
      }
    });
  })();

  /* ===== Xem thu ngay tren may: khi mo bang file:// thi doi link ve file .html ===== */
  (function(){
    if (location.protocol !== 'file:') return;
    const map = {
      '/': 'index.html', '/gioi-thieu': 'gioi-thieu.html', '/thuc-don': 'thuc-don.html',
      '/dat-tiec': 'dat-tiec.html', '/khu-tre-em': 'khu-tre-em.html', '/lien-he': 'lien-he.html'
    };
    document.querySelectorAll('a[href^="/"]').forEach(function(a){
      const h = a.getAttribute('href');
      const i = h.indexOf('#');
      const p = i < 0 ? h : h.slice(0, i);
      const hash = i < 0 ? '' : h.slice(i);
      if (map[p]) a.setAttribute('href', map[p] + hash);
    });
  })();
