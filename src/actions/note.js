const fs = global.require('fs');
const storagePath = '.stephenkingsley_is_awesome';

export const getTheLeftBarList = () => {
  return dispatch => {
    const result = [];
    fs.readdir(`${storagePath}/`, (err, files) => {
      if (err) throw err;
      files.forEach(ele => {
        const fileContent = fs.readFileSync(`${storagePath}/${ele}`);
        const parseFileContent = JSON.parse(fileContent);
        parseFileContent.fileIndex = ele;
        result.push(parseFileContent);
      });
      return dispatch(receiveLeftBarList(result));
    });
  };
};

const receiveLeftBarList = (list) => {
  return {
    type: 'GET_LEFT_BAR_LIST', list
  };
};

export const chooseLeftBarItem = (fileName) => {
  return dispatch => {
    fs.readFile(`${storagePath}/${fileName}`, (err, data) => {
      if (err) throw err;
      const file = JSON.parse(data);
      file.fileIndex = fileName;
      return dispatch(receiveItemContent(file));
    });
  };
};

const receiveItemContent = (item) => {
  return {
    type: 'GET_ITEM_CONTENT', item
  };
};

export const saveFile = (fileIndex, title, content, date) => {
  return dispatch => {
    const file = {
      title,
      content,
      date,
    };
    fs.writeFile(`${storagePath}/${fileIndex}`, JSON.stringify(file), (err) => {
      if (err) throw err;
      dispatch(saveFileDone());
      dispatch(getTheLeftBarList());
    });
  };
};

const saveFileDone = () => {
  return {
    type: 'SAVE_FILE_IS_DONE'
  };
};

export const hideTheModel = () => {
  return {
    type: 'HIDE_THE_MODEL'
  };
};

export const showTheAddFileModel = () => {
  return {
    type: 'SHOW_THE_MODEL', data: 'ADD_A_File'
  };
};

export const createANewFile = (title) => {
  return dispatch => {
    const filename = `${new Date().getTime()}${parseInt(Math.random() * 1000, 10)}.json`;
    const content = '';
    const file = {
      title,
      content,
      date: new Date().getTime()
    };
    fs.writeFile(`${storagePath}/${filename}`, JSON.stringify(file), (err) => {
      if (err) throw err;
      dispatch(getTheLeftBarList());
    });
  };
};

export const showDeleteFile = (title, filename) => {
  return {
    type: 'DELETE_A_FILE_TO_SHOW_THE_MODEL',
    data: 'DELETE_A_FILE',
    fileData: {
      title,
      filename
    }
  };
};

export const deleteFile = (filename) => {
  return dispatch => {
    fs.unlink(`${storagePath}/${filename}`, err => {
      if (err) throw err;
      dispatch(hideTheModel());
      dispatch(getTheLeftBarList());
    });
  };
};

export const showTheMarkDownView = (filename) => {
  return dispatch => {
    fs.readFile(`${storagePath}/${filename}`, (err, data) => {
      if (err) throw err;
      const file = JSON.parse(data);
      file.filename = filename;
      return dispatch(markdownPreview(file));
    });
  };
};

const markdownPreview = (file) => {
  return {
    type: 'MARKDOWN_PREVIEW',
    file
  };
};
