import React, { Component } from 'react';

class List extends Component {

    functiongenerateListItems(propList) {
        return (
        <ul>
            {propList.map(function(listItem){
                return <li>{listItem.Name} </li>
            })}
        </ul>)
    }
    
    render() {
        return (this.functiongenerateListItems(this.props.listOfItems))
        }
    }

    export default List;