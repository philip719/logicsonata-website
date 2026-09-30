import type { ServicesDict } from '../en/services';

export const services: ServicesDict = {
  meta: {
    title: 'Dịch vụ AI riêng tư, đào tạo và hỗ trợ vận hành',
    description:
      'Đánh giá mức độ sẵn sàng AI, triển khai thí điểm, xây dựng kho tri thức, quản trị AI, đào tạo nhân sự và hỗ trợ vận hành AI riêng tư tại Đông Nam Á.',
  },
  breadcrumb: 'Dịch vụ',
  catalogName: 'Các gói hỗ trợ vận hành AI riêng tư',
  offerName: 'Gói hỗ trợ {name}',
  hero: {
    eyebrow: 'Dịch vụ',
    title: 'Phần cứng và phần mềm mới chỉ là *một nửa chặng đường.*',
    lead: 'Phần lớn doanh nghiệp không biết cách chọn mô hình, chuẩn hóa tài liệu, đào tạo nhân sự hay quản trị việc sử dụng AI. Đó chính là việc chúng tôi làm, từ buổi đánh giá đầu tiên đến hỗ trợ vận hành dài hạn.',
    cta: 'Bắt đầu với buổi đánh giá',
  },
  deliver: {
    eyebrow: 'Những gì chúng tôi cung cấp',
    title: 'Sáu dịch vụ. Một đối tác chịu trách nhiệm.',
    items: [
      {
        name: 'Đánh giá Quyền riêng tư và Mức độ Sẵn sàng AI',
        detail: 'Xác định rủi ro AI, tìm ra các tình huống ứng dụng riêng tư phù hợp nhất và nhận lộ trình 30/60/90 ngày. Bước khởi đầu dễ dàng nhất.',
        icon: 'search',
      },
      {
        name: 'Triển khai thí điểm AI riêng tư',
        detail: 'Một tình huống ứng dụng hoạt động thực tế, được triển khai và kiểm chứng với người dùng thật, trước khi bạn cam kết triển khai toàn diện.',
        icon: 'flask',
      },
      {
        name: 'Chuẩn bị dữ liệu và kho tri thức',
        detail: 'Tệp tin lộn xộn trở thành kho tri thức riêng tư gọn gàng, có phân quyền và đã được kiểm thử. Đây là khâu khiến phần lớn dự án AI thất bại, nhưng không phải với chúng tôi.',
        icon: 'database',
      },
      {
        name: 'Quản trị và chính sách AI',
        detail: 'Chính sách sử dụng, danh sách công cụ được phê duyệt và quy tắc truy cập theo vai trò, để đội ngũ dùng AI an toàn ngay từ ngày đầu.',
        icon: 'policy',
      },
      {
        name: 'Đào tạo và ứng dụng AI',
        detail: 'Hội thảo thực hành theo vai trò cho quản lý, nhân sự, kinh doanh, vận hành và tài chính. Phần cứng không tự tạo ra sự ứng dụng. Đào tạo mới làm được điều đó.',
        icon: 'users',
      },
      {
        name: 'Hỗ trợ vận hành AI riêng tư',
        detail: 'Giám sát, cập nhật mô hình, làm mới kho tri thức và đánh giá hằng quý, giúp mọi hệ thống luôn vận hành ổn định.',
        icon: 'support',
      },
    ],
  },
  support: {
    eyebrow: 'Hỗ trợ vận hành',
    title: 'Độ tin cậy lâu dài, không phải hỗ trợ kỹ thuật một lần.',
    lead: 'Mỗi hệ thống sau triển khai được gia hạn vào một trong bốn gói hỗ trợ vận hành, tương xứng với số người dùng và mức độ quan trọng của hệ thống.',
    badge: 'PHỔ BIẾN NHẤT',
    response: 'Thời gian phản hồi',
    tiers: [
      { name: 'Basic', users: '10 đến 30 người dùng', response: 'Ngày làm việc tiếp theo', detail: 'Kiểm tra định kỳ hằng tháng, tinh chỉnh câu lệnh nhỏ và làm mới kho tri thức.', featured: false },
      { name: 'Business', users: '30 đến 150 người dùng', response: 'Trong cùng ngày làm việc', detail: 'Hỗ trợ ưu tiên, kiểm tra hằng tuần và đánh giá kinh doanh hằng quý.', featured: false },
      { name: 'Enterprise', users: 'Trên 150 người dùng', response: '4 đến 8 giờ cho sự cố khẩn cấp', detail: 'Quản lý hỗ trợ chuyên trách, điều phối bản vá bảo mật và báo cáo quản trị.', featured: true },
      { name: 'Premium', users: 'Hệ thống trọng yếu', response: 'SLA tùy chỉnh', detail: 'Trưởng nhóm kỹ thuật chuyên trách, tùy chọn hỗ trợ tại chỗ và ủy ban điều hành họp hằng tháng.', featured: false },
    ],
  },
  process: {
    eyebrow: 'Quy trình',
    title: 'Từ buổi trao đổi đầu tiên đến vận hành được quản lý.',
  },
};
