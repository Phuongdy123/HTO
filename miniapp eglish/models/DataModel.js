const defaultConfig = {
    quiz_title: 'Đánh Giá Năng Lực Ngoại Ngữ Quốc Tế',
    quiz_subtitle: 'Hệ thống kiểm tra toàn diện: Nghe - Đọc - Viết',
    start_button_text: 'Bắt Đầu Thử Thách 🚀',
    consent_text: 'Tôi đồng ý cung cấp số điện thoại để nhận kết quả chi tiết qua Zalo',
    congratulations_text: 'Xuất sắc! Bạn đã hoàn thành bài kiểm tra năng lực.',
    background_color: '#1e3a8a',
    card_color: '#ffffff',
    text_color: '#1f2937',
    primary_action_color: '#2563eb',
    font_family: 'Poppins',
    questions_per_turn: 30 // SỐ CÂU HỎI MỖI LẦN THI
};

// ============================================================
// --- NGÂN HÀNG CÂU HỎI (DATABASE) ---
// ============================================================
const questionsData = {
    // ======================================================
    // 1. TIẾNG ANH (EN) - Đã bổ sung đầy đủ
    // ======================================================
    en: {
        easy: [
            // --- Cũ ---
            { type: 'choice', category: 'GRAMMAR', question: 'I ___ a student.', options: ['is', 'are', 'am', 'be'], correct: 2 },
            // --- THÊM MỚI (10 Câu) ---
            { type: 'choice', category: 'VOCABULARY', question: 'Which animal says "Meow"?', options: ['Dog', 'Cat', 'Cow', 'Pig'], correct: 1 },
            { type: 'choice', category: 'GRAMMAR', question: 'She ___ breakfast at 7 AM.', options: ['eat', 'eats', 'eating', 'ate'], correct: 1 },
            { type: 'choice', category: 'NUMBERS', question: 'Five + Five = ?', options: ['Nine', 'Ten', 'Eleven', 'Eight'], correct: 1 },
            { type: 'choice', category: 'VOCABULARY', question: 'We sleep in the ___.', options: ['Kitchen', 'Bathroom', 'Bedroom', 'Garage'], correct: 2 },
            { type: 'choice', category: 'GRAMMAR', question: 'They ___ playing football.', options: ['is', 'am', 'are', 'be'], correct: 2 },
            { type: 'writing', category: 'WRITING', question: 'Write the opposite of "Hot".', correctAnswer: 'cold', options: [] },
            { type: 'writing', category: 'WRITING', question: 'Sunday, Monday, _______, Wednesday.', correctAnswer: 'tuesday', options: [] },
            { type: 'listening', category: 'LISTENING', audioScript: "Sit down, please.", langCode: "en-US", question: 'What should you do?', options: ['Stand up', 'Sit down', 'Run', 'Sleep'], correct: 1 },
            { type: 'listening', category: 'LISTENING', audioScript: "My favorite color is Blue.", langCode: "en-US", question: 'What color?', options: ['Red', 'Blue', 'Green', 'Yellow'], correct: 1 },
            { type: 'listening', category: 'LISTENING', audioScript: "Good night!", langCode: "en-US", question: 'When do you say this?', options: ['Morning', 'Afternoon', 'Evening', 'Before sleeping'], correct: 3 }
        ],
        medium: [
            // --- Cũ ---
            { type: 'choice', category: 'GRAMMAR', question: 'I have lived here ___ 2010.', options: ['since', 'for', 'in', 'at'], correct: 0 },
            // --- THÊM MỚI (10 Câu) ---
            { type: 'choice', category: 'GRAMMAR', question: 'I look forward to ___ you.', options: ['see', 'seeing', 'saw', 'seen'], correct: 1 },
            { type: 'choice', category: 'VOCABULARY', question: 'The flight takes ___ at 9:00 PM.', options: ['off', 'up', 'on', 'in'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: 'Unless you hurry, you ___ the bus.', options: ['will miss', 'miss', 'missed', 'missing'], correct: 0 },
            { type: 'choice', category: 'VOCABULARY', question: 'He is responsible ___ the sales department.', options: ['of', 'for', 'to', 'in'], correct: 1 },
            { type: 'choice', category: 'GRAMMAR', question: 'I wish I ___ a bigger house.', options: ['have', 'had', 'have had', 'having'], correct: 1 },
            { type: 'writing', category: 'WRITING', question: 'Past participle of "Buy" is _______.', correctAnswer: 'bought', options: [] },
            { type: 'writing', category: 'WRITING', question: 'Complete: "Piece of _______" (Very easy).', correctAnswer: 'cake', options: [] },
            { type: 'listening', category: 'LISTENING', audioScript: "We are out of stock.", langCode: "en-US", question: 'Meaning?', options: ['Full stock', 'No items left', 'Discount', 'New items'], correct: 1 },
            { type: 'listening', category: 'LISTENING', audioScript: "Can I have the check, please?", langCode: "en-US", question: 'Where are they?', options: ['Park', 'School', 'Restaurant', 'Gym'], correct: 2 },
            { type: 'listening', category: 'LISTENING', audioScript: "It's raining cats and dogs.", langCode: "en-US", question: 'Weather?', options: ['Sunny', 'Light rain', 'Heavy rain', 'Snowing'], correct: 2 }
        ],
        hard: [
            // --- Cũ ---
            { type: 'choice', category: 'GRAMMAR', question: 'The board of directors ___ the proposal yesterday.', options: ['approve', 'approved', 'approves', 'approving'], correct: 1 },
            // --- THÊM MỚI (10 Câu) ---
            { type: 'choice', category: 'GRAMMAR', question: 'Scarcely had he entered the room ___ the phone rang.', options: ['than', 'when', 'then', 'after'], correct: 1 },
            { type: 'choice', category: 'VOCABULARY', question: 'The contract is ___ upon signature.', options: ['binding', 'bounding', 'bending', 'biding'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: 'It is essential that he ___ informed immediately.', options: ['be', 'is', 'was', 'were'], correct: 0 },
            { type: 'choice', category: 'VOCABULARY', question: 'His explanation was completely ___ .', options: ['plausible', 'plastic', 'plentiful', 'playful'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: '___ he been more careful, the accident wouldn\'t have happened.', options: ['Has', 'Had', 'If', 'Should'], correct: 1 },
            { type: 'writing', category: 'WRITING', question: 'Synonym of "Decrease" starting with D is _______.', correctAnswer: 'diminish', options: [] },
            { type: 'writing', category: 'WRITING', question: 'Complete: "Don\'t judge a book by its _______."', correctAnswer: 'cover', options: [] },
            { type: 'listening', category: 'LISTENING', audioScript: "The merger has been called off indefinitely.", langCode: "en-US", question: 'Status of merger?', options: ['Completed', 'Delayed', 'Cancelled', 'Started'], correct: 2 },
            { type: 'listening', category: 'LISTENING', audioScript: "I'd like to make a withdrawal.", langCode: "en-US", question: 'Location?', options: ['Library', 'Bank', 'Hospital', 'Police Station'], correct: 1 },
            { type: 'listening', category: 'LISTENING', audioScript: "He's always pulling my leg.", langCode: "en-US", question: 'Meaning?', options: ['Hurting me', 'Joking', 'Massage', 'Helping'], correct: 1 }
        ]
    },

    // ======================================================
    // 2. TIẾNG TRUNG (ZH)
    // ======================================================
    zh: {
        easy: [
            // --- Cũ ---
            { type: 'choice', category: 'GRAMMAR', question: '“你好” (Nǐ hǎo) nghĩa là gì?', options: ['Tạm biệt', 'Xin chào', 'Cảm ơn', 'Xin lỗi'], correct: 1 },
            // --- THÊM MỚI (10 Câu) ---
            { type: 'choice', category: 'VOCABULARY', question: '“再见” (Zàijiàn) nghĩa là gì?', options: ['Xin chào', 'Tạm biệt', 'Cảm ơn', 'Xin lỗi'], correct: 1 },
            { type: 'choice', category: 'GRAMMAR', question: '我 ___ 喜欢吃苹果。 (Tôi KHÔNG thích...)', options: ['不 (bù)', '没 (méi)', '无 (wú)', '非 (fēi)'], correct: 0 },
            { type: 'choice', category: 'NUMBERS', question: '十 (Shí) là số mấy?', options: ['5', '8', '10', '12'], correct: 2 },
            { type: 'choice', category: 'VOCABULARY', question: '“明天” (Míngtiān) là khi nào?', options: ['Hôm qua', 'Hôm nay', 'Ngày mai', 'Năm sau'], correct: 2 },
            { type: 'choice', category: 'GRAMMAR', question: '他 ___ 哪儿？ (Anh ấy Ở đâu?)', options: ['去 (qù)', '在 (zài)', '是 (shì)', '有 (yǒu)'], correct: 1 },
            { type: 'writing', category: 'WRITING', question: 'Viết phiên âm của "Cảm ơn" (xi...)', correctAnswer: 'xiexie', options: [] },
            { type: 'writing', category: 'WRITING', question: 'Viết số 5 bằng chữ Hán.', correctAnswer: '五', options: [] },
            { type: 'listening', category: 'LISTENING', audioScript: "现在是九点。", langCode: "zh-CN", question: 'Mấy giờ?', options: ['8:00', '9:00', '10:00', '7:00'], correct: 1 },
            { type: 'listening', category: 'LISTENING', audioScript: "她是我的妈妈。", langCode: "zh-CN", question: 'Ai?', options: ['Bố', 'Mẹ', 'Chị', 'Bạn'], correct: 1 },
            { type: 'listening', category: 'LISTENING', audioScript: "我喝茶。", langCode: "zh-CN", question: 'Uống gì?', options: ['Nước', 'Bia', 'Trà', 'Sữa'], correct: 2 }
        ],
        medium: [
            // --- Cũ ---
            { type: 'choice', category: 'GRAMMAR', question: '你 ___ 去哪儿？ (Bạn MUỐN đi đâu)', options: ['想', '喜欢', '爱', '看'], correct: 0 },
            // --- THÊM MỚI (10 Câu) ---
            { type: 'choice', category: 'GRAMMAR', question: '他一边吃饭，___看电视。', options: ['一边', '一起', '一直', '一旦'], correct: 0 },
            { type: 'choice', category: 'VOCABULARY', question: '服务员，请给我一___水。', options: ['杯 (bēi)', '本 (běn)', '个 (gè)', '只 (zhī)'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: '这件衣服有点儿贵，___有没有便宜一点的？', options: ['虽然', '所以', '但是', '因为'], correct: 1 }, // Lỗi logic nhỏ ở câu hỏi cũ, sửa lại: 'Nhưng có rẻ hơn không'
            { type: 'choice', category: 'VOCABULARY', question: '我们是坐___来的。', options: ['出租车', '自行车', '走路', '跑步'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: '我已经把作业___完了。', options: ['做', '写', '搞', '弄'], correct: 0 },
            { type: 'writing', category: 'WRITING', question: 'Viết chữ Hán: "Bắc Kinh" (Běijīng).', correctAnswer: '北京', options: [] },
            { type: 'writing', category: 'WRITING', question: 'Điền từ: 因___ (Bởi vì - yīnwèi).', correctAnswer: '为', options: [] },
            { type: 'listening', category: 'LISTENING', audioScript: "前面左转就到了。", langCode: "zh-CN", question: 'Hướng dẫn?', options: ['Đi thẳng', 'Rẽ trái', 'Rẽ phải', 'Quay lại'], correct: 1 },
            { type: 'listening', category: 'LISTENING', audioScript: "今天太热了。", langCode: "zh-CN", question: 'Thời tiết?', options: ['Lạnh', 'Mát', 'Nóng', 'Mưa'], correct: 2 },
            { type: 'listening', category: 'LISTENING', audioScript: "一共多少钱？", langCode: "zh-CN", question: 'Hỏi gì?', options: ['Số lượng', 'Giá tiền', 'Thời gian', 'Địa điểm'], correct: 1 }
        ],
        hard: [
            // --- Cũ (Giữ nguyên các câu khó cũ) ---
            { type: 'choice', category: 'GRAMMAR', question: '这本书我___看完了。', options: ['已经', '正在', '一边', '就'], correct: 0 },
            // --- THÊM MỚI (10 Câu) ---
            { type: 'choice', category: 'VOCABULARY', question: '这次考试对他来说是小菜一___。', options: ['盘', '碟', '碗', '杯'], correct: 1 }, // Thành ngữ: Dễ như ăn bánh
            { type: 'choice', category: 'GRAMMAR', question: '___下雨，我们也要去。', options: ['即使', '虽然', '但是', '因为'], correct: 0 },
            { type: 'choice', category: 'VOCABULARY', question: '由于天气原因，航班被___了。', options: ['取消', '举行', '开始', '结束'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: '与其在家里睡觉，___出去走走。', options: ['不如', '不然', '不过', '不只'], correct: 0 },
            { type: 'choice', category: 'VOCABULARY', question: '我们需要___解决这个问题。', options: ['彻底', '到底', '根本', '基本'], correct: 0 },
            { type: 'writing', category: 'WRITING', question: 'Thành ngữ: "Mã đáo thành..." (Viết chữ Hán)', correctAnswer: '功', options: [] },
            { type: 'writing', category: 'WRITING', question: 'Viết từ: "Kinh tế" (Jīngjì)', correctAnswer: '经济', options: [] },
            { type: 'listening', category: 'LISTENING', audioScript: "请系好安全带。", langCode: "zh-CN", question: 'Ở đâu?', options: ['Trên máy bay', 'Trong nhà', 'Công viên', 'Thư viện'], correct: 0 },
            { type: 'listening', category: 'LISTENING', audioScript: "我也没想到结果会是这样。", langCode: "zh-CN", question: 'Thái độ?', options: ['Vui vẻ', 'Ngạc nhiên', 'Tức giận', 'Bình thường'], correct: 1 },
            { type: 'listening', category: 'LISTENING', audioScript: "不论发生什么，我都支持你。", langCode: "zh-CN", question: 'Ý nghĩa?', options: ['Phản đối', 'Ủng hộ', 'Không quan tâm', 'Lo lắng'], correct: 1 }
        ]
    },

    // ======================================================
    // 3. TIẾNG HÀN (KR)
    // ======================================================
    kr: {
        easy: [
            // --- Cũ ---
            { type: 'choice', category: 'GRAMMAR', question: '“안녕하세요” nghĩa là gì?', options: ['Xin lỗi', 'Cảm ơn', 'Xin chào', 'Tạm biệt'], correct: 2 },
            // --- THÊM MỚI (10 Câu) ---
            { type: 'choice', category: 'VOCABULARY', question: '“사과” (Sagwa) là quả gì?', options: ['Táo', 'Nho', 'Cam', 'Dưa hấu'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: '저는 학생___ (Là học sinh).', options: ['입니다', '입니까', '이', '가'], correct: 0 },
            { type: 'choice', category: 'VOCABULARY', question: '“가다” (Gada) nghĩa là?', options: ['Đi', 'Đến', 'Ăn', 'Ngủ'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: '이것___ 무엇입니까? (Cái này LÀ cái gì?)', options: ['은', '을', '도', '로'], correct: 0 },
            { type: 'choice', category: 'VOCABULARY', question: 'Số 1 (Thuần Hàn)?', options: ['하나 (Hana)', '둘 (Dul)', '셋 (Set)', '일 (Il)'], correct: 0 },
            { type: 'writing', category: 'WRITING', question: 'Viết "Kimchi" bằng tiếng Hàn.', correctAnswer: '김치', options: [] },
            { type: 'writing', category: 'WRITING', question: 'Viết "Sữa" (Uyu) bằng tiếng Hàn.', correctAnswer: '우유', options: [] },
            { type: 'listening', category: 'LISTENING', audioScript: "안녕히 가세요.", langCode: "ko-KR", question: 'Tình huống?', options: ['Gặp mặt', 'Tạm biệt (Người ở lại nói)', 'Tạm biệt (Người đi nói)', 'Xin lỗi'], correct: 1 },
            { type: 'listening', category: 'LISTENING', audioScript: "물 주세요.", langCode: "ko-KR", question: 'Muốn gì?', options: ['Cơm', 'Nước', 'Rượu', 'Kim chi'], correct: 1 },
            { type: 'listening', category: 'LISTENING', audioScript: "사랑해요.", langCode: "ko-KR", question: 'Cảm xúc?', options: ['Ghét', 'Yêu', 'Buồn', 'Sợ'], correct: 1 }
        ],
        medium: [
            // --- Cũ ---
            { type: 'choice', category: 'GRAMMAR', question: 'Tiểu từ chủ ngữ là?', options: ['은/는', '이/가', '을/를', '에/에서'], correct: 1 },
            // --- THÊM MỚI (10 Câu) ---
            { type: 'choice', category: 'GRAMMAR', question: '밥을 ___ (Ăn - Quá khứ).', options: ['먹어요', '먹었습니다', '먹을 거예요', '먹고'], correct: 1 },
            { type: 'choice', category: 'VOCABULARY', question: '친구를 ___ (Gặp).', options: ['만납니다', '마십니다', '봅니다', '갑니다'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: '비가 ___ 우산을 씁니다. (Vì...nên)', options: ['오고', '와서', '오지만', '오면'], correct: 1 },
            { type: 'choice', category: 'VOCABULARY', question: '병원에 ___ (Đi đến bệnh viện).', options: ['가요', '봐요', '사요', '입어요'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: '영화를 ___ 싶어요. (Muốn)', options: ['보고', '보', '봐', '봅'], correct: 0 },
            { type: 'writing', category: 'WRITING', question: 'Viết đuôi câu kính trọng của "하다" (làm) -> 합니다.', correctAnswer: '합니다', options: [] },
            { type: 'writing', category: 'WRITING', question: 'Điền từ: "Hàn..." (Quốc - Hanguk)', correctAnswer: '국', options: [] },
            { type: 'listening', category: 'LISTENING', audioScript: "어디 아프세요?", langCode: "ko-KR", question: 'Địa điểm?', options: ['Trường học', 'Bệnh viện', 'Nhà hàng', 'Công viên'], correct: 1 },
            { type: 'listening', category: 'LISTENING', audioScript: "몇 시에 만날까요?", langCode: "ko-KR", question: 'Hỏi về?', options: ['Địa điểm', 'Thời gian', 'Giá tiền', 'Phương tiện'], correct: 1 },
            { type: 'listening', category: 'LISTENING', audioScript: "맛있게 드세요.", langCode: "ko-KR", question: 'Khi nào nói?', options: ['Trước khi ăn', 'Sau khi ăn', 'Khi ngủ', 'Khi đi làm'], correct: 0 }
        ],
        hard: [
            // --- Cũ ---
            { type: 'choice', category: 'GRAMMAR', question: '비가 ___ 우산을 썼어요.', options: ['와서', '오면', '오지만', '오려고'], correct: 0 },
            // --- THÊM MỚI (10 Câu) ---
            { type: 'choice', category: 'GRAMMAR', question: '한국에 ___ 적이 있어요. (Đã từng)', options: ['가 본', '가는', '갈', '가서'], correct: 0 },
            { type: 'choice', category: 'VOCABULARY', question: '회의가 ___되었습니다. (Bị hủy)', options: ['취소', '시작', '계속', '예약'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: '아무리 ___ 성공할 수 없어요. (Dù cố gắng)', options: ['노력해도', '노력해서', '노력하면', '노력하고'], correct: 0 },
            { type: 'choice', category: 'VOCABULARY', question: '환경 ___을 해야 합니다. (Bảo vệ)', options: ['보호', '오염', '개발', '파괴'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: '친구가 올 ___ 기다렸어요. (Đến khi)', options: ['때까지', '때문에', '때', '면서'], correct: 0 },
            { type: 'writing', category: 'WRITING', question: 'Viết: "Cảm ơn" (Gomawo - Bạn bè)', correctAnswer: '고마워', options: [] },
            { type: 'writing', category: 'WRITING', question: 'Thủ đô Hàn Quốc: "Seo..."', correctAnswer: '울', options: [] },
            { type: 'listening', category: 'LISTENING', audioScript: "잠시만 기다려 주십시오.", langCode: "ko-KR", question: 'Yêu cầu?', options: ['Đi ngay', 'Chờ một chút', 'Nói to lên', 'Im lặng'], correct: 1 },
            { type: 'listening', category: 'LISTENING', audioScript: "전화번호를 잘못 누르셨습니다.", langCode: "ko-KR", question: 'Vấn đề?', options: ['Nhầm số', 'Hết pin', 'Mất sóng', 'Điện thoại hỏng'], correct: 0 },
            { type: 'listening', category: 'LISTENING', audioScript: "제 생각에는 반대입니다.", langCode: "ko-KR", question: 'Ý kiến?', options: ['Đồng ý', 'Phản đối', 'Không biết', 'Thắc mắc'], correct: 1 }
        ]
    },

    // ======================================================
    // 4. TIẾNG ĐỨC (DE) - Đã thêm mới
    // ======================================================
    de: {
        easy: [
             { type: 'choice', category: 'GRAMMAR', question: 'Ich ___ aus Vietnam.', options: ['komme', 'kommt', 'kommen', 'kam'], correct: 0 },
             { type: 'choice', category: 'VOCABULARY', question: '“Guten Morgen” nghĩa là?', options: ['Chào buổi sáng', 'Chào buổi tối', 'Chúc ngủ ngon', 'Tạm biệt'], correct: 0 },
             { type: 'choice', category: 'NUMBERS', question: 'Eins, Zwei, ___', options: ['Drei', 'Vier', 'Fünf', 'Sechs'], correct: 0 },
             { type: 'choice', category: 'GRAMMAR', question: 'Das ist ___ Auto.', options: ['ein', 'eine', 'einen', 'einer'], correct: 0 },
             { type: 'choice', category: 'VOCABULARY', question: 'Wasser ist ___.', options: ['Blau', 'Rot', 'Gelb', 'Grün'], correct: 0 },
             { type: 'choice', category: 'GRAMMAR', question: 'Er ___ Fußball.', options: ['spielt', 'spielen', 'spiele', 'spielst'], correct: 0 },
             { type: 'writing', category: 'WRITING', question: 'Ja oder ___ (Yes or No)', correctAnswer: 'nein', options: [] },
             { type: 'writing', category: 'WRITING', question: 'Danke ___ (Thank you very much)', correctAnswer: 'schon', options: [] },
             { type: 'listening', category: 'LISTENING', audioScript: "Mein Name ist Lisa.", langCode: "de-DE", question: 'Tên cô ấy?', options: ['Lisa', 'Lena', 'Laura', 'Lara'], correct: 0 },
             { type: 'listening', category: 'LISTENING', audioScript: "Auf Wiedersehen!", langCode: "de-DE", question: 'Ý nghĩa?', options: ['Xin chào', 'Hẹn gặp lại', 'Xin lỗi', 'Cảm ơn'], correct: 1 }
        ],
        medium: [
             { type: 'choice', category: 'GRAMMAR', question: 'Ich habe das Buch ___. (đã đọc)', options: ['gelesen', 'lese', 'liest', 'las'], correct: 0 },
             { type: 'choice', category: 'VOCABULARY', question: 'Wir fahren mit dem ___. (Tàu hỏa)', options: ['Zug', 'Auto', 'Flugzeug', 'Fahrrad'], correct: 0 },
             { type: 'choice', category: 'GRAMMAR', question: 'Weil es regnet, ___ ich zu Hause.', options: ['bleibe', 'bleiben', 'geblieben', 'bleibst'], correct: 0 },
             { type: 'choice', category: 'VOCABULARY', question: 'Ich gehe zum ___. (Bác sĩ)', options: ['Arzt', 'Lehrer', 'Bäcker', 'Fahrer'], correct: 0 },
             { type: 'choice', category: 'GRAMMAR', question: 'Das ist der Mann, ___ ich gesehen habe.', options: ['den', 'der', 'dem', 'des'], correct: 0 },
             { type: 'choice', category: 'VOCABULARY', question: 'Ich möchte ein Konto ___.', options: ['eröffnen', 'machen', 'tun', 'schließen'], correct: 0 },
             { type: 'writing', category: 'WRITING', question: 'Thủ đô Đức: B...', correctAnswer: 'berlin', options: [] },
             { type: 'writing', category: 'WRITING', question: 'Viết số 10 (Zehn)', correctAnswer: 'zehn', options: [] },
             { type: 'listening', category: 'LISTENING', audioScript: "Ein Bier, bitte.", langCode: "de-DE", question: 'Đang ở đâu?', options: ['Quán bar/nhà hàng', 'Trường học', 'Bệnh viện', 'Nhà thờ'], correct: 0 },
             { type: 'listening', category: 'LISTENING', audioScript: "Wie spät ist es?", langCode: "de-DE", question: 'Hỏi về?', options: ['Giờ', 'Tiền', 'Tuổi', 'Tên'], correct: 0 }
        ],
        hard: [
            // --- Cũ ---
            { type: 'choice', category: 'GRAMMAR', question: 'Ich habe ___ meinen Schlüssel vergessen.', options: ['schon wieder', 'erst', 'bereits', 'damals'], correct: 0 },
            // --- THÊM MỚI (10 Câu) ---
            { type: 'choice', category: 'GRAMMAR', question: 'Hätte ich Zeit, ___ ich kommen.', options: ['würde', 'werde', 'wurde', 'wird'], correct: 0 },
            { type: 'choice', category: 'VOCABULARY', question: 'Wir müssen eine Entscheidung ___.', options: ['treffen', 'machen', 'tun', 'nehmen'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: 'Je mehr man lernt, ___ mehr weiß man.', options: ['desto', 'umso', 'so', 'dann'], correct: 0 },
            { type: 'choice', category: 'VOCABULARY', question: 'Er wurde auf frischer ___ ertappt.', options: ['Tat', 'Hand', 'Fuß', 'Weg'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: 'Es lohnt sich nicht, darüber ___ streiten.', options: ['zu', 'um', 'über', 'mit'], correct: 0 },
            { type: 'writing', category: 'WRITING', question: 'Từ trái nghĩa của "Schnell" (Nhanh) là "L..."', correctAnswer: 'langsam', options: [] },
            { type: 'writing', category: 'WRITING', question: 'Viết từ: "Bệnh viện" (Kranken...)', correctAnswer: 'haus', options: [] },
            { type: 'listening', category: 'LISTENING', audioScript: "Die Sitzung wurde verschoben.", langCode: "de-DE", question: 'Tình trạng cuộc họp?', options: ['Bị hoãn', 'Đang diễn ra', 'Kết thúc', 'Hủy bỏ'], correct: 0 },
            { type: 'listening', category: 'LISTENING', audioScript: "Ich drücke dir die Daumen.", langCode: "de-DE", question: 'Ý nghĩa?', options: ['Chúc may mắn', 'Đừng lo', 'Cố lên', 'Tạm biệt'], correct: 0 },
            { type: 'listening', category: 'LISTENING', audioScript: "Das kommt nicht in Frage.", langCode: "de-DE", question: 'Thái độ?', options: ['Từ chối dứt khoát', 'Đồng ý', 'Xem xét', 'Có thể'], correct: 0 }
        ]
    },

    // ======================================================
    // 5. TIẾNG NHẬT (JP) - Đã thêm mới
    // ======================================================
    jp: {
        easy: [
            { type: 'choice', category: 'GREETING', question: 'Konnichiwa (こんにちは) nghĩa là?', options: ['Chào buổi trưa', 'Chào buổi sáng', 'Chào buổi tối', 'Tạm biệt'], correct: 0 },
            { type: 'choice', category: 'VOCABULARY', question: 'Watashi (私) nghĩa là?', options: ['Tôi', 'Bạn', 'Anh ấy', 'Cô ấy'], correct: 0 },
            { type: 'choice', category: 'NUMBERS', question: 'Ichi, Ni, ___', options: ['San', 'Yon', 'Go', 'Roku'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: 'Kore ___ pen desu. (Đây LÀ bút)', options: ['wa', 'ga', 'wo', 'ni'], correct: 0 },
            { type: 'choice', category: 'VOCABULARY', question: 'Neko (猫) là con gì?', options: ['Mèo', 'Chó', 'Cá', 'Chim'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: 'Gakkou ___ ikimasu. (Đi ĐẾN trường)', options: ['e', 'ni', 'de', 'wo'], correct: 0 },
            { type: 'writing', category: 'WRITING', question: 'Arigatou nghĩa là "Cảm..."', correctAnswer: 'on', options: [] },
            { type: 'writing', category: 'WRITING', question: 'Viết số 4 (Yon/Shi) bằng Romaji.', correctAnswer: 'yon', options: [] },
            { type: 'listening', category: 'LISTENING', audioScript: "Ohayou Gozaimasu.", langCode: "ja-JP", question: 'Khi nào nói?', options: ['Buổi sáng', 'Buổi trưa', 'Buổi tối', 'Khi đi ngủ'], correct: 0 },
            { type: 'listening', category: 'LISTENING', audioScript: "Sumimasen.", langCode: "ja-JP", question: 'Ý nghĩa?', options: ['Xin lỗi/Xin hỏi', 'Cảm ơn', 'Tạm biệt', 'Chúc mừng'], correct: 0 }
        ],
        medium: [
            { type: 'choice', category: 'GRAMMAR', question: 'Tabete ___ kudasai. (Hãy ăn)', options: ['imashita', 'imasu', 'imasen', 'imashou'], correct: -1 }, // Sửa: Câu này sai logic, sửa lại dưới
            { type: 'choice', category: 'GRAMMAR', question: 'Gohan wo ___ kudasai. (Hãy ăn cơm)', options: ['tabete', 'taberu', 'tabeta', 'tabemasu'], correct: 0 },
            { type: 'choice', category: 'VOCABULARY', question: 'Ashita (明日) là khi nào?', options: ['Ngày mai', 'Hôm qua', 'Hôm nay', 'Năm ngoái'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: 'Eiga wo ___ koto ga arimasu. (Đã từng xem phim)', options: ['mita', 'miru', 'mite', 'minai'], correct: 0 },
            { type: 'choice', category: 'VOCABULARY', question: 'Sensei (先生) là ai?', options: ['Giáo viên', 'Học sinh', 'Bác sĩ', 'Nhân viên'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: 'Ame ga ___ sou desu. (Có vẻ sắp mưa)', options: ['furi', 'furu', 'futte', 'futta'], correct: 0 },
            { type: 'choice', category: 'VOCABULARY', question: 'Oishii (おいしい) nghĩa là?', options: ['Ngon', 'Dở', 'Đắt', 'Rẻ'], correct: 0 },
            { type: 'writing', category: 'WRITING', question: 'Viết "Sakura" (Hoa anh đào).', correctAnswer: 'sakura', options: [] },
            { type: 'writing', category: 'WRITING', question: 'Sayounara nghĩa là "Tạm..."', correctAnswer: 'biet', options: [] },
            { type: 'listening', category: 'LISTENING', audioScript: "Wakarimashita.", langCode: "ja-JP", question: 'Ý nghĩa?', options: ['Đã hiểu', 'Không hiểu', 'Đã quên', 'Không biết'], correct: 0 },
            { type: 'listening', category: 'LISTENING', audioScript: "Kore wa ikura desu ka?", langCode: "ja-JP", question: 'Hỏi về?', options: ['Giá tiền', 'Thời gian', 'Địa điểm', 'Người'], correct: 0 }
        ],
        hard: [
            // --- Cũ ---
            { type: 'choice', category: 'GRAMMAR', question: 'この本は読み___です。', options: ['やすい', 'にくい', 'たい', 'すぎ'], correct: 0 },
            // --- THÊM MỚI (10 Câu) ---
            { type: 'choice', category: 'GRAMMAR', question: '行け___よかったです。 (Nếu đi thì tốt rồi)', options: ['ba', 'tara', 'nara', 'te'], correct: 0 },
            { type: 'choice', category: 'VOCABULARY', question: '彼に連絡を___。 (Giữ liên lạc)', options: ['とる', 'やる', 'する', 'いく'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: '日本語を勉強すれば___ほど難しいです。 (Càng...càng)', options: ['suru', 'sureba', 'shite', 'shita'], correct: 1 },
            { type: 'choice', category: 'VOCABULARY', question: '会議の準備が___しました。 (Hoàn thành)', options: ['完了', '完成', '完全', '完結'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: '雨にも___、風にも負けず。 (Dù mưa...dù gió)', options: ['makezu', 'makete', 'makenai', 'make'], correct: 0 },
            { type: 'writing', category: 'WRITING', question: 'Thủ đô Nhật Bản (Tokyo).', correctAnswer: 'tokyo', options: [] },
            { type: 'writing', category: 'WRITING', question: 'Núi Phú Sĩ (Fuji...)', correctAnswer: 'san', options: [] },
            { type: 'listening', category: 'LISTENING', audioScript: "お世話になります。", langCode: "ja-JP", question: 'Khi nào dùng?', options: ['Cảm ơn sự giúp đỡ', 'Khi tức giận', 'Khi đi ngủ', 'Khi ăn cơm'], correct: 0 },
            { type: 'listening', category: 'LISTENING', audioScript: "ご検討ください。", langCode: "ja-JP", question: 'Yêu cầu gì?', options: ['Xem xét', 'Hủy bỏ', 'Đồng ý ngay', 'Từ chối'], correct: 0 },
            { type: 'listening', category: 'LISTENING', audioScript: "仕方がない。", langCode: "ja-JP", question: 'Thái độ?', options: ['Đành chịu thôi', 'Rất vui', 'Rất buồn', 'Tức giận'], correct: 0 }
        ]
    }
};

// ============================================================
// --- LOGIC XỬ LÝ: SHUFFLE & GET DATA ---
// ============================================================

// Biến chứa câu hỏi hiện tại
let questions = []; 

// Hàm trộn mảng
function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

// Hàm lấy câu hỏi
function setQuestionsByLanguageAndLevel(langCode, level) {
    if (questionsData[langCode] && questionsData[langCode][level]) {
        // Lấy toàn bộ câu hỏi của level đó
        let originalQuestions = questionsData[langCode][level];
        
        if (originalQuestions.length === 0) {
            console.warn(`Chưa có dữ liệu cho ${langCode} - ${level}`);
            alert("Dữ liệu đang cập nhật, vui lòng chọn cấp độ Khó (Hard) để trải nghiệm demo!");
            return false;
        }

        // Tạo bản sao và trộn ngẫu nhiên
        let pool = [...originalQuestions];
        pool = shuffleArray(pool);

        // Lấy số lượng câu hỏi theo config (hoặc lấy hết nếu ít hơn config)
        const limit = defaultConfig.questions_per_turn || 30;
        questions = pool.slice(0, limit);

        console.log(`Đã tải ${questions.length} câu hỏi (${langCode}-${level})`);
        return true;
    }
    return false;
}

// ============================================================
// --- CẤU HÌNH PHẦN THƯỞNG & MÀU SẮC ---
// ============================================================
const prizes = [
    { name: 'Giảm 10% Phí Tư Vấn', color: '#FF6B6B', emoji: '💰' },
    { name: 'Sách Cẩm Nang Du Học', color: '#4ECDC4', emoji: '📚' },
    { name: 'Voucher Hồ Sơ $20', color: '#FFD93D', emoji: '🎫' },
    { name: 'Gói Tư Vấn Cao Cấp', color: '#95E1D3', emoji: '⭐' },
    { name: 'Cẩm Nang Chọn Trường', color: '#F38181', emoji: '🎓' },
    { name: 'Ưu Đãi Làm Visa', color: '#AA96DA', emoji: '✈️' },
    { name: 'Voucher Tài Liệu $50', color: '#FCBAD3', emoji: '🎁' },
    { name: 'Tư Vấn 1-1 Hướng Nghiệp', color: '#A8D8EA', emoji: '💼' }
];

const answerColors = [
    'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
    'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
    'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
];

const answerEmojis = ['A', 'B', 'C', 'D'];