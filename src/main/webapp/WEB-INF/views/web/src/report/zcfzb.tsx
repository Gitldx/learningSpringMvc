/// <reference path="../jqplugins/plugin.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';


declare let window:any;
declare let numeral : (txt) => any;

class Zcfzb extends React.Component{

    private canCalculate : boolean = false;

    private arr = {
        "1001" : 1980,
        "1002" : 2385,
        "1003" : 3746
      }

    private data = [
        ['Furnace',1,10000,'=B1*C1','=IF(C1 > 5000, true, false)','=CUSTOM(A1)','=ACCT_QMYE(1001)'],
        ['Tower',2,6000,'=B2*C2','=IF(C2 > 5000, true, false)','=CUSTOM(199)','=ACCT_QMYE(A1)'],
        ['Drum',3,5000,'=B3*C3','=IF(C3 > 5000, true, false)','=CUSTOM(A1)','=ACCT_QMYE(1001)'],
        ['Pump',4,4000,'=B4*C4','=IF(C4 > 5000, true, false)','=CUSTOM(A1)','=ACCT_QMYE(A1)'],
        ['Total','=SUM(B1:B4)','=(C1+C2+C3+C4)','=SUM(D1:D4)','','=CUSTOM(A1)','=ACCT_QMYE(A1)']
    ]

    public componentDidMount(){
        window.ACCT_QCYE = this.ACCT_QCYE;
        window.ACCT_QMYE = this.ACCT_QMYE;

        $('#mys').jexcel({
            data:this.data,
            columns: [
                { type:'text' },
                { type:'numeric' },
                { type:'numeric' },
                { type:'numeric' },
            ],
            colHeaders: ['Equipment','Quantity', 'Price', 'Total', '>5000?'],
            colWidths: [ 200, 80, 100, 100, 100 ,200,200],
            onselection : this.onselection
        });


        $('#mys').jexcel('updateSettings', {
            table: (instance, cell, col, row, val, id)=> {
                // Format numbers
                if (col === 2 || col === 3) {
                    // Get text
                    let txt = $(cell).text();
                    // Format text
                    txt = numeral(txt).format('0,0.00');
                    // Update cell value
                    $(cell).html('<input type="hidden" value="' + val + '"> $ ' + txt);
                }
        
                // Bold the total row
                if ($(cell).text() === 'Total') {
                    $('.r' + row).css('font-weight', 'bold');
                    $('.r' + row).css('background-color', '#fffaa3');
                }
        
                if(val.substr(0,1) === '='){
                  $('#mys').jexcel('executeFormula', col + '-' + row);
                }
                
            }
        });
    }



    public render(){
        return (
            <div>
                <button onClick={this.test}>test</button> 
            </div>
        )
    }


    private ACCT_QCYE = (code)=>{
        return this.arr[code.toString()];
    }

    private ACCT_QMYE = (code)=>{
        if(code === 1001){
            return 1087.12
          }
          else
          {
            return "null";
          }

    }

    private onselection(table,cell){
        console.log($(table).jexcel("getValue",$(cell).prop("id")));
        console.log($(table).jexcel("getText",$(cell).prop("id")));
    }

    private test=()=>{
        this.canCalculate = !this.canCalculate;
        
        
        $('#mys').jexcel({
            data:this.data,
            columns: [
                { type:'text' },
                { type:'numeric' },
                { type:'numeric' },
                { type:'numeric' },
            ],
            colHeaders: ['Equipment','Quantity', 'Price', 'Total', '>5000?'],
            colWidths: [ 200, 80, 100, 100, 100 ]
        });


        $('#mys').jexcel('updateSettings', {
            table: (instance, cell, col, row, val, id)=> {
              // if (col > 0) {
              //     value = $('#mys').jexcel('getValue', $(cell));
              //     var val;
              //     if(canCalculate){//ldx
              //         val = numeral($(cell).text()).format('0,0.00');
              //     }
              //     else{
              //         val = $(cell).text();
              //     }
                  
              //     $(cell).html('<input type="hidden" value="' + value + '">' + val);
              // }


              // Format numbers
              if (col === 2 || col === 3 || col=== 4) {
                  // Get text
                  let txt = $(cell).text();
                  // Format text
                  if(this.canCalculate){
                    txt = numeral(txt).format('0,0.00');
                  }
                  else{
                    txt = val;
                  }

                  // Update cell value
                  $(cell).html('<input type="hidden" value="' + val + '">' + txt);
              }

              // Bold the total row
              if ($(cell).text() === 'Total') {
                  $('.r' + row).css('font-weight', 'bold');
                  $('.r' + row).css('background-color', '#fffaa3');
              }


          }
          });
    }
}


ReactDOM.render(
    <Zcfzb/>,
    document.getElementById('root') as HTMLElement
);