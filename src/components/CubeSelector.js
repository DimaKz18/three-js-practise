import { useEffect } from 'react';
import { useStore } from '../hooks/useStore';
import { useKeyboard } from '../hooks/useKeyboard';
import {
	grassImage,
	dirtImage,
	stoneImage,
	logImage,
	emeraldImage,
} from '../images/images';

export const CubeSelector = ({ show, toggleShowCubeSelectorMenu }) => {
	const [activeTexture, setTexture] = useStore((state) => [
		state.texture,
		state.setTexture,
	]);
	const { grass, dirt, stone, log, emerald } = useKeyboard();

	const images = {
		grass: grassImage,
		dirt: dirtImage,
		stone: stoneImage,
		log: logImage,
		emerald: emeraldImage,
	};

	const containerClass = `cubeSelector ${show ? 'showCubeSelector' : 'hideCubeSelector'}`;

	useEffect(() => {
		const textures = {
			grass,
			dirt,
			stone,
			log,
			emerald,
		};

		const pressedTexture = Object.entries(textures).find(([_, id]) => id);

		if (pressedTexture && show) {
			toggleShowCubeSelectorMenu();
			setTexture(pressedTexture[0]);
		}
	}, [setTexture, grass, dirt, stone, log, emerald, toggleShowCubeSelectorMenu, show]);

	useEffect(() => {
		const handlePress = (event) => {
			if (event.keyCode === 69) {
				toggleShowCubeSelectorMenu();
			}
		};
		window.addEventListener('keydown', handlePress);

		return () => {
			window.removeEventListener('keydown', handlePress);
		};
	}, [toggleShowCubeSelectorMenu]);

	return (
		<div className={containerClass}>
			{Object.entries(images).map(([k, src]) => {
				return (
					<img
						key={k}
						src={src}
						alt={k}
						className={`cube ${k === activeTexture ? 'activeCube' : ''}`}
					/>
				);
			})}
		</div>
	);
};
