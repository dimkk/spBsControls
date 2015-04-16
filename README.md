# spBsControls 0.0.1
 использование:<br/>
 1) Кладем файлы из ./build куда-то в SharePoint2013 (365 не тестил)<br/>
 2) Заходим на листформу<br/>
 3) Добавляем Script Editor Webpart<br/>
 4) Указываем путь до файлов (Например у меня в библиотеке стилей): <br/>
 <br/>
`<link href='http://portal.jenewa.local/Style%20Library/build/vendor.css' media='screen' rel='stylesheet' type='text/css'/>
<br/>
`<script src='http://portal.jenewa.local/Style%20Library/build/vendor.js' type='text/javascript'></script>
<br/>
`<link href='http://portal.jenewa.local/Style%20Library/build/main.css' media='screen' rel='stylesheet' type='text/css'/>
<br/>
`<script src='http://portal.jenewa.local/Style%20Library/build/main.js' type='text/javascript'></script>
<br/>

 5) Используя, например, Cisar (https://github.com/andrei-markeev/cisar) - создаем js для csr, или берем для примера из репо: './test.js'<br/>
 6) Добавляем в OnPreRender: form:<br/>
 `var form = function(ctx){
 <br/>
 `spBsCtrls.formWrap(ctx);
 <br/>
 `}
 <br/>
 7) Добавляем в OnPostRender:field  
 <br/>
  'var field = function(ctx){
  <br/>
  'spBsCtrls.fieldWrap(ctx);
  <br/>
  '}
  <br/>
 `
 <br/>
 8) В поля подставляем picker:
  <br/>
 `var picker = function(ctx){
  <br/>
`return spBsCtrls.picker(ctx);
 <br/>
`}
 <br/>
