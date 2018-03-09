function main() {
    var redBall = generateRedBall()
    var blueBall = generateBlueBall()
    return redBall.join(', ') + ' | ' + blueBall
}


function generateRedBall() {
    var redBall = new Array();
    var redLen = redBall.length;
    while (redLen < 6) {
        var ball = ranNumber(1, 33);
        var flag = true;
        for (var j = 0; j < redLen; j++) {
            if (redBall[j] == ball) {
                flag = false; break;
            }
        }
        if (flag) {
            if (ball < 10) {
                redBall.push("0" + ball);
            } else {
                redBall.push(ball);
            }
        }
        redLen = redBall.length;
    }
    redBall.sort();
    return redBall
}

function generateBlueBall() {
    var blueBall = ranNumber(1, 16);
    if (blueBall < 10) {
        blueBall = "0" + blueBall;
    }
    return blueBall
}

function ranNumber(s, e) {
    var staVal = parseFloat(s);
    var endVal = parseFloat(e);
    return Math.floor(Math.random() * (endVal - staVal) + staVal);
}