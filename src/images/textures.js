import { NearestFilter, TextureLoader } from 'three';
import { grassImage, dirtImage, stoneImage, logImage, emeraldImage } from './images';

const grassTexture = new TextureLoader().load(grassImage);
const groundTexture = new TextureLoader().load(grassImage);
const dirtTexture = new TextureLoader().load(dirtImage);
const stoneTexture = new TextureLoader().load(stoneImage);
const logTexture = new TextureLoader().load(logImage);
const emeraldTexture = new TextureLoader().load(emeraldImage);

grassTexture.magFilter = NearestFilter;
groundTexture.magFilter = NearestFilter;
dirtTexture.magFilter = NearestFilter;
stoneTexture.magFilter = NearestFilter;
logTexture.magFilter = NearestFilter;
emeraldTexture.magFilter = NearestFilter;

export {
	grassTexture,
	groundTexture,
	dirtTexture,
	stoneTexture,
	logTexture,
	emeraldTexture,
};
