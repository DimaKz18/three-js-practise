import { useBox } from '@react-three/cannon';
import { useState } from 'react';
import { useStore } from '../hooks/useStore';
import * as textures from '../images/textures';

export const Cube = ({ showCubeSelectorMenu, position, texture }) => {
	const [isHovered, setIsHovered] = useState(false);
	const [ref] = useBox(() => ({
		type: 'Static',
		position,
	}));
	const [addCube, removeCube] = useStore((state) => [state.addCube, state.removeCube]);

	const activeTexture = textures[texture + 'Texture'];

	const onPointerMove = (e) => {
		e.stopPropagation();
		setIsHovered(true);
	};

	const onPointerOut = (e) => {
		e.stopPropagation();
		setIsHovered(false);
	};

	const onClick = (e) => {
		if (showCubeSelectorMenu) return;

		e.stopPropagation();
		const clickedSide = Math.floor(e.faceIndex / 2);
		const { x, y, z } = ref.current.position;

		if (e.shiftKey) {
			removeCube(x, y, z);
			return;
		}

		// handle from what side we should place new cube
		switch (clickedSide) {
			case 0:
				addCube(x + 1, y, z);
				return;

			case 1:
				addCube(x - 1, y, z);
				return;

			case 2:
				addCube(x, y + 1, z);
				return;

			case 3:
				addCube(x, y - 1, z);
				return;

			case 4:
				addCube(x, y, z + 1);
				return;

			case 5:
				addCube(x, y, z - 1);
				return;

			default:
				break;
		}
	};

	return (
		<mesh
			onPointerMove={onPointerMove}
			onPointerOut={onPointerOut}
			onClick={onClick}
			ref={ref}
		>
			<boxBufferGeometry attach='geometry' />
			<meshStandardMaterial
				color={isHovered ? '#D3D3D3' : 'white'}
				map={activeTexture}
				transparent={true}
				attach='material'
			/>
		</mesh>
	);
};
