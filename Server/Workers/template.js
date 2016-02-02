
function htmlGenerator(title, invitee, bigPicture, description){



var txt = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'+
'<html xmlns="http://www.w3.org/1999/xhtml" style="margin: 0;padding: 0;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;">'+
'<head style="margin: 0;padding: 0;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;">'+
'<!-- If you delete this tag, the sky will fall on your head -->'+
'<meta name="viewport" content="width=device-width" style="margin: 0;padding: 0;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;">'+
''+
'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" style="margin: 0;padding: 0;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;">'+
'<title style="margin: 0;padding: 0;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;">ZURBemails</title>'+
' '+
'<style style="margin: 0;padding: 0;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;">'+
'/* ------------------------------------- '+
'   GLOBAL '+
'------------------------------------- */'+
'* { '+
' margin:0;'+
' padding:0;'+
'}'+
'* { font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif; }'+
''+
'img { '+
' max-width: 100%; '+
'}'+
'.collapse {'+
' margin:0;'+
' padding:0;'+
'}'+
'body {'+
' -webkit-font-smoothing:antialiased; '+
' -webkit-text-size-adjust:none; '+
' width: 100%!important; '+
' height: 100%;'+
'}'+
''+
''+
'/* ------------------------------------- '+
'   ELEMENTS '+
'------------------------------------- */'+
'a { color: #2BA6CB;}'+
''+
'.button {'+
'  display: inline-block;'+
'  height: 50px;'+
'  line-height: 50px;'+
'  padding-right: 30px;'+
'  padding-left: 70px;'+
'  position: relative;'+
'  background-color:rgb(41,127,184);'+
'  color:rgb(255,255,255);'+
'  text-decoration: none;'+
'  text-transform: uppercase;'+
'  letter-spacing: 1px;'+
'  margin-bottom: 15px;'+
'  '+
'  '+
'  border-radius: 5px;'+
'  -moz-border-radius: 5px;'+
'  -webkit-border-radius: 5px;'+
'  text-shadow:0px 1px 0px rgba(0,0,0,0.5);'+
'-ms-filter:"progid:DXImageTransform.Microsoft.dropshadow(OffX=0,OffY=1,Color=#ff123852,Positive=true)";zoom:1;'+
'filter:progid:DXImageTransform.Microsoft.dropshadow(OffX=0,OffY=1,Color=#ff123852,Positive=true);'+
''+
'  -moz-box-shadow:0px 2px 2px rgba(0,0,0,0.2);'+
'  -webkit-box-shadow:0px 2px 2px rgba(0,0,0,0.2);'+
'  box-shadow:0px 2px 2px rgba(0,0,0,0.2);'+
'  -ms-filter:"progid:DXImageTransform.Microsoft.dropshadow(OffX=0,OffY=2,Color=#33000000,Positive=true)";'+
'filter:progid:DXImageTransform.Microsoft.dropshadow(OffX=0,OffY=2,Color=#33000000,Positive=true);'+
'}'+
''+
'.button span {'+
'  position: absolute;'+
'  left: 0;'+
'  width: 50px;'+
'  background-color:rgba(0,0,0,0.5);'+
'  '+
'  -webkit-border-top-left-radius: 5px;'+
'-webkit-border-bottom-left-radius: 5px;'+
'-moz-border-radius-topleft: 5px;'+
'-moz-border-radius-bottomleft: 5px;'+
'border-top-left-radius: 5px;'+
'border-bottom-left-radius: 5px;'+
'border-right: 1px solid  rgba(0,0,0,0.15);'+
'}'+
''+
'.button:hover span, .button.active span {'+
'  background-color:rgb(0,102,26);'+
'  border-right: 1px solid  rgba(0,0,0,0.3);'+
'}'+
''+
'.button:active {'+
'  margin-top: 2px;'+
'  margin-bottom: 13px;'+
''+
'  -moz-box-shadow:0px 1px 0px rgba(255,255,255,0.5);'+
'-webkit-box-shadow:0px 1px 0px rgba(255,255,255,0.5);'+
'box-shadow:0px 1px 0px rgba(255,255,255,0.5);'+
'-ms-filter:"progid:DXImageTransform.Microsoft.dropshadow(OffX=0,OffY=1,Color=#ccffffff,Positive=true)";'+
'filter:progid:DXImageTransform.Microsoft.dropshadow(OffX=0,OffY=1,Color=#ccffffff,Positive=true);'+
'}'+
''+
'.button.purple {'+
'  background: #8e44ad;'+
'}'+
''+
'.btn {'+
' text-decoration:none;'+
' color: #FFF;'+
' background-color: #666;'+
' padding:10px 16px;'+
' font-weight:bold;'+
' margin-right:10px;'+
' text-align:center;'+
' cursor:pointer;'+
' display: inline-block;'+
'}'+
''+
'p.callout {'+
' padding:15px;'+
' background-color:#ECF8FF;'+
' margin-bottom: 15px;'+
'}'+
'.callout a {'+
' font-weight:bold;'+
' color: #2BA6CB;'+
'}'+
''+
'table.social {'+
'/*   padding:15px; */'+
' background-color: #ebebeb;'+
' '+
'}'+
'.social .soc-btn {'+
' padding: 3px 7px;'+
' font-size:12px;'+
' margin-bottom:10px;'+
' text-decoration:none;'+
' color: #FFF;font-weight:bold;'+
' display:block;'+
' text-align:center;'+
'}'+
'a.fb { background-color: #3B5998!important; }'+
'a.tw { background-color: #1daced!important; }'+
'a.gp { background-color: #DB4A39!important; }'+
'a.ms { background-color: #000!important; }'+
''+
'.sidebar .soc-btn { '+
' display:block;'+
' width:100%;'+
'}'+
''+
'/* ------------------------------------- '+
'   HEADER '+
'------------------------------------- */'+
'table.head-wrap { width: 100%;}'+
''+
'.header.container table td.logo { padding: 15px; }'+
'.header.container table td.label { padding: 15px; padding-left:0px;}'+
''+
''+
'/* ------------------------------------- '+
'   BODY '+
'------------------------------------- */'+
'table.body-wrap { width: 100%;}'+
''+
''+
'/* ------------------------------------- '+
'   FOOTER '+
'------------------------------------- */'+
'table.footer-wrap { width: 100%; clear:both!important;'+
'}'+
'.footer-wrap .container td.content  p { border-top: 1px solid rgb(215,215,215); padding-top:15px;}'+
'.footer-wrap .container td.content p {'+
' font-size:10px;'+
' font-weight: bold;'+
' '+
'}'+
''+
''+
'/* ------------------------------------- '+
'   TYPOGRAPHY '+
'------------------------------------- */'+
'h1,h2,h3,h4,h5,h6 {'+
'font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif; line-height: 1.1; margin-bottom:15px; color:#000;'+
'}'+
'h1 small, h2 small, h3 small, h4 small, h5 small, h6 small { font-size: 60%; color: #6f6f6f; line-height: 0; text-transform: none; }'+
''+
'h1 { font-weight:200; font-size: 44px;}'+
'h2 { font-weight:200; font-size: 37px;}'+
'h3 { font-weight:500; font-size: 27px;}'+
'h4 { font-weight:500; font-size: 23px;}'+
'h5 { font-weight:900; font-size: 17px;}'+
'h6 { font-weight:900; font-size: 14px; text-transform: uppercase; color:#444;}'+
''+
'.collapse { margin:0!important;}'+
''+
'p, ul { '+
' margin-bottom: 10px; '+
' font-weight: normal; '+
' font-size:14px; '+
' line-height:1.6;'+
'}'+
'p.lead { font-size:17px; }'+
'p.last { margin-bottom:0px;}'+
''+
'ul li {'+
' margin-left:5px;'+
' list-style-position: inside;'+
'}'+
''+
'/* ------------------------------------- '+
'   SIDEBAR '+
'------------------------------------- */'+
'ul.sidebar {'+
' background:#ebebeb;'+
' display:block;'+
' list-style-type: none;'+
'}'+
'ul.sidebar li { display: block; margin:0;}'+
'ul.sidebar li a {'+
' text-decoration:none;'+
' color: #666;'+
' padding:10px 16px;'+
'/*   font-weight:bold; */'+
' margin-right:10px;'+
'/*   text-align:center; */'+
' cursor:pointer;'+
' border-bottom: 1px solid #777777;'+
' border-top: 1px solid #FFFFFF;'+
' display:block;'+
' margin:0;'+
'}'+
'ul.sidebar li a.last { border-bottom-width:0px;}'+
'ul.sidebar li a h1,ul.sidebar li a h2,ul.sidebar li a h3,ul.sidebar li a h4,ul.sidebar li a h5,ul.sidebar li a h6,ul.sidebar li a p { margin-bottom:0!important;}'+
''+
''+
''+
'/* --------------------------------------------------- '+
'   RESPONSIVENESS'+
'   Nuke it from orbit. Its the only way to be sure. '+
'------------------------------------------------------ */'+
''+
'/* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */'+
'.container {'+
' display:block!important;'+
' max-width:600px!important;'+
' margin:0 auto!important; /* makes it centered */'+
' clear:both!important;'+
'}'+
''+
'/* This should also be a block element, so that it will fill 100% of the .container */'+
'.content {'+
' padding:15px;'+
' max-width:600px;'+
' margin:0 auto;'+
' display:block; '+
'}'+
''+
'/* Lets make sure tables in the content area are 100% wide */'+
'.content table { width: 100%; }'+
''+
''+
'/* Odds and ends */'+
'.column {'+
' width: 300px;'+
' float:left;'+
'}'+
'.column tr td { padding: 15px; }'+
'.column-wrap { '+
' padding:0!important; '+
' margin:0 auto; '+
' max-width:600px!important;'+
'}'+
'.column table { width:100%;}'+
'.social .column {'+
' width: 280px;'+
' min-width: 279px;'+
' float:left;'+
'}'+
''+
'/* Be sure to place a .clear element after each set of columns, just to be safe */'+
'.clear { display: block; clear: both; }'+
''+
''+
'/* ------------------------------------------- '+
'   PHONE'+
'   For clients that support media queries.'+
'   Nothing fancy. '+
'-------------------------------------------- */'+
'@media only screen and (max-width: 600px) {'+
' '+
' a[class="btn"] { display:block!important; margin-bottom:10px!important; background-image:none!important; margin-right:0!important;}'+
''+
' div[class="column"] { width: auto!important; float:none!important;}'+
' '+
' table.social div[class="column"] {'+
'   width:auto!important;'+
' }'+
''+
'}'+
'</style>'+
''+
'</head>'+
' '+
'<body bgcolor="#FFFFFF" style="margin: 0;padding: 0;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;-webkit-font-smoothing: antialiased;-webkit-text-size-adjust: none;height: 100%;width: 100%!important;">'+
''+
''+
''+
'<!-- BODY -->'+
'<table class="body-wrap" style="margin: 0;padding: 0;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;width: 100%;">'+
' <tr style="margin: 0;padding: 0;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;">'+
'   <td style="margin: 0;padding: 0;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;"></td>'+
'   <td class="container" bgcolor="#FFFFFF" style="margin: 0 auto!important;padding: 0;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;display: block!important;max-width: 600px!important;clear: both!important;">'+
''+
'     <div class="content" style="margin: 0 auto;padding: 15px;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;max-width: 600px;display: block;">'+
'     <table style="margin: 0;padding: 0;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;width: 100%;">'+
'       <tr style="margin: 0;padding: 0;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;">'+
'         <td style="margin: 0;padding: 0;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;">'+
'           '+
'           <h3 style="margin: 0;padding: 0;font-family: &quot;HelveticaNeue-Light&quot;, &quot;Helvetica Neue Light&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, &quot;Lucida Grande&quot;, sans-serif;line-height: 1.1;margin-bottom: 15px;color: #000;font-weight: 500;font-size: 27px;">Hello, '+invitee.split("@")[0]+'</h3>'+
'           '+
'           <!-- A Real Hero (and a real human being) -->'+
'           <p style="margin: 0;padding: 0;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;margin-bottom: 10px;font-weight: normal;font-size: 14px;line-height: 1.6;"><img style="height=50%" class="eventpicture" src="http://previews.123rf.com/images/goliaf888/goliaf8881211/goliaf888121100021/16139729-Young-people-having-fun-at-the-party-summer-season-grunge-vector-illustration-with-banner-for-your-s-Stock-Vector.jpg" style="margin: 0;padding: 0;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;max-width: 100%;"></p><!-- /hero -->'+
'           '+
'       '+
'           <h3 style="margin: 0;padding: 0;font-family: &quot;HelveticaNeue-Light&quot;, &quot;Helvetica Neue Light&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, &quot;Lucida Grande&quot;, sans-serif;line-height: 1.1;margin-bottom: 15px;color: #000;font-weight: 500;font-size: 27px;">'+title+'</h3>'+
'           <p style="margin: 0;padding: 0;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;margin-bottom: 10px;font-weight: normal;font-size: 14px;line-height: 1.6;">'+description +'</p>'+
'           <a href="#" class="button" style="margin: 0;padding: 0;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;color: rgb(255,255,255);display: inline-block;height: 50px;line-height: 50px;padding-right: 30px;padding-left: 70px;position: relative;background-color: rgb(41,127,184);text-decoration: none;text-transform: uppercase;letter-spacing: 1px;margin-bottom: 15px;border-radius: 5px;-moz-border-radius: 5px;-webkit-border-radius: 5px;text-shadow: 0px 1px 0px rgba(0,0,0,0.5);-ms-filter: &quot;progid:DXImageTransform.Microsoft.dropshadow(OffX=0,OffY=2,Color=#33000000,Positive=true)&quot;;zoom: 1;filter: progid:DXImageTransform.Microsoft.dropshadow(OffX=0,OffY=2,Color=#33000000,Positive=true);-moz-box-shadow: 0px 2px 2px rgba(0,0,0,0.2);-webkit-box-shadow: 0px 2px 2px rgba(0,0,0,0.2);box-shadow: 0px 2px 2px rgba(0,0,0,0.2);"><span style="margin: 0;padding: 0;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;position: absolute;left: 0;width: 50px;background-color: rgba(0,0,0,0.5);-webkit-border-top-left-radius: 5px;-webkit-border-bottom-left-radius: 5px;-moz-border-radius-topleft: 5px;-moz-border-radius-bottomleft: 5px;border-top-left-radius: 5px;border-bottom-left-radius: 5px;border-right: 1px solid  rgba(0,0,0,0.15);">✓</span>Super down</a>'+
'           <a href="#" class="button purple" style="margin: 0;padding: 0;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;color: rgb(255,255,255);display: inline-block;height: 50px;line-height: 50px;padding-right: 30px;padding-left: 70px;position: relative;background-color: rgb(41,127,184);text-decoration: none;text-transform: uppercase;letter-spacing: 1px;margin-bottom: 15px;border-radius: 5px;-moz-border-radius: 5px;-webkit-border-radius: 5px;text-shadow: 0px 1px 0px rgba(0,0,0,0.5);-ms-filter: &quot;progid:DXImageTransform.Microsoft.dropshadow(OffX=0,OffY=2,Color=#33000000,Positive=true)&quot;;zoom: 1;filter: progid:DXImageTransform.Microsoft.dropshadow(OffX=0,OffY=2,Color=#33000000,Positive=true);-moz-box-shadow: 0px 2px 2px rgba(0,0,0,0.2);-webkit-box-shadow: 0px 2px 2px rgba(0,0,0,0.2);box-shadow: 0px 2px 2px rgba(0,0,0,0.2);background: #8e44ad;"><span style="margin: 0;padding: 0;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;position: absolute;left: 0;width: 50px;background-color: rgba(0,0,0,0.5);-webkit-border-top-left-radius: 5px;-webkit-border-bottom-left-radius: 5px;-moz-border-radius-topleft: 5px;-moz-border-radius-bottomleft: 5px;border-top-left-radius: 5px;border-bottom-left-radius: 5px;border-right: 1px solid  rgba(0,0,0,0.15);">✓</span>Super not down</a>'+
'                       '+
'           <br style="margin: 0;padding: 0;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;">'+
'           <br style="margin: 0;padding: 0;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;">             '+
'                       '+
'           <!-- social & contact -->'+
'           <table class="social" width="100%" style="margin: 0;padding: 0;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;background-color: #ebebeb;width: 100%;">'+
'             <tr style="margin: 0;padding: 0;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;">'+
'               <td style="margin: 0;padding: 0;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;">'+
'                 '+
'                 <!--- column 1 -->'+
'                 <table align="left" class="column" style="margin: 0;padding: 0;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;width: 280px;float: left;min-width: 279px;">'+
'                   <tr style="margin: 0;padding: 0;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;">'+
'                     <td style="margin: 0;padding: 15px;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;">        '+
'                       '+
'                       <h5 class="" style="margin: 0;padding: 0;font-family: &quot;HelveticaNeue-Light&quot;, &quot;Helvetica Neue Light&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, &quot;Lucida Grande&quot;, sans-serif;line-height: 1.1;margin-bottom: 15px;color: #000;font-weight: 900;font-size: 17px;">Connect with Us:</h5>'+
'                       <p class="" style="margin: 0;padding: 0;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;margin-bottom: 10px;font-weight: normal;font-size: 14px;line-height: 1.6;"><a href="#" class="soc-btn fb" style="margin: 0;padding: 3px 7px;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;color: #FFF;font-size: 12px;margin-bottom: 10px;text-decoration: none;font-weight: bold;display: block;text-align: center;background-color: #3B5998!important;">Facebook</a> <a href="#" class="soc-btn tw" style="margin: 0;padding: 3px 7px;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;color: #FFF;font-size: 12px;margin-bottom: 10px;text-decoration: none;font-weight: bold;display: block;text-align: center;background-color: #1daced!important;">Twitter</a> <a href="#" class="soc-btn gp" style="margin: 0;padding: 3px 7px;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;color: #FFF;font-size: 12px;margin-bottom: 10px;text-decoration: none;font-weight: bold;display: block;text-align: center;background-color: #DB4A39!important;">Google+</a></p>'+
'           '+
'                       '+
'                     </td>'+
'                   </tr>'+
'                 </table><!-- /column 1 -->  '+
'                 '+
'                 <!--- column 2 -->'+
'                 <table align="left" class="column" style="margin: 0;padding: 0;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;width: 280px;float: left;min-width: 279px;">'+
'                   <tr style="margin: 0;padding: 0;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;">'+
'                     <td style="margin: 0;padding: 15px;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;">        '+
'                                     '+
'                       <h5 class="" style="margin: 0;padding: 0;font-family: &quot;HelveticaNeue-Light&quot;, &quot;Helvetica Neue Light&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, &quot;Lucida Grande&quot;, sans-serif;line-height: 1.1;margin-bottom: 15px;color: #000;font-weight: 900;font-size: 17px;">Contact Info:</h5>                       '+
'                       <p style="margin: 0;padding: 0;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;margin-bottom: 10px;font-weight: normal;font-size: 14px;line-height: 1.6;">Phone: <strong style="margin: 0;padding: 0;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;">555.555.5555</strong><br style="margin: 0;padding: 0;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;">'+
'                Email: <strong style="margin: 0;padding: 0;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;"><a href="emailto:shafique.rashid@gmail.com" style="margin: 0;padding: 0;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;color: #2BA6CB;">shafique.rashid@gmail.com</a></strong></p>'+
'                '+
'                     </td>'+
'                   </tr>'+
'                 </table><!-- /column 2 -->'+
'                 '+
'                 <span class="clear" style="margin: 0;padding: 0;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;display: block;clear: both;"></span> '+
'                 '+
'               </td>'+
'             </tr>'+
'           </table><!-- /social & contact -->'+
'         '+
'         '+
'         </td>'+
'       </tr>'+
'     </table>'+
'     </div>'+
'                 '+
'   </td>'+
'   <td style="margin: 0;padding: 0;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;"></td>'+
' </tr>'+
'</table><!-- /BODY -->'+
''+
'<!-- FOOTER -->'+
'<table class="footer-wrap" style="margin: 0;padding: 0;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;width: 100%;clear: both!important;">'+
' <tr style="margin: 0;padding: 0;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;">'+
'   <td style="margin: 0;padding: 0;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;"></td>'+
'   <td class="container" style="margin: 0 auto!important;padding: 0;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;display: block!important;max-width: 600px!important;clear: both!important;">'+
'     '+
'       <!-- content -->'+
'       <div class="content" style="margin: 0 auto;padding: 15px;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;max-width: 600px;display: block;">'+
'       <table style="margin: 0;padding: 0;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;width: 100%;">'+
'       <tr style="margin: 0;padding: 0;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;">'+
'         <td align="center" style="margin: 0;padding: 0;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;">'+
'           <p style="margin: 0;padding: 0;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;margin-bottom: 10px;font-weight: normal;font-size: 14px;line-height: 1.6;">'+
'             <a href="#" style="margin: 0;padding: 0;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;color: #2BA6CB;">Terms</a> |'+
'             <a href="#" style="margin: 0;padding: 0;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;color: #2BA6CB;">Privacy</a> |'+
'             <a href="#" style="margin: 0;padding: 0;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;color: #2BA6CB;"><unsubscribe style="margin: 0;padding: 0;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;">Unsubscribe</unsubscribe></a>'+
'           </p>'+
'         </td>'+
'       </tr>'+
'     </table>'+
'       </div><!-- /content -->'+
'       '+
'   </td>'+
'   <td style="margin: 0;padding: 0;font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;"></td>'+
' </tr>'+
'</table><!-- /FOOTER -->'+
''+
'</body>'+
'</html>';

return txt;
}

module.exports.template = htmlGenerator;
