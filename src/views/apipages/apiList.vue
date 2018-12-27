<template>
  <div class="home">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="auto">
        <div class="logo">
        </div>
        <el-menu
          :unique-opened="true"
          :collapse="isCollapse"
          class="el-menu-admin"
          @open="handleOpen"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-submenu :index="item.groupId+''" v-for="item in menuData" :key="item.groupId">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.groupName}}</span>
            </template>
            <el-menu-item :index="tag.apiId+'10'" v-for="tag in item.apis" :key="tag.apiId" @click="toAppEdit2(tag.apiId)">
              <i class="el-icon-menu"></i>
              <span slot="title" >{{tag.apiName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- header部分 -->
        <el-header>
          <i class="myicon myicon-menu toggle-btn" @click="toggleCollapse"></i>
          <div class="system-title">api后台管理系统</div>
          <div>
            <span class="welcome">
              <!-- 您好，{{loginParm.accountName}} -->
            </span>
          </div>
        </el-header>
        <!-- 中间内容部分 -->
        <el-main>
          <div>
          <el-button type="primary" id="addButton" v-show="isShowList" icon="el-icon-plus" @click="toAdd">添加</el-button>
          <el-table
            :data="apitableData"
            style="width: 100%"
            v-show="isShowList"
            height="700">
            <el-table-column
              fixed
              prop="apiName"
              label="接口名称"
            >
            </el-table-column>
            <el-table-column
              prop="apiUrl"
              label="接口路径"
              >
            </el-table-column>
            <el-table-column
              prop="groupName"
              label="接口分类"
              >
              <template slot-scope="scope">
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ scope.row.groupName }}</el-tag>
                  </div>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="toAppEdit(scope.$index, scope.row);apiToEdit=scope.row.apiId">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="deleteApi(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <add-api  v-if=isShowAdd @jump='jump'></add-api>
          <edit-api v-if=isShowEdit @jump='jump' :apiToEdit="apiToEdit"></edit-api>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>
<script>
/* eslint-disable */
import { getGroupList,getApiListbygId,getApiById,getApiList,deleteApi } from '@/api'
import addApi from './components/addApi'
import editApi from './components/editApi'
import qs from 'qs'
export default {
  data () {
    return {
      apiToEdit: {},
      apiMethod:'',
      isCollapse: false,
      menuData: [],
      apitableData: [],
      isShowList: true,
      isShowAdd: false,
      isShowEdit: false,
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
    }
  },
  components: {
    addApi,
    editApi
  },
  methods: {
    toAppEdit (index,row) {
      this.apiToEdit = row.apiId
      this.isShowList = false
      this.isShowEdit = false
      this.$nextTick(() => {
        this.isShowEdit = true
      })
    },
    toAppEdit2 (row) {
      console.log(row)
      this.apiToEdit = row
      this.isShowList = false
      this.isShowEdit = false
      this.$nextTick(() => {
        this.isShowEdit = true
      })
    },
    deleteApi (index, row) {
      deleteApi(qs.stringify({apiId:row.apiId})).then( res => {
        if(res.code === 0) {
          this.$message({
                type: 'success',
                message: res.msg
              })
          this.ApiList()
          this.GroupList()
        }else{
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
      this.ApiList()
      this.GroupList()

    },
    toAdd () {
      this.isShowList = false
      this.isShowAdd = true
    },
    handleOpen (key, keyPath) {
      this.isShowList =  true
      this.isShowAdd = false
      this.isShowEdit = false
      if(key =='999999'){
        this.ApiList()
      }else{
        getApiListbygId(key).then(res=>{
        if(res.code === 0){
          this.apitableData = res.data
          this.apitableData = res.data
          this.apitableData.forEach(item => {
            switch(item.apiMethod){
              case 1:
                item.groupName='GET'
                break;
              case 2:
                item.groupName='POST'
                break;
              case 3:
                item.groupName='PUT'
                break;
              case 4:
                item.groupName='DELETE'
                break;
              case 5:
                item.groupName='HEAD'
                break;
              case 6:
                item.groupName='OPTIONS'
                break;
              case 7:
                item.groupName='PATCH'
                break;
              default :
                item.groupName='/'
                break;
            }
          })
        }else{
          console.log(res.msg)
        }
      })
      }
    },
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    jump () {
      this.isShowList = true//!this.isShowList
      this.isShowAdd = false
      this.isShowEdit = false
      this.ApiList()
      this.GroupList()
    },
    // 接口列表
    ApiList () {
      getApiList().then(res => {
        if(res.code === 0){
          this.apitableData = res.data
          this.apitableData.forEach(item => {
            switch(item.apiMethod){
              case 1:
                item.groupName='GET'
                break;
              case 2:
                item.groupName='POST'
                break;
              case 3:
                item.groupName='PUT'
                break;
              case 4:
                item.groupName='DELETE'
                break;
              case 5:
                item.groupName='HEAD'
                break;
              case 6:
                item.groupName='OPTIONS'
                break;
              case 7:
                item.groupName='PATCH'
                break;
              default :
                item.groupName='/'
                break;
            }
          })
        }else{
          console.log(res.msg)
        }
      })
    },
    GroupList () {
      getGroupList().then(res => {
      if (res.code === 0) {
        this.menuData = res.data
        this.menuData.unshift({
          groupId: '999999',
          groupName: '全部接口',
          path: 'users'
        })
      } else {
        console.log(res.msg)
      }
    })
    }
  },
  created () {
    this.ApiList()
    this.GroupList()
  }
}
</script>
<style  lang="scss" scoped>
.home {
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
  }
  .logo {
    height: 60px;
    background-size: cover;
    background-color: #545c64;
  }
  .toggle-btn {
    font-size: 36px;
    color: #989898;
    cursor: pointer;
    line-height: 60px;
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome {
    color: white;
  }
}
#addButton {
  float: right
}
</style>
