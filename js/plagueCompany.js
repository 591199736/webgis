//这里是可爱的后端，应该算是后端吧
	//变量定义
	//国家属性225个，从数据库读进来,id就是索引。
	var name = new Array();
	var temperature = new Array();
	var wealthy = new Array();
	var density = new Array();

	population = new Array();
	infected = new Array();
	dead = [];
var infeSpeed = new Array();
var mediSpeed = new Array();
var dieSpeed = new Array();
var downfall = new Array();

	//邻域国家可能要用空间查询才行，看看前端的地图是ArcGIS的有无接口可以用

var tradeFriend = new Array();//贸易密切国。看看思敏有没有发挥她的聪明才智。没有的话，可以每个国家都只有一个贸易密切国，就是一个整型的数据，就是id，也就是索引。重点关注岛国就好。要复杂一点的话，看看能不能嵌套数组。

	//病毒属性,初始值都是0
var antihot = 0;
var antiCold = 0;
var antiMedi = 0;
var serverity = 0;
var lethality = 0;

	//世界变量
var mediPercent=0;
var allMediSpeed=0;
var mediStart=false;
	var allPopu=800000000;//要看数据库里是多少
var allInfec=0;
var allDead=0;
var allHealth=0;
var allDownfall=0;
var allHealth=0;

	//游戏变量
var point=0;
	var game=0;

	//时间显示
var accumulate=0;	//累积时间
var year=2000;		//初始时间
var month=1;
var day=1;




//前端：选取初始国家，将该国家的infected[i]++，然后让game=1
$.getJSON('data/Data.json', function (data1) {
	console.log("json文件数据", data1);
	for(i=0;i<205;i++){
		name[i]=data1.data[i].ename;
		infected[i]=data1.data[i].infected;
		population[i]=data1.data[i].population
		dead[i]=0;
		console.log("na"+i, name[i]);
	}
});


//预定义main需要用的函数
function timePlus(){//时间递增函数,可以用他自带的对象Date，但这个肯定不会出错
	var dayMax;
	accumulate++;
	day++;
	if (month == 2) {
		if (year % 4 == 0 && year / 100 != 0 || year % 400 == 0)
			dayMax = 29;
		else
			dayMax = 28;
	}
	else if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12)
		dayMax = 31;
	else
		dayMax = 30;
	if (day > dayMax) {
		day = day - dayMax;
		month++;
	}
	if (month > 12) {
		month = month - 12;
		year++;
	}
	var nowTime = myYear+'年'+fillZero(myMonth)+'月'+fillZero(myToday)+'日';
	//nowTime就是要显示的东西
};

function fillZero(str){//补0函数
    var realNum;
    if(str<10){
        realNum = '0'+str;
    }else{
        realNum = str;
    }
    return realNum;
}



//邻域传染
function neighborInfect(i){
	for (let i=0;i<10;i++){
		//没死光，没全感染
		if (infected[i]!=population[i]-dead[i]){
			infected[i]=infected[i]+100;//每次向外输出100个病例，该不会有国家人少得只有几千吧
			if (infected[i]>population[i]-dead[i])//全部被感染的话不能变多
				infected[i]=population[i]-dead[i];
		}
	}
}

//内部传染
function innerInfect(i){
	//能调用这个函数就说明一定有感染，没死光，没全感染。
	infected[i]=infected[i]+infeSpeed[i]*(population[i]-infected[i]);
	if (infected[i]>population[i]-dead[i])
		infected[i]=population[i]-dead[i];
}

//死亡
function goDie(i){
	if (dead[i]<population[i]){//没死光
		dead[i]=dead[i]+dieSpeed[i]*infected[i];
		infected[i]=infected[i]-dieSpeed[i]*infected[i];
	}
	if (dead[i]>population[i])
		dead[i]=population[i]
}

//更新mediSpeed[i]
function refreshMediSpeed(i){
	mediSpeed[i]=(lethality*wealthy[i]*4/serverity/antimedi+infected[i]*0.0000000002)/1000;
}
//更新infeSpeed[i]
function refreshInfeSpeed(i){
	if (temperature[i]>0)
		infeSpeed[i]=(infected[i]/population[i]+temperature[i]/10*antihot/10)/(wealthy[i]+1)*log人口密度;
	else
		infeSpeed[i]=(infected[i]/population[i]-temperature[i]/10*anticold/10)/(wealthy[i]+1)*log人口密度;//垮台以后经济=0，但还得感染
}

