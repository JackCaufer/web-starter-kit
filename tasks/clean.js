import del from 'del';
import config from '../projectConfig';

const clean = () => del(config.dest.root);

export default clean;
