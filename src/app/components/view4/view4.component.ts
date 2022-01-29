import { Component, OnInit,ViewEncapsulation ,HostListener} from '@angular/core';
// import { Type } from '@angular/compiler/src/core';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser'
import { HttpClient } from '@angular/common/http';

import { setClassMetadata } from '@angular/core/src/r3_symbols';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { count, map, startWith } from 'rxjs/operators';
import { TrendsService } from 'src/app/trends.service';
// import { stringify } from '@angular/compiler/src/util';
@Component({
  selector: 'app-view4',
  templateUrl: './view4.component.html',
  styleUrls: ['./view4.component.css']
})
export class View4Component implements OnInit {

  url: string = "https://playground-trends-backend.herokuapp.com"
  val=""

  
  @HostListener('window:beforeunload',['$event'])
  handleClose($event: { returnValue: boolean; }){
    $event.returnValue=true;
    localStorage.clear();
  }
  constructor(private http: HttpClient,private sanitizer:DomSanitizer, private trendService:TrendsService) {

    this.trends_res =JSON.parse(localStorage.getItem("res") || '{}');
    this.val  = localStorage.getItem("val") || '';
    for (var i in this.country_list) {
      this.country_list[i] = this.country_list[i].replace(" ", "_");
    }
    for (var i in this.country_list) {
      this.country_list[i] = this.country_list[i].replace(" ", "_");
    }
    this.country_list=this.country_list.map(name => name.toLowerCase())
   }

  ngOnInit(): void {
    this.filteredNations = this.myNation.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  myNation = new FormControl();
  nations: string[] = [];

  filteredNations?: Observable<string[]>;
  l:number=0;
  trends: any;
  country:string="";
  tr:boolean=false;
  country_list:string[] = ["Afghanistan","uae", "united_states","Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];
  
  trendingSearches(data:string) {
    localStorage.setItem("val",data);
    this.tr=true;
    this.country=data;
    this.trends_res=[];
    console.log("sending ", data, "as input");

    this.trendService.trending(data).subscribe(
      (data:any)=>{
        console.log("data using service",data);
        this.setData(data);  

      },
      (err:any)=>{
        console.log("error in service",err);
      }
    )
   

    

  }
  trends_res:string[]=[];

  setData(a:any){

    this.trends=JSON.parse(a);
    console.log("Trends data:\n",this.trends);
    this.trends=this.trends[0];
    for(var i in this.trends){
      this.trends_res.push(this.trends[i]);
    }
    localStorage.setItem("res", JSON.stringify(this.trends_res))
    console.log("trends result",this.trends_res)
   this.l=Object.keys(this.trends).length
    console.log("Length",this.l);  
  }
  curious_string:string="";
  loader:boolean=false;
  getSearch(query:any){
    this.loader=true;
    this.ress=[]
    this.articles=[];
    console.log("You are curious friend!",query);
    this.news=[];
    this.news_arr=[];
    this.curious_string=query;
    this.http.post<any>(this.url+"/news",query+" "+this.country).subscribe(
      (data:any)=>{
         console.log("google search news",data);
         console.log("google search feed",data.feed);

    console.log("Data entries!",data.entries);

        this.setDataNews(data.entries);
        this.loader=false;
        this.curious=true;


      },

      (err:any)=>{
        console.log("error in getting news",err);
        this.loader=false;


      }
    )
  }
  articles:any[]=[];
  ress:any[]=[];
  news:any[]=[];
  news_arr:any[]=[]
  setDataNews(data:any){
    this.curious=false;
    // console.log("raw data sent to setDataNews()",data);
    this.news=data;
    // var articles=[];
    if(data.length > 0){
    console.log("before putting in an array",data[0].sub_articles)

    for (var i=0; i< data.length;i++){
          this.articles.push(data[i].sub_articles);
    }
    var nnews_arr=this.articles.map((res:any)=>
      { if(res.length>0){
      this.ress.push(res);
      return res;
    }
    else {
      return null;
    }
  })
    console.log("filtered articles",nnews_arr);
    console.log("filtered articles arr",this.ress);
  }
  else if(data.length ==0){
    this.ress=[];
    // window.alert("Oops we do not have any info related to it. Please try to copy and paste in Analysis part to have more insight ");

  }

    // console.log("sub",articles)
    // var nnews_arr=this.news.map(data=> data.sub_articles.)
    // console.log("subarticles array",nnews_arr);
    // this.news_arr=nnews_arr.splice(0,13);
    // console.log("first map try :",this.news_arr);


    // this.news_arr=this.news_arr[0]
    // console.log("news",this.news);
    
    // this.news_arr=this.news.slice(0,13);
    // console.log("top 12 news",this.news_arr[0]);
    // this.curious=true;
    
  }
  highlight(a:any){
    // console.log("inside highlighter after all the processing->",this.sanitizer.bypassSecurityTrustHtml("<div style='text-decoration:none;word-wrap:break;'>"+a+"</div>"))
    return this.sanitizer.bypassSecurityTrustHtml("<div style='text-decoration:none;word-wrap:break;'>"+a+"</div>");

  }
  doNothing(){
    console.log("did nothing")
  }
  curious:boolean=false;
  close(){
    this.curious=false;
  }
  mod:boolean=false;
  disappear(){
    this.mod=false;
  }
  copy_value:string="";
  copied(val:any){
    console.log(val," copied !");
    if (val.length>0){
      this.mod=true;
      this.copy_value=val;
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.country_list.filter(nation => nation.toLowerCase().indexOf(filterValue) === 0);
  }
}

