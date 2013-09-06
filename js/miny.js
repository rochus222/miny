var hra_je_pripravena=0;
var x;
var y;
var i;
var j;
var pocet_odkrytych=0;
var pocet_flagov=0;
var clicker=0;
var pole = [];
var zvuk = 1;
for(i=0; i<10; i++) {
	pole[i] = new Array(10);
}
		
function posun_vpravo($prva,$druha) {
 document.getElementById($prva).setAttribute("style","z-index:-5; margin-left:-100%;");
 document.getElementById($druha).setAttribute("style","margin-left:0px; z-index:5;");
 if ($prva == 'hra' || zvuk == 0)document.getElementById('hudba_pozadie').muted = true;
 }
 
 function posun_vlavo($prva,$druha) {
  document.getElementById($druha).setAttribute("style","margin-left:0px; z-index:5;");
 document.getElementById($prva).setAttribute("style","z-index:-5; margin-left:100%;");
 if ($druha == 'hra' && zvuk == 1)document.getElementById('hudba_pozadie').muted = false;
 }
 
 function zapni_loading()
{
document.getElementById('loading').setAttribute("style","margin-top:0px; opacity:0.8;");
}

function close_loading()
{
document.getElementById('loading').setAttribute("style","opacity:0;");
setTimeout(function () {document.getElementById('loading').setAttribute("style","margin-top:-1000000px;");},500);
}
 
 function zacni_hru($prva,$druha)
 {
	if (hra_je_pripravena==0)
	{
		zapni_loading();
		vytvor_nove_pole();
		close_loading();
	}
	posun_vpravo($prva,$druha);
 }
 
  function vypis() {
 document.getElementById('cont').innerHTML= 'foo';
 }
