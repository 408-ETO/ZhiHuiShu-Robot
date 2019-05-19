//后台总控制JS

const data = {
  isRun: true,
  setting: [true, true, true, false, false]
}

//但被安装时
chrome.runtime.onInstalled.addListener(function () {
  //初始化内存
  chrome.storage.sync.set(data, () => { });

  chrome.browserAction.setBadgeText({ text: '刷课' });
  chrome.browserAction.setBadgeBackgroundColor({ color: [0, 128, 0, 255] });
});
