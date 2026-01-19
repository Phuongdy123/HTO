document.addEventListener('DOMContentLoaded', () => {
    // --- KHỞI TẠO BIẾN ---
    let config = { ...defaultConfig };
    let currentScreen = 'welcome';
    let participantData = null;
    let currentQuestion = 0;
    let score = 0;
    let correctCount = 0;
    let selectedAnswer = null;
    let answered = false;
    let skillMetrics = {}; // Theo dõi điểm từng kỹ năng
    
    // URL Google Apps Script của bạn (GIỮ NGUYÊN)
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwY1lyZTBZP_zpnSP3_6_fKo3NZZY21z1tCS1eJTPMGtJlCrgBJcr5CrBC77yxvDQrW/exec';

    // ============================================================
    // --- CÁC HÀM HỖ TRỢ LOGIC (THUẬT TOÁN) ---
    // ============================================================

    // 1. Hàm khởi tạo bộ đếm kỹ năng (TÍNH ĐIỂM ĐỘNG)
    function initSkillTracker() {
        skillMetrics = {};
        const pointsPerQuestion = 100 / questions.length; // Tự động chia điểm (VD: 30 câu ~ 3.33 điểm/câu)

        questions.forEach(q => {
            // Lấy category, nếu không có thì gán mặc định
            const cat = q.category ? q.category.toUpperCase() : 'GENERAL';
            
            if (!skillMetrics[cat]) {
                skillMetrics[cat] = { current: 0, total: 0 };
            }
            // Cộng điểm tối đa cho kỹ năng này
            skillMetrics[cat].total += pointsPerQuestion; 
        });
    }

    // 2. Hàm xếp loại học viên
    function getStudentRank(score) {
        if (score >= 90) {
            return { label: "XUẤT SẮC 🌟", color: "text-yellow-500", message: "Chúc mừng bạn đã hoàn thành bài test xuất sắc" };
        } else if (score >= 75) {
            return { label: "GIỎI 💪", color: "text-green-600", message: "Nền tảng vững chắc, đủ điều kiện visa thẳng." };
        } else if (score >= 50) {
            return { label: "KHÁ 👍", color: "text-blue-500", message: "Đủ điều kiện du học, cần ôn luyện thêm." };
        } else {
            return { label: "CẦN CỐ GẮNG 😅", color: "text-orange-500", message: "Nên tham gia khóa học bổ trợ nền tảng." };
        }
    }

    // 3. Hàm gửi dữ liệu lên Google Sheet
    async function sendDataToGoogleSheet(data) {
        if (!data) return;
        
        const formData = new FormData();
        formData.append("fullname", data.full_name);
        formData.append("school", data.school_name);
        formData.append("phone", data.phone_number);
        formData.append("email", data.email);
        formData.append("score", data.score || 0);
        formData.append("rank", data.rank || "");           
        formData.append("skills", data.skill_breakdown || ""); 
        formData.append("prize", data.prize_won || "");
        
        // Gộp nội dung bài viết thành chuỗi
        const writingText = data.writing_responses ? data.writing_responses.join(" | ") : "";
        formData.append("writing", writingText);

        formData.append("consent", data.phone_consent ? "Có" : "Không");

        try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                body: formData,
                mode: 'no-cors' 
            });
            console.log("Đã gửi dữ liệu lên Sheet!");
        } catch (error) {
            console.error("Lỗi gửi dữ liệu:", error);
        }
    }

    // --- CẤU HÌNH LƯU TRỮ (LOCAL STORAGE) ---
    const STORAGE_KEY = 'quiz_user_session_v3'; // Bump version để clear cache cũ

    function saveSession(data) {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) { console.error(e); }
    }

    function getSession() {
        try { return JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch (e) { return null; }
    }

    // --- DATA SDK ---
    const dataHandler = {
        onDataChanged(data) { console.log('Data updated:', data.length, 'records'); }
    };

    async function initDataSDK() {
        if (window.dataSdk) {
            await window.dataSdk.init(dataHandler);
        }
    }

    // --- ĐIỀU HƯỚNG MÀN HÌNH ---
    function showScreen(screenName) {
        const screens = ['welcome', 'form', 'language', 'quiz', 'results', 'wheel'];
        screens.forEach(screen => {
            const el = document.getElementById(`screen-${screen}`);
            if (el) el.classList.add('hidden');
        });
        
        const targetScreen = document.getElementById(`screen-${screenName}`);
        if (targetScreen) {
            targetScreen.classList.remove('hidden');
            targetScreen.classList.add('fade-in');
        }
        currentScreen = screenName;
    }

    function showLoading(show) {
        const loader = document.getElementById('loading-indicator');
        if (loader) {
            if (show) loader.classList.remove('hidden');
            else loader.classList.add('hidden');
        }
    }

    // ============================================================
    // --- XỬ LÝ SỰ KIỆN (EVENT LISTENERS) ---
    // ============================================================

    // 1. NÚT START
    const startBtn = document.getElementById('start-btn');
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            const savedData = getSession();
            if (savedData) {
                participantData = savedData;
                showScreen('language'); 
            } else {
                showScreen('form'); 
            }
        });
    }

    // 2. XỬ LÝ FORM SUBMIT
    const infoForm = document.getElementById('info-form');
    if (infoForm) {
        infoForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submit-form-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = 'Đang xử lý... ⏳';
            submitBtn.disabled = true;

            const fullName = document.getElementById('full-name').value.trim();
            const schoolName = document.getElementById('school-name').value.trim();
            const phoneNumber = document.getElementById('phone-number').value.trim();
            const email = document.getElementById('user-email').value.trim();
            const phoneConsent = document.getElementById('phone-consent').checked;
            
            if (!fullName || !schoolName || !phoneNumber || !email) {
                alert("Vui lòng điền đầy đủ thông tin!");
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                return;
            }
            
            participantData = {
                full_name: fullName,
                school_name: schoolName,
                phone_number: phoneNumber,
                email: email,
                phone_consent: phoneConsent,
                score: 0,
                language: '',
                writing_responses: [],
                completed_at: new Date().toISOString(),
                unlocked_wheel: false,
                prize_won: ''
            };
            
            saveSession(participantData);
            await sendDataToGoogleSheet(participantData);
            
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            showScreen('language'); 
        });
    }

    // 3. CHỌN NGÔN NGỮ
    const langButtons = document.querySelectorAll('.lang-btn');
    if (langButtons.length > 0) {
        langButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const lang = this.getAttribute('data-lang');
                
                if (typeof setQuestionsByLanguage === 'function') {
                    const isSuccess = setQuestionsByLanguage(lang);
                    
                    if (isSuccess) {
                        if (participantData) {
                            participantData.language = lang;
                            saveSession(participantData);
                        }

                        // Reset game state
                        score = 0;
                        correctCount = 0;
                        currentQuestion = 0;
                        
                        initSkillTracker(); // Khởi tạo điểm chuẩn

                        showScreen('quiz');
                        renderQuestion();
                    } else {
                        alert("Bộ câu hỏi ngôn ngữ này đang cập nhật!");
                    }
                }
            });
        });
    }

    // 4. ĐIỀU HƯỚNG QUIZ
    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) {
        nextBtn.addEventListener('click', nextQuestion);
    }

    const restartBtn = document.getElementById('restart-btn');
    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            showScreen('language');
        });
    }

    // 5. LUCKY WHEEL BUTTONS
    const spinWheelBtn = document.getElementById('spin-wheel-btn');
    if (spinWheelBtn) {
        spinWheelBtn.addEventListener('click', () => {
            showScreen('wheel');
            setTimeout(() => initWheel(), 100);
        });
    }

    const spinBtn = document.getElementById('spin-btn');
    if (spinBtn) {
        spinBtn.addEventListener('click', spinWheel);
    }

    const backResBtn = document.getElementById('back-to-results-btn');
    if (backResBtn) {
        backResBtn.addEventListener('click', () => {
            showScreen('results');
        });
    }

    // ============================================================
    // --- LOGIC QUIZ (CORE) ---
    // ============================================================

