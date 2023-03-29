import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import { Player } from './components/Player';
import { PlayerView } from './components/PlayerView';
import { Ground } from './components/Ground';
import { Cubes } from './components/Cubes';
import { CubeSelector } from './components/CubeSelector';
import './App.css';

function App() {
	const [showCubeSelectorMenu, setShowCubeSelectorMenu] = useState(false);

	const toggleShowCubeSelectorMenu = () => {
		setShowCubeSelectorMenu((prev) => !prev);
	};

	return (
		<div className={'container'}>
			<Canvas>
				<Sky sunPosition={[100, 100, 20]} />
				<ambientLight intensity={0.5} />
				<Physics>
					<Player showCubeSelectorMenu={showCubeSelectorMenu} />
					<PlayerView showCubeSelectorMenu={showCubeSelectorMenu}/>
					<Ground showCubeSelectorMenu={showCubeSelectorMenu} />
					<Cubes showCubeSelectorMenu={showCubeSelectorMenu}/>
				</Physics>
			</Canvas>
			<div className={'cursor'}>+</div>
			<CubeSelector
				show={showCubeSelectorMenu}
				toggleShowCubeSelectorMenu={toggleShowCubeSelectorMenu}
			/>
		</div>
	);
}

export default App;