//更新dieSpeed[i]
function refreshDieSpeed(i){
	dieSpeed[i]=(lethality+serverity*0.1-5)/wealthy[i]*0.005;
	if(dieSpeed[i]<0)
		dieSpeed[i]=0;
}
function refreshWorld(){
	for (i = 0; i < name.length; i++){
			allInfec=0;
			allDead=0;
			allInfec=allInfec+infected[i];
			allDead=allDead+dead[i];
			allMediSpeed=allMediSpeed+mediSpeed[i];
		}
		allHealth=allPopu-allInfec-allDead;//或者剩下的就是健康人口，如果饼图可以有这个功能就可以不算。
};


//超级无敌循环函数main

function main(){//main每时间单元循环步骤
	while(game==1){
		timePlus;
		point+=0.5;

		for(i = 0; i < name.length; i++){
			//感染了并且没死光
			if(infected[i]>0){
				//没垮台
				if (downfall[i]=false){
					//if(dead[i]<population[i])，不需要，没垮台肯定没死光
					refreshDieSpeed(i);							//更新死亡速率
					if(mediStart){
						refreshMediSpeed(i);					//更新解药速率
					}
					//没全感染，就感染，并且死亡
					if(infected[i]<population[i]-dead[i]){
						refreshInfeSpeed(i);					//更新感染速率
						innerInfect(i);							//内部感染
						goDie(i);								//死亡
					}
					//向外传染
					if (infected[i]>=0.01*population[i]){
						var neighbor=new Array;
						//邻域查询，返回的id写进数组neighbor
						neighborInfect(neighbor);				//邻域传染
					}
					//让它垮台！
					if(dead[i]>=0.7*population[i]&&downfall[i]==false){
						downfall[i]=true;
						allDownfall++;
					}
				}
				//垮台了
				else{
					mediSpeed[i]=0;
					wealthy[i]=0;
					//还没死光
					if(dead[i]<population[i])
						refreshDieSpeed(i);						//更新死亡速率
					//还没全部感染
					if(infected[i]<population[i]-dead[i]){
						refreshInfeSpeed(i);					//更新感染速率
						innerInfect(i);							//内部感染
						goDie(i);								//死亡
					}
				}
			}
			//没死光，但没感染，可以给被感染的国家喊个加油。
			else if(dead[i]!=population[i]){
				if(mediStart==true && downfall[i]==false){
					refreshMediSpeed(i);					//好吧，全人类要团结一致一起开始研发解药。
				}
			}
			//死光了，所以也没有感染者了。因为都死了。
			else{
				mediSpeed[i]=0;
			}
			//完成研发！
			if(mediPercent=100){
				if(infected[i]>=1000)
					infected[i]=infected[i]-1000;
				if(infected[i]<1000)
					infected[i]=0;
			}
		}//for每个国家结束


		//求和看全世界的参数
		//不能放在for每个国家里，看看能不能放在更新函数里
		//不行，要判断是否大于国家人数有点麻烦，而且每轮就要更新很多次，可能显示会有问题。这里只更新一次
		//这里饼图不能刷新啊啊啊啊，一刷新就又看着他变大一次。
		//如果饼图可以控制刷新频率就可以这样。如果不行的话就……很麻烦。每更新一个国家就要更新一次他


		//更新世界统计数据：allInfec、allDead、allMediSpeed、allHealth
		refreshWorld;

		//判断开始研发。这个最好能写进触发器。
		if(allInfec>=50000){
			mediStart=true;
		}

		mediPercent=mediPercent+mediSpeed[i];//显示的时候记得保留两位小数显示就行，但是不要动里面的数值
		if(mediPercent>100){
			mediPercent=100;
		}

		//游戏状态判断
		if(allDead==allPopu)
			game=2;//玩家胜利
		if(allInfec==0&&allPopu-allDead!= 0)
			game=3;//人类胜利


		//在这里放显示函数，或者get的函数，每一轮结束的时候刷新一次
	}
}
