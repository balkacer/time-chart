const times = [[1, 0, 2], [0, 25, 30], [0, 50, 25], [0, 30, 30]]; // total time is (2h 46m 27s)
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
    const maxBarsHeight = containerHeight * 0.95;

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

const unit = 'px';

var obj = timeChart(times, [120, 310], unit);

const body = document.querySelector('body');

const chart = document.createElement('div');
chart.id = 'chart'
chart.style.width = obj.container.width;
chart.style.height = obj.container.height;

let total = 0;

obj.bars.forEach(bar => {
    const barElement = document.createElement('div');
    barElement.classList.add('chart-item');
    barElement.style.width = bar.width;
    barElement.style.height = bar.height;
    barElement.innerHTML = bar.strTime;

    chart.appendChild(barElement);

    total += bar.time;
});

const totalTime = document.createElement('span');
totalTime.id = 'total-time';

console.log(total);

const h = parseInt(total / 60);
const m = parseInt(((total / 60) - h ) * 60);
const s = Math.round(((((total / 60) - h ) * 60) - m) * 60);

console.log(((((total / 60) - h ) * 60) - m) * 60);

const totalTimeValue = (h != 0 ? h + (m != 0 || s != 0 ? 'h ' : 'h') : '') + (m != 0 ? m + (s != 0 ? 'm ' : 'm') : '') + (s != 0 ? s + 's' : '')

totalTime.innerHTML = totalTimeValue;

body.appendChild(chart);
body.appendChild(totalTime);