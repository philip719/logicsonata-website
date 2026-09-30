import type { CareersDict } from '../en/careers';

export const careers: CareersDict = {
  meta: {
    title: 'Tuyển dụng: Sales và Pre-Sales mảng AI riêng tư',
    description:
      'Gia nhập Logic Sonata ở vị trí Sales Manager hoặc Pre-Sales Manager tại Việt Nam hoặc Indonesia, giúp doanh nghiệp ứng dụng AI riêng tư theo cách của họ.',
  },
  breadcrumb: 'Tuyển dụng',
  hero: {
    eyebrow: 'Tuyển dụng',
    title: 'Giúp doanh nghiệp ứng dụng AI *theo cách của họ.*',
    lead: 'Chúng tôi đang mở rộng sang thị trường Việt Nam và Indonesia, cần tuyển hai Sales Manager và hai Pre-Sales Manager để dẫn dắt chặng đường này.',
    cta: 'Ứng tuyển ngay',
  },
  roles: {
    eyebrow: 'Vị trí đang tuyển',
    title: 'Bốn vị trí. Hai thị trường.',
    fullTime: 'TOÀN THỜI GIAN',
    applyRole: 'Ứng tuyển vị trí này',
    own: 'Bạn sẽ phụ trách',
    have: 'Yêu cầu',
    // id và countryCode phải giữ nguyên ở mọi ngôn ngữ.
    items: [
      {
        id: 'sales-vn',
        countryCode: 'VN',
        country: 'Việt Nam',
        title: 'Sales Manager (Quản lý Kinh doanh), AI riêng tư',
        location: 'TP. Hồ Chí Minh hoặc Hà Nội',
        intro:
          'Chúng tôi đang xây dựng mảng kinh doanh AI riêng tư mới tại Việt Nam và tìm kiếm người muốn tự tạo lập thị trường, không phải tiếp quản thị trường có sẵn: mở cửa tiếp cận khách hàng, xây dựng quan hệ với lãnh đạo cấp cao, giành các dự án thí điểm và biến chúng thành khách hàng lâu dài.',
        own: [
          'Tìm kiếm và chốt hợp đồng với khách hàng doanh nghiệp trên toàn Việt Nam',
          'Các buổi khảo sát nhu cầu, POC, dự án thí điểm và đàm phán',
          'Hợp tác với đơn vị tích hợp hệ thống, nhà cung cấp phần cứng và công ty tư vấn',
          'Quản lý pipeline chặt chẽ, dự báo doanh số và chiến lược khách hàng',
        ],
        have: [
          'Từ 5 năm kinh nghiệm trở lên trong bán hàng công nghệ B2B hoặc phát triển kinh doanh',
          'Thành tích giành được khách hàng doanh nghiệp mới',
          'Thông thạo tiếng Việt và tiếng Anh chuyên nghiệp tốt',
          'Có sẵn mối quan hệ với các doanh nghiệp tại Việt Nam',
        ],
      },
      {
        id: 'presales-vn',
        countryCode: 'VN',
        country: 'Việt Nam',
        title: 'Pre-Sales Manager (Quản lý Tư vấn Giải pháp), AI riêng tư',
        location: 'TP. Hồ Chí Minh hoặc Hà Nội',
        intro:
          'Một Pre-Sales Manager vững kỹ thuật, nhạy bén thương mại, biến vấn đề của khách hàng thành giải pháp AI thực tế: dẫn dắt các buổi trình diễn, thiết kế kiến trúc AI riêng tư bảo mật và xác định phạm vi dự án thí điểm.',
        own: [
          'Khảo sát nhu cầu khách hàng và thiết kế giải pháp kỹ thuật',
          'Trình diễn sản phẩm, hội thảo cho lãnh đạo và thuyết trình kỹ thuật',
          'Xác định phạm vi POC và dự án thí điểm cùng kỹ sư và đội ngũ IT',
          'Đề xuất kỹ thuật, sơ đồ kiến trúc và hồ sơ phản hồi RFP',
        ],
        have: [
          'Kinh nghiệm với LLM, RAG, cơ sở dữ liệu vector hoặc AI agent',
          'Khả năng giải thích các khái niệm AI phức tạp bằng ngôn ngữ kinh doanh dễ hiểu',
          'Tự tin thuyết trình trước CIO, CTO và Giám đốc IT',
          'Thông thạo tiếng Việt và tiếng Anh chuyên nghiệp tốt',
        ],
      },
      {
        id: 'sales-id',
        countryCode: 'ID',
        country: 'Indonesia',
        title: 'Sales Manager (Quản lý Kinh doanh), AI riêng tư',
        location: 'Jakarta',
        intro:
          'Một người bán hàng công nghệ đầy tham vọng, muốn tự tạo lập thị trường thay vì quản lý một khu vực có sẵn: giới thiệu AI triển khai riêng tư đến các doanh nghiệp Indonesia và chuyển đổi dự án thí điểm thành khách hàng lâu dài.',
        own: [
          'Phát triển thị trường Indonesia từ tìm kiếm khách hàng đến ký kết hợp đồng',
          'Quan hệ với CEO, CIO, CTO và Giám đốc Vận hành',
          'Trình diễn sản phẩm, hội thảo, POC và dự án thí điểm có phí',
          'Quan hệ đối tác chiến lược với đơn vị tích hợp hệ thống và nhà cung cấp phần cứng',
        ],
        have: [
          'Thành tích bán phần mềm doanh nghiệp, an ninh mạng, đám mây hoặc AI',
          'Ưu tiên ứng viên có kinh nghiệm trong ngành sản xuất, may mặc, bán lẻ hoặc logistics',
          'Kỹ năng tìm kiếm khách hàng, đàm phán và chốt hợp đồng vững vàng',
          'Có sẵn mối quan hệ với các doanh nghiệp tại Indonesia',
        ],
      },
      {
        id: 'presales-id',
        countryCode: 'ID',
        country: 'Indonesia',
        title: 'Pre-Sales Manager (Quản lý Tư vấn Giải pháp), AI riêng tư',
        location: 'Jakarta',
        intro:
          'Một Pre-Sales Manager có uy tín về kỹ thuật, nhạy bén thương mại, biến các vấn đề phức tạp của khách hàng thành giải pháp AI thực tế và bảo mật, từ thiết kế kiến trúc đến triển khai thí điểm.',
        own: [
          'Các giai đoạn kỹ thuật và thiết kế giải pháp trong quy trình bán hàng tại Indonesia',
          'Thiết kế kiến trúc AI on-premise, đám mây riêng và kết hợp',
          'Demo may đo, hội thảo cho lãnh đạo và thuyết trình kỹ thuật',
          'Hồ sơ phản hồi RFP, bảng câu hỏi bảo mật và thẩm định kỹ thuật',
        ],
        have: [
          'Kinh nghiệm với LLM, RAG, AI agent hoặc tìm kiếm doanh nghiệp',
          'Tự tin thuyết trình trước CIO, CTO và lãnh đạo chuyển đổi số',
          'Khả năng chuyển nhu cầu kinh doanh thành thiết kế giải pháp kỹ thuật',
          'Thông thạo tiếng Indonesia (Bahasa Indonesia) và tiếng Anh chuyên nghiệp tốt',
        ],
      },
    ],
  },
  apply: {
    eyebrow: 'Ứng tuyển ngay',
    title: 'Gửi CV của bạn.',
    lead: 'Chia sẻ đôi chút về bản thân và đính kèm CV. Chúng tôi trực tiếp xem xét từng hồ sơ ứng tuyển.',
    frameTitle: 'Biểu mẫu ứng tuyển Logic Sonata',
    loading: 'Đang tải biểu mẫu ứng tuyển…',
  },
};
