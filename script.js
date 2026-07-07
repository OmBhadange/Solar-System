
// Canvas Setup

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

// Create Stars

const stars = [];

for (let i = 0; i < 300; i++) {

    stars.push({

        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2

    });

}

// Planets

const planets = [

    {
        name: "Mercury",
        radius: 4,
        orbitRadius: 60,
        angle: Math.random() * Math.PI * 2,
        speed: 0.040,
        color: "#AAAAAA"
    },

    {
        name: "Venus",
        radius: 7,
        orbitRadius: 90,
        angle: Math.random() * Math.PI * 2,
        speed: 0.030,
        color: "#D4AF37"
    },

    {
        name: "Earth",
        radius: 8,
        orbitRadius: 130,
        angle: Math.random() * Math.PI * 2,
        speed: 0.020,
        color: "#0099FF"
    },

    {
        name: "Mars",
        radius: 6,
        orbitRadius: 170,
        angle: Math.random() * Math.PI * 2,
        speed: 0.016,
        color: "#FF4500"
    },

    {
        name: "Jupiter",
        radius: 16,
        orbitRadius: 230,
        angle: Math.random() * Math.PI * 2,
        speed: 0.010,
        color: "#D2B48C"
    },

    {
        name: "Saturn",
        radius: 14,
        orbitRadius: 300,
        angle: Math.random() * Math.PI * 2,
        speed: 0.008,
        color: "#DEB887"
    },

    {
        name: "Uranus",
        radius: 12,
        orbitRadius: 360,
        angle: Math.random() * Math.PI * 2,
        speed: 0.006,
        color: "#66FFFF"
    },

    {
        name: "Neptune",
        radius: 12,
        orbitRadius: 430,
        angle: Math.random() * Math.PI * 2,
        speed: 0.005,
        color: "#4169E1"
    }

];

// Draw Stars

function drawStars() {

    ctx.fillStyle = "white";

    for (const star of stars) {

        ctx.beginPath();

        ctx.arc(
            star.x,
            star.y,
            star.radius,
            0,
            Math.PI * 2
        );

        ctx.fill();

    }

}

// Draw Sun

function drawSun(centerX, centerY) {

    const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        10,
        centerX,
        centerY,
        50
    );

    gradient.addColorStop(0, "#FFFF00");
    gradient.addColorStop(1, "#FF6600");

    ctx.beginPath();

    ctx.arc(
        centerX,
        centerY,
        30,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = gradient;

    ctx.fill();

}

// Draw Orbit

function drawOrbit(centerX, centerY, radius) {

    ctx.beginPath();

    ctx.arc(
        centerX,
        centerY,
        radius,
        0,
        Math.PI * 2
    );

    ctx.strokeStyle = "rgba(255,255,255,0.15)";

    ctx.stroke();

}

// Draw Planet

function drawPlanet(centerX, centerY, planet) {

    planet.angle += planet.speed;

    const x =
        centerX +
        Math.cos(planet.angle) *
        planet.orbitRadius;

    const y =
        centerY +
        Math.sin(planet.angle) *
        planet.orbitRadius;

    ctx.beginPath();

    ctx.arc(
        x,
        y,
        planet.radius,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = planet.color;

    ctx.fill();

    // Planet Name

    ctx.fillStyle = "white";
    ctx.font = "14px Arial";

    ctx.fillText(
        planet.name,
        x + 12,
        y
    );

    // Earth Moon

    if (planet.name === "Earth") {

        const moonAngle =
            planet.angle * 8;

        const moonX =
            x +
            Math.cos(moonAngle) * 20;

        const moonY =
            y +
            Math.sin(moonAngle) * 20;

        ctx.beginPath();

        ctx.arc(
            moonX,
            moonY,
            3,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "white";

        ctx.fill();

    }

    // Saturn Ring

    if (planet.name === "Saturn") {

        ctx.beginPath();

        ctx.ellipse(
            x,
            y,
            22,
            10,
            0,
            0,
            Math.PI * 2
        );

        ctx.strokeStyle = "#DDDDAA";

        ctx.stroke();

    }

}

// Animation Loop

function animate() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    drawStars();

    drawSun(centerX, centerY);

    for (const planet of planets) {

        drawOrbit(
            centerX,
            centerY,
            planet.orbitRadius
        );

    }

    for (const planet of planets) {

        drawPlanet(
            centerX,
            centerY,
            planet
        );

    }

    requestAnimationFrame(animate);

}

// Start Animation

animate();