function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position="fixed";  //avoid scrolling to bottom
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }
  
  document.body.removeChild(textArea);
}
function copyTextToClipboard(text, domId) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    copiedDom(domId);
    return;
  }
  navigator.clipboard.writeText(text).then(function() {
    console.log('Async: Copying to clipboard was successful!');
    copiedDom(domId);
  }, function(err) {
    console.error('Async: Could not copy text: ', err);
  });
}

function copiedDom(domId) {
  var dom = document.querySelector('#' + domId).querySelector('.copy');
  dom.innerHTML = '已复制';
  dom.setAttribute('class', 'copy disabled');
}

function ajax(url) {
  //1.创建AJAX对象
  var ajax = new XMLHttpRequest();
  
  //4.给AJAX设置事件(这里最多感知4[1-4]个状态)
  ajax.onreadystatechange = function(){
    //5.获取响应
    //responseText		以字符串的形式接收服务器返回的信息
    //console.log(ajax.readyState);
    if(ajax.readyState == 4 && ajax.status == 200){
      var msg = ajax.responseText;
      alert(msg);
      window.location.reload();
    }
  }
  
  //2.创建http请求,并设置请求地址
  ajax.open('get', url);
  
  //3.发送请求(get--null    post--数据)
  ajax.send(null);
}

function deleteProject(url) {
  url = '/delete' + url.replace(/.+\.com/, '');
  ajax(url);
}
