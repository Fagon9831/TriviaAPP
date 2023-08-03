const cat = "https://opentdb.com/api_category.php"
const link = "https://opentdb.com/api.php?amount=10"
const cate = "&category="
const diff = "&difficulty="
const typ = "&type="
let rtas
const loadCat = async () => {
    //document.getElementById('sCategory').innerHTML = ""
    const response = await fetch(cat)
    const result = await response.json()
    //console.log(result.trivia_categories);
    for (let i in result.trivia_categories) {
        let option = document.createElement("option");
        option.classList.add("section-sCategory__Categories");
        option.value = result.trivia_categories[i].id
        option.innerHTML += `${result.trivia_categories[i].name}`
        document.querySelector(".section-options__scategory").appendChild(option);
    }
}

const showQuestions = async () => {
    ////https://opentdb.com/api.php?amount=11&category=9&difficulty=medium&type=multiple
    let oCate = document.getElementsByClassName("section-options__scategory").value
    let oDiff = document.getElementsByClassName("section-options__sdfficulty").value
    let oTyp = document.getElementsByClassName("section-options__stype").value
    let opt = ""
    if (oCate == "Select Category" || oDiff == "Select Difficulty" || oTyp == "Select Type") {
        if (oCate != "Select Category") {
            opt += `${cate}${oCate}`
        }
        if (oDiff != "Select Difficulty") {
            opt += `${diff}${oDiff}`
        }
        if (oTyp != "Select Type") {
            opt += `${typ}${oTyp}`
        }
    }
    const respuesta2 = await fetch(`${link}${opt}`);
    rtas = await respuesta2.json();
    //console.log(`${link}${opt}`)
    //console.log(rtas.results)
    await create(rtas.results);
}

const create = (results) => {
    document.querySelector(".section-questions").innerHTML=""
    document.querySelector(".section-resultsbtn").innerHTML=""

    for (let i in results) {
        let optionsS = ""
        optionsS = `${results[i].correct_answer},${results[i].incorrect_answers}`.split(",")
        optionsS.sort(function () { return Math.random() - 0.5 });
        console.log(optionsS)

        let div2 = document.createElement("div");
        div2.classList.add("section-questions__question");
        div2.innerHTML += `<p id="p${i}">${results[i].question}</p>`
        document.querySelector(".section-questions").appendChild(div2);

        let js=0
        let option2 =document.createElement("select")
        option2.setAttribute("id","q"+i)
        document.querySelector(".section-questions").appendChild(option2);
       
        optionsS.forEach(()=>{
            option2.innerHTML+=`<option>${optionsS[js]}</option>`
            document.querySelector(".section-questions").appendChild(option2);
            js++
        });
    }
    let btnSucces =document.createElement("button")
    btnSucces.setAttribute("id","btnSucces2")
    btnSucces.textContent="Validar Respuestas"
    btnSucces.addEventListener("click",validate)
    document.querySelector(".section-resultsbtn").appendChild(btnSucces);
}

const validate = () => {
    let result= rtas.results
    let m=0
    let points=0
//    console.log(rtas.results)

    result.forEach(()=>{
            let etiqueta=document.getElementById("q"+m)            
            etiqueta.disabled=true            
        if((result[m].correct_answer).replace(/&quot;/g, '"').replace(/&#039;/g, "'")==document.getElementById("q"+m).value){
            points+=parseInt(100)
            etiqueta.style.backgroundColor="#6feb1ddb"
        }else{
            etiqueta.style.backgroundColor="#f53d3d"
        }        
        m++
    })
    let lResult =document.createElement("p")
    lResult.textContent="Su calificacion final es :"
    document.querySelector(".section-resultsbtn").appendChild(lResult)
    let inputRest=document.createElement("input")   
    inputRest.value=points
    inputRest.disabled=true    
    document.querySelector(".section-resultsbtn").appendChild(inputRest)

    let createNewTest=document.createElement("button")   
    createNewTest.textContent="Create new Test"
    createNewTest.addEventListener("click",()=>{
        document.querySelector(".section-questions").innerHTML=""
        document.querySelector(".section-resultsbtn").innerHTML=""
    })
    document.querySelector(".section-resultsbtn").appendChild(createNewTest)
    window.alert("Su calificacion es: "+points+"/1000")
}

let sendOpt = document.querySelector(".section-options__btn");
sendOpt.addEventListener("click", showQuestions);
