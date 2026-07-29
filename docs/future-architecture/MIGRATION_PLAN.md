# Kế Hoạch Tối Ưu Mở Rộng (Migration Plan & Strategies)

Tài liệu này đề xuất các chiến lược tối ưu quan trọng ngoài cấu trúc thư mục, tập trung vào UX, SEO và Hiệu năng.

## 1. Responsive Strategy

### Vì sao kiến trúc hiện tại chưa tối ưu
Dựa trên `Prompt.md`, hiện tại UI trên mobile bị lỗi padding, chữ quá nhỏ/to và bố cục chen chúc. Điều này đến từ việc code dựa theo Mobile-Last hoặc lạm dụng pixel cố định.

### Vấn đề đang tồn tại
- Trải nghiệm người dùng di động kém, dễ vuốt trượt sai (Touch targets nhỏ).
- Animation gây chậm máy (lag) trên thiết bị di động cũ.

### Kiến trúc đề xuất
Thiết lập nguyên tắc **Mobile-First Responsive Design**:
- Viết class gốc cho Mobile trước, sau đó mới thêm tiền tố `md:`, `lg:` cho Desktop.
- Tăng Touch Targets (nhỏ nhất 44x44px cho các button, link).
- Xây dựng một Mobile Header chuyên dụng (Hamburger menu) ẩn thanh điều hướng dài.

### Lợi ích
- Mobile-friendly 100%, chuẩn điểm SEO Google Mobile-first indexing.

### Mức độ rủi ro
**Thấp**. Cải thiện dần từng component.

---

## 2. Accessibility (a11y) Strategy

### Vì sao kiến trúc hiện tại chưa tối ưu
Portfolio thường chú trọng cái đẹp bằng animation mà bỏ quên người dùng khuyết tật hoặc người dùng phím.

### Vấn đề đang tồn tại
- Các hiệu ứng 3D/Framer Motion cản trở trình đọc màn hình (Screen readers).
- Nút bấm và Menu không thể navigate bằng phím `Tab`.
- Tương phản màu sắc (Contrast ratio) có thể rớt ở Dark mode.

### Kiến trúc đề xuất
Tích hợp **Radix UI** hoặc **React Aria** cho các core components (Command Menu, Modal, Sidebar) thay vì tự viết logic từ đầu.
- Bổ sung `aria-label`, `role` cho các icon button.
- Hỗ trợ đầy đủ Keyboard Navigation.

### Lợi ích
- Đạt chuẩn WCAG, tăng trưởng độ phủ người dùng và SEO.
- Thể hiện sự chuyên nghiệp của Senior Engineer (Accessibility là tiêu chuẩn Vàng).

### Mức độ rủi ro
**Trung bình**. Cần kiểm tra lại toàn bộ UI controls.

---

## 3. SEO Structure

### Vì sao kiến trúc hiện tại chưa tối ưu
Next.js App Router rất mạnh, nhưng nếu không tận dụng hàm `generateMetadata` và sitemaps, web sẽ "tàng hình" trên Google.

### Vấn đề đang tồn tại
- Có thể đang thiếu thẻ meta Open Graph (Facebook, Twitter cards) cho từng Project cụ thể.
- URL thân thiện (Canonical URLs) chưa được khai báo rõ ràng.

### Kiến trúc đề xuất
Triển khai **Dynamic SEO Architecture**:
- Viết helper function `constructMetadata()` tại `lib/utils/seo.ts`.
- Tự động sinh `sitemap.xml` và `robots.txt` bằng tính năng của Next.js.
- Semantic HTML tags: Phải dùng `<article>`, `<section>`, `<nav>`, `<main>` thay cho các thẻ `<div>` lồng nhau.

### Lợi ích
- Xuất hiện trên trang 1 Google cho từ khóa tên Developer.
- Chia sẻ link dự án trông đẹp mắt, chuyên nghiệp.

### Mức độ rủi ro
**Thấp**. Chỉ là bổ sung Meta tags.

---

## 4. Image Optimization Strategy

### Vì sao kiến trúc hiện tại chưa tối ưu
Có thể dự án đang dùng trực tiếp thẻ `<img>` thay vì `<Image>` của Next.js hoặc chưa cấu hình optimize ảnh SVG/WebP.

### Vấn đề đang tồn tại
- Tiêu tốn băng thông, làm chậm FCP (First Contentful Paint).
- Lỗi CLS (Cumulative Layout Shift) do không định nghĩa width/height cụ thể cho ảnh.

### Kiến trúc đề xuất
- Bắt buộc dùng `next/image` cho mọi tài nguyên raster (png, jpg).
- Với dự án portfolio, setup `sizes` attribute để load ảnh phù hợp với thiết bị (`(max-width: 768px) 100vw, 50vw`).
- Dùng SVG sprites hoặc component hóa SVG để nén icon thay vì load quá nhiều HTTP requests.

### Lợi ích
- Website đạt 100 điểm Lighthouse (Performance).
- Giao diện không bị giật/nhảy nội dung khi đang load.

### Mức độ rủi ro
**Trung bình**. Sẽ phải refactor lại toàn bộ các thẻ hiển thị hình ảnh.
