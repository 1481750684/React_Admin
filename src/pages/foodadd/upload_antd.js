import React,{Component} from 'react'
import { Upload, Button, Icon, message } from 'antd';

class Demo extends Component {
    constructor() {
        super()
        this.state = {
            fileList: [],
            uploading: false,
        };
    }
  
    handleUpload = () => {
        const { fileList } = this.state;
        const formData = new FormData();
        formData.append('img', fileList[0]);

        this.$axios.post('/api/admin/file/upload',formData)
        .then((data) => {
            console.log(data)
            message.success('上传成功')
        })

        this.setState({
            uploading: true,
        });   
    };

    render() {
        const { uploading, fileList } = this.state;
        const props = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: file => {
                // this.setState(state => ({
                //     fileList: [...state.fileList, file],
                // }));
                let fileList = this.state.fileList
                fileList.push(file)
                this.setState({fileList:fileList})
                return false;
            },
            fileList,
        };

        return (
            <div>
                <Upload {...props}>
                    <Button>
                        <Icon type="upload" /> Select File
                    </Button>
                </Upload>
                <Button
                    type="primary"
                    onClick={this.handleUpload}
                    disabled={fileList.length === 0}
                    loading={uploading}
                    style={{ marginTop: 16 }}
                >
                    {uploading ? 'Uploading' : 'Start Upload'}
                </Button>
            </div>
        );
    }
}

export default Demo