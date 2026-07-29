# Kiến Trúc Mục Tiêu (Target Architecture)

Tài liệu này định nghĩa kiến trúc tổng thể mới cho web Portfolio, tập trung vào tính mở rộng, bảo trì, hiệu suất cao và **đặc biệt tối ưu hóa cho mô hình Next.js App Router**.

## 1. Kiến trúc Co-location (Thay vì Feature-Sliced Design)

### Vì sao kiến trúc hiện tại chưa tối ưu
Kiến trúc hiện tại nhóm toàn bộ components vào chung thư mục `components/`, bất kể component đó dùng chung cho toàn web hay chỉ dùng cho một trang duy nhất (ví dụ trang Projects). Điều này làm thư mục `components` nhanh chóng bị phình to và khó quản lý. 

### Vấn đề đang tồn tại
- Developer khó biết component nào được dùng ở đâu.
- Xóa một trang (page) rất dễ để lại các component "rác" (dead code) vì chúng nằm tuốt ngoài `components/`.

### Kiến trúc đề xuất
Áp dụng **Next.js App Router Native Co-location**. 
Bỏ qua các mô hình quá nặng nề như Feature-Sliced Design (FSD). Thay vào đó, nếu một component, hook, hoặc hàm util chỉ phục vụ duy nhất cho một route, hãy đặt nó ngay bên cạnh `page.tsx` trong một thư mục ẩn (private folder) như `_components`, `_hooks`.
- Các components dùng chung toàn cục (Button, Card) vẫn nằm ở `src/components/ui/`.
- Component riêng của trang About nằm ở `src/app/about/_components/`.

### Lợi ích
- Phù hợp hoàn hảo với triết lý của Next.js App Router.
- Code co-location: Tính năng nào nằm trọn ở thư mục đó. Xóa thư mục route là xóa sạch code liên quan.
- Tránh over-engineering cho một dự án Portfolio.

### Mức độ rủi ro
**Thấp**. Chỉ là việc di chuyển các component hiện tại vào đúng thư mục route tương ứng và sửa lại đường dẫn import.

### Các file sẽ bị ảnh hưởng nếu sau này refactor
- `app/*`
- Các component không dùng chung trong `components/sections/`

### Thứ tự refactor được khuyến nghị
1. Xác định các component chỉ dùng cho 1 trang.
2. Tạo thư mục `_components` trong route đó và di chuyển chúng vào.

---

## 2. Component Architecture & UI Layer

### Vì sao kiến trúc hiện tại chưa tối ưu
Các component UI hiện tại đang bị trộn lẫn giữa logic trình diễn (presentation) và logic nghiệp vụ hoặc data.

### Vấn đề đang tồn tại
- Khó tái sử dụng UI component cho các context khác nhau.
- Khó quản lý style đồng nhất.

### Kiến trúc đề xuất
Áp dụng **Atomic Design** kết hợp với mô hình **shadcn/ui**.
- `components/ui/`: Chỉ chứa Dumb/Presentational components (Button, Card, Badge). Hoàn toàn không chứa logic nghiệp vụ, chỉ nhận props.
- `components/layout/`: Header, Footer, Sidebar, Layout Shell dùng chung.

### Lợi ích
- Tái sử dụng code tối đa.
- Dễ dàng maintain một Design System nhất quán.

### Mức độ rủi ro
**Thấp**. 

### Các file sẽ bị ảnh hưởng nếu sau này refactor
- `components/ui/DoubleBezelCard.tsx`
- `components/ui/CommandMenu.tsx`

### Thứ tự refactor được khuyến nghị
1. Chuẩn hóa `components/ui` trước, dọn dẹp các logic thừa.

---

## 3. Animation Layer

### Vì sao kiến trúc hiện tại chưa tối ưu
Framer Motion đang được sử dụng trực tiếp rải rác trong các file UI và Pages. Config animation lặp lại nhiều lần, và việc tạo wrapper components cho mọi hiệu ứng có thể gây cồng kềnh cây DOM.

### Vấn đề đang tồn tại
- Thiếu tính nhất quán trong các thông số chuyển động (duration, easing).
- Rất khó để thay đổi một hiệu ứng trên toàn trang.

### Kiến trúc đề xuất
Thay vì ép tạo wrapper components cho mọi thứ, hãy tạo **Animation Variants & Hooks Library** tại `lib/animations/`.
- Định nghĩa các hằng số: `TRANSITIONS.SPRING`, `TRANSITIONS.EASE_OUT`.
- Tạo các file variants: `fadeUpVariant`, `staggerContainerVariant`.
- Khi dùng, truyền variant vào `motion.div`.

### Lợi ích
- Giữ cây DOM phẳng và sạch.
- Đồng nhất thông số animation. Dễ thay đổi hàng loạt.

### Mức độ rủi ro
**Thấp**. 

### Các file sẽ bị ảnh hưởng nếu sau này refactor
- Tất cả các component đang dùng `framer-motion`.

### Thứ tự refactor được khuyến nghị
1. Tổng hợp các thông số animation vào file constants.
2. Refactor các component để sử dụng chung variants.

---

## 4. Data Layer

### Vì sao kiến trúc hiện tại chưa tối ưu
Dữ liệu hiện đang hardcode cứng trong thư mục `data/` dưới dạng TypeScript array. Áp dụng Repository Pattern cho dạng tĩnh này là "Overkill" (quá mức cần thiết).

### Vấn đề đang tồn tại
- Dữ liệu bị trộn lẫn vào codebase dạng JS/TS object, khó edit cho người không biết code.
- Việc hiển thị nội dung dài (như chi tiết project) dạng TS object rất khó format và quản lý.

### Kiến trúc đề xuất
Triển khai mô hình **MDX (Markdown + JSX)** hoặc CMS Headless nhẹ (như Contentlayer, Velite).
- Thay vì dùng `.ts`, nội dung dự án, bài viết, kinh nghiệm sẽ được viết bằng `.mdx` đặt trong thư mục `content/`.
- Các MDX file này có thể chứa cả React components trực tiếp.

### Lợi ích
- Dễ dàng chỉnh sửa, định dạng nội dung (bold, italic, images) bằng Markdown.
- Tách bạch hoàn toàn nội dung (Content) và mã nguồn (Code).

### Mức độ rủi ro
**Trung bình**. Yêu cầu setup thư viện parser cho MDX (như `next-mdx-remote` hoặc `velite`).

### Các file sẽ bị ảnh hưởng nếu sau này refactor
- `data/projects.ts` -> Chuyển thành các file `content/projects/*.mdx`
- `app/projects/[slug]/page.tsx` -> Sửa lại để parse dữ liệu từ MDX.

### Thứ tự refactor được khuyến nghị
1. Setup MDX parser.
2. Chuyển đổi data `.ts` sang `.mdx`.
