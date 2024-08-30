

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface Props {
    children: React.ReactNode;
}

const NavAvatar1 : React.FC<Props> = ({children}) => {
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
