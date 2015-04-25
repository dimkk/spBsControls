# spBsControls 0.2.0
## Библиотека изменяет стандартную форму листа SharePoint(2013 и 365) используя CSR, добавляя следующее:
1. Twitter Bootstrap - работает только в контексте этой формы. Добавляет необходимые элементы в разметку и форма становится похожа на обычнуй форму бутстрап
2. Open Source контролы вместо стандартных:
 * Да/Нет - http://www.bootstrap-switch.org/
 * Дата(без времени) - http://eonasdan.github.io/bootstrap-datetimepicker/
 * Лукап, Мультилукап, Выбор, Мультивыбор - https://fk.github.io/select2-bootstrap-css/
![alt tag](https://raw.githubusercontent.com/dimkk/spBsControls/master/show.png)
3. Работает в IE9
4. Можно передавать параметры соответствующих опен сурс решений (Параметры смотреть в документации к соотв. решению)

####Использование:<br/>
  * Кладем файлы из https://github.com/dimkk/spBsControls/tree/master/build куда-то в SharePoint<br/>
  * Заходим на листформу<br/>
  * Добавляем Script Editor Webpart
  * Указываем путь до файлов (Например у меня в библиотеке стилей): <br/>
  ```html
  <link href='/Style%20Library/spBs/vendor.css' media='screen' rel='stylesheet' type='text/css'/>
  <script src='/Style%20Library/spBs/vendor.js' type='text/javascript'></script>
  <link href='/Style%20Library/spBs/spBsCtrls.css' media='screen' rel='stylesheet' type='text/css' />
  <script src='/Style%20Library/spBs/spBsCtrls.js' type='text/javascript'></script>
  ```

  * Используя, например, Cisar (https://github.com/andrei-markeev/cisar) - создаем js для csr, или берем для примера из репо: https://github.com/dimkk/spBsControls/blob/master/test.js<br/>
  * Если не используем Cisar - заходим в свойства веб-части отображения формы листа и указываем путь до JS файла, например - ~siteCollection/Style Library/test.js

### Протестировано на IE9+, Chrome 41

##Дорожная карта:
1. Возможность использовать контролы без применения Bootstrap
2. Покрытие тестами

##Как передавать параметры:
Например, если нужно кастомизировать то, как отображается lookup поле - (выводить подчёркнутое id итема и жирным - значение):
 * Идём на страницу проекта Select2 - https://select2.github.io/examples.html
 * Находим раздел Templating
 * Вставляем подобный кусок в наш CSR файл https://github.com/dimkk/spBsControls/blob/master/test.js, пример в поле lookup в контексте EditForm
 * Получаем результат:
 ![alt tag](https://raw.githubusercontent.com/dimkk/spBsControls/master/select2-templating.png)

##Для разработки
1. Ставим node
1. git clone https://github.com/dimkk/spBsControls.git
2. cmd - заходим в проект
3. npm install
4. bower install
5. gulp (соберет проект, не забудьте указать в gulp.config.js - путь до папки в SP)
6. gulp watch - будет следить за изменениями
7. gulp trans - закинет 

####Тут немного видео:
[![Видос](http://img.youtube.com/vi/LxGSRqxljWk/0.jpg)](http://www.youtube.com/watch?v=LxGSRqxljWk)
