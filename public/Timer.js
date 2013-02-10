var Timer = {

  countdown: 0,
  timer: null,

  decrement: function() {
    this.countdown = this.countdown - 1;
  },

  set: function(notificationTime) {
    var now = new Date().getTime();
    var defaultTime = now + $("#minutes").val() * 60 * 1000;
    var then = notificationTime || defaultTime;
    var seconds = parseInt((then - now) / 1000);
    var defaultSeconds = parseInt((defaultTime - now) / 1000);
    this.countdown = seconds > 0 ? seconds : defaultSeconds;
  },

  reset: function() {
    this.set()
  },

  start: function() {
    var that = this;
    this.updateDisplay();
    $("#toggle").text("Stop");
    this.timer = setInterval(function() {
      if (that.countdown <= 0) {
        that.stop();
        return;
      }
      that.decrement();
      that.updateDisplay();
      if (that.countdown == 0) {
        Notifications.show("Pomodoro", "Pomodoro complete!");
      }
    }, 1000);
  },

  stop: function() {
    clearInterval(this.timer);
    this.reset();
    this.updateDisplay();
    $("#toggle").text("Start");
  },

  updateDisplay: function() {
    var m = parseInt(this.countdown / 60);
    var s = parseInt(this.countdown - m * 60);
    if (s.toString().length == 1) s = "0" + s;
    $("#countdown").html(m + ":" + s);
  }

};
