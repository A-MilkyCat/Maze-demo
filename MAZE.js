function check_num(){
    var x = document.getElementById("Number").value;
    document.getElementById("Number").value = "";
    try{
        if (isNaN(x)==true) throw "It's not a number!";
        if (x=="") throw "Null";
        x = Number(x);
        if (x<=0) throw "Too small";
        if (x>100) throw "Too big";
    }catch(respond){
        alert(respond);
        return;
    }
    var a = new Array;
    for (var i=0;i<x;i++){
        a[i] = new Array;
        for (var j=0 ; j<x ; j++){
            a[i][j] = "";
        }
    }
    var counter = 1;
    for (var i=0;i<x;i++){
        for (var j=0;j<x;j++){
            a[i][j] = counter ;
            counter ++;
        }
    }
    var para = new Array;
    //?var br = document.createElement("br");
    var str,node,element = document.getElementById("box");
    var small_box = document.createElement("span");small_box.className = "small_box";
    for (var i=0;i<x;i++){
        para[i] = document.createElement("p");
        str = "";
        for (var j=0;j<x;j++){
            if (j!=0)
                str += "," + a[i][j];
            else
                str += a[i][j];
        }
        node = document.createTextNode(str);
        para[i].appendChild(node);
        small_box.appendChild(para[i]);
    } 
    element.appendChild(small_box);
}
////////////////MAZE//////////////////
var way=[[0,1],[1,0],[0,-1],[-1,0]];
var max_width = 200,n;
const start_y = 0,start_x = 1;
var end_y, end_x;
var vis = new Array;
function check_width(){
    n = document.getElementById("width").value;
    var debug = document.getElementById("debug");
    document.getElementById("width").value = "";
    try{
        if (n=="") throw "Null";
        if (isNaN(n)==true) throw "It's not a number";
        n = Number(n);
        if (n<10) throw "Too small";
        if (n>200) throw "Too big";
    }catch(w){
        debug.innerHTML = w;
        return;
    }
    debug.innerHTML = "";
    for (var i=0;i<max_width;i++){
        vis[i] = new Array;
        for (var j=0 ; j<max_width ; j++){
            vis[i][j] = 0;
        }
    } 
    end_y = n-1;
    end_x = n-2;
    dfs(start_y,start_x,1);
    found_way = false;
    confirm(end_y-1,end_x,true);
    vis[end_y][end_x] = 1;
    var str;
    for (var i=0;i<n;i++){
        str = "";
        for (var j=0;j<n;j++){
            if (vis[i][j]==1)
                str += " "
            else
                str += "#";
        }
        console.log(str);
    }
    //output on the website
    var para = new Array;
    var node,element = document.getElementById("Maze");
    var maze_div = document.createElement("div");
    maze_div.className = "Maze_display";
    var br = document.createElement("br");
    for (var i=0;i<n;i++){
        str = "";
        for (var j=0;j<n;j++){
            str += vis[i][j]==true?"░": "█";//road and wall
        }
        node = document.createTextNode(str);
        para[i] = document.createElement("p")
        para[i].appendChild(node);
        maze_div.appendChild(para[i]);
    }
    element.appendChild(maze_div);
    element.appendChild(br);
   // element.appendChild(br);
}
function can_reach(y,x){
    var wall = 0;
    end_y = n-1;
    end_x = n-2;
    for (var i=0;i<4;i++){
        var ey = y + way[i][0];
        var ex = x + way[i][1];
        if (ey<=0||ex<=0||ey>=n-1||ex>=n-1)
            continue;
        if (ey==end_y&&ex==end_x)
            return true;
        if (vis[ey][ex]==true)
            wall ++;
    }
    if (wall>1)//除了來的路，不應該有障礙物，才能挖洞 
        return false; //有障礙的話則不能走 
    else
        return true;
}
function dfs(y,x,step){
    if ((y<=0||x<=0||y>=n-1||x>=n-1)&&step!=1)//邊界條件
		return;
	if (step!=1&&can_reach(y,x)==false||vis[y][x]==1)
		return;
	vis[y][x] = 1;
   // console.log("-------------------------------------------");
	var used = [0,0,0,0];
	var how2go;//四個方向
	for (var i=1;i<=4;i++){
		do{
			how2go = rand()%4;// 上下左右隨機選擇 
		}while (used[how2go]==1);
		dfs(y+way[how2go][0],x+way[how2go][1],step+1);
		used[how2go] = 1;
	}
}
function confirm(y,x,top_left){
	if (found_way==true)
        return;		
	if (vis[y][x]==true){
		found_way = true;
		return;
	}else{
		vis[y][x] = true;
		if (top_left==true)
			confirm(y,x-1,false);
		else
			confirm(y-1,x,true);
	}
}
function rand(){
    return Math.floor(Math.random()*4+1)
}