let bird = $("#bird");
let birdY = 200;
let gravity = 3;
let score = 0;

function createPipe() {
    let gap = 140;
    let pipeTopHeight = Math.random() * 250 + 50;
    let pipeBottomHeight = 600 - pipeTopHeight - gap;

    // Top pipe
    let pipeTop = $("<div class='pipe'></div>");
    pipeTop.css({
        left: "100%",
        top: 0,
        height: pipeTopHeight
    });

    // Bottom pipe
    let pipeBottom = $("<div class='pipe'></div>");
    pipeBottom.css({
        left: "100%",
        top: pipeTopHeight + gap,
        height: pipeBottomHeight
    });

    $("body").append(pipeTop, pipeBottom);

    // Animate pipes
    pipeTop.animate({ left: "-100px" }, 3000, function () {
        $(this).remove();
        score++;
        $("#scorebox").text("Score: " + score);
    });

    pipeBottom.animate({ left: "-100px" }, 3000, function () {
        $(this).remove();
    });

    // Collision check
    let checkCollision = setInterval(function () {
        if (!document.body.contains(pipeTop[0])) {
            clearInterval(checkCollision);
            return;
        }

        let birdPos = bird[0].getBoundingClientRect();
        let topPos = pipeTop[0].getBoundingClientRect();
        let bottomPos = pipeBottom[0].getBoundingClientRect();

        if (
            // Top pipe collision
            (birdPos.left < topPos.right &&
                birdPos.right > topPos.left &&
                birdPos.top < topPos.bottom) ||

            // Bottom pipe collision
            (birdPos.left < bottomPos.right &&
                birdPos.right > bottomPos.left &&
                birdPos.bottom > bottomPos.top)
        ) {
            alert("Game Over!");
            location.reload();
        }
    }, 30);
}

// Gravity (bird falls)
setInterval(function () {
    birdY += gravity;
    bird.css("top", birdY + "px");

    if (birdY > $(window).height()) {
        alert("Bird fell! Game Over!");
        location.reload();
    }
}, 30);

// Bird jump
$(document).keydown(function (e) {
    if (e.key === " ") {
        birdY -= 50;
    }
});

// Pipe generator
setInterval(createPipe, 2500);
