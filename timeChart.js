const times = [[1,5,8],[0,17,30], [0, 58, 32],[0,32,0],[0,30,0]];

const timeChart = (times, size, unit) => {
    const barValues = [];

    times.forEach(time => {
        const [h, m, s] = time;
        const timeValue = m + (h * 60) + (s / 60);
        barValues.push(timeValue)
    });

    const moreBiggerBar = Math.max(...barValues);

    const containerHeight = size[0];
    const containerWidth = size[1];
    const maxBarsHeight = containerHeight * 0.95;

    const barSizes = [];
    
    barValues.forEach((time = []) => {
        // (( 120 / 10 ) * (( 100 / 120 ) * 5)) = 50
        const relativePersent = ((maxBarsHeight / moreBiggerBar) * ((100 / maxBarsHeight) * time));
        const barHeight = (relativePersent / 100) * maxBarsHeight;
        const barWidth = containerWidth / times.length;
        barSizes.push({ time: parseInt(time.toString()) + ' min', height: barHeight + unit, width: barWidth + unit});
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

var obj = timeChart(times , [120, 310], unit);

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
    barElement.innerHTML = bar.time;

    chart.appendChild(barElement);

    total += parseInt(bar.time.replace(unit, ''));
});

const totalTime = document.createElement('span');
totalTime.id = 'total-time';
totalTime.innerHTML = total + 'm';

body.appendChild(chart);
body.appendChild(totalTime);