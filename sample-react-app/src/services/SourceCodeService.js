import axios from 'axios';

import { StateContext } from '../dist';


class SourceCodeService {

  getSourceCode (sourceCodeFile) {

    const rawSourceFile = sourceCodeFile.replace(/^https:\/\/github\.com/,'https://raw.githubusercontent.com').replace(/blob\//g, '');

    return axios.get(rawSourceFile, { responseType: 'text', transformResponse: undefined }).then(response => {
      return response.data;
    });
  }

  closeSourceCode () {
    StateContext.getStateStore('appState').update({
      currentSourceFile: false,
      sourceCodeLoading: false,
      sourceCode: false,
      sourceCodeError: false
    });
  }

  setSourceCode (sourceCodeFile) {

    if (!sourceCodeFile) {
      StateContext.getStateStore('appState').update({
        currentSourceFile: sourceCodeFile,
        sourceCodeLoading: false,
        sourceCode: false
      });
    } else {

      StateContext.getStateStore('appState').update({
        currentSourceFile: sourceCodeFile,
        sourceCodeLoading: true,
        sourceCode: false,
        sourceCodeError: false
      });

      this.getSourceCode(sourceCodeFile).then((sourceCodeText) => {
        StateContext.getStateStore('appState').update({
          sourceCodeLoading: false,
          sourceCode: sourceCodeText
        });
      }).catch((err) => {
        StateContext.getStateStore('appState').update({
          sourceCodeLoading: false,
          sourceCodeError: err
        });
      });
    }
  }
}

export default new SourceCodeService();