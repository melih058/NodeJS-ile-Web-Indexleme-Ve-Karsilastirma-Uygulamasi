var path = require('path');
const util = require('util')
const axios = require('axios');
var fs = require('fs');
const { read } = require('fs');
var score=0;
 class Site {
  constructor(url, Keywords2,SubLink,Score,subSite,id,rank) {
    this.url = url;
    this.Keywords2 = Keywords2;
    this.SubLink = SubLink;
    this.Score = Score;
    this.subSite = subSite;
    this.id=id;
    this.rank=rank;
  }
};
var id=0;
var LastScore = 0;
var AllSites = []
var wordFrequency = [];
var ResultFrequency = [];   
var sortArray = [];
var allTerms=[];
var keyword = [];
var dataPromiseGlobal;
var urlarray = [];
var mainurl="";
var Keywords1 = []
var Keywords2 = []
  jsdom = require('jsdom'),
  { JSDOM } = jsdom;
      url=''
async function Semantik(url,b) {
   
    const getNodes2 = html => {
        var Text = ""
        const TextData = [],
          dom = new JSDOM(html),
          news = dom.window.document.querySelectorAll('#esanlamlar');
        news.forEach(item => {
          Text += item.textContent.toLowerCase();
          TextData.push({
            text: item.textContent,
          })
        });
        var result = Text.split(/[, .'\n']+/);
      //  console.log(result)
        //console.log(result.length)
        SemantikEsAnlamlar = []
        for (let x = 6; x < result.length; x++) {
          SemantikEsAnlamlar.push(result[x]);
        }     

      }

    await axios.get(url)
  .then(response => {
      getNodes2(response.data);
  })
  .catch(error => {
    console.error(error);
  })
var Text = "";

  }

