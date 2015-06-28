
      var controls = document.getElementById('controlsIn');
      var ctx = controls.getContext("2d");
      var dpad = new Image();
      dpad.onload = function(){ctx.drawImage(dpad, 0,0,controls.width,controls.height)};
      dpad.src = "gui/d_pad 3.png";
      
      var buttons = document.getElementById('buttonsIn');
      var btx = buttons.getContext("2d");
      var aBtn = new Image();
      var ax = buttons.width / 10;
      var ay = 2.5*(buttons.height/5);
      var aw = buttons.width/3;
      var ah = buttons.height/3;
      aBtn.onload = function(){btx.drawImage(aBtn, ax, ay, aw, ah)};
      aBtn.src = "gui/aBtn_up.png";
      
      var bBtn = new Image();
      var bx = 5.5*(buttons.width / 10);
      var by = (buttons.height/5);
      var bw = buttons.width/3;
      var bh = buttons.height/3;
      bBtn.onload = function(){btx.drawImage(bBtn, bx, by, bw, bh)};
      bBtn.src = "gui/bBtn_up.png";
      
      ///////////////     GENERAL FUNCTION    ////////////////////
      
      function init(){
        controls.addEventListener("touchstart", mobileModeDPAD, false);
        controls.addEventListener("touchend", reset, false);
        buttons.addEventListener("touchstart", mobileModeButtons, false);
        buttons.addEventListener("touchend", resetBtn, false);
      }
      function catcher(evt) {
        if (evt.touches.length < 2)
          evt.preventDefault();
      }
      
      document.body.addEventListener("touchstart", catcher, true);
      
      function desktopModeDPAD(e){
        var x = e.offsetX;
        var y = e.offsetY;
        getKeyDir(x,y, e);
      }
      function mobileModeDPAD(e){
        var x = e.targetTouches[0].pageX - controls.offsetLeft;
        var y = e.targetTouches[0].pageY - controls.offsetTop;
        getKeyDir(x,y, e);
      }
      function desktopModeButtons(e){
        var x = e.offsetX;
        var y = e.offsetY;
        getButton(x,y, e);
      }
      function mobileModeButtons(e){
        var x = e.targetTouches[0].pageX - buttons.offsetLeft;
        var y = e.targetTouches[0].pageY - buttons.offsetTop;
        getButton(x,y, e);
      }
      ////////////////////     DPAD CONTROLS    ////////////////////////
      controls.onselectstart = function(){return false;};
      
      controls.onmousedown = function(e){
        desktopModeDPAD(e);
      };
      controls.onmouseup = function(e){
        reset(e);
      };
    
      function getKeyDir(x2, y2, e){
        var x = x2;
        var y = y2;
        
        e.preventDefault;
        
        var cs     = getComputedStyle(controls);
        var width  = parseInt( cs.getPropertyValue('width'), 10);
        var height = parseInt( cs.getPropertyValue('height'), 10);
        
        var topBound = Math.round(height / 3);    // 1/3
        var midBound = Math.round(topBound * 2);    // 2/3
        var botBound = Math.round(height);        // 3/3
        
        
        //console.log("X: " + x + "\tY: " + y);
        //console.log("T: " + topBound + "\tM: " + midBound + "\tB: " + botBound);
        
        if(y <= topBound && (x > topBound && x < midBound)){
          changeAniDpad("UP");
        }else if((y > topBound && y < midBound) && x < topBound){
          changeAniDpad("LEFT");
        }else if((y > topBound && y < midBound) && (x > midBound)){
          changeAniDpad("RIGHT");
        }else if((y > midBound) && (x > topBound && x < midBound)){
          changeAniDpad("DOWN");
        }else{
          //console.log("X: "+ x + "\tY: " + y);
        }
      }
      function reset(e){
        changeAniDpad("default");
      }
      function changeAniDpad(ani){
        if(ani == "UP")
          dpad.src = "gui/top.png";
        else if(ani == "DOWN")
          dpad.src = "gui/down.png";
        else if(ani == "LEFT")  
          dpad.src = "gui/left.png";
        else if(ani == "RIGHT") 
          dpad.src = "gui/right.png";
        else
          dpad.src = "gui/d_pad 3.png";
      }
      
      //////////////////    BUTTONS CONTROLS   /////////////
      buttons.onmousedown = function(e){
        desktopModeButtons(e);
      };
      buttons.onmouseup = function(e){
        resetBtn(e);
      };
      function getButton(x2, y2, e){
        var cs     = getComputedStyle(buttons);
        var width  = parseInt( cs.getPropertyValue('width'), 10);
        var height = parseInt( cs.getPropertyValue('height'), 10);
        
        e.preventDefault;
        
        var x = x2;
        var y = y2;
        
        var ax2 = ((ax * width) / buttons.width);
        var ay2 = ((ay * height) / buttons.height);
        var aw2 = ((aw * ax2) / ax);
        var ah2 = ((ah * ay2) / ay);
        
        var bx2 = ((bx * width) / buttons.width);
        var by2 = ((by * height) / buttons.height);
        var bw2 = ((bw * bx2) / bx);
        var bh2 = ((bh * by2) / by);
        
        if((x >= ax2 && y >= ay2) && (x <= (ax2+aw2) && y <= (ay2+ah2))){
          changeAniBtn("A_down");
        }
        else{
          changeAniBtn("A_up");
        }
          
        if((x >= bx2 && y >= by2) && (x <= (bx2+bw2) && y <= (by2+bh2))){
          changeAniBtn("B_down");
        }
        else
          changeAniBtn("B_up");
        /*
        console.log("X: " + x + "\tY: " + y);
        console.log("A button X: " + ax2 + "\tY: " + ay2);
        console.log("A button W: " + aw2 + "\tH: " + ah2);
        console.log("B button X: " + bx2 + "\tY: " + by2);
        console.log("B button W: " + bw2 + "\tH: " + bh2);
        */
      }
      function resetBtn(e){
        changeAniBtn("A_up");
        changeAniBtn("B_up");
      }
      function changeAniBtn(ani){
        if(ani == "A_down")
          aBtn.src = "gui/aBtn_down.png";
        else if(ani == "A_up")
          aBtn.src = "gui/aBtn_up.png";
          
        if(ani == "B_down")  
          bBtn.src = "gui/bBtn_down.png";
        else if(ani == "B_up") 
          bBtn.src = "gui/bBtn_up.png";
      }
      init();