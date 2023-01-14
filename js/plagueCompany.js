//这里是可爱的后端，应该算是后端吧

//变量定义
//国家属性225个，从数据库读进来,id就是索引。
//可爱的思敏已经把国家变量读到她的全局变量里了



//病毒属性,初始值都是0
antihot = 1;
antiCold = 1;
antiMedi = 1;
serverity = 1;
lethality = 1;

//世界变量
mediPercent=0;
allMediSpeed=0;
mediStart=false;
allPopu=7470505059;//要看数据库里是多少
allInfec=0;
MaxInfe=0
allDead=0;
allHealth=7470505059;
allDownfall=0;

//游戏变量
var game=0;
var DNApoint=1;
//时间显示
accumulate=0;	//累积时间
year=2000;		//初始时间
month=1;
day=1;

var achievement=[0,0,0,0,0,0,0];


//前端：选取初始国家，将该国家的infected[i]++，然后让game=1


var dayMax;
//预定义main需要用的函数
function timePlus(){//时间递增函数,可以用他自带的对象Date，但这个肯定不会出错

	accumulate++;
	day++;
	if (month == 2) {
		if (year % 4 == 0 && year / 100 != 0 || year % 400 == 0)
		{dayMax = 29;}
		else
		{dayMax = 28;}
	}
	else if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12)
	{dayMax = 31;}
	else
	{dayMax = 30;}
	if (day > dayMax) {
		day = day - dayMax;
		month++;
	}
	if (month > 12) {
		month = month - 12;
		year++;
	}
	//var nowTime = myYear+'年'+fillZero(myMonth)+'月'+fillZero(myToday)+'日';
	//nowTime就是要显示的东西
}

function fillZero(str){//补0函数
	var realNum;
	if(str<10){
		realNum = '0'+str;
	}else{
		realNum = str;
	}
	return realNum;
}



//贸易传染
function tradeInfect(i){
	for (i = 0; i < ename.length; i++){
		//没死光，没全感染
		if (infected[i]!=population[i]-dead[i]){
			infected[i]=infected[i]+5;//每次向外输出100个病例，该不会有国家人少得只有几千吧
			if(infected[i]>population[i]-dead[i])//全部被感染的话不能变多
				infected[i]=population[i]-dead[i];
		}
	}
}

//邻域传染
function neighborInfect(i){
	for (j = 0; j < ename.length; j++){
		if(neighbor[i][j]===1){//邻接
			//没死光，没全感染
			if (infected[j]!==population[j]-dead[j]){
				infected[j]=infected[j]+100;//每次向外输出100个病例，该不会有国家人少得只有几千吧
				if (infected[j]>population[j]-dead[j]){//全部被感染的话不能变多
					infected[j]=population[j]-dead[j];}
			}
		}
	}
}

//内部传染
function innerInfect(i){
	//能调用这个函数就说明一定有感染,没死光,没全感染。
	var newInfect=Math.round(infeSpeed[i]*(population[i]-infected[i]-dead[i]));
	if(newInfect<1|| window.isNaN(newInfect)){
		newInfect=1;
	}
	if(i==157){console.log("eaya"+newInfect,dead[157],infected[157]);}
	infected[i]=infected[i]+newInfect;
	if (infected[i]>population[i]-dead[i])
		infected[i]=population[i]-dead[i];
	if(i==157){console.log("e688"+population[157],dead[157],infected[157]);}
}

