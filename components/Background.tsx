import { NextPage } from "next"
import ParticlesBg, { Props, TypeProp } from 'particles-bg'
import  React from "react"
const bg:NextPage<Props>=(props)=>{
    return (
        <ParticlesBg type="cobweb" bg={true} {...props}/>
    )
}


export default bg