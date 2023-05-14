

    document.querySelector("#add_etudiant").onclick=function () {
        document.querySelector("#form_app").classList.toggle("hide");    

        
    }
    
    document.getElementById("annuler").addEventListener('click', () => {
        document.querySelector("#form_app").classList.toggle("hide"); 
    })

    function sendMessage(status, content){

        let messageBox = document.getElementById('message')

        
        if(status === 'success'){
            messageBox.style.backgroundColor = "green"
        }else if(status === 'update'){
            messageBox.style.backgroundColor = "orange"
        }else{
            messageBox.style.backgroundColor = "red"
        }
        
        messageBox.classList.remove('hide')
        document.querySelector("#message .title span").innerHTML = status.toUpperCase()
        document.querySelector("#message .content").innerHTML = content[0].toUpperCase() + content.slice(1)



        setTimeout(()=> {
            messageBox.classList.add('hide')
        }, 2500)
       
    }

    function loaderOn(){
        document.querySelector("#app_load").classList.remove('hide')
    }

    function loaderOff(){
        document.querySelector("#app_load").classList.add('hide')
    }

    function clearForm(){

        document.querySelector("#idetudiant").value = ""
        document.querySelector("#matricule").value = ""
        document.querySelector("#nom").value = ""
        document.querySelector("#telephone").value = ""
    }

    function etudiantToHtml(xmlChild, i){
        let html='';
        html=html + '<tr class="element">';
            
            html=html + '<td>' + i + '</td>';
            html=html + '<td>' + xmlChild.childNodes[0].textContent + '</td>';
            html=html + '<td>' + xmlChild.childNodes[1].textContent + '</td>';
            html=html + '<td>' + xmlChild.childNodes[2].textContent + '</td>';

            html=html + '<td class="options">';

                html=html + '<button class="update" id="' + xmlChild.id +'">';
                html=html + 'Modifier';
                html=html + '</button> &nbsp';

                html=html + '<button class="delete" id="' + xmlChild.id +'">';
                html=html + 'Supprimer';
                html=html + '</button>';

            html=html + '</td>';
        html=html + '</tr>';

        return html;
    }

    function readAll(){

        let xhttp = new XMLHttpRequest();
        xhttp.open('GET','api/readall.php',true);
        xhttp.send();
        
        xhttp.onload=function(){
            let res= xhttp.responseXML;
            let xmlRoot= res.documentElement;
            // console.table(xmlRoot);

            let html='';
            for(let i= 0; i < xmlRoot.childNodes.length; i++){
                xmlChild= xmlRoot.childNodes[i];
                html= html + etudiantToHtml(xmlChild, i + 1);
            }

            document.querySelector('#elements').innerHTML=html;

            edit();
            erase();
        }
        
    }

    function edit(){
        let btn_updates = document.querySelectorAll("#elements .update")
        let form_app = document.querySelector("#form_app")
        let form_add = form_app.querySelector("#form_add")
        let idetudiant =  0
        for (let i = 0; i < btn_updates.length; i++) {
            btn_updates[i].onclick = function(){
                form_app.classList.remove('hide')
                idetudiant = parseInt(this.getAttribute('id'))

                
                let xhttp = new XMLHttpRequest();
                xhttp.open('GET',"api/read.php?idetudiant=" + idetudiant,true);
                xhttp.send();

                
                xhttp.onload=function(){
                    let res= xhttp.responseXML;
                    let xmlRoot= res.documentElement;
                    
                    let etudiant = xmlRoot.querySelector('etudiant')

                    
                    form_add.querySelector("#idetudiant").value = idetudiant
                    form_add.querySelector("#matricule").value = etudiant.querySelector("matricule").textContent
                    form_add.querySelector("#matricule").setAttribute('disabled', true)
                    form_add.querySelector("#nom").value = etudiant.querySelector("nom").textContent
                    form_add.querySelector("#telephone").value = etudiant.querySelector("telephone").textContent

                }
            }
            
        }
    }
    function erase(){
        let btn_deletes = document.querySelectorAll("#elements .delete")
        let idetudiant =  0
        for (let i = 0; i < btn_deletes.length; i++) {
            btn_deletes[i].onclick = function(){
                idetudiant = parseInt(this.getAttribute('id'))

                
                let xhttp = new XMLHttpRequest();
                xhttp.open('GET',"api/delete.php?idetudiant=" + idetudiant,true);
                xhttp.send();

                
                xhttp.onload=function(){
                    let res= xhttp.responseXML;
                    let xmlRoot= res.documentElement;
                    
                    let status =xmlRoot.querySelector('status').textContent;
                    let content =xmlRoot.querySelector('content').textContent;

                    readAll();
                    sendMessage(status, content)

                }
            }
            
        }
    }

    

    document.querySelector('#form_add').onsubmit=function(e){

        e.preventDefault()
        let form =new FormData(this);
        let xhttp = new XMLHttpRequest();
        
        
        loaderOn();
            if(form.get('idetudiant') == null || form.get('idetudiant') == ""){
                xhttp.open('POST','api/create.php',true);
                xhttp.send(form);
                xhttp.onload=function(){
                    let res= xhttp.responseXML;
                    let xmlRoot= res.documentElement;
                    let status =xmlRoot.querySelector('status').textContent;
                    let content =xmlRoot.querySelector('content').textContent;
                    readAll();
                    
                    // document.querySelector("#form_app").classList.toggle("hide")
                    
                    sendMessage(status, content)
                    clearForm()
                }
            }else{
                xhttp.open('POST','api/update.php',true);
                xhttp.send(form);
    
                console.log(form);
                xhttp.onload=function(){
                    let res= xhttp.responseXML;
                    let xmlRoot= res.documentElement;
                    let status =xmlRoot.querySelector('status').textContent;
                    let content =xmlRoot.querySelector('content').textContent;
    
                    document.querySelector("#matricule").removeAttribute('disabled')
                    // document.querySelector("#form_app").classList.toggle("hide");
                    readAll();
                    
                    sendMessage(status, content)
                    clearForm()
                    
                }
            }
            loaderOff()


        
        return false;
        
    }

    // setInterval(()=>{
    //     readAll();
    //     loaderOn()
    // }, 5000)


    setTimeout(()=>{
        loaderOff()
        readAll();
    }, 2500)

