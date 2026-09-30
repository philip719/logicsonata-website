import type { DataDict } from '../en/data';

// Nội dung kinh doanh dùng chung cho nhiều trang.

export const data: DataDict = {
  description:
    'Logic Sonata cung cấp AI riêng tư, bảo mật cho doanh nghiệp tại Singapore, Việt Nam, Indonesia, Malaysia và Thái Lan: phần cứng, phần mềm, tri thức doanh nghiệp, kiểm soát truy cập, triển khai, đào tạo và hỗ trợ liên tục.',
  hardwareSpecs: [
    'Siêu chip AI: CPU, GPU và NPU',
    'Bộ nhớ hợp nhất lên đến 128 GB',
    'Chạy mô hình ngôn ngữ lớn ngay tại chỗ',
    'Ổ lưu trữ NVMe cục bộ',
    'Tản nhiệt bằng quạt và buồng hơi',
    'Mở rộng từ một máy lên cả cụm máy',
  ],
  // Mã và thứ tự phải giống nhau ở mọi ngôn ngữ; tọa độ bản đồ nằm trong src/lib/site.ts.
  markets: [
    { code: 'SG', name: 'Singapore', city: 'Singapore' },
    { code: 'VN', name: 'Việt Nam', city: 'TP. Hồ Chí Minh' },
    { code: 'ID', name: 'Indonesia', city: 'Jakarta' },
    { code: 'MY', name: 'Malaysia', city: 'Kuala Lumpur' },
    { code: 'TH', name: 'Thái Lan', city: 'Bangkok' },
  ],
  stack: [
    {
      name: 'Phần cứng',
      detail: 'Siêu máy tính AI nhỏ gọn, máy chủ GPU hoặc đám mây GPU riêng được quản lý, tương xứng với khối lượng công việc.',
      icon: 'chip',
    },
    {
      name: 'Phần mềm và mô hình',
      detail: 'Phần mềm AI mở, không phụ thuộc mô hình, để bạn không bao giờ bị ràng buộc vào một nhà cung cấp.',
      icon: 'layers',
    },
    {
      name: 'Tri thức doanh nghiệp',
      detail: 'Tài liệu, quy trình SOP và dữ liệu của bạn được chuyển thành kho tri thức gọn gàng, có phân quyền.',
      icon: 'database',
    },
    {
      name: 'Kiểm soát truy cập',
      detail: 'Phân quyền theo vai trò, đăng nhập một lần (SSO) và nhật ký kiểm toán đầy đủ cho mọi truy vấn.',
      icon: 'key',
    },
    {
      name: 'Triển khai',
      detail: 'Thiết kế kiến trúc, tích hợp với hệ thống hiện có và dự án thí điểm chứng minh giá trị trước tiên.',
      icon: 'rocket',
    },
    {
      name: 'Đào tạo',
      detail: 'Hội thảo thực hành theo vai trò, biến AI đã cài đặt thành thói quen làm việc hằng ngày của mọi phòng ban.',
      icon: 'users',
    },
    {
      name: 'Hỗ trợ liên tục',
      detail: 'Giám sát, cập nhật mô hình, làm mới tri thức và đánh giá kinh doanh hằng quý.',
      icon: 'support',
    },
  ],
  industries: [
    {
      name: 'Nhà sản xuất',
      detail: 'Quy trình SOP, báo cáo chất lượng và kinh nghiệm sản xuất được giải đáp tức thì ngay tại xưởng.',
      icon: 'factory',
    },
    {
      name: 'Nhà bán lẻ',
      detail: 'Thông tin sản phẩm, bảng giá và bản nháp chăm sóc khách hàng luôn nằm trong doanh nghiệp của bạn.',
      icon: 'store',
    },
    {
      name: 'Công ty thiết kế',
      detail: 'Tạo và phát triển ý tưởng một cách riêng tư, thiết kế của bạn không bao giờ bị dùng để huấn luyện mô hình công cộng.',
      icon: 'pen',
    },
    {
      name: 'Nhà cung ứng',
      detail: 'Xử lý RFQ, tính giá thành và trao đổi với người mua nhanh hơn mà không để lộ biên lợi nhuận hay dữ liệu khách hàng.',
      icon: 'truck',
    },
    {
      name: 'Doanh nghiệp hoạt động trong khu vực',
      detail: 'Một lớp tri thức riêng tư thống nhất cho các công ty con, nhiều ngôn ngữ và nhiều quốc gia.',
      icon: 'network',
    },
    {
      name: 'Mọi doanh nghiệp coi trọng quyền riêng tư',
      detail: 'Nếu bạn muốn tận dụng năng suất của AI mà không phải giao nộp dữ liệu, chúng tôi là lựa chọn phù hợp.',
      icon: 'shield',
    },
  ],
  process: [
    { step: 'Đánh giá', detail: 'Rà soát việc sử dụng AI, mức độ phơi nhiễm dữ liệu và các tình huống ứng dụng riêng tư phù hợp nhất.' },
    { step: 'Thí điểm', detail: 'Triển khai một tình huống ứng dụng hoạt động thực tế và chứng minh giá trị với người dùng thật.' },
    { step: 'Mở rộng', detail: 'Nhân rộng sang các phòng ban với quản trị, đào tạo và kiểm soát truy cập.' },
    { step: 'Vận hành', detail: 'Duy trì quản trị, hỗ trợ và liên tục cải tiến qua từng quý.' },
  ],
  faq: [
    {
      q: 'AI riêng tư là gì?',
      a: 'AI riêng tư vận hành các mô hình AI tạo sinh trong môi trường do chính doanh nghiệp bạn kiểm soát: trên phần cứng của bạn, trong đám mây riêng hoặc theo mô hình kết hợp. Tài liệu và dữ liệu của bạn không bao giờ được gửi đến dịch vụ AI công cộng và không bao giờ bị dùng để huấn luyện mô hình của bên khác.',
    },
    {
      q: 'Logic Sonata khác gì so với việc dùng ChatGPT trong công việc?',
      a: 'Các công cụ AI công cộng xử lý câu lệnh của bạn trên hạ tầng mà bạn không kiểm soát. Logic Sonata triển khai mô hình, kho tri thức và cơ chế kiểm soát truy cập ngay trong môi trường của bạn, nhờ đó dữ liệu khách hàng, bảng tính giá thành, hợp đồng và mã nguồn luôn nằm dưới sự quản trị của bạn, kèm nhật ký kiểm toán đầy đủ.',
    },
    {
      q: 'Một giải pháp AI riêng tư của Logic Sonata bao gồm những gì?',
      a: 'Mọi thứ cần thiết để vận hành AI một cách riêng tư: phần cứng, phần mềm và mô hình, tri thức doanh nghiệp được chuẩn bị thành kho tri thức bảo mật, kiểm soát truy cập, triển khai, đào tạo nhân sự và hỗ trợ vận hành liên tục. Một đối tác duy nhất chịu trách nhiệm cho toàn bộ hệ thống.',
    },
    {
      q: 'Chúng tôi có cần mua phần cứng GPU không?',
      a: 'Không. Mọi sản phẩm đều có ba mô hình triển khai: trên đám mây GPU riêng được quản lý mà không cần mua phần cứng, on-premise trên phần cứng chuyên dụng đặt tại tòa nhà của bạn, hoặc kết hợp, với on-premise cho dữ liệu nhạy cảm và đám mây riêng cho phần còn lại.',
    },
    {
      q: 'Các bạn triển khai phần cứng on-premise nào?',
      a: 'Chúng tôi trung lập về phần cứng và lựa chọn cấu hình theo khối lượng công việc của bạn. Các nhóm nhỏ thường bắt đầu với một máy trạm AI nhỏ gọn như NVIDIA DGX Spark hoặc hệ thống AMD Ryzen AI Max+, cả hai đều có bộ nhớ hợp nhất lên đến 128 GB trong một thiết bị cỡ để bàn. Các dự án quy mô lớn hơn dùng máy chủ nhiều GPU hoặc cụm đám mây riêng.',
    },
    {
      q: 'Các bạn phục vụ những quốc gia nào?',
      a: 'Logic Sonata phục vụ doanh nghiệp tại Singapore, Việt Nam, Indonesia, Malaysia và Thái Lan, với năng lực triển khai và hỗ trợ trên khắp Đông Nam Á.',
    },
    {
      q: 'Các bạn làm việc với những ngành nào?',
      a: 'Khách hàng cốt lõi của chúng tôi là nhà sản xuất, nhà bán lẻ, công ty thiết kế, nhà cung ứng và các tập đoàn kinh doanh trong khu vực. Trên thực tế, bất kỳ doanh nghiệp nào muốn dùng AI mà vẫn giữ dữ liệu riêng tư đều phù hợp.',
    },
    {
      q: 'Một dự án thí điểm AI riêng tư mất bao lâu?',
      a: 'Phần lớn khách hàng bắt đầu với Đánh giá Quyền riêng tư và Mức độ Sẵn sàng AI, kết quả là một lộ trình 30/60/90 ngày. Dự án thí điểm sau đó tập trung vào một tình huống ứng dụng hoạt động thực tế, giúp bạn chứng minh giá trị với người dùng thật trước khi cam kết triển khai toàn diện.',
    },
    {
      q: 'Dịch vụ hỗ trợ liên tục hoạt động như thế nào?',
      a: 'Mỗi hệ thống sau triển khai được đưa vào một gói hỗ trợ vận hành tương xứng với số người dùng và mức độ quan trọng của hệ thống, từ kiểm tra định kỳ hằng tháng đến trưởng nhóm kỹ thuật chuyên trách với mức cam kết dịch vụ riêng. Chúng tôi sẽ đề xuất gói phù hợp trong giai đoạn đánh giá.',
    },
  ],
};
