$(function(){
    const create_blockGrammarly   = (byId,splitPoint) =>{
        const block_target = document.getElementById(byId);
        const block_target_val = block_target.innerText;
        const arr_trans_block = block_target_val.split(splitPoint)
                        .map((val,index)=>{
                            if(index == 0){
                                return val;
                            }
                            let trans_text = val[0]
                            for(let i=0; i<val.length; i++){
                                if(i == 0){
                                    continue;
                                }
                                    trans_text += "*"
                            }
                            return trans_text;
                        });
        const trans_block = arr_trans_block.join(splitPoint)
        block_target.innerText = trans_block;
    };
    const block_main =()=>{
        const myPageTel = "myPageTel";
        const myPageAddr = "myPageAddr";
        const telSplitPoint = "-";
        const addrSplitPoint = " ";
        create_blockGrammarly(myPageTel,telSplitPoint)
        create_blockGrammarly(myPageAddr,addrSplitPoint)

        const myPageEmail = document.getElementById("myPageEmail");
        const myPageEmail_text = myPageEmail.innerText;
        const arr_trans_addrBlock = myPageEmail_text.split("@")
            .map((val,index)=>{
                    if(index == 0){
                        let trans_text = val.substring(0,1)
                        for(let i=0; i<val.length; i++){
                            if(i>1){
                                trans_text += "*"
                                continue;
                            }
                        }
                        return trans_text;
                    }
                    return val;
            });
        const trans_addrBlock = arr_trans_addrBlock.join("@")
        myPageEmail.innerText = trans_addrBlock;
    }
    block_main();
});