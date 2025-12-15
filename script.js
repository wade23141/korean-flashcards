// =================================================================
// 您的單字資料庫 (與之前相同)
// =================================================================
const wordData = {
    1: [
        { korean: "전공하다", hanja: "專攻하다", chinese: "主修(v.)" },
        { korean: "글씨", hanja: "", chinese: "字" },
        { korean: "꿈", hanja: "", chinese: "夢" },
        { korean: "변호사", hanja: "辯護士", chinese: "律師" },
        { korean: "지점", hanja: "支店", chinese: "分店" },
        { korean: "어느새", hanja: "", chinese: "不知不覺" },
        { korean: "단어", hanja: "單語", chinese: "單字" },
        { korean: "부탁드리다", hanja: "付託드리다", chinese: "拜託、懇託" },
        { korean: "여행사를 차리다", hanja: "旅行社를 차리다", chinese: "開設旅行社" },
        { korean: "정치외교 학과", hanja: "政治外交學科", chinese: "政治外交學系" },
    ],
    2: [
        { korean: "주로", hanja: "主로", chinese: "主要" },
        { korean: "산꼭대기", hanja: "山꼭대기", chinese: "山頂" },
        { korean: "연주하다", hanja: "演奏하다", chinese: "演奏(v.)" },
        { korean: "건강에 좋다", hanja: "健康에 좋다", chinese: "有益健康" },
        { korean: "전혀 안", hanja: "全혀 안", chinese: "完全不..." },
        { korean: "선수", hanja: "選手", chinese: "選手" },
        { korean: "느끼다", hanja: "", chinese: "感覺(v.)" },
        { korean: "언제나", hanja: "", chinese: "無論何時" },
        { korean: "즐겁다", hanja: "", chinese: "愉快的" },
    ],
    3: [
        { korean: "굉장히", hanja: "宏壯히", chinese: "非常" },
        { korean: "옷이 젖다", hanja: "", chinese: "衣服弄濕" },
        { korean: "손이 시리다", hanja: "手이 시리다", chinese: "手冰冷" },
        { korean: "나들이를 하다", hanja: "", chinese: "出門走走" },
        { korean: "날이 개다", hanja: "", chinese: "放晴" },
        { korean: "건조하다", hanja: "乾燥하다", chinese: "乾燥的" },
        { korean: "얇다", hanja: "", chinese: "薄的" },
        { korean: "두껍다", hanja: "", chinese: "厚的" },
        { korean: "대체로", hanja: "大致로", chinese: "大致上" },
    ],
    4: [
        { korean: "싱싱하다", hanja: "", chinese: "新鮮的" },
        { korean: "유행이다", hanja: "流行이다", chinese: "是流行的" },
        { korean: "어울리다", hanja: "", chinese: "合適" },
        { korean: "넓다", hanja: "", chinese: "寬的" },
        { korean: "연하다", hanja: "軟하나", chinese: "淺的" },
        { korean: "진하다", hanja: "津하나", chinese: "深的" },
        { korean: "즐겨 입다", hanja: "", chinese: "喜歡穿" },
        { korean: "직접", hanja: "直接", chinese: "親自" },
        { korean: "잘 나가다", hanja: "", chinese: "賣得好" },
        { korean: "이/가 붙다", hanja: "", chinese: "貼身" },
    ],
    5: [
        { korean: "횡단보도", hanja: "橫斷步道", chinese: "斑馬線" },
        { korean: "쭉 가다", hanja: "", chinese: "直走" },
        { korean: "지나다", hanja: "", chinese: "經過" },
        { korean: "휴게실", hanja: "休憩室", chinese: "休息室" },
        { korean: "우회전하다", hanja: "右回轉하다", chinese: "右轉" },
        { korean: "무엇보다도", hanja: "", chinese: "尤其是" },
        { korean: "요금", hanja: "料金", chinese: "費用" },
        { korean: "골목", hanja: "", chinese: "巷子" },
        { korean: "누르다", hanja: "", chinese: "按、壓" },
        { korean: "생각나다", hanja: "", chinese: "想起" },
    ],
    6: [
        { korean: "계속", hanja: "繼續", chinese: "繼續" },
        { korean: "새롭다", hanja: "", chinese: "新的" },
        { korean: "한가하다", hanja: "閑暇하다", chinese: "閒暇的" },
        { korean: "회사를 옮기다", hanja: "會社를 옮기다", chinese: "換公司" },
        { korean: "봉사 활동", hanja: "奉仕 活動", chinese: "服務活動" },
        { korean: "볼일", hanja: "", chinese: "要做的事" },
        { korean: "웬일이야?", hanja: "", chinese: "怎麼回事？" },
        { korean: "메시지를 남기다", hanja: "message를 남기다", chinese: "留訊息" },
        { korean: "드디어", hanja: "", chinese: "終於" },
        { korean: "신나다", hanja: "", chinese: "興奮" },
    ],
    7: [
        { korean: "닮다", hanja: "", chinese: "像(v.)" },
        { korean: "최선을 다하다", hanja: "最善을 다하다", chinese: "盡力而為" },
        { korean: "첫 번째", hanja: "첫 番째", chinese: "第一次" },
        { korean: "마르다", hanja: "", chinese: "消瘦的" },
        { korean: "벗다", hanja: "", chinese: "脫" },
        { korean: "가방을 메다", hanja: "", chinese: "背背包" },
        { korean: "평소", hanja: "平素", chinese: "平常" },
        { korean: "알아듣다", hanja: "", chinese: "聽懂" },
        { korean: "알아보다", hanja: "", chinese: "認出" },
        { korean: "가늘다", hanja: "", chinese: "細的" },
    ],
};

