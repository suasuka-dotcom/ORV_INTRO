/* ========================================
   1. INTRO SCREEN
======================================== */

const intro = document.getElementById("intro");
const skip = document.getElementById("skip");

let introClosed = false;

function leaveIntro() {
    if (introClosed || !intro) return;

    introClosed = true;
    intro.classList.add("out");

    setTimeout(() => {
        intro.remove();
    }, 1300);
}

if (skip) {
    skip.addEventListener("click", leaveIntro);
}

setTimeout(leaveIntro, 4200);


/* ========================================
   2. CHARACTER DATA
======================================== */

const characters = [
    {
        img: "images/kim.jpg",
        name: "KIM DOKJA",
        role: "ผู้อ่านคนเดียวที่รู้อนาคต",
        icon: "book",
        color: "#ffffff",
        description:
            "พนักงานออฟฟิศธรรมดาที่อ่านนิยายเรื่องเดียวจนจบ 3,149 ตอน ความรู้ของเขาคืออาวุธที่ไม่มีใครมี",
        back:
            "อาวุธของเขาไม่ใช่พลัง แต่คือสิ่งที่เขารู้",
        tags: ["ผู้อ่าน", "ไหวพริบ", "รู้อนาคต"]
    },
    {
        img: "images/Yoo1.webp",
        name: "YOO JOONGHYUK",
        role: "ตัวเอกของนิยายต้นฉบับ",
        icon: "sword",
        color: "#c7cfe4",
        description:
            "ผู้ผ่านโลกที่ล่มสลายมานับครั้งไม่ถ้วน จนรู้ดีว่าต้องทำอย่างไรจึงจะรอด",
        back:
            "ทุกการรอดชีวิตคือบทเรียนจากครั้งก่อน",
        tags: ["ตัวเอกต้นฉบับ", "วนซ้ำ", "นักสู้"]
    },
    {
        img: "images/Han2.webp",
        name: "HAN SOOYOUNG",
        role: "นักเขียนผู้พัวพันกับเรื่องราว",
        icon: "quill",
        color: "#eadfc4",
        description:
            "นักเขียนผู้มีความสัมพันธ์ซับซ้อนกับเรื่องราว ตัวละคร และความจริง",
        back:
            "คนที่เขียนเรื่อง อาจไม่ใช่คนที่ควบคุมมันได้",
        tags: ["นักเขียน", "เรื่องซ้อนเรื่อง", "ปริศนา"]
    }
];


/* ========================================
   3. CREATE CHARACTER CARDS
======================================== */

const stage = document.getElementById("stage");
const dots = document.getElementById("dots");
const characterSection = document.getElementById("chars");

let currentIndex = 0;
let cards = [];

if (stage && dots && characterSection) {

    characters.forEach((character, index) => {
        const card = document.createElement("div");

        card.className = "card";
        card.dataset.i = index;
        card.style.setProperty("--c", character.color);

        const iconHTML = `
            <div class="ic">
                <svg class="i">
                    <use href="#${character.icon}"></use>
                </svg>
            </div>
        `;

        card.innerHTML = `
            <div class="tilt">
                <div class="f">

                    <div class="face">
                        <div
                            class="ph"
                            style="background-image: url('${character.img}')"
                        ></div>

                        ${iconHTML}

                        <div class="glare"></div>

                        <h3>${character.name}</h3>

                        <div class="role">
                            ${character.role}
                        </div>

                        <p>${character.description}</p>
                    </div>

                    <div class="face bk">
                        <div
                            class="ph"
                            style="background-image: url('${character.img}')"
                        ></div>

                        ${iconHTML}

                        <h3>${character.name}</h3>

                        <p
                            style="
                                font: 500 18px 'Noto Serif Thai';
                                margin-top: 10px;
                            "
                        >
                            ${character.back}
                        </p>

                        <div class="tags">
                            ${character.tags
                                .map(tag => `<i>${tag}</i>`)
                                .join("")}
                        </div>
                    </div>

                </div>
            </div>
        `;

        stage.appendChild(card);

        dots.appendChild(document.createElement("i"));
    });

    cards = [...stage.children];
}


