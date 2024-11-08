export async function asyncfunc(pDisp) {
    let p = new Promise(function(res,rjt) {
        setTimeout(() => {
            let x = 55;
            if (x === 1) res("Promise Status: Success!");
            else rjt("Promise Status: Error!");
        }, 5000);
    })
    try {
        const result = await p;
        $(pDisp).text(result); 
    } catch (error) {
        $(pDisp).text(error);
    }
}

// --------------------------- getLoc module ------------------------------------
export function getLoc() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPos);
    } else {
        $("#pos").text("Geolocation not supported");
    }
}

function showPos(position) {
    $("#pos").html(
        `Latitude: ${position.coords.latitude} <br> Longitude: ${position.coords.longitude}`
    );
}
// ------------------------------------------------------------------------------
