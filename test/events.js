import { getLoc, asyncfunc } from './utils.js';

export function addEventListeners() {
    $(() => {
        $("#trigAlert").click(() => {
            window.alert("POPUP!!!");
        });

        $("#posBtn").click(() => {
            getLoc();
        });

        const objInfoElem = document.getElementById('pDisp');
        asyncfunc(objInfoElem);

        let count = 0;
        $("#test").click(() => {
            count++;
            document.getElementById("clickCnt").innerHTML = `Test button clicks: ${count}`;
        });
    });
}


