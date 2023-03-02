<template>
  <div class="theme-container">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline" @submit.native.prevent>
      <el-form-item prop="type">
        <el-select v-model="searchForm.type" size="small" placeholder="请选择记录的类型" clearable>
          <el-option v-for="(val, key) in typeEnum" :key="key" :label="val" :value="key" />
        </el-select>
      </el-form-item>
      <el-form-item prop="keyword">
        <el-input v-model="searchForm.keyword" size="small" placeholder="请输入关键字" clearable @keyup.enter.native="handleSearch()" />
      </el-form-item>
      <el-form-item label="" prop="startTime">
        <el-date-picker
          v-model="searchForm.startTime"
          size="small"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          placeholder="请选择开始时间"
          :picker-options="pickerOptions"
          clearable
        />
      </el-form-item>
      <el-form-item label="" prop="endTime">
        <el-date-picker
          v-model="searchForm.endTime"
          size="small"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          placeholder="请选择结束时间"
          :picker-options="pickerOptions"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button size="small"
                   class="longer"
                   type="primary"
                   icon="el-icon-search"
                   :loading="loading"
                   @click="handleSearch"
        >搜索
        </el-button>
        <el-button size="small" @click="handleSearch(true)">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="flex-between mb-20">
      <div class="flex">
        <el-checkbox v-model="checkAll"
                     class="mr-10"
                     :indeterminate="isIndeterminate"
                     size="small"
                     border
                     @change="handleCheckAllChange"
        >全选
        </el-checkbox>
        <el-button :disabled="deleteAvailable" type="danger" size="small" icon="el-icon-delete" @click="handleMutipleDelete">
          删除
        </el-button>
        <el-button v-if="!isEditorShow" type="primary" size="small" icon="el-icon-plus" @click="isEditorShow = true"> 新建 </el-button>
        <el-button v-show="isEditorShow" type="primary" size="small" icon="el-icon-arrow-up" @click="handleCollapse"> 收起 </el-button>
        <el-button
          v-show="isEditorShow"
          :disabled="submitAvailable"
          type="primary"
          size="small"
          icon="el-icon-check"
          @click="handleDialogOpen"
        >提交
        </el-button>
      </div>
      <el-pagination
        background
        :current-page="searchForm.pageNo"
        :page-sizes="[10, 15, 30, 50]"
        :page-size="searchForm.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <div v-if="isEditorShow">
      <mavon-editor v-model="submitForm.value" />
    </div>
    <br />
    <div class="content">
      <el-timeline>
        <el-checkbox-group v-model="checkedData" @change="handleCheckedDataChange">
          <el-timeline-item v-for="item in dataArr" :key="item.id" :timestamp="item.timestamp" placement="top">
            <el-card style="position: relative">
              <el-checkbox style="position: absolute; top: 0; left: 0; font-size: 0" :label="item.id">{{}}</el-checkbox>
              <div class="flex-between mb-20">
                <el-tag>
                  类型：
                  {{ typeEnum[item.type] }}
                </el-tag>
                <el-popconfirm title="确定删除吗？" @confirm="handleDelete(item.id)">
                  <el-button slot="reference" type="danger" size="small" icon="el-icon-delete" plain />
                </el-popconfirm>
              </div>
              <h4>{{ item.title }}</h4>
              <p style="text-align: right">{{ item.createtime }}</p>
            </el-card>
          </el-timeline-item>
        </el-checkbox-group>
      </el-timeline>
    </div>

    <el-dialog title="提交选项" width="600px" :visible.sync="dialogVisible">
      <el-form :model="submitForm" :rules="submitFormRules" label-width="80px" label-position="left">
        <el-form-item label="标题" prop="title">
          <el-input v-model="submitForm.title" size="small" autocomplete="off" />
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-radio-group v-model="submitForm.type" size="small">
            <el-radio v-for="(val, key) in typeEnum" :key="key" class="mb-20" :label="key" border>{{ val }}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      isEditorShow: false,
      dialogVisible: false,
      searchForm: {
        type: undefined,
        pageNo: 1,
        pageSize: 10,
        startTime: undefined,
        endTime: undefined
      },
      submitForm: {
        type: '1',
        title: '无题',
        value: undefined
      },
      submitFormRules: {
        title: { required: true, message: '请输入标题', trigger: 'blur' },
        type: { required: true, message: '请选择类型', trigger: 'blur' }
      },
      typeEnum: {
        // 0: '全部类型',
        1: '吐槽一下',
        2: '生活记录',
        3: '创作灵感',
        4: '人生感悟'
      },
      loading: false,
      dataArr: [],
      total: 0,
      checkedData: [],
      checkAll: false,
      isIndeterminate: false,
      pickerOptions: {
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }
        ]
      }
    }
  },
  computed: {
    deleteAvailable() {
      return !(this.checkedData.length >= 1)
    },
    submitAvailable() {
      return !this.submitForm.value
    },
    dataArrIds() {
      return this.dataArr.map((item) => item.id)
    }
  },
  created() {
    this.getDataArr()
  },
  methods: {
    getDataArr() {
      this.dataArr = [
        {
          id: 1,
          type: '1',
          timestamp: '2018/4/12',
          title: '更新 Github 模板',
          createtime: '2018/4/12 20:46'
        },
        {
          id: 2,
          type: '1',
          timestamp: '2018/4/12',
          title: '更新 Github 模板',
          createtime: '2018/4/12 20:46'
        }
      ]
    },
    handleCollapse() {
      if (this.submitForm.value) {
        this.$confirm('此操作将重置内容, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
          .then(() => {
            this.isEditorShow = false
          })
          .catch(() => {})
      } else {
        this.isEditorShow = false
      }
    },
    handleSubmit() {
      console.log(this.submitForm)
      this.handleDialogClose()
    },
    handleDelete(id) {
      console.log(id)
    },
    handleMutipleDelete() {
      this.$confirm('确定全部删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          console.log(this.checkedData)
        })
        .catch(() => {})
    },
    handleSearch(reset = false) {
      if (reset) {
        this.$refs['searchForm'].resetFields()
        this.pageSize = 10
      }
      this.searchForm.pageNo = 1
      this.getDataArr()
    },
    handleCheckAllChange(val) {
      this.checkedData = val ? this.dataArrIds : []
      this.isIndeterminate = false
    },
    handleCheckedDataChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.dataArrIds.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.dataArrIds.length
    },
    handleSizeChange(val) {
      this.searchForm.pageSize = val
      this.getDataArr()
    },
    handleCurrentChange(val) {
      this.searchForm.pageNo = val
      this.getDataArr()
    },
    handleDialogOpen() {
      this.dialogVisible = true
    },
    handleDialogClose() {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
