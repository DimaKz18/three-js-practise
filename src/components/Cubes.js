import { useStore } from '../hooks/useStore';
import { Cube } from './Cube';

export const Cubes = ({showCubeSelectorMenu}) => {
	const [cubes] = useStore((state) => [state.cubes]);

	return cubes.map((item) => {
		return <Cube key={item.key} showCubeSelectorMenu={showCubeSelectorMenu} {...item} />;
	});
};
