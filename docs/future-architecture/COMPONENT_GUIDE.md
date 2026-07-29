# Hướng Dẫn Kiến Trúc Component (Component Guide)

## 1. Hook Organization

### Vì sao kiến trúc hiện tại chưa tối ưu
Các custom hooks (nếu có) hoặc logic React hooks đang được nhúng trực tiếp vào trong UI components, khiến files phình to.

### Vấn đề đang tồn tại
- Khó chia sẻ logic (như tracking scroll, managing theme, device detection) giữa các components.
- Khó unit test các logic này độc lập với UI.

### Kiến trúc đề xuất
Tạo thư mục `hooks/` hoặc `lib/hooks/` chuyên biệt. Chia thành:
- **UI Hooks**: `useScrollSpy`, `useMediaQuery`, `useTheme`
- **Data/Logic Hooks**: `useProjects`, `useForm`

### Lợi ích
- Giữ cho UI component nhẹ (thin components).
- Dễ dàng kiểm thử, tái sử dụng trên toàn dự án.

### Mức độ rủi ro
**Thấp**. Chỉ là tách logic.

### Các file sẽ bị ảnh hưởng nếu sau này refactor
- `app/projects/[slug]/client.tsx`
- Bất kỳ file nào có từ 2+ `useEffect` hoặc `useState` phức tạp.

### Thứ tự refactor được khuyến nghị
1. Tách các hook phổ biến (như hooks về window size, theme).
2. Tách hook nghiệp vụ liên quan đến projects.

---

## 2. Utility Organization

### Vì sao kiến trúc hiện tại chưa tối ưu
Mọi logic tiện ích đang bị nhồi nhét vào một file duy nhất `lib/utils.ts`.

### Vấn đề đang tồn tại
- File tiện ích phình to, trở thành "thùng rác" cho mọi function nhỏ.
- Mất khả năng theo dõi mục đích của từng hàm (Date format, String manipulation, Styling).

### Kiến trúc đề xuất
Tách `lib/utils.ts` thành các file chuyên biệt theo Domain:
- `lib/utils/formatters.ts` (Date, Number)
- `lib/utils/styles.ts` (Hàm `cn`, merge tailwind)
- `lib/utils/validators.ts`

### Lợi ích
- Kiến trúc module hóa, dễ dàng tìm kiếm hàm cần thiết.
- Tối ưu hóa tree-shaking khi build.

### Mức độ rủi ro
**Trung bình**. Phải update đường dẫn import ở rất nhiều file.

### Các file sẽ bị ảnh hưởng nếu sau này refactor
- `lib/utils.ts`
- Tất cả các file đang import từ `lib/utils.ts`

### Thứ tự refactor được khuyến nghị
1. Viết các file utils nhỏ.
2. Dùng Regex/IDE Refactor để trỏ lại import trên toàn hệ thống.

---

## 3. Constants Organization

### Vì sao kiến trúc hiện tại chưa tối ưu
Các giá trị hằng số (URLs, Site Meta, Pagination limit, Route names) đang bị hardcode rải rác.

### Vấn đề đang tồn tại
- Rất dễ sót khi cần thay đổi một URL nội bộ hoặc thông tin metadata.
- Tốn thời gian tìm kiếm nơi định nghĩa.

### Kiến trúc đề xuất
Tạo một thư mục hoặc file duy nhất `lib/constants/index.ts`. Gom nhóm theo:
- `SITE_CONFIG`: Tiêu đề, mô tả, links MXH.
- `ROUTES`: Đối tượng chứa đường dẫn hằng số (`ROUTES.PROJECTS`, `ROUTES.HOME`).

### Lợi ích
- Thay đổi một lần, cập nhật toàn bộ.
- Tránh typos (lỗi gõ phím) trong các chuỗi định tuyến.

### Mức độ rủi ro
**Thấp**. 

### Các file sẽ bị ảnh hưởng nếu sau này refactor
- `app/layout.tsx` (Metadata)
- Các file chứa thẻ `<Link href="...">`

### Thứ tự refactor được khuyến nghị
1. Khởi tạo `constants`.
2. Thay thế từ từ trong các components layout và pages.

---

## 4. Lazy Loading Strategy

### Vì sao kiến trúc hiện tại chưa tối ưu
Tất cả các components (bao gồm cả các components nặng như Animation canvas, Modal, hoặc thư viện bên thứ 3) được bundle chung ở initial load.

### Vấn đề đang tồn tại
- Kích thước JS bundle lớn.
- Thời gian tải trang ban đầu (TBT, TTI) bị ảnh hưởng, làm giảm điểm số Lighthouse/Web Vitals.

### Kiến trúc đề xuất
Sử dụng **Code Splitting & Lazy Loading** của Next.js (`next/dynamic` hoặc React `lazy`).
- Tách các component không nhìn thấy ở viewport đầu tiên (ví dụ: Footer, Modal, các hiệu ứng 3D/Canvas nặng).
- Chỉ load chúng khi người dùng cuộn tới.

### Lợi ích
- Cải thiện đáng kể hiệu năng và điểm số SEO (Core Web Vitals).

### Mức độ rủi ro
**Trung bình**. Có thể sinh ra lỗi Hydration mismatch hoặc Content Shift nếu không có placeholder (fallback UI) phù hợp.

### Các file sẽ bị ảnh hưởng nếu sau này refactor
- `app/page.tsx`
- Các file chứa components nặng.

### Thứ tự refactor được khuyến nghị
1. Chạy Lighthouse Audit.
2. Lazy load components không thuộc First Paint.
