
let accelerometer = new LinearAccelerationSensor();
let lastReadingTimestamp;
document.getElementById('acc-x').innerHTML = 'Hello World';
accelerometer.addEventListener('reading', () => {
  if (lastReadingTimestamp) {
    intervalHandler(Math.round(accelerometer.timestamp - lastReadingTimestamp));
  }
  lastReadingTimestamp = accelerometer.timestamp
  accelerationHandler(accelerometer, 'acc-x');
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