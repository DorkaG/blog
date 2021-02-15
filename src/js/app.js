import Post from './post';
import Template_menu from './template_menu';
import Template_special from './template_special';
import Template_post from './template_post';
import Template_featured from './template_featuredPost';

export default class App {
    constructor (postsDIV) {
        this.postsDIV = postsDIV;

        this.baseURL = 'http://localhost:3000';
        
    }

    async show(database, id, templateFunction) {
        let response = await fetch (`${this.baseURL}/${database}`)
        let data = await response.json();

        let content = '';
        const section = document.querySelector(`#${id}`);

        if (id === 'special') {
            data = data.filter(singlePost => singlePost.special === true);
        }

        if (id === 'featured') {            
            data = await this.chooseFeatured(data);     //vyber featured clanku                   
        }

        data.forEach(item => content += templateFunction(item));
        section.innerHTML = content;
    }

    async chooseFeatured(data) {
        let numberOfFeatured = 2;           //nastavuje, kolik featured clanku chci
        let filteredDatas = [];                 //filtruje posty, sestavene od nejvzssihopoctu liku, tak, aby se tam neobjevovala dvakrat stejna kategorie
        let filteredDataHighestIDs = [];        //finalni vyber postu - ty s nejvetsim poctem liku a zaroven od ruznych kategorií

        let responseCategories = await fetch(`${this.baseURL}/categories`);
        let dataCategories = await responseCategories.json();

        
        data.sort((a,b) => (b.likes) - (a.likes)); //serazeni dat podle poctu liku, od nejvyssiho po nejmensi
        console.log(data);

        for (let i = 0; i < data.length; i++) {
            if (filteredDatas.filter(x => x.category === data[i].category).length === 0) {          //kdyz si vyfiltruju z filteredData ty polozky, ktere maji stejnou kategorii, jakou má aktuální položka v datech - bude to vyfiltrovane pole dlouhe 0? Pokud ano, můžu aktuální položku přidat do filteredDatas
                filteredDatas.push(data[i]);
                  }
        }
        console.log("toto jsou filtereddatas")
        console.log(filteredDatas);


        
        for (let i = 0; i <numberOfFeatured; i++) {         // z pole filteredDatas pushnu prvni dve položky do finálního pole filteredDataHighestIDs, to pak vracím touto fcí
           filteredDataHighestIDs.push(filteredDatas[i])
            }         
            
        
        
            //nahodnz vyber clanku
        /*for (let i = 1; i <=numberOfFeatured; i++) {            //vyber tolika nahodnych cisel, kolik chci clanku;
            do{
                randomID = Math.floor(Math.random() * (data.length) + 1);
                
            } while (randomIDs.includes(randomID));             //cisla se nesmi opakovat
            randomIDs.push(randomID);
                                   
            }

            console.log(randomIDs);

            for (let i = 0; i < randomIDs.length; i++) {
                let filteredData = data.filter(singlePost => singlePost.id === randomIDs[i])
                filteredDatas.push(filteredData[0])                 //ulozim si do pole ty posty, jejichz ID odpovida vygenerovanym nahodnym cislum
            }*/
            //konec nahodneho vzberu clanku
        
            //data = data.filter(singlePost => singlePost.id === randomIDs[0] || singlePost.id === randomIDs[1]);
            //data = filteredDatas;

           // let responseCategories = await fetch (`${this.baseURL}/categories`);        
             //   let dataCategories = await responseCategories.json();

                for (let i = 0; i < data.length; i++) {                 //prirazeni spravne kategorie pomoci id
                    let chosenCategory = dataCategories.filter(category => category.id === data[i].category);
                    console.log(chosenCategory);
                    data[i].category = chosenCategory[0].name;
                }

                
            return filteredDataHighestIDs;
    }

    addLikes() {
    const clanek = document.querySelector('#post');
                clanek.addEventListener("click", async  event => {
                    if (event.target.dataset.id !== "undefined") {
                        let response = await fetch (`${this.baseURL}/posts/${event.target.dataset.id}`); 
                        let data = await response.json();
                        let likesNumber = data.likes;

                        let response1 = await fetch (`${this.baseURL}/posts/${event.target.dataset.id}`, {
                            method: 'PATCH',
                            body: JSON.stringify({
                                likes: likesNumber+1
                            }),
                            headers: {"Content-type": "application/json; charset=UTF-8"}
                        })
                        
                    }
                    this.show('posts', 'post', Template_post);
                })
            }

    filterCategory() {
        const menu = document.querySelector('#menu');

        menu.addEventListener("click", async event => {
            console.log(event);
            if (event.target.dataset.id !== "undefined") {
                let response = await fetch (`${this.baseURL}/categories/${event.target.dataset.id}`);
                let categoryData = await response.json();

                let response2 = await fetch (`${this.baseURL}/posts`);
                let data = await response2.json();

                let filteredData = data.filter(post => post.category === categoryData.id);
                let content = '';
                let post = document.querySelector('#post');
                filteredData.forEach(item => content += Template_post(item));
                post.innerHTML = content;
            }
        })
    }

    continueReading() {
        const continueReadingBtn = document.querySelector('#special');
        const continueReadingClick = document.querySelector('#featured');
        const wholePage = document.querySelector('.page');

        continueReadingBtn.addEventListener("click", async event => {
            if (event.target.dataset.id !== "undefined") {
                let response = await fetch (`${this.baseURL}/posts/${event.target.dataset.id}`);
                let chosenPost = await response.json();

                wholePage.innerHTML = Template_post(chosenPost);

            }
        })
    } 

    

    run() {
        this.show('categories', 'menu', Template_menu);
        this.show('posts', 'post', Template_post);
        this.show('posts', 'special', Template_special);
        this.show('posts', 'featured', Template_featured);
        this.addLikes();
        this.filterCategory();
        this.continueReading();
    }

}