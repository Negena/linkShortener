// let copy = document.getElementsByClassName("copy");
// for(var i = 0 ; i <= copy; i++ ){
//   copy.addEventListener("click", copyToClipboard)
// }
function copyToClipboard(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).text()).select();
  document.execCommand("copy");
  alert("copied")
  $temp.remove();
}
