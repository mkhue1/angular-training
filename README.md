# AngularTraining

Project tạo bởi [Angular CLI](https://github.com/angular/angular-cli) phiên bản 21.0.4.

## Cách khởi tạo server

Để chạy local server

```bash
ng serve
```

Khi server đang chạy, mở trình duyệt và chuyển sang `http://localhost:4200/`. Ứng dụng sẽ tự động thay đổi khi that đổi source files.

## Khung code

Angular CLI cung cấp khung code. Để tạo component mới, chạy:

```bash
ng generate component component-name
```

Cách chạy các danh sách hoàn thiện (như là `components`, `directives`, hoặc `pipes`):

```bash
ng generate --help
```

## Xây dựng

Để xây dựng project:

```bash
ng build
```

Dùng sẽ compile project và lưu lại build artifacts trong `dist/`. Mặc định, the production build tối ưu hoá tốc độ và hoạt động app.

## Chạy unit test

Để chạy unittest [Vitest](https://vitest.dev/):

```bash
ng test
```

## Chạy end-to-end tests

Để chạy end-to-end (e2e) test:

```bash
ng e2e
```

Angular CLI không đi kèm với e2e test. Cần phải chọn test phù hợp.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
