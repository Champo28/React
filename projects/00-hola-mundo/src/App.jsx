import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard';

export function App(){
    const format = (username) => `@${username}`;

    const users = [
        {
            userName: 'midudev',
            name: 'Miguel Angel Durán',
            isFollowing: true
        },
        {
            userName: 'pheralb',
            name: 'Pablo Hernandez',
            isFollowing: false
        },
        {
            userName: 'elonmusk',
            name: 'Elon Musk',
            isFollowing: true
        },
        {
            userName: 'vxnder',
            name: 'Vanderhart',
            isFollowing: true
        }
    ]

    return(
        <section className="App">
            {
                users.map(({ userName, name, isFollowing }) => {
                    return(
                        <TwitterFollowCard 
                            key={userName}
                            format={format}
                            userName={userName}
                            name={name}
                            initialIsFollowing={isFollowing}
                        />
                    );
                })
            }
        </section>
    );
}