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
// --- DỮ LIỆU 30 CÂU HỎI MIX (ĐÃ SỬA LỖI) ---
const questionsData = {
    // ======================================================
    // 1. TIẾNG ANH (TOEIC/IELTS STYLE)
    // ======================================================
    en: [
        // --- PART 1: GRAMMAR & VOCABULARY ---
        { type: 'choice', category: 'GRAMMAR', question: 'The board of directors ___ the proposal yesterday.', options: ['approve', 'approved', 'approves', 'approving'], correct: 1 },
        
        // Câu điền từ (Đã thêm options: [] để tránh lỗi)
        { type: 'writing', category: 'GRAMMAR', question: 'I look forward _______ hearing from you soon.', correctAnswer: 'to', options: [] }, 

        { type: 'choice', category: 'GRAMMAR', question: 'By the time you arrive, we ___ the meeting.', options: ['will finish', 'will have finished', 'finished', 'have finished'], correct: 1 },
        { type: 'choice', category: 'VOCABULARY', question: 'The company needs to ___ its expenses.', options: ['expand', 'curtail', 'prolong', 'inflate'], correct: 1 },
        
        { type: 'writing', category: 'GRAMMAR', question: 'He has _______ (write) three reports today.', correctAnswer: 'written', options: [] },

        { type: 'choice', category: 'VOCABULARY', question: 'Please ___ the attached document.', options: ['review', 'remind', 'recall', 'resemble'], correct: 0 },
        { type: 'choice', category: 'GRAMMAR', question: 'The new policy is neither practical ___ cost-effective.', options: ['or', 'nor', 'and', 'but'], correct: 1 },
        { type: 'choice', category: 'VOCABULARY', question: 'He is highly ___ in three languages.', options: ['proficient', 'efficient', 'sufficient', 'deficient'], correct: 0 },
        { type: 'choice', category: 'GRAMMAR', question: 'The manager suggested that she ___ the conference.', options: ['attend', 'attends', 'attended', 'attending'], correct: 0 },
        
        { type: 'writing', category: 'VOCABULARY', question: 'Please pay _______ to the safety announcement.', correctAnswer: 'attention', options: [] },

        { type: 'choice', category: 'VOCABULARY', question: 'We need to find a ___ solution.', options: ['feasible', 'fictional', 'fearful', 'fragile'], correct: 0 },
        { type: 'choice', category: 'GRAMMAR', question: 'Rarely ___ such a magnificent performance.', options: ['I have seen', 'have I seen', 'seen I have', 'I saw'], correct: 1 },
        { type: 'choice', category: 'VOCABULARY', question: 'The merger will ___ significant benefits.', options: ['generate', 'generalize', 'generous', 'genetic'], correct: 0 },
        { type: 'choice', category: 'GRAMMAR', question: 'She is used to ___ under pressure.', options: ['work', 'working', 'worked', 'works'], correct: 1 },
        { type: 'choice', category: 'READING', question: 'RSVP means: Please ___.', options: ['Read', 'Respond', 'Return', 'Retire'], correct: 1 },
        { type: 'choice', category: 'VOCABULARY', question: 'The annual ___ will be held at the Hilton.', options: ['convention', 'invention', 'prevention', 'intention'], correct: 0 },
        { type: 'choice', category: 'GRAMMAR', question: '___ raining, we went for a walk.', options: ['Despite', 'Although', 'Even though', 'However'], correct: 0 },
        { type: 'choice', category: 'VOCABULARY', question: 'He was ___ for his contribution.', options: ['rewarded', 'awarded', 'forwarded', 'discarded'], correct: 1 },

        // --- PART 2: LISTENING ---
        { type: 'listening', category: 'LISTENING', audioScript: "Attention passengers, the flight to New York has been delayed.", langCode: "en-US", question: 'Why is the flight delayed?', options: ['Technical issue', 'Bad weather', 'Strike', 'Security'], correct: 1 },
        { type: 'listening', category: 'LISTENING', audioScript: "Send me the quarterly report by end of day.", langCode: "en-US", question: 'What is requested?', options: ['Marketing plan', 'Financial report', 'Schedule', 'Vacation'], correct: 1 },
        { type: 'listening', category: 'LISTENING', audioScript: "Mr. Johnson is in a meeting right now.", langCode: "en-US", question: 'Where is Mr. Johnson?', options: ['Lunch', 'Vacation', 'Meeting', 'Home'], correct: 2 },
        { type: 'listening', category: 'LISTENING', audioScript: "Deadline extended to next Monday.", langCode: "en-US", question: 'New deadline?', options: ['Friday', 'Monday', 'Tomorrow', 'Next month'], correct: 1 },
        { type: 'listening', category: 'LISTENING', audioScript: "20% discount on winter clothing.", langCode: "en-US", question: 'What is on sale?', options: ['Electronics', 'Furniture', 'Clothes', 'Groceries'], correct: 2 },
        { type: 'listening', category: 'LISTENING', audioScript: "Enter your four-digit PIN code.", langCode: "en-US", question: 'What to enter?', options: ['Password', 'Username', 'PIN', 'Email'], correct: 2 },
        { type: 'listening', category: 'LISTENING', audioScript: "Dr. Smith sees patients 9 to 5, Mon-Fri.", langCode: "en-US", question: 'Doctor\'s hours?', options: ['Weekends', 'Weekdays 9-5', '24/7', 'Mondays'], correct: 1 },
        { type: 'listening', category: 'LISTENING', audioScript: "Traffic is bad, take the train.", langCode: "en-US", question: 'Suggestion?', options: ['Drive fast', 'Bus', 'Train', 'Stay home'], correct: 2 },
        { type: 'listening', category: 'LISTENING', audioScript: "Reservation for two at 7 PM.", langCode: "en-US", question: 'Activity?', options: ['Buying tickets', 'Booking table', 'Hotel', 'Food order'], correct: 1 },

        // --- PART 3: WRITING ---
        { type: 'writing', category: 'WRITING', question: 'Complete the proverb: "Better late than _______."', correctAnswer: 'never', options: [] },
        { type: 'writing', category: 'WRITING', question: 'Opposite of "Expensive" is _______?', correctAnswer: 'cheap', options: [] },
        { type: 'writing', category: 'WRITING', question: 'Past tense of "Go" is _______?', correctAnswer: 'went', options: [] }
    ],

    // ======================================================
    // 2. TIẾNG TRUNG (HSK 3-4 STYLE)
    // ======================================================
    zh: [
        { type: 'choice', category: 'GRAMMAR', question: '这本书我___看完了。', options: ['已经', '正在', '一边', '就'], correct: 0 },
        
        { type: 'writing', category: 'GRAMMAR', question: '一 _______ 书 (Một quyển sách - điền lượng từ)', correctAnswer: '本', options: [] },

        { type: 'choice', category: 'GRAMMAR', question: '那个苹果被弟弟___了。', options: ['吃', '吃完', '吃掉', '好吃'], correct: 2 },
        { type: 'choice', category: 'VOCABULARY', question: '如果你有困难，尽管___我。', options: ['告诉', '说话', '谈话', '讨论'], correct: 0 },
        { type: 'choice', category: 'GRAMMAR', question: '他比我___三岁。', options: ['大', '很', '太', '非常'], correct: 0 },
        
        { type: 'writing', category: 'VOCABULARY', question: '我们坐公共汽车 _______ 吧。 (Đi)', correctAnswer: '去', options: [] },

        { type: 'choice', category: 'GRAMMAR', question: '虽然今天下雨，___他还是来了。', options: ['所以', '但是', '因为', '而且'], correct: 1 },
        { type: 'choice', category: 'VOCABULARY', question: '请把护照和机票___给我。', options: ['出示', '出现', '出发', '出来'], correct: 0 },
        { type: 'choice', category: 'GRAMMAR', question: '这件衣服___便宜___好看。', options: ['又...又', '虽然...但是', '因为...所以', '不但...而且'], correct: 0 },
        { type: 'choice', category: 'READING', question: '“禁止吸烟” (Jìnzhǐ xīyān) 在哪里常见？', options: ['饭馆', '家里', '加油站', '公园'], correct: 2 },
        { type: 'choice', category: 'VOCABULARY', question: '我对中国的历史很感___。', options: ['兴趣', '有趣', '爱好', '意思'], correct: 0 },
        { type: 'choice', category: 'GRAMMAR', question: '快点儿，火车___开了。', options: ['正在', '马上', '已经', '一直'], correct: 1 },
        
        { type: 'writing', category: 'VOCABULARY', question: '一加一等于 _______ (1 + 1 = ? Viết chữ Hán)', correctAnswer: '二', options: [] },

        { type: 'choice', category: 'GRAMMAR', question: '你看___那个穿红裙子的女孩了吗？', options: ['见', '看', '视', '望'], correct: 0 },
        { type: 'choice', category: 'VOCABULARY', question: '我们要___保护环境。', options: ['注意', '愿意', '满意', '同意'], correct: 0 },
        { type: 'choice', category: 'GRAMMAR', question: '除了英语以外，他___会说法语。', options: ['都', '还', '就', '才'], correct: 1 },
        { type: 'choice', category: 'VOCABULARY', question: '这道菜的味道有点儿___。', options: ['咸', '盐', '烟', '严'], correct: 0 },
        { type: 'choice', category: 'GRAMMAR', question: '把桌子上的书___起来。', options: ['收', '放', '看', '读'], correct: 0 },

        // --- LISTENING ---
        { type: 'listening', category: 'LISTENING', audioScript: "去天安门广场怎么走？", langCode: "zh-CN", question: '去哪里？', options: ['火车站', '天安门', '机场', '长城'], correct: 1 },
        { type: 'listening', category: 'LISTENING', audioScript: "这件衣服有点儿贵，便宜点？", langCode: "zh-CN", question: '做什么？', options: ['买衣服', '吃饭', '看电影', '坐车'], correct: 0 },
        { type: 'listening', category: 'LISTENING', audioScript: "明天可能会下雪。", langCode: "zh-CN", question: '明天天气？', options: ['晴', '雨', '雪', '风'], correct: 2 },
        { type: 'listening', category: 'LISTENING', audioScript: "我的手机不见了。", langCode: "zh-CN", question: '丢了什么？', options: ['钱包', '钥匙', '手机', '护照'], correct: 2 },
        { type: 'listening', category: 'LISTENING', audioScript: "会议下午三点开始。", langCode: "zh-CN", question: '几点开始？', options: ['2点', '3点', '4点', '5点'], correct: 1 },
        { type: 'listening', category: 'LISTENING', audioScript: "我喜欢吃烤鸭。", langCode: "zh-CN", question: '喜欢吃什么？', options: ['饺子', '面条', '烤鸭', '火锅'], correct: 2 },
        { type: 'listening', category: 'LISTENING', audioScript: "多休息，多喝水。", langCode: "zh-CN", question: '医生建议？', options: ['运动', '休息', '吃饭', '工作'], correct: 1 },
        { type: 'listening', category: 'LISTENING', audioScript: "我在图书馆看书。", langCode: "zh-CN", question: '在哪里？', options: ['公园', '图书馆', '超市', '学校'], correct: 1 },
        { type: 'listening', category: 'LISTENING', audioScript: "祝你生日快乐。", langCode: "zh-CN", question: '什么日子？', options: ['新年', '圣诞', '生日', '春节'], correct: 2 },

        // --- PART 3: WRITING ---
        { type: 'writing', category: 'WRITING', question: '“你好” 是什么意思？(Viết nghĩa tiếng Việt không dấu)', correctAnswer: 'xin chao', options: [] },
        { type: 'writing', category: 'WRITING', question: '今天是星期 _______ (Hôm nay là Chủ Nhật - điền chữ Hán)', correctAnswer: '日', options: [] },
        { type: 'writing', category: 'WRITING', question: '我是越南 _______ (Người)', correctAnswer: '人', options: [] }
    ],

    // ======================================================
    // 3. TIẾNG HÀN
    // ======================================================
    kr: [
        { type: 'choice', category: 'GRAMMAR', question: '비가 ___ 우산을 썼어요.', options: ['와서', '오면', '오지만', '오려고'], correct: 0 },
        
        { type: 'writing', category: 'GRAMMAR', question: '학교 _______ 갑니다. (Đi ĐẾN trường)', correctAnswer: '에', options: [] },

        { type: 'choice', category: 'GRAMMAR', question: '영화를 ___ 못했어요.', options: ['안', '못', '지', '아니'], correct: 1 },
        { type: 'choice', category: 'VOCABULARY', question: '휴대전화를 ___ 합니다.', options: ['꺼야', '켜야', '사야', '봐야'], correct: 0 },
        { type: 'choice', category: 'GRAMMAR', question: '비싸기는 하지만 ___.', options: ['좋아요', '나빠요', '작아요', '커요'], correct: 0 },
        
        { type: 'writing', category: 'GRAMMAR', question: '저는 학생입_______. (đuôi câu trang trọng)', correctAnswer: '니다', options: [] },

        { type: 'choice', category: 'GRAMMAR', question: '밥을 먹는 ___ 텔레비전을 봅니다.', options: ['동안', '후에', '전에', '때'], correct: 0 },
        { type: 'choice', category: 'VOCABULARY', question: '매일 ___을 합니다.', options: ['운동', '공부', '쇼핑', '여행'], correct: 0 },
        { type: 'choice', category: 'GRAMMAR', question: '말씀 좀 ___ 되겠습니까?', options: ['여쭈어도', '물어도', '말해도', '들어도'], correct: 0 },
        { type: 'choice', category: 'READING', question: '"촬영 금지" 뜻?', options: ['사진 금지', '입장 금지', '음식 금지', '뛰기 금지'], correct: 0 },
        { type: 'choice', category: 'VOCABULARY', question: '시험에 ___ 기분이 좋아요.', options: ['합격해서', '떨어져서', '실패해서', '공부해서'], correct: 0 },
        { type: 'choice', category: 'GRAMMAR', question: '집에 ___마자 손을 씻어요.', options: ['가자', '오자', '먹자', '하자'], correct: 0 },
        { type: 'choice', category: 'VOCABULARY', question: '어려워서 ___ 수가 없어요.', options: ['풀', '살', '탈', '할'], correct: 0 },
        { type: 'choice', category: 'GRAMMAR', question: '제주도에 ___ 적이 있어요?', options: ['가 본', '가는', '갈', '간'], correct: 0 },
        { type: 'choice', category: 'VOCABULARY', question: '용돈을 ___.', options: ['드렸어요', '주었어요', '받았어요', '빌렸어요'], correct: 0 },
        { type: 'choice', category: 'GRAMMAR', question: '날씨가 ___ 같아요.', options: ['추울 것', '춥', '추운', '추워서'], correct: 0 },
        { type: 'choice', category: 'VOCABULARY', question: '전통 ___은 한복입니다.', options: ['옷', '집', '음식', '노래'], correct: 0 },
        { type: 'choice', category: 'GRAMMAR', question: '열심히 공부해야 해요.', options: ['하려면', '하면서', '하거나', '하니까'], correct: 0 },

        // --- LISTENING ---
        { type: 'listening', category: 'LISTENING', audioScript: "이번 역은 서울역입니다.", langCode: "ko-KR", question: '어디입니까?', options: ['지하철', '비행기', '택시', '자전거'], correct: 0 },
        { type: 'listening', category: 'LISTENING', audioScript: "주문하시겠습니까?", langCode: "ko-KR", question: '어디입니까?', options: ['식당', '도서관', '병원', '은행'], correct: 0 },
        { type: 'listening', category: 'LISTENING', audioScript: "등산을 가요.", langCode: "ko-KR", question: '취미는?', options: ['등산', '수영', '독서', '요리'], correct: 0 },
        { type: 'listening', category: 'LISTENING', audioScript: "사진 좀 찍어 주시겠어요?", langCode: "ko-KR", question: '부탁은?', options: ['사진', '길', '짐', '전화'], correct: 0 },
        { type: 'listening', category: 'LISTENING', audioScript: "오후 2시에 뵙겠습니다.", langCode: "ko-KR", question: '언제?', options: ['내일 2시', '오늘 2시', '오전 2시', '모레 2시'], correct: 0 },
        { type: 'listening', category: 'LISTENING', audioScript: "좀 깎아 주세요.", langCode: "ko-KR", question: '무엇을 합니까?', options: ['물건 사기', '길 묻기', '인사', '공부'], correct: 0 },
        { type: 'listening', category: 'LISTENING', audioScript: "아프고 열이 나요.", langCode: "ko-KR", question: '왜 못 갑니까?', options: ['아파서', '바빠서', '늦잠', '약속'], correct: 0 },
        { type: 'listening', category: 'LISTENING', audioScript: "시험 접수 기간입니다.", langCode: "ko-KR", question: '안내?', options: ['시험 접수', '수업', '방학', '졸업'], correct: 0 },
        { type: 'listening', category: 'LISTENING', audioScript: "우수 사원입니다.", langCode: "ko-KR", question: '소식?', options: ['우수 사원', '승진 실패', '해고', '전근'], correct: 0 },

        // --- PART 3: WRITING ---
        { type: 'writing', category: 'WRITING', question: 'Write "Thank you" in Korean (Polite).', correctAnswer: '감사합니다', options: [] },
        { type: 'writing', category: 'WRITING', question: '한국의 수도는 어디입니까? (Thủ đô của HQ)', correctAnswer: '서울', options: [] },
        { type: 'writing', category: 'WRITING', question: '1 + 1 = ? (Viết tiếng Hàn: 일 더하기 일은 __)', correctAnswer: '이', options: [] }
    ],

    // ======================================================
    // 4. TIẾNG ĐỨC
    // ======================================================
    de: [
        { type: 'choice', category: 'GRAMMAR', question: 'Ich habe ___ meinen Schlüssel vergessen.', options: ['schon wieder', 'erst', 'bereits', 'damals'], correct: 0 },
        
        { type: 'writing', category: 'GRAMMAR', question: 'Das ist _______ (a) Haus.', correctAnswer: 'ein', options: [] },

        { type: 'choice', category: 'VOCABULARY', question: 'Wir müssen einen Termin ___.', options: ['vereinbaren', 'machen', 'tun', 'stellen'], correct: 0 },
        { type: 'choice', category: 'GRAMMAR', question: 'Wenn ich Zeit hätte, ___ ich dich besuchen.', options: ['würde', 'werde', 'wurde', 'wird'], correct: 0 },
        
        { type: 'writing', category: 'GRAMMAR', question: 'Wir warten _______ (for) den Bus.', correctAnswer: 'auf', options: [] },

        { type: 'choice', category: 'GRAMMAR', question: 'Ich interessiere mich ___ Musik.', options: ['für', 'über', 'an', 'auf'], correct: 0 },
        { type: 'choice', category: 'VOCABULARY', question: 'Bitte ___ Sie das Formular aus.', options: ['füllen', 'schreiben', 'machen', 'geben'], correct: 0 },
        { type: 'choice', category: 'GRAMMAR', question: 'Obwohl er krank war, ___ er zur Arbeit.', options: ['ging', 'geht', 'gegangen', 'gehen'], correct: 0 },
        { type: 'choice', category: 'VOCABULARY', question: 'Ich möchte mich um diese Stelle ___.', options: ['bewerben', 'werben', 'anwerben', 'erwerben'], correct: 0 },
        { type: 'choice', category: 'READING', question: 'Rauchen verboten means?', options: ['No smoking', 'Smoking allowed', 'Healthy', 'Cheap'], correct: 0 },
        { type: 'choice', category: 'GRAMMAR', question: 'Hast du das Buch ___ gelesen?', options: ['schon', 'noch', 'erst', 'bereits'], correct: 0 },
        { type: 'choice', category: 'VOCABULARY', question: 'Der Zug hat zehn Minuten ___.', options: ['Verspätung', 'Spät', 'Verzögerung', 'Pause'], correct: 0 },
        { type: 'choice', category: 'GRAMMAR', question: 'Ich warte ___ den Bus.', options: ['auf', 'an', 'in', 'zu'], correct: 0 },
        { type: 'choice', category: 'VOCABULARY', question: 'Kannst du mir einen ___ geben?', options: ['Rat', 'Rad', 'Tat', 'Satz'], correct: 0 },
        { type: 'choice', category: 'GRAMMAR', question: 'Nachdem er gegessen hatte, ___ er ins Bett.', options: ['ging', 'geht', 'gegangen', 'gehen'], correct: 0 },
        { type: 'choice', category: 'VOCABULARY', question: 'Die Miete ist sehr ___.', options: ['hoch', 'groß', 'viel', 'stark'], correct: 0 },
        { type: 'choice', category: 'GRAMMAR', question: 'Ich lasse mein Auto ___ reparieren.', options: ['morgen', 'gestern', 'heute', 'jetzt'], correct: 0 },
        { type: 'choice', category: 'VOCABULARY', question: 'Vielen Dank für Ihre ___.', options: ['Aufmerksamkeit', 'Vorsicht', 'Sicht', 'Aussicht'], correct: 0 },

        // --- LISTENING ---
        { type: 'listening', category: 'LISTENING', audioScript: "Zug nach München hat 20 Minuten Verspätung.", langCode: "de-DE", question: 'Problem?', options: ['Pünktlich', 'Verspätet', 'Fällt aus', 'Gleiswechsel'], correct: 1 },
        { type: 'listening', category: 'LISTENING', audioScript: "Haben Sie diesen Pullover in M?", langCode: "de-DE", question: 'Wo?', options: ['Supermarkt', 'Kleidergeschäft', 'Apotheke', 'Kino'], correct: 1 },
        { type: 'listening', category: 'LISTENING', audioScript: "Bitte schnallen Sie sich an.", langCode: "de-DE", question: 'Wo?', options: ['Flugzeug', 'Bus', 'Zug', 'Auto'], correct: 0 },
        { type: 'listening', category: 'LISTENING', audioScript: "Termin bei Dr. Müller.", langCode: "de-DE", question: 'Was?', options: ['Arzttermin', 'Tisch', 'Hotel', 'Anwalt'], correct: 0 },
        { type: 'listening', category: 'LISTENING', audioScript: "Wie komme ich zum Bahnhof?", langCode: "de-DE", question: 'Sucht was?', options: ['Bahnhof', 'Flughafen', 'Hotel', 'Museum'], correct: 0 },
        { type: 'listening', category: 'LISTENING', audioScript: "Morgen wird es regnerisch.", langCode: "de-DE", question: 'Thema?', options: ['Wetter', 'Verkehr', 'Politik', 'Sport'], correct: 0 },
        { type: 'listening', category: 'LISTENING', audioScript: "Herzlichen Glückwunsch!", langCode: "de-DE", question: 'Anlass?', options: ['Geburtstag', 'Hochzeit', 'Weihnachten', 'Ostern'], correct: 0 },
        { type: 'listening', category: 'LISTENING', audioScript: "Bibliothek schließt um 18 Uhr.", langCode: "de-DE", question: 'Wann?', options: ['18 Uhr', '8 Uhr', '20 Uhr', '16 Uhr'], correct: 0 },
        { type: 'listening', category: 'LISTENING', audioScript: "Konto eröffnen.", langCode: "de-DE", question: 'Wo?', options: ['Bank', 'Post', 'Restaurant', 'Hotel'], correct: 0 },

        // --- PART 3: WRITING ---
        { type: 'writing', category: 'WRITING', question: 'Guten Morgen means Good _______', correctAnswer: 'morning', options: [] },
        { type: 'writing', category: 'WRITING', question: 'eins + zwei = _______ (german word)', correctAnswer: 'drei', options: [] },
        { type: 'writing', category: 'WRITING', question: 'Capital of Germany is _______', correctAnswer: 'berlin', options: [] }
    ],

    // ======================================================
    // 5. TIẾNG NHẬT
    // ======================================================
    jp: [
        { type: 'choice', category: 'GRAMMAR', question: 'この本は読み___です。', options: ['やすい', 'にくい', 'たい', 'すぎ'], correct: 0 },
        
        { type: 'writing', category: 'GRAMMAR', question: '日本 _______ 行きます。 (Đi ĐẾN Nhật)', correctAnswer: 'へ', options: [] },

        { type: 'choice', category: 'GRAMMAR', question: '日本へ___ことがありますか。', options: ['行った', '行く', '行って', '行かない'], correct: 0 },
        { type: 'choice', category: 'VOCABULARY', question: '父は会社に___います。', options: ['勤めて', '働いて', '仕事して', 'やって'], correct: 0 },
        { type: 'choice', category: 'GRAMMAR', question: '雨が___そうです。', options: ['降り', '降る', '降って', '降った'], correct: 0 },
        
        { type: 'writing', category: 'GRAMMAR', question: 'これ _______ ペンです。 (Cái NÀY là bút)', correctAnswer: 'は', options: [] },

        { type: 'choice', category: 'GRAMMAR', question: 'もっと勉強___ばなりません。', options: ['しなけれ', 'しなくて', 'しない', 'して'], correct: 0 },
        { type: 'choice', category: 'VOCABULARY', question: '部屋を___にしてください。', options: ['きれい', 'きたない', 'しずか', 'にぎやか'], correct: 0 },
        { type: 'choice', category: 'GRAMMAR', question: '先生に本を___。', options: ['いただきました', 'くださいました', 'あげました', 'やりました'], correct: 0 },
        { type: 'choice', category: 'READING', question: '「立入禁止」意味？', options: ['入るな', '入れ', '立て', '座れ'], correct: 0 },
        { type: 'choice', category: 'VOCABULARY', question: '彼はとても___人です。', options: ['真面目な', '真面目', '真面目く', '真面目だ'], correct: 0 },
        { type: 'choice', category: 'GRAMMAR', question: 'この料理は___そうですね。', options: ['おいし', 'おいしい', 'おいしく', 'おいしさ'], correct: 0 },
        { type: 'choice', category: 'VOCABULARY', question: '将来の___は何ですか。', options: ['夢', '寝', '眠', '想'], correct: 0 },
        { type: 'choice', category: 'GRAMMAR', question: 'ドアが___います。', options: ['開いて', '開けて', '開く', '開ける'], correct: 0 },
        { type: 'choice', category: 'VOCABULARY', question: 'お腹が___ました。', options: ['すき', '空き', '好き', '透き'], correct: 0 },
        { type: 'choice', category: 'GRAMMAR', question: '日本について___知っていますか。', options: ['何か', '何', '何も', '何で'], correct: 0 },
        { type: 'choice', category: 'VOCABULARY', question: '風邪を___、学校を休みました。', options: ['引いて', '引く', '引いた', '引き'], correct: 0 },
        { type: 'choice', category: 'GRAMMAR', question: 'これを___もいいですか。', options: ['使って', '使う', '使えば', '使おう'], correct: 0 },

        // --- LISTENING ---
        { type: 'listening', category: 'LISTENING', audioScript: "新宿です。左側です。", langCode: "ja-JP", question: 'どこ？', options: ['電車', 'バス', 'デパート', '公園'], correct: 0 },
        { type: 'listening', category: 'LISTENING', audioScript: "何名様ですか。", langCode: "ja-JP", question: '何を聞いている？', options: ['人数', '名前', '注文', '電話'], correct: 0 },
        { type: 'listening', category: 'LISTENING', audioScript: "晴れ時々曇り。", langCode: "ja-JP", question: '天気？', options: ['晴れ/曇り', '雨', '雪', '台風'], correct: 0 },
        { type: 'listening', category: 'LISTENING', audioScript: "コンビニはありますか。", langCode: "ja-JP", question: '探しているもの？', options: ['コンビニ', '駅', '病院', '学校'], correct: 0 },
        { type: 'listening', category: 'LISTENING', audioScript: "お誕生日おめでとう。", langCode: "ja-JP", question: 'どんな時？', options: ['誕生日', '結婚式', '正月', '卒業式'], correct: 0 },
        { type: 'listening', category: 'LISTENING', audioScript: "鈴木さんはいらっしゃいますか。", langCode: "ja-JP", question: '何の会話？', options: ['電話', '会議', '面接', '授業'], correct: 0 },
        { type: 'listening', category: 'LISTENING', audioScript: "宿題は明日までに。", langCode: "ja-JP", question: '締め切り？', options: ['明日', '今日', '来週', '今週'], correct: 0 },
        { type: 'listening', category: 'LISTENING', audioScript: "今日は早退させていただきます。", langCode: "ja-JP", question: 'したいこと？', options: ['帰る', '休む', '病院', '薬'], correct: 0 },
        { type: 'listening', category: 'LISTENING', audioScript: "3番線から発車します。", langCode: "ja-JP", question: '何番線？', options: ['3', '1', '2', '4'], correct: 0 },

        // --- PART 3: WRITING ---
        { type: 'writing', category: 'WRITING', question: '「ありがとう」Meaning in English?', correctAnswer: 'thank you', options: [] },
        { type: 'writing', category: 'WRITING', question: 'Capital of Japan? (Romaji)', correctAnswer: 'tokyo', options: [] },
        { type: 'writing', category: 'WRITING', question: 'ichi + ni = ___ (romaji)', correctAnswer: 'san', options: [] }
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