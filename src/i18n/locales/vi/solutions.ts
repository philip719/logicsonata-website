import type { SolutionsDict } from '../en/solutions';

export const solutions: SolutionsDict = {
  meta: {
    title: 'Sản phẩm và phần cứng AI riêng tư',
    description:
      'Trợ lý tri thức, AI thị giác thời gian thực, trợ lý lập trình, AI agent và tạo ảnh, triển khai on-premise, đám mây riêng hoặc kết hợp.',
  },
  breadcrumb: 'Giải pháp',
  listName: 'Sản phẩm AI riêng tư của Logic Sonata',
  hero: {
    eyebrow: 'Giải pháp',
    title: 'Hệ thống AI riêng tư, *sẵn sàng triển khai.*',
    lead: 'Năm hệ thống AI sẵn sàng vận hành thực tế, mỗi hệ thống đi kèm phần cứng, tri thức doanh nghiệp, kiểm soát truy cập, đào tạo và hỗ trợ cần thiết để vận hành một cách riêng tư.',
    secondary: 'Xem phần cứng',
  },
  products: {
    eyebrow: 'Sản phẩm',
    title: 'Chọn hệ thống phù hợp với dữ liệu của bạn.',
  },
  hardware: {
    eyebrow: 'Phần cứng',
    title: 'Sức mạnh AI cấp trung tâm dữ liệu, gọn trên bàn làm việc.',
    lead: 'Chúng tôi trung lập về phần cứng. Với nhiều đội ngũ, AI riêng tư bắt đầu từ một máy trạm AI nhỏ gọn chạy chip NVIDIA hoặc AMD, và chúng tôi đề xuất nền tảng phù hợp với mô hình, phần mềm và ngân sách của bạn. Chúng tôi cung cấp, cấu hình và hỗ trợ thiết bị như một phần của giải pháp.',
    imageAlt:
      'Hình tách lớp của một thiết bị AI riêng tư nhỏ gọn: vỏ nhôm, tấm thông gió đục lỗ, quạt và buồng hơi tản nhiệt, siêu chip AI, bộ nhớ hợp nhất, ổ lưu trữ NVMe và kết nối mạng tốc độ cao',
    specHeader: 'Thông số',
    // Các hàng: [nhãn, NVIDIA DGX Spark, AMD Ryzen AI Max+], theo số liệu công bố của từng nhà sản xuất.
    platforms: [
      ['Bộ xử lý', 'Siêu chip GB10 Grace Blackwell: CPU Arm 20 nhân và GPU Blackwell', 'Ryzen AI Max+ 395: CPU Zen 5 16 nhân, GPU Radeon 8060S, NPU XDNA 2'],
      ['Bộ nhớ hợp nhất', '128 GB', 'Lên đến 128 GB, trong đó tối đa 96 GB có thể cấp cho GPU'],
      ['Hiệu năng AI', 'Lên đến 1 petaFLOP (FP4)', 'NPU trên 50 TOPS cùng GPU 40 nhân'],
      ['Kết nối mạng', 'ConnectX-7 tốc độ 200 Gb/s, ghép hai máy để chạy mô hình lớn hơn', 'Tùy theo nhà sản xuất hệ thống'],
      ['Phù hợp nhất', 'Hệ sinh thái phần mềm CUDA và các mô hình cục bộ lớn nhất', 'Tương thích x86 và suy luận cục bộ tiết kiệm chi phí'],
    ],
    finePrint:
      'Hình minh họa một thiết bị chung với bố cục bên trong đã được đơn giản hóa. Thông số kỹ thuật theo số liệu công bố của từng nhà sản xuất. NVIDIA và DGX Spark là thương hiệu của NVIDIA Corporation. AMD và Ryzen là thương hiệu của Advanced Micro Devices, Inc.',
    tiers: [
      {
        name: 'Máy trạm AI nhỏ gọn',
        fit: 'Dự án thí điểm và đội ngũ nhỏ',
        detail: 'Thiết bị để bàn như NVIDIA DGX Spark hoặc hệ thống AMD Ryzen AI Max+. Thiết kế cho văn phòng, đủ mạnh cho các mô hình chuyên sâu.',
        icon: 'chip',
      },
      {
        name: 'Máy chủ GPU',
        fit: 'Triển khai cấp phòng ban và toàn công ty',
        detail: 'Máy chủ nhiều GPU gắn tủ rack trong phòng máy chủ hoặc trung tâm dữ liệu của bạn, đáp ứng số lượng người dùng đồng thời cao hơn.',
        icon: 'layers',
      },
      {
        name: 'Đám mây riêng được quản lý',
        fit: 'Không cần mua phần cứng',
        detail: 'Năng lực GPU chuyên dụng trong môi trường riêng được quản lý, tách biệt hoàn toàn với các dịch vụ AI công cộng.',
        icon: 'cloud',
      },
    ],
  },
  deployment: {
    eyebrow: 'Triển khai',
    title: 'On-premise, đám mây riêng hoặc kết hợp.',
    lead: 'Mọi sản phẩm đều chạy trong môi trường phù hợp với từng loại dữ liệu, với cùng một cơ chế quản trị.',
    items: [
      { variant: 'onprem', name: 'On-premise', detail: 'Phần cứng đặt trong tòa nhà của bạn, dành cho dữ liệu nhạy cảm nhất.' },
      { variant: 'hosted', name: 'Đám mây riêng', detail: 'Đám mây GPU riêng chuyên dụng, không cần mua phần cứng.' },
      { variant: 'hybrid', name: 'Kết hợp (hybrid)', detail: 'Tác vụ nhạy cảm chạy tại chỗ, phần còn lại trên đám mây riêng.' },
    ],
  },
  extended: {
    eyebrow: 'Tính năng mở rộng',
    title: 'Thêm nhiều ứng dụng AI riêng tư, trên cùng một nền tảng.',
    lead: 'Có sẵn dưới dạng tiện ích bổ sung hoặc dự án may đo cho quy trình đặc thù của từng ngành.',
    items: [
      { name: 'Dịch thuật riêng tư', detail: 'Dịch đa ngôn ngữ cho tài liệu, thư từ trao đổi và nội dung kỹ thuật.', icon: 'translate' },
      { name: 'AI xử lý tài liệu riêng tư', detail: 'Trích xuất dữ liệu từ hóa đơn, biểu mẫu, chứng từ và tài liệu scan vào hệ thống của bạn.', icon: 'policy' },
      { name: 'AI giọng nói riêng tư', detail: 'Nhận dạng giọng nói, chuyển giọng nói thành văn bản và trợ lý giọng nói nội bộ.', icon: 'wave' },
    ],
  },
  ctaTitle: 'Chưa chắc hệ thống nào phù hợp?',
  ctaLead: 'Hãy bắt đầu với một buổi tư vấn. Chúng tôi phân tích dữ liệu, đề xuất hệ thống phù hợp và xác định cấu hình phần cứng.',
};
