const times = [[0, 25, 30], [0, 5, 30], [0, 50, 25], [5, 30, 30], [1, 0, 2], [0, 2, 30], [0, 50, 25], [0, 30, 30]];
const maxBarsPercent = 0.9;
const maxBarsQuantity = 4.5;
const unit = 'px';

const timeChart = (times, size, unit) => {
    const barValues = [];
    const timeValues = [];

    times.forEach(time => {
        const [h, m, s] = time;
        const barValue = m + (h * 60) + (s / 60);
        const timeValue = (h != 0 ? h + (m != 0 || s != 0 ? 'h ' : 'h') : '') + (m != 0 ? m + (s != 0 ? 'm ' : 'm') : '') + (s != 0 ? s + 's' : '')
        barValues.push(barValue);
        timeValues.push(timeValue);
    });

    const moreBiggerBar = Math.max(...barValues);

    const containerHeight = size[0];
    const containerWidth = size[1];
    const maxBarsHeight = containerHeight * maxBarsPercent;

    const barSizes = [];

    barValues.forEach((time = [], index) => {
        // (( 120 / 10 ) * (( 100 / 120 ) * 5)) = 50
        const relativePersent = ((maxBarsHeight / moreBiggerBar) * ((100 / maxBarsHeight) * time));
        const barHeight = (relativePersent / 100) * maxBarsHeight;
        const barWidth = containerWidth / times.length;
        barSizes.push({ time, strTime: timeValues[index], height: barHeight + unit, width: barWidth + unit });
    });

    return {
        container: {
            height: containerHeight + unit,
            width: containerWidth + unit
        },
        bars: barSizes
    }
}

var obj = timeChart(times, [400, 800], unit);

const body = document.querySelector('body');

const chart = document.createElement('div');
chart.id = 'chart'
chart.style.width = obj.container.width;
chart.style.maxWidth = obj.container.width;
chart.style.minWidth = obj.container.width;
chart.style.height = obj.container.height;

let total = 0;

obj.bars.forEach(bar => {
    const containerW = parseInt(obj.container.width.replace(unit, ''));
    const containerH = parseInt(obj.container.height.replace(unit, ''));
    const barH = parseFloat(bar.height.replace(unit, ''));
    const barTextH = 20;
    
    const barElement = document.createElement('div');
    barElement.classList.add('chart-item');
    barElement.style.minWidth = ((containerW / maxBarsQuantity) >= 70 ? (containerW / maxBarsQuantity) : 70) + unit;
    barElement.style.width = bar.width;
    barElement.style.height = bar.height;
    barElement.style.alignContent = barTextH > barH ? 'start' : 'center';

    const barText = document.createElement('span');
    barText.innerHTML = bar.strTime;
    barText.classList.add('item-text');
    barText.style.height = barTextH + unit;
    barText.style.marginTop = (barTextH > barH ? -(barH + 20) : 3) + unit;
    barText.style.color = (barTextH > barH ? 'rgb(0, 128, 11)' : 'rgb(215, 255, 219)');

    barElement.appendChild(barText);
    chart.appendChild(barElement);

    total += bar.time;
});

const totalTime = document.createElement('span');
totalTime.id = 'total-time';

const h = parseInt(total / 60);
const m = parseInt(((total / 60) - h ) * 60);
const s = Math.round(((((total / 60) - h ) * 60) - m) * 60);

const totalTimeValue = (h != 0 ? h + (m != 0 || s != 0 ? 'h ' : 'h') : '') + (m != 0 ? m + (s != 0 ? 'm ' : 'm') : '') + (s != 0 ? s + 's' : '')

totalTime.innerHTML = totalTimeValue;

body.appendChild(chart);
body.appendChild(totalTime);
