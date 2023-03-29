import { usePlane } from '@react-three/cannon';
import { RepeatWrapping } from 'three';
import { groundTexture } from '../images/textures';
import { useStore } from '../hooks/useStore';

export const Ground = ({ showCubeSelectorMenu }) => {
	const [ref] = usePlane(() => ({
		rotation: [-Math.PI / 2, 0, 0],
		position: [0, -0.5, 0],
	}));
	const [addCube] = useStore((state) => [state.addCube]);

	groundTexture.wrapS = RepeatWrapping; // to repeat our texture image
	groundTexture.wrapT = RepeatWrapping; // to repeat our texture image
	groundTexture.repeat.set(100, 100);

	const onClick = (e) => {
		if (e.shiftKey || showCubeSelectorMenu) {
			return;
		}
		e.stopPropagation();
		const [x, y, z] = Object.values(e.point).map((val) => Math.ceil(val));
		addCube(x, y, z);
	};

	return (
		<mesh ref={ref} onClick={onClick}>
			<planeBufferGeometry attach='geometry' args={[100, 100]} />
			<meshStandardMaterial attach='material' map={groundTexture} />
		</mesh>
	);
};
