import React from 'react'
import { connect } from 'react-redux'
let List = (props) => {
    console.log(props);
    return (
        <div>list</div>
    )
}
List = connect((state) => { 
    return {
        data: state.list
    } 
})(List)

let Item = (props) => {
    console.log(props);
    return (
        <div>item #{props.id}</div>
    )
}
Item = connect((state) => { 
    return {
        data: state.item
    } 
})(Item)
export { List, Item }