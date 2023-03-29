import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useSphere } from '@react-three/cannon';
import { Vector3 } from 'three';
import { useKeyboard } from '../hooks/useKeyboard';

const JUMP_HEIGHT = 2;
const SPEED = 4;

export const Player = ({ showCubeSelectorMenu }) => {
	const playerVelocityRef = useRef([0, 0, 0]);
	const playerPositionRef = useRef([0, 0, 0]);

	const { moveBackward, moveForward, moveRight, moveLeft, jump } = useKeyboard();

	const { camera } = useThree();
	const [ref, api] = useSphere(() => ({
		mass: 1,
		type: 'Dynamic',
		position: [0, 1, 0],
	}));

	useEffect(() => {
		api.velocity.subscribe((v) => (playerVelocityRef.current = v)); // subscribe to api to save player velocity
	}, [api.velocity]);

	useEffect(() => {
		api.position.subscribe((p) => (playerPositionRef.current = p)); // subscribe to api to save player position
	}, [api.position]);

	useFrame(() => {
		// runs on every frame. Connects camera to player position
		if (showCubeSelectorMenu) return;

		camera.position.copy(
			new Vector3(
				playerPositionRef.current[0],
				playerPositionRef.current[1],
				playerPositionRef.current[2]
			)
		);

		const direction = new Vector3();

		const frontVector = new Vector3(0, 0, (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)); // to disable pressing forward and back buttons together
		const sideVector = new Vector3((moveLeft ? 1 : 0) - (moveRight ? 1 : 0), 0, 0); // to disable pressing left and right buttons together

		direction
			.subVectors(frontVector, sideVector)
			.normalize()
			.multiplyScalar(SPEED)
			.applyEuler(camera.rotation);

		api.velocity.set(direction.x, playerVelocityRef.current[1], direction.z);

		if (jump && Math.abs(playerVelocityRef.current[1]) < 0.05) {
			// to disable infinite jumping
			api.velocity.set(
				playerVelocityRef.current[0],
				JUMP_HEIGHT,
				playerVelocityRef.current[2]
			);
		}
	});

	return <mesh ref={ref} />;
};
