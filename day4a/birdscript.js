let bird = $("#bird");
let birdY = 200;
let gravity = 3;
let score = 0;

function createPipe() {
    let gap = 140;
    let pipeTopHeight = Math.random() * 250 + 50;
    let pipeBottomHeight = 600 - pipeTopHeight - gap;

  
    let pipeTop = $("<div class='pipe'></div>");
    pipeTop.css({
        left: "100%",
        top: 0,
        height: pipeTopHeight
    });

 
    let pipeBottom = $("<div class='pipe'></div>");
    pipeBottom.css({
        left: "100%",
        top: pipeTopHeight + gap,
        height: pipeBottomHeight
    });

    $("body").append(pipeTop, pipeBottom);


    pipeTop.animate({ left: "-100px" }, 3000, function () {
        $(this).remove();
        score++;
        $("#scorebox").text("Score: " + score);
    });

    pipeBottom.animate({ left: "-100px" }, 3000, function () {
        $(this).remove();
    });


    let checkCollision = setInterval(function () {
        let birdPos = bird[0].getBoundingClientRect();
        let topPos = pipeTop[0].getBoundingClientRect();
        let bottomPos = pipeBottom[0].getBoundingClientRect();

        if (
        
            (birdPos.left < topPos.right &&
                birdPos.right > topPos.left &&
                birdPos.top < topPos.bottom) ||

        
            (birdPos.left < bottomPos.right &&
                birdPos.right > bottomPos.left &&
                birdPos.bottom > bottomPos.top)
        ) {
            alert("Game Over!");
            location.reload();
        }
    }, 30);
}


setInterval(function () {
    birdY += gravity;
    bird.css("top", birdY + "px");
    if (birdY > $(window).height()) {
        alert("Bird fell! Game Over!");
        location.reload();
    }
}, 30);


$(document).keydown(function (e) {
    if (e.key === " ") {
        birdY -= 50;
    }
});


setInterval(createPipe, 2500);