chrome.storage.sync.get('isRun', data => {
  let bn = document.getElementById('bn')
  let p = document.getElementById('text')

  const text = ['运行', '停用']
  const tag = ['停用', '启用']
  const color = ['red', 'green']
  const rgb = [{ color: [0, 128, 0, 255] }, { color: [255, 0, 0, 255] }]

  function setStyle(b) {
    function numBoolean(b) {
      return b ? 0 : 1
    }
    p.innerText = text[numBoolean(b)]
    p.style.color = color[numBoolean(!b)]
    bn.innerText = `${tag[numBoolean(b)]}插件`
    bn.style.backgroundColor = color[numBoolean(b)]
    chrome.browserAction.setBadgeBackgroundColor(rgb[numBoolean(b)]);
  }

  function setView(b) {
    setStyle(b)
    bn.onclick = () => {
      chrome.storage.sync.set({ isRun: !b }, () => {
        setView(!b)
      })
    }
  }

  setView(data.isRun)
})

const n = 5

chrome.storage.sync.get('setting', res => {

  let checkBoxS = document.getElementsByName('check-box')
  let submit = document.getElementById('submit')
  let {setting} = res

  for (let i = 0; checkBoxS[i]; i++) {
    if (setting[i]) {
      checkBoxS[i].click()
    }
  }

  submit.onclick = () => {
    submit.innerHTML = '设置成功'
    for(let i = 0;i < n;i++){
        setting[i] = checkBoxS[i].checked
    }
    chrome.storage.sync.set({setting:setting},() => {})
  }
})