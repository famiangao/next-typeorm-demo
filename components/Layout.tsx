import { Props} from 'particles-bg'
import styles from "../styles/components/layout.module.scss"
import React, { ReactNode } from "react"
import dynamic from "next/dynamic";

const Bg = dynamic(() => import('./Background'), {
    ssr: false
});

interface IProps {
    className?:string
    children?:ReactNode
    bgProps?:Props
}

const Layout: React.FC<IProps> = ({children,bgProps,className}) => {
    return (
        <div className={className}>
            <div className={styles.main_container}>
                {children}
            </div>
            <Bg type="tadpole" {...bgProps}/>
        </div>

    )
}


export default Layout;