function nova_hra($prva,$druha)
 {
	zapni_loading();
	clicker = 0;
	document.getElementById('prepinac_picker').setAttribute("style","background:#333");
	document.getElementById('prepinac_flag').setAttribute("style","background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#666), to(#333));");
	document.getElementById('hudba_pozadie').innerHTML='<source src=\"music/ticho.mp3\" type=\"audio/mpeg\" />';
	hra_je_pripravena=0;
	pocet_odkrytych=0;
	pocet_flagov=0;
	vycisti_pole();
	vytvor_nove_pole();
	zakry_pole();
	posun_vlavo($prva,$druha);
	close_loading();
}
function zakry_pole()
{
	for(i=1; i<11; i++) {
		for (j=1;j<11;j++){
			var $element = i + 'x' + j + 'cover';
			document.getElementById($element).setAttribute("style","opacity:1;");
			var policko = i + 'x' + j
			document.getElementById(policko).setAttribute("style","display:none;");
			document.getElementById($element).innerHTML='';
		}
	}
}
function odkry_pole()
{
	for(i=1; i<11; i++) {
		for (j=1;j<11;j++){
			var $element = i + 'x' + j + 'cover';
			document.getElementById($element).setAttribute("style","opacity:0;");
			var policko = i + 'x' + j;
			if(document.getElementById(policko).innerHTML=='X')document.getElementById(policko).setAttribute("style","display:block; background:#333; color:white;");
			document.getElementById($element).innerHTML='';
		}
	}
}
function vycisti_pole()
{
	for(i=1; i<11; i++) {
		for (j=1;j<11;j++){
			pole[i-1][j-1] = "";
			document.getElementById(i + 'x' + j).innerHTML= '';
		}
	}
}
function vytvor_nove_pole()
{
	i=0;
	while (i<20)
	{
		x=Math.floor((Math.random()*10)+1);
		y=Math.floor((Math.random()*10)+1);
		if (pole[x-1][y-1]!='M')
		{	
			pole[x-1][y-1]='M';
			 document.getElementById(x + 'x' + y).innerHTML= 'X';
			 i++;
		}
	}
	for(i=1; i<11; i++) {
		for (j=1;j<11;j++){
			if (pole[i-1][j-1]!='M'){
				var poc = 0;
				for (var k=0;k<3;k++)
				{
					for (var l=0;l<3;l++)
					{
						var xova = (i-2)+k;
						var yova = (j-2)+l;
						//document.getElementById(i + 'x' + j).innerHTML= xova + '' + yova;
						if (xova>=0&&yova>=0&&xova<=9&&yova<=9)
						{
							if(pole[xova][yova]=='M')poc++;
							//document.getElementById(i + 'x' + j).innerHTML= xova + '' + yova;
						}
					}
				}
				if (poc!=0)	
				{	
					pole[x-1][y-1]=poc;
					
					document.getElementById(i + 'x' + j).innerHTML= '' + poc + '';
				}
				else 
				{
					pole[x-1][y-1]=0;
					document.getElementById(i + 'x' + j).innerHTML= '-';
				}
			}
		}
	}
	hra_je_pripravena=1;
}
function toggle_bum()
{
	odkry_pole();
	if (zvuk == 1)document.getElementById('hudba_bum').muted = false;
	else document.getElementById('hudba_bum').muted = true;
	document.getElementById('hudba_pozadie').innerHTML='<source src=\"music/ticho.mp3\" type=\"audio/mpeg\" />';
	document.getElementById('hudba_bum').innerHTML='<source src=\"music/bum.mp3\" type=\"audio/mpeg\" />';
	document.getElementById('bum').setAttribute("style","margin-top:0px; opacity:0.8;");
}
function plant_bomb()
{
	zakry_pole();
	document.getElementById('hudba_bum').muted = true;
	document.getElementById('hudba_pozadie').innerHTML='<source src=\"music/ticho.mp3\" type=\"audio/mpeg\" />';
	document.getElementById('hudba_bum').innerHTML='';
	document.getElementById('bum').setAttribute("style","opacity:0;");
	setTimeout(function () {document.getElementById('bum').setAttribute("style","margin-top:-1000000px;");},500);
	setTimeout(function () {nova_hra('bum','hra');},500);
}
function toggle_win()
{
	odkry_pole();
	if (zvuk == 1)document.getElementById('hudba_defused').muted = false;
	else document.getElementById('hudba_defused').muted = true;
	document.getElementById('hudba_pozadie').innerHTML='<source src=\"music/ticho.mp3\" type=\"audio/mpeg\" />';
	document.getElementById('hudba_defused').innerHTML='<source src=\"music/defused.mp3\" type=\"audio/mpeg\" />';
	document.getElementById('win').setAttribute("style","margin-top:0px; opacity:0.8;");
}
function start_bomb()
{
	zakry_pole();
	document.getElementById('hudba_bum').muted = true;
	document.getElementById('hudba_pozadie').innerHTML='<source src=\"music/ticho.mp3\" type=\"audio/mpeg\" />';
	document.getElementById('hudba_bum').innerHTML='';
	document.getElementById('win').setAttribute("style","opacity:0;");
	setTimeout(function () {document.getElementById('win').setAttribute("style","margin-top:-1000000px;");},500);
	setTimeout(function () {nova_hra('win','hra');},500);
}
function odokry_policko(x,y)
{
	var $element = x + 'x' + y + 'cover';
	if (document.getElementById($element).innerHTML=='' && pole[x-1][y-1]!='O')
	{
		pocet_odkrytych++;
		document.getElementById($element).setAttribute("style","opacity:0;");
		var policko = x + 'x' + y;
		if(document.getElementById(policko).innerHTML=='-')document.getElementById(policko).setAttribute("style","display:block; background:#333; color:#333;");
		else if(document.getElementById(policko).innerHTML=='1')document.getElementById(policko).setAttribute("style","display:block; background:#333; color:white;");
		else if(document.getElementById(policko).innerHTML=='2')document.getElementById(policko).setAttribute("style","display:block; background:#333; color:green;");
		else if(document.getElementById(policko).innerHTML=='3')document.getElementById(policko).setAttribute("style","display:block; background:#333; color:red;");
		else if(document.getElementById(policko).innerHTML=='4')document.getElementById(policko).setAttribute("style","display:block; background:#333; color:blue;");
		else if(document.getElementById(policko).innerHTML=='5')document.getElementById(policko).setAttribute("style","display:block; background:#333; color:yellow;");
		else if(document.getElementById(policko).innerHTML=='6')document.getElementById(policko).setAttribute("style","display:block; background:#333; color:orange;");
		else if(document.getElementById(policko).innerHTML=='7')document.getElementById(policko).setAttribute("style","display:block; background:#333; color:red;");
		else if(document.getElementById(policko).innerHTML=='8')document.getElementById(policko).setAttribute("style","display:block; background:#333; color:black;");
		else if(document.getElementById(policko).innerHTML=='X')document.getElementById(policko).setAttribute("style","display:block; background:#333; color:white;");
		if (document.getElementById(policko).innerHTML=='-')document.getElementById('hudba_pozadie').innerHTML='<source src=\"music/0.mp3\" type=\"audio/mpeg\" />';
		if (document.getElementById(policko).innerHTML=='1'||document.getElementById(policko).innerHTML=='2')document.getElementById('hudba_pozadie').innerHTML='<source src=\"music/1.mp3\" type=\"audio/mpeg\" />';
		if (document.getElementById(policko).innerHTML=='3'||document.getElementById(policko).innerHTML=='4')document.getElementById('hudba_pozadie').innerHTML='<source src=\"music/2.mp3\" type=\"audio/mpeg\" />';
		if (document.getElementById(policko).innerHTML=='5'||document.getElementById(policko).innerHTML=='6'||document.getElementById(policko).innerHTML=='7'||document.getElementById(policko).innerHTML=='8')document.getElementById('hudba_pozadie').innerHTML='<source src=\"music/3.mp3\" type=\"audio/mpeg\" />';
		if (pole[x-1][y-1]=='M') toggle_bum();
		pole[x-1][y-1]='O';
	}
}
function odokry(x,y)
{
	var $element = x + 'x' + y + 'cover';
	if (clicker==0)
	{
		if (document.getElementById($element).innerHTML=='')
		{
			if (pole[x-1][y-1]!='O'||pole[x-1][y-1]=='M')
			{
				var policko = x + 'x' + y;
				if (document.getElementById(policko).innerHTML=='-')
				{
					if (x>1)
					{
						
						if (y>1)odokry_policko(x-1,y-1);
						odokry_policko(x-1,y);
						if (y<10)odokry_policko(x-1,y+1);
					}
					if (y>1)odokry_policko(x,y-1);
					odokry_policko(x,y);
					if (y<10)odokry_policko(x,y+1);
					if (x<10)
					{
						if (y>1)odokry_policko(x+1,y-1);
						odokry_policko(x+1,y);
						if (y<10)odokry_policko(x+1,y+1);
					}
				}
				else
				{
					odokry_policko(x,y);
				}
				/*if (document.getElementById(policko).innerHTML=='-')
				{
					var pomocnex=x;
					var pomocney=y;
					while(pole[pomocnex-1][pomocney-1]==0)
					{
						while(pole[pomocnex-1][pomocney-1]==0)
						{
							pocet_odkrytych++;
							document.getElementById($element).setAttribute("style","opacity:0;");
							var policko = x + 'x' + y
							document.getElementById(policko).setAttribute("style","display:block; background:#333");
							pole[pomocnex-1][pomocney-1]=='O';
							pomocney--;
						}
						while(pole[pomocnex-2][pomocney-1]==0)
						{
							pocet_odkrytych++;
							document.getElementById($element).setAttribute("style","opacity:0;");
							var policko = x + 'x' + y
							document.getElementById(policko).setAttribute("style","display:block; background:#333");
							pole[pomocnex-1][pomocney-1]=='O';
							pomocney++;
						}
						pomocnex--;
					}
					odokry(x-1, y);
					odokry(x, y-1);
					odokry(x, y+1);
					odokry(x+1, y);
					if (x>1&&pole[x-2][y-1]==0)
					{
						odokry(x-1, y);
					}
					if (x<10&&pole[x][y-1]==0)
					{
						odokry(x+1, y);
					}
					if (y>1&&pole[x-1][y-2]==0)
					{
						odokry(x, y-1);
					}
					if (y<10&&pole[x-1][y]==0)
					{
						odokry(x, y+1);
					}
				}*/
			}
		}
	}
	else if (clicker==1 && pocet_flagov<19)
	{
		if (pole[x-1][y-1]!='O')
		{
			if (document.getElementById($element).innerHTML!='')
			{
				document.getElementById($element).innerHTML='';
				pocet_flagov--;
			}
			else 
			{
				document.getElementById($element).innerHTML="<img src=\"img/flag.png\" />";
				pocet_flagov++;
			}
		}
		
	}
	if (pocet_odkrytych==81 && pocet_flagov==19)toggle_win();
	return 1;
}
function myska(premenna)
{
	if (premenna==0)
	{
		clicker = 0;
		document.getElementById('prepinac_picker').setAttribute("style","background:#333");
		document.getElementById('prepinac_flag').setAttribute("style","background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#666), to(#333));");
	}
	if (premenna==1)
	{
		clicker = 1;
		document.getElementById('prepinac_flag').setAttribute("style","background:#333");
		document.getElementById('prepinac_picker').setAttribute("style","background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#666), to(#333));");
	}
}
function mute()
{
	if (zvuk == 1)
	{
		zvuk = 0;
		document.getElementById('toggle_music').innerHTML='N';
	}
	else if (zvuk == 0)
	{
		zvuk = 1;
		document.getElementById('toggle_music').innerHTML='Y';
	}
}
