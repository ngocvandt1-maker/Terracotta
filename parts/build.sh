#!/bin/bash
set -e
OUT=".."
BASE="https://terracotta-virid.vercel.app"

mkhead(){ sed -e "s|__TITLE__|$1|g" -e "s|__DESC__|$2|g" -e "s|__OGTITLE__|$3|g" -e "s|__PATH__|$4|g" _head.tpl; }

crumbs(){ # $1 = ten trang, $2 = duong dan
cat <<EOF
  <div class="wrap crumbs">
    <a href="/">Trang chủ</a> › <span>$1</span>
  </div>
  <script type="application/ld+json">
  {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[
    {"@type":"ListItem","position":1,"name":"Trang chủ","item":"$BASE/"},
    {"@type":"ListItem","position":2,"name":"$1","item":"$BASE$2"}
  ]}
  </script>
EOF
}

# ---------- TRANG CHỦ ----------
{
  mkhead "Đồng Gia Viên Restaurant — Nhà hàng sân vườn và đặt tiệc tại Quy Nhơn" \
         "Nhà hàng sân vườn tại Quy Nhơn với tiểu cảnh hòn non bộ xanh mát, món gia đình đậm vị và nhận đặt tiệc sinh nhật, họp mặt, liên hoan, tân gia. Có khu nhà banh cho bé." \
         "Đồng Gia Viên — Nhà hàng sân vườn và đặt tiệc tại Quy Nhơn" "/"
  echo '<link rel="stylesheet" href="assets/style-home.css">'
  echo '<link rel="preload" as="image" href="images/hero-nha-hang-len-den.jpg" fetchpriority="high">'
  cat _redirect.html
  cat _ld-restaurant.html
  echo '</head>'; echo '<body>'; echo
  cat header.html; echo; echo '<main>'
  cat hero-home.html
  cat band-home-1.html
  cat khong-gian.html
  cat goi-tiec-home.html
  cat hub.html
  cat band-home-2.html
  cat cta-band.html
  echo '</main>'; echo
  cat footer.html; echo
  cat float.html; echo
  cat _tail.tpl
} > "$OUT/index.html"

# ---------- GIỚI THIỆU ----------
{
  mkhead "Giới thiệu Đồng Gia Viên — Không gian sân vườn cho cả gia đình" \
         "Đồng Gia Viên là nhà hàng sân vườn giữa tiểu cảnh hòn non bộ xanh mát tại Quy Nhơn, phục vụ món gia đình đậm vị quê nhà, có khu nhà banh cho trẻ em và nhận đặt tiệc trọn gói." \
         "Giới thiệu Đồng Gia Viên — Nhà hàng sân vườn Quy Nhơn" "/gioi-thieu"
  echo '</head>'; echo '<body>'; echo
  cat header.html; echo; echo '<main>'
  crumbs "Giới thiệu" "/gioi-thieu"
  cat gioi-thieu.html
  cat div-to-bg.html
  cat khoanh-khac.html
  cat div-to-surface.html
  cat bai-do-xe.html
  echo '</main>'; echo
  cat footer.html; echo
  cat float.html; echo
  cat _tail.tpl
} > "$OUT/thuc-don.tmp"; mv "$OUT/thuc-don.tmp" "$OUT/gioi-thieu.html"

# ---------- THỰC ĐƠN ----------
{
  mkhead "Thực đơn Đồng Gia Viên — Món chính, set tiệc và đồ uống" \
         "Thực đơn Đồng Gia Viên Quy Nhơn: rau củ, gỏi khai vị, món chính, hải sản, lẩu và đồ uống với giá niêm yết. Set tiệc trọn gói tính theo đầu khách từ 135.000đ." \
         "Thực đơn Đồng Gia Viên — Món ngon mỗi ngày" "/thuc-don"
  echo '</head>'; echo '<body>'; echo
  cat header.html; echo; echo '<main>'
  crumbs "Thực đơn" "/thuc-don"
  cat menu.html
  echo '</main>'; echo
  cat footer.html; echo
  cat float.html; echo
  cat _tail.tpl
} > "$OUT/thuc-don.html"