// =================================================================
// 測驗邏輯
// =================================================================
let allWords = []; // 包含所有課程的單字列表
let currentWords = []; // 隨機排序後的單字列表
let currentIndex = 0;
let isKoreanPrompt = true; // 記錄當前題目是韓文還是中文

// 元素選擇
const startButton = document.getElementById('start-quiz-btn');
const flashcard = document.getElementById('flashcard');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');
const promptDisplay = document.getElementById('prompt-text');
const quizTypeDisplay = document.getElementById('quiz-type');
const correctDisplay = document.getElementById('correct-answer');
const hanjaDisplay = document.getElementById('hanja-translation');
const currentIndexDisplay = document.getElementById('current-index');
const totalWordsDisplay = document.getElementById('total-words');
const quizMessage = document.getElementById('quiz-message');

const answerArea = document.getElementById('answer-area');
const userInput = document.getElementById('user-input');
const checkButton = document.getElementById('check-btn');
const showAnswerButton = document.getElementById('show-answer-btn');

// 初始化所有單字並隨機排序
function loadAllWords() {
    allWords = [];
    // 合併所有課程單字
    for (let i = 1; i <= 7; i++) {
        const lessonWords = wordData[i] || [];
        lessonWords.forEach(word => {
            allWords.push({ ...word, lesson: i }); // 附加課程編號
        });
    }

    // 隨機排序 (Shuffling)
    currentWords = [...allWords];
    for (let i = currentWords.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [currentWords[i], currentWords[j]] = [currentWords[j], currentWords[i]];
    }

    currentIndex = 0;
    answerArea.style.display = 'flex';
    quizMessage.textContent = `已載入所有 ${currentWords.length} 個單字，開始測驗！`;
    
    // 首次顯示卡片
    updateCard();
}

// 根據當前單字和隨機方向更新閃卡內容
function updateCard() {
    if (currentWords.length === 0) {
        promptDisplay.textContent = "請點擊「開始測驗」";
        quizMessage.textContent = "";
        answerArea.style.display = 'none';
        return;
    }

    // 重設狀態
    userInput.value = '';
    quizMessage.textContent = '';
    flashcard.classList.remove('flipped');

    const word = currentWords[currentIndex];
    
    // 隨機決定出題方向 (0: 韓文出題, 1: 中文出題)
    isKoreanPrompt = Math.random() < 0.5; 

    // 更新進度顯示
    currentIndexDisplay.textContent = currentIndex + 1;
    totalWordsDisplay.textContent = currentWords.length;

    // 設定卡片正面（題目）
    if (isKoreanPrompt) {
        promptDisplay.textContent = word.korean;
        quizTypeDisplay.textContent = `韓文 (第 ${word.lesson} 課)`;
        userInput.placeholder = "請輸入中文翻譯...";
    } else {
        promptDisplay.textContent = word.chinese;
        quizTypeDisplay.textContent = `中文 (第 ${word.lesson} 課)`;
        userInput.placeholder = "請輸入韓文翻譯...";
    }

    // 設定卡片背面（答案）
    let answerText = isKoreanPrompt ? word.chinese : word.korean;
    correctDisplay.textContent = answerText;
    hanjaDisplay.textContent = word.hanja ? `漢字: ${word.hanja}` : '(無漢字)';

    // 更新導航按鈕狀態
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === currentWords.length - 1;
    
    // 啟用檢查和顯示答案按鈕
    checkButton.disabled = false;
    showAnswerButton.disabled = false;
}

// 檢查使用者輸入的答案
function checkAnswer() {
    const word = currentWords[currentIndex];
    const userAnswer = userInput.value.trim().toLowerCase();
    
    // 根據題目類型確定正確答案
    let correctAnswer = isKoreanPrompt ? word.chinese : word.korean;
    
    // 簡化比較：去除括號內容和空格
    const cleanAnswer = (text) => text.replace(/\(.*\)/g, '').replace(/ /g, '').toLowerCase();
    
    const cleanUserAnswer = cleanAnswer(userAnswer);
    const cleanCorrectAnswer = cleanAnswer(correctAnswer);

    if (cleanUserAnswer === cleanCorrectAnswer) {
        quizMessage.textContent = "✅ 正確！";
        quizMessage.className = 'message correct';
        
        // 自動翻轉顯示答案並禁用檢查
        flashcard.classList.add('flipped');
        checkButton.disabled = true;
    } else {
        quizMessage.textContent = "❌ 錯誤，請再試一次或點擊「顯示答案」";
        quizMessage.className = 'message wrong';
    }
}

// 顯示正確答案
function showAnswer() {
    quizMessage.textContent = "這是正確答案。";
    quizMessage.className = 'message wrong';
    flashcard.classList.add('flipped');
    checkButton.disabled = true;
    showAnswerButton.disabled = true;
}

// 切換到上一個單字
function goToPreviousWord() {
    if (currentIndex > 0) {
        currentIndex--;
        updateCard();
    }
}

// 切換到下一個單字
function goToNextWord() {
    if (currentIndex < currentWords.length - 1) {
        currentIndex++;
        updateCard();
    }
}

// 事件監聽器
startButton.addEventListener('click', loadAllWords);
checkButton.addEventListener('click', checkAnswer);
showAnswerButton.addEventListener('click', showAnswer);
prevButton.addEventListener('click', goToPreviousWord);
nextButton.addEventListener('click', goToNextWord);

// 允許按 Enter 鍵檢查答案
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !checkButton.disabled) {
        checkAnswer();
    }
});

// 頁面啟動
loadAllWords();
