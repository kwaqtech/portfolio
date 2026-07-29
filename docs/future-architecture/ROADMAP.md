# Lộ Trình Triển Khai (Roadmap)

Kế hoạch chuyển đổi kiến trúc từ AS-IS sang TO-BE được chia thành 4 Sprint chính. 
*Lưu ý: Không thực hiện ngay, đây là tài liệu hướng dẫn định hướng cho tương lai.*

## Sprint 1: Ổn định và UX Di động (Tuần 1)
**Mục tiêu**: Sửa chữa các điểm trừ cấp bách theo `Prompt.md` (Mobile responsiveness).
- **Công việc**:
  - Tăng cường khả năng responsive, sửa padding/margin mobile.
  - Tối ưu hiệu năng Animation (tắt bớt hiệu ứng trên Mobile hoặc dùng Reduced Motion).
  - Khắc phục các vấn đề liên quan đến Image (chuyển sang Next Image).

## Sprint 2: Hệ Thống Thiết Kế (Tuần 2)
**Mục tiêu**: Xây dựng nền tảng thiết kế chuyên nghiệp, loại bỏ magic numbers.
- **Công việc**:
  - Định nghĩa Design Tokens (Spacing, Radius, Z-index).
  - Tái cấu trúc hệ thống Theme (Light/Dark mode) sử dụng CSS Variables.
  - Định nghĩa lại Typography Fluid Scale và Easing Functions cho Motion.

## Sprint 3: Chuẩn Hóa Logic và Data (Tuần 3)
**Mục tiêu**: Làm sạch codebase, chuẩn bị cho việc module hóa.
- **Công việc**:
  - Phân tách `lib/utils.ts` thành các Domain Utilities.
  - Tách React Hooks ra thư mục độc lập.
  - Xây dựng Data Service Layer (Repository Pattern) thay vì gọi thẳng vào tĩnh arrays.

## Sprint 4: Kiến trúc thư mục và Tính năng (Tuần 4)
**Mục tiêu**: Hoàn thành kiến trúc FSD (Feature-Sliced Design) rút gọn.
- **Công việc**:
  - Setup thư mục `src/` và di chuyển toàn bộ source code vào.
  - Tái cấu trúc thư mục theo hướng Feature-based.
  - Bổ sung SEO tags, Sitemap, và hoàn thiện Accessibility (A11y).

---
**Kết luận của Kiến trúc sư (Architect's Note):** 
Kiến trúc này giúp biến đổi một dự án "cá nhân/học tập" thành một ứng dụng "Production-Grade" tiêu chuẩn công nghiệp (Industry Standard). Nó đảm bảo tính ổn định, dễ đọc, và đặc biệt là khả năng mở rộng nếu chủ nhân portfolio muốn thêm tính năng CMS, đa ngôn ngữ (i18n), hay hệ thống Analytics trong tương lai.
