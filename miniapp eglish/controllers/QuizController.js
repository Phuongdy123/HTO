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
    
    // URL Google Apps Script của bạn
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwY1lyZTBZP_zpnSP3_6_fKo3NZZY21z1tCS1eJTPMGtJlCrgBJcr5CrBC77yxvDQrW/exec';

    // --- CÁC HÀM HỖ TRỢ LOGIC (THUẬT TOÁN) ---

    // 1. Hàm khởi tạo bộ đếm kỹ năng (Gọi khi bắt đầu Quiz)
    function initSkillTracker() {
        skillMetrics = {};
        questions.forEach(q => {
            // Lấy category, nếu không có thì gán mặc định
            const cat = q.category ? q.category.toUpperCase() : 'GENERAL';
            
            if (!skillMetrics[cat]) {
                skillMetrics[cat] = { current: 0, total: 0 };
            }
            // Mỗi câu (dù trắc nghiệm hay viết) đều tính 5 điểm tối đa
            skillMetrics[cat].total += 5; 
        });
    }

    // 2. Hàm xếp loại học viên dựa trên điểm số
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

    // 3. Hàm gửi dữ liệu lên Google Sheet (Full fields)
    async function sendDataToGoogleSheet(data) {
        if (!data) return;
        
        const formData = new FormData();
        formData.append("fullname", data.full_name);
        formData.append("school", data.school_name);
        formData.append("phone", data.phone_number);
        formData.append("email", data.email);
        formData.append("score", data.score || 0);
        formData.append("rank", data.rank || "");           // Xếp loại
        formData.append("skills", data.skill_breakdown || ""); // Chi tiết kỹ năng
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
    const STORAGE_KEY = 'quiz_user_session_v2'; // Đổi key v2 để tránh cache cũ

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
                writing_responses: [], // Khởi tạo mảng lưu bài viết
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
                        
                        // Khởi tạo bộ đếm kỹ năng
                        initSkillTracker();

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
    // --- LOGIC QUIZ ---
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
        document.getElementById('question-text').textContent = q.question;
        
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
   // A. LISTENING (SỬ DỤNG TRỢ LÝ ẢO TRÌNH DUYỆT)
        if (q.type === 'listening' && q.audioScript) {
            const audioDiv = document.createElement('div');
            audioDiv.className = "p-4 mb-6 text-center border border-blue-100 bg-blue-50 rounded-2xl";
            
            // Tạo ID duy nhất cho nút để xử lý animation
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

            // Gắn sự kiện Click để đọc
            setTimeout(() => {
                const btn = document.getElementById(btnId);
                const ping = document.getElementById(`${btnId}-ping`);
                
                if (btn) {
                    btn.addEventListener('click', () => {
                        // Ngừng các âm thanh đang đọc dở (nếu có)
                        window.speechSynthesis.cancel();

                        // Tạo giọng đọc mới
                        const utterance = new SpeechSynthesisUtterance(q.audioScript);
                        
                        // Thiết lập ngôn ngữ (Nếu trong data không có thì mặc định tiếng Anh)
                        utterance.lang = q.langCode || 'en-US'; 
                        utterance.rate = 0.9; // Tốc độ đọc (0.9 là vừa phải, 1 là bình thường)
                        
                        // Hiệu ứng khi bắt đầu đọc
                        utterance.onstart = () => {
                            btn.classList.add('bg-green-500', 'hover:bg-green-600');
                            btn.classList.remove('bg-blue-500', 'hover:bg-blue-600');
                            btn.querySelector('span:nth-child(2)').textContent = "Đang đọc...";
                            if(ping) ping.classList.remove('hidden');
                        };

                        // Hiệu ứng khi đọc xong
                        utterance.onend = () => {
                            btn.classList.add('bg-blue-500', 'hover:bg-blue-600');
                            btn.classList.remove('bg-green-500', 'hover:bg-green-600');
                            btn.querySelector('span:nth-child(2)').textContent = "Nghe lại";
                            if(ping) ping.classList.add('hidden');
                        };

                        // Bắt đầu đọc
                        window.speechSynthesis.speak(utterance);
                    });
                }
            }, 0);
        }

        // B. WRITING
        if (q.type === 'writing') {
            const wrapper = document.createElement('div');
            wrapper.className = "w-full";
            
            const textArea = document.createElement('textarea');
            textArea.id = 'writing-input';
            textArea.className = "w-full h-32 p-4 text-gray-700 transition-all border-2 border-gray-200 resize-none bg-gray-50 rounded-xl focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100";
            textArea.placeholder = "Nhập câu trả lời của bạn tại đây...";
            
            textArea.addEventListener('input', (e) => {
                if(e.target.value.trim().length > 0) {
                    enableNextButton(); 
                } else {
                    disableNextButton();
                }
            });

            wrapper.appendChild(textArea);
            container.appendChild(wrapper);
            return; // Writing xong là return, không render nút trắc nghiệm
        }

        // C. MULTIPLE CHOICE
        if (q.options && q.options.length > 0) {
            q.options.forEach((option, index) => {
                const btn = document.createElement('button');
                btn.className = 'flex items-center w-full gap-4 p-4 font-bold text-left text-white shadow-md answer-btn rounded-xl transition-all transform hover:scale-[1.01] active:scale-95';
                
                // Màu sắc gradient cho nút
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

        if (isCorrect) {
            score += 5;
            correctCount++;
            // Cập nhật điểm kỹ năng
            if(skillMetrics[cat]) skillMetrics[cat].current += 5;
        }
        
        document.getElementById('score-display').textContent = score;
        showFeedback(isCorrect, q.correct);
        highlightAnswers(index, q.correct);
        enableNextButton();
    }

    function showFeedback(isCorrect, correctIndex) {
        const feedback = document.getElementById('feedback');
        feedback.classList.remove('hidden');
        
        if (isCorrect) {
            feedback.style.background = '#dcfce7'; // green-100
            feedback.style.color = '#15803d';      // green-700
            feedback.style.border = '1px solid #86efac';
            feedback.innerHTML = '🎉 Chính xác! +5 điểm';
        } else {
            feedback.style.background = '#fee2e2'; // red-100
            feedback.style.color = '#b91c1c';      // red-700
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
        document.getElementById('next-btn-text').textContent = 'Chọn đáp án';
        document.getElementById('next-btn-icon').textContent = '👆';
    }

    async function nextQuestion() {
        const q = questions[currentQuestion];

        // --- XỬ LÝ LƯU BÀI VIẾT (WRITING) ---
        if (q.type === 'writing') {
            const inputVal = document.getElementById('writing-input').value;
            
            if (!participantData.writing_responses) participantData.writing_responses = [];
            participantData.writing_responses.push(`Q${currentQuestion+1}: ${inputVal}`);

            // Cộng điểm hoàn thành
            score += 5; 
            
            // Cập nhật điểm kỹ năng Writing
            const cat = 'WRITING';
            if(skillMetrics[cat]) skillMetrics[cat].current += 5;
            
            document.getElementById('score-display').textContent = score;
        }

        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            renderQuestion();
        } else {
            await showResults();
        }
    }

    async function showResults() {
        const percentage = Math.round((correctCount / questions.length) * 100);
        const unlockedWheel = score >= 60; 
        
        // 1. GỌI THUẬT TOÁN XẾP LOẠI
        const rankInfo = getStudentRank(score);

        // 2. HIỂN THỊ CƠ BẢN
        document.getElementById('final-score').textContent = score;
        document.getElementById('correct-answers').textContent = correctCount;
        document.getElementById('percentage').textContent = `${percentage}%`;

        // Cập nhật Tiêu đề Kết quả theo Xếp loại
        const titleEl = document.querySelector('#screen-results h2'); 
        if(titleEl) {
            titleEl.textContent = rankInfo.label;
            titleEl.className = `mb-1 text-3xl font-black ${rankInfo.color}`;
        }
        const subTitleEl = document.querySelector('#screen-results p');
        if(subTitleEl) {
            subTitleEl.textContent = rankInfo.message;
        }

        // 3. TẠO HTML HIỂN THỊ KỸ NĂNG (SKILL BARS)
        let skillsHTML = '<div class="space-y-3 mb-6 w-full p-4 bg-gray-50 rounded-2xl border border-gray-100">';
        for (const [cat, data] of Object.entries(skillMetrics)) {
            // Tránh chia cho 0
            const total = data.total > 0 ? data.total : 1;
            const percent = Math.round((data.current / total) * 100);
            
            let displayCat = cat;
            if(cat === 'LISTENING') displayCat = '🎧 Nghe Hiểu';
            else if(cat === 'READING') displayCat = '📖 Đọc Hiểu';
            else if(cat === 'GRAMMAR') displayCat = '✍️ Ngữ Pháp';
            else if(cat === 'VOCABULARY') displayCat = '🔤 Từ Vựng';
            else if(cat === 'WRITING') displayCat = '📝 Kỹ Năng Viết';

            skillsHTML += `
                <div class="flex flex-col gap-1">
                    <div class="flex justify-between text-xs font-bold text-gray-600 uppercase tracking-wide">
                        <span>${displayCat}</span>
                        <span>${data.current}/${data.total}</span>
                    </div>
                    <div class="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                        <div class="h-full bg-blue-500 rounded-full transition-all duration-1000" style="width: ${percent}%"></div>
                    </div>
                </div>
            `;
        }
        skillsHTML += '</div>';

        // Chèn vào giao diện (tìm vị trí thích hợp)
        const resultCard = document.querySelector('#screen-results .card-3d');
        let skillsContainer = document.getElementById('skills-breakdown');
        if (!skillsContainer) {
            skillsContainer = document.createElement('div');
            skillsContainer.id = 'skills-breakdown';
            // Chèn trước nút Unlock Message hoặc trước Grid thống kê
            const beforeTarget = document.getElementById('unlock-message') || document.querySelector('#screen-results .grid');
            if(beforeTarget && resultCard) {
                resultCard.insertBefore(skillsContainer, beforeTarget);
            }
        }
        skillsContainer.innerHTML = skillsHTML;

        // 4. LOGIC VÒNG QUAY & LƯU DATA
        const unlockMsg = document.getElementById('unlock-message');
        const spinBtn = document.getElementById('spin-wheel-btn');

        if (score === 100) document.getElementById('result-emoji').textContent = '🏆';
        else if (score >= 80) document.getElementById('result-emoji').textContent = '🎉';
        else if (score >= 60) document.getElementById('result-emoji').textContent = '😊';
        else document.getElementById('result-emoji').textContent = '💪';
        
        if (unlockedWheel) {
            if(unlockMsg) unlockMsg.classList.remove('hidden');
            if(spinBtn) spinBtn.classList.remove('hidden');
            createConfetti();
        } else {
            if(unlockMsg) unlockMsg.classList.add('hidden');
            if(spinBtn) spinBtn.classList.add('hidden');
        }
        
        if (participantData) {
            participantData.score = score;
            participantData.unlocked_wheel = unlockedWheel;
            participantData.rank = rankInfo.label;
            
            // Tạo chuỗi tóm tắt kỹ năng gửi về sheet
            let skillReport = [];
            for (const [cat, data] of Object.entries(skillMetrics)) {
                 skillReport.push(`${cat}: ${data.current}/${data.total}`);
            }
            participantData.skill_breakdown = skillReport.join(' | ');

            saveSession(participantData); 

            showLoading(true);
            try {
                await sendDataToGoogleSheet(participantData);
                
                if (window.dataSdk) {
                    await window.dataSdk.create(participantData);
                }
            } catch (err) {
                console.error(err);
            } finally {
                showLoading(false);
            }
        }
        
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