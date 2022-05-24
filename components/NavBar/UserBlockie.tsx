import { Skeleton } from "antd";
import Blockies from "react-blockies";
import { useMoralis } from "react-moralis";
import { UserBlockie } from "./NavBarElements"
/**
 * Shows a blockie image for the provided wallet address
 * @param {*} props
 * @returns <Blockies> JSX Elemenet
 */

function Blockie(props: any) {
    const { 
        account, 
        user 
    } = useMoralis();
    const userETHAddress = user?.get("ethAddress");

    if (!props.currentWallet && !account) return <Skeleton.Avatar active size={40} />;

    return (
        <UserBlockie
            seed={props.currentWallet ? 
                userETHAddress.toLowerCase() 
                : 
                ""
                }
            className="identicon"
            {...props}
        />
    );
}

export default Blockie;