/* ========================================
   4. CHARACTER SLIDER
======================================== */

function updateSlider() {
    if (!cards.length) return;

    const step = Math.min(230, window.innerWidth * 0.46);

    cards.forEach((card, index) => {
        const offset = index - currentIndex;
        const distance = Math.abs(offset);

        card.classList.toggle("on", offset === 0);

        if (offset !== 0) {
            card.classList.remove("flip");
        }

        card.style.transform = `
            translateX(${offset * step}px)
            translateZ(${-distance * 140}px)
            rotateY(${-offset * 32}deg)
            scale(${1 - distance * 0.06})
        `;

        card.style.opacity =
            distance > 1 ? "0" :
            distance === 1 ? "0.5" : "1";

        card.style.filter =
            distance > 0 ? "blur(2px)" : "none";

        card.style.zIndex = 9 - distance;

        card.style.pointerEvents =
            distance > 1 ? "none" : "auto";
    });

    if (dots) {
        [...dots.children].forEach((dot, index) => {
            dot.classList.toggle(
                "on",
                index === currentIndex
            );
        });
    }

    if (characterSection) {
        characterSection.style.setProperty(
            "--aura",
            characters[currentIndex].color
        );
    }
}


function goToCharacter(index) {
    if (!cards.length) return;

    currentIndex = Math.max(
        0,
        Math.min(characters.length - 1, index)
    );

    updateSlider();
}


/* Previous and next buttons */

const previousButton = document.getElementById("pv");
const nextButton = document.getElementById("nx");

if (previousButton) {
    previousButton.addEventListener("click", () => {
        goToCharacter(currentIndex - 1);
    });
}

if (nextButton) {
    nextButton.addEventListener("click", () => {
        goToCharacter(currentIndex + 1);
    });
}


/* Keyboard controls */

if (stage) {
    stage.addEventListener("keydown", event => {
        if (event.key === "ArrowLeft") {
            goToCharacter(currentIndex - 1);
        }

        if (event.key === "ArrowRight") {
            goToCharacter(currentIndex + 1);
        }
    });
}


/* Swipe and flip cards */

let startX = null;

if (stage) {
    stage.addEventListener("pointerdown", event => {
        startX = event.clientX;
    });

    stage.addEventListener("pointerup", event => {
        if (startX === null) return;

        const difference = event.clientX - startX;
        startX = null;

        if (Math.abs(difference) > 40) {
            goToCharacter(
                currentIndex + (difference < 0 ? 1 : -1)
            );

            return;
        }

        const card = event.target.closest(".card");

        if (!card) return;

        const index = Number(card.dataset.i);

        if (index === currentIndex) {
            card.classList.toggle("flip");
        } else {
            goToCharacter(index);
        }
    });

    stage.addEventListener("pointermove", event => {
        const card = cards[currentIndex];

        if (!card) return;

        const rect = card.getBoundingClientRect();

        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;

        const tilt = card.querySelector(".tilt");

        if (!tilt) return;

        if (x < 0 || x > 1 || y < 0 || y > 1) {
            tilt.style.setProperty("--rx", "0deg");
            tilt.style.setProperty("--ry", "0deg");
            return;
        }

        tilt.style.setProperty(
            "--ry",
            `${(x - 0.5) * 16}deg`
        );

        tilt.style.setProperty(
            "--rx",
            `${(0.5 - y) * 14}deg`
        );

        const glare = card.querySelector(".glare");

        if (glare) {
            glare.style.setProperty("--gx", `${x * 100}%`);
            glare.style.setProperty("--gy", `${y * 100}%`);
        }
    });

    window.addEventListener("resize", updateSlider);

    updateSlider();
}


