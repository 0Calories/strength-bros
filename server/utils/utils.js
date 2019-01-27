const generateId = () => {
    console.log("Creating id");
    return Math.random().toString(36).substr(2, 5).toUpperCase();
}


module.exports = { generateId };