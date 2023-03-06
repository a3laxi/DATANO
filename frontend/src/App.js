import React, { Component } from "react";
import axios from "axios";
import './components/Left.css'
import Styles from './components/Styles'
import './App.css'
import { canvas } from "canvas";






class App extends Component{
    constructor(props){
      super(props);
      this.state = {
        collection: [],
        view: '',
        instru:'',
        showCanva:false 
      }
      this.selectOnlyThis = this.selectOnlyThis.bind(this)
      this.chooseInstruction = this.chooseInstruction.bind(this)
      this.cropCenter = this.cropCenter.bind(this)
      this.dragView = this.dragView.bind(this)
      this.qsstiKanva = this.qsstiKanva.bind(this)
    }

    dragView(event){
    	console.log('RAK DRAGUI')
    }

    cropCenter(event){
    	console.log('BRKTI F TSWIRA')
    	console.log('X ',event.clientX,' -- Y ',event.clientY)
    }


    selectOnlyThis(event){
      var myCheckbox = document.getElementsByName("myCheckbox");
      Array.prototype.forEach.call(myCheckbox,function(el){
        el.checked = false;  
      });
      event.target.checked = true;
      this.setState({view : event.target.id})
    }

    chooseInstruction(event){
      this.setState({instru : event.target.id})
    }


    componentDidMount() {
      this.refreshList();
    }

    

    refreshList = () => {
      axios
        .get("/api/Instructions/")
        .then((res) => this.setState({ collection: res.data }))
        .catch((err) => console.log(err));
    };

    getCollectionData(state) {
	  const data = this.state.collection;
	  const firstRow = data[0];
	  const restCollec = [];
	  const firstCollecArray = [];

	  for (let i = 1; i < data.length; i++) {
	    if (!restCollec.includes(data[i].collection) && data[i].collection !== firstRow.collection) {
	      restCollec.push(data[i].collection);
	    } else if (firstCollecArray.length < 1) {
	      firstCollecArray.push(data[i].collection);
	    }
	  }

	  const viewCollec = [];
	  for (let i = 0; i < data.length; i++) {
	    if (data[i].collection === state.view) {
	      viewCollec.push(data[i]);
	    }
	  }

	  let currentInstru = [];
	  for (let i = 0; i < data.length; i++) {
	    if (Object.is(data[i].id , Number(this.state.instru))) {
	      currentInstru = data[i];
	    }
	  }

	  return [firstCollecArray, restCollec, viewCollec, currentInstru];
	}

	NavBar() {
		return(
				<nav className="navbar navbar-inverse navbar-fixed-top">
			        <div className="container-fluid">
			          <div className="navbar-header">
			            <a  href="navDatano" className="navbar-brand" >DATANO API - Image Annotation</a>
			          </div>
			        </div>
		        </nav>
		)
	}
	  
	Left(data)
	{
		var [firstCollecArray, restCollec, viewCollec  ] =[ data[0] , data[1] , data[2] ] ;
		return(

              <div className="col-lg-2 border">


                <div className="col border">
                  <div className="row border">
                      Objects :
                      
                  </div>

                  <div id='zbi' className="row border">
                    <div className="col border">
                        { firstCollecArray.map((item,index) => { return <div className="row" key={item.toString()}><input type="checkbox" name="myCheckbox" id={item.toString()} onClick={this.selectOnlyThis} /><label>{item.toString()}</label></div>; }) }
                        { restCollec.map((item,index) => { return <div className="row" key={item.toString()}><input type="checkbox" name="myCheckbox" id={item.toString()} onClick={this.selectOnlyThis}  /><label>{item.toString()}</label></div>; }) }
                    </div>
                  </div>
                </div>

                <div className="col" style={{height : '40px'}}></div>

                <div className="col border">
                    <div className="row border">
                      Up Next 
                    </div>
                    <div className="row border">
                      
                      <div className="col border">
                      	<div className="row" style={{height:'20px'}}></div>
                        {viewCollec.map((item,index) => { return <div className="row" key={item.id.toString()}><div className="col"><img alt={item.taskId.toString()} src={item.src.toString()} id={item.id.toString()} style={{width:'100%'}} onClick={this.chooseInstruction} onDrag={this.dragView} /><div style={{height:'20px'}}></div></div></div>; }) }
                      </div>
                      
                    </div>
                </div>
                
                
              </div>

      )
	}

	qsstiKanva(event){
		var nva = document.querySelector('canvas')
		if(nva) {
			console.log('Qssti kanva ', event.clientX, event.clientY)
			var ba = nva.getContext('2d')
			ba.fillRect(300,100,100,100)

			// ba.beginPath(); 
			// ba.moveTo(this.state.qanva[0] , this.state.qanva[1]); 
			// ba.lineTo(Number(event.clientX), Number(event.clientY));
			// ba.stroke()

			// this.setState({ qanva: [event.clientX , event.clientY] })
		}

	}

	Kanva(currInstru){
		var url = '{{width: 200}}'
		if(currInstru.src){
			return(
				
					<div id="central" className="row border">
						
		              	<div className="col border" id="lol"  style={{position: 'relative'}}  onClick={this.cropCenter} ><img id="mainimage" alt={currInstru.taskId} src={currInstru.src} onDrag={this.dragView}/></div>
		                <canvas style={{width: '100%' , height: '100%'}} onClick={this.qsstiKanva}></canvas>
		            </div>
		        
			)
		}
		else {
			return <canvas></canvas>
		}
		
	}


	friKanva(){
		var nva = document.querySelector('canvas')
		if(nva) {
			nva.width  = nva.offsetWidth;
			nva.height  = nva.offsetHeight;
			console.log('FriKanva '	,nva.width)
		}
	}


	Center(currInstru) {

		return (

			<div className="col-lg-7 border">

	              <div className="row border">
	                
	              <div className="col border" style={{height:'45px'}}> Central picture { currInstru.instru} </div>
	              </div>


	              	{this.Kanva(currInstru)}
	            	              	              


	              <div className="row border" style={{height:'30px'}}></div>


	              <div className="row border">
	                Message
	              </div>


	              {this.friKanva()}
	         </div>

		)
	}



	Right(currentInstru){
		return(
			<div className="col-lg-3 border">
	            
	            <div className="col border">
					<div className="row">
		            	Info 
		        	</div>
		            <div className="row border">
		            	<div className="col border">
			            	<div className="row border">
			            		Instruction : {currentInstru.instru}
			            	</div>
			            	<div className="row border">
			            		Task ID : {currentInstru.taskId}
			            	</div>
			            	<div className="row border">
			            		Created At : {currentInstru.createdAt}
			            	</div>
			            	<div className="row border">
			            		Urgency : {currentInstru.urgency}
			            	</div>
			            	<div className="row border">
			            		Original Image : 
			            	</div>
			            </div>
		        	</div>
		        	
		        	
		        </div>


	            <div className="col" style={{height : '20px'}}></div>
	            

	            <div className="col border">
					<div className="row border">
			              Annotations 
			        </div>


			        <div className="row border" style={{height : '200px'}}>
			               
			        </div>
			    </div>
	        </div>
		)
	}






    render(){

    	var [firstCollecArray, restCollec, viewCollec, currentInstru] = this.getCollectionData(this.state)

      return(

        <main className="container-fluid">


          {this.NavBar()}

          
          <div className="row border">


          		{this.Left([firstCollecArray, restCollec, viewCollec, currentInstru])}


          		{this.Center(currentInstru)}
	        
	            
	         	{this.Right(currentInstru)}


          </div>



        </main>

    )
  }

}




export default App ;

