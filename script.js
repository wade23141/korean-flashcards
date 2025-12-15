(() => {
  // If you want to replace with server data, change this array or provide a loader
  const lessons = [
    {
      id: 1,
      title: "��1課 基本問候",
      words: [
        { korean: "안녕하세요", chinese: "你好", hanja: "" },
        { korean: "감사합니다", chinese: "謝謝", hanja: "" },
        { korean: "미안합니다", chinese: "對不起", hanja: "" },
        { korean: "네", chinese: "是/對", hanja: "" },
        { korean: "아니요", chinese: "不是/不對", hanja: "" }
      ]
    },
    {
      id: 2,
      title: "第2課 數字與時間",
      words: [
        { korean: "하나", chinese: "一", hanja: "一" },
        { korean: "둘", chinese: "二", hanja: "二" },
        { korean: "셋", chinese: "三", hanja: "三" },
        { korean: "오늘", chinese: "今天", hanja: "今日" },
        { korean: "어제", chinese: "昨天", hanja: "昨日" }
      ]
    },
    {
      id: 3,
      title: "第3課 日常用語",
      words: [
        { korean: "사랑해요", chinese: "我愛你", hanja: "愛" },
        { korean: "축하합니다", chinese: "恭喜", hanja: "" },
        { korean: "잘 먹겠습니다", chinese: "我會好好享用（飯前）", hanja: "" },
        { korean: "잘 먹었습니다", chinese: "我吃飽了（飯後）", hanja: "" }
      ]
    }
  ];

  const USER_LOGIN = (typeof window !== "undefined" && window.USER_LOGIN) || "wade23141";
  const STORAGE_KEY = `flashcard_state_${USER_LOGIN}`;

  const lessonSelect = document.getElementById("lesson-select");
  const startBtn = document.getElementById("start-quiz-btn");
  const currentLessonEl = document.getElementById("current-lesson");
  const currentIndexEl = document.getElementById("current-index");
  const totalWordsEl = document.getElementById("total-words");
  const koreanWordEl = document.getElementById("korean-word");
  const chineseEl = document.getElementById("chinese-translation");
  const hanjaEl = document.getElementById("hanja-translation");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const flashcard = document.getElementById("flashcard");
  const quizMessage = document.getElementById("quiz-message");

  let currentLessonIdx = 0;
  let currentIndex = 0;
  let order = []; // holds shuffled indexes
  let isStarted = false;

  function saveState() {
    const payload = {
      currentLessonIdx, currentIndex, order, isStarted, timestamp: Date.now()
    };
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(payload)); } catch (e) {}
  }
  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const s = JSON.parse(raw);
      if (s && typeof s === "object") {
        currentLessonIdx = s.currentLessonIdx ?? currentLessonIdx;
        currentIndex = s.currentIndex ?? currentIndex;
        order = Array.isArray(s.order) && s.order.length ? s.order : [];
        isStarted = !!s.isStarted;
      }
    } catch (e) {}
  }

  function populateLessons() {
    lessonSelect.innerHTML = "";
    lessons.forEach((ls, i) => {
      const opt = document.createElement("option");
      opt.value = i;
      opt.textContent = ls.title || `第 ${ls.id} 課`;
      lessonSelect.appendChild(opt);
    });
  }

  function buildOrder(n) {
    const arr = Array.from({length:n}, (_,i)=>i);
    return arr;
  }

  function shuffleArray(a){
    for(let i=a.length-1;i>0;i--){
      const j = Math.floor(Math.random()*(i+1));
      [a[i],a[j]]=[a[j],a[i]];
    }
    return a;
  }

  function renderCard() {
    const lesson = lessons[currentLessonIdx];
    if (!lesson) return;
    const wordCount = lesson.words.length;
    totalWordsEl.textContent = wordCount;
    currentLessonEl.textContent = lesson.id || lesson.title || (currentLessonIdx+1);
    if (!order || order.length !== wordCount) order = buildOrder(wordCount);

    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex >= wordCount) currentIndex = wordCount - 1;

    const idx = order[currentIndex];
    const item = lesson.words[idx];
    currentIndexEl.textContent = (currentIndex + 1);
    koreanWordEl.textContent = item ? item.korean : "—";
    chineseEl.textContent = item && item.chinese ? item.chinese : "";
    hanjaEl.textContent = item && item.hanja ? item.hanja : "";

    flashcard.classList.remove("flipped");

    prevBtn.disabled = currentIndex <= 0;
    nextBtn.disabled = currentIndex >= lesson.words.length - 1;

    if (!isStarted) {
      quizMessage.textContent = '點擊「開始測驗」以開始。';
    } else {
      quizMessage.textContent = '';
    }

    saveState();
  }

  function startQuiz({shuffle=false} = {}) {
    isStarted = true;
    currentLessonIdx = parseInt(lessonSelect.value, 10) || 0;
    const wordCount = lessons[currentLessonIdx].words.length;
    order = buildOrder(wordCount);
    if (shuffle) shuffleArray(order);
    currentIndex = 0;
    renderCard();
    quizMessage.textContent = `第 ${lessons[currentLessonIdx].id} 課 — ${wordCount} 個單字，按卡片查看答案。`;
    saveState();
  }

  function flipCard() {
    flashcard.classList.toggle("flipped");
  }

  function prev() {
    if (currentIndex > 0) {
      currentIndex--;
      renderCard();
    }
  }
  function next() {
    const max = lessons[currentLessonIdx].words.length - 1;
    if (currentIndex < max) {
      currentIndex++;
      renderCard();
    } else {
      quizMessage.textContent = "已到達本課最後一題。按「重新載入」或左側選單選擇其他課。";
    }
  }

  function attachEvents() {
    startBtn.addEventListener("click", () => {
      const wantShuffle = confirm("是否要洗牌 (亂序) 單字？ 按「確定」洗牌，按「取消」維持順序。");
      startQuiz({shuffle: wantShuffle});
    });

    lessonSelect.addEventListener("change", () => {
      currentLessonIdx = parseInt(lessonSelect.value, 10) || 0;
      currentIndex = 0;
      isStarted = false;
      order = [];
      renderCard();
    });

    prevBtn.addEventListener("click", (e)=> { e.stopPropagation(); prev(); });
    nextBtn.addEventListener("click", (e)=> { e.stopPropagation(); next(); });
    flashcard.addEventListener("click", (e) => {
      flipCard();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") { prev(); }
      else if (e.key === "ArrowRight") { next(); }
      else if (e.code === "Space") { e.preventDefault(); flipCard(); }
    });
  }

  function init() {
    populateLessons();
    loadState();
    if (lessonSelect.options.length > 0) {
      lessonSelect.value = currentLessonIdx || 0;
    }
    attachEvents();
    renderCard();
  }

  window.flashcardQuiz = {
    startQuiz, prev, next, flipCard, getState: () => ({currentLessonIdx, currentIndex, order, isStarted})
  };

  init();
})();
