var staticchars = "PXhw7UT1B0a9kQDKZsjIASmOezxYG4CHo5Jyfg2b8FLpEvRr3WtVnlqMidu6cN";

// 加密
export function encrypt(_str:string) {
  var encodechars = "";
  for (var i = 0; i < _str.length; i++) {
    var num0 = staticchars.indexOf(_str[i]);
    if (num0 == -1) {
      var code = _str[i];
    } else {
      var code = staticchars[(num0 + 3) % 62];
    }
    var num1 = parseInt(''+Math.random() * 62, 10);
    var num2 = parseInt(''+Math.random() * 62, 10);
    encodechars += staticchars[num1] + code + staticchars[num2];
  }
  return encodechars;
}