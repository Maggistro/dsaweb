import React from 'react';
import styles from './Character.module.css';

type Props = {
    name: string,
    initiative: number,
}

class Character extends React.Component<Props> {
    render() {
        return <div className={styles.character}>
            <h3>{this.props.name}</h3>
            <div>Initiative: {this.props.initiative}</div>
        </div>
    }
}

export default Character;
