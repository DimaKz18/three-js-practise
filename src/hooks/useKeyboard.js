import { useCallback, useEffect, useState } from 'react';

// is used to handle user keyboard actions

export const useKeyboard = () => {
	const [actions, setActions] = useState({
		moveForward: false,
		moveBackward: false,
		moveLeft: false,
		moveRight: false,
		jump: false,
		grass: false,
		dirt: false,
		stone: false,
		log: false,
		emerald: false,
	});

	const getAction = (key) => {
		const keyActionMap = {
			KeyW: 'moveForward',
			KeyS: 'moveBackward',
			KeyA: 'moveLeft',
			KeyD: 'moveRight',
			Space: 'jump',
			Digit1: 'grass',
			Digit2: 'dirt',
			Digit3: 'stone',
			Digit4: 'log',
			Digit5: 'emerald',
		};

		return keyActionMap[key];
	};

	const handleKeyDown = useCallback((e) => {
		const action = getAction(e.code);
		if (action) {
			setActions((prev) => {
				return {
					...prev,
					[action]: true,
				};
			});
		}
	}, []);

	const handleKeyUp = useCallback((e) => {
		const action = getAction(e.code);
		if (action) {
			setActions((prev) => {
				return {
					...prev,
					[action]: false,
				};
			});
		}
	}, []);

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);
		document.addEventListener('keyup', handleKeyUp);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.removeEventListener('keyup', handleKeyUp);
		};
	}, [handleKeyDown, handleKeyUp]);

	return actions;
};
