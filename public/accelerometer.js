
let accelerometer = new LinearAccelerationSensor();

accelerometer.addEventListener('reading', () => {
  document.getElementById('acc-x').innerHTML = 'Hello World';
});

accelerometer.start();




function intervalHandler(interval) {
  document.getElementById("x").innerHTML = interval;
}

function accelerationHandler(acceleration, targetId) {
  var info, xyz = "[X, Y, Z]";

  info = xyz.replace("X", acceleration.x && acceleration.x.toFixed(3));
  info = info.replace("Y", acceleration.y && acceleration.y.toFixed(3));
  info = info.replace("Z", acceleration.z && acceleration.z.toFixed(3));
  document.getElementById(targetId).innerHTML = info;
}