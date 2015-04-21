# spBsControls 0.1.1
## Библиотека изменяет стандартную форму листа SharePoint(2013 и 365) используя CSR, добавляя следующее:
1. Twitter Bootstrap - работает только в контексте этой формы. Добавляет необходимые элементы в разметку и форма становится похожа на обычнуй форму бутстрап
2. Open Source контролы вместо стандартных:
 * Да/Нет - http://www.bootstrap-switch.org/
 * Дата(без времени) - http://eonasdan.github.io/bootstrap-datetimepicker/
 * Лукап, Мультилукап, Выбор, Мультивыбор - https://fk.github.io/select2-bootstrap-css/
![alt tag](https://raw.githubusercontent.com/dimkk/spBsControls/master/show.png)

####Использование:<br/>
  * Кладем файлы из https://github.com/dimkk/spBsControls/tree/master/build куда-то в SharePoint<br/>
  * Заходим на листформу<br/>
  * Добавляем Script Editor Webpart<br/>
  * Указываем путь до файлов (Например у меня в библиотеке стилей): <br/>
   <br/>
   `<link href='http://portal.jenewa.local/Style%20Library/build/vendor.css' media='screen' rel='stylesheet' type='text/css'/><script src='http://portal.jenewa.local/Style%20Library/build/vendor.js' type='text/javascript'></script>
   `
   <br/>
   `<link href='http://portal.jenewa.local/Style%20Library/build/main.css' media='screen' rel='stylesheet' type='text/css'/><script src='http://portal.jenewa.local/Style%20Library/build/main.js' type='text/javascript'></script>
   `
   <br/>

  * Используя, например, Cisar (https://github.com/andrei-markeev/cisar) - создаем js для csr, или берем для примера из репо: https://github.com/dimkk/spBsControls/blob/master/test.js<br/>
  * Заходим в свойства веб-части отображения формы листа и указываем путь до JS файла, например - ~siteCollection/Style Library/test.js

### Протестировано на IE9+, 11, Chrome 41

##Дорожная карта:
1. Возможность использовать контролы без применения Bootstrap
2. Возможность передавать параметры соответствующих опен сурс решений (Параметры смотреть в документации к соотв. решению)
3. Поддержка IE8


##Для разработки
1. Ставим node
1. git clone https://github.com/dimkk/spBsControls.git (Я использую https://code.google.com/p/tortoisegit/)
2. cmd - заходим в проект
3. npm install
4. bower install
5. gulp (соберет проект, не забудьте указать в gulp.config.js - путь до папки в SP)
6. gulp watch - будет следить за изменениями
