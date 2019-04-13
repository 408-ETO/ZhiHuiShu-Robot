//后台总控制JS

const data = {
  isRun:true,
  setting:[true,true,true,false,false]
}

//但被安装时
chrome.runtime.onInstalled.addListener(function() {
  //初始化内存
  chrome.storage.sync.set(data,() => {});

  chrome.browserAction.setBadgeText({text:'刷课'});
  chrome.browserAction.setBadgeBackgroundColor({color:[0,128,0,255]});

  //增加适用页面Rules
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'study.zhihuishu.com/learning'},//适用页面URL
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
