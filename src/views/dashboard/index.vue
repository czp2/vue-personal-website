<template>
  <div class="theme-container">
    <div class="site-nav">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>站点导航</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="handleImportBookmarks">导入书签</el-button>
        </div>

        <CollapseItem :collapse-list="collapseList" />
      </el-card>
    </div>
    <el-dialog :visible="importVisible" width="30%" :close-on-click-modal="false" :before-close="handleImportClose">
      <div style="text-align: center">
        <!-- <input id="file" size="small" type="file" name="file" @input="handleFileChange" /> -->
        <el-upload
          class="upload-demo"
          drag
          action=""
          :file-list="fileList"
          accept=".html"
          :auto-upload="false"
          :on-change="handleFileChange"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击选择</em></div>
          <div slot="tip" class="el-upload__tip">只能选择html文件</div>
        </el-upload>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="handleImportConfirm">确定</el-button>
        <el-button size="small" @click="handleImportClose">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { parseByString } from 'bookmark-file-parser'
import CollapseItem from './components/collapseItem.vue'
export default {
  components: { CollapseItem },
  data() {
    return {
      importVisible: false,
      file: null,
      fileList: [],
      collapseList: []
    }
  },
  methods: {
    handleFileChange(file, fileList) {
      const testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'html'
      if (!extension) {
        this.$message({
          message: '上传文件只能是 html 格式!',
          type: 'warning'
        })
        this.fileList = []
        return extension
      }
      const fileReader = new FileReader()
      fileReader.onload = () => {
        this.file = parseByString(Buffer.from(fileReader.result))
      }
      fileReader.readAsArrayBuffer(file.raw)
    },
    handleImportBookmarks() {
      this.importVisible = true
    },
    handleImportConfirm() {
      if (!this.file) {
        this.$message({ type: 'warning', message: '请选择文件' })
        return
      }
      this.collapseList = this.file[0].children
      this.handleImportClose()
    },
    handleImportClose() {
      this.fileList = []
      this.file = null
      this.importVisible = false
    }
  }
}
</script>