/* ========================================
   5. SCROLL REVEAL ANIMATIONS
======================================== */

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const element = entry.target;

            element.classList.add("on");

            if (element.id === "mood") {
                startRadar();
            }

            observer.unobserve(element);
        });
    }, {
        threshold: 0.3
    });

    document.querySelectorAll(".rv, #clock").forEach(element => {
        observer.observe(element);
    });

} else {
    document.querySelectorAll(".rv, #clock").forEach(element => {
        element.classList.add("on");
    });

    startRadar();
}


/* ========================================
   6. STAR BACKGROUND
======================================== */

const canvas = document.getElementById("sky");
const context = canvas?.getContext("2d");

let canvasWidth = 0;
let canvasHeight = 0;

let stars = [];
let shootingStars = [];
let nextShootingStar = 600;


function resizeCanvas() {
    if (!canvas || !context) return;

    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;

    canvas.width = canvasWidth * pixelRatio;
    canvas.height = canvasHeight * pixelRatio;

    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;

    context.setTransform(
        pixelRatio, 0, 0, pixelRatio, 0, 0
    );

    stars = Array.from({
        length: Math.min(150, Math.floor(canvasWidth / 6))
    }, () => ({
        x: Math.random() * canvasWidth,
        y: Math.random() * canvasHeight,
        radius: Math.random() * 1.3 + 0.3,
        phase: Math.random() * 6,
        depth: Math.random() * 0.3 + 0.05
    }));
}


function drawStars(time) {
    if (!context) return;

    context.clearRect(0, 0, canvasWidth, canvasHeight);

    stars.forEach(star => {
        const y =
            ((star.y - window.scrollY * star.depth) % canvasHeight
                + canvasHeight) % canvasHeight;

        context.globalAlpha =
            0.35 + 0.65 * Math.abs(
                Math.sin(time / 1300 + star.phase)
            );

        context.fillStyle =
            star.radius > 1.1 ? "#ffffff" : "#b9c0d8";

        context.beginPath();

        context.arc(
            star.x,
            y,
            star.radius,
            0,
            Math.PI * 2
        );

        context.fill();
    });

    context.globalAlpha = 1;

    if (time > nextShootingStar) {
        nextShootingStar =
            time + 1400 + Math.random() * 3200;

        const angle =
            Math.PI * (0.68 + Math.random() * 0.12);

        shootingStars.push({
            x: Math.random() * canvasWidth * 1.1,
            y: Math.random() * canvasHeight * 0.5,
            vx: -Math.cos(angle),
            vy: Math.sin(angle),
            life: 0,
            length: 110 + Math.random() * 130
        });
    }
}


let previousFrameTime = 0;

function animateSky(time) {
    if (!context) return;

    const deltaTime = previousFrameTime
        ? (time - previousFrameTime) / 1000
        : 0;

    previousFrameTime = time;

    drawStars(time);

    shootingStars = shootingStars.filter(star => {
        star.life += deltaTime;

        const speed = 950;

        star.x += star.vx * speed * deltaTime;
        star.y += star.vy * speed * deltaTime * 0.7;

        const alpha = Math.max(0, 1 - star.life / 1.1);

        const gradient = context.createLinearGradient(
            star.x,
            star.y,
            star.x - star.vx * star.length,
            star.y - star.vy * star.length * 0.7
        );

        gradient.addColorStop(
            0,
            `rgba(255,255,255,${alpha})`
        );

        gradient.addColorStop(
            1,
            "rgba(255,255,255,0)"
        );

        context.strokeStyle = gradient;
        context.lineWidth = 2;

        context.beginPath();

        context.moveTo(star.x, star.y);

        context.lineTo(
            star.x - star.vx * star.length,
            star.y - star.vy * star.length * 0.7
        );

        context.stroke();

        context.fillStyle =
            `rgba(255,255,255,${alpha})`;

        context.beginPath();

        context.arc(
            star.x,
            star.y,
            2.2,
            0,
            Math.PI * 2
        );

        context.fill();

        return star.life < 1.1;
    });

    requestAnimationFrame(animateSky);
}


