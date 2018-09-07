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


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  if (request.execute === 'right') {
    window.open('./../../view/right.html?type1=' + encodeURIComponent(request.imgUrl), '', 'menubar=no,resizable=0,scrollbars=no,status=no,toolbar=no,titlebar=no,width=1000,height=600')
  }
});

chrome.contextMenus.create({
  title: "采集文字",
  contexts: ['selection'],
  onclick: function(params) {
    chrome.storage.sync.get({access_token: ''}, function(item) {
      console.log(item)
      if (item.access_token) {
        window.open('./../../view/right.html?type2=' + encodeURIComponent(params.selectionText), '', 'menubar=no,resizable=0,scrollbars=no,status=no,toolbar=no,titlebar=no,width=1000,height=600')
      } else {
        window.open('./../../view/login.html', '', 'menubar=no,resizable=0,scrollbars=no,status=no,toolbar=no,titlebar=no,width=1000,height=700');
      }
    });
  }
});


