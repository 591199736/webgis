// result是全局变量，用来接收查询的结果，在html里调用查询函数后再调用result就可以得到结果
result;
// 使用国家名调用getCountryInfo之后id变成相应国家的id
id;

//下面是全局变量，调用getAllCountry后会赋值
ename;
temperature;
wealthy;
density;
population;
infected;
dead;
infeSpeed;
mediSpeed;
dieSpeed;
downfall;
tradeFriend1;
tradeFriend2;
tradeFriend3;
tradeFriend4;

function getAllCountry(){
    var jsson = { "ename": "all" };
    $.ajax({
              type: "POST",
              url: "https://localhost:44329/api/PC/GetCountryInfo",
              async:false,		//同步请求  默认是true异步请求
              contentType: 'application/json',
              data: JSON.stringify(jsson),
              dataType: "json",
              success: function (data) {
                  debugger
                  var DD = data.date.value.date;
                  result = JSON.stringify(DD);
                  var res = JSON.parse(result);
                  var CountryNum = res.length;
                  ename = new Array();
                  temperature = new Array();
                  wealthy = new Array();
                  density = new Array();
                  population = new Array();
                  infected = new Array();
                  dead = new Array();
                  infeSpeed = new Array();
                  mediSpeed = new Array();
                  dieSpeed = new Array();
                  downfall = new Array();
                  tradeFriend1 = new Array();
				  tradeFriend2 = new Array();
				  tradeFriend3 = new Array();
				  tradeFriend4 = new Array();
                  for(var i=0;i<CountryNum;i++)
                  {
                      countryname[i] = res[i]["ename"].toString();//中文名就cname
                      temperature[i] = res[i]["temperature"];
                      wealthy[i] = res[i]["gdp"];
                      density[i] = res[i]["pop_density"];
                      population[i] = res[i]["population"];
                      infected[i] = res[i]["infected"];
                      dead[i] = res[i]["death"];
                      infeSpeed[i] = res[i]["infect_speed"];
                      mediSpeed[i] = res[i]["anti_speed"];
                      dieSpeed[i] = res[i]["fatality_rate"];
                      downfall[i] = res[i]["downfall"];
                      tradeFriend1[i] = res[i]["trade1"];
					  tradeFriend2[i] = res[i]["trade2"];
					  tradeFriend3[i] = res[i]["trade3"];
					  tradeFriend4[i] = res[i]["trade4"];
                  }
              }
    });
}

function restart() {
      $.ajax({
            type: "POST",
            url: "https://localhost:44329/api/PC/Restart",
            dataType: "json",
            success: function (data) {
                alert("操作成功！");
            }
      });
 }

// 传入国家名字进行查询
function getCountryInfo(ename) {
     var jsson = { "ename": ename };
     $.ajax({
          type: "POST",
          url: "https://localhost:44329/api/PC/GetCountryInfo",
          async:false,		//同步请求  默认是true异步请求
          contentType: 'application/json',
          data: JSON.stringify(jsson),

          dataType: "json",
          success: function (data) {
              debugger
              var DD = data.date.value.date;
              id = DD["id"];
              result = JSON.stringify(DD);
          }
     });
 }


function getVirusInfo() {
     $.ajax({
          type: "POST",
          url: "https://localhost:44329/api/PC/GetVirusInfo",
          async:false,		//同步请求  默认是true异步请求
          dataType: "json",
          async:false,		//同步请求  默认是true异步请求
          success: function (data) {
              var DD = data.date.value.date;
              result = JSON.stringify(DD);
          }
     });
 }

// 传入这个格式的东西来更新数据库的国家表
//        str1 = {
//              "ename":"Aruba",
//              "infected": 5,
//              "death": 6,
//              "infect_speed": 6,
//              "anti_speed": 6,
//              "fatality_rate": 6,
//              "downfall": 6
//             };
function editCountryInfo(str) {
     $.ajax({
          type: "POST",
          url: "https://localhost:44329/api/PC/EditCountryInfo",
          contentType: 'application/json',
          data: JSON.stringify(str),
          dataType: "json",
          success: function (data) {
              alert("操作成功！");
          }
     });
 }

// 传入这个格式的东西来更新数据库的病毒表
//str2 ={
//           "heat_resis": 3,
//           "cold_resis": 2,
//           "medic_resis": 2,
//           "severity": 2,
//           "fatal": 2,
//           "medic_prog": 2,
//           "medic_speed": 2,
//           "start_medic": 2,
//           "sum_pop": 2,
//           "sum_infected": 2,
//           "sum_dead": 2,
//           "sum_healthy": 2,
//           "sum_downfall": 2,
//           "dna": 2,
//           "end": 2
//       }
function editVirusInfo(str) {
     $.ajax({
          type: "POST",
          contentType: 'application/json',
          url: "https://localhost:44329/api/PC/EditVirusInfo",
          data: JSON.stringify(str),
          dataType: "json",
          success: function (data) {
              alert("操作成功！");
          }
     });
 }
