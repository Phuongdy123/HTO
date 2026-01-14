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
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzHinyWMCmrDYQstR_305iNIr6vfusv4xMYR8fTB-uDETN9M68UuyuqQDi-iuxN0a4T/exec';

    // Hàm gửi dữ liệu chung
    async function sendDataToGoogleSheet(data) {
        if (!data) return;
        
        const formData = new FormData();
        formData.append("fullname", data.full_name);
        formData.append("school", data.school_name);
        
        let phoneVal = data.phone_consent ? "Đồng ý cung cấp SĐT" : "Không";
        formData.append("phone", phoneVal);
        
        formData.append("score", data.score || 0);
        formData.append("prize", data.prize_won || "");

        try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                body: formData,
                mode: 'no-cors' // <--- BẮT BUỘC PHẢI CÓ DÒNG NÀY
            });
            console.log("Đã gửi dữ liệu (no-cors)!");
        } catch (error) {
            console.error("Lỗi gửi dữ liệu:", error);
        }
    }
    // --- CẤU HÌNH LƯU TRỮ (LOCAL STORAGE) ---
    const STORAGE_KEY = 'quiz_user_session_v1';

    function saveSession(data) {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) { console.error(e); }
    }

    function getSession() {
        try { return JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch (e) { return null; }
    }

    // --- DATA SDK (Giữ nguyên) ---
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
    // --- XỬ LÝ SỰ KIỆN (EVENT LISTENERS) - CÓ KIỂM TRA AN TOÀN ---
    // ============================================================

    // 1. NÚT START
    const startBtn = document.getElementById('start-btn');
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            const savedData = getSession();
            if (savedData) {
                participantData = savedData;
                console.log("Chào mừng trở lại:", participantData.full_name);
                showScreen('language'); // Có thông tin cũ -> Vào chọn ngôn ngữ
            } else {
                showScreen('form'); // Chưa có -> Vào nhập form
            }
        });
    }

    // 2. FORM SUBMIT
  const infoForm = document.getElementById('info-form');
    if (infoForm) {
        infoForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submit-form-btn');
            const originalText = submitBtn.innerHTML;
            
            // Hiệu ứng loading
            submitBtn.innerHTML = 'Đang tải... ⏳';
            submitBtn.disabled = true;

            const fullName = document.getElementById('full-name').value.trim();
            const schoolName = document.getElementById('school-name').value.trim();
            // Nếu bạn đã đổi checkbox thành input số điện thoại thì sửa dòng dưới:
            const phoneElement = document.getElementById('phone-number'); 
            const phoneConsent = phoneElement ? phoneElement.value : document.getElementById('phone-consent').checked;
            
            if (!fullName || !schoolName) {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                return;
            }
            
            participantData = {
                full_name: fullName,
                school_name: schoolName,
                phone_consent: phoneConsent,
                score: 0,
                language: '',
                completed_at: new Date().toISOString(),
                unlocked_wheel: false,
                prize_won: ''
            };
            
            saveSession(participantData);

            // --- GỬI DỮ LIỆU LẦN 1: ĐĂNG KÝ ---
            await sendDataToGoogleSheet(participantData);
            
            // Trả lại nút và chuyển trang
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            showScreen('language'); 
        });
    }

    // 3. CÁC NÚT CHỌN NGÔN NGỮ
    const langButtons = document.querySelectorAll('.lang-btn');
    if (langButtons.length > 0) {
        langButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const lang = this.getAttribute('data-lang');
                
                // Gọi hàm từ DataModel.js để lấy câu hỏi
                if (typeof setQuestionsByLanguage === 'function') {
                    const isSuccess = setQuestionsByLanguage(lang);
                    
                    if (isSuccess) {
                        // Cập nhật ngôn ngữ vào session
                        if (participantData) {
                            participantData.language = lang;
                            saveSession(participantData);
                        }

                        // Reset điểm số cho lượt chơi mới
                        score = 0;
                        correctCount = 0;
                        currentQuestion = 0;

                        showScreen('quiz');
                        renderQuestion();
                    } else {
                        alert("Bộ câu hỏi ngôn ngữ này đang cập nhật, vui lòng quay lại sau!");
                    }
                } else {
                    console.error("Lỗi: Không tìm thấy hàm setQuestionsByLanguage trong DataModel.js");
                }
            });
        });
    }

    // 4. CÁC NÚT ĐIỀU HƯỚNG QUIZ
    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) {
        nextBtn.addEventListener('click', nextQuestion);
    }

    const restartBtn = document.getElementById('restart-btn');
    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            // Chơi lại -> Quay về chọn ngôn ngữ
            showScreen('language');
        });
    }

    // 5. CÁC NÚT VÒNG QUAY (LUCKY WHEEL)
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
        // Kiểm tra xem đã có câu hỏi chưa
        if (typeof questions === 'undefined' || !questions || questions.length === 0) {
            console.error("Danh sách câu hỏi trống!");
            return;
        }

        const q = questions[currentQuestion];
        document.getElementById('question-text').textContent = q.question;
        document.getElementById('q-number').textContent = currentQuestion + 1;
        document.getElementById('current-q').textContent = currentQuestion + 1;
        
        // Cập nhật tổng số câu hỏi trên giao diện
        const totalEl = document.getElementById('total-q');
        if(totalEl) totalEl.textContent = questions.length; // Nếu bạn chưa thêm id này vào HTML thì bỏ qua cũng được

        document.getElementById('question-category').textContent = q.category;
        
        const progress = ((currentQuestion + 1) / questions.length) * 100;
        document.getElementById('progress-bar').style.width = `${progress}%`;
        
        const container = document.getElementById('answers-container');
        container.innerHTML = '';
        
        q.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'flex items-center w-full gap-4 p-4 font-bold text-left text-white shadow-lg answer-btn rounded-2xl';
            btn.style.background = answerColors[index % answerColors.length];
            btn.dataset.answer = index;
            btn.innerHTML = `
                <span class="w-10 h-10 bg-white/30 rounded-xl flex items-center justify-center text-lg font-black">${String.fromCharCode(65 + index)}</span>
                <span class="flex-1 text-lg">${option}</span>
                <span class="text-2xl">${answerEmojis[index % answerEmojis.length]}</span>
            `;
            btn.addEventListener('click', () => selectAnswer(index));
            container.appendChild(btn);
        });
        
        selectedAnswer = null;
        answered = false;
        document.getElementById('feedback').classList.add('hidden');
        disableNextButton();
    }

    function selectAnswer(index) {
        if (answered) return;
        
        answered = true;
        selectedAnswer = index;
        
        const q = questions[currentQuestion];
        const isCorrect = index === q.correct;
        
        if (isCorrect) {
            score += 5;
            correctCount++;
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
            feedback.style.background = 'linear-gradient(135deg, #10B981 0%, #34D399 100%)';
            feedback.style.color = 'white';
            feedback.innerHTML = '🎉 Chính xác! +5 điểm !';
        } else {
            feedback.style.background = 'linear-gradient(135deg, #EF4444 0%, #F87171 100%)';
            feedback.style.color = 'white';
            feedback.innerHTML = `❌ Đáp án đúng: ${questions[currentQuestion].options[correctIndex]}`;
        }
    }

    function highlightAnswers(selected, correct) {
        const buttons = document.querySelectorAll('.answer-btn');
        buttons.forEach((btn, index) => {
            btn.style.pointerEvents = 'none';
            if (index === correct) {
                btn.style.background = 'linear-gradient(135deg, #10B981 0%, #34D399 100%)';
                btn.style.transform = 'scale(1.05)';
                btn.style.boxShadow = '0 0 30px rgba(16, 185, 129, 0.5)';
            } else if (index === selected && index !== correct) {
                btn.style.background = 'linear-gradient(135deg, #EF4444 0%, #F87171 100%)';
                btn.style.opacity = '0.7';
            } else {
                btn.style.opacity = '0.5';
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
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            renderQuestion();
        } else {
            await showResults();
        }
    }

    async function showResults() {
    // 1. Tính toán điểm số & UI (Giữ nguyên)
    const percentage = Math.round((correctCount / questions.length) * 100);
    const unlockedWheel = score >= 60; 
    
    document.getElementById('final-score').textContent = score;
    document.getElementById('correct-answers').textContent = correctCount;
    document.getElementById('percentage').textContent = `${percentage}%`;
    
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
    
    // 2. CẬP NHẬT DỮ LIỆU & GỬI ĐI (Phần mới bổ sung)
    if (participantData) {
        // Cập nhật điểm số vào biến dữ liệu người chơi
        participantData.score = score;
        participantData.unlocked_wheel = unlockedWheel;
        saveSession(participantData); // Lưu lại vào LocalStorage phòng khi reload

        // Bật hiệu ứng loading để người dùng biết đang lưu
        showLoading(true);

        try {
            // --- GỬI VỀ GOOGLE SHEET ---
            // Hàm này phải được khai báo ở đầu file như hướng dẫn trước
            if (typeof sendDataToGoogleSheet === 'function') {
                await sendDataToGoogleSheet(participantData);
            } else {
                console.warn("Chưa khai báo hàm sendDataToGoogleSheet");
            }

            // --- GỬI VỀ DATA SDK (Code cũ của bạn) ---
            if (window.dataSdk) {
                const result = await window.dataSdk.create(participantData);
                if (!result.isOk) console.error('Failed to save participant data SDK');
            }
        } catch (err) {
            console.error("Lỗi khi lưu dữ liệu cuối game:", err);
        } finally {
            // Tắt loading dù thành công hay thất bại
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
                
                if (participantData && window.dataSdk) {
                    showLoading(true);
                    participantData.prize_won = wonPrize.name;
                    showLoading(false);
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

    // --- ELEMENT SDK (Giữ nguyên) ---
    async function onConfigChange(cfg) {
        config = { ...defaultConfig, ...cfg };
        const titleEl = document.getElementById('quiz-title-display');
        if (titleEl) titleEl.textContent = config.quiz_title || defaultConfig.quiz_title;
        // ... các config khác tương tự ...
        document.body.style.fontFamily = `${config.font_family || defaultConfig.font_family}, sans-serif`;
    }

    function mapToCapabilities(cfg) {
        return {
            recolorables: [], // Rút gọn cho ngắn
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