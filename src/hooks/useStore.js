import create from 'zustand';
import { nanoid } from 'nanoid';

// is used to access store.

export const useStore = create((set) => ({
	texture: 'dirt',
	cubes: [],
	addCube: (x, y, z) => {
		set((prev) => ({
			cubes: [
				...prev.cubes,
				{
					key: nanoid(),
					position: [x, y, z],
					texture: prev.texture,
				},
			],
		}));
	},
	removeCube: (x, y, z) => {
		set((prev) => ({
			cubes: prev.cubes.filter((cube) => {
				const [X, Y, Z] = cube.position;
				return X !== x || Y !== y || Z !== z;
			}),
		}));
	},
	setTexture: (texture) => {
		set(() => ({
			texture,
		}));
	},
}));