if (canvas && context) {
    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    requestAnimationFrame(animateSky);
}


/* ========================================
   7. SCROLL PROGRESS AND CURSOR LIGHT
======================================== */

const hourHand = document.querySelector(".hh");
const minuteHand = document.querySelector(".hm");
const secondHand = document.querySelector(".hs");
const clockRing = document.querySelector(".ring");

const bannerImage = document.querySelector("#banner img");
const progressBar = document.getElementById("prog");
const cursorLight = document.getElementById("cur");

let clockAngle = 0;

let mouseX = 0;
let mouseY = 0;

let cursorX = 0;
let cursorY = 0;


window.addEventListener("pointermove", event => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});


function animateScrollEffects(time) {
    const targetAngle = -window.scrollY * 0.55;

    clockAngle += (targetAngle - clockAngle) * 0.07;

    if (secondHand) {
        secondHand.style.transform =
            `rotate(${clockAngle * 6 + time * 0.004}deg)`;
    }

    if (minuteHand) {
        minuteHand.style.transform =
            `rotate(${clockAngle * 1.4}deg)`;
    }

    if (hourHand) {
        hourHand.style.transform =
            `rotate(${clockAngle * 0.12}deg)`;
    }

    if (clockRing) {
        clockRing.style.transform =
            `rotate(${-clockAngle * 0.6}deg)`;
    }

    if (progressBar) {
        const scrollableHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        const progress = scrollableHeight > 0
            ? window.scrollY / scrollableHeight * 100
            : 0;

        progressBar.style.width = `${progress}%`;
    }

    if (bannerImage) {
        const rect = bannerImage.parentNode.getBoundingClientRect();

        bannerImage.style.transform =
            `translateY(${rect.top * -0.12}px)`;
    }

    if (cursorLight) {
        cursorX += (mouseX - cursorX) * 0.12;
        cursorY += (mouseY - cursorY) * 0.12;

        cursorLight.style.transform =
            `translate(${cursorX}px, ${cursorY}px)`;
    }

    requestAnimationFrame(animateScrollEffects);
}

requestAnimationFrame(animateScrollEffects);


/* ========================================
   8. COVER TILT EFFECT
======================================== */

const cover = document.getElementById("cvr");

if (cover && cover.parentNode) {
    const coverContainer = cover.parentNode;

    coverContainer.addEventListener("pointermove", event => {
        const rect = cover.getBoundingClientRect();

        const x =
            (event.clientX - rect.left) / rect.width - 0.5;

        const y =
            (event.clientY - rect.top) / rect.height - 0.5;

        cover.style.setProperty("--ry", `${x * 20}deg`);
        cover.style.setProperty("--rx", `${-y * 16}deg`);
    });

    coverContainer.addEventListener("pointerleave", () => {
        cover.style.setProperty("--ry", "0deg");
        cover.style.setProperty("--rx", "0deg");
    });
}


/* ========================================
   9. MOOD RADAR CHART
======================================== */

const moodData = [
    ["ACTION", 90],
    ["DRAMA", 80],
    ["MYSTERY", 100],
    ["COMEDY", 50],
    ["EMOTION", 90]
];

let radarStarted = false;


