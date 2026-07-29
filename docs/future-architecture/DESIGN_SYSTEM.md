# Hệ Thống Thiết Kế (Design System)

## 1. Theme System

### Vì sao kiến trúc hiện tại chưa tối ưu
Theme system (Light/Dark mode) hiện tại có thể đang dựa nhiều vào các class Tailwind lặp lại như `bg-white dark:bg-black text-black dark:text-white` rải rác khắp nơi.

### Vấn đề đang tồn tại
- Rất khó để thêm một theme thứ 3 (ví dụ: Sepia, hoặc System default chuẩn).
- Dễ xảy ra sai sót khi quên thêm tiền tố `dark:` ở một số component.

### Kiến trúc đề xuất
Sử dụng **CSS Variables** kết hợp với Tailwind CSS cho Theme System. Định nghĩa các biến ở `:root` (light) và `[data-theme="dark"]` trong `app/globals.css`. Tailwind config sẽ tham chiếu đến các biến này thay vì mã màu tĩnh.

### Lợi ích
- Dễ dàng thay đổi palette màu toàn hệ thống chỉ với một file CSS.
- Giảm dung lượng HTML do không cần lặp lại `dark:` classes quá nhiều, chỉ cần dùng classes ngữ nghĩa (ví dụ: `bg-background text-foreground`).

### Mức độ rủi ro
**Cao**. Yêu cầu thay thế class màu sắc trên toàn bộ codebase.

### Các file sẽ bị ảnh hưởng nếu sau này refactor
- `app/globals.css`
- `tailwind.config.ts` (hoặc cấu hình tương đương v4)
- Toàn bộ các file `.tsx` đang dùng màu sắc cứng.

### Thứ tự refactor được khuyến nghị
1. Định nghĩa CSS Variables.
2. Cập nhật Tailwind theme.
3. Thay thế dần class ở các component nhỏ (từ dưới lên trên).

---

## 2. Design Token System

### Vì sao kiến trúc hiện tại chưa tối ưu
Không có một nguồn chân lý (Single Source of Truth) cho các giá trị thiết kế (spacing, radius, shadow, z-index).

### Vấn đề đang tồn tại
- Xuất hiện "Magic numbers" trong code như `p-4`, `z-[50]`, `rounded-xl` nhưng không nhất quán.
- Giao diện thiếu sự liền mạch, chuyên nghiệp (premium feel).

### Kiến trúc đề xuất
Xây dựng **Design Token System** lưu trữ trong file config hoặc CSS biến. Định nghĩa rõ ràng semantic tokens:
- `spacing.sm`, `spacing.md`, `spacing.lg`
- `radius.card`, `radius.button`
- `z-index.dropdown`, `z-index.modal`

### Lợi ích
- Tạo ra giao diện nhất quán tuyệt đối.
- Dễ dàng đồng bộ thiết kế với Figma.

### Mức độ rủi ro
**Trung bình**.

### Các file sẽ bị ảnh hưởng nếu sau này refactor
- Toàn bộ các file thiết kế UI (`components/ui/*`).

### Thứ tự refactor được khuyến nghị
1. Cập nhật file thiết lập Tailwind/CSS gốc.

---

## 3. Typography System

### Vì sao kiến trúc hiện tại chưa tối ưu
Việc sử dụng size chữ và line-height đang được thiết lập thủ công, rải rác.

### Vấn đề đang tồn tại
- Font scale trên Mobile và Desktop không được đồng bộ (thiết kế responsive font size).
- Text bị dính hoặc quá thưa ở một số kích thước màn hình.

### Kiến trúc đề xuất
Áp dụng **Fluid Typography** hoặc Semantic Typography scale (ví dụ: `.text-h1`, `.text-body`, `.text-caption`). Không sử dụng trực tiếp các class text-size tiện ích trên các element văn bản dài. Sử dụng plugin Tailwind Typography cho nội dung Markdown.

### Lợi ích
- Đảm bảo tỷ lệ vàng trong hiển thị font chữ.
- Cải thiện đáng kể trải nghiệm đọc trên thiết bị di động.

### Mức độ rủi ro
**Trung bình**.

### Các file sẽ bị ảnh hưởng nếu sau này refactor
- Các thẻ `h1, h2, p` trên tất cả các pages.
- `app/globals.css`

### Thứ tự refactor được khuyến nghị
1. Định nghĩa Typography scale.
2. Áp dụng cho headings trước, văn bản body sau.

---

## 4. Motion Architecture

### Vì sao kiến trúc hiện tại chưa tối ưu
Các hiệu ứng hiện tại thiếu đi triết lý hệ thống. Chuyển động thiếu sự phân cấp (micro-interaction vs macro-layout).

### Vấn đề đang tồn tại
- Tốc độ animation không đồng nhất (đôi lúc quá nhanh hoặc quá chậm).
- Thiếu tôn trọng cài đặt hệ thống `prefers-reduced-motion` của người dùng.

### Kiến trúc đề xuất
Xây dựng **Motion Tokens**. Chuẩn hóa Easing curves (vd: `ease-out`, `spring`) và Durations (`fast`, `normal`, `slow`). 
Thiết lập global config để tắt hoàn toàn animation nếu người dùng chọn giảm chuyển động.

### Lợi ích
- Tăng cường UX mượt mà, chuyên nghiệp chuẩn cao cấp.
- Đảm bảo Accessibility.

### Mức độ rủi ro
**Thấp**.

### Các file sẽ bị ảnh hưởng nếu sau này refactor
- `lib/animations/` (sẽ được tạo mới)
- Nơi gọi `framer-motion`.

### Thứ tự refactor được khuyến nghị
1. Áp dụng prefers-reduced-motion.
2. Chuẩn hóa easing.