//死亡
function goDie(i){
	var newDie=Math.round(dieSpeed[i]*infected[i]*Math.random());
	if(newDie<1&&newDie<infected[1]&&downfall[i]==1||newDie<1&&(lethality+serverity>80))
		newDie=1;
	dead[i]=dead[i]+newDie;
	infected[i]=infected[i]-newDie;
	if (dead[i]>population[i]){
		dead[i]=population[i]
	}
	if (infected[i]<0)
		infected[i]=0;
}/*
//死亡
function goDie(i){
	var newDie=Math.round(dieSpeed[i]*infected[i]*(Math.random()+0.1)*0.1);
	if(newDie<1&&(lethality+serverity>80))
		newDie=1;
	dead[i]=dead[i]+newDie;
	infected[i]=infected[i]-newDie;
	if (dead[i]>population[i])
		dead[i]=population[i]
	if (infected[i]<0)
		infected[i]=0;
}
*/
//更新mediSpeed[i]
function refreshMediSpeed(i){
	//confirm("解药！"+mediSpeed[i]);
	mediSpeed[i]=(lethality*wealthy[i]*4/serverity/antiMedi+infected[i]*0.0000000002)/1000;
}
/*//更新infeSpeed[i]
function refreshInfeSpeed(i){
	if (temperature[i]<=0)
		infeSpeed[i]=(Math.log(infected[i]+1)/population[i]-temperature[i]/10*antiCold/10)/(wealthy[i]+1)*Math.log(density[i]+2);
	else if (temperature[i]>7)
		infeSpeed[i]=(Math.log(infected[i]+1)/population[i]+temperature[i]/10*antihot/10)/(wealthy[i]+1)*Math.log(density[i]+2);
	else
		infeSpeed[i]=(Math.log(infected[i]+1)/population[i]+(7-temperature[i])/10*antiCold/10)/(wealthy[i]+1)*Math.log(density[i]+2);//垮台以后经济=0,但还得感染
	if(infeSpeed[i]<0.0001)
		infeSpeed[i]=0.0001;
}*/
//更新infeSpeed[i]
function refreshInfeSpeed(i){
	if (temperature[i]<=0)
		infeSpeed[i]=(infected[i]/population[i]-temperature[i]/10*antiCold/10)/(wealthy[i]+1)*Math.log(density[i]+2)*0.001;
	else if (temperature[i]>7)
		infeSpeed[i]=(infected[i]/population[i]+temperature[i]/10*antihot/10)/(wealthy[i]+1)*Math.log(density[i]+2)*0.001;
	else
		infeSpeed[i]=(infected[i]/population[i]+(7-temperature[i])/10*antiCold/10)/(wealthy[i]+1)*Math.log(density[i]+2)*0.001;//垮台以后经济=0,但还得感染
	if(infeSpeed[i]<0.0001)
		infeSpeed[i]=0.0001;
	if(mediPercent==100){infeSpeed=infeSpeed*0.1}
}

//更新dieSpeed[i]
function refreshDieSpeed(i){
	dieSpeed[i]=(lethality+serverity*0.1-5)/wealthy[i]*0.005;
	if(dieSpeed[i]<0)
		dieSpeed[i]=0;
}


//更新世界数据
function refreshWorld(){
	//confirm("aaaaaaaaa");
	let allinfec=0;
	let alldead=0;
	let allmediSpeed=0;
	for (i = 0; i < ename.length; i++){
		allinfec=allinfec+infected[i];
		alldead=alldead+dead[i];
		allmediSpeed=allmediSpeed+mediSpeed[i];
	}
	if(allmediSpeed<0.001)
	{allmediSpeed=0.001;}
	if(allmediSpeed>1)
	{allmediSpeed=1;}
	allInfec=allinfec;
	allDead=alldead;
	allMediSpeed=allmediSpeed;
	allHealth=allPopu-allinfec-alldead;//或者剩下的就是健康人口,如果饼图可以有这个功能就可以不算。
}


//超级无敌循环函数main

