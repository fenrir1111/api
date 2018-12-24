<template>
<el-form :rules="rules" ref="querysForm" label-width="100px" prop="" :model="querysForm"  class="demo-dynamic">
  <el-row>
  <el-col :span="24"><div class="grid-content bg-purple-dark"><h1>基本设置</h1></div></el-col>
</el-row>
  <el-form-item label="接口名称" prop="api.apiName">
    <el-input v-model="querysForm.api.apiName"></el-input>
  </el-form-item>
    <el-form-item label="选择分类" prop="api.apiGroupId">
    <el-select v-model="querysForm.api.apiGroupId" placeholder="请选择" style="width:100%">
    <el-option
      v-for="item in categoryList"
      :key="item.value"
      :label="item.name"
      :value="item.value">
    </el-option>
  </el-select>
  </el-form-item>
  <el-form-item label="接口路径" prop="api.apiUrl">
    <el-input placeholder="/path" v-model="querysForm.api.apiUrl" class="input-with-select">
    <el-select v-model="querysForm.api.apiMethod" slot="prepend" placeholder="请选择" @change="bodyisShow">
      <el-option
        v-for="item in ApiTypeList"
        :key="item.value"
        :label="item.name"
        :value="item.value">
      </el-option>
    </el-select>
  </el-input>
  </el-form-item>
  <el-row>
  <el-col :span="24"><div class="grid-content bg-purple-dark"><h1>请求参数设置</h1></div></el-col>
  </el-row>
  <el-form-item>
    <el-tabs v-model="activeName" >
      <el-tab-pane label="Body" name="Body" :disabled="isShowBody">
         <el-button @click="addBodys" type="primary">添加Body参数</el-button>
         <el-form-item
            v-for="(body) in querysForm.params.body"
            :key="body.key"
            >
         <el-input style='width:15%' v-model="body.paramName" placeholder="参数名称"></el-input>
         <el-select style='width:15%' v-model="body.paramType" placeholder="请选择">
                <el-option
                  v-for="item in bodytextfile"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-select style='width:15%' v-model="body.paramIsRequired" placeholder="请选择">
                <el-option
                  v-for="item in bodyTypeList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
            <el-input style='width:25%' placeholder="参数示例" v-model="body.paramInstance"></el-input>
              <el-input style='width:25%' placeholder="备注" v-model="body.paramDesc">
              </el-input>
              <a href=""><i class="el-icon-delete"  @click.prevent="removeBody(body)"></i></a>
          </el-form-item>
      </el-tab-pane>
      <el-tab-pane label="Query" name="Query">
         <el-button @click="addquerys" type="primary">添加query参数</el-button>
         <el-form-item
            v-for="(query) in querysForm.params.query"
            :key="query.key"
           >
         <el-input style='width:15%' v-model="query.paramName" placeholder="参数名称"></el-input>
              <el-select style='width:15%' v-model="query.paramType" placeholder="请选择">
                <el-option
                  v-for="item in bodytextfile"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-select style='width:15%' v-model="query.paramIsRequired" placeholder="请选择">
                <el-option
                  v-for="item in queryTypeList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
            <el-input style='width:25%' placeholder="参数示例" v-model="query.paramInstance"></el-input>
              <el-input style='width:25%' placeholder="备注" v-model="query.paramDesc">
              </el-input>
              <a href=""><i class="el-icon-delete"  @click.prevent="removeQuery(query)"></i></a>
          </el-form-item>
      </el-tab-pane>
      <el-tab-pane label="Headers" name="Headers">
        <el-button @click="addheaders" type="primary">添加Headers参数</el-button>
        <el-form-item
            v-for="(header) in querysForm.params.header"
            :key="header.key"
           >
         <el-input style='width:15%' v-model="header.paramName" placeholder="参数名称"></el-input>
         <el-select style='width:15%' v-model="header.paramIsRequired" placeholder="请选择">
                <el-option
                  v-for="item in bodytextfile"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
         <el-input style='width:15%' v-model="header.paramValue" placeholder="参数值"></el-input>
            <el-input style='width:25%' placeholder="参数示例" type="textarea" :rows="2" autosize v-model="header.paramInstance"></el-input>
              <el-input style='width:25%' placeholder="备注" type="textarea" autosize v-model="header.paramDesc">
              </el-input>
              <a href=""><i class="el-icon-delete"  @click.prevent="removeHeader(header)"></i></a>
        </el-form-item>
      </el-tab-pane>
    </el-tabs>
  </el-form-item>
  <el-row>
  <el-col :span="24"><div class="grid-content bg-purple-dark"><h1>返回数据设置</h1></div></el-col>
  </el-row>
  <el-form-item>
  <el-input type="textarea" v-model="querysForm.api.apiResponseDesc"  placeholder="返回数据设置"></el-input>
  </el-form-item>

  <el-row>
  <el-col :span="24"><div class="grid-content bg-purple-dark"><h1>备注</h1></div></el-col>
  </el-row>
    <el-form-item prop="">
    <el-input v-model="querysForm.api.apiDesc" type="textarea"  placeholder="备注 "></el-input>
  </el-form-item>
  <el-button type="primary" id="addButton" @click="add('querysForm')" >确定</el-button>
  <el-button type="primary" @click="cancel">取消</el-button>

