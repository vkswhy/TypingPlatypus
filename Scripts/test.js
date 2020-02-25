var words = [],x='',counter = 0,wcount = 0,incorrect = 0,crctWords = 0;SEt = new Set(),timeit = 59,intrvl = 0,isActive = true,breakPoints = [],dino = 0;

function focusit(){
    intrvl = setInterval(mytimer,1000);

}

function typeit(event){
    if(!ignoredKeys.has(event.keyCode) && isActive == true){

    
        if (event.keyCode == 32){
            document.getElementById("id"+counter).style.backgroundColor = "#fed39f";

            if(wcount == (words[counter].length) && incorrect == 0){
            document.getElementById("id"+counter).style.color = "green";
            

                crctWords += 1;
            }
            else
                document.getElementById("id"+counter).style.color = "red";

                

            document.getElementById('workSpace').value = "";
            if(wcount>0 || incorrect>0)
                counter +=1;
            if(counter == breakPoints[dino]){
                console.log("here",counter);
                document.getElementById("div" + dino).style.display = "none";
                document.getElementById("div" + (dino + 2)).style.display = "block";
                dino += 1;
            }
            wcount = 0;
            incorrect = 0;
            console.log("no of correct typed",crctWords);
            document.getElementById("id"+counter).style.backgroundColor = "yellow";

            
        }
        else if(event.keyCode == 8){
            if (incorrect > 0){
                incorrect -= 1;

            }
            else if(wcount > 0){
                wcount -= 1;
            }

        }
        else{
            if(words[counter][wcount] == event.key && incorrect == 0 && wcount < words[counter].length){
                if (wcount == words[counter].length)
                    incorrect += 1
                else
                    wcount += 1;



            }
            else{
                incorrect += 1;
            }

            
        }
    if (incorrect != 0)
        document.getElementById("id"+counter).style.color = "red";
    else
        document.getElementById("id"+counter).style.color = "black";


    }


}

function mytimer(){
    document.getElementById('timer').innerHTML = '0:' + timeit;
    if (timeit != 0)
        timeit -= 1;
    else{
        document.getElementById("workSpace").disabled = "true";
        isActive = false
        acc = crctWords*100/(counter)
        acc = acc.toFixed(2);
        document.getElementById('speedVal').innerHTML = crctWords + "<span style='font-size:3rem;'>WPM</span>";
        document.getElementById("accu").innerHTML = "Accuracy:" + acc;
        document.getElementsByClassName("score-container")[0].style.display = "flex";

    }
}
function startup(){
    linebreaker = 0, divId = 'div0',lineCount = 0;
    document.getElementById('timer').innerHTML = '1:00';
    newdiv = document.createElement("div");
    newdiv.id = divId;
    document.getElementById("main").appendChild(newdiv);

    try{
        for(i=0;i<200;i++){
            n = Math.floor(Math.random()*980 + 1);
            x = rawDATA[n];
            words.push(x);
            if(linebreaker + x.length + 2 > 100){
                breakPoints.push(i);
                lineCount += 1;
                newdiv = document.createElement("div");
                divId = 'div' + lineCount;
                newdiv.id = divId;
                if (lineCount>1)
                    newdiv.style.display = "none";
                document.getElementById("main").appendChild(newdiv);

                linebreaker = 0;
            }
            else{
                linebreaker += x.length;
            }

            p = document.createElement("p");
            p.innerHTML = x;

            p.id = "id"+i;
            document.getElementById(divId).appendChild(p);



        }
    }

    catch{
        console.log("here" + i);
        document.getElementById("reload").click();


    }
}

startup();






