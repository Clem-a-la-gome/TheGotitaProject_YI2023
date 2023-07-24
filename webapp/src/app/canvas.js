import { mean, median } from "./math/mean.js"
const barCanvas = document.querySelectorAll("#bar-canvas")
const lineCanvas = document.querySelectorAll("#line-canvas")
import "https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns/dist/chartjs-adapter-date-fns.bundle.min.js"

export const setupBarCanvas = (data) => {

    data.forEach(doc => {

        const dataBarChart = doc.data()

        const meanCty = mean(dataBarChart.cty)
        const meanTdy = mean(dataBarChart.tdy)
        const meanTmp = mean(dataBarChart.tmp)
        const meanPh = mean(dataBarChart.ph)
        const meanDo = mean(dataBarChart.do)
        const labelsBarChart = dataBarChart.var

        const barChart = new Chart(barCanvas, {

            type: "bar",
            data: {
                labels: labelsBarChart,
                datasets: [{
                    label:"Sensor_1",
                    data: [meanCty, meanTdy, meanTmp, meanPh, meanDo],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)'
                      ],
                      borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)'
                      ],
                      borderWidth: 1
                }]
            }
        })

    })

}

export const setupLineCanvas = (data) => {

    data.forEach(doc => {


        const dataLineChart = doc.data()

        const cty = dataLineChart.cty
        const tdy = dataLineChart.tdt
        const tmp = dataLineChart.tmp
        const ph = dataLineChart.ph
        const dox = dataLineChart.do
        const labelsLineChart = dataLineChart.dates

        const lineChart = new Chart(lineCanvas, {

            type: "line",
            data: {
                labels: ['yes', 'no'],
                datasets: [{
                    label: "Line",
                    data: [
                        {x: labelsLineChart[0], y: cty[0]},
                        {x: labelsLineChart[1], y: cty[1]},
                    ],
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }],
            options: {
                scales : {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day'
                        } 
                    },
                    y: {
                        beginAtZero: true
                    }
                }
                
            }
                
            }
        })

    })

}


