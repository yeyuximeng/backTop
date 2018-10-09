import './style/css/main.css'
import "./style/scss/toolbar.scss";
import "./style/scss/menu.scss";
import "./style/scss/body.scss";
import "./style/scss/footer.scss";
import "./style/scss/3DBOX.scss"; 

import $  from'jquery';
import BackTop from'./js/backTop/backTop.js';

//new BackTop('#backTop');
$('#backTop').backTop({speed:400});  