async function Keywordsfinder(url) {
//console.log("Keyword bulunuyor")
    async function getNodes(html) {
    const TextData = [],
      dom = new JSDOM(html),
      news = dom.window.document.querySelectorAll('p');
    news.forEach(item => {
      Text += item.textContent.toLowerCase();
      TextData.push({
        text: item.textContent,
      })
    });

    var result = Text.split(/['\t', -.'\n']+/);
    //console.log(result.length)
   // console.log("METİN")
  //  console.log(result)
  
    let wordFrequency = []
    for (var i = 0; i < result.length; i++) {
      wordFrequency[i] = [];
      for (var j = 0; j < 2; j++) {
        wordFrequency[i][j] = undefined;
      }
    }

    wordFrequency[0][0] = result[0];
    wordFrequency[0][1] = 1;

    
async function AddStopWords(){
  try {
    var data = fs.readFileSync('stop_words_turkish.txt', 'utf8');
      
    return data.split(/[''\n\r']+/);
  } catch(e) {
    console.log('Error:', e.stack);
    return null;
  }
}    

var stopwords = await AddStopWords();
//console.log(stopwords.length);

    //console.log(util.inspect(stopwords, { maxArrayLength: null }))
   


    for (let i = 1; i < result.length; i++) {
      var isexist = -1;
      for (let j = 0; j < wordFrequency.length; j++) {
        if (result[i] == wordFrequency[j][0]) {

          wordFrequency[j][1]++;
          isexist = j;
          break;
        }

      }
      if (isexist == -1) {
        if (!stopwords.includes(result[i])) {
          for (let j = 0; j < wordFrequency.length; j++) {
            if (wordFrequency[j][0] == undefined) {
              wordFrequency[j][0] = result[i];
              wordFrequency[j][1] = 1;
              break;
            }
          }
        }

      }

    }

    for (let j = 0; j < wordFrequency.length - 1; j++) {
      for (let i = 0; i < wordFrequency.length - i; i++) {
        if (wordFrequency[i][1] < wordFrequency[i + 1][1]) {
          let temp = wordFrequency[i + 1];
          wordFrequency[i + 1] = wordFrequency[i];
          wordFrequency[i] = temp;
        }
      }
    }
    
    var number = result.length * (2 / 100);
    var roundedNumber = Math.round(number);
    
    var keyword = [];
    for (let i = 0; i < roundedNumber; i++) {
      keyword[i] = [];
      keyword[i][0] = wordFrequency[i][0];
      keyword[i][1] = wordFrequency[i][1];
    }
   
   // console.log(keyword);
    var semantikkeyword = keyword
   //  console.log(semantikkeyword)
    for (let i = 0; i < keyword.length; i++) {
        var charMap = {Ç:'C',Ö:'O',Ş:'S',İ:'I',I:'i',Ü:'U',Ğ:'G',ç:'c',ö:'o',ş:'s',ı:'i',ü:'u',ğ:'g'};
        for (let x = 0; x < semantikkeyword.length; x++) {
            var str =     semantikkeyword[x][0]
            str_array = str.split('');
            for(let y=0, len = str_array.length; y < len; y++) {
                str_array[y] = charMap[ str_array[y] ] || str_array[y];
            }

            str = str_array.join('');

            var clearStr = str.replace(" ","").replace("-","").replace(/[^a-z0-9-.çöşüğı]/gi,"");
        semantikkeyword[x][0]=clearStr
        } 
    }
    for (let a = 0; a < semantikkeyword.length; a++) {
        var urlsemantik='https://es-anlam.com/kelime/'+semantikkeyword[a][0]
  //  console.log(semantikkeyword)
    if(urlsemantik!='https://es-anlam.com/kelime/' && url!='https://www.hurriyet.com.tr/sporarena/son-dakika-fernando-muslera-galatasaray-ile-sozlesme-yeniledi-transfer-itirafi-41764182'){
       await Semantik(urlsemantik,a);
     //  console.log(url)
    //   console.log("Semantik url"+urlsemantik)
       // console.log("Keyword dizisi"+semantikkeyword)
        if(!SemantikEsAnlamlar.includes('bulunamadi')){
          //console.log("Semantik eş anlamlar")
          // console.log(SemantikEsAnlamlar)
          keyword[a][2]=SemantikEsAnlamlar
        //   console.log(keyword[a][2].length)
     
           
        }
    }
        
    }

    for (let i = 0; i < result.length; i++) {
      for (let j = 0; j < keyword.length; j++) {
      //  console.log("Keyword.length"+keyword.length)
       // console.log("Eşit mi diye kontrol:"+j)
      //  console.log(keyword[j])
        if(keyword[j][2]!=undefined){
          for (let k = 0; k < keyword[j][2].length; k++) {
            if(result[i]==keyword[j][2][k] && keyword[j][2][k]!=keyword[j][0]){
            //  console.log("ilk frekansı:"+keyword[j][1])
            //  console.log("Metindeki kelime : "+result[i]+" Eş Anlamlı Kelimesi: "+keyword[j][2][k]+" Frekansı artan kelime : "+keyword[j][0]+" RESULT I NIN DEGERI: "+i+" Keyword J nin degeri "+j+"  anahtar kelime K: "+ k)
              //console.log(" RESULT I NIN DEGERI: "+i+" Keyword J nin degeri "+j+"  anahtar kelime K: "+ k)
              keyword[j][1]++
            }
    
        }
        }
           
        
      }

}


    return keyword;
  }


  function axiosTest() {
    // create a promise for the axios request
    const promise = axios.get(url).catch( (error) => console.error("Hata1:"+error))

    // using .then, create a new promise which extracts the data
    const dataPromise = promise.then((response) => response.data).catch( (error) => console.error("Hata2:"+error))

    // return it

    return dataPromise

  }

  // now we can use that data from the outside!

  var Text = "";

  //console.log(keywords)

  dataPromiseGlobal=axiosTest();
  let userToken = dataPromiseGlobal;
  //console.log(userToken) // Promise { <pending> }

  keywords = userToken.then(function (result) {
    // console.log(result) // "Some User token"
    result = getNodes(result);
    return result
  })
  //console.log("Keyword bulma bitti")
  return keywords
}

function UrlFinder(url) {
//console.log("Url bulma başladı")
  const getNodes = html => {
    let urlstartwith="";
    let count=0;
    for (let i = 0; i < url.length; i++) {
        if(url[i]=="/"){
          count++;
        }
        if(count<3){
          urlstartwith+=url[i];
        }
        
    }
    let urlarray = [];
    let x = 0;
    dom = new JSDOM(html),
      news = dom.window.document.querySelectorAll('a');
    news.forEach(item => {
      if (item.toString().startsWith(urlstartwith.toString())  && x<5)
        urlarray[x++] = item.toString()
      //  console.log(urlarray[x-1])
    });
    // console.log(urlarray)
    return urlarray;
  }
  let urlarray = [];

  function axiosTest() {
    // create a promise for the axios request
    const promise = axios.get(url)

    // using .then, create a new promise which extracts the data
    const dataPromise = promise.then((response) => response.data)

    // return it

    return dataPromise

  }

  // now we can use that data from the outside!

  var Text = "";

  //console.log(keywords)


  let userToken = dataPromiseGlobal;
  //console.log(userToken) // Promise { <pending> }

  urlarray = userToken.then(function (result) {
    // console.log(result) // "Some User token"
    result = getNodes(result);
    //   console.log(result)
    return result
  })
  urlarray.then(function (result) {
    // console.log(result) // "Some User token"
    return result
  })
  //console.log("Url bulma başladı")
  return urlarray
}

async function ControlSub(url2, depthLevel) {
 // Keywords1 = await Keywordsfinder(mainurl);
  Keywords2 = await Keywordsfinder(url2);
  let linkurls = await UrlFinder(url2)
  //console.log(linkurls)
  //console.log(Keywords1)
  //console.log(Keywords2)

    //Cosine Similatiry
    console.log("cosine başladı")
    allTerms=[];

    for (let i = 0; i < Keywords1.length; i++) {
      let word=Keywords1[i][0];
      let freq=Keywords1[i][1];
      let newword=[];
      newword[0]=word;
      newword[1]=freq;
      allTerms.push(newword)
    }
    var termexist=0;
    for (let i = 0; i < Keywords2.length; i++) {
      termexist=0;
      for (let j = 0; j < allTerms.length; j++) {
         if(allTerms[j][0]==Keywords2[i][0]){
           termexist=1;
         }
       
      }
  
      if(!termexist){
        let word=Keywords2[i][0];
        let freq=Keywords2[i][1];
        let newword=[];
        newword[0]=word;
        newword[1]=freq;
      allTerms.push(newword)
      }
  
    }
  
    for (let x = 0; x < allTerms.length; x++) {
     allTerms[x][1]=0;
    }
    
   
    //console.log(allTerms)
    //console.log("Keywords dizisi 111:"+Keywords1)
    var vecKeywords1=[];
    var vecKeywords2=[];
    for (let i = 0; i < allTerms.length; i++) {
      let word=allTerms[i][0];
      let freq=allTerms[i][1];
      let newword=[];
      newword[0]=word;
      newword[1]=freq;
     vecKeywords1.push(newword);
    }
    for (let i = 0; i < allTerms.length; i++) {
      let word=allTerms[i][0];
      let freq=allTerms[i][1];
      let newword=[];
      newword[0]=word;
      newword[1]=freq;
      vecKeywords2.push(newword);
    }
   
    for (let i = 0; i < vecKeywords1.length; i++) {
      for (let j = 0; j < Keywords1.length; j++) {
        if(vecKeywords1[i][0]==Keywords1[j][0]){
          vecKeywords1[i][1]=Keywords1[j][1];
        }
  
      }
      
    }
    
    for (let i = 0; i < vecKeywords2.length; i++) {
      for (let j = 0; j < Keywords2.length; j++) {
        if(vecKeywords2[i][0]==Keywords2[j][0]){
          vecKeywords2[i][1]=Keywords2[j][1];
        }
  
      }
    }
  
   // console.log(vecKeywords1);
   // console.log(vecKeywords2);

    //console.log("Keywords1")
   // console.log(Keywords1)
    
    var dot = 0 ; // 
    
    for (let i = 0; i < vecKeywords1.length; i++) {
      dot+=vecKeywords1[i][1]*vecKeywords2[i][1];
    }
     //console.log("noktasal çarpım:"+dot);
  
  //norm
  var norm1=0;
     for (let i = 0; i < vecKeywords1.length; i++) {
        norm1+=vecKeywords1[i][1]*vecKeywords1[i][1]
    }
   
    norm1=Math.sqrt(norm1)
    //console.log(norm1)
    var norm2=0;
     for (let i = 0; i < vecKeywords2.length; i++) {
      norm2+=vecKeywords2[i][1]*vecKeywords2[i][1]
    }
    norm2=Math.sqrt(norm2)
    //console.log(norm2)
    var cosine=0;
    //cos(d1,d2) = dot(d1,d2) / (||d1|| ||d2||) 
    //console.log("normların çarpımı"+norm1*norm2);
    if(norm1*norm2==0){
      cosine=0;
    }
    else {
      cosine=100*dot/(norm1*norm2);
    }
  
    console.log("Kosinüs benzerliği:"+cosine)
    LastScore=cosine;
     //console.log("1 toplam kelime sayısı "+allWordCount1)
     //console.log("2 toplam kelime sayısı "+allWordCount2)
  let allfrequency = 0;
  for (let j = 0; j < Keywords2.length; j++) {
    allfrequency += Keywords2[j][1]
  }
  let subSites= []
  //console.log(allfrequency)
  //console.log(score / allfrequency)
  if(LastScore>100){
    LastScore=100;
  }
  if(LastScore<0){
    LastScore=0;
  }
  var newsite= new Site (url2,Keywords2,linkurls,LastScore,subSites,id,0);
  id++;
  for (let i = 0; i < linkurls.length; i++) {
    //console.log(depthLevel)
    if (depthLevel < 3){
      depthLevel++;
      // console.log("İlk alt sitenin ilk alt sitesi:" + linkurls[i])
      newsite.subSite.push(await ControlSub(linkurls[i], depthLevel))
       depthLevel--;
    }
     
  }

  return newsite;

}
async function Controlx(mainurl) {
  //console.log(mainurl)
  Keywords1 = await Keywordsfinder(mainurl);
  //console.log(Keywords1)
}
async function Control(url2) {
  
  //Keywords1 = await Keywordsfinder(mainurl);
  Keywords2 = await Keywordsfinder(url2)

 // console.log(Keywords1)
 // console.log(Keywords2)
  //Cosine Similatiry
  allTerms=[];

  for (let i = 0; i < Keywords1.length; i++) {
    let word=Keywords1[i][0];
    let freq=Keywords1[i][1];
    let newword=[];
    newword[0]=word;
    newword[1]=freq;
    allTerms.push(newword)
  }
  var termexist=0;
  for (let i = 0; i < Keywords2.length; i++) {
    termexist=0;
    for (let j = 0; j < allTerms.length; j++) {
       if(allTerms[j][0]==Keywords2[i][0]){
         termexist=1;
       }
     
    }

    if(!termexist){
      let word=Keywords2[i][0];
      let freq=Keywords2[i][1];
      let newword=[];
      newword[0]=word;
      newword[1]=freq;
    allTerms.push(newword)
    }

  }

  for (let x = 0; x < allTerms.length; x++) {
   allTerms[x][1]=0;
  }
  
 
  //console.log(allTerms)
  //console.log("Keywords dizisi 111:"+Keywords1)
  var vecKeywords1=[];
  var vecKeywords2=[];
  for (let i = 0; i < allTerms.length; i++) {
    let word=allTerms[i][0];
    let freq=allTerms[i][1];
    let newword=[];
    newword[0]=word;
    newword[1]=freq;
   vecKeywords1.push(newword);
  }
  for (let i = 0; i < allTerms.length; i++) {
    let word=allTerms[i][0];
    let freq=allTerms[i][1];
    let newword=[];
    newword[0]=word;
    newword[1]=freq;
    vecKeywords2.push(newword);
  }
 
  for (let i = 0; i < vecKeywords1.length; i++) {
    for (let j = 0; j < Keywords1.length; j++) {
      if(vecKeywords1[i][0]==Keywords1[j][0]){
        vecKeywords1[i][1]=Keywords1[j][1];
      }

    }
    
  }
  
  for (let i = 0; i < vecKeywords2.length; i++) {
    for (let j = 0; j < Keywords2.length; j++) {
      if(vecKeywords2[i][0]==Keywords2[j][0]){
        vecKeywords2[i][1]=Keywords2[j][1];
      }

    }
  }

  //console.log(vecKeywords1);
  //console.log(vecKeywords2);
  
  var dot = 0 ; // 
  
  for (let i = 0; i < vecKeywords1.length; i++) {
    dot+=vecKeywords1[i][1]*vecKeywords2[i][1];
  }
   //console.log("noktasal çarpım:"+dot);

//norm
var norm1=0;
   for (let i = 0; i < vecKeywords1.length; i++) {
      norm1+=vecKeywords1[i][1]*vecKeywords1[i][1]
  }
 
  norm1=Math.sqrt(norm1)
  //console.log(norm1)
  var norm2=0;
   for (let i = 0; i < vecKeywords2.length; i++) {
    norm2+=vecKeywords2[i][1]*vecKeywords2[i][1]
  }
  norm2=Math.sqrt(norm2)
  //console.log(norm2)
  var cosine=0;
  //cos(d1,d2) = dot(d1,d2) / (||d1|| ||d2||) 
  if(norm1*norm2==0){
    cosine=0;
  }
  else {
    cosine=100*dot/(norm1*norm2);
  }

  console.log("Kosinüs benzerliği:"+cosine)
  LastScore=cosine;
   //console.log("1 toplam kelime sayısı "+allWordCount1)
   //console.log("2 toplam kelime sayısı "+allWordCount2)
  let depthLevel = 0;
  let subSites = []
  let linkurls = await UrlFinder(url2)
 // console.log(linkurls)
 if(LastScore>100){
  LastScore=100;
}
if(LastScore<0){
  LastScore=0;
}
 var newsite= new Site (url2,Keywords2,linkurls,LastScore,subSites,id,0);
  id++;
  for (let i = 0; i < linkurls.length; i++) {
    depthLevel = 2;
    //console.log("İlk alt site:" + linkurls[i])
    newsite.subSite.push(await ControlSub(linkurls[i], depthLevel))
  }
  
//console.log(AllSites);
  return newsite;
}
async function AllSiteadd(AllSites) {
  await Controlx(mainurl);
  for (let i = 0; i < urlarray.length; i++) {
    let sitex=await Control(urlarray[i],AllSites)
    AllSites.push(sitex)
   // console.log(AllSites)
  }
  return AllSites
}

async function ScoreCalculate() {
  AllSites=await AllSiteadd(AllSites)
  //console.log(AllSites)
  //console.log(AllSites[2].Keywords2)
  for(let i=0;i<AllSites.length;i++){
    //console.log(AllSites[i]);
    for(let j=0;j<AllSites[i].subSite.length;j++){
      //console.log(AllSites[i].subSite[j]);
        for(let k=0;k<AllSites[i].subSite[j].subSite.length;k++){
          AllSites[i].subSite[j].Score+=AllSites[i].subSite[j].subSite[k].Score*2/10;
         // console.log(AllSites[i].subSite[j].subSite[k]);
        }
        AllSites[i].Score+=AllSites[i].subSite[j].Score*2/10;
    }
  
  
  }
}

function sortSites() {
  sortArray = [];
  for(let i=0;i<AllSites.length;i++){
    sortArray.push(AllSites[i])
    for(let j=0;j<AllSites[i].subSite.length;j++){
      sortArray.push(AllSites[i].subSite[j]);
        for(let k=0;k<AllSites[i].subSite[j].subSite.length;k++){
          sortArray.push(AllSites[i].subSite[j].subSite[k]);    
        }
    }
}
//console.log("SORT ARRAY");
//console.log(sortArray)
for (let i = 0; i < sortArray.length-1; i++) {
  for (let j = 0; j < sortArray.length-1; j++) {
    if(sortArray[j].Score<sortArray[j+1].Score){
      let temp=sortArray[j+1];
      sortArray[j+1]=sortArray[j]
      sortArray[j]=temp;
    }
  }
}

for(let i=0;i<AllSites.length;i++){
  for (let k = 0; k < sortArray.length; k++) {
  if(AllSites[i].id==sortArray[k].id)
  {
    AllSites[i].rank=k;
    break;
  }

  }
  for(let j=0;j<AllSites[i].subSite.length;j++){
    for (let k = 0; k < sortArray.length; k++) {
      if(AllSites[i].subSite[j].id==sortArray[k].id){
        AllSites[i].subSite[j].rank=k;
        break;
      }
      
      }
      for(let k=0;k<AllSites[i].subSite[j].subSite.length;k++){
        for (let x = 0; x < sortArray.length; x++) {
          if(AllSites[i].subSite[j].subSite[k].id==sortArray[x].id){
            AllSites[i].subSite[j].subSite[k].rank=x;
            break;
          }
          
          }
      }
  }
}
//console.log("SIRALANMIŞ SORT ARRAY");
//console.log(sortArray)
for(let i=0;i<AllSites.length;i++){
  //console.log(AllSites[i].Keywords2[0][2]);
  for(let j=0;j<AllSites[i].subSite.length;j++){
    //console.log(AllSites[i].subSite[j]);
      for(let k=0;k<AllSites[i].subSite[j].subSite.length;k++){
       // console.log(AllSites[i].subSite[j].subSite[k]);
          
      }
  }

}
}

module.exports.Semantik = function (req,res) {
  res.render('page5Semantik',{mainurl:"",AllSites:[],Keywords1:[]})
}
 module.exports.SemantikPost = function (req,res) {
  AllSites=[];
  //console.log(req.body)
  var count = Object.keys(req.body).length
   mainurl=req.body.mainurl;
   urlarray = [];
  for (let i = 1; i < count; i++) {
      urlarray.push(req.body[Object.keys(req.body)[i]])
     //  console.log(Object.keys(req.body)[i])
   //  console.log("Deger"+ req.body[Object.keys(req.body)[i]])
  }
 // console.log(urlarray)
  //console.log("url array yazdırdık")
     async function printScore() {
       await ScoreCalculate(req.body.mainurl,req.body.secondurl);
    //   console.log("Tüm siteler:")
   //    console.log(AllSites)
      await sortSites();
       res.render('page5Semantik',{mainurl:req.body.mainurl,AllSites:AllSites,Keywords1:Keywords1})
     }

     printScore();

 }

 