# ---------- ĐẶT TIỆC ----------
{
  mkhead "Đặt tiệc tại Đồng Gia Viên — 16 mức set từ 135.000đ đến 400.000đ mỗi khách" \
         "Đặt tiệc sinh nhật, họp mặt, liên hoan, tân gia tại Quy Nhơn. 16 mức set thực đơn từ 135.000đ đến 400.000đ mỗi khách, nhận tiệc từ 10 đến khoảng 200 khách." \
         "Đặt tiệc Đồng Gia Viên — Gói tiệc cho mọi dịp sum vầy" "/dat-tiec"
  echo '</head>'; echo '<body>'; echo
  cat header.html; echo; echo '<main>'
  crumbs "Đặt tiệc" "/dat-tiec"
  cat dat-tiec.html
  echo '</main>'; echo
  cat footer.html; echo
  cat float.html; echo
  cat _tail.tpl
} > "$OUT/dat-tiec.html"

# ---------- KHU TRẺ EM ----------
{
  mkhead "Khu trẻ em Đồng Gia Viên — Nhà banh ngay trong khuôn viên quán" \
         "Đồng Gia Viên có khu nhà banh cho trẻ em ngay trong khuôn viên sân vườn tại Quy Nhơn. Bé có chỗ chơi, ba mẹ ăn trọn bữa. Nhận đặt tiệc sinh nhật cho bé." \
         "Khu trẻ em Đồng Gia Viên — Bé chơi trọn buổi" "/khu-tre-em"
  echo '</head>'; echo '<body>'; echo
  cat header.html; echo; echo '<main>'
  crumbs "Khu trẻ em" "/khu-tre-em"
  cat khu-tre-em.html
  echo '</main>'; echo
  cat footer.html; echo
  cat float.html; echo
  cat _tail.tpl
} > "$OUT/khu-tre-em.html"

# ---------- PHÒNG VIP ----------
{
  mkhead "Phòng VIP và sảnh tiệc Đồng Gia Viên — Có karaoke, sảnh đến 200 khách" \
         "Phòng VIP có karaoke tại Đồng Gia Viên Quy Nhơn: miễn phí cho nhóm trên 15 khách, 300.000đ mỗi giờ cho nhóm dưới 10 khách. Sảnh lớn phục vụ đến khoảng 200 khách, sảnh vừa cho 25 đến 50 khách." \
         "Phòng VIP và sảnh tiệc Đồng Gia Viên — Có karaoke" "/phong-vip"
  echo '</head>'; echo '<body>'; echo
  cat header.html; echo; echo '<main>'
  crumbs "Phòng VIP" "/phong-vip"
  cat phong-vip.html
  echo '</main>'; echo
  cat footer.html; echo
  cat float.html; echo
  cat _tail.tpl
} > "$OUT/phong-vip.html"

# ---------- LIÊN HỆ ----------
{
  mkhead "Liên hệ Đồng Gia Viên — Địa chỉ, giờ mở cửa và câu hỏi thường gặp" \
         "Đồng Gia Viên: Số 1 Trần Văn Dũng (qua cầu 2 Hà Thanh), P. Quy Nhơn, Tỉnh Gia Lai. Mở cửa 10:00 đến 22:00 mỗi ngày. Hotline 0931.7944.88 và 0935.199.557." \
         "Liên hệ Đồng Gia Viên — Ghé thăm quán" "/lien-he"
  cat _ld-faq.html
  echo '</head>'; echo '<body>'; echo
  cat header.html; echo; echo '<main>'
  crumbs "Liên hệ" "/lien-he"
  cat lien-he.html
  cat cau-hoi.html
  echo '</main>'; echo
  cat footer.html; echo
  cat float.html; echo
  cat _tail.tpl
} > "$OUT/lien-he.html"

echo "BUILD XONG"
