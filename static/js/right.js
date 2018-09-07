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


var $submitBtn = $('.submitBtn');
var $workstitle = $('#workstitle');
var $worksauthor = $('#worksauthor');
var $worksowner = $('#worksowner');
var $workshash = $('.workshash');
var $agreement = $('.agreement');

var $workstitleErr = $('.workstitleErr');
var $worksauthoreErr = $('.worksauthoreErr');
var $worksownerErr = $('.worksownerErr');

var $formInfo = $('.formInfo');

var workstitleFlag = false;
var worksauthorFlag = false;
var worksownerFlag = false;

var agreementFlag = true;

$agreement.click(function(event) {
  agreementFlag = !agreementFlag;

  if (agreementFlag) {
    $submitBtn.css('background-color', '#f3a01b');
  } else {
    $submitBtn.css('background-color', '#ddd');
  }
});

chrome.storage.sync.get({access_token: ''}, function(item) {
  if (item.access_token) {
    $.ajax({
      url: uri(api.user.me.url, item.access_token),
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        console.log(data)
        
        $worksauthor.val(data.data.pen_name)
        $worksowner.val(data.data.copyright_owner_name)
      }
    })
  } else {
    $('.register-info').find('p').hide();
  }
});


var _type = decodeURIComponent(window.location.search.substr(1, 5));
var _url = decodeURIComponent(window.location.search.substr(7));
var path = '';
var content_file = '';
var content_hash = '';
var filename = '';
var type = 1;

if (_type === 'type1') {
  path = decodeURIComponent(window.location.search.substr(7));

  $('.preview img').attr('src', path);

  var xhr = new XMLHttpRequest();
      xhr.open('GET', path, true);
      xhr.responseType = 'blob';

  xhr.onload = function(e) {
    if (this.status === 200) {
      var blob = this.response;
      var reader = new window.FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function() {
        var base64data = reader.result;

        $.ajax({
          url: uri(api.site.imgupload.url),
          type: 'POST',
          dataType: 'json',
          data: JSON.stringify({
            img: base64data
          }),
          success: function(data) {
            console.log(data)
            content_file = data.data.content_file;
            content_hash = data.data.content_hash;
            filename = data.data.name;
            type = data.data.type;

            $workshash.text(data.data.content_hash)
          }
        });
      }
    };
  };

  xhr.send();

  path = '';
} else if (_type === 'type2') {console.log(path)
  path = decodeURIComponent(window.location.search.substr(7));
  var shaObj = new jsSHA("SHA-512", "TEXT");
  shaObj.update(path);
  content_hash = shaObj.getHash("HEX");
  $('.preview p').text(path);
  $workshash.text(content_hash);
}

$formInfo.focus(function(event) {
  $(this).css('border-color', '#e9e9e9');
  $(this).siblings('.errTip').text('');
});

chrome.storage.sync.get({access_token: ''}, function(item) {
  $submitBtn.click(function(event) {
    var workstitle = $workstitle.val();
    var worksauthor = $worksauthor.val();
    var worksowner = $worksowner.val();

    if (!agreementFlag) return;

    verify(workstitle, worksauthor, worksowner)

    if (workstitleFlag && worksauthorFlag && worksownerFlag) {
      $.ajax({
        url: uri(api.works.create.url, item.access_token),
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify({
          name: workstitle,
          author: worksauthor,
          copyright_owner_name: worksowner,
          content_text: path,
          content_file: content_file,
          content_hash: content_hash,
          filename: filename,
          type: type
        }),
        success: function(data) {
          console.log(data)
          if (data.ret == 200) {
            $('.container').hide().eq(1).show();

            chrome.storage.sync.set({worksid: data.data.id});

            $('.priceLink').click(function(event) {
              window.open(host_link + '/works/priceuyoo?id=' + data.data.id + '&access_token=' + item.access_token, '');
              setTimeout(function() { window.close(); }, 100);
            });
            
          } else {
            $('.container').hide().eq(2).show();
          }
        }
      })
    }
  });
});

function verify(workstitle, worksauthor, worksowner) {
  if (workstitle === '') {
    workstitleFlag = false
    $workstitle.css('border-color', '#ff8c44');
    $workstitleErr.text('请输入作品标题');
  } else {
    workstitleFlag = true
    $workstitleErr.text('');
    $workstitle.css('border-color', '#e9e9e9');
  }

  if (worksauthor === '') {
    worksauthorFlag = false
    $worksauthor.css('border-color', '#ff8c44');
    $worksauthoreErr.text('请输入该作品的作者名称');
  } else {
    worksauthorFlag = true
    $worksauthoreErr.text('');
    $worksauthor.css('border-color', '#e9e9e9');
  }

  if (worksowner === '') {
    worksownerFlag = false
    $worksowner.css('border-color', '#ff8c44');
    $worksownerErr.text('请输入该作品的版权所有者名称');
  } else {
    worksownerFlag = true
    $worksownerErr.text('');
    $worksowner.css('border-color', '#e9e9e9');
  }
}


$('.closeBtn').click(function(event) {
  window.close();
});
