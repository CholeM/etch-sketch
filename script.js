const grid = document.querySelector('#grid')
const clearbtn = document.querySelector('.clearbtn')
const erasebtn = document.querySelector('.erasebtn')
const rainbowbtn = document.querySelector('.rainbowbtn')
const blackbtn = document.querySelector('.blackbtn')
const slider = document.querySelector("#cubeNum");
const sizeValue = document.querySelector("#sizeNum")

let currentMode = 'black';

function setMode(newColor) {
  activateButton(newColor)
  currentMode = newColor
}

function startGrid(gridNum) {
  let totalGrid = gridNum * gridNum;
  for (let i = 0; i < totalGrid; ++i ) {
    grid.style.gridTemplateColumns = `repeat(${gridNum}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${gridNum}, 1fr)`

    const cube = document.createElement('div')
    cube.classList.add('cube')

    cube.style.cssText = 'background-color:#fff;'
      
    grid.appendChild(cube);
  }
  let items = grid.querySelectorAll('.cube')
  items.forEach(item => item.addEventListener('mouseover',changeColor))
}

function changeColor(e) {
  if (currentMode === 'rainbow') {
    e.target.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`
  }else if (currentMode === 'black') {
    e.target.style.backgroundColor = '#000'
  } else if (currentMode === 'erase') {
    e.target.style.backgroundColor = '#fff'
  }
}

function activateButton(newColor) {
  if (currentMode === 'rainbow') {
    rainbowbtn.classList.remove('active')
  }else if (currentMode === 'black') {
    blackbtn.classList.remove('active')
  } else if (currentMode === 'erase') {
    erasebtn.classList.remove('active')
  }

  if (newColor === 'rainbow') {
    rainbowbtn.classList.add('active')
  }else if (newColor === 'black') {
    blackbtn.classList.add('active')
  }else if (newColor === 'erase') {
    erasebtn.classList.add('active')
  }
}

function clear() {
  let items = grid.querySelectorAll('.cube')
  items.forEach(item => item.style.backgroundColor = '#fff')
}

function cubeSize(){
  let items = grid.querySelectorAll('.cube')
  items.forEach(item => item.remove())
  startGrid(slider.value);
}

function updateSizeValue(value) {
  sizeValue.innerHTML = `${value} x ${value}`
}

clearbtn.addEventListener('click', clear);
erasebtn.onclick = () => setMode('erase');
rainbowbtn.onclick = () => setMode('rainbow');
blackbtn.onclick = () => setMode('black');
slider.addEventListener('mouseup',cubeSize);
slider.onmousemove = (e) => updateSizeValue(e.target.value)

window.onload = () => {
  startGrid(16)
  activateButton('black')
}