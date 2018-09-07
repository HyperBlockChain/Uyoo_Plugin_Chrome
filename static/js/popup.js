/*Copyright 2016-2018 hyperchain.net (Hyperchain)
Distributed under the MIT software license, see the accompanying
file COPYING or https://opensource.org/licenses/MIT.
Permission is hereby granted, free of charge, to any person obtaining a copy of this 
software and associated documentation files (the "Software"), to deal in the Software
without restriction, including without limitation the rights to use, copy, modify, merge,
publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons
to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or
substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.
*/
var $signinBtn = $('.signinBtn');
var $loginBtn = $('.loginBtn');
var $logoutBtn = $('.logoutBtn');

var $collectImg = $('.collectImg');
var $collectTxt = $('.collectTxt');

chrome.storage.sync.get({access_token: '', collectFlag: true}, function(item) {
  if (item.access_token) {
    $.ajax({
      url: uri(api.user.me.url, item.access_token),
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        console.log(data)
        $('.register-portrait').attr('src', data.data.headimgurl);
        $('.register-info').find('p').show().siblings('div').hide();
        $('.register-username').text(data.data.username);

        if (item.collectFlag) {
          $collectImg.click(function(event) {
            sendMessageToContentScript({cmd: 'collectImg'}, function(response) {});
            setTimeout(function() { window.close(); }, 100);
            return
          });

          $collectTxt.click(function(event) {
            sendMessageToContentScript({cmd: 'collectIxt'}, function(response) {});
            setTimeout(function() { window.close(); }, 100);
            return
          });
        }

        $('.register-portrait').click(function(event) {
          window.open(host_link + '/user/info?access_token=' + item.access_token, '');
        });

        $('.register-username').click(function(event) {
          window.open(host_link + '/user/info?access_token=' + item.access_token, '');
        });
      }
    })
  } else {
    $('.register-info').find('p').hide();
  }

  $collectImg.click(function(event) {
    if (!item.access_token) {
      setTimeout(function() { window.close(); }, 100);
      window.open('./../../view/login.html', '', 'menubar=no,resizable=0,scrollbars=no,status=no,toolbar=no,titlebar=no,width=1000,height=700');
    }
  });

  $collectTxt.click(function(event) {
    if (!item.access_token) {
      setTimeout(function() { window.close(); }, 100);
      window.open('./../../view/login.html', '', 'menubar=no,resizable=0,scrollbars=no,status=no,toolbar=no,titlebar=no,width=1000,height=700');
    }
  });
});

$('.pluginHelp').click(function(event) {
  window.open(host_link + '/site/plugin', '');
});


$logoutBtn.click(function(event) {
  chrome.storage.sync.set({access_token: ''});
  setTimeout(function() { window.close(); }, 100);
});

$signinBtn.click(function(event) {
  setTimeout(function() { window.close(); }, 100);
  window.open('./../../view/signin.html', '', 'menubar=no,resizable=0,scrollbars=no,status=no,toolbar=no,titlebar=no,width=1000,height=700');
});

$loginBtn.click(function(event) {
  $.ajax({
    url:uri(api.site.getencrypt.url),
    type:'GET',
    dataType:'json',
    async:false,
    success:function(data){
      if(data.ret == 200){
        var dat = data.data;
        window.open(host_link + '/site/login?encrypt=' + dat.encrypt, '', 'menubar=no,resizable=0,scrollbars=no,status=no,toolbar=no,titlebar=no,width=1000,height=700');
        var time = setInterval(function(){
          $.ajax({
            type:'post',
            url:uri(api.site.getlogin.url),
            data:JSON.stringify(dat),
            dataType:'json',
            async:false,
            success:function(data){
              if(data.ret == 200){
                chrome.storage.sync.set({access_token: data.data.access_token});
                window.location.reload();
              }
            }
          })
        },2000);
      }
    }
  })
  
});

function sendMessageToContentScript(message, callback) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
      if (callback) callback(response);
    });
  });
}
