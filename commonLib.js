async function wait(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(true), time)
    });
}

module.exports = {
    wait
}