import React, {Component} from 'react';
import './Searchbox.css'





class Searchboxheader extends Component{
    render(){
        return(
            <div ref={this.props.searchboxref} style = {this.props.style} className = 'searchbox'>
                <div className = 'searchinput' type = 'text' ></div>
                <div className = 'searchbutton' type = 'button'></div>
            </div> 
        )
    }

}

export class searchboxnavbar extends Component{
    render(){
        return('asd')
    }
}


export default Searchboxheader;