result;// result是全局变量，用来接收查询的结果，在html里调用查询函数后再调用result就可以得到结果
nbresult;// 邻接表的json结果
id;// 使用国家英文名字调用getCountryInfo后获得该国家的id

//下面是全局变量，调用getAllCountry后会赋值
/*countryname;
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
// 调用getNeighbor后将邻接信息存入neighbor二维表
neighbor;*/

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
            var res = data.date.value.date;
            result = JSON.stringify(res);
            var CountryNum = res.length;
            countryname = [];
            temperature = [];
            wealthy = [];
            density = [];
            population = [];
            infected = [];
            dead = [];
            infeSpeed = [];
            mediSpeed = [];
            dieSpeed = [];
            downfall = [];
            tradeFriend1 = [];
            tradeFriend2 = [];
            tradeFriend3 = [];
            tradeFriend4 = [];

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
            var res = data.date.value.date;
            result = JSON.stringify(res);
            id = res["id"];
        }
    });
}

//读档
function getVirusInfo() {
    $.ajax({
        type: "POST",
        url: "https://localhost:44329/api/PC/GetVirusInfo",
        async:false,		//同步请求  默认是true异步请求
        dataType: "json",
        async:false,		//同步请求  默认是true异步请求
        success: function (data) {
            var res = data.date.value.date;
            result = JSON.stringify(res);
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
//              alert("操作成功！");
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
//              alert("操作成功！");
        }
    });
}


function getNeighbor() {
    $.ajax({
        type: "POST",
        url: "https://localhost:44329/api/PC/GetNeighbor",
        async:false,		//同步请求  默认是true异步请求
        dataType: "json",
        async:false,		//同步请求  默认是true异步请求
        success: function (data) {
            var res = data.date.value.date;
            nbresult = JSON.stringify(res);
            alert("操作成功！");
            neighbor = []
            for(var i=0;i<res.length;i++)
            {
                neighbor[i] = [];
                for(var j=0;j<res.length;j++)
                {
                    field = "id"+(j+1).toString();
                    neighbor[i][j] = res[i][field];
                }
            }

        }
    });
}
// 导出json文件
//   if (!res) {
//                       alert("保存的数据为空");
//                       return;
//                     }
//                     filename = "neighbor.json";
//                     if (typeof res === "object") {
//                       data = JSON.stringify(data, undefined, 4);
//                     }
//                     var blob = new Blob([data], { type: "text/json" }),
//                       e = document.createEvent("MouseEvents"),
//                       a = document.createElement("a");
//                     a.download = filename;
//                     a.href = window.URL.createObjectURL(blob);
//                     a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
//                     e.initMouseEvent(
//                       "click",
//                       true,
//                       false,
//                       window,
//                       0,
//                       0,
//                       0,
//                       0,
//                       0,
//                       false,
//                       false,
//                       false,
//                       false,
//                       0,
//                       null
//                     );
//                     a.dispatchEvent(e);