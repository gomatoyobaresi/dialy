const calendarContainer = document.getElementById('calendar');
const dayReportContainer = document.getElementById('day-report-container');
const reportInput = document.getElementById('report-input');
const saveReportButton = document.getElementById('save-report');
const notification = document.getElementById('notification');

let selectedDay = null;
let reports = JSON.parse(localStorage.getItem('reports')) || {}; // ローカルストレージに保存されたデータを読み込む

// カレンダーを生成する関数
function generateCalendar() {
    const today = new Date();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

    calendarContainer.innerHTML = '';
    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.textContent = day;
        dayDiv.addEventListener('click', () => selectDay(day));
        
        if (reports[day]) {
            dayDiv.classList.add('reported');
        }
        
        calendarContainer.appendChild(dayDiv);
    }
}

// 日を選択する関数
function selectDay(day) {
    selectedDay = day;
    dayReportContainer.style.display = 'block';
    reportInput.value = reports[day] || ''; // 既に記入された日報を表示

    // 選択した日をカレンダーに反映
    const dayDivs = calendarContainer.querySelectorAll('div');
    dayDivs.forEach(div => {
        if (div.textContent == day) {
            div.classList.add('selected');
        } else {
            div.classList.remove('selected');
        }
    });

    notification.textContent = ''; // 通知を消す
}

// 日報を保存する関数
function saveReport() {
    if (selectedDay !== null) {
        const reportText = reportInput.value.trim();
        if (reportText) {
            reports[selectedDay] = reportText;
            localStorage.setItem('reports', JSON.stringify(reports)); // ローカルストレージに保存
            generateCalendar(); // カレンダーを再生成
            dayReportContainer.style.display = 'none'; // 日報フォームを非表示に
            notification.textContent = ''; // 通知を消す
        } else {
            notification.textContent = '日報を記入してください';
        }
    }
}

// 通知機能の実装
function checkForUnreportedDays() {
    const today = new Date();
    const day = today.getDate();
    if (!reports[day]) {
        notification.textContent = '本日の日報が記入されていません！';
    }
}

// 初期設定
generateCalendar();
checkForUnreportedDays();
saveReportButton.addEventListener('click', saveReport);
