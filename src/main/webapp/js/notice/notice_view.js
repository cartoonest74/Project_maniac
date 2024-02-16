const NOTICE_CONTENT = document.getElementById("noticeContent")
let noticeContent = NOTICE_CONTENT.innerHTML
noticeContent = noticeContent.replace(/\\n|\\&quot;/ig,'')
noticeContent= noticeContent.replace(/\/['"']/ig,'"')
NOTICE_CONTENT.innerHTML = noticeContent;