function startRadar() {
    if (radarStarted) return;

    const radar = document.getElementById("radar");

    if (!radar) return;

    radarStarted = true;

    const size = 340;
    const center = size / 2;
    const radius = 112;

    function getPoint(index, distance) {
        const angle =
            (-90 + 72 * index) * Math.PI / 180;

        return [
            center + distance * Math.cos(angle),
            center + distance * Math.sin(angle)
        ];
    }

    let svg = `
        <svg viewBox="0 0 ${size} ${size}">
    `;

    /* Radar grid */

    [0.25, 0.5, 0.75, 1].forEach(scale => {
        const points = moodData
            .map((_, index) => {
                return getPoint(
                    index,
                    radius * scale
                ).join(",");
            })
            .join(" ");

        const opacity = scale === 1 ? 0.5 : 0.18;

        svg += `
            <polygon
                fill="none"
                stroke="#ffffff"
                stroke-opacity="${opacity}"
                points="${points}"
            />
        `;
    });


    /* Axis lines and labels */

    moodData.forEach((item, index) => {
        const point = getPoint(index, radius);
        const labelPoint = getPoint(index, radius + 26);

        svg += `
            <line
                x1="${center}"
                y1="${center}"
                x2="${point[0]}"
                y2="${point[1]}"
                stroke="#ffffff"
                stroke-opacity="0.2"
            />

            <text
                x="${labelPoint[0]}"
                y="${labelPoint[1] + 4}"
            >
                ${item[0]}
            </text>

            <text
                class="v"
                x="${labelPoint[0]}"
                y="${labelPoint[1] + 19}"
                style="fill:#F5F5F5;font-size:13px"
            >
                0
            </text>
        `;
    });


    /* Data polygon and points */

    svg += `
        <polygon class="pl" points=""></polygon>

        ${moodData.map(() => `
            <circle
                r="4"
                fill="#ffffff"
                style="filter:drop-shadow(0 0 6px #ffffff)"
            />
        `).join("")}

        <g
            class="sp"
            style="transform-origin:${center}px ${center}px"
        >
            <circle
                cx="${center}"
                cy="${center}"
                r="${radius + 8}"
                fill="none"
                stroke="#ffffff"
                stroke-opacity="0.25"
                stroke-dasharray="2 8"
            />
        </g>

        </svg>
    `;

    radar.innerHTML = svg;

    const polygon = radar.querySelector(".pl");
    const points = radar.querySelectorAll('circle[r="4"]');
    const values = radar.querySelectorAll(".v");
    const spinningRing = radar.querySelector(".sp");

    let startTime = null;


    function animateRadar(time) {
        if (startTime === null) {
            startTime = time;
        }

        const progress = Math.min(
            1,
            (time - startTime) / 2200
        );

        const easing =
            1 - Math.pow(1 - progress, 3);

        const coordinates = [];

        moodData.forEach((item, index) => {
            const breathing = progress === 1
                ? 1 + 0.035 * Math.sin(time / 650 + index * 1.3)
                : 1;

            const valueRadius =
                radius * (item[1] / 100) * easing * breathing;

            const point = getPoint(index, valueRadius);

            coordinates.push(point.join(","));

            points[index].setAttribute("cx", point[0]);
            points[index].setAttribute("cy", point[1]);

            values[index].textContent =
                Math.round(item[1] * easing);
        });

        polygon.setAttribute(
            "points",
            coordinates.join(" ")
        );

        spinningRing.style.transform =
            `rotate(${time / 90}deg)`;

        requestAnimationFrame(animateRadar);
    }

    requestAnimationFrame(animateRadar);
}


/* ========================================
   10. FLOATING PAPER EFFECT
======================================== */

(function createFloatingPapers() {
    const paperContainer = document.getElementById("papers");

    if (!paperContainer) return;

    const paperCount =
        window.innerWidth < 600 ? 9 : 16;

    for (let i = 0; i < paperCount; i++) {
        const paper = document.createElement("div");

        paper.className = "pp";

        paper.style.left = `${Math.random() * 100}%`;

        paper.style.setProperty(
            "--t",
            `${20 + Math.random() * 22}s`
        );

        paper.style.setProperty(
            "--dl",
            `${-Math.random() * 40}s`
        );

        paper.style.setProperty(
            "--dx",
            `${Math.random() * 240 - 120}px`
        );

        paper.style.setProperty(
            "--w",
            `${18 + Math.random() * 26}px`
        );

        paper.style.setProperty(
            "--f",
            `${2.2 + Math.random() * 2.5}s`
        );

        paper.innerHTML = "<i></i>";

        paperContainer.appendChild(paper);
    }
})();