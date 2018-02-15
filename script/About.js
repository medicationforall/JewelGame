/**
 *   Jewel Game source file About,
 *   Copyright (C) 2018  James M Adams
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU Lesser General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU Lesser General Public License for more details.
 *
 *   You should have received a copy of the GNU Lesser General Public License
 *   along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
function About(){
  this.template='<div class="about screen">'+
  '<h2>About</h2>'+
  '<div class="content">'+
  'Jewel Game<br />'+
  'Written by James Adams &copy; 2018 <br />'+
  'Licensed under <a href="LICENSE" target="_blank">LGPL version 3.0</a><br />'+
  '<a href="https://github.com/medicationforall/JewelGame" target="_blank">'+
  '<svg aria-labelledby="title" role="img" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414" style="height: 25px; width: 25px;">'+
'<title>GitHub icon</title>'+
'<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23'+ '3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>'+
'</svg> '+
  'Github Source Code</a><br /><br />'+
  'Powered By:'+
  '<ul>'+
  '<li><a href="https://jquery.com" target="blank">jQuery</a></li>'+
  '<li><a href="https://github.com/davidbau/seedrandom" target="_blank">seedrandom.js</a></li>'+
  '<li><a href="https://daneden.github.io/animate.css" target="_blank">animate.css</a></li>'+
  '<li><a href="https://github.com/marcuswestin/store.js" target="_blank">Store.js</a></li>'+
  '</ul>'+
  'For other tools and games see - <a href="https://medicationforall.com" target="_blank">medicationforall.com</a><br />'+
  '</div>'+
  '</div>';
  this.node = $(this.template);
  this.node.data('node',this);
}
