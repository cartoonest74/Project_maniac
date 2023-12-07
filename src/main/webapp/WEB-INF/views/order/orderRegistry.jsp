<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://kit.fontawesome.com/7938f26122.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="./orderRegistry.css">
</head>
<body>
    <script>
        const termBoxExit = () =>{
            const TERMBOX = document.getElementById("Term_BOX");
            TERMBOX.classList.add('none');
        };
    </script>
    <div id="Term_BOX" class="orBox">
        <button class="orBoxExit" onclick="termBoxExit()" type="button">
            <i class="fa-solid fa-x fa-lg"></i>
        </button>
        <header class="orHeader">
            <h1>주문자 수정</h1>
        </header>
        <section class="orContent">
            <nav class="orInfo">
                <span>FIRST</span>
                <input type="text" name="orderFirstname" placeholder="성을 입력해주세요">
                <span class="none">zzzzz</span>
            </nav>
            <nav class="orInfo">
                <span>LAST</span>
                <input type="text" name="orderLastname" placeholder="이름을 입력해주세요">
                <span class="none"></span>
            </nav>
            <nav class="orInfo">
                <span>EMAIL</span>
                <input type="email" name="orderEmail" placeholder="Email을 입력해주세요">
                <span class="none"></span>
            </nav>
            <nav class="orInfo">
                <span>TELEPHONE</span>
                <input type="tel" name="orderTel" placeholder="전화번호를 입력해주세요">
                <span class="none"></span>
            </nav>
        </section>
        <footer class="orSaveBtn">
            <button type="button">SAVE</button>
        </footer>
    </div>
</body>
</html>