function renderQuestion() {
        if (!questions || questions.length === 0) return;

        const q = questions[currentQuestion];
        
        // UI Updates
        document.getElementById('q-number').textContent = currentQuestion + 1;
        document.getElementById('current-q').textContent = currentQuestion + 1;
        
        const totalEl = document.getElementById('total-q');
        if(totalEl) totalEl.textContent = questions.length;

        document.getElementById('question-category').textContent = q.category || 'QUIZ';
        
        // --- [FIX] XỬ LÝ ẨN/HIỆN TIÊU ĐỀ ĐỂ TRÁNH LẶP LẠI ---
        const mainQText = document.getElementById('question-text');
        if (q.type === 'writing') {
            mainQText.style.display = 'none'; // Ẩn tiêu đề gốc nếu là câu Writing
        } else {
            mainQText.style.display = 'block'; // Hiện lại nếu là trắc nghiệm/nghe
            mainQText.textContent = q.question;
        }
        // ----------------------------------------------------
        
        const progress = ((currentQuestion + 1) / questions.length) * 100;
        document.getElementById('progress-bar').style.width = `${progress}%`;

        const container = document.getElementById('answers-container');
        container.innerHTML = ''; 
        
        selectedAnswer = null;
        answered = false;
        document.getElementById('feedback').classList.add('hidden');
        disableNextButton(); 

        // --- RENDER THEO LOẠI CÂU HỎI ---

        // A. LISTENING
        if (q.type === 'listening' && q.audioScript) {
            const audioDiv = document.createElement('div');
            audioDiv.className = "p-4 mb-6 text-center border border-blue-100 bg-blue-50 rounded-2xl";
            const btnId = `speak-btn-${currentQuestion}`;

            audioDiv.innerHTML = `
                <div class="mb-3 text-xs font-bold text-blue-500 uppercase tracking-wider flex items-center justify-center gap-2">
                    <span>🎧 Phần thi Nghe</span>
                </div>
                <button id="${btnId}" class="relative inline-flex items-center justify-center gap-2 px-8 py-3 font-bold text-white transition-all transform bg-blue-500 shadow-lg rounded-full hover:bg-blue-600 hover:scale-105 active:scale-95 group">
                    <span class="text-2xl">🔊</span>
                    <span>Bấm để nghe</span>
                    <span class="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-blue-400 hidden" id="${btnId}-ping"></span>
                </button>
            `;
            container.appendChild(audioDiv);

            setTimeout(() => {
                const btn = document.getElementById(btnId);
                const ping = document.getElementById(`${btnId}-ping`);
                if (btn) {
                    btn.addEventListener('click', () => {
                        window.speechSynthesis.cancel();
                        const utterance = new SpeechSynthesisUtterance(q.audioScript);
                        utterance.lang = q.langCode || 'en-US'; 
                        utterance.rate = 0.9;
                        utterance.onstart = () => {
                            btn.classList.add('bg-green-500', 'hover:bg-green-600');
                            btn.classList.remove('bg-blue-500', 'hover:bg-blue-600');
                            btn.querySelector('span:nth-child(2)').textContent = "Đang đọc...";
                            if(ping) ping.classList.remove('hidden');
                        };
                        utterance.onend = () => {
                            btn.classList.add('bg-blue-500', 'hover:bg-blue-600');
                            btn.classList.remove('bg-green-500', 'hover:bg-green-600');
                            btn.querySelector('span:nth-child(2)').textContent = "Nghe lại";
                            if(ping) ping.classList.add('hidden');
                        };
                        window.speechSynthesis.speak(utterance);
                    });
                }
            }, 0);
        }

        // B. WRITING (ĐIỀN TỪ) - [ĐÃ NÂNG CẤP]
        if (q.type === 'writing') {
            const wrapper = document.createElement('div');
            wrapper.className = "flex flex-col items-center w-full gap-6 mt-2";
            
            // 1. Hiển thị câu hỏi (Thay thế dấu gạch dưới bằng ô trống)
            const questionText = document.createElement('div');
            questionText.className = "text-xl font-bold leading-relaxed text-center text-gray-800 md:text-2xl";
            questionText.innerHTML = q.question.replace(/_+/g, '<span class="inline-block w-20 border-b-4 border-blue-400 mx-1"></span>');
            wrapper.appendChild(questionText);

            // 2. Ô nhập liệu
            const input = document.createElement('input');
            input.type = 'text';
            input.id = 'writing-input';
            input.className = "w-full max-w-md p-4 text-xl font-bold text-center placeholder-gray-300 transition-all bg-white border-2 border-gray-200 outline-none rounded-xl focus:border-blue-500 focus:shadow-lg";
            input.placeholder = "Nhập đáp án của bạn...";
            input.autocomplete = "off";
            
            // 3. Khu vực hiện thông báo Đúng/Sai (Feedback)
            const feedbackMsg = document.createElement('div');
            feedbackMsg.id = 'writing-feedback-msg';
            feedbackMsg.className = "hidden mt-2 text-lg font-bold transition-all"; 

            // Xử lý sự kiện gõ phím
            input.addEventListener('input', (e) => {
                if(e.target.value.trim().length > 0) {
                    enableNextButton(); 
                } else {
                    disableNextButton();
                }
            });

            // Xử lý phím Enter -> Gọi hàm kiểm tra
            input.addEventListener('keypress', function (e) {
                if (e.key === 'Enter' && e.target.value.trim().length > 0) {
                    checkWritingAnswerAndNext(); // Gọi hàm xử lý mới
                }
            });

            wrapper.appendChild(input);
            wrapper.appendChild(feedbackMsg); // Thêm dòng thông báo vào dưới input
            container.appendChild(wrapper);
            return; 
        }

        // C. MULTIPLE CHOICE
        if (q.options && q.options.length > 0) {
            q.options.forEach((option, index) => {
                const btn = document.createElement('button');
                btn.className = 'flex items-center w-full gap-4 p-4 font-bold text-left text-white shadow-md answer-btn rounded-xl transition-all transform hover:scale-[1.01] active:scale-95';
                
                const colors = [
                    'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', 
                    'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', 
                    'linear-gradient(135deg, #ec4899 0%, #db2777 100%)', 
                    'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                ];
                btn.style.background = colors[index % colors.length];
                
                btn.innerHTML = `
                    <span class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-sm font-black shadow-inner">${String.fromCharCode(65 + index)}</span>
                    <span class="flex-1 text-sm md:text-base leading-snug">${option}</span>
                `;
                btn.addEventListener('click', () => selectAnswer(index));
                container.appendChild(btn);
            });
        }
    }
    function selectAnswer(index) {
        if (answered) return;
        
        answered = true;
        selectedAnswer = index;
        
        const q = questions[currentQuestion];
        const isCorrect = index === q.correct;
        const cat = q.category ? q.category.toUpperCase() : 'GENERAL';
        const pointsPerQuestion = 100 / questions.length; // Tính điểm động

        if (isCorrect) {
            score += pointsPerQuestion;
            correctCount++;
            // Cập nhật điểm kỹ năng
            if(skillMetrics[cat]) skillMetrics[cat].current += pointsPerQuestion;
        }
        
        // Hiển thị làm tròn
        document.getElementById('score-display').textContent = Math.round(score);

        showFeedback(isCorrect, q.correct);
        highlightAnswers(index, q.correct);
        enableNextButton();
    }

    function showFeedback(isCorrect, correctIndex) {
        const feedback = document.getElementById('feedback');
        feedback.classList.remove('hidden');
        
        if (isCorrect) {
            feedback.style.background = '#dcfce7'; 
            feedback.style.color = '#15803d';      
            feedback.style.border = '1px solid #86efac';
            
            // Tính số điểm cộng hiển thị (làm tròn)
            const points = Math.round(100 / questions.length);
            feedback.innerHTML = `🎉 Chính xác! +${points} điểm`;
        } else {
            feedback.style.background = '#fee2e2'; 
            feedback.style.color = '#b91c1c';      
            feedback.style.border = '1px solid #fca5a5';
            feedback.innerHTML = `❌ Đáp án đúng: ${questions[currentQuestion].options[correctIndex]}`;
        }
    }

    function highlightAnswers(selected, correct) {
        const buttons = document.querySelectorAll('.answer-btn');
        buttons.forEach((btn, index) => {
            btn.style.pointerEvents = 'none';
            if (index === correct) {
                btn.style.opacity = '1';
                btn.style.transform = 'scale(1.02)';
                btn.style.boxShadow = '0 0 15px rgba(59, 130, 246, 0.5)';
                btn.innerHTML += ' <span class="ml-auto text-xl">✅</span>';
            } else if (index === selected && index !== correct) {
                btn.style.opacity = '0.6';
                btn.innerHTML += ' <span class="ml-auto text-xl">❌</span>';
            } else {
                btn.style.opacity = '0.4';
            }
        });
    }

    function enableNextButton() {
        const btn = document.getElementById('next-btn');
        btn.disabled = false;
        if (currentQuestion < questions.length - 1) {
            document.getElementById('next-btn-text').textContent = 'Câu tiếp theo';
            document.getElementById('next-btn-icon').textContent = '➡️';
        } else {
            document.getElementById('next-btn-text').textContent = 'Xem kết quả';
            document.getElementById('next-btn-icon').textContent = '🏆';
        }
    }

    function disableNextButton() {
        const btn = document.getElementById('next-btn');
        btn.disabled = true;
        document.getElementById('next-btn-text').textContent = 'Chọn/Nhập đáp án';
        document.getElementById('next-btn-icon').textContent = '👆';
    }

async function nextQuestion() {
        const q = questions[currentQuestion];

        // --- NẾU LÀ CÂU ĐIỀN TỪ (WRITING) ---
        if (q.type === 'writing') {
            // Gọi hàm xử lý riêng (có hiệu ứng delay và hiện đáp án đúng)
            await checkWritingAnswerAndNext();
            return; // Dừng tại đây, không chạy code bên dưới nữa
        }

        // --- NẾU LÀ CÂU TRẮC NGHIỆM / NGHE (Logic cũ) ---
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            renderQuestion();
        } else {
            await showResults();
        }
    }
    // Hàm xử lý riêng cho phần Writing: Chấm điểm, hiện đáp án và delay
    async function checkWritingAnswerAndNext() {
        if (answered) return; // Chặn người dùng bấm Enter nhiều lần
        answered = true;

        const q = questions[currentQuestion];
        const inputEl = document.getElementById('writing-input');
        const feedbackEl = document.getElementById('writing-feedback-msg'); // Element hiển thị thông báo
        const nextBtn = document.getElementById('next-btn');
        
        // 1. Khóa không cho sửa đáp án và khóa nút Next
        inputEl.disabled = true;
        nextBtn.disabled = true;

        const userAns = inputEl.value.trim().toLowerCase();
        const correctAns = q.correctAnswer ? q.correctAnswer.trim().toLowerCase() : "";
        const pointsPerQuestion = 100 / questions.length;

        // Lưu log câu trả lời
        if (!participantData.writing_responses) participantData.writing_responses = [];
        participantData.writing_responses.push(`Q${currentQuestion+1}: ${inputEl.value} (Đáp án: ${q.correctAnswer})`);

        // 2. SO SÁNH ĐÁP ÁN
        if (userAns === correctAns) {
            // --- TRƯỜNG HỢP ĐÚNG ---
            score += pointsPerQuestion;
            correctCount++;
            
            // Cộng điểm kỹ năng
            const cat = q.category ? q.category.toUpperCase() : 'WRITING';
            if(skillMetrics[cat]) skillMetrics[cat].current += pointsPerQuestion;
            
            // Đổi màu xanh
            inputEl.className = "w-full max-w-md p-4 text-xl font-bold text-center text-green-700 border-2 border-green-500 shadow-inner bg-green-50 rounded-xl";
            
            // Hiện thông báo chúc mừng
            if(feedbackEl) {
                feedbackEl.innerHTML = "🎉 Chính xác! +Điểm";
                feedbackEl.className = "block mt-4 text-lg font-bold text-center text-green-600 animate-bounce";
            }
        } else {
            // --- TRƯỜNG HỢP SAI ---
            // Đổi màu đỏ
            inputEl.className = "w-full max-w-md p-4 text-xl font-bold text-center text-red-700 border-2 border-red-500 shadow-inner bg-red-50 rounded-xl";
            
            // HIỆN ĐÁP ÁN ĐÚNG
            if(feedbackEl) {
                feedbackEl.innerHTML = `
                    <div class="text-red-500 mb-1">❌ Sai rồi!</div>
                    <div class="text-gray-600 text-sm">Đáp án đúng là:</div>
                    <div class="text-blue-600 font-black text-2xl uppercase mt-1">${q.correctAnswer}</div>
                `;
                feedbackEl.className = "block p-3 mt-4 text-center border border-red-100 rounded-lg bg-red-50";
            }
        }

        // Cập nhật điểm số trên giao diện
        document.getElementById('score-display').textContent = Math.round(score);

        // 3. QUAN TRỌNG: Đợi 2.5 giây (2500ms) để người dùng đọc kết quả
        await new Promise(r => setTimeout(r, 2500));

        // 4. Tự động chuyển câu tiếp theo
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            renderQuestion();
        } else {
            await showResults();
        }
    }
 async function showResults() {
        // --- 1. LÀM TRÒN ĐIỂM TỔNG KẾT ---
        // Xử lý sai số thập phân (3.333...) để ra số đẹp (0-100)
        score = Math.round(score); 
        if (score > 100) score = 100;

        const percentage = Math.round((correctCount / questions.length) * 100);
        const unlockedWheel = score >= 60; // Mở khóa vòng quay nếu >= 60 điểm
        
        // --- 2. GỌI THUẬT TOÁN XẾP LOẠI ---
        const rankInfo = getStudentRank(score);

        // --- 3. CẬP NHẬT GIAO DIỆN KẾT QUẢ CHÍNH ---
        document.getElementById('final-score').textContent = score;
        document.getElementById('correct-answers').textContent = correctCount;
        document.getElementById('percentage').textContent = `${percentage}%`;

        // Cập nhật Tiêu đề và Lời nhắn theo Xếp loại
        const titleEl = document.querySelector('#screen-results h2'); 
        if(titleEl) {
            titleEl.textContent = rankInfo.label;
            titleEl.className = `mb-1 text-3xl font-black ${rankInfo.color}`;
        }
        const subTitleEl = document.querySelector('#screen-results p');
        if(subTitleEl) {
            subTitleEl.textContent = rankInfo.message;
        }

        // --- 4. TẠO THANH KỸ NĂNG (SKILL BARS) ---
        // [QUAN TRỌNG] Phần này sẽ hiển thị điểm cho từng kỹ năng bao gồm cả WRITING
        let skillsHTML = '<div class="space-y-4 mb-6 w-full p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">';
        
        for (const [cat, data] of Object.entries(skillMetrics)) {
            // Chỉ hiển thị nếu kỹ năng đó có câu hỏi trong bài thi
            if (data.total > 0) {
                const percent = Math.round((data.current / data.total) * 100);
                
                // Làm tròn điểm hiển thị (VD: 3/10 thay vì 3.33/10)
                const displayCurrent = Math.round(data.current);
                const displayTotal = Math.round(data.total);

                // Mapping tên kỹ năng sang tiếng Việt
                let displayCat = cat;
                if(cat === 'LISTENING') displayCat = '🎧 Nghe Hiểu (Listening)';
                else if(cat === 'READING') displayCat = '📖 Đọc Hiểu (Reading)';
                else if(cat === 'GRAMMAR') displayCat = '✍️ Ngữ Pháp (Grammar)';
                else if(cat === 'VOCABULARY') displayCat = '🔤 Từ Vựng (Vocabulary)';
                else if(cat === 'WRITING') displayCat = '📝 Kỹ Năng Viết (Writing)'; // [QUAN TRỌNG] Đã thêm dòng này

                // HTML cho thanh skill
                skillsHTML += `
                    <div class="flex flex-col gap-2">
                        <div class="flex justify-between text-xs font-bold text-gray-600 uppercase tracking-wide">
                            <span>${displayCat}</span>
                            <span class="text-blue-600">${displayCurrent}/${displayTotal}</span>
                        </div>
                        <div class="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                            <div class="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-1000 ease-out" style="width: ${percent}%"></div>
                        </div>
                    </div>
                `;
            }
        }
        skillsHTML += '</div>';

        // Chèn vào HTML (Tìm vị trí thích hợp trong thẻ card kết quả)
        const resultCard = document.querySelector('#screen-results .card-3d');
        let skillsContainer = document.getElementById('skills-breakdown');
        
        // Nếu chưa có container thì tạo mới
        if (!skillsContainer) {
            skillsContainer = document.createElement('div');
            skillsContainer.id = 'skills-breakdown';
            // Chèn trước thông báo mở khóa hoặc trước Grid thống kê
            const beforeTarget = document.getElementById('unlock-message') || document.querySelector('#screen-results .grid');
            if(beforeTarget && resultCard) {
                resultCard.insertBefore(skillsContainer, beforeTarget);
            } else if (resultCard) {
                resultCard.appendChild(skillsContainer);
            }
        }
        skillsContainer.innerHTML = skillsHTML;

        // --- 5. LOGIC VÒNG QUAY & LƯU DATA ---
        const unlockMsg = document.getElementById('unlock-message');
        const spinBtn = document.getElementById('spin-wheel-btn');

        // Cập nhật emoji cảm xúc dựa trên điểm số
        if (score === 100) document.getElementById('result-emoji').textContent = '🏆';
        else if (score >= 80) document.getElementById('result-emoji').textContent = '🎉';
        else if (score >= 60) document.getElementById('result-emoji').textContent = '😊';
        else document.getElementById('result-emoji').textContent = '💪';
        
        // Ẩn/Hiện nút quay thưởng
        if (unlockedWheel) {
            if(unlockMsg) unlockMsg.classList.remove('hidden');
            if(spinBtn) spinBtn.classList.remove('hidden');
            createConfetti(); // Bắn pháo giấy chúc mừng
        } else {
            if(unlockMsg) unlockMsg.classList.add('hidden');
            if(spinBtn) spinBtn.classList.add('hidden');
        }
        
        // Lưu dữ liệu
        if (participantData) {
            participantData.score = score;
            participantData.unlocked_wheel = unlockedWheel;
            participantData.rank = rankInfo.label;
            
            // Tạo chuỗi tóm tắt kỹ năng gửi về Google Sheet (bao gồm cả Writing)
            let skillReport = [];
            for (const [cat, data] of Object.entries(skillMetrics)) {
                 skillReport.push(`${cat}: ${Math.round(data.current)}/${Math.round(data.total)}`);
            }
            participantData.skill_breakdown = skillReport.join(' | ');

            saveSession(participantData); 

            showLoading(true);
            try {
                // Gửi dữ liệu về Google Sheet
                await sendDataToGoogleSheet(participantData);
                
                // Nếu có SDK bên ngoài (tùy chọn)
                if (window.dataSdk) {
                    await window.dataSdk.create(participantData);
                }
            } catch (err) {
                console.error(err);
            } finally {
                showLoading(false);
            }
        }
        
        // Chuyển màn hình sang trang kết quả
        showScreen('results');
    }
    // ============================================================
    // --- LUCKY WHEEL & CONFETTI ---
    // ============================================================
    let wheelCanvas, wheelCtx, wheelRotation = 0, isSpinning = false;

    function initWheel() {
        wheelCanvas = document.getElementById('wheel-canvas');
        if (!wheelCanvas) return;
        
        wheelCtx = wheelCanvas.getContext('2d');
        const size = wheelCanvas.offsetWidth;
        wheelCanvas.width = size;
        wheelCanvas.height = size;
        drawWheel();
    }

    function drawWheel() {
        if (!wheelCtx || !wheelCanvas) return;
        
        const centerX = wheelCanvas.width / 2;
        const centerY = wheelCanvas.height / 2;
        const radius = wheelCanvas.width / 2 - 10;
        const segmentAngle = (2 * Math.PI) / prizes.length;
        
        wheelCtx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);
        
        prizes.forEach((prize, index) => {
            const startAngle = index * segmentAngle + wheelRotation;
            const endAngle = startAngle + segmentAngle;
            
            wheelCtx.beginPath();
            wheelCtx.moveTo(centerX, centerY);
            wheelCtx.arc(centerX, centerY, radius, startAngle, endAngle);
            wheelCtx.closePath();
            wheelCtx.fillStyle = prize.color;
            wheelCtx.fill();
            wheelCtx.strokeStyle = '#fff';
            wheelCtx.lineWidth = 3;
            wheelCtx.stroke();
            
            wheelCtx.save();
            wheelCtx.translate(centerX, centerY);
            wheelCtx.rotate(startAngle + segmentAngle / 2);
            wheelCtx.textAlign = 'center';
            wheelCtx.fillStyle = '#fff';
            wheelCtx.font = 'bold 14px Poppins';
            wheelCtx.fillText(prize.emoji, radius * 0.7, 5);
            wheelCtx.restore();
        });
        
        wheelCtx.beginPath();
        wheelCtx.arc(centerX, centerY, 30, 0, 2 * Math.PI);
        wheelCtx.fillStyle = '#fff';
        wheelCtx.fill();
        wheelCtx.strokeStyle = '#3b82f6';
        wheelCtx.lineWidth = 5;
        wheelCtx.stroke();
    }

    async function spinWheel() {
        if (isSpinning) return;
        isSpinning = true;
        
        const spinBtn = document.getElementById('spin-btn');
        spinBtn.disabled = true;
        document.getElementById('spin-btn-text').textContent = 'Đang quay... 🎯';
        
        const spins = 5 + Math.random() * 3;
        const extraDegrees = Math.random() * 360;
        const totalRotation = spins * 360 + extraDegrees;
        const duration = 4000;
        const startTime = Date.now();
        const startRotation = wheelRotation;
        
        function animate() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            wheelRotation = startRotation + (totalRotation * Math.PI / 180) * easeOut;
            drawWheel();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                wheelRotation = wheelRotation % (2 * Math.PI);
                const segmentAngle = (2 * Math.PI) / prizes.length;
                const normalizedRotation = (2 * Math.PI - wheelRotation) % (2 * Math.PI);
                const prizeIndex = Math.floor(normalizedRotation / segmentAngle);
                const wonPrize = prizes[prizeIndex];
                
                showPrize(wonPrize);
                createConfetti();
                isSpinning = false;
                spinBtn.disabled = true;
                document.getElementById('spin-btn-text').textContent = 'Đã quay ✅';
                
                if (participantData) {
                    showLoading(true);
                    participantData.prize_won = wonPrize.name;
                    sendDataToGoogleSheet(participantData).then(() => {
                        showLoading(false);
                    });
                }
            }
        }
        animate();
    }

    function showPrize(prize) {
        const prizeDisplay = document.getElementById('prize-display');
        document.getElementById('prize-text').textContent = `You won: ${prize.emoji} ${prize.name}`;
        prizeDisplay.classList.remove('hidden');
    }
 

    function createConfetti() {
        const container = document.getElementById('confetti-container');
        if(!container) return;
        const colors = ['#FF6B6B', '#4ECDC4', '#FFD93D', '#95E1D3', '#F38181', '#AA96DA'];
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'absolute';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = '2px';
            confetti.style.animation = `confetti-fall ${1.5 + Math.random() * 2}s linear forwards`;
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            container.appendChild(confetti);
            setTimeout(() => confetti.remove(), 4000);
        }
    }

    // --- ELEMENT SDK ---
    async function onConfigChange(cfg) {
        config = { ...defaultConfig, ...cfg };
        const titleEl = document.getElementById('quiz-title-display');
        if (titleEl) titleEl.textContent = config.quiz_title || defaultConfig.quiz_title;
        document.body.style.fontFamily = `${config.font_family || defaultConfig.font_family}, sans-serif`;
    }

    function mapToCapabilities(cfg) {
        return {
            recolorables: [],
            borderables: [],
            fontEditable: {
                get: () => cfg.font_family || defaultConfig.font_family,
                set: (value) => { cfg.font_family = value; window.elementSdk.setConfig({ font_family: value }); }
            }
        };
    }

    function mapToEditPanelValues(cfg) {
        return new Map([['quiz_title', cfg.quiz_title || defaultConfig.quiz_title]]);
    }

    if (window.elementSdk) {
        window.elementSdk.init({ defaultConfig, onConfigChange, mapToCapabilities, mapToEditPanelValues });
    }

    initDataSDK();
});