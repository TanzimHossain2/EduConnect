

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface Props {
    children: React.ReactNode;
}

const NavAvatar1 : React.FC<Props> = ({children}) => {
   
    console.log("NavAvatar1");
    

    return (
       <>
        <Avatar>
            <AvatarImage src={"https://github.com/shadcn.png"} alt={ "@shadcn"} />
            <AvatarFallback>{"CN"}</AvatarFallback>
        </Avatar>
        {children }
       </>
    );
};

export default NavAvatar1;
