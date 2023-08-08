import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js"
import {auth, db, storage} from './app/firebase.js'
import { ref } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";
import { getDocs, collection, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js"
import { loginCheck } from "./app/loginCheck.js"
import { setupId } from "./app/sensorList.js"
import { mean } from "./app/math/mean.js"

import "https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns/dist/chartjs-adapter-date-fns.bundle.min.js"
import 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/leaflet.js'


import "./app/signInForm.js"
import "./app/logout.js"
//import "./app/geoloc.js"

onAuthStateChanged(auth, async (user) => {
    loginCheck(user)
    if (user) {
        //Get the information of the user
        //const collectionUser = doc(collection(db, 'user_id'), user.email)
        const docRef = doc(db, "user_id", user.email);
        const docSnap = await getDoc(docRef);
        const nameCompany = docSnap.data().name;
        const nbSensors = docSnap.data().nb_sensors;
        //Get the docs from all the sensor attached to the user sensors and put them into docs_all
        const collectionQs = collection(doc(collection(db, "user_id"), user.email), "sensors")
        const querySnapshotData = await getDocs(collectionQs);
        const docs_all = querySnapshotData.docs;
        //Getting data from docs and push them into the data_all array
        const data_all = []
        docs_all.forEach(doc => {
            const id = doc.data().id
            data_all.push(doc.data())
        })
        function getById(id) {
            var results = data_all.filter(function(x) { return x.id == id });
            return (results.length > 0 ? results[0] : null);
        }
        //Config the sensors option selector from each id using setupId function
        const sensor_id = []
        querySnapshotData.forEach(element => {sensor_id.push(element.id)});
        setupId(sensor_id)
        //Get data from sensor's id using function getById and 
        var selector = "sensor_1"
        var values = getById(selector)
        //Reestructuring the data and push it into sensorsNumbers
        var ddates = values.dates
        var days = []
        ddates.forEach(element => {
            days.push(element.toDate())
        })
        var sensorsNumbers = days.map((day, index) => {
            let dayObject = {};
            dayObject.day = day;
            dayObject.sensors = {};
            dayObject.sensors.ph = values.ph[index];
            dayObject.sensors.cty = values.cty[index];
            dayObject.sensors.temp = values.tmp[index];
            dayObject.sensors.do = values.do[index];
            dayObject.sensors.tdy = values.tdy[index];
            return dayObject;
        })
        //CHART PLOTS CONFIGURATION CODING
        //Get selectors value
        const selectFeatures = document.getElementById('featuresOptions');
        const selectId = document.getElementById('idOptions');
        // Geolocalization
        const storageRef = ref(Storage);
        //Create map
        const map_d = document.getElementById('map')
        var map = L.map(map_d).setView([values.geo_lat, values.geo_long], 13);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        const bounds =[]
        
        for (var i = 0; i < querySnapshotData.docs.length; i++) {
            var docQs = querySnapshotData.docs[i].data()
            var marker = new L.marker([docQs.geo_lat, docQs.geo_long]).addTo(map);
            marker.bindPopup(`
            <b>${docQs.id}</b>
            <br>Owner: ${nameCompany} </br>
            <br>Working since: ${docQs.ins.toDate()} </br>
            <br></br>
            `);
            bounds.push([docQs.geo_lat, docQs.geo_long])
        }
        
        map.fitBounds([bounds]);
        //Bar Canvas
        const labelsBarChart = values.var
        var meanData = [
            mean(values.cty), 
            mean(values.tdy), 
            mean(values.tmp), 
            mean(values.ph), 
            mean(values.do)
        ]
        console.log(meanData)
        const barData = {
            labels: labelsBarChart,
            datasets: [{
                label: "Sensor 1",
                data: meanData,
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
        const barConfig = {
            type: 'bar',
            data: barData,
            options: {
                maintainAspectRatio: false,
                plugins: {
                    subtitle: {
                        display: true,
                        text: '*This is an example.*'
                    },
                    title: {
                        display: true,
                        text: 'Mean value of each variable for the last 24h'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Value'
                        }
                        
                    }
                }
            }
        };
        const barCanvas = document.querySelectorAll("#bar-canvas");
        const barChart = new Chart (barCanvas, barConfig);  
        //Line Canvas
        const lineData = {
            datasets: [{
                label: "Sensor 1",
                data: sensorsNumbers,
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
                borderWidth: 1,
                parsing: {
                    xAxisKey: "day",
                    yAxisKey: "sensors.ph"
                }
            }]
            
        };
        const lineConfig = {
            type: 'line',
            data : lineData,
            options: {
                maintainAspectRatio: false,
                plugins: {
                    subtitle: {
                        display: true,
                        text: '*This is an example.*'
                    },
                    title: {
                        display: true,
                        text: 'Values recorded for selected variable'
                    }
                },
                scales: {
                    x: {
                        type: 'time'
                    },
                    y: {
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: 'Value'
                        }
                    }
                }
            }
        };
        const lineCanvas = document.querySelectorAll("#line-canvas");
        const lineChart = new Chart (lineCanvas, lineConfig);
        selectFeatures.addEventListener("change", () => {
            lineChart.data.datasets[0].parsing.yAxisKey = `sensors.${selectFeatures.value}`;
            lineChart.update();
        });

        // Refresh charts depending on the sensor's id
        selectId.addEventListener("change", () => {
            selector = selectId.value;
            values = getById(selector);
            meanData = [
                mean(values.cty), 
                mean(values.tdy), 
                mean(values.tmp), 
                mean(values.ph), 
                mean(values.do)
            ];

            ddates = values.dates
            days = []
            ddates.forEach(element => {
                days.push(element.toDate())
            })
            sensorsNumbers = days.map((day, index) => {
                let dayObject = {};
                dayObject.day = day;
                dayObject.sensors = {};
                dayObject.sensors.ph = values.ph[index];
                dayObject.sensors.cty = values.cty[index];
                dayObject.sensors.temp = values.tmp[index];
                dayObject.sensors.do = values.do[index];
                dayObject.sensors.tdy = values.tdy[index];
                return dayObject;
            })

            lineChart.data.datasets[0].data = sensorsNumbers;
            lineChart.data.datasets[0].parsing.yAxisKey = `sensors.${selectFeatures.value}`;
            lineChart.data.datasets[0].label = values.id;
            barChart.data.datasets[0].data = meanData;
            barChart.data.datasets[0].label = values.id;

            barChart.update();
            lineChart.update();
        });


        function displayWindowSize(){
            // Get width and height of the window excluding scrollbars
            var w = document.documentElement.clientWidth;
            var h = document.documentElement.clientHeight;

            if(w < 1380) {
                document.getElementById("cols-2").style.display = 'initial';
                document.getElementById("map").style.margin = 'auto';
            } else {
                document.getElementById("cols-2").style.display = 'flex';
                document.getElementById("map").style.margin = 'initial';
            }

        }
            
        // Attaching the event listener function to window's resize event
        window.addEventListener("resize", displayWindowSize);
        
        

    } else {
    }
    
})
