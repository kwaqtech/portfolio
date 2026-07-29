# Kiến Trúc Thư Mục Mới (Folder Structure)

## 1. Kiến trúc thư mục mới tối ưu cho Next.js App Router

### Vì sao kiến trúc hiện tại chưa tối ưu
Kiến trúc cũ phân tán các thành phần cấu hình và thư mục code lộn xộn ở root. Ngoài ra, việc tách biệt một thư mục `features/` riêng rẽ (như đề xuất FSD trước đó) là **quá cồng kềnh** và đi ngược lại sức mạnh Co-location của Next.js App Router đối với một dự án cỡ trung bình như Portfolio.

### Vấn đề đang tồn tại
- Developer tốn công nhảy giữa `app/` và thư mục tính năng bên ngoài để sửa đổi một trang.
- Root directory thiếu sự chuyên nghiệp và gọn gàng.

### Kiến trúc đề xuất
Sử dụng thư mục `src/` để gom nhóm toàn bộ mã nguồn. Khai thác triệt để tính năng **Private Folders (`_folderName`)** của Next.js để co-locate (nhóm) các tài nguyên cục bộ ngay tại Route của nó.

```
my-portfolio/
├── .github/
├── content/                # (Tùy chọn) Chứa nội dung MDX (Projects, About)
├── public/                 # Tĩnh (images, icons)
├── src/
│   ├── app/                # Next.js Routing
│   │   ├── (routes)/       # Gom nhóm các route nếu cần
│   │   │   ├── projects/
│   │   │   │   ├── _components/    # UI component Bắt buộc chỉ dùng riêng cho trang projects
│   │   │   │   ├── _hooks/         # Hook chỉ dùng cho projects
│   │   │   │   ├── [slug]/page.tsx
│   │   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx        # Homepage
│   │   └── globals.css
│   ├── components/         # Components dùng chung TOÀN CỤC
│   │   ├── ui/             # Core atomic UI (Button, Card, Input)
│   │   └── layout/         # Shell, Sidebar, Navbar
│   ├── lib/                # Utils, configs, constants, animations
│   │   ├── animations/     # Animation variants, hooks
│   │   ├── constants/      # Site config, routes
│   │   └── utils/          # CN, formatters
│   ├── hooks/              # Global hooks (useTheme, useMediaQuery)
│   └── types/              # Global TypeScript interfaces
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

### Lợi ích
- **Gọn nhẹ & Native**: Tận dụng tối đa nguyên lý thiết kế của Next.js. Không chống lại Framework.
- Mọi code chạy ứng dụng nằm gọn trong `src/`, các công cụ build nằm ngoài.
- Ranh giới trách nhiệm cực kỳ rõ ràng: Cái gì dùng chung (Global) thì để ngoài `src/components`, cái gì dùng riêng (Local) thì nhét vào `_components` cạnh Route.

### Mức độ rủi ro
**Trung bình**. Cần thiết lập alias `@/` trỏ vào `src/` và cấu hình Next.js.

### Các file sẽ bị ảnh hưởng nếu sau này refactor
- **Toàn bộ dự án**.
- `tsconfig.json`, `next.config.ts`

### Thứ tự refactor được khuyến nghị
1. Bật tính năng `srcDir` trong cấu hình Next.js.
2. Di chuyển các thư mục toàn cục (`components`, `lib`, `hooks`) vào `src/`.
3. Tạo các thư mục `_components` trong `app/` và đẩy các UI đặc thù từ `components/sections/` cũ vào.

---

## 2. Asset Organization

### Vì sao kiến trúc hiện tại chưa tối ưu
Tất cả hình ảnh, icon (SVG) nằm hỗn độn ở root của thư mục `public/`.

### Vấn đề đang tồn tại
- Rất khó để quản lý, tìm kiếm hoặc xóa các ảnh không còn sử dụng.
- Dễ trùng lặp tên file.

### Kiến trúc đề xuất
Tổ chức lại thư mục `public/` theo module/loại hình ảnh:
```
public/
├── images/
│   ├── projects/
│   └── heroes/
├── icons/          # Chỉ chứa custom SVG icons
└── fonts/          # Font files nội bộ (nếu không dùng next/font)
```

### Lợi ích
- Ngăn nắp, quản lý tài nguyên rõ ràng.
- Tự động hóa quá trình tối ưu ảnh dễ dàng hơn (vd script nén toàn bộ thư mục `images/`).

### Mức độ rủi ro
**Thấp**. Chỉ tốn công cập nhật src link.

### Các file sẽ bị ảnh hưởng nếu sau này refactor
- Các components đang import SVG hoặc dùng `<Image src="/...">`.

### Thứ tự refactor được khuyến nghị
1. Tạo folder mới trong `public`.
2. Sửa path ở codebase.

---

## 3. Folder Migration Plan

Kế hoạch di chuyển sẽ được triển khai theo chiến lược **Bóp nghẹt (Strangler Fig)**:
Không đập đi xây lại toàn bộ, mà di chuyển từng phần một:
1. Tạo thư mục `src/` rỗng và thiết lập alias.
2. Di chuyển các module độc lập nhất trước (`lib/`, `hooks/`).
3. Di chuyển `components/ui` và `components/layout`.
4. Di chuyển thư mục `app/` (Routing) vào `src/`.
5. Bắt đầu quá trình "Co-location": Nhặt các component đang bị đặt sai chỗ ở `components/sections` và ném vào các thư mục `_components` bên cạnh các page tương ứng.

Cách này giảm thiểu xung đột Git (Merge conflicts) và đảm bảo app vẫn chạy sau mỗi commit.
