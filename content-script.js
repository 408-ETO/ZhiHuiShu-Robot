//注入页面用于控制DOM

chrome.storage.sync.get('isRun', data => {
    if (!data.isRun || window.location.host != 'study.zhihuishu.com')
        return
    document.addEventListener('DOMContentLoaded', () => {
        console.log('js injected in')

        chrome.storage.sync.get('setting', res => {
            //console.log(res.setting)
            let [speed, next, quiz, fluent, volume] = res.setting

            function volumeShut() {
                if (!volume)
                    return
                document.getElementsByClassName('volumeIcon')[0].click();
                console.log('volume shut down')
            }

            function speedUP() {
                if (!speed)
                    return
                document.getElementsByClassName('speedTab15')[0].click()
                console.log('set 1.5 speed up')
            }

            function setBQ() {
                if (!fluent)
                    return
                document.getElementsByClassName('definiLines')[0].children[2].click()
                console.log('set video in fluent quality')
            }

            function nextClass() {
                if (!next)
                    return
                document.getElementById('nextBtn').click()
                console.log('go to next lesson')
            }

            function closeQuiz() {
                if (!quiz)
                    return
                if (document.getElementsByClassName('wrap_popchapter')[0]) {
                    document.getElementsByClassName('tmui_txt_hidd')[0].click()
                    console.log('close the quiz window')
                }

            }

            function thread() {
                setInterval(() => {
                    if (next && document.getElementsByClassName('passTime')[0].style.width == '100%') {
                        setTimeout(() => {
                            nextClass()
                            setTimeout(init, 2500)
                        }, 500)
                    }
                }, 3000)
                setInterval(closeQuiz, 100)
            }

            function init() {
                volumeShut() 
                speedUP()
                setBQ()
            }

            function addPageAction(){
                document.getElementsByClassName('next_lesson')[0].addEventListener('click',() => setTimeout(init, 1000))
            }

            function main() {
                addPageAction()
                init()
                thread()
            }

            setTimeout(main, 1000)
        })
    });
})