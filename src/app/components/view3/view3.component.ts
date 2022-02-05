import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { setClassMetadata } from '@angular/core/src/r3_symbols';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { count, map, startWith } from 'rxjs/operators';
import * as agCharts from 'ag-charts-community';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
// import { MatFormField } from '@angular/material/form-field';
export interface graphdata{
  country:string;
  count:any;
}
@Component({
  selector: 'app-view3',
  templateUrl: './view3.component.html',
  styleUrls: ['./view3.component.css']
})

export class View3Component implements OnInit {
  loader:boolean=false;
  public options: any;
  @HostListener('window:beforeunload',['$event'])
  handleClose($event: { returnValue: boolean; }){
    $event.returnValue=true;
    localStorage.clear();
  }

    data = [
        {
            quarter: 'Q1',
            spending: 450,
        },
        {
            quarter: 'Q2',
            spending: 560,
        },
        {
            quarter: 'Q3',
            spending: 600,
        },
        {
            quarter: 'Q4',
            spending: 700,
        },
    ];
options1:any;
  getdata(){
    // console.lo
    this.options = {
      data: this.dictt,
      series: [{
          xKey: 'country',
          yKey: 'count',
      }],
  };
 
  this.options1 = {
    data: this.dictt,
    series: [{
      type:"column",

        xKey:'country',
        yKeys: ['count'],
        label:{
          formatter:function (params: { value: number | undefined; }){
             return params.value === undefined ? '': params.value.toFixed(0);
          },
         
          
        },
        formatter:(params: any) =>({
          fill : this.colorThat(params),
      }),
      highlightStyle:{
        fill:"#000000",
        stroke:"#000000"
      }

    }],
};
  }

  colorThat(params: any) {
    
  }
  constructor(private http: HttpClient) {
    console.log("type of data",typeof(this.data))
    console.log("Inside constructor ",this.dictt)
    // alert(screen.width+" "+screen.height)

    
  }
  trends: any;
  trend_view: boolean = true;
  analysis_view: boolean = false;

  //Activating tabs
  //trends
  trendBool() {
    this.analysis_view = false;

    this.trend_view = true;
  }
  analysisBool() {
    this.trend_view = false;
    this.analysis_view = true;
  }

  url: string = "https://playground-trends-backend.herokuapp.com"


  myControl = new FormControl();


  // options: string[] = ['One', 'Two', 'Three'];
  optionss: string[] = [];
  filteredOptions?: Observable<string[]>;

  sendValue(value: any) {
    this.http.post(this.url + "/suggest", value).subscribe(
      (data: any) => {
        console.log(data);
        this.setData(data);

      },
      error => {
        console.log("error", error)
      }
    )

  }
  ddd: any[] = [];
  setData(d:any) {
    var dd = d;
    this.ddd = []
    for (var i in dd) {
      this.ddd.push(dd[i].title);
    }
    this.optionss = this.ddd;
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    console.log("options:", this.optionss);


  }
  ngOnInit() {
  
  }
  final_query:string="";
  dictt?:any[]=[]
  dict_bool:boolean=false; 
  show(dta: any) {
    console.log("supposed to be query data", dta)
    this.dict=[];
    this.dict_bool=false;
    this.mobile = false;
        this.loader=true;
    
    this.http.post<any[]>(this.url + "/data", dta).subscribe(
      (data: any) => {
        console.log(data);
        this.setFinal(data,dta);
        this.loader=false;

        
      },
      (err) => {
        console.log("Error in fetching trends", err);
      }

    )


  }
  result:any;
  setFinal(d:any,dta:any){
    this.result=JSON.parse(d);
    this.forGraph(dta);

  }
  dict:any[]=[];
  value:string[]=[];
  country:string[]=[];
  mobile:boolean=false;
  forGraph(dta:any){
      //A
      this.result=this.result[dta];
      console.log("Able to get Json:",this.result);
      console.log("getting all keys:\n",Object.keys(this.result))
      console.log("getting all values:\n",Object.values(this.result))
      this.value=Object.values(this.result);
      this.country=Object.keys(this.result)
      console.log(this.country);
      for (var i=0; i< Object.keys(this.result).length;i++){
        console.log("country",this.country[i])
        console.log("Value",this.value[i]) 

        var feed={"country":this.country[i], "count":this.value[i]};
        this.dict.push(feed);


      }
      console.log("after push graph ready data:",this.dict);
     
      this.dictt =this.dict.sort(function(a,b){
        return a.count < b.count?1:a.count >b.count?-1:0
      });
      this.dictt=this.dictt.splice(0,11);
      console.log("after sorting")
      console.log(this.dictt);
   
      this.getdata();
      if(screen.width > 1316){
      this.dict_bool=true;
      this.mobile=false;

    }
    else if(screen.width < 1316){
      this.mobile=true;
      this.dict_bool=false;

    }


  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.optionss.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
}


