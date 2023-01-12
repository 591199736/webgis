// result是全局变量，用来接收查询的结果，在html里调用查询函数后再调用result就可以得到结果
result;

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
function getCountryInfo(name) {
     var jsson = { "ename": name };
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
