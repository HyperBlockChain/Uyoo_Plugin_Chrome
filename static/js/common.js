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


var host = "https://api.example.net/"

var plugin_version = '1.0.0';

var host_link = 'https://test.example.net'

var api = {
  user: {
    signup: {
      url: 'user/signup',
      type: 'post'
    },
    login: {
      url: 'user/login',
      type: 'post'
    },
    me: {
      url: 'user/me',
      type: 'get'
    },
  },

  site: {
    isfree: {
      url: 'site/isfree',
      type: 'post'
    },
    urlupload: {
      url: 'site/urlupload',
      type: 'post'
    },
    imgupload: {
      url: 'site/imgupload',
      type: 'post'
    },
    getencrypt: {
      url: 'site/getencrypt',
      type: 'get'
    },
    getlogin: {
      url: 'site/getlogin',
      type: 'post'
    },
  },

  works: {
    create: {
      url: 'works/create',
      type: 'post'
    },
    uyoorelease: {
      url: 'works/uyoorelease',
      type: 'post'
    },
    workinfo: {
      url: 'works/workinfo',
      type: 'post'
    }
  },
};

function uri(url, token) {
  if (token) {
    return host + url + '?access_token=' + token + '&ver=chrome-' + plugin_version;
  } else {
    return host + url + '?' + 'ver=chrome-' + plugin_version;
  }
}