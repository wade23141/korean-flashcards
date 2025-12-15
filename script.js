// =================================================================
// 您的單字資料庫
// =================================================================
const wordData = {
    // 第 1 課
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
    // 第 2 課
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
    // 第 3 課
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
    // 第 4 課
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
    // 第 5 課
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
    // 第 6 課
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
    // 第 7 課
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
let currentWords = []; // 當前選擇課程的單字列表
let currentIndex = 0;
let currentLesson = 1;

// 元素選擇
const lessonSelect = document.getElementById('lesson-select');
const startButton = document.getElementById('start-quiz-btn');
const flashcard = document.getElementById('flashcard');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');
const koreanDisplay = document.getElementById('korean-word');
const chineseDisplay = document.getElementById('chinese-translation');
const hanjaDisplay = document.getElementById('hanja-translation');
const currentIndexDisplay = document.getElementById('current-index');
const totalWordsDisplay = document.getElementById('total-words');
const currentLessonDisplay = document.getElementById('current-lesson');
const quizMessage = document.getElementById('quiz-message');

// 初始化課程選單
function initializeLessonSelect() {
    for (let i = 1; i <= 7; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `第 ${i} 課`;
        lessonSelect.appendChild(option);
    }
}

// 載入並隨機排序單字
function loadWords() {
    currentLesson = parseInt(lessonSelect.value);
    currentWords = [...wordData[currentLesson]];
    
    // 隨機排序 (Shuffling)
    for (let i = currentWords.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [currentWords[i], currentWords[j]] = [currentWords[j], currentWords[i]];
    }

    currentIndex = 0;
    updateCard();
    quizMessage.textContent = `已載入第 ${currentLesson} 課，共 ${currentWords.length} 個單字。`;
}

// 更新閃卡內容
function updateCard() {
    if (currentWords.length === 0) {
        koreanDisplay.textContent = "請選擇課程並點擊開始";
        chineseDisplay.textContent = "";
        hanjaDisplay.textContent = "";
        currentIndexDisplay.textContent = 0;
        totalWordsDisplay.textContent = 0;
        currentLessonDisplay.textContent = "N/A";
        prevButton.disabled = true;
        nextButton.disabled = true;
        flashcard.classList.remove('flipped');
        return;
    }

    const word = currentWords[currentIndex];

    // 更新進度顯示
    currentIndexDisplay.textContent = currentIndex + 1;
    totalWordsDisplay.textContent = currentWords.length;
    currentLessonDisplay.textContent = currentLesson;

    // 更新卡片內容
    koreanDisplay.textContent = word.korean;
    chineseDisplay.textContent = word.chinese;
    // 顯示漢字，如果沒有則顯示 (無漢字)
    hanjaDisplay.textContent = word.hanja ? `(${word.hanja})` : '(無漢字)';

    // 確保卡片是正面
    flashcard.classList.remove('flipped');
    
    // 更新導航按鈕狀態
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === currentWords.length - 1;
}

// 翻轉卡片
function flipCard() {
    if (currentWords.length > 0) {
        flashcard.classList.toggle('flipped');
    }
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
startButton.addEventListener('click', loadWords);
prevButton.addEventListener('click', goToPreviousWord);
nextButton.addEventListener('click', goToNextWord);

// 頁面啟動
initializeLessonSelect();
loadWords(); // 初始載入第 1 課
