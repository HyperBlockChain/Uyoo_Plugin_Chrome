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


chrome.storage.sync.set({collectFlag: true});
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.cmd === 'collectImg') {
		var inject_html = `<div class="inject_html" id="inject_html">
		                     <div class="inject_html-header" id="inject_html-header">
													 <button class="close-collecting" id="close-collecting"></button>
													 <img src="${host_link}/img/xx.png">
		                     </div>
												 
												 <div class="contss">
 													 <div class="inject_html-imgList c" id="inject_html-imgList"></div>
												 </div>
		                   </div>`;
		var imgList = '';
		var img = $('img');

	  $('body')
		  .css('overflow', 'hidden')
		  .append(inject_html);

		$('.inject_html').css('overflow', 'auto');

		for (var i = 0, len = img.length; i < len; i++) {
			if (img.eq(i).width() > 150 && img.eq(i).height() > 150) {
				$('.inject_html-imgList').append('<div class="inject_html-imgItem"><img src="' + img.eq(i).attr('src') + '"><button class="cbtn" type="button">采集</button></div>');
			}
		}
		chrome.storage.sync.set({hosts: window.location});
		chrome.storage.sync.set({collectFlag: false});
		$('.inject_html-imgList').append(imgList)
	} else if (request.cmd === 'collectIxt') {
		var inject_html = `<div class="inject_html" id="inject_html">
												<div class="inject_html-header" id="inject_html-header">
													 <button class="close-collecting" id="close-collecting"></button>
													 <img src="${host_link}/img/xx.png">
		                     </div>

												<img class="de_img" src="${host_link}/img/chrom_plugin/tt.png" alt="">
											</div>`;
		$('body')
		  .css('overflow', 'hidden')
		  .append(inject_html);

		$('.inject_html').css('overflow', 'auto');

		chrome.storage.sync.set({collectFlag: false});
		$('.inject_html-imgList').append(inject_html)
	}

	$('.close-collecting').click(function(event) {
		$('.inject_html').remove();
		$('body').css('overflow', 'auto');
		chrome.storage.sync.set({collectFlag: true});
	});

	$('body').on('click', '.cbtn', function(event) {
		event.preventDefault();

		chrome.runtime.sendMessage({execute: 'right', imgUrl: toAbsURL($(this).siblings('img').attr('src'))}, function(response) {});
	});
});

var toAbsURL = function(url){
  var result,
      img = document.createElement('img');
  img.src = url;
  result = img.src;
  img.src = null;
  return result;
};