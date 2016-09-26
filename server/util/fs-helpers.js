/**
 * Created by Freem_000 on 9/26/2016.
 */

import fs from 'fs';

export const createDir = (path)=> {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
};
