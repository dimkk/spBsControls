# spBsControls 0.1.0 
## Библиотека изменяет стандартную форму листа SharePoint(2013 и 365) используя CSR, добавляя следующее:
1. Twitter Bootstrap - работает только в контексте этой формы. Добавляет необходимые элементы в разметку и форма становится похожа на обычнуй форму бутстрап
2. Open Source контролы вместо стандартных:
 1. Да/Нет - http://www.bootstrap-switch.org/
 2. Дата(без времени) - http://eonasdan.github.io/bootstrap-datetimepicker/
 3. Лукап, Мультилукап, Выбор, Мультивыбор - https://fk.github.io/select2-bootstrap-css/
![alt tag](https://raw.githubusercontent.com/dimkk/spBsControls/master/show.png)

 использование:<br/>
 1. Кладем файлы из https://github.com/dimkk/spBsControls/tree/master/build куда-то в SharePoint<br/>
 2. Заходим на листформу<br/>
 3. Добавляем Script Editor Webpart<br/>
 4. Указываем путь до файлов (Например у меня в библиотеке стилей): <br/>
 <br/>
`<link href='http://portal.jenewa.local/Style%20Library/build/vendor.css' media='screen' rel='stylesheet' type='text/css'/><script src='http://portal.jenewa.local/Style%20Library/build/vendor.js' type='text/javascript'></script>
`
<br/>
`<link href='http://portal.jenewa.local/Style%20Library/build/main.css' media='screen' rel='stylesheet' type='text/css'/><script src='http://portal.jenewa.local/Style%20Library/build/main.js' type='text/javascript'></script>
`
<br/>

 5. Используя, например, Cisar (https://github.com/andrei-markeev/cisar) - создаем js для csr, или берем для примера из репо: https://github.com/dimkk/spBsControls/blob/master/test.js<br/>
 6. Играемся со всяким

 ### Протестировано на IE10, 11, Chrome 41

##Дорожная карта:
1. Возможность использовать контролы без применения Bootstrap
2. Возможность передавать параметры соответствующих опен сурс решений (Параметры смотреть в документации к соотв. решению)
3. Поддержка IE8


##Для разработки
1. Ставим node
1. Git Clone (Я использую https://code.google.com/p/tortoisegit/)
2. cmd - заходим в проект
3. npm install
4. bower install
5. gulp build
6. gulp bundle
7. В папке билд появится свежий бандл
