import { FIRST_LETTER } from '../constants';

const checkOneLetter = (filter, search) => filter === FIRST_LETTER && search.length > 1;

export default checkOneLetter;
