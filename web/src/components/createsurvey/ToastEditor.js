import React, { Component } from 'react';
import Editor from 'tui-editor';

import 'tui-color-picker/dist/tui-color-picker.min';
import 'tui-editor/dist/tui-editor-extColorSyntax';
import 'codemirror/lib/codemirror.css';
import 'tui-editor/dist/tui-editor.css';
import 'tui-editor/dist/tui-editor-contents.css';
import 'highlight.js/styles/github.css';
import 'tui-color-picker/dist/tui-color-picker.min.css';
import './ToastEditor.css';

import { Button } from '@material-ui/core';

let toastEditor;
class ToastEditor extends Component {
    constructor(){
        super();
        this.state = {
            content : ''
        };
        this.saveArticle = this.saveArticle.bind(this);
    };

    componentDidMount(){
        toastEditor = new Editor({
            el: document.querySelector('#editSection'),
            initialEditType: 'wysiwyg', // 'markdown'
            previewStyle: 'vertical',
            height: '300px',
            exts: ['colorSyntax']
        });
    };

    saveArticle(){
        const content = toastEditor.getHtml();
        this.setState({
            content
        });
        this.props.setContent(content)
    };  

    render(){
        return (
            <div id="toastEditor">
                <div id="editSection"></div>
                <Button
                  onClick={this.saveArticle}
                  className="btn_save"
                >
                  상세 설명 작성하기
                </Button>
                <div>
                    <h2>작성된 HTML 코드</h2>
                    <textarea
                      className="tf_result"
                      value={this.state.content}
                      readOnly="readOnly"
                    />
                </div>
            </div>
        );
    };

};

export default ToastEditor;