</el-form>

</template>
<script>
/* eslint-disable */
import qs from 'qs'
import { getGroupList,addApi } from '@/api'
export default {
  data () {
    return {
      isShowBody:true,
      rules:{
        'api.apiName': [
            { required: true, message: '请输入接口名称', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
            ],
        'api.apiGroupId': [
            { required: true, message: '请选择接口分类', trigger: 'change' }
            ],
        'api.apiUrl': [
            { required: true, message: '请输入接口地址', trigger: 'blur' }
        ]
      },
      categoryList: [],
      categoryListValue:'',
      ApiTypeList: [
        {
          name: 'GET',
          value: '1'
        },
        {
          name: 'POST',
          value: '2'
        },
        {
          name: 'PUT',
          value: '3'
        },
        {
          name: 'DELETE',
          value: '4'
        },
        {
          name: 'HEAD',
          value: '5'
        },
        {
          name: 'OPTIONS',
          value: '6'
        },
        {
          name: 'PATCH',
          value: '7'
        }
      ],
      ApiTypeValue:'',
      activeName: 'Body',
      apipath: '',
      addQuerys: [{
            value: ''
          }],
      querysForm:{
        api:{
          apiName:'',
          apiGroupId:'',
          apiMethod:'',
          apiUrl:'',
          apiResponseDesc:'',
          apiDesc:''
        },
        params:{
          body:[
            // {
            //   paramName:'',
            //   paramValue:'',
            //   paramType:'',
            //   paramIsRequired:'',
            //   paramInstance:'',
            //   paramDesc:''
            // }
            ],
          query:[
          //   {
          //   paramName:'',
          //   paramValue:'',
          //   paramType:'',
          //   paramIsRequired:'',
          //   paramInstance:'',
          //   paramDesc:''
          // }
          ],
          header:[
            // {
            //   paramName:'',
            //   paramValue:'',
            //   paramType:'',
            //   paramIsRequired:'',
            //   paramInstance:'',
            //   paramDesc:''
            // }
          ]
        }
      },
      queryTypeList:[{value:'1',name:'必须'},{value:'2',name:'非必需'}],
      bodyTypeList:[{value:'1',name:'必须'},{value:'2',name:'非必需'}],
      bodytextfile:[{value:'1',name:'text'},{value:'2',name:'file'}],
    }
  },
  methods :{
    // 显示隐藏 body 标签
    bodyisShow (value) {
      if(value=='1'||value=='6'||value=='5'){
        this.isShowBody = true
        this.activeName = 'Query'
        this.querysForm.params.body = []
        this.querysForm.params.params = []
        this.querysForm.params.header = []
      }else{
        this.isShowBody = false
        this.activeName = 'Body'
        this.querysForm.params.body = []
        this.querysForm.params.params = []
        this.querysForm.params.header = []
      }
    },
    // 获取接口分类
    GroupList () {
      getGroupList().then(res => {
        if (res.code === 0) {
          res.data.forEach(e => {
          this.categoryList.push({
            value:e.groupId,
            name:e.groupName,
          })

          })

        } else {
          console.log(res.msg)
        }
      })
    },
    add (formName) {
      // this.$refs[formName].validate((valid) => {
      //     if (valid) {    JSON.stringify(this.querysForm)
            addApi(qs.stringify({para:JSON.stringify(this.querysForm)})).then(res => {
            if(res.code === 0){
              this.$message({
                type: 'success',
                message: res.msg
              })
                this.$emit('jump')
            }else{
              this.$message({
              type: 'error',
              message: res.msg
            })
            }
          })
          // } else {
          //   console.log('error submit!!');
          //   return false;
          // }
        // })
    },
    cancel () {
      this.$emit('jump')
    },
    // 添加body
    addBodys () {
      this.querysForm.params.body.push({
          paramName:'',
          paramValue:'',
          paramIsRequired:'',
          paramType:'',
          paramInstance:'',
          paramDesc:''
          // key: Date.now()
        })
    },
    // 添加query
    addquerys () {
      this.querysForm.params.query.push({
          paramName:'',
          paramValue:'',
          paramType:'',
          paramIsRequired:'',
          paramInstance:'',
          paramDesc:''
          // key: Date.now()
        })
    },
    // 删除body
    removeBody (item) {
      var index = this.querysForm.params.body.indexOf(item)
        if (index !== -1) {
          this.querysForm.params.body.splice(index, 1)
        }
    },
    // 删除query
    removeQuery (item) {
      var index = this.querysForm.params.query.indexOf(item)
        if (index !== -1) {
          this.querysForm.params.query.splice(index, 1)
        }
    },
    // 添加headers参数
    addheaders () {
      this.querysForm.params.header.push({
          paramName:'',
          paramValue:'',
          paramIsRequired:'',
          paramInstance:'',
          paramDesc:''
          // key: Date.now()
        })
    },
    // 删除query
    removeHeader (item) {
      var index = this.querysForm.params.header.indexOf(item)
        if (index !== -1) {
          this.querysForm.params.header.splice(index, 1)
        }
    },

  },
  created () {
    this.GroupList()
  }
}
</script>
<style lang='scss' scoped>
.el-select{
  width: 100px;
}
.el-textarea__inner{
  min-height: 40px !important;
}
</style>
