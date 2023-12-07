function getContextPath(){
	        let hostIndex = location.href.indexOf(location.host)+location.host.length;
	        let contextPath = location.href.substring(hostIndex, location.href.indexOf('/',hostIndex+1))
	        return contextPath;
	    }
const contextPath = getContextPath();
var oEditors = [];
smartEditor = function(){
nhn.husky.EZCreator.createInIFrame({
    	    oAppRef: oEditors,
    	    elPlaceHolder: "txtContent",  //textarea ID 입력
    	    sSkinURI: `${contextPath}\/libs\/smarteditor\/SmartEditor2Skin.html`,  //martEditor2Skin.html 경로 입력
    	    fCreator: "createSEditor2",
    	    htParams : {
    	    	// 툴바 사용 여부 (true:사용/ false:사용하지 않음)
    	        bUseToolbar : true,
    		// 입력창 크기 조절바 사용 여부 (true:사용/ false:사용하지 않음)
    		bUseVerticalResizer : false,
    		// 모드 탭(Editor | HTML | TEXT) 사용 여부 (true:사용/ false:사용하지 않음)
    		bUseModeChanger : false
    	    }
    });
}
$(function(){
    smartEditor();
})