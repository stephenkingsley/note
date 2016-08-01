const initState = {
  leftBar: {
    list: []
  },
  content: {
    title: '',
    content: '',
    fileIndex: ''
  },
  showTheAddModel: {
    show: false,
    type: '',
    title: ''
  },
  deleteFile: {
    title: '',
    filename: ''
  },
  markdownContent: {
    title: '',
    content: '',
    fileIndex: ''
  }
};

export default function note(state = initState, action) {
  switch (action.type) {
    case 'GET_LEFT_BAR_LIST':
      return {
        ...state,
        leftBar: {
          ...state.leftBar,
          list: action.list
        },
        showTheAddModel: {
          show: false,
          type: ''
        }
      };

    case 'GET_ITEM_CONTENT':
      return {
        ...state,
        content: action.item
      };

    case 'SHOW_THE_MODEL':
      return {
        ...state,
        showTheAddModel: {
          show: !state.showTheAddModel.show,
          type: action.data
        }
      };

    case 'DELETE_A_FILE_TO_SHOW_THE_MODEL':
      return {
        ...state,
        showTheAddModel: {
          show: !state.showTheAddModel.show,
          type: action.data
        },
        deleteFile: {
          title: action.fileData.title,
          filename: action.fileData.filename
        }
      };

    case 'HIDE_THE_MODEL':
      return {
        ...state,
        showTheAddModel: {
          show: false,
          type: ''
        },
        deleteFile: {
          title: '',
          filename: ''
        }
      };

    case 'MARKDOWN_PREVIEW':
      return {
        ...state,
        showTheAddModel: {
          show: !state.showTheAddModel.show,
          type: 'MARKDOWN_PREVIEW',
          title: action.file.title
        },
        markdownContent: action.file
      };

    default:
      return state;
  }
}
