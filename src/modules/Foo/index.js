'use strict'

module.exports={
  render: render
}

function render(){
  document.getElementById('foo').innerHTML = loadComponent()
  addListeners()
}

var inputStyl = 'style="background-color: #fff; padding: .5em;"'
var buttonStyl = 'style="background-color: #DFD640; cursor:pointer; '+
                 'padding: .5em; margin: .5em; text-align:center;"'
function loadComponent(){
  return '<div '+inputStyl+ '>input:<input id="bar_component_input"></input></div>'+
         '<div id="bar_component_post" '+ buttonStyl+'>Push to db</div>'+
         '<div id="bar_component_read" '+ buttonStyl+'>Read from db</div>'
}

function addListeners(){
  var input = document.getElementById('bar_component_input')
  var btn_post = document.getElementById('bar_component_post')
  var btn_read = document.getElementById('bar_component_read')
  btn_post.style.backgroundColor = '#436AB3'
  btn_post.addEventListener('click', function(){
    // this calls the POST to the database
    var date = new Date().toDateString().slice(0,-5)
    var buzz = input.value
    console.log('input is '+buzz)
      fetch('Foo', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'date': date, 'buzz': buzz})
      })
  })
  btn_read.addEventListener('click', function(){
    // destroy previous list if present
    if(this.childNodes[1]){this.removeChild(this.childNodes[1])}
    // this gathers info from the database
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/Foo');
    xhr.onload = function() {
      if (xhr.status === 200) {
          console.log("xhr res is "+xhr.responseText);
          drawList(xhr.responseText)
      }
      else {alert('Request failed.  Returned status of ' + xhr.status);}
    }
    xhr.send();
  })
}

function drawList(str,key) {
  // this just draws the data received so you can see it works
  var btn_read = document.getElementById('bar_component_read')
  var list = JSON.parse(str)
  var i = 0
  var len = list.length
  while(i<len) {
    var element = document.createElement('DIV')
    element.style.backgroundColor = '#218F60'
    element.innerHTML = 'Buzz from '+list[i].date
    btn_read.appendChild(element)

    var ul = document.createElement('UL')
    ul.style.textAlign = 'left'
    element.appendChild(ul)
    var len2 = list[i].buzz.length
    var j = 0
    while(j<len2){
      var li = document.createElement('LI')
      li.innerHTML = list[i].buzz[j]
      ul.appendChild(li)
      j++
    }

    i++
  }
}
