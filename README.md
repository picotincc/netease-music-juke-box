# netease-music-juke-box

一个高仿网易云音乐Web端音乐播放器

# 网易云音乐API
 - 获取某个用户的歌单    
 http://music.163.com/api/user/playlist/?uid=40652589&limit=1000&offset=0
 - 获取某个歌单的详细信息  
 http://music.163.com/api/playlist/detail?id=4000000

# 技术概述
 - HTML5
 - LESS
 - JavaScript
 - ES6/ES2015
 - Babel
 - Webpack
 - jQuery

# 安装步骤
## 1. clone项目
    $ git clone https://github.com/MagicCube/netease-music-juke-box.git
## 2. 进入项目根目录
    $ cd netease-music-juke-box
## 3. 安装package.json中的devDependencies
    $ npm install --only

# 运行步骤
## 1. 启动webpack-dev-server
    $ webpack-dev-server
## 2. 在浏览器中访问http://localhost:8080