function pmain(){//main每时间单元循环步骤
	//confirm("a");
	//while(game==1){
		timePlus();
		//DNApoint=DNApoint+0.5;
		//confirm("aaaaaaaaa");
		for(i = 0; i < ename.length; i++){
			//if(i=ename.length-1){confirm(ename.length-1)}
			//感染了并且没死光
			if(infected[i]>0){
				//没垮台
				if (downfall[i] == 0){
					//confirm("垮台啦");
					//if(dead[i]<population[i])，不需要，没垮台肯定没死光
					refreshDieSpeed(i);							//更新死亡速率
					if(mediStart){

						refreshMediSpeed(i);					//更新解药速率
					}
					//没全感染，就感染，并且死亡
					if(infected[i]<population[i]-dead[i]){
						if(i==157){console.log("c"+population[157],dead[157],infected[157]);}
						refreshInfeSpeed(i);					//更新感染速率
						if(i==157){console.log("e"+population[157],dead[157],infected[157]);}
						innerInfect(i);							//内部感染
						if(i==157){console.log("b"+population[157],dead[157],infected[157]);}
					}
					goDie(i);
					if(i==157){console.log("d"+population[157],dead[157],infected[157]);}//死亡
					//向外传染
					if (infected[i]>=0.01*population[i]){
						//confirm("chuan");
						neighborInfect(i);						//邻域传染
						tradeInfect(tradeFriend1[i-1]);
						tradeInfect(tradeFriend2[i-1]);
						tradeInfect(tradeFriend3[i-1]);
						tradeInfect(tradeFriend4[i-1]);
					}
					//让它垮台!
					if(dead[i]>=0.7*population[i]&&downfall[i]===false){
						if(i==157){console.log("f"+population[157],dead[157],infected[157]);}
						confirm(ename[i]+"垮台啦！")
						downfall[i]=1;
						allDownfall++;
					}
				}
				//垮台了
				else{
					mediSpeed[i]=0;
					wealthy[i]=0;
					//还没死光
					if(dead[i]<population[i]){
						if(i==157){console.log("g"+population[157],dead[157],infected[157]);}
						refreshDieSpeed(i);						//更新死亡速率
						neighborInfect(i);						//邻域传染
						//还没全部感染
						if(infected[i]<population[i]-dead[i]){
							if(i==157){console.log("h"+population[157],dead[157],infected[157]);}
							refreshInfeSpeed(i);					//更新感染速率
							innerInfect(i);							//内部感染
						}
						goDie(i);									//死亡
					}
				}
			}
			//没死光，但没感染，可以给被感染的国家喊个加油。
			else if(dead[i]!==population[i]){
				if(mediStart===true&&downfall[i]===false){
					if(i==157){console.log("i"+population[157],dead[157],infected[157]);}
					refreshMediSpeed(i);					//好吧，全人类要团结一致一起开始研发解药。
				}
			}
			//死光了，所以也没有感染者了。因为都死了。
			else{
				if(i==157){console.log("j"+population[157],dead[157],infected[157]);}
				mediSpeed[i]=0;
			}
			//完成研发!
			if(mediPercent === 100){
				if(i==157){console.log("k"+population[157],dead[157],infected[157]);}
				if(population[i]-infected[i]-dead[i]>=20000)
					infected[i]=infected[i]-Math.round(20000/(antiMedi+1));
				if(infected[i]<0){infected[i]=0;}
			}


		}//for每个国家结束
	if(i==157){console.log("cccc"+population[157],dead[157],infected[157]);}

		//求和看全世界的参数
		//不能放在for每个国家里，看看能不能放在更新函数里
		//不行，要判断是否大于国家人数有点麻烦，而且每轮就要更新很多次，可能显示会有问题。这里只更新一次
		//这里饼图不能刷新啊啊啊啊，一刷新就又看着他变大一次。
		//如果饼图可以控制刷新频率就可以这样。如果不行的话就……很麻烦。每更新一个国家就要更新一次他

		//更新世界统计数据：allInfec、allDead、allMediSpeed、allHealth
		refreshWorld();

		//判断开始研发。这个最好能写进触发器。
		if(allInfec>=100000){
			mediStart=true;
		}

	if(mediStart===true)
		mediPercent=mediPercent+allMediSpeed;//显示的时候记得保留两位小数显示就行,但是不要动里面的数值
	if(mediPercent>100){
		mediPercent=100;
	}
	if(allInfec>MaxInfe)
	MaxInfe=allInfec
		//游戏状态判断
		if(allDead===allPopu)
		{game=2;//玩家胜利
			confirm("死完了")
				 }
		else if(allInfec===0&&allPopu-allDead!== 0) {
			game = 3;//人类胜利
			if(allPopu-allDead<=allPopu*0.01){game=4;}//人类最后的希望！
		}
	console.log(population[157],dead[157],infected[157]);
		//在这里放显示函数，或者get的函数，每一轮结束的时候刷新一次
//	}

}
