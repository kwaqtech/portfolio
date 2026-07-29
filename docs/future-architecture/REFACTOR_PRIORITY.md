# Thứ Tự Ưu Tiên Refactor (Refactor Priority)

Dưới đây là ma trận độ ưu tiên để áp dụng Kiến Trúc Mục Tiêu mà không làm gián đoạn hệ thống.

## Giai đoạn 1: Low-Hanging Fruits (Rủi ro thấp, Tác động cao)
Những tác vụ này mang lại giá trị lớn về UX và Performance nhưng không yêu cầu đập bỏ kiến trúc.

1. **Implement Mobile-First Responsive (Chiến lược 14)**
   - Sửa UI padding, typography trên thiết bị di động.
   - Files bị ảnh hưởng: `app/globals.css`, `components/ui/`, `app/page.tsx`
2. **Optimize Image & Lazy Loading (Chiến lược 18, 19)**
   - Áp dụng `next/image`, `next/dynamic` cho các thành phần nặng.
   - Files bị ảnh hưởng: Tất cả các file gọi hình ảnh, thẻ img, hoặc các sections phía dưới của `app/page.tsx`.
3. **Constants Extraction (Chiến lược 10)**
   - Đưa các hardcode strings ra `lib/constants`.

## Giai đoạn 2: Structural Foundation (Rủi ro trung bình, Chuẩn bị nền tảng)
Dọn dẹp code để chuẩn bị cho kiến trúc quy mô lớn hơn.

1. **Design Token & Theme System (Chiến lược 11, 12, 13, 15)**
   - Setup CSS Variables, config lại Tailwind theme, xây dựng Typography và Motion tokens.
   - Files bị ảnh hưởng: `tailwind.config.ts`, `app/globals.css`.
2. **Split Utilities & Hooks (Chiến lược 8, 9)**
   - Chẻ nhỏ `lib/utils.ts` và tách các UI hooks ra thư mục riêng.
3. **Data Abstraction (Chiến lược 6)**
   - Viết Repository Pattern cho việc gọi `data/projects.ts`.

## Giai đoạn 3: Core Architecture (Rủi ro cao, Tái cấu trúc)
Biến đổi sâu vào kiến trúc thư mục.

1. **Di chuyển sang thư mục `src/` (Chiến lược 1, 20)**
   - Gom mọi thứ vào `src/`, config alias.
2. **Feature-based & Component Architecture (Chiến lược 2, 3, 4)**
   - Tách UI vs Smart Components. Gom nhóm tính năng dự án (Projects, About) vào các Folder Modules độc lập.

## Giai đoạn 4: Polish & Advanced (Đánh bóng)
1. **SEO & Accessibility (Chiến lược 16, 17)**
   - Gắn sitemap, metadata, Aria-roles, Keyboard Navigation.
