var pretraga = document.getElementById("pretraga");
var tabela = document.getElementById("tabela");
var klik = document.getElementById("klik");

if(pretraga!=null){
    pretraga.addEventListener("input",(e)=>{
        pretrazeno = e.target.value;
        tabela.innerHTML="";
        $.post(
            "/podaci",
            {pretrazeno:pretrazeno},
            function (data){
                data=JSON.parse(data);
                var tr = document.createElement("tr");
                tr.innerHTML="<td><b>broj</b></td>\n" +
                    "            <td><b>naziv</b></td>\n" +
                    "            <td><b>tip</b></td>\n" +
                    "            <td><b>predavac</b></td>\n" +
                    "            <td><b>ucionica</b></td>\n" +
                    "            <td><b>dan</b></td>\n" +
                    "            <td><b>vreme</b></td>\n" +
                    "            <td><b>grupa</b></td>";
                tabela.appendChild(tr);
                for(var i=0;i<data.length;i++){
                    var tr = document.createElement("tr");
                    for(var j=0;j<data[i].length;j++){
                        var td = document.createElement("td");
                        if(j==3){
                            td.setAttribute("class","predavac");
                        }
                        if(j==4){
                            td.setAttribute("class","ucionica");
                        }
                        td.innerHTML=data[i][j];
                        tr.appendChild(td);
                    }
                    tabela.appendChild(tr);
                }
                listen();
            }
        );
    });
}

var listen = function (){
    var predavaci = document.getElementsByClassName("predavac");
    for(var i=0;i<predavaci.length;i++){
        predavaci[i].addEventListener("click",(e)=>{
            $.post(
            "/predavac",
            {predavac:e.target.innerHTML},
            function (data){
                klik.innerHTML="";
                var table = document.createElement("table");
                data=JSON.parse(data);
                console.log(data);
                for(var i=0;i<data.length;i++){
                    var tr = document.createElement("tr");
                    for(var j=0;j<data[i].length;j++){
                        var td = document.createElement("td");
                        td.innerHTML=data[i][j];
                        console.log("data:"+data[i][j]);
                        tr.appendChild(td);
                    }
                    table.appendChild(tr);
                }
                klik.appendChild(table);
            });
        });
    }
    var predavaci = document.getElementsByClassName("ucionica");
    for(var i=0;i<predavaci.length;i++){
        predavaci[i].addEventListener("click",(e)=>{
            $.post(
            "/ucionica",
            {ucionica:e.target.innerHTML},
            function (data){
                klik.innerHTML="";
                var table = document.createElement("table");
                data=JSON.parse(data);
                console.log(data);
                for(var i=0;i<data.length;i++){
                    var tr = document.createElement("tr");
                    for(var j=0;j<data[i].length;j++){
                        var td = document.createElement("td");
                        td.innerHTML=data[i][j];
                        console.log("data:"+data[i][j]);
                        tr.appendChild(td);
                    }
                    table.appendChild(tr);
                }
                klik.appendChild(table);
            });
        });
    }
}
listen();