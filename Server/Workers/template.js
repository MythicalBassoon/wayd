
function htmlGenerator(title){



var txt = '<html><head><meta name="viewport" content="width=device-width">'+
'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">'+
'<title>Really Simple HTML Email Template</title>'+
'<style>'+

'* {'+
  'font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;'+
  'font-size: 100%;'+
  'line-height: 1.6em;'+
  'margin: 0;'+
  'padding: 0;'+
'}'+
'img {'+
  'max-width: 600px;'+
  'width: 100%;'+
'}'+
'body {'+
  '-webkit-font-smoothing: antialiased;'+
  'height: 100%;'+
  '-webkit-text-size-adjust: none;'+
  'width: 100% !important;'+
'}'+

'a {'+
  'color: #348eda;'+
'}'+
'.btn-primary {'+
  'Margin-bottom: 10px;'+
  'width: auto !important;'+
'}'+
'.btn-primary td {'+
  'background-color: #348eda; '+
  'border-radius: 25px;'+
  'font-family: "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif; '+
  'font-size: 14px; '+
  'text-align: center;'+
  'vertical-align: top;' +
'}'+
'.btn-primary td a {'+
  'background-color: #348eda;'+
'  border: solid 1px #348eda;'+
  'border-radius: 25px;'+
  'border-width: 10px 20px;'+
  'display: inline-block;'+
  'color: #ffffff;'+
  'cursor: pointer;'+
  'font-weight: bold;'+
'  line-height: 2;'+
  'text-decoration: none;'+
'}'+
'.last {'+
  'margin-bottom: 0;'+
'}'+
'.first {'+
  'margin-top: 0;'+
'}'+
'.padding {'+
  'padding: 10px 0;'+
'}'+

'table.body-wrap {'+
  'padding: 20px;'+
  'width: 100%;'+
'}'+
'table.body-wrap .container {'+
  'border: 1px solid #f0f0f0;'+
'}'+
+
'table.footer-wrap {'+
  'clear: both !important;'+
  'width: 100%;  '+
'}'+
'.footer-wrap .container p {'+
  'color: #666666;'+
  'font-size: 12px;'+
  
'}'+
'table.footer-wrap a {'+
  'color: #999999;'+
'}'+

'h1, '+
'h2, '+
'h3 {'+
  'color: #111111;'+
  'font-family: "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;'+
  'font-weight: 200;'+
  'line-height: 1.2em;'+
  'margin: 40px 0 10px;'+
'}'+
'h1 {'+
  'font-size: 36px;'+
'}'+
'h2 {'+
  'font-size: 28px;'+
'}'+
'h3 {'+
  'font-size: 22px;'+
'}'+
'p,' +
'ul,' +
'ol {'+
  'font-size: 14px;'+
'  font-weight: normal;'+
  'margin-bottom: 10px;'+
'}'+
'ul li, '+
'ol li {'+
  'margin-left: 5px;'+
  'list-style-position: inside;'+
'}'+
'.container {'+
  'clear: both !important;'+
  'display: block !important;'+
  'Margin: 0 auto !important;'+
  'max-width: 600px !important;'+
'}'+
+
'.body-wrap .container {'+
  'padding: 20px;'+
'}'+

'.content {'+
  'display: block;'+
  'margin: 0 auto;'+
  'max-width: 600px;'+
'}'+

'.content table {'+
  'width: 100%;'+
'}'+
'</style>'+
'</head>'+

'<body bgcolor="#f6f6f6">'+

'<!-- body -->'+
'<table class="body-wrap" bgcolor="#f6f6f6">'+
  '<tr>'+
    '<td></td>'+
    '<td class="container" bgcolor="#FFFFFF">'+

'      <!-- content -->'+
      '<div class="content">'+
      '<table>'+
        '<tr>'+
          '<td>'+
            '<p>Hi there,</p>'+
            '<p>Sometimes all you want is to send a simple HTML email with a basic design.</p>'+
            '<h1>'+ title +'</h1>'+
            '<p>This is a really simple email template. Its sole purpose is to get you to click the button below.</p>'+
            '<h2>How do I use it?</h2>'+
            '<p>All the information you need is on GitHub.</p>'+
            '<!-- button -->'+
            '<table class="btn-primary" cellpadding="0" cellspacing="0" border="0">'+
              '<tr>'+
                '<td>'+
                  '<a href="https://github.com/leemunroe/html-email-template">View the source and instructions on GitHub</a>'+
                '</td>'+
              '</tr>'+
            '</table>'+
          
            '<p>Feel free to use, copy, modify this email template as you wish.</p>'+
            '<p>Thanks, have a lovely day.</p>'+
            '<p><a href="http://twitter.com/leemunroe">Follow @leemunroe on Twitter</a></p>'+
          '</td>'+
        '</tr>'+
      '</table>'+
      '</div>'+
     
    '</td>'+
    '<td></td>'+
  '</tr>'+
'</table>'+

'<table class="footer-wrap">'+
  '<tr>'+
    '<td></td>'+
    '<td class="container">'+
      

      '<div class="content">'+
        '<table>'+
          '<tr>'+
            '<td align="center">'+
              '<p>Dont like these annoying emails? <a href="#"><unsubscribe>Unsubscribe</unsubscribe></a>.'+
              '</p>'+
            '</td>'+
          '</tr>'+
        '</table>'+
      '</div>'+
       
    '</td>'+
    '<td></td>'+
  '</tr>'+
'</table>'+


'</body>'+
'</html>';
txt.replace(/\n/g, "");
	return txt;
}
module.exports.template = htmlGenerator;
