import React from 'react'
import { useDispatch } from 'react-redux'
import {actionCreators} from './state/index'
import { bindActionCreators } from 'redux'

export const Shop = () => {
  const dispatch = useDispatch();
  const {depositMoney, withdrawMoney} = bindActionCreators(actionCreators, dispatch);
  return (
    <div>
        <h2>Deposit/Withdraw Money</h2>
        {/* <button className="btn btn-primary mx-2" onClick={()=>{dispatch(actionCreators.withdrawMoney(100))}}>-</button>
        Updat Balance
        <button className="btn btn-primary mx-2" onClick={()=>{dispatch(actionCreators.depositMoney(100))}}>+</button> */}
        <button className="btn btn-primary mx-2" onClick={()=>{withdrawMoney(100)}}>-</button>
        Updat Balance
        <button className="btn btn-primary mx-2" onClick={()=>{depositMoney(100)}}>+</button>

    </div>
  )
}
