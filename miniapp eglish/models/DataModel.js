const defaultConfig = {
    quiz_title: 'Đánh Giá Năng Lực Ngoại Ngữ Quốc Tế',
    quiz_subtitle: 'Cấp độ: Nâng cao (Advanced) - 30 Câu hỏi',
    start_button_text: 'Bắt Đầu Thử Thách 🚀',
    consent_text: 'Tôi đồng ý cung cấp số điện thoại để nhận kết quả chi tiết qua Zalo',
    congratulations_text: 'Xuất sắc! Bạn đã hoàn thành bài kiểm tra năng lực.',
    background_color: '#1e3a8a',
    card_color: '#ffffff',
    text_color: '#1f2937',
    primary_action_color: '#2563eb',
    font_family: 'Poppins'
};

// --- DỮ LIỆU 30 CÂU HỎI FULL SKILL (HARD MODE) ---
const questionsData = {
    // ======================================================
    // 1. TIẾNG ANH (TOEIC/IELTS STYLE) - 30 CÂU
    // ======================================================
    en: [
        // --- PART 1: GRAMMAR & VOCABULARY (1-18) ---
        { type: 'choice', category: 'GRAMMAR', question: 'The board of directors ___ the proposal for the new marketing strategy yesterday.', options: ['approve', 'approved', 'approves', 'approving'], correct: 1 },
        { type: 'choice', category: 'VOCABULARY', question: 'Despite his extensive experience, he was not ___ for the position.', options: ['eligible', 'legible', 'illicit', 'elemental'], correct: 0 },
        { type: 'choice', category: 'GRAMMAR', question: 'By the time you arrive, we ___ the meeting.', options: ['will finish', 'will have finished', 'finished', 'have finished'], correct: 1 },
        { type: 'choice', category: 'VOCABULARY', question: 'The company needs to ___ its expenses to avoid bankruptcy.', options: ['expand', 'curtail', 'prolong', 'inflate'], correct: 1 },
        { type: 'choice', category: 'GRAMMAR', question: 'Had I known about the traffic, I ___ earlier.', options: ['would leave', 'will leave', 'would have left', 'left'], correct: 2 },
        { type: 'choice', category: 'VOCABULARY', question: 'Please ___ the attached document for further details.', options: ['review', 'remind', 'recall', 'resemble'], correct: 0 },
        { type: 'choice', category: 'GRAMMAR', question: 'The new policy is neither practical ___ cost-effective.', options: ['or', 'nor', 'and', 'but'], correct: 1 },
        { type: 'choice', category: 'VOCABULARY', question: 'He is highly ___ in three languages.', options: ['proficient', 'efficient', 'sufficient', 'deficient'], correct: 0 },
        { type: 'choice', category: 'GRAMMAR', question: 'The manager suggested that she ___ the conference next week.', options: ['attend', 'attends', 'attended', 'attending'], correct: 0 },
        { type: 'choice', category: 'READING', question: 'Sign: "Authorized Personnel Only". Where would you see this?', options: ['In a public park', 'In a restricted lab', 'In a supermarket', 'At a bus stop'], correct: 1 },
        { type: 'choice', category: 'VOCABULARY', question: 'We need to find a ___ solution to this problem.', options: ['feasible', 'fictional', 'fearful', 'fragile'], correct: 0 },
        { type: 'choice', category: 'GRAMMAR', question: 'Rarely ___ such a magnificent performance.', options: ['I have seen', 'have I seen', 'seen I have', 'I saw'], correct: 1 },
        { type: 'choice', category: 'VOCABULARY', question: 'The merger will ___ significant benefits for both parties.', options: ['generate', 'generalize', 'generous', 'genetic'], correct: 0 },
        { type: 'choice', category: 'GRAMMAR', question: 'She is used to ___ under pressure.', options: ['work', 'working', 'worked', 'works'], correct: 1 },
        { type: 'choice', category: 'READING', question: 'Email: "Please RSVP by Friday." What must you do?', options: ['Ignore the email', 'Respond to confirm attendance', 'Delete the email', 'Forward to a friend'], correct: 1 },
        { type: 'choice', category: 'VOCABULARY', question: 'The annual ___ will be held at the Hilton Hotel.', options: ['convention', 'invention', 'prevention', 'intention'], correct: 0 },
        { type: 'choice', category: 'GRAMMAR', question: '___ raining, we went for a walk.', options: ['Despite', 'Although', 'Even though', 'However'], correct: 0 },
        { type: 'choice', category: 'VOCABULARY', question: 'He was ___ for his outstanding contribution to science.', options: ['rewarded', 'awarded', 'forwarded', 'discarded'], correct: 1 },

        // --- PART 2: LISTENING (19-27) ---
        { type: 'listening', category: 'LISTENING', audioScript: "Attention passengers, the flight to New York has been delayed due to severe weather conditions.", langCode: "en-US", question: 'Why is the flight delayed?', options: ['Technical issue', 'Bad weather', 'Strike', 'Security check'], correct: 1 },
        { type: 'listening', category: 'LISTENING', audioScript: "Could you please send me the quarterly financial report by the end of the day?", langCode: "en-US", question: 'What is the speaker asking for?', options: ['A marketing plan', 'A financial report', 'A meeting schedule', 'A vacation request'], correct: 1 },
        { type: 'listening', category: 'LISTENING', audioScript: "I'm afraid Mr. Johnson is in a meeting right now. Would you like to leave a message?", langCode: "en-US", question: 'Where is Mr. Johnson?', options: ['At lunch', 'On vacation', 'In a meeting', 'At home'], correct: 2 },
        { type: 'listening', category: 'LISTENING', audioScript: "The deadline for the project has been extended to next Monday.", langCode: "en-US", question: 'When is the new deadline?', options: ['This Friday', 'Next Monday', 'Tomorrow', 'Next month'], correct: 1 },
        { type: 'listening', category: 'LISTENING', audioScript: "We are offering a 20% discount on all winter clothing this weekend only.", langCode: "en-US", question: 'What is on sale?', options: ['Electronics', 'Furniture', 'Winter clothing', 'Groceries'], correct: 2 },
        { type: 'listening', category: 'LISTENING', audioScript: "To access your account, please enter your four-digit PIN code.", langCode: "en-US", question: 'What does the user need to enter?', options: ['A password', 'A username', 'A PIN code', 'An email address'], correct: 2 },
        { type: 'listening', category: 'LISTENING', audioScript: "Dr. Smith usually sees patients from 9 AM to 5 PM, Monday through Friday.", langCode: "en-US", question: 'When does Dr. Smith see patients?', options: ['Weekends only', '9 AM to 5 PM on weekdays', '24 hours a day', 'Only on Mondays'], correct: 1 },
        { type: 'listening', category: 'LISTENING', audioScript: "The traffic is terrible on the highway this morning. You should take the train.", langCode: "en-US", question: 'What does the speaker suggest?', options: ['Driving faster', 'Taking the bus', 'Taking the train', 'Staying home'], correct: 2 },
        { type: 'listening', category: 'LISTENING', audioScript: "I would like to make a reservation for two people at 7 PM tonight.", langCode: "en-US", question: 'What is the speaker doing?', options: ['Buying tickets', 'Booking a table', 'Reserving a hotel room', 'Ordering food'], correct: 1 },

        // --- PART 3: WRITING (28-30) ---
        { type: 'writing', category: 'WRITING', question: 'Write a formal email (50-80 words) to apply for a "Senior Marketing Executive" position.', options: [] },
        { type: 'writing', category: 'WRITING', question: 'Do you agree or disagree: "Technology makes people less sociable." Explain why (3-4 sentences).', options: [] },
        { type: 'writing', category: 'WRITING', question: 'Describe your ideal working environment.', options: [] }
    ],

    // ======================================================
    // 2. TIẾNG TRUNG (HSK 3-4 STYLE) - 30 CÂU
    // ======================================================
    zh: [
        // --- PART 1: GRAMMAR & VOCABULARY (1-18) ---
        { type: 'choice', category: 'GRAMMAR', question: '这本书我___看完了。', options: ['已经', '正在', '一边', '就'], correct: 0 }, // Đã xem xong
        { type: 'choice', category: 'VOCABULARY', question: '为了健康，你应该多___运动。', options: ['参加', '参观', '比赛', '检查'], correct: 0 }, // Tham gia
        { type: 'choice', category: 'GRAMMAR', question: '那个苹果被弟弟___了。', options: ['吃', '吃完', '吃掉', '好吃'], correct: 2 }, // Bị ăn mất (Passive)
        { type: 'choice', category: 'VOCABULARY', question: '如果你有困难，尽管___我。', options: ['告诉', '说话', '谈话', '讨论'], correct: 0 }, // Nói với tôi
        { type: 'choice', category: 'GRAMMAR', question: '他比我___三岁。', options: ['大', '很', '太', '非常'], correct: 0 }, // Lớn hơn 3 tuổi
        { type: 'choice', category: 'VOCABULARY', question: '这里的风景非常___。', options: ['漂亮', '高兴', '热情', '努力'], correct: 0 }, // Đẹp
        { type: 'choice', category: 'GRAMMAR', question: '虽然今天下雨，___他还是来了。', options: ['所以', '但是', '因为', '而且'], correct: 1 }, // Tuy nhiên
        { type: 'choice', category: 'VOCABULARY', question: '请把护照和机票___给我。', options: ['出示', '出现', '出发', '出来'], correct: 0 }, // Xuất trình
        { type: 'choice', category: 'GRAMMAR', question: '这件衣服___便宜___好看。', options: ['又...又', '虽然...但是', '因为...所以', '不但...而且'], correct: 0 }, // Vừa...vừa
        { type: 'choice', category: 'READING', question: '“禁止吸烟” (Jìnzhǐ xīyān) 在哪里常见？', options: ['饭馆', '家里', '加油站', '公园'], correct: 2 }, // Cấm hút thuốc (Trạm xăng)
        { type: 'choice', category: 'VOCABULARY', question: '我对中国的历史很感___。', options: ['兴趣', '有趣', '爱好', '意思'], correct: 0 }, // Hứng thú
        { type: 'choice', category: 'GRAMMAR', question: '快点儿，火车___开了。', options: ['正在', '马上', '已经', '一直'], correct: 1 }, // Sắp chạy
        { type: 'choice', category: 'VOCABULARY', question: '这次会议的主要___是讨论环保问题。', options: ['目的', '眼睛', '节目', '要求'], correct: 0 }, // Mục đích
        { type: 'choice', category: 'GRAMMAR', question: '你看___那个穿红裙子的女孩了吗？', options: ['见', '看', '视', '望'], correct: 0 }, // Nhìn thấy (Resultative)
        { type: 'choice', category: 'VOCABULARY', question: '我们要___保护环境。', options: ['注意', '愿意', '满意', '同意'], correct: 0 }, // Chú ý
        { type: 'choice', category: 'GRAMMAR', question: '除了英语以外，他___会说法语。', options: ['都', '还', '就', '才'], correct: 1 }, // Còn biết
        { type: 'choice', category: 'VOCABULARY', question: '这道菜的味道有点儿___。', options: ['咸', '盐', '烟', '严'], correct: 0 }, // Mặn
        { type: 'choice', category: 'GRAMMAR', question: '把桌子上的书___起来。', options: ['收', '放', '看', '读'], correct: 0 }, // Dọn/Thu lại

        // --- PART 2: LISTENING (19-27) ---
        { type: 'listening', category: 'LISTENING', audioScript: "请问，去天安门广场怎么走？", langCode: "zh-CN", question: '说话人想去哪里？', options: ['火车站', '天安门广场', '飞机场', '长城'], correct: 1 },
        { type: 'listening', category: 'LISTENING', audioScript: "我觉得这件衣服有点儿贵，可以便宜一点儿吗？", langCode: "zh-CN", question: '说话人在做什么？', options: ['买衣服', '吃饭', '看电影', '坐车'], correct: 0 },
        { type: 'listening', category: 'LISTENING', audioScript: "明天可能会下雪，记得多穿点衣服。", langCode: "zh-CN", question: '明天天气怎么样？', options: ['晴天', '下雨', '下雪', '刮风'], correct: 2 },
        { type: 'listening', category: 'LISTENING', audioScript: "我的手机不见了，你能帮我找一下吗？", langCode: "zh-CN", question: '说话人丢了什么？', options: ['钱包', '钥匙', '手机', '护照'], correct: 2 },
        { type: 'listening', category: 'LISTENING', audioScript: "会议将在下午三点开始，请准时参加。", langCode: "zh-CN", question: '会议几点开始？', options: ['两点', '三点', '四点', '五点'], correct: 1 },
        { type: 'listening', category: 'LISTENING', audioScript: "我很喜欢吃中国菜，特别是烤鸭。", langCode: "zh-CN", question: '说话人最喜欢吃什么？', options: ['饺子', '面条', '烤鸭', '火锅'], correct: 2 },
        { type: 'listening', category: 'LISTENING', audioScript: "医生说我需要多休息，多喝水。", langCode: "zh-CN", question: '医生建议做什么？', options: ['多运动', '多休息', '多吃饭', '多工作'], correct: 1 },
        { type: 'listening', category: 'LISTENING', audioScript: "我在图书馆看书，这里很安静。", langCode: "zh-CN", question: '说话人在哪里？', options: ['公园', '图书馆', '超市', '学校'], correct: 1 },
        { type: 'listening', category: 'LISTENING', audioScript: "祝你生日快乐，这是送给你的礼物。", langCode: "zh-CN", question: '今天是什么日子？', options: ['新年', '圣诞节', '生日', '春节'], correct: 2 },

        // --- PART 3: WRITING (28-30) ---
        { type: 'writing', category: 'WRITING', question: '请写一段话介绍你的家乡（50个字左右）。', options: [] },
        { type: 'writing', category: 'WRITING', question: '你认为学习中文难不难？为什么？', options: [] },
        { type: 'writing', category: 'WRITING', question: '描述一下你最难忘的一次旅行。', options: [] }
    ],

    // ======================================================
    // 3. TIẾNG HÀN (TOPIK II STYLE) - 30 CÂU
    // ======================================================
    kr: [
        // --- PART 1: GRAMMAR & VOCABULARY (1-18) ---
        { type: 'choice', category: 'GRAMMAR', question: '비가 ___ 우산을 썼어요.', options: ['와서', '오면', '오지만', '오려고'], correct: 0 }, // Vì...nên
        { type: 'choice', category: 'VOCABULARY', question: '한국 회사에 ___ 싶어요.', options: ['취직하고', '입학하고', '졸업하고', '퇴원하고'], correct: 0 }, // Xin việc
        { type: 'choice', category: 'GRAMMAR', question: '저는 어제 영화를 ___ 못했어요.', options: ['안', '못', '지', '아니'], correct: 1 }, // Không thể (khách quan)
        { type: 'choice', category: 'VOCABULARY', question: '회의 시간에는 휴대전화를 ___ 합니다.', options: ['꺼야', '켜야', '사야', '봐야'], correct: 0 }, // Phải tắt
        { type: 'choice', category: 'GRAMMAR', question: '이 옷은 비싸기는 하지만 ___.', options: ['좋아요', '나빠요', '작아요', '커요'], correct: 0 }, // Tuy đắt nhưng tốt
        { type: 'choice', category: 'VOCABULARY', question: '친구와 약속을 ___.', options: ['지켰어요', '잃었어요', '잊었어요', '찾았어요'], correct: 0 }, // Giữ lời hứa
        { type: 'choice', category: 'GRAMMAR', question: '동생이 밥을 먹는 ___ 텔레비전을 봅니다.', options: ['동안', '후에', '전에', '때'], correct: 0 }, // Trong khi
        { type: 'choice', category: 'VOCABULARY', question: '건강을 위해서 매일 ___을 합니다.', options: ['운동', '공부', '쇼핑', '여행'], correct: 0 }, // Tập thể dục
        { type: 'choice', category: 'GRAMMAR', question: '선생님, 말씀 좀 ___ 되겠습니까?', options: ['여쭈어도', '물어도', '말해도', '들어도'], correct: 0 }, // Kính ngữ hỏi
        { type: 'choice', category: 'READING', question: '"촬영 금지"는 무슨 뜻입니까?', options: ['사진을 찍지 마십시오', '들어오지 마십시오', '먹지 마십시오', '뛰지 마십시오'], correct: 0 }, // Cấm chụp ảnh
        { type: 'choice', category: 'VOCABULARY', question: '시험에 ___ 기분이 좋아요.', options: ['합격해서', '떨어져서', '실패해서', '공부해서'], correct: 0 }, // Đậu kỳ thi
        { type: 'choice', category: 'GRAMMAR', question: '집에 ___마자 손을 씻어요.', options: ['가자', '오자', '먹자', '하자'], correct: 0 }, // Ngay sau khi về (ca-ja-ma-ja)
        { type: 'choice', category: 'VOCABULARY', question: '이 문제는 너무 어려워서 ___ 수가 없어요.', options: ['풀', '살', '탈', '할'], correct: 0 }, // Giải quyết
        { type: 'choice', category: 'GRAMMAR', question: '제주도에 ___ 적이 있어요?', options: ['가 본', '가는', '갈', '간'], correct: 0 }, // Đã từng đi
        { type: 'choice', category: 'VOCABULARY', question: '부모님께 용돈을 ___.', options: ['드렸어요', '주었어요', '받았어요', '빌렸어요'], correct: 0 }, // Biếu (kính ngữ)
        { type: 'choice', category: 'GRAMMAR', question: '내일 날씨가 ___ 같아요.', options: ['추울 것', '춥', '추운', '추워서'], correct: 0 }, // Có vẻ sẽ lạnh
        { type: 'choice', category: 'VOCABULARY', question: '한국의 전통 ___은 한복입니다.', options: ['옷', '집', '음식', '노래'], correct: 0 }, // Quần áo
        { type: 'choice', category: 'GRAMMAR', question: '한국어를 잘 ___ 열심히 공부해야 해요.', options: ['하려면', '하면서', '하거나', '하니까'], correct: 0 }, // Nếu muốn giỏi

        // --- PART 2: LISTENING (19-27) ---
        { type: 'listening', category: 'LISTENING', audioScript: "이번 역은 서울역입니다. 내리실 문은 오른쪽입니다.", langCode: "ko-KR", question: '여기는 어디입니까?', options: ['지하철', '비행기', '택시', '자전거'], correct: 0 },
        { type: 'listening', category: 'LISTENING', audioScript: "손님, 주문하시겠습니까? 무엇을 드릴까요?", langCode: "ko-KR", question: '여기는 어디입니까?', options: ['식당', '도서관', '병원', '은행'], correct: 0 },
        { type: 'listening', category: 'LISTENING', audioScript: "저는 주말에 보통 등산을 가요. 산에 가면 기분이 좋아져요.", langCode: "ko-KR", question: '남자의 취미는 무엇입니까?', options: ['등산', '수영', '독서', '요리'], correct: 0 },
        { type: 'listening', category: 'LISTENING', audioScript: "죄송하지만, 사진 좀 찍어 주시겠어요?", langCode: "ko-KR", question: '여자는 무엇을 부탁하고 있습니까?', options: ['사진 찍기', '길 찾기', '짐 들기', '전화하기'], correct: 0 },
        { type: 'listening', category: 'LISTENING', audioScript: "내일 오후 2시에 회의실에서 뵙겠습니다.", langCode: "ko-KR", question: '언제 만납니까?', options: ['내일 오후 2시', '오늘 오후 2시', '내일 오전 2시', '모레 오후 2시'], correct: 0 },
        { type: 'listening', category: 'LISTENING', audioScript: "이 가방은 얼마예요? 너무 비싸요. 좀 깎아 주세요.", langCode: "ko-KR", question: '여자는 무엇을 하고 있습니까?', options: ['물건 사기', '길 묻기', '인사하기', '공부하기'], correct: 0 },
        { type: 'listening', category: 'LISTENING', audioScript: "머리가 아프고 열이 나요. 오늘 회사에 못 갈 것 같아요.", langCode: "ko-KR", question: '남자는 왜 회사에 못 갑니까?', options: ['아파서', '바빠서', '늦잠 자서', '약속이 있어서'], correct: 0 },
        { type: 'listening', category: 'LISTENING', audioScript: "한국어 능력 시험 접수 기간은 다음 주 월요일부터입니다.", langCode: "ko-KR", question: '무엇에 대한 안내입니까?', options: ['시험 접수', '수업 시간', '방학 기간', '졸업 식'], correct: 0 },
        { type: 'listening', category: 'LISTENING', audioScript: "축하합니다! 이번 달 우수 사원으로 뽑히셨어요.", langCode: "ko-KR", question: '남자는 어떤 소식을 들었습니까?', options: ['우수 사원 선정', '승진 실패', '해고 통보', '전근 명령'], correct: 0 },

        // --- PART 3: WRITING (28-30) ---
        { type: 'writing', category: 'WRITING', question: '자신의 꿈에 대해 쓰십시오 (50자 이상).', options: [] },
        { type: 'writing', category: 'WRITING', question: '가장 존경하는 사람은 누구입니까? 그 이유는 무엇입니까?', options: [] },
        { type: 'writing', category: 'WRITING', question: '한국에서 하고 싶은 일을 구체적으로 계획해 보십시오.', options: [] }
    ],

    // ======================================================
    // 4. TIẾNG ĐỨC (GOETHE B1 STYLE) - 30 CÂU
    // ======================================================
    de: [
        // --- PART 1: GRAMMAR & VOCABULARY (1-18) ---
        { type: 'choice', category: 'GRAMMAR', question: 'Ich habe ___ meinen Schlüssel vergessen.', options: ['schon wieder', 'erst', 'bereits', 'damals'], correct: 0 }, // Lại quên
        { type: 'choice', category: 'GRAMMAR', question: 'Das ist der Mann, ___ ich geholfen habe.', options: ['dem', 'den', 'der', 'des'], correct: 0 }, // Dative relative
        { type: 'choice', category: 'VOCABULARY', question: 'Wir müssen einen Termin ___.', options: ['vereinbaren', 'machen', 'tun', 'stellen'], correct: 0 }, // Hẹn lịch
        { type: 'choice', category: 'GRAMMAR', question: 'Wenn ich Zeit hätte, ___ ich dich besuchen.', options: ['würde', 'werde', 'wurde', 'wird'], correct: 0 }, // Konjunktiv II
        { type: 'choice', category: 'VOCABULARY', question: 'Die Prüfung war sehr ___.', options: ['anstrengend', 'streng', 'eng', 'langweilig'], correct: 0 }, // Căng thẳng
        { type: 'choice', category: 'GRAMMAR', question: 'Ich interessiere mich ___ Musik.', options: ['für', 'über', 'an', 'auf'], correct: 0 }, // Quan tâm đến
        { type: 'choice', category: 'VOCABULARY', question: 'Bitte ___ Sie das Formular aus.', options: ['füllen', 'schreiben', 'machen', 'geben'], correct: 0 }, // Điền form
        { type: 'choice', category: 'GRAMMAR', question: 'Obwohl er krank war, ___ er zur Arbeit.', options: ['ging', 'geht', 'gegangen', 'gehen'], correct: 0 }, // Mặc dù... vẫn đi
        { type: 'choice', category: 'VOCABULARY', question: 'Ich möchte mich um diese Stelle ___.', options: ['bewerben', 'werben', 'anwerben', 'erwerben'], correct: 0 }, // Ứng tuyển
        { type: 'choice', category: 'READING', question: 'Schild: "Rauchen verboten". Was bedeutet das?', options: ['Man darf hier nicht rauchen', 'Man darf hier rauchen', 'Rauchen ist gesund', 'Rauchen ist billig'], correct: 0 },
        { type: 'choice', category: 'GRAMMAR', question: 'Hast du das Buch ___ gelesen?', options: ['schon', 'noch', 'erst', 'bereits'], correct: 0 }, // Đã đọc chưa
        { type: 'choice', category: 'VOCABULARY', question: 'Der Zug hat zehn Minuten ___.', options: ['Verspätung', 'Spät', 'Verzögerung', 'Pause'], correct: 0 }, // Trễ
        { type: 'choice', category: 'GRAMMAR', question: 'Ich warte ___ den Bus.', options: ['auf', 'an', 'in', 'zu'], correct: 0 }, // Đợi xe buýt
        { type: 'choice', category: 'VOCABULARY', question: 'Kannst du mir einen ___ geben?', options: ['Rat', 'Rad', 'Tat', 'Satz'], correct: 0 }, // Lời khuyên
        { type: 'choice', category: 'GRAMMAR', question: 'Nachdem er gegessen hatte, ___ er ins Bett.', options: ['ging', 'geht', 'gegangen', 'gehen'], correct: 0 }, // Plusquamperfekt
        { type: 'choice', category: 'VOCABULARY', question: 'Die Miete für diese Wohnung ist sehr ___.', options: ['hoch', 'groß', 'viel', 'stark'], correct: 0 }, // Giá thuê cao
        { type: 'choice', category: 'GRAMMAR', question: 'Ich lasse mein Auto ___ reparieren.', options: ['morgen', 'gestern', 'heute', 'jetzt'], correct: 0 }, // Để xe sửa
        { type: 'choice', category: 'VOCABULARY', question: 'Vielen Dank für Ihre ___.', options: ['Aufmerksamkeit', 'Vorsicht', 'Sicht', 'Aussicht'], correct: 0 }, // Sự chú ý

        // --- PART 2: LISTENING (19-27) ---
        { type: 'listening', category: 'LISTENING', audioScript: "Achtung am Gleis 3: Der Zug nach München hat 20 Minuten Verspätung.", langCode: "de-DE", question: 'Was ist das Problem?', options: ['Der Zug ist pünktlich', 'Der Zug ist verspätet', 'Der Zug fällt aus', 'Gleiswechsel'], correct: 1 },
        { type: 'listening', category: 'LISTENING', audioScript: "Haben Sie diesen Pullover auch in Größe M?", langCode: "de-DE", question: 'Wo ist der Sprecher?', options: ['Im Supermarkt', 'Im Kleidergeschäft', 'In der Apotheke', 'Im Kino'], correct: 1 },
        { type: 'listening', category: 'LISTENING', audioScript: "Bitte schnallen Sie sich an, wir landen in Kürze.", langCode: "de-DE", question: 'Wo hören Sie diese Ansage?', options: ['Im Flugzeug', 'Im Bus', 'Im Zug', 'Im Auto'], correct: 0 },
        { type: 'listening', category: 'LISTENING', audioScript: "Ich hätte gerne einen Termin bei Dr. Müller.", langCode: "de-DE", question: 'Was möchte der Sprecher?', options: ['Einen Arzttermin', 'Einen Tisch reservieren', 'Ein Hotel buchen', 'Einen Anwalt sprechen'], correct: 0 },
        { type: 'listening', category: 'LISTENING', audioScript: "Können Sie mir sagen, wie ich zum Bahnhof komme?", langCode: "de-DE", question: 'Was sucht der Sprecher?', options: ['Den Bahnhof', 'Den Flughafen', 'Das Hotel', 'Das Museum'], correct: 0 },
        { type: 'listening', category: 'LISTENING', audioScript: "Morgen wird es regnerisch und kühl.", langCode: "de-DE", question: 'Worüber spricht man?', options: ['Das Wetter', 'Den Verkehr', 'Die Politik', 'Den Sport'], correct: 0 },
        { type: 'listening', category: 'LISTENING', audioScript: "Herzlichen Glückwunsch zum Geburtstag!", langCode: "de-DE", question: 'Was ist der Anlass?', options: ['Geburtstag', 'Hochzeit', 'Weihnachten', 'Ostern'], correct: 0 },
        { type: 'listening', category: 'LISTENING', audioScript: "Die Bibliothek schließt heute um 18 Uhr.", langCode: "de-DE", question: 'Wann schließt die Bibliothek?', options: ['Um 18 Uhr', 'Um 8 Uhr', 'Um 20 Uhr', 'Um 16 Uhr'], correct: 0 },
        { type: 'listening', category: 'LISTENING', audioScript: "Ich möchte ein Konto eröffnen.", langCode: "de-DE", question: 'Wo ist der Sprecher?', options: ['In der Bank', 'In der Post', 'Im Restaurant', 'Im Hotel'], correct: 0 },

        // --- PART 3: WRITING (28-30) ---
        { type: 'writing', category: 'WRITING', question: 'Schreiben Sie eine E-Mail an Ihren Lehrer und entschuldigen Sie sich, dass Sie krank sind.', options: [] },
        { type: 'writing', category: 'WRITING', question: 'Was sind die Vor- und Nachteile vom Leben in der Stadt?', options: [] },
        { type: 'writing', category: 'WRITING', question: 'Beschreiben Sie Ihren Traumjob.', options: [] }
    ],

    // ======================================================
    // 5. TIẾNG NHẬT (JLPT N3 STYLE) - 30 CÂU
    // ======================================================
    jp: [
        // --- PART 1: GRAMMAR & VOCABULARY (1-18) ---
        { type: 'choice', category: 'GRAMMAR', question: 'この本は読み___です。', options: ['やすい', 'にくい', 'たい', 'すぎ'], correct: 0 }, // Dễ đọc (yasui)
        { type: 'choice', category: 'VOCABULARY', question: '会議の___を教えてください。', options: ['場所', '場合', '場面', '立場'], correct: 0 }, // Địa điểm (basho)
        { type: 'choice', category: 'GRAMMAR', question: '日本へ___ことがありますか。', options: ['行った', '行く', '行って', '行かない'], correct: 0 }, // Đã từng đi (ta koto ga aru)
        { type: 'choice', category: 'VOCABULARY', question: '父は会社に___います。', options: ['勤めて', '働いて', '仕事して', 'やって'], correct: 0 }, // Làm việc (tsutomete - formal)
        { type: 'choice', category: 'GRAMMAR', question: '雨が___そうです。', options: ['降り', '降る', '降って', '降った'], correct: 0 }, // Có vẻ sắp mưa (masu stem + sou)
        { type: 'choice', category: 'VOCABULARY', question: '約束の時間に___しまいました。', options: ['遅れて', '遅くて', '遅い', '遅く'], correct: 0 }, // Trễ (okurete shimau)
        { type: 'choice', category: 'GRAMMAR', question: 'もっと勉強___ばなりません。', options: ['しなけれ', 'しなくて', 'しない', 'して'], correct: 0 }, // Phải học (nakereba)
        { type: 'choice', category: 'VOCABULARY', question: '部屋を___にしてください。', options: ['きれい', 'きたない', 'しずか', 'にぎやか'], correct: 0 }, // Làm sạch (kirei ni)
        { type: 'choice', category: 'GRAMMAR', question: '先生に本を___。', options: ['いただきました', 'くださいました', 'あげました', 'やりました'], correct: 0 }, // Nhận từ thầy (itadakimashita)
        { type: 'choice', category: 'READING', question: '「立入禁止」はどういう意味ですか。', options: ['入ってはいけません', '入ってください', '立ってください', '座ってください'], correct: 0 }, // Cấm vào
        { type: 'choice', category: 'VOCABULARY', question: '彼はとても___人です。', options: ['真面目な', '真面目', '真面目く', '真面目だ'], correct: 0 }, // Nghiêm túc (majime na)
        { type: 'choice', category: 'GRAMMAR', question: 'この料理は___そうですね。', options: ['おいし', 'おいしい', 'おいしく', 'おいしさ'], correct: 0 }, // Trông ngon (oishi - i + sou)
        { type: 'choice', category: 'VOCABULARY', question: '将来の___は何ですか。', options: ['夢', '寝', '眠', '想'], correct: 0 }, // Giấc mơ/Tương lai (yume)
        { type: 'choice', category: 'GRAMMAR', question: 'ドアが___います。', options: ['開いて', '開けて', '開く', '開ける'], correct: 0 }, // Cửa đang mở (aite iru - tự động từ)
        { type: 'choice', category: 'VOCABULARY', question: 'お腹が___ました。', options: ['すき', '空き', '好き', '透き'], correct: 0 }, // Đói (sukimashita)
        { type: 'choice', category: 'GRAMMAR', question: '日本について___知っていますか。', options: ['何か', '何', '何も', '何で'], correct: 0 }, // Biết gì về NB không
        { type: 'choice', category: 'VOCABULARY', question: '風邪を___、学校を休みました。', options: ['引いて', '引く', '引いた', '引き'], correct: 0 }, // Bị cảm (hiite)
        { type: 'choice', category: 'GRAMMAR', question: 'これを___もいいですか。', options: ['使って', '使う', '使えば', '使おう'], correct: 0 }, // Dùng được không (te mo ii)

        // --- PART 2: LISTENING (19-27) ---
        { type: 'listening', category: 'LISTENING', audioScript: "次は新宿、新宿です。お出口は左側です。", langCode: "ja-JP", question: 'ここはどこですか。', options: ['電車の中', 'バスの中', 'デパート', '公園'], correct: 0 },
        { type: 'listening', category: 'LISTENING', audioScript: "いらっしゃいませ。何名様ですか。", langCode: "ja-JP", question: '店員は何を聞いていますか。', options: ['客の人数', '客の名前', '客の注文', '客の電話番号'], correct: 0 },
        { type: 'listening', category: 'LISTENING', audioScript: "明日の天気は晴れ時々曇りでしょう。", langCode: "ja-JP", question: '明日の天気はどうなりますか。', options: ['晴れか曇り', '雨', '雪', '台風'], correct: 0 },
        { type: 'listening', category: 'LISTENING', audioScript: "すみません、この近くにコンビニはありますか。", langCode: "ja-JP", question: '話している人は何を探していますか。', options: ['コンビニ', '駅', '病院', '学校'], correct: 0 },
        { type: 'listening', category: 'LISTENING', audioScript: "お誕生日おめでとうございます！これ、プレゼントです。", langCode: "ja-JP", question: '今はどんな時ですか。', options: ['誕生日', '結婚式', '正月', '卒業式'], correct: 0 },
        { type: 'listening', category: 'LISTENING', audioScript: "もしもし、田中ですが、鈴木さんはいらっしゃいますか。", langCode: "ja-JP", question: 'これは何の会話ですか。', options: ['電話', '会議', '面接', '授業'], correct: 0 },
        { type: 'listening', category: 'LISTENING', audioScript: "宿題は明日までに出してください。", langCode: "ja-JP", question: '宿題の締め切りはいつですか。', options: ['明日', '今日', '来週', '今週'], correct: 0 },
        { type: 'listening', category: 'LISTENING', audioScript: "風邪を引いたので、今日は早退させていただきます。", langCode: "ja-JP", question: '話している人はどうしたいですか。', options: ['早く帰りたい', '休みたい', '病院に行きたい', '薬を飲みたい'], correct: 0 },
        { type: 'listening', category: 'LISTENING', audioScript: "東京行きの新幹線は、3番線から発車します。", langCode: "ja-JP", question: '新幹線は何番線ですか。', options: ['3番線', '1番線', '2番線', '4番線'], correct: 0 },

        // --- PART 3: WRITING (28-30) ---
        { type: 'writing', category: 'WRITING', question: '先生に感謝のメールを書いてください。', options: [] },
        { type: 'writing', category: 'WRITING', question: '日本に行ったら、何をしたいですか。', options: [] },
        { type: 'writing', category: 'WRITING', question: '最近、一番嬉しかったことは何ですか。', options: [] }
    ]
};

// ... (Giữ nguyên các phần code bên dưới như questions, setQuestionsByLanguage, prizes, colors...)
let questions = []; 

function setQuestionsByLanguage(langCode) {
    if (questionsData[langCode]) {
        questions = questionsData[langCode];
        return true;
    }
    return false;
}

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