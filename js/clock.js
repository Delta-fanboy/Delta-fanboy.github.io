function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const time = `${hours}:${minutes}:${seconds}`;

    document.getElementById("time").textContent = time; // Set the time as the content of the element with id "time"

    setTimeout(updateClock, 1000); // Update the clock every second
}

updateClock();