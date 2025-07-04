export default function NavElement (props: { icon: string, label: string,   }): React.ReactNode
{
    return (  

        <nav className="flex justify-between p-4  text-white">
            <div className="flex items-center space-x-4">
                
                <ul className="flex space-x-4">
                <li>
                    <a href="#" className="hover:text-gray-400"><img src={props.icon}></img> {props.label}</a>
                </li>
                
                </ul>
            </div>
        </nav>
    )
}

