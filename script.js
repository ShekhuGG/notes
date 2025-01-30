let inp = document.getElementById('note')
let stbtn = document.getElementById('submit_button')
let display = document.getElementById('display')
let data = document.getElementById('data')
let nc = document.getElementById('notes_container')
let clear = document.getElementById('clear')
let itemNo = localStorage.length;
if (!localStorage.getItem('lastNo')) {
  lastNo = itemNo
  localStorage.setItem('lastNo', `${lastNo}`)
}
console.log(clear)
let arr = []

function lastNoIncrease() {
  let lastNo = Number(localStorage.getItem('lastNo'))
  localStorage.setItem('lastNo', `${lastNo + 1}`)
}

inp.oninput = () => {
  let i = 0
  if (inp.value.includes('\n')) {
    Array.from(inp.value).forEach(v => {
      if (v == '\n') { i++ }
    })
  }
  let n = inp.value.length / 57 + i
  if (n > 1 && n < 5) {
    inp.style.height = `calc(5vh + ${Math.ceil(2 * (n + 2))}rem)`
  }
  if (n > 5) {
    inp.style.height = `calc(5vh + 12rem)`
  }
}

stbtn.addEventListener('click', () => {
  let date = new Date()
  let str_date = date.toLocaleString()
  if (inp.value != '') {
    lastNoIncrease()
    let lastNo_fromStorage = localStorage.getItem('lastNo')
    arr.push(inp.value.replaceAll('\n', '<br>'))
    localStorage.setItem(`note${lastNo_fromStorage}`, `${str_date} : <pre class='datasets_content'>${arr[arr.length - 1]}</pre>`)
    inp.value = ''
    inp.style.height = '5vh'
    let plus = document.createElement('span')
    plus.textContent = '+'
    document.body.append(plus)
    plus.classList.add('plus')
    setTimeout(() => {
      plus.remove()
    }, 3000)
    if (d_index % 2 == 1) {
      document.querySelectorAll('.datas').forEach(v => v.remove())
      // console.log(data.innerHTML)
      // data.innerHTML = data.innerHTML.replaceAll('<br>','')
      // console.log(data.innerHTML)
      nc.innerHTML = ''
      for (let i = Number(localStorage.getItem('lastNo')); i > 0; i--) {
        if (localStorage.getItem(`note${i}`) != null) {
          nc.innerHTML += `<div class = 'datas note${i}'><i class="fa-regular del_item fa-trash-can"></i>${localStorage.getItem(`note${i}`)}</div> <br>`
        }
      }
    }
  }
  else {
    let err = document.createElement('span')
    err.classList.add('err')
    err.textContent = 'Kindly Write Something'
    document.body.append(err)
    setTimeout(() => {
      err.remove()
    }, 3000)
  }
})

let d_index = 0;
display.addEventListener('click', () => {
  for (let i = Number(localStorage.getItem('lastNo')); i > 0; i--) {
    if (localStorage.getItem(`note${i}`) != null) {
      nc.innerHTML += `<div class = 'datas note${i}'><i class="fa-regular del_item fa-trash-can"></i>${localStorage.getItem(`note${i}`)}</div> <br>`
    }
  }
  data.classList.toggle('dataset')
  if (d_index % 2 == 0) {
    data.hidden = false
  }
  else {
    data.hidden = true
    nc.innerHTML = ''
  }
  d_index++
})

data.firstElementChild.addEventListener('click', () => {
  if (localStorage.length != 0) {
    let cnf = confirm('Would You Like to Delete All your Notes? ')
    if (cnf) {
      localStorage.clear()
    }
  }
  else {
    let err2 = document.createElement('span')
    err2.classList.add('err2')
    err2.textContent = 'NoteBook Already Empty'
    document.body.append(err2)
    setTimeout(() => {
      err2.remove()
    }, 3000)
  }
  nc.innerHTML = ''
  for (let i = Number(localStorage.getItem('lastNo')); i > 0; i--) {
    if (localStorage.getItem(`note${i}`) != null) {
      nc.innerHTML += `<div class = 'datas note${i}'><i class="fa-regular del_item fa-trash-can"></i>${localStorage.getItem(`note${i}`)}</div> <br>`
    }
  }
})


window.addEventListener('click', (e) => {
  let elem = e.target
  let elem_parent = elem.parentElement.parentElement
  console.log(elem.classList.contains('del_item '))
  if (elem.classList.contains('del_item')) {
    let del_key = elem.parentElement.classList[1]
    localStorage.removeItem(del_key)
    let t = 0.5
    let disappear_id = setInterval(() => {
      elem.parentElement.style.opacity = `${100 - t}%`
      t += 0.5
      if (t == 100) {
        clearInterval(disappear_id)
      }
    }, 1)
    setTimeout(() => {
      elem.parentElement.remove()
      elem_parent.innerHTML = elem_parent.innerHTML.replace('<br>', '')
      lastNoIncrease()
    }, 1000)